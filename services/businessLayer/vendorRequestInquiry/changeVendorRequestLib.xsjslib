$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var change = mapper.getDataChangeVendorRequest();
var changeVendorMail = mapper.getChangeVendorMail();
var vendorMessage = mapper.getVendorMessage(); 

var businessAttachmentVendor = mapper.getAttachmentVendor();
var businessAttachment = mapper.getAttachment();
var businessUser = mapper.getUser();
var mail = mapper.getMail();
var utilLib = mapper.getUtil();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig(); 
var userRole = mapper.getUserRole();
var dataUserRole = mapper.getDataUserRole();

/** ***********END INCLUDE LIBRARIES*************** */

var statusMap = {'TO_BE_CHECKED': 1, 'CHECKED': 2, 'IN_PROCESS': 3, 'RETURN_TO_REQUESTER': 4, 'APPROVED': 5, 'CANCELLED': 6};
var vendorType = {"CHANGE_VENDOR_REQUEST": 1};
var pathName = "CHANGE_VENDOR_REQUEST";

function validatePermissionByUserRole(roleData, resRequest){
	return (roleData.ROLE_ID !== "2")? true : (roleData.USER_ID === resRequest.CREATED_USER_ID);
}

function validateAccess(change_vendor_request_id, user_id){
	var user_role = dataUserRole.getRoleNameByUserId(user_id);
	var change_vendor_request_status = change.getChangeVendorRequestStatusByCVRId(change_vendor_request_id);
	
	return !(change_vendor_request_status.STATUS_NAME == 'Approved' || change_vendor_request_status.STATUS_NAME == 'Cancelled');
}

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
    	
    	if(result_id){
			if(objChangeVendorRequest.ADDITIONAL_INFORMATION_FLAG && objChangeVendorRequest.ADDITIONAL_INFORMATION && objChangeVendorRequest.ADDITIONAL_INFORMATION.length > 0){
				objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID = result_id;
				objChangeVendorRequest.PREVIOUS_STATUS_ID = statusMap.TO_BE_CHECKED;
				objChangeVendorRequest.MESSAGE_CONTENT = objChangeVendorRequest.ADDITIONAL_INFORMATION;
    			vendorMessage.insertChangeVendorRequestMessage(objChangeVendorRequest, userId);
			}
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
function getChangeVendorRequestById(changeVendorRequestId, userId, edition_mode) {
    var objChange = {};
	if (!changeVendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter changeVendorRequestId is not found", "vendorRequestInquiryService/handleGet/getChangeVendorRequestById", changeVendorRequestId);
    }
	
	if(edition_mode && !validateAccess(changeVendorRequestId, userId)){
		throw ErrorLib.getErrors().BadRequest(
				"Unauthorized request.",
				"vendorRequestInquiryService/handleGet/getChangeVendorRequestById", 
				"This Change Vendor Request is not longer available for edition");
	}
	
	var roleData = userRole.getUserRoleByUserId(userId);
    var resChange = change.getChangeVendorRequestById(changeVendorRequestId);
    resChange = JSON.parse(JSON.stringify(resChange));
    
    if(validatePermissionByUserRole(roleData[0], resChange)){
	    if(resChange && resChange.CHANGE_VENDOR_REQUEST_ID){
	    	 objChange.VENDOR_TYPE_ID = vendorType.CHANGE_VENDOR_REQUEST;
	    	 objChange.VENDOR_ID = resChange.CHANGE_VENDOR_REQUEST_ID;
	    	 var attachments = businessAttachmentVendor.getAttachmentVendorById(objChange);
	    	 resChange.ATTACHMENTS = attachments;
	    	 
	    	 if(resChange.ADDITIONAL_INFORMATION_FLAG !== 0){
		    	 var message = vendorMessage.getChangeVendorRequestMessage(resChange.CHANGE_VENDOR_REQUEST_ID, userId);
		    	 resChange.ADDITIONAL_INFORMATION = (message.length > 0)? message[message.length - 1].MESSAGE_CONTENT : "";
	    	 }else{
	    		 resChange.ADDITIONAL_INFORMATION = ""; //Avoid 'undefined' in richTextEditor.
	    	 }
	    }
	    return resChange;
    }else{
		throw ErrorLib.getErrors().Forbidden("", "vendorRequestInquiryService/handleGet/getChangeVendorRequestById", "The user does not have permission to Read/View this Change Vendor Request.");
	}
}

//Get change vendor request by ID manually
function getChangeVendorRequestByIdManual(changeVendorRequestId) {
	var objChange = {};
    if (!changeVendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter changeVendorRequestId is not found", "vendorRequestInquiryService/handleGet/getChangeVendorRequestById", changeId);
    }
    var resChange = change.getChangeVendorRequestByIdManual(changeVendorRequestId);
    resChange = JSON.parse(JSON.stringify(resChange));
    if(resChange && resChange.CHANGE_VENDOR_REQUEST_ID){
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
        'VENDOR_NAME',
        'VENDOR_ACCOUNT',
        'VENDOR_CONTACT_NAME',
        'VENDOR_CONTACT_EMAIL'
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
        case 'VENDOR_NAME':
            valid = (value.length >= 0 && value.length <= 255);
            break;
        case 'VENDOR_ACCOUNT':
            valid = (value.length >= 0 && value.length <= 255);
            break;
        case 'VENDOR_CONTACT_NAME':
            valid = (value.length >= 0 && value.length <= 255);
            break;
        case 'VENDOR_CONTACT_EMAIL':
            valid = (value.length >= 0 && value.length <= 255);
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
	var result = mail.sendEventMail(emailObj,true,null);
	return result;
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
	var mailObj = changeVendorMail.parseFYI(vendorMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}), requester);
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

function getBasicData(stringPathName, additionalParam){
	return config.getBasicData(stringPathName, additionalParam);
}