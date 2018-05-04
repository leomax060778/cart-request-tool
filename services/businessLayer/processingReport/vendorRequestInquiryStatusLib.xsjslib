$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataRequest = mapper.getDataVendorRequest();
var dataStatus = mapper.getDataVendorRequestInquiryStatus();
var dataExtendVendor = mapper.getDataExtendVendorRequest();
var businessAttachmentVendor = mapper.getAttachmentVendor();
var businessAttachment = mapper.getAttachment();
var businessVendorDP = mapper.getVendorDataProtection();
var businessVendorInquiryMessage = mapper.getVendorMessage();
var request = mapper.getVendorRequest();
var inquiry = mapper.getVendorInquiry();
var extend = mapper.getExtendVendorRequest();
var change = mapper.getChangeVendorRequest();
var businessUser = mapper.getUser();
var vendor = mapper.getVendor();
var mail = mapper.getMail();
var config = mapper.getDataConfig();
var ErrorLib = mapper.getErrors();
var userRole = mapper.getUserRole();

//CRT Vendor Request email sending
var vendorRequestMailSend = mapper.getVendorRequestMailSend();
//CRT Extend Vendor email sending
var extendVendorMailSend = mapper.getExtendVendorMailSend();
//CRT Change Vendor email sending
var changeVendorMailSend = mapper.getChangeVendorMailSend();
//CRT Vendor Inquiry email sending
var vendorInquiryMailSend = mapper.getVendorInquiryMailSend();

/** ***********END INCLUDE LIBRARIES*************** */

var statusMap = {'IN_PROCESS': 3, 'APPROVED': 5, 'CANCELLED': 6};
var viStatusMap = {'TO_BE_CHECKED': 1, 'RETURN_TO_REQUESTER': 2, 'COMPLETED': 3, 'CANCELLED': 4};

//Vendor types
var vendorType = {"CHANGE_VENDOR_REQUEST": 1, "EXTEND_VENDOR_REQUEST": 2, "VENDOR_INQUIRY": 4, "VENDOR_REQUEST": 3};

var pathName = {
    "CHANGE_VENDOR_MAIL": "CHANGE_VENDOR_REQUEST",
    "EXTEND_VENDOR_MAIL": "EXTEND_VENDOR_REQUEST",
    "VENDOR_INQUIRY_MAIL": "VENDOR_INQUIRY",
    "VENDOR_REQUEST_MAIL": "VENDOR_REQUEST"
};

var resourceMap = {'VENDOR_REQUEST_INQUIRY': 3};
var permissionMap = {'CREATE_EDIT': 10};
var permissionData = {
    RESOURCE_ID: resourceMap.VENDOR_REQUEST_INQUIRY,
    PERMISSION_ID: permissionMap.CREATE_EDIT
};

var additionalParam = {"PARAM": "MESSAGE"};

function validatePermissionByUserRole(roleData, resRequest) {
    return (Number(roleData.ROLE_ID) !== 2) ? true : (Number(roleData.USER_ID) === Number(resRequest.CREATED_USER_ID));
}

//Access validation by Status
function validateAccess(request_type, request_id) {
    var request_status;

    switch (request_type) {
        case "VENDOR_REQUEST":
            request_status = dataStatus.getVendorRequestStatusByVendorRequestId(request_id);
            break;
        case "VENDOR_INQUIRY":
            request_status = dataStatus.getVendorInquiryStatusByVendorInquiryId(request_id);
            break;
        case "EXTEND_VENDOR_REQUEST":
            request_status = dataStatus.getExtendVendorRequestStatusByEVRId(request_id);
            break;
        case "CHANGE_VENDOR_REQUEST":
            request_status = dataStatus.getChangeVendorRequestStatusByCVRId(request_id);
            break;
    }

    if (!request_status) {
        return false;
    }
    return !(request_status.STATUS_NAME === 'Approved' || request_status.STATUS_NAME === 'Cancelled' || request_status.STATUS_NAME === 'Completed');
}

//Get vendor request inquiry by status
function getVendorRequestInquiryByStatus(statusId) {
    if (!statusId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter statusId is not found", "", statusId);
    }
    return dataStatus.getVendorRequestInquiryByStatus(statusId);
}

//Get vendor request inquiry by status administrable
function getVendorRequestInquiryByStatusAdministrable(isAdministrable, userId) {
    if (!isAdministrable) {
        throw ErrorLib.getErrors().BadRequest("The Parameter value is not found", "", isAdministrable);
    }
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var vendorRequestInquiry = dataStatus.getVendorRequestInquiryByStatusAdministrable(isAdministrable, userId);
    vendorRequestInquiry = JSON.parse(JSON.stringify(vendorRequestInquiry));
    vendorRequestInquiry.forEach(function (elem) {
        if (elem.MESSAGE_READ > 0) {
            elem.SHOW_MESSAGE_READ = 1;
        } else {
            elem.SHOW_MESSAGE_READ = 0;
        }
    });
    return vendorRequestInquiry;
}

//Get vendor inquiry by status
function getVendorInquiryByStatus(statusId) {
    if (!statusId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter statusId is not found", "", statusId);
    }
    return dataStatus.getVendorInquiryByStatus(statusId);
}

//Get vendor inquiry by id
function getVendorInquiryById(inquiryId, userId) {
    var objInquiry = {};
    if (!inquiryId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter inquiryId is not found", "", inquiryId);
    }

    if (!validateAccess(pathName.VENDOR_INQUIRY_MAIL, inquiryId)) {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "", '{"NOT_AVAILABLE_IN_PROCESSING": "Vendor Inquiry"}');
    }

    var roleData = userRole.getUserRoleByUserId(userId);
    var resInquiry = dataStatus.getVendorInquiryById(inquiryId);

    if (validatePermissionByUserRole(roleData[0], resInquiry)) {
        resInquiry = JSON.parse(JSON.stringify(resInquiry));
        var vendorInquiryText = businessVendorInquiryMessage.getVendorInquiryMessage(inquiryId, userId);

        var lastVendorInquiryMessage = vendorInquiryText.length - 1;
        if (resInquiry && resInquiry.VENDOR_INQUIRY_ID) {
            objInquiry.VENDOR_TYPE_ID = vendorType.VENDOR_INQUIRY;
            objInquiry.VENDOR_ID = resInquiry.VENDOR_INQUIRY_ID;
            resInquiry.ATTACHMENTS = businessAttachmentVendor.getAttachmentVendorById(objInquiry);
            resInquiry.INQUIRY_TEXT = encodeURIComponent(vendorInquiryText[lastVendorInquiryMessage].MESSAGE_CONTENT);
        }
        return resInquiry;
    } else {
        throw ErrorLib.getErrors().Forbidden("", "", "The user does not have permission to see this Vendor Inquiry.");
    }
}

//Get change vendor request by status
function getChangeVendorRequestByStatus(statusId) {
    if (!statusId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter statusId is not found", "", statusId);
    }
    return dataStatus.getChangeVendorRequestByStatus(statusId);
}

//Get change vendor request by id
function getChangeVendorRequestById(changeId) {
    var objChange = {};
    if (!changeId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter changeId is not found", "", changeId);
    }

    if (!validateAccess(pathName.CHANGE_VENDOR_MAIL, changeId)) {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "", '{"NOT_AVAILABLE_IN_PROCESSING": "Change Vendor Request"}');
    }

    var resChange = dataStatus.getChangeVendorRequestById(changeId);
    resChange = JSON.parse(JSON.stringify(resChange));
    if (resChange && resChange.CHANGE_VENDOR_REQUEST_ID) {
        objChange.VENDOR_TYPE_ID = vendorType.CHANGE_VENDOR_REQUEST;
        objChange.VENDOR_ID = resChange.CHANGE_VENDOR_REQUEST_ID;
        resChange.ATTACHMENTS = businessAttachmentVendor.getAttachmentVendorById(objChange);
    }
    return resChange;
}

//Get change vendor request by id
function getChangeVendorRequestByIdManual(changeId, userId) {
    var objChange = {};
    if (!changeId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter changeId is not found", "", changeId);
    }

    if (!validateAccess(pathName.CHANGE_VENDOR_MAIL, changeId)) {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "", '{"NOT_AVAILABLE_IN_PROCESSING": "Change Vendor Request"}');
    }

    var roleData = userRole.getUserRoleByUserId(userId);
    var resChange = dataStatus.getChangeVendorRequestByIdManual(changeId);
    resChange = JSON.parse(JSON.stringify(resChange));

    if (validatePermissionByUserRole(roleData[0], resChange)) {

        if (resChange && resChange.CHANGE_VENDOR_REQUEST_ID) {
            objChange.VENDOR_TYPE_ID = vendorType.CHANGE_VENDOR_REQUEST;
            objChange.VENDOR_ID = resChange.CHANGE_VENDOR_REQUEST_ID;
            resChange.ATTACHMENTS = businessAttachmentVendor.getAttachmentVendorById(objChange);
        }
        return resChange;
    } else {
        throw ErrorLib.getErrors().Forbidden("", "", "The user does not have permission to see this Change Vendor Request.");
    }
}

//Get extend vendor request by status
function getExtendVendorRequestByStatus(statusId) {
    if (!statusId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter statusId is not found", "", statusId);
    }
    return dataStatus.getExtendVendorRequestByStatus(statusId);
}

//Get extend vendor request by id
function getExtendVendorRequestById(extendId, userId) {
    var objExtend = {};
    if (!extendId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter extendId is not found", "", extendId);
    }

    if (!validateAccess(pathName.EXTEND_VENDOR_MAIL, extendId)) {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "", '{"NOT_AVAILABLE_IN_PROCESSING": "Extend Vendor Request"}');
    }

    var roleData = userRole.getUserRoleByUserId(userId);
    var resExtend = dataStatus.getExtendVendorRequestById(extendId);
    resExtend = JSON.parse(JSON.stringify(resExtend));

    if (validatePermissionByUserRole(roleData[0], resExtend)) {
        if (resExtend && resExtend.EXTEND_VENDOR_REQUEST_ID) {
            objExtend.VENDOR_TYPE_ID = vendorType.EXTEND_VENDOR_REQUEST;
            objExtend.VENDOR_ID = resExtend.EXTEND_VENDOR_REQUEST_ID;
            resExtend.ATTACHMENTS = businessAttachmentVendor.getAttachmentVendorById(objExtend);
        }
        return resExtend;
    } else {
        throw ErrorLib.getErrors().Forbidden("", "", "The user does not have permission to see this Extend Vendor Request.");
    }
}

function getManualExtendVendorRequestById(extendId, userId) {
    if (!extendId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter extendId is not found", "", extendId);
    }
    return dataExtendVendor.getExtendVendorRequestByIdManual(extendId, permissionData, userId);
}

//Get vendor request by status
function getVendorRequestByStatus(statusId) {
    if (!statusId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter statusId is not found", "", statusId);
    }
    return dataStatus.getVendorRequestByStatus(statusId);
}

//Get vendor request by id
function getVendorRequestById(requestId, userId) {
    var objRequest = {};
    if (!requestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter requestId is not found", "", requestId);
    }

    if (!validateAccess(pathName.VENDOR_REQUEST_MAIL, requestId)) {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "", '{"NOT_AVAILABLE_IN_PROCESSING": "Vendor Request"}');
    }

    var resRequest = dataStatus.getVendorRequestById(requestId);
    resRequest = JSON.parse(JSON.stringify(resRequest));
    var roleData = userRole.getUserRoleByUserId(userId);

    if (validatePermissionByUserRole(roleData[0], resRequest)) {

        if (resRequest && resRequest.VENDOR_REQUEST_ID) {
            objRequest.VENDOR_TYPE_ID = vendorType.VENDOR_REQUEST;
            objRequest.VENDOR_ID = resRequest.VENDOR_REQUEST_ID;
            resRequest.ATTACHMENTS = businessAttachmentVendor.getAttachmentVendorById(objRequest);

            var resDataProtection = businessVendorDP.getDataProtectionById(resRequest.VENDOR_REQUEST_ID);
            resDataProtection = JSON.parse(JSON.stringify(resDataProtection));
            resDataProtection.forEach(function (elem) {
                if (resDataProtection.indexOf(elem) % 2 === 0) {
                    elem.INDEX_TYPE = 'odd';
                } else {
                    elem.INDEX_TYPE = 'even';
                }
            });
            resRequest.DATA_PROTECTION = resDataProtection;
        }

        return resRequest;
    } else {
        throw ErrorLib.getErrors().Forbidden("", "", "The user does not have permission to see this Vendor Request.");
    }
}

//Update vendor inquiry status
function updateVendorInquiryStatus(objVendorInquiry, userId) {
    if (validateUpdateVendorInquiryStatus(objVendorInquiry, userId)) {
        if (!inquiry.existVendorInquiry(objVendorInquiry.VENDOR_INQUIRY_ID, userId)) {
            throw ErrorLib.getErrors().CustomError("", "", "The object Vendor Inquiry " + objVendorInquiry.VENDOR_INQUIRY_ID + " does not exist");
        }

        if (Number(objVendorInquiry.STATUS_ID) === viStatusMap.COMPLETED) {
            return dataStatus.updateVendorInquiryStatusCompleted(objVendorInquiry, userId);
        } else {
            return dataStatus.updateVendorInquiryStatus(objVendorInquiry, userId);
        }

    }
}

//Update change vendor request status
function updateChangeVendorRequestStatus(objChangeVendorRequest, userId) {
    if (validateUpdateChangeVendorRequest(objChangeVendorRequest, userId)) {
        if (!change.existChangeVendorRequest(objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID, userId)) {
            throw ErrorLib.getErrors().CustomError("", "", "The object Change Vendor Request " + objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID + " does not exist");
        }
        if (Number(objChangeVendorRequest.STATUS_ID) === statusMap.APPROVED) {
            return dataStatus.updateChangeVendorRequestStatusCompleted(objChangeVendorRequest, userId);
        } else {
            return dataStatus.updateChangeVendorRequestStatus(objChangeVendorRequest, userId);
        }
    }
}

//Update extend vendor request status
function updateExtendVendorRequestStatus(objExtendVendorRequest, userId) {
    if (validateUpdateExtendVendorRequest(objExtendVendorRequest, userId)) {
        if (!extend.existExtendVendorRequest(objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID, userId)) {
            throw ErrorLib.getErrors().CustomError("", "", "The object Extend Vendor Request " + objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID + " does not exist");
        }
        if (Number(Number(objExtendVendorRequest.STATUS_ID)) === statusMap.APPROVED) {
            return dataStatus.updateExtendVendorRequestStatusCompleted(objExtendVendorRequest, userId);
        } else {
            return dataStatus.updateExtendVendorRequestStatus(objExtendVendorRequest, userId);
        }
    }
}

//Update vendor request status
function updateVendorRequestStatus(objVendorRequest, userId) {
    if (validateUpdateVendorRequestStatus(objVendorRequest, userId)) {
        if (!request.existVendorRequest(objVendorRequest.VENDOR_REQUEST_ID, userId)) {
            throw ErrorLib.getErrors().CustomError("", "", "The object Vendor Request " + objVendorRequest.VENDOR_REQUEST_ID + " does not exist");
        }
        vendor.updateManualVendorStatus(objVendorRequest, userId);
        switch (Number(objVendorRequest.STATUS_ID)) {
            case statusMap.APPROVED:
                if (!vendor.existVendor(objVendorRequest.VENDOR_ID)) {
                    throw ErrorLib.getErrors().CustomError("", "", "The vendor with the id \'" + objVendorRequest.VENDOR_ID + "\' does not exist");
                }
                vendor.updateVendorAccountManual(objVendorRequest, userId);
                return dataStatus.updateVendorRequestStatusCompleted(objVendorRequest, userId);
            case statusMap.CANCELLED:
                return dataStatus.updateVendorRequestStatusCompleted(objVendorRequest, userId);
            default:
                return dataStatus.updateVendorRequestStatus(objVendorRequest, userId);
        }
    }
}

//Update vendor inquiry status manual
function updateVendorInquiryStatusManual(objVendorInquiry, userId) {
    if (validateUpdateVendorInquiryStatus(objVendorInquiry, userId)) {
        if (!inquiry.existVendorInquiry(objVendorInquiry.VENDOR_INQUIRY_ID, userId)) {
            throw ErrorLib.getErrors().CustomError("", "", "The object Vendor Inquiry " + objVendorInquiry.VENDOR_INQUIRY_ID + " does not exist");
        }
        return dataStatus.updateVendorInquiryStatusManual(objVendorInquiry, userId);
    }
}

//Update change vendor request status manual
function updateChangeVendorRequestStatusManual(objChangeVendorRequest, userId) {
    if (validateUpdateChangeVendorRequest(objChangeVendorRequest, userId)) {
        if (!change.existChangeVendorRequest(objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID, userId)) {
            throw ErrorLib.getErrors().CustomError("", "", "The object Change Vendor Request " + objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID + " does not exist");
        }
        if (Number(objChangeVendorRequest.STATUS_ID) === statusMap.APPROVED) {
            return dataStatus.updateChangeVendorRequestStatusCompletedManual(objChangeVendorRequest, userId);
        } else {
            return dataStatus.updateChangeVendorRequestStatusManual(objChangeVendorRequest, userId);
        }
    }
}

//Update extend vendor request status manual
function updateExtendVendorRequestStatusManual(objExtendVendorRequest, userId) {
    if (validateUpdateExtendVendorRequest(objExtendVendorRequest, userId)) {
        if (!extend.existExtendVendorRequest(objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID, userId)) {
            throw ErrorLib.getErrors().CustomError("", "", "The object Extend Vendor Request " + objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID + " does not exist");
        }
        if (Number(objExtendVendorRequest.STATUS_ID) === statusMap.APPROVED) {
            return dataStatus.updateExtendVendorRequestStatusCompletedManual(objExtendVendorRequest, userId);
        } else {
            return dataStatus.updateExtendVendorRequestStatusManual(objExtendVendorRequest, userId);
        }
    }
}

//Update vendor request status manual
function updateVendorRequestStatusManual(objVendorRequest, userId) {
    if (validateUpdateVendorRequestStatus(objVendorRequest, userId)) {
        if (!request.existVendorRequest(objVendorRequest.VENDOR_REQUEST_ID, userId)) {
            throw ErrorLib.getErrors().CustomError("", "", "The object Vendor Request " + objVendorRequest.VENDOR_REQUEST_ID + " does not exist");
        }
        if (Number(objVendorRequest.STATUS_ID) === statusMap.APPROVED) {
            return dataStatus.updateVendorRequestStatusCompletedManual(objVendorRequest, userId);
        } else {
            return dataStatus.updateVendorRequestStatusManual(objVendorRequest, userId);
        }
    }
}

//UPDATE CHANGE VENDOR ATTACHMENTS
function updateChangeVendorAttachments(reqBody, user_id) {
    var params = {};
    params.VENDOR_TYPE_ID = vendorType.CHANGE_VENDOR_REQUEST;
    params.VENDOR_ID = reqBody.CHANGE_VENDOR_REQUEST_ID;
    var original_attachments = businessAttachmentVendor.getAttachmentVendorById(params);

    var originalAttachmentsToUpdate = reqBody.ATTACHMENTS;
    if (original_attachments.length > 0 && originalAttachmentsToUpdate.length === 0) {
        original_attachments.forEach(function (attachment) {
            businessAttachmentVendor.deleteAttachmentVendorManual(attachment, user_id);
            businessAttachment.deleteManualAttachment(attachment, user_id);
        });
    } else if (original_attachments.length === 0 && originalAttachmentsToUpdate.length > 0) {
        originalAttachmentsToUpdate.forEach(function (attachment) {
            params.VENDOR_TYPE_ID = vendorType.CHANGE_VENDOR_REQUEST;
            params.VENDOR_ID = reqBody.CHANGE_VENDOR_REQUEST_ID;
            params.ATTACHMENT_ID = attachment.ATTACHMENT_ID;
            businessAttachmentVendor.insertManualAttachmentVendor(params, user_id);
        });

    } else if (original_attachments.length > 0 && originalAttachmentsToUpdate.length > 0) {

        var insertOriginalAttachments = [];
        var deleteOriginalAttachments = [];

        //DELETE
        original_attachments.forEach(function (o_attachment) {
            var result = true;
            var o_attachment_id = o_attachment.ATTACHMENT_ID;
            if (typeof o_attachment_id === 'string') {
                o_attachment_id = Number(o_attachment_id);
            }
            originalAttachmentsToUpdate.forEach(function (updateAttach) {
                updateAttach.ATTACHMENT_ID = Number(updateAttach.ATTACHMENT_ID);
                if (o_attachment_id === updateAttach.ATTACHMENT_ID) {
                    result = false;
                }
            });
            if (result) {
                deleteOriginalAttachments.push(o_attachment);
            }
        });

        //INSERT
        originalAttachmentsToUpdate.forEach(function (newAttach) {
            var result = true;
            newAttach.ATTACHMENT_ID = Number(newAttach.ATTACHMENT_ID);
            original_attachments.forEach(function (attachment) {
                var o_attachment_id = attachment.ATTACHMENT_ID;
                if (typeof o_attachment_id === 'string') {
                    o_attachment_id = Number(o_attachment_id);
                }
                if (newAttach.ATTACHMENT_ID === o_attachment_id) {
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
                data.VENDOR_TYPE_ID = vendorType.CHANGE_VENDOR_REQUEST;
                data.VENDOR_ID = reqBody.CHANGE_VENDOR_REQUEST_ID;
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

//Validate update vendor inquiry status
function validateUpdateVendorInquiryStatus(objVendorInquiry, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'VENDOR_INQUIRY_ID',
        'STATUS_ID',
        'PREVIOUS_STATUS_ID'];

    if (!objVendorInquiry) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Vendor Inquiry is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objVendorInquiry[key] === null || objVendorInquiry[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objVendorInquiry[key]);
                if (!isValid) {
                    errors[key] = objVendorInquiry[key];
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
    return isValid;
}

//Validate update change vendor request status
function validateUpdateChangeVendorRequest(objChangeVendorRequest, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'CHANGE_VENDOR_REQUEST_ID',
        'STATUS_ID',
        'PREVIOUS_STATUS_ID'];
    if (objChangeVendorRequest.STATUS_ID === statusMap.IN_PROCESS || objChangeVendorRequest.STATUS_ID === statusMap.APPROVED) {
        keys.push('RECEIVER_YVC_REQUEST', 'VENDOR_ACCOUNT');
    }

    if (!objChangeVendorRequest) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Vendor Request is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objChangeVendorRequest[key] === null || objChangeVendorRequest[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objChangeVendorRequest[key]);
                if (!isValid) {
                    errors[key] = objChangeVendorRequest[key];
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
    return isValid;
}

//Validate update extend vendor request status
function validateUpdateExtendVendorRequest(objExtendVendorRequest, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'EXTEND_VENDOR_REQUEST_ID',
        'STATUS_ID',
        'PREVIOUS_STATUS_ID'];

    if (Number(objExtendVendorRequest.STATUS_ID) === statusMap.IN_PROCESS || (Number(objExtendVendorRequest.STATUS_ID) === statusMap.APPROVED)) {
        keys.push('RECEIVER_YVC_REQUEST');
    }

    if (Number(objExtendVendorRequest.STATUS_ID) === statusMap.APPROVED) {
        keys.push('VENDOR_ACCOUNT');
    }

    if (!objExtendVendorRequest) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Vendor Request is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objExtendVendorRequest[key] === null || objExtendVendorRequest[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objExtendVendorRequest[key]);
                if (!isValid) {
                    errors[key] = objExtendVendorRequest[key];
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
    return isValid;
}

//Validate update vendor request status
function validateUpdateVendorRequestStatus(objVendorRequest, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['VENDOR_REQUEST_ID',
        'STATUS_ID',
        'PREVIOUS_STATUS_ID'];

    if (objVendorRequest.STATUS_ID === statusMap.IN_PROCESS || objVendorRequest.STATUS_ID === statusMap.APPROVED) {
        keys.push('RECEIVER_YVC_REQUEST');
    }

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
    return isValid;
}

//Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'VENDOR_INQUIRY_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'CHANGE_VENDOR_REQUEST_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'EXTEND_VENDOR_REQUEST_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'VENDOR_REQUEST_ID':
            valid = (!value) || (!isNaN(value) && value > 0);
            break;
        case 'RECEIVER_USER_ID':
            valid = (!value) || (!isNaN(value) && value > 0);
            break;
        case 'RECEIVER_YVC_REQUEST':
            valid = (!value) || (value.length > 0 && value.length <= 255);
            break;
        case 'PREVIOUS_STATUS_ID':
            valid = (!value) || (!isNaN(value) && value > 0);
            break;
        case 'USER_ID_STATUS':
            valid = (!value) || (!isNaN(value) && value > 0);
            break;
        case 'STATUS_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'VENDOR_ACCOUNT':
            valid = (value.length > 0 && value.length <= 255);
            break;
    }
    return valid;
}

function sendChangeVendorMailByStatus(objRequest, userId) {
    if (objRequest.STATUS_ID && (Number(objRequest.STATUS_ID) > 2 && Number(objRequest.STATUS_ID) < 7)) {
        var changeVendorRequestMailObj = {};
        changeVendorRequestMailObj.VENDOR_ID = objRequest.VENDOR_ACCOUNT;
        changeVendorRequestMailObj.CHANGE_VENDOR_REQUEST_ID = objRequest.CHANGE_VENDOR_REQUEST_ID;
        var statusId = objRequest.STATUS_ID;
        switch (statusId) {
            case '3':
                changeVendorMailSend.sendInProcessMail(changeVendorRequestMailObj, userId);
                break;
            case '4':
                changeVendorMailSend.sendReturnToRequestMail(changeVendorRequestMailObj.CHANGE_VENDOR_REQUEST_ID, userId);
                break;
            case '5':
                changeVendorMailSend.sendApprovedMail(changeVendorRequestMailObj, userId);
                break;
            case '6':
                changeVendorMailSend.sendCancelledMail(changeVendorRequestMailObj, userId);
                break;
        }
    }
}

function sendExtendVendorMailByStatus(objRequest, extendVendorData, userId) {
    if (objRequest.STATUS_ID && (Number(objRequest.STATUS_ID) > 2 && Number(objRequest.STATUS_ID) < 7)) {
        var extendVendorRequestMailObj = {};

        extendVendorRequestMailObj.EXTEND_VENDOR_REQUEST_ID = objRequest.EXTEND_VENDOR_REQUEST_ID;
        extendVendorRequestMailObj.RECEIVER_YVC_REQUEST = objRequest.RECEIVER_YVC_REQUEST;
        extendVendorRequestMailObj.VENDOR_ID = extendVendorData.VENDOR_ID;
        var statusId = objRequest.STATUS_ID;
        switch (statusId) {
            case '3':
                extendVendorMailSend.sendInProcessMail(extendVendorRequestMailObj, userId);
                break;
            case '4':
                extendVendorMailSend.sendReturnToRequestMail(extendVendorRequestMailObj.EXTEND_VENDOR_REQUEST_ID, userId);
                break;
            case '5':
                extendVendorMailSend.sendApprovedMail(extendVendorRequestMailObj, userId);
                break;
            case '6':
                extendVendorMailSend.sendCancelledMail(extendVendorRequestMailObj, userId);
                break;
        }
    }
}

function sendVendorInquiryMailByStatus(objRequest, userId) {
    if (objRequest.STATUS_ID && (Number(objRequest.STATUS_ID) > 1 && Number(objRequest.STATUS_ID) < 5)) {
        var vendorInquiryMailObj = {};

        vendorInquiryMailObj.VENDOR_INQUIRY_ID = objRequest.VENDOR_INQUIRY_ID;
        var statusId = objRequest.STATUS_ID;
        switch (statusId) {
            case '2':
                vendorInquiryMailSend.sendReturnToRequestMail(vendorInquiryMailObj.VENDOR_INQUIRY_ID, userId);
                break;
            case '3':
                vendorInquiryMailSend.sendCompletedMail(vendorInquiryMailObj, userId);
                break;
            case '4':
                vendorInquiryMailSend.sendCancelledMail(vendorInquiryMailObj, userId);
                break;
        }
    }
}

function sendVendorRequestMailByStatus(objRequest, userId) {
    if (objRequest.STATUS_ID && (Number(objRequest.STATUS_ID) > 2 && Number(objRequest.STATUS_ID) < 7)) {
        var vendorRequestMailObj = {};

        vendorRequestMailObj.VENDOR_REQUEST_ID = objRequest.VENDOR_REQUEST_ID;
        vendorRequestMailObj.RECEIVER_YVC_REQUEST = objRequest.RECEIVER_YVC_REQUEST;
        vendorRequestMailObj.VENDOR_ID = objRequest.VENDOR_ID;
        var statusId = objRequest.STATUS_ID;
        switch (statusId) {
            case '3':
                vendorRequestMailSend.sendInProcessMail(vendorRequestMailObj, userId);
                break;
            case '4':
                vendorRequestMailSend.sendReturnToRequestMail(vendorRequestMailObj.VENDOR_REQUEST_ID, userId);
                break;
            case '5':
                vendorRequestMailSend.sendApprovedMail(vendorRequestMailObj, userId);
                break;
            case '6':
                vendorRequestMailSend.sendCancelledMail(vendorRequestMailObj, userId);
                break;
        }
    }
}

function getUrlBase() {
    return config.getUrlBase();
}

function getEmailList() {
    return config.getEmailList();
}

function getPath(stringName) {
    return config.getPath(stringName);
}

function getBasicData(stringPathName, additionalParam) {
    return config.getBasicData(stringPathName, additionalParam);
}
