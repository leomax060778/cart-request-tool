$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var vendor = mapper.getVendor();
var dataVendor = mapper.getDataVendor();
var request = mapper.getDataVendorRequest();
var vendorMessage = mapper.getVendorMessage();
var businessAttachmentVendor = mapper.getAttachmentVendor();
var businessAttachment = mapper.getAttachment();
var businessVendorDP = mapper.getVendorDataProtection();
var businessStatus = mapper.getVendorRequestInquiryStatus();
var vendorMail = mapper.getVendorMail();
var dataVRDataProtection = mapper.getDataVendorDataProtection();
var vendorContact = mapper.getVendorContactInformation();
var businessUser = mapper.getUser();
var mail = mapper.getMail();
var utilLib = mapper.getUtil();
var dbHelper = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
var userRole = mapper.getUserRole();
var dataUserRole = mapper.getDataUserRole();
var bsChangedColumn = mapper.getVendorRequestInquiryChangedColumn();

//CRT Vendor Request email sending
var vendorRequestMailSend = mapper.getVendorRequestMailSend();

/** ***********END INCLUDE LIBRARIES*************** */

var statusMap = {
    'TO_BE_CHECKED': 1,
    'CHECKED': 2,
    'IN_PROCESS': 3,
    'RETURN_TO_REQUESTER': 4,
    'APPROVED': 5,
    'CANCELLED': 6
};
var vendorType = {"VENDOR_REQUEST": 3};
var pathName = "VENDOR_REQUEST";
var messageTypeMap = {'FYI_ONLY': 1, 'BM_EYES_ONLY': 2, 'REQUEST_RESPONSE': 3};
var resourceMap = {'VENDOR_REQUEST_INQUIRY': 3};
var permissionMap = {'CREATE_EDIT': 10};
var roleMap = {
    "SUPER_ADMIN": 1,
    "REQUESTER": 2,
    "BUSINESS_MGT": 3,
    "BUDGET_OWNER": 4
};

var permissionData = {
    RESOURCE_ID: resourceMap.VENDOR_REQUEST_INQUIRY,
    PERMISSION_ID: permissionMap.CREATE_EDIT
};

//Insert Vendor Request Data Protection
function insertDataProtectionAnswer(reqBody, in_vendor_request_id, user_id) {
    reqBody.VENDOR_REQUEST_ID = in_vendor_request_id;
    if (validateInsertDataProtectionAnswer(reqBody, user_id)) {
        reqBody.QUESTION_ID = Number(reqBody.QUESTION_ID);
        reqBody.QUESTION_ID = Number(reqBody.QUESTION_ID);
        return dataVRDataProtection.insertAnswerManual(reqBody, user_id);
    }
}

function validatePermissionByUserRole(roleData, resRequest) {
    return (Number(roleData.ROLE_ID) !== roleMap.REQUESTER) ? true : (Number(roleData.USER_ID) === Number(resRequest.CREATED_USER_ID));
}

//Insert vendor request
function insertVendorRequest(objVendorRequest, userId) {
    if (validateInsertVendorRequest(objVendorRequest, userId)) {
        var resultId = request.insertVendorRequestManual(objVendorRequest, userId);
        if (resultId) {
            vendorMessage.insertVendorRequestMessage(objVendorRequest, userId);
            sendSubmitMail(resultId, userId);
        }

        return resultId;
    }
}

//Insert vendor request manual
function insertVendorRequestManual(objVendorRequest, userId) {
    //Insert vendor
    var resVendor = vendor.insertManualVendor(objVendorRequest, userId);
    objVendorRequest.VENDOR_ID = resVendor;
    objVendorRequest.NAME = objVendorRequest.LEGAL_NAME;
    objVendorRequest.VENDOR_ADDITIONAL_INFORMATION_ID = vendor.insertVendorAdditionalInformation(objVendorRequest, userId);

    //Insert vendor contact information
    var vendorBody = {};
    vendorBody.NAME = objVendorRequest.CONTACT_NAME;
    vendorBody.EMAIL = objVendorRequest.CONTACT_EMAIL;
    vendorBody.PHONE = objVendorRequest.CONTACT_PHONE;
    vendorBody.VENDOR_ID = resVendor;
    vendorBody.DEFAULT_CONTACT_INFORMATION = 1;
    vendorContact.insertVendorContactInformationManual(vendorBody, userId);

    if (validateInsertVendorRequest(objVendorRequest, userId)) {
        objVendorRequest.VENDOR_TYPE_ID = vendorType.VENDOR_REQUEST;
        //Insert the Vendor Request
        var resultId = request.insertVendorRequestManual(objVendorRequest, userId);
        //Insert attachments
        if (objVendorRequest.ATTACHMENTS !== undefined && objVendorRequest.ATTACHMENTS !== null && resultId !== null) {
            (objVendorRequest.ATTACHMENTS).forEach(function (attachment) {
                attachment.VENDOR_TYPE_ID = objVendorRequest.VENDOR_TYPE_ID;
                attachment.VENDOR_ID = resultId;
                businessAttachmentVendor.insertManualAttachmentVendor(attachment, userId);
            });
        }
        //Insert vendor request Data Protection answers
        objVendorRequest.DATA_PROTECTION_ANSWERS.forEach(function (item) {
            insertDataProtectionAnswer(item, resultId, userId);
        });
        if (resultId) {
            if (objVendorRequest.ADDITIONAL_INFORMATION_FLAG && objVendorRequest.ADDITIONAL_INFORMATION && objVendorRequest.ADDITIONAL_INFORMATION.length > 0) {
                objVendorRequest.VENDOR_REQUEST_ID = resultId;
                objVendorRequest.PREVIOUS_STATUS_ID = statusMap.TO_BE_CHECKED;
                objVendorRequest.MESSAGE_CONTENT = objVendorRequest.ADDITIONAL_INFORMATION;
                vendorMessage.insertVendorRequestMessage(objVendorRequest, userId);
            }

            sendSubmitMail(resultId, userId);
        }

        return {"vendorId": resVendor, "newVendorRequestId": resultId};
    }
}

//Delete vendor request
function deleteVendorRequest(objVendorRequest, userId) {
    if (!objVendorRequest.VENDOR_REQUEST_ID) {
        throw ErrorLib.getErrors().CustomError("", "", "The VENDOR_REQUEST_ID is not found");
    }
    if (!existVendorRequest(objVendorRequest.VENDOR_REQUEST_ID, userId)) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Vendor Request " + objVendorRequest.VENDOR_REQUEST_ID + " does not exist");
    }
    return request.deleteVendorRequest(objVendorRequest, userId);
}

//Get vendor request by ID
function getVendorRequestById(vendorRequestId, userId, editionMode) {
    var objRequest = {};
    if (!vendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter vendorRequestId is not found", "", vendorRequestId);
    }
    var roleData = userRole.getUserRoleByUserId(userId);
    var resRequest = request.getVendorRequestById(vendorRequestId, permissionData, userId);

    if (editionMode && !resRequest.EDITABLE) {
        throw ErrorLib.getErrors().BadRequest("Unauthorized request.", "", '{"EDIT_PERMISSION_ERROR": "vendorRequest"}');
    }

    if (validatePermissionByUserRole(roleData[0], resRequest)) {
        resRequest = JSON.parse(JSON.stringify(resRequest));

        if (resRequest && resRequest.VENDOR_REQUEST_ID) {
            objRequest.VENDOR_TYPE_ID = vendorType.VENDOR_REQUEST;
            objRequest.VENDOR_ID = resRequest.VENDOR_REQUEST_ID;
            resRequest.ATTACHMENTS = businessAttachmentVendor.getAttachmentVendorById(objRequest);

            resRequest.DATA_PROTECTION = businessVendorDP.getDataProtectionById(resRequest.VENDOR_REQUEST_ID);

            if (resRequest.ADDITIONAL_INFORMATION_FLAG !== 0) {
                var message = vendorMessage.getVendorRequestMessage(resRequest.VENDOR_REQUEST_ID, userId);
                resRequest.ADDITIONAL_INFORMATION = (message.length > 0) ? message[message.length - 1].MESSAGE_CONTENT : "";

            } else {
                resRequest.ADDITIONAL_INFORMATION = ""; //Avoid 'undefined' in richTextEditor.
            }
        }
        return resRequest;
    } else {
        throw ErrorLib.getErrors().Forbidden("", "", "The user does not have permission to Read/View this Vendor Request.");
    }
}

//Get vendor request by ID manually
function getVendorRequestByIdManual(vendorRequestId, userId) {
    var objRequest = {};
    if (!vendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter vendorRequestId is not found", "", vendorRequestId);
    }
    var resRequest = request.getVendorRequestById(vendorRequestId, permissionData, userId);

    resRequest = JSON.parse(JSON.stringify(resRequest));

    if (resRequest) {
        objRequest.VENDOR_TYPE_ID = vendorType.VENDOR_REQUEST;
        objRequest.VENDOR_ID = resRequest.VENDOR_REQUEST_ID;
        if (objRequest.VENDOR_ID) {
            resRequest.ATTACHMENTS = businessAttachmentVendor.getAttachmentVendorByIdManual(objRequest);
        }
    }
    return resRequest;
}

//Get all vendor request
function getAllVendorRequest() {
    return request.getAllVendorRequest();
}

//UPDATE VENDOR REQUEST ATTACHMENTS
function updateVendorRequestAttachments(reqBody, user_id) {
    var params = {};
    params.VENDOR_TYPE_ID = vendorType.VENDOR_REQUEST;
    params.VENDOR_ID = reqBody.VENDOR_REQUEST_ID;
    var originalAttachments = businessAttachmentVendor.getAttachmentVendorById(params);

    var originalAttachmentsToUpdate = reqBody.ATTACHMENTS;
    if (originalAttachments.length > 0 && originalAttachmentsToUpdate.length === 0) {
        originalAttachments.forEach(function (attachment) {
            businessAttachmentVendor.deleteAttachmentVendorManual(attachment, user_id);
            businessAttachment.deleteManualAttachment(attachment, user_id);
        });
    } else if (originalAttachments.length === 0 && originalAttachmentsToUpdate.length > 0) {
        originalAttachmentsToUpdate.forEach(function (attachment) {
            params.VENDOR_TYPE_ID = vendorType.VENDOR_REQUEST;
            params.VENDOR_ID = reqBody.VENDOR_REQUEST_ID;
            params.ATTACHMENT_ID = attachment.ATTACHMENT_ID;
            businessAttachmentVendor.insertManualAttachmentVendor(params, user_id);
        });

    } else if (originalAttachments.length > 0 && originalAttachmentsToUpdate.length > 0) {

        var insertOriginalAttachments = [];
        var deleteOriginalAttachments = [];

        //DELETE
        originalAttachments.forEach(function (oAttachment) {
            var result = true;
            var oAttachmentId = oAttachment.ATTACHMENT_ID;
            if (typeof oAttachmentId === 'string') {
                oAttachmentId = Number(oAttachmentId);
            }
            originalAttachmentsToUpdate.forEach(function (updateAttach) {
                updateAttach.ATTACHMENT_ID = Number(updateAttach.ATTACHMENT_ID);
                if (oAttachmentId === updateAttach.ATTACHMENT_ID) {
                    result = false;
                }
            });
            if (result) {
                deleteOriginalAttachments.push(oAttachment);
            }
        });

        //INSERT
        originalAttachmentsToUpdate.forEach(function (newAttach) {
            var result = true;
            newAttach.ATTACHMENT_ID = Number(newAttach.ATTACHMENT_ID);
            originalAttachments.forEach(function (attachment) {
                var oAttachmentId = attachment.ATTACHMENT_ID;
                if (typeof oAttachmentId === 'string') {
                    oAttachmentId = Number(oAttachmentId);
                }
                if (newAttach.ATTACHMENT_ID === oAttachmentId) {
                    result = false;
                }
            });
            if (result) {
                insertOriginalAttachments.push(newAttach);
            }
        });
        //ACTIONS
        var data = {};
        if (insertOriginalAttachments.length > 0) {
            insertOriginalAttachments.forEach(function (attachment) {
                data.VENDOR_TYPE_ID = vendorType.VENDOR_REQUEST;
                data.VENDOR_ID = reqBody.VENDOR_REQUEST_ID;
                data.ATTACHMENT_ID = attachment.ATTACHMENT_ID;
                businessAttachmentVendor.insertManualAttachmentVendor(data, user_id);
            });
        }
        if (deleteOriginalAttachments.length > 0) {
            deleteOriginalAttachments.forEach(function (attachment) {
                businessAttachmentVendor.deleteAttachmentVendorManual(attachment, user_id);
                businessAttachment.deleteManualAttachment(attachment, user_id);
            });
        }
    }

}

//Update Data Protection Answers
//DATA PROTECTION
function updateDataProtectionAnswer(item, userId) {
    dataVRDataProtection.updateDataProtectionManual(item, userId);
}

//Update vendor request
function updateVendorRequest(objVendorRequest, userId) {
    //Update data protection
    businessVendorDP.updateDataProtectionManual(objVendorRequest.DATA_PROTECTION_ANSWERS, objVendorRequest.VENDOR_REQUEST_ID, userId);
    if (Object.keys(objVendorRequest.CHANGED_FIELDS).length) {
        bsChangedColumn.insertVendorRequestChangedColumn(objVendorRequest, userId);
    }

    //Update vendor
    vendor.updateManualVendorStatus(objVendorRequest, userId);
    var resVendor = vendor.updateManualVendor(objVendorRequest, userId);
    //Update vendor contact information
    var vendorBody = {};
    vendorBody.NAME = objVendorRequest.CONTACT_NAME;
    vendorBody.EMAIL = objVendorRequest.CONTACT_EMAIL;
    vendorBody.PHONE = objVendorRequest.CONTACT_PHONE;
    vendorBody.VENDOR_ID = objVendorRequest.VENDOR_ID;
    vendorBody.VENDOR_CONTACT_INFORMATION_ID = objVendorRequest.VENDOR_CONTACT_INFORMATION_ID;
    vendorBody.VENDOR_ADDITIONAL_INFORMATION_ID = objVendorRequest.VENDOR_ADDITIONAL_INFORMATION_ID;
    vendorBody.VENDOR_NAME = objVendorRequest.LEGAL_NAME;
    vendorBody.MASKED_VENDOR = objVendorRequest.MASKED_VENDOR;
    vendorBody.DEFAULT_CONTACT_INFORMATION = 1;
    vendorContact.updateVendorContactInformationManual(vendorBody, userId);

    //Update vendor name
    dataVendor.updateManualVendorAdditionalInformation(vendorBody, userId);

    if (!existVendorRequest(objVendorRequest.VENDOR_REQUEST_ID, userId)) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Vendor Request " + objVendorRequest.VENDOR_REQUEST_ID + " does not exist");
    }
    validateParams(objVendorRequest.VENDOR_REQUEST_ID, userId);

    if (Number(objVendorRequest.PREVIOUS_STATUS_ID) !== statusMap.TO_BE_CHECKED && Number(objVendorRequest.PREVIOUS_STATUS_ID) !== statusMap.CHECKED) {
        objVendorRequest.STATUS_ID = statusMap.TO_BE_CHECKED;
        businessStatus.updateVendorRequestStatus(objVendorRequest, userId);
    }

    var keys = ['VENDOR_REQUEST_ID', 'COUNTRY_ID', 'ENTITY_ID', 'COMMODITY_ID', 'SERVICE_SUPPLIER', 'PURCHASE_AMOUNT', 'PURCHASE_CURRENCY_ID', 'ACCEPT_AMERICAN_EXPRESS', 'COST_CENTER_OWNER'];
    var optionalKeys = ['NOT_USED_SAP_SUPPLIER', 'EXPECTED_AMOUNT', 'EXPECTED_CURRENCY_ID', 'ADDITIONAL_INFORMATION'];
    var vendorRequestUrl = "vendorRequestInquiryService/handlePut/updateVendorRequest";
    utilLib.validateObjectAttributes(objVendorRequest, userId, keys, vendorRequestUrl, validateType);
    validateOptionalVendorRequestKeys(optionalKeys, objVendorRequest);

    updateVendorRequestAttachments(objVendorRequest, userId);

    //DATA PROTECTION ANSWERS UPDATE
    if (objVendorRequest.DATA_PROTECTION_ANSWERS.length > 0) {
        (objVendorRequest.DATA_PROTECTION_ANSWERS).forEach(function (item) {
            updateDataProtectionAnswer(item, userId);
        });
    }

    var result = request.updateVendorRequest(objVendorRequest, userId);
    sendResubmitMail(objVendorRequest.VENDOR_REQUEST_ID, userId);
    return {"vendorId": resVendor, "vendorRequestId": result};
}

//Check if the request exists
function existVendorRequest(vendorRequestId, userId) {
    return Object.keys(getVendorRequestByIdManual(vendorRequestId, userId)).length > 0;
}

function validateOptionalVendorRequestKeys(optionalKeys, objVendorRequest) {
    var isValid = false;
    var errors = {};
    var BreakException = {};
    try {
        optionalKeys.forEach(function (optionalKey) {
            // validate attribute type
            isValid = validateType(optionalKey, objVendorRequest[optionalKey]);
            if (!isValid) {
                errors[optionalKey] = objVendorRequest[optionalKey];
                throw BreakException;
            }
        });
        return isValid;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "", JSON.stringify(errors));
        }
    }
}

function validateInsertVendorRequest(objVendorRequest, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'COUNTRY_ID',
        'ENTITY_ID',
        'COMMODITY_ID',
        'SERVICE_SUPPLIER',
        'PURCHASE_AMOUNT',
        'PURCHASE_CURRENCY_ID',
        'ACCEPT_AMERICAN_EXPRESS',
        'COST_CENTER_OWNER',
        'VENDOR_ID',
        'DATA_PROTECTION_ANSWERS'
    ];

    var optionalKeys = [
        'NOT_USED_SAP_SUPPLIER',
        'EXPECTED_AMOUNT',
        'EXPECTED_CURRENCY_ID',
        'ADDITIONAL_INFORMATION'
    ];

    if (!objVendorRequest) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Vendor Request is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objVendorRequest[key] === null || objVendorRequest[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objVendorRequest[key]);
                if (!isValid) {
                    errors[key] = objVendorRequest[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "", JSON.stringify(errors));
        }
    }

    try {
        optionalKeys.forEach(function (optionalKey) {
            // validate attribute type
            isValid = validateType(optionalKey, objVendorRequest[optionalKey]);
            if (!isValid) {
                errors[optionalKey] = objVendorRequest[optionalKey];
                throw BreakException;
            }
        });
        return isValid;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "", JSON.stringify(errors));
        }
    }
}

function validateParams(vendorRequestId, userId) {
    if (!vendorRequestId) {
        throw ErrorLib.getErrors().CustomError("", "", "The vendorRequestId is not found");
    }
    if (!userId) {
        throw ErrorLib.getErrors().CustomError("", "", "The userId is not found");
    }
}

function validateInsertDataProtectionAnswer(reqBody, user_id) {
    if (!user_id) {
        throw ErrorLib.getErrors().BadRequest("The Parameter user_id is not found", "", request_id);
    }

    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['VENDOR_REQUEST_ID',
        'QUESTION_ID',
        'OPTION_ID'];

    if (!reqBody)
        throw ErrorLib.getErrors().CustomError("", "", "The object DataProtection is not found");

    try {
        keys.forEach(function (key) {
            if (reqBody[key] === null || reqBody[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, reqBody[key]);
                if (!isValid) {
                    errors[key] = reqBody[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException)
            throw ErrorLib.getErrors().CustomError("", "", e.toString());
        else
            throw ErrorLib.getErrors().CustomError("", ""
                , JSON.stringify(errors));
    }
    return isValid;
}

//Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'COUNTRY_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'ENTITY_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'COMMODITY_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'NOT_USED_SAP_SUPPLIER':
            valid = (!value) || (value.length >= 0 && value.length <= 1000);
            break;
        case 'SERVICE_SUPPLIER':
            valid = value.length > 0 && value.length <= 1000;
            break;
        case 'PURCHASE_AMOUNT':
            valid = !isNaN(value) && value >= 0;
            break;
        case 'EXPECTED_AMOUNT':
            valid = (!value) || (!isNaN(value) && value >= 0);
            break;
        case 'PURCHASE_CURRENCY_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'EXPECTED_CURRENCY_ID':
            valid = (!value) || (!isNaN(value) && value > 0);
            break;
        case 'ACCEPT_AMERICAN_EXPRESS':
            valid = !isNaN(value) && value >= 0;
            break;
        case 'COST_CENTER_OWNER':
            valid = value.length > 0 && value.length <= 511;
            break;
        case 'ADDITIONAL_INFORMATION':
            valid = (!value) || (value.length > 0 && value.length <= 1000);
            break;
        case 'VENDOR_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'VENDOR_REQUEST_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'STATUS_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'PREVIOUS_STATUS_ID':
            valid = (!value) || (!isNaN(value) && value > 0);
            break;
        case 'USER_ID_STATUS':
            valid = (!value) || (!isNaN(value) && value > 0);
            break;
        case 'MESSAGE_CONTENT':
            valid = value.length > 0 && value.length <= 1000;
            break;
        case 'RETURN_TYPE_ID':
            valid = (!value) || (!isNaN(value) && value > 0);
            break;
        case 'ISSUE_TYPE_ID':
            valid = (!value) || (!isNaN(value) && value > 0);
            break;
        case 'USER_TYPE_ID':
            valid = (!value) || (!isNaN(value) && value > 0);
            break;
        case 'RECEIVER_USER_ID':
            valid = (!value) || (!isNaN(value) && value > 0);
            break;
        case 'DATA_PROTECTION_ANSWERS':
            valid = value.length > 0;
            break;
        case 'QUESTION_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'OPTION_ID':
            valid = !isNaN(value) && value > 0;
            break;
    }
    return valid;
}

function sendSubmitMail(newVendorRequestId, userId) {
    vendorRequestMailSend.sendSubmitMail(newVendorRequestId, userId);
}

function sendResubmitMail(newVendorRequestId, userId) {
    vendorRequestMailSend.sendResubmitMail(newVendorRequestId, userId);
}

function sendMessageMail(vendorRequestObj, userId) {
    var messageType = Number(vendorRequestObj.MESSAGE_TYPE_ID);
    switch (messageType) {
        case messageTypeMap.FYI_ONLY:
            vendorRequestMailSend.sendFYIMail(vendorRequestObj, userId);
            break;
        case messageTypeMap.BM_EYES_ONLY:
            break;
        default:
            vendorRequestMailSend.sendMessageMail(vendorRequestObj, userId);
            break;
    }

}

function getUrlBase() {
    return config.getUrlBase();
}

function getEmailList(vendorRequestObj) {
    return config.getEmailList();
}

function getPath(stringName) {
    return config.getPath(stringName);
}

function getBasicData(stringPathName, additionalParam) {
    return config.getBasicData(stringPathName, additionalParam);
}
