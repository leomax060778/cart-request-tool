$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var change = mapper.getDataChangeVendorRequest();
var changeVendorMail = mapper.getChangeVendorMail();
var businessAttachmentVendor = mapper.getAttachmentVendor();
var businessAttachment = mapper.getAttachment();
var businessUser = mapper.getUser();
var mail = mapper.getMail();
var utilLib = mapper.getUtil();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();

/** ***********END INCLUDE LIBRARIES*************** */

var vendorType = {"CHANGE_VENDOR_REQUEST": 1};
var pathName = "CHANGE_VENDOR_REQUEST";

//Insert change vendor request
function insertChangeVendorRequest(objChangeVendorRequest, userId) {
    if (validateInsertChangeVendorRequest(objChangeVendorRequest, userId)) {
        var result = change.insertChangeVendorRequest(objChangeVendorRequest, userId);
        return result;
    }
}

//Insert change vendor request manually
function insertChangeVendorRequestManual(objChangeVendorRequest, userId) {
	if (validateInsertChangeVendorRequest(objChangeVendorRequest, userId)) {
		objChangeVendorRequest.VENDOR_TYPE_ID = vendorType.CHANGE_VENDOR_REQUEST;
    	//Insert the Change Vendor Request
    	var result_id = change.insertChangeRequestManual(objChangeVendorRequest, userId);

    	if(objChangeVendorRequest.ATTACHMENTS != undefined && objChangeVendorRequest.ATTACHMENTS != null && result_id !== null){
       		(objChangeVendorRequest.ATTACHMENTS).forEach(function(attachment){
    			attachment.VENDOR_TYPE_ID = objChangeVendorRequest.VENDOR_TYPE_ID;
    			attachment.VENDOR_ID = result_id;
    			businessAttachmentVendor.insertManualAttachmentVendor(attachment, userId);
       		});    		
    	}
        return result_id;
    }

}

//Delete change vendor request
function deleteChangeVendorRequest(objChangeVendorRequest, userId) {
    if (!objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID) {
        throw ErrorLib.getErrors().CustomError("", "changeVendorRequestService/handleDelete/deleteChangeVendorRequest", "The CHANGE_VENDOR_REQUEST_ID is not found");
    }
    if (!existChangeVendorRequest(objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID)) {
        throw ErrorLib.getErrors().CustomError("", "changeVendorRequestService/handleDelete/insertChangeVendorRequest", "The object Change Vendor Request " + objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID + " does not exist");
    }
    return change.deleteChangeVendorRequest(objChangeVendorRequest, userId);
}

//Get change vendor request by ID
function getChangeVendorRequestById(changeVendorRequestId) {
    var objChange = {};
	if (!changeVendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter changeVendorRequestId is not found", "vendorRequestInquiryService/handleGet/getChangeVendorRequestById", changeVendorRequestId);
    }

    var resChange = change.getChangeVendorRequestById(changeVendorRequestId);
    resChange = JSON.parse(JSON.stringify(resChange));
    if(resChange){
    	 objChange.VENDOR_TYPE_ID = vendorType.CHANGE_VENDOR_REQUEST;
    	 objChange.VENDOR_ID = resChange.CHANGE_VENDOR_REQUEST_ID;
    	 var attachments = businessAttachmentVendor.getAttachmentVendorById(objChange);
    	 resChange.ATTACHMENTS = attachments;
    }
    return resChange;
}

//Get change vendor request by ID manually
function getChangeVendorRequestByIdManual(changeVendorRequestId) {
	var objChange = {};
    if (!changeVendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter changeVendorRequestId is not found", "vendorRequestInquiryService/handleGet/getChangeVendorRequestById", changeId);
    }
    var resChange = change.getChangeVendorRequestByIdManual(changeVendorRequestId);
    resChange = JSON.parse(JSON.stringify(resChange));
    if(resChange){
    	 objChange.VENDOR_TYPE_ID = vendorType.CHANGE_VENDOR_REQUEST;
    	 objChange.VENDOR_ID = resChange.CHANGE_VENDOR_REQUEST_ID;
    	 var attachments = businessAttachmentVendor.getAttachmentVendorById(objChange);
    	 resChange.ATTACHMENTS = attachments;
    }
    return resChange;

}

//Get all change vendor request
function getAllChangeVendorRequest() {
    return change.getAllChangeVendorRequest();
}

//Update change vendor request 
function updateChangeVendorRequest(objChangeVendorRequest, userId) {
    if (!existChangeVendorRequest(objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID)) {
        throw ErrorLib.getErrors().CustomError("", "vendorRequestInquiryService/handlePut/updateChangeVendorRequest", "The object Change Vendor Request " + objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID + " does not exist");
    }
    validateParams(objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID, userId);
    var keys = ['CHANGE_VENDOR_REQUEST_ID', 'ENTITY_ID', 'COMMODITY_ID'];
    var changeVendorRequestUrl = "vendorRequestInquiryService/handlePut/updateVendorInquiry";
    utilLib.validateObjectAttributes(objChangeVendorRequest, userId, keys, changeVendorRequestUrl, validateType);
    updateChangeVendorAttachments(objChangeVendorRequest, userId);
    return change.updateChangeVendorRequest(objChangeVendorRequest, userId);
}

//UPDATE CHANGE VENDOR ATTACHMENTS
function updateChangeVendorAttachments(reqBody, user_id){
	var params = {};
	params.VENDOR_TYPE_ID = vendorType.CHANGE_VENDOR_REQUEST;
	params.VENDOR_ID = reqBody.CHANGE_VENDOR_REQUEST_ID;
	var original_attachments = businessAttachmentVendor.getAttachmentVendorById(params);

	var originalAttachmentsToUpdate = reqBody.ATTACHMENTS;
	if(original_attachments.length > 0 && originalAttachmentsToUpdate.length == 0){
		original_attachments.forEach(function(attachment){
			businessAttachmentVendor.deleteAttachmentVendorManual(attachment, user_id);
			businessAttachment.deleteManualAttachment(attachment, user_id);
		});
	}else if(original_attachments.length == 0 && originalAttachmentsToUpdate.length > 0){
		originalAttachmentsToUpdate.forEach(function(attachment){
    		params.VENDOR_TYPE_ID = vendorType.CHANGE_VENDOR_REQUEST;
    		params.VENDOR_ID = reqBody.CHANGE_VENDOR_REQUEST_ID;
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
	    		data.VENDOR_TYPE_ID = vendorType.CHANGE_VENDOR_REQUEST;
	    		data.VENDOR_ID = reqBody.CHANGE_VENDOR_REQUEST_ID;
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
function existChangeVendorRequest(changeVendorRequestId) {
    return change.getChangeVendorRequestByIdManual(changeVendorRequestId).length > 0;
}

function validateInsertChangeVendorRequest(objChangeVendorRequest, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "changeVendorRequestService/handlePut/insertChangeVendorRequest", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'ENTITY_ID',
        'COMMODITY_ID',
        'VENDOR_ID'
    ];
    
    if (!objChangeVendorRequest) {
        throw ErrorLib.getErrors().CustomError("", "changeVendorRequestService/handlePost/insertChangeVendorRequest", "The object Change Vendor Request is not found");
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
            throw ErrorLib.getErrors().CustomError("", "changeVendorRequestService/handlePost/insertChangeVendorRequest", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "changeVendorRequestService/handlePost/insertChangeVendorRequest", JSON.stringify(errors));
        }
    }
    return isValid;
}

function validateParams(changeVendorRequestId, userId) {
	if (!changeVendorRequestId) {
		throw ErrorLib.getErrors().CustomError("", "vendorDataProtectionService",
				"The changeVendorRequestId is not found");
	}
	if (!userId) {
		throw ErrorLib.getErrors().CustomError("", "vendorDataProtectionService",
				"The userId is not found");
	}
}

//Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
    	case 'CHANGE_VENDOR_REQUEST_ID':
    		valid = !isNaN(value) && value > 0;
    		break;
        case 'ENTITY_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'COMMODITY_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'RECEIVER_VENDOR_ACCOUNT':
            valid = (value.length >= 0 && value.length <= 255) || (!value);
            break;
        case 'RECEIVER_USER_ID':
            valid = (!isNaN(value) && value > 0) || (!value);
            break;
        case 'RECEIVER_YVC_REQUEST':
            valid = (value.length >= 0 && value.length <= 255) || (!value);
            break;
        case 'STATUS_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'PREVIOUS_STATUS_ID':
            valid = (!isNaN(value) && value > 0) || (!value);
            break;
        case 'USER_ID_STATUS':
            valid = (!isNaN(value) && value > 0) || (!value);
            break;
        case 'MESSAGE_CONTENT':
            valid = value.length > 0 && value.length <= 1000;
            break;
        case 'VENDOR_ID':
            valid = !isNaN(value) && value > 0;
            break;
    }
    return valid;
}

function sendSubmitMail(changeVendorRequestId, userId){
	var vendorMailObj = {};
	var userData = businessUser.getUserById(userId)[0];
	var requester = userData.FIRST_NAME + ' ' + userData.LAST_NAME + ' (' + userData.USER_NAME + ')';
	vendorMailObj.CHANGE_VENDOR_REQUEST_ID = changeVendorRequestId;
	var mailObj = changeVendorMail.parseSubmit(vendorMailObj, getBasicData(pathName), requester);
	var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
	mail.sendMail(emailObj,true,null);
}

function sendResubmitMail(changeVendorRequestId, userId){
	var vendorMailObj = {};
	var userData = businessUser.getUserById(userId)[0];
	var requester = userData.FIRST_NAME + ' ' + userData.LAST_NAME + ' (' + userData.USER_NAME + ')';
	vendorMailObj.CHANGE_VENDOR_REQUEST_ID = changeVendorRequestId;
	var mailObj = changeVendorMail.parseResubmitted(vendorMailObj, getBasicData(pathName), requester);
	var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
	mail.sendMail(emailObj,true,null);
}

function sendMessageMail(changeVendorRequest, userId){
	var vendorMailObj = {};
	var userData = businessUser.getUserById(userId)[0];
	var requester = userData.FIRST_NAME + ' ' + userData.LAST_NAME + ' (' + userData.USER_NAME + ')';
	vendorMailObj.CHANGE_VENDOR_REQUEST_ID = changeVendorRequest.CHANGE_VENDOR_REQUEST_ID;
	var mailObj = changeVendorMail.parseFYI(vendorMailObj, getBasicData(pathName), requester);
	var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
	mail.sendMail(emailObj,true,null);
}

function getUrlBase(){
	return config.getUrlBase();
}

function getEmailList(changeVendorRequest){
	return config.getEmailList();
}

function getPath(stringName){
	return config.getPath(stringName);
}

function getBasicData(stringPathName){
	return config.getBasicData(stringPathName);
}