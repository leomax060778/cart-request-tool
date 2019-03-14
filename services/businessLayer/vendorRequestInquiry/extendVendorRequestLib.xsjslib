$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var extend = mapper.getDataExtendVendorRequest();
var extendVendorMail = mapper.getExtendVendorMail();
var vendorMessage = mapper.getVendorMessage();

var businessAttachmentVendor = mapper.getAttachmentVendor();
var businessAttachment = mapper.getAttachment();
var businessUser = mapper.getUser();
var businessStatus = mapper.getVendorRequestInquiryStatus();
var businessChangeColumn = mapper.getVendorRequestInquiryChangedColumn();

var mail = mapper.getMail();
var extendVendorMailSend = mapper.getExtendVendorMailSend();

var config = mapper.getDataConfig();
var userRole = mapper.getUserRole();
var dataUserRole = mapper.getDataUserRole();

var utilLib = mapper.getUtil();
var ErrorLib = mapper.getErrors();
var dbHelper = mapper.getdbHelper();

/** ***********END INCLUDE LIBRARIES*************** */

var statusMap = {'TO_BE_CHECKED': 1, 'CHECKED': 2, 'IN_PROCESS': 3, 'RETURN_TO_REQUESTER': 4, 'APPROVED': 5, 'CANCELLED': 6};
var vendorType = {"EXTEND_VENDOR_REQUEST": 2};
var pathName = "EXTEND_VENDOR_REQUEST";
var messageTypeMap = {'FYI_ONLY': 1, 'BM_EYES_ONLY': 2, 'REQUEST_RESPONSE': 3};

var resourceMap = {'VENDOR_REQUEST_INQUIRY': 3};
var permissionMap = {'CREATE_EDIT': 10};

var permissionData = {
    RESOURCE_ID: resourceMap.VENDOR_REQUEST_INQUIRY,
    PERMISSION_ID: permissionMap.CREATE_EDIT
};

var roleMap = {
    "SUPER_ADMIN": 1,
    "REQUESTER": 2,
    "BUSINESS_MGT": 3,
    "BUDGET_OWNER": 4
};

function validatePermissionByUserRole(roleData, resRequest){
	return (Number(roleData.ROLE_ID) !== roleMap.REQUESTER)? true : (Number(roleData.USER_ID) === Number(resRequest.CREATED_USER_ID));
}

//Insert extend vendor request
function insertExtendVendorRequest(objExtendVendorRequest, userId) {
		var result_id;
		if (validateInsertExtendVendorRequest(objExtendVendorRequest, userId)) {
			try{
					objExtendVendorRequest.VENDOR_TYPE_ID = vendorType.EXTEND_VENDOR_REQUEST;
		        	//Insert the Extend Vendor
		        	result_id = extend.insertExtendVendorRequestManual(objExtendVendorRequest, userId);

		        	if(objExtendVendorRequest.ATTACHMENTS !== undefined && objExtendVendorRequest.ATTACHMENTS !== null && result_id !== null){
		           		(objExtendVendorRequest.ATTACHMENTS).forEach(function(attachment){
		        			attachment.VENDOR_TYPE_ID = objExtendVendorRequest.VENDOR_TYPE_ID;
		        			attachment.VENDOR_ID = result_id;
		        			businessAttachmentVendor.insertManualAttachmentVendor(attachment, userId);
		           		});
		        	}
		        	if(result_id){
		    			if(objExtendVendorRequest.ADDITIONAL_INFORMATION_FLAG && objExtendVendorRequest.ADDITIONAL_INFORMATION && objExtendVendorRequest.ADDITIONAL_INFORMATION.length > 0){
		    				objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID = result_id;
		    				objExtendVendorRequest.PREVIOUS_STATUS_ID = statusMap.TO_BE_CHECKED;
		    				objExtendVendorRequest.MESSAGE_CONTENT = objExtendVendorRequest.ADDITIONAL_INFORMATION;
		        			vendorMessage.insertExtendVendorRequestMessageManual(objExtendVendorRequest, userId);
		    			}
		    		}

		        	dbHelper.commit();
    			} catch (e) {
	    			dbHelper.rollback();
	    			throw ErrorLib.getErrors().CustomError("", e.toString(),
	    			 		"insertExtendVendorRequest");
    			} finally {
    				dbHelper.closeConnection();
    			}

        }

		return result_id;
}

//Delete extend vendor request
function deleteExtendVendorRequest(objExtendVendorRequest, userId) {
    if (!objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID) {
        throw ErrorLib.getErrors().CustomError("", "", "The VENDOR_REQUEST_ID is not found");
    }
    if(!existExtendVendorRequest(objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID, userId)){
        throw ErrorLib.getErrors().CustomError("", "", "The object Extend Vendor Request " + objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID + " does not exist");
    }
    return extend.deleteExtendVendorRequest(objExtendVendorRequest, userId);
}

//Get extend vendor request by ID
function getExtendVendorRequestById(extendVendorRequestId, userId, edition_mode) {
	var objExtend = {};
	if (!extendVendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter extendVendorRequestId is not found", "", extendVendorRequestId);
    }

	var roleData = userRole.getUserRoleByUserId(userId);
    var resExtend = extend.getExtendVendorRequestById(extendVendorRequestId, permissionData, userId);
    if(edition_mode && !resExtend.EDITABLE){
		throw ErrorLib.getErrors().BadRequest(
				"Unauthorized request.",
				"",
				'{"EDIT_PERMISSION_ERROR": "extendVendorRequest"}');
	}
    resExtend = JSON.parse(JSON.stringify(resExtend));

    if(validatePermissionByUserRole(roleData[0], resExtend)){
        if (resExtend && resExtend.EXTEND_VENDOR_REQUEST_ID) {
            objExtend.VENDOR_TYPE_ID = vendorType.EXTEND_VENDOR_REQUEST;
            objExtend.VENDOR_ID = resExtend.EXTEND_VENDOR_REQUEST_ID;
            resExtend.ATTACHMENTS = businessAttachmentVendor.getAttachmentVendorById(objExtend);

            if (resExtend.ADDITIONAL_INFORMATION_FLAG !== 0) {
                var message = vendorMessage.getExtendVendorRequestMessage(resExtend.EXTEND_VENDOR_REQUEST_ID, userId);
                resExtend.ADDITIONAL_INFORMATION = (message.length > 0) ? message[message.length - 1].MESSAGE_CONTENT : "";
            } else {
                resExtend.ADDITIONAL_INFORMATION = ""; //Avoid 'undefined' in richTextEditor.
            }
        }

	    return resExtend;
    } else{
    	throw ErrorLib.getErrors().Forbidden("", "", "The user does not have permission to Read/View this Extend Vendor Request.");
    }
}

//Get extend vendor request by ID manually
function getExtendVendorRequestByIdManual(extendVendorRequestId, userId) {
    var objExtend = {};
	if (!extendVendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter extendVendorRequestId is not found", "", extendVendorRequestId);
    }

    var resExtend = extend.getExtendVendorRequestByIdManual(extendVendorRequestId, permissionData, userId);
    resExtend = JSON.parse(JSON.stringify(resExtend));
    if(resExtend && resExtend.EXTEND_VENDOR_REQUEST_ID){
    	objExtend.VENDOR_TYPE_ID = vendorType.EXTEND_VENDOR_REQUEST;
    	objExtend.VENDOR_ID = resExtend.EXTEND_VENDOR_REQUEST_ID;
        resExtend.ATTACHMENTS = businessAttachmentVendor.getAttachmentVendorById(objExtend);
    }
    return resExtend;

}

//Get all extend vendor request
function getAllExtendVendorRequest() {
    return extend.getAllExtendVendorRequest();
}

//Update extend vendor request
function updateExtendVendorRequest(objExtendVendorRequest, userId) {
    if (!existExtendVendorRequest(objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID, userId)) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Extend Vendor Request " + objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID + " does not exist");
    }
    validateParams(objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID, userId);
    if (Object.keys(objExtendVendorRequest.CHANGED_FIELDS).length) {
        businessChangeColumn.insertExtendVendorRequestChangedColumn(objExtendVendorRequest, userId);
    }
    if (Number(objExtendVendorRequest.PREVIOUS_STATUS_ID) !== statusMap.TO_BE_CHECKED && Number(objExtendVendorRequest.PREVIOUS_STATUS_ID) !== statusMap.CHECKED) {
        objExtendVendorRequest.STATUS_ID = statusMap.TO_BE_CHECKED;
        businessStatus.updateExtendVendorRequestStatus(objExtendVendorRequest, userId);
    }

    var keys = ['EXTEND_VENDOR_REQUEST_ID', 'ENTITY_ID', 'COMMODITY_ID', 'SERVICE_SUPPLIER', 'PURCHASE_AMOUNT', 'PURCHASE_CURRENCY_ID', 'VENDOR_LEGAL_NAME', 'VENDOR_CONTACT_NAME', 'VENDOR_CONTACT_EMAIL'];
    var optionalKeys = ['EXPECTED_AMOUNT', 'EXPECTED_CURRENCY_ID'];
    var extendVendorRequestUrl = "vendorRequestInquiryService/handlePut/updateExtendVendorInquiry";
    utilLib.validateObjectAttributes(objExtendVendorRequest, userId, keys, extendVendorRequestUrl, validateType);
    validateOptionalExtendVendorRequestKeys(optionalKeys, objExtendVendorRequest);
    updateExtendVendorAttachments(objExtendVendorRequest, userId);
    return extend.updateExtendVendorRequest(objExtendVendorRequest, userId);
}

//UPDATE EXTEND VENDOR ATTACHMENTS
function updateExtendVendorAttachments(reqBody, user_id){
	var params = {};
	params.VENDOR_TYPE_ID = vendorType.EXTEND_VENDOR_REQUEST;
	params.VENDOR_ID = reqBody.EXTEND_VENDOR_REQUEST_ID;
	var original_attachments = businessAttachmentVendor.getAttachmentVendorById(params);

	var originalAttachmentsToUpdate = reqBody.ATTACHMENTS;
	if(original_attachments.length > 0 && originalAttachmentsToUpdate.length === 0){
		original_attachments.forEach(function(attachment){
			businessAttachmentVendor.deleteAttachmentVendorManual(attachment, user_id);
			businessAttachment.deleteManualAttachment(attachment, user_id);
		});
	}else if(original_attachments.length === 0 && originalAttachmentsToUpdate.length > 0){
		originalAttachmentsToUpdate.forEach(function(attachment){
    		params.VENDOR_TYPE_ID = vendorType.EXTEND_VENDOR_REQUEST;
    		params.VENDOR_ID = reqBody.EXTEND_VENDOR_REQUEST_ID;
    		params.ATTACHMENT_ID = attachment.ATTACHMENT_ID;
    		businessAttachmentVendor.insertManualAttachmentVendor(params, user_id);
    	});

	} else if(original_attachments.length > 0 && originalAttachmentsToUpdate.length > 0){

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
	    if(insertOriginalAttachments.length > 0){
	    	insertOriginalAttachments.forEach(function(attachment){
	    		data.VENDOR_TYPE_ID = vendorType.EXTEND_VENDOR_REQUEST;
	    		data.VENDOR_ID = reqBody.EXTEND_VENDOR_REQUEST_ID;
	    		data.ATTACHMENT_ID = attachment.ATTACHMENT_ID;
	    		businessAttachmentVendor.insertManualAttachmentVendor(data, user_id);
	    	});
	    }
	    if(deleteOriginalAttachments.length > 0){
	    	deleteOriginalAttachments.forEach(function(attachment){
	    		businessAttachmentVendor.deleteAttachmentVendorManual(attachment, user_id);
				businessAttachment.deleteManualAttachment(attachment, user_id);
	    	});
	    }
	}

}

//Check if the request exists
function existExtendVendorRequest(extendVendorRequestId, userId) {
    return Object.keys(getExtendVendorRequestByIdManual(extendVendorRequestId, userId)).length > 0;
}

function validateOptionalExtendVendorRequestKeys(optionalKeys, objExtendVendorRequest) {
    var isValid = false;
    var errors = {};
	var BreakException = {};
    try {
        optionalKeys.forEach(function (optionalKey) {
            // validate attribute type
            isValid = validateType(optionalKey, objExtendVendorRequest[optionalKey]);
            if (!isValid) {
                errors[optionalKey] = objExtendVendorRequest[optionalKey];
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

function validateInsertExtendVendorRequest(objExtendVendorRequest, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'ENTITY_ID',
        'COMMODITY_ID',
        'SERVICE_SUPPLIER',
        'PURCHASE_AMOUNT',
        'PURCHASE_CURRENCY_ID',
        'VENDOR_LEGAL_NAME',
        'VENDOR_CONTACT_NAME',
        'VENDOR_CONTACT_EMAIL'
    ];

    var optionalKeys = ['EXPECTED_AMOUNT',
        'EXPECTED_CURRENCY_ID'
    ];

    if (!objExtendVendorRequest) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Extend Vendor Request is not found");
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

    try {
        optionalKeys.forEach(function (optionalKey) {
            // validate attribute type
            isValid = validateType(optionalKey, objExtendVendorRequest[optionalKey]);
            if (!isValid) {
                errors[optionalKey] = objExtendVendorRequest[optionalKey];
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

function validateParams(extendVendorRequestId, userId) {
	if (!extendVendorRequestId) {
		throw ErrorLib.getErrors().CustomError("", "",
				"The extendVendorRequestId is not found");
	}
	if (!userId) {
		throw ErrorLib.getErrors().CustomError("", "",
				"The userId is not found");
	}
}

//Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'EXTEND_VENDOR_REQUEST_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'ENTITY_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'COMMODITY_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'SERVICE_SUPPLIER':
            valid = value.length > 0 && value.length <= 1000;
            break;
        case 'PURCHASE_AMOUNT':
            valid = !isNaN(value) && value >= 0;
            break;
        case 'EXPECTED_AMOUNT':
            valid =  (!value) || (!isNaN(value) && value >= 0);
            break;
        case 'PURCHASE_CURRENCY_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'EXPECTED_CURRENCY_ID':
            valid =  (!value) || (!isNaN(value) && value > 0);
            break;
        case 'ADDITIONAL_INFORMATION':
            valid =  (!value) || (value.length >= 0 && value.length <= 1000);
            break;
        case 'VENDOR_LEGAL_NAME':
            valid = (!value) || (value.length >= 0 && value.length <= 255);
            break;
        case 'VENDOR_CONTACT_NAME':
        	valid = (!value) || (value.length >= 0 && value.length <= 255);
        	break;
        case 'VENDOR_CONTACT_EMAIL':
        	valid = (!value) || (value.length >= 0 && value.length <= 255);
        	break;
    }
    return valid;
}

function sendSubmitMail(extendVendorRequestId, userId){
	extendVendorMailSend.sendSubmitMail(extendVendorRequestId, userId);
}

function sendResubmitMail(extendVendorRequestId, userId){
	extendVendorMailSend.sendResubmitMail(extendVendorRequestId, userId);
}

function sendMessageMail(extendVendorRequest, userId){
	var messageType = Number(extendVendorRequest.MESSAGE_TYPE_ID);
	switch(messageType){
    case messageTypeMap.FYI_ONLY:
    	extendVendorMailSend.sendFYIMail(extendVendorRequest, userId);
        break;
    case messageTypeMap.BM_EYES_ONLY:
    	break;
    default:
    	extendVendorMailSend.sendMessageMail(extendVendorRequest, userId);
        break;
	}
}

function getUrlBase(){
	return config.getUrlBase();
}

function getEmailList(){
	return config.getEmailList();
}

function getPath(stringName){
	return config.getPath(stringName);
}

function getBasicData(stringPathName, additionalParam){
	return config.getBasicData(stringPathName, additionalParam);
}