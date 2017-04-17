$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataRequest = mapper.getDataVendorRequest();
var dataStatus = mapper.getDataVendorRequestInquiryStatus();
var dataExtendVendor = mapper.getDataExtendVendorRequest();
var businessAttachmentVendor = mapper.getAttachmentVendor();
var businessAttachment = mapper.getAttachment();
var businessVendorDP = mapper.getVendorDataProtection();
var businessVendorInquiryMessage =  mapper.getVendorMessage();
var request = mapper.getVendorRequest();
var inquiry = mapper.getVendorInquiry();
var extend = mapper.getExtendVendorRequest();
var change = mapper.getChangeVendorRequest();
var businessUser = mapper.getUser();
var vendor = mapper.getVendor();
var changeVendorMail = mapper.getChangeVendorMail();
var extendVendorMail = mapper.getExtendVendorMail();
var vendorInquiryMail = mapper.getVendorInquiryMail();
var vendorRequestMail = mapper.getVendorMail();
var mail = mapper.getMail();
var config = mapper.getDataConfig();
var ErrorLib = mapper.getErrors();
var userRole = mapper.getUserRole();

/** ***********END INCLUDE LIBRARIES*************** */

var statusMap = {'IN_PROCESS': 3, 'APPROVED': 5, 'CANCELLED': 6};
//Vendor types
var vendorType = {"CHANGE_VENDOR_REQUEST": 1, "EXTEND_VENDOR_REQUEST": 2, "VENDOR_INQUIRY": 4, "VENDOR_REQUEST": 3};

var pathName = {
		"CHANGE_VENDOR_MAIL" : "CHANGE_VENDOR_REQUEST",
		"EXTEND_VENDOR_MAIL" : "EXTEND_VENDOR_REQUEST",
		"VENDOR_INQUIRY_MAIL" : "VENDOR_INQUIRY",
		"VENDOR_REQUEST_MAIL" : "VENDOR_REQUEST"
};

function validatePermissionByUserRole(roleData, resRequest){
	return (roleData.ROLE_ID !== "2")? true : (Number(roleData.USER_ID) === Number(resRequest.CREATED_USER_ID));
}

//Access validation by Status
function validateAccess(request_type, request_id){
	var request_status;
	
	switch(request_type){
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
	
	if(!request_status){
		return false;
	}
	return !(request_status.STATUS_NAME == 'Approved' || request_status.STATUS_NAME == 'Cancelled' || request_status.STATUS_NAME == 'Completed');
}

//Get vendor request inquiry by status
function getVendorRequestInquiryByStatus(statusId) {
    if (!statusId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter statusId is not found", "vendorRequestInquiryService/handleGet/getVendorRequestInquiryByStatus", statusId);
    }
    return dataStatus.getVendorRequestInquiryByStatus(statusId);
}

//Get vendor request inquiry by status administrable
function getVendorRequestInquiryByStatusAdministrable(isAdministrable, userId) {
    if (!isAdministrable) {
        throw ErrorLib.getErrors().BadRequest("The Parameter value is not found", "vendorRequestInquiryService/handleGet/getVendorRequestInquiryByStatusAdministrable", isAdministrable);
    }
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "vendorRequestInquiryService/handleGet/getVendorRequestInquiryByStatusAdministrable", userId);
    }
	var vendorRequestInquiry = [];
	vendorRequestInquiry = dataStatus.getVendorRequestInquiryByStatusAdministrable(isAdministrable, userId);
	vendorRequestInquiry = JSON.parse(JSON.stringify(vendorRequestInquiry));
	vendorRequestInquiry.forEach(function(elem){
    	if(elem.MESSAGE_READ > 0){
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
        throw ErrorLib.getErrors().BadRequest("The Parameter statusId is not found", "vendorInquiryService/handleGet/getVendorInquiryByStatus", statusId);
    }
    return dataStatus.getVendorInquiryByStatus(statusId);
}

//Get vendor inquiry by id
function getVendorInquiryById(inquiryId, userId) {
	var objInquiry = {};
    if (!inquiryId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter inquiryId is not found", "vendorRequestInquiryService/handleGet/getVendorInquiryById", inquiryId);
    }
    
	if(!validateAccess(pathName.VENDOR_INQUIRY_MAIL, inquiryId)){
		throw ErrorLib.getErrors().BadRequest(
				"Unauthorized request.",
				"vendorRequestInquiryStatusService/handleGet/getVendorInquiryById", "This Vendor Inquiry is not longer available in Processing Report");
	}
	
    var roleData = userRole.getUserRoleByUserId(userId);
    var resInquiry = dataStatus.getVendorInquiryById(inquiryId);
    
    if(validatePermissionByUserRole(roleData[0], resInquiry)){
	    resInquiry = JSON.parse(JSON.stringify(resInquiry));
	    var vendorInquiryText = businessVendorInquiryMessage.getVendorInquiryMessage(inquiryId, userId);
	    var lastVendorInquiryMessage = vendorInquiryText.length - 1;
	    if(resInquiry){
	    	objInquiry.VENDOR_TYPE_ID = vendorType.VENDOR_INQUIRY;
	    	objInquiry.VENDOR_ID = resInquiry.VENDOR_INQUIRY_ID;
	    	 var attachments = businessAttachmentVendor.getAttachmentVendorById(objInquiry);
	    	 resInquiry.ATTACHMENTS = attachments;
	    }
	    resInquiry.INQUIRY_TEXT = vendorInquiryText[lastVendorInquiryMessage].MESSAGE_CONTENT;
	    return resInquiry;
	}else{
		throw ErrorLib.getErrors().Forbidden("", "vendorRequestInquiryStatusService/handleGet/getVendorInquiryById", "The user does not have permission to see this Vendor Inquiry.");
	}
}

//Get change vendor request by status
function getChangeVendorRequestByStatus(statusId) {
    if (!statusId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter statusId is not found", "changeVendorRequestService/handleGet/getChangeVendorRequestByStatus", statusId);
    }
    return dataStatus.getChangeVendorRequestByStatus(statusId);
}

//Get change vendor request by id
function getChangeVendorRequestById(changeId) {
	var objChange = {};
    if (!changeId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter changeId is not found", "vendorRequestInquiryService/handleGet/getChangeVendorRequestById", changeId);
    }
    
	if(!validateAccess(pathName.CHANGE_VENDOR_MAIL, changeId)){
		throw ErrorLib.getErrors().BadRequest(
				"Unauthorized request.",
				"vendorRequestInquiryStatusService/handleGet/getChangeVendorRequestById", "This Change Vendor Request is not longer available in Processing Report");
	}
    
    var resChange = dataStatus.getChangeVendorRequestById(changeId);
    resChange = JSON.parse(JSON.stringify(resChange));
    if(resChange){
    	 objChange.VENDOR_TYPE_ID = vendorType.CHANGE_VENDOR_REQUEST;
    	 objChange.VENDOR_ID = resChange.CHANGE_VENDOR_REQUEST_ID;
    	 var attachments = businessAttachmentVendor.getAttachmentVendorById(objChange);
    	 resChange.ATTACHMENTS = attachments;
    }
    return resChange;
}

//Get change vendor request by id
function getChangeVendorRequestByIdManual(changeId, userId) {
	var objChange = {};
    if (!changeId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter changeId is not found", "vendorRequestInquiryService/handleGet/getChangeVendorRequestById", changeId);
    }
    
	if(!validateAccess(pathName.CHANGE_VENDOR_MAIL, changeId)){
		throw ErrorLib.getErrors().BadRequest(
				"Unauthorized request.",
				"vendorRequestInquiryStatusService/handleGet/getChangeVendorRequestById", "This Change Vendor Request is not longer available in Processing Report");
	}
	
    var roleData = userRole.getUserRoleByUserId(userId);
    var resChange = dataStatus.getChangeVendorRequestByIdManual(changeId);
    resChange = JSON.parse(JSON.stringify(resChange));
    
	if(validatePermissionByUserRole(roleData[0], resChange)){
	   
	    if(resChange){
	    	 objChange.VENDOR_TYPE_ID = vendorType.CHANGE_VENDOR_REQUEST;
	    	 objChange.VENDOR_ID = resChange.CHANGE_VENDOR_REQUEST_ID;
	    	 var attachments = businessAttachmentVendor.getAttachmentVendorById(objChange);
	    	 resChange.ATTACHMENTS = attachments;
	    }
	    return resChange;
	}else{
		throw ErrorLib.getErrors().Forbidden("", "vendorRequestInquiryStatusService/handleGet/getChangeVendorRequestByIdManual", "The user does not have permission to see this Change Vendor Request.");
	}
}

//Get extend vendor request by status
function getExtendVendorRequestByStatus(statusId) {
    if (!statusId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter statusId is not found", "extendVendorRequestService/handleGet/getExtendVendorRequestByStatus", statusId);
    }
    return dataStatus.getExtendVendorRequestByStatus(statusId);
}

//Get extend vendor request by id
function getExtendVendorRequestById(extendId, userId) {
	var objExtend = {};
    if (!extendId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter extendId is not found", "vendorRequestInquiryService/handleGet/getExtendVendorRequestById", extendId);
    }
    
	if(!validateAccess(pathName.EXTEND_VENDOR_MAIL, extendId)){
		throw ErrorLib.getErrors().BadRequest(
				"Unauthorized request.",
				"vendorRequestInquiryStatusService/handleGet/getExtendVendorRequestById", "This Extend Vendor Request is not longer available in Processing Report");
	}
	
    var roleData = userRole.getUserRoleByUserId(userId);
    var resExtend = dataStatus.getExtendVendorRequestById(extendId);
    resExtend = JSON.parse(JSON.stringify(resExtend));
    
    if(validatePermissionByUserRole(roleData[0], resExtend)){
	    if(resExtend){
	    	objExtend.VENDOR_TYPE_ID = vendorType.EXTEND_VENDOR_REQUEST;
	    	objExtend.VENDOR_ID = resExtend.EXTEND_VENDOR_REQUEST_ID;
	    	 var attachments = businessAttachmentVendor.getAttachmentVendorById(objExtend);
	    	 resExtend.ATTACHMENTS = attachments;
	    }
	    return resExtend;
    }else{
		throw ErrorLib.getErrors().Forbidden("", "vendorRequestInquiryStatusService/handleGet/getExtendVendorRequestById", "The user does not have permission to see this Extend Vendor Request.");
	}
}

function getManualExtendVendorRequestById(extendId) {
    if (!extendId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter extendId is not found", "vendorRequestInquiryService/handleGet/getExtendVendorRequestById", extendId);
    }
    return dataExtendVendor.getExtendVendorRequestByIdManual(extendId);
}

//Get vendor request by status
function getVendorRequestByStatus(statusId) {
    if (!statusId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter statusId is not found", "vendorRequestService/handleGet/getVendorRequestByStatus", statusId);
    }
    return dataStatus.getVendorRequestByStatus(statusId);
}

//Get vendor request by id
function getVendorRequestById(requestId, userId) {
	var objRequest = {};
    if (!requestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter requestId is not found", "vendorRequestInquiryService/handleGet/getVendorRequestById", requestId);
    }
    
	if(!validateAccess(pathName.VENDOR_REQUEST_MAIL, requestId)){
		throw ErrorLib.getErrors().BadRequest(
				"Unauthorized request.",
				"vendorRequestInquiryStatusService/handleGet/getVendorRequestById", "This Vendor Request is not longer available in Processing Report");
	}
    
    var resRequest = dataStatus.getVendorRequestById(requestId);
    resRequest = JSON.parse(JSON.stringify(resRequest));
    var roleData = userRole.getUserRoleByUserId(userId);
	
	if(validatePermissionByUserRole(roleData[0], resRequest)){
    
	    if(resRequest){
	    	objRequest.VENDOR_TYPE_ID = vendorType.VENDOR_REQUEST;
	    	objRequest.VENDOR_ID = resRequest.VENDOR_REQUEST_ID;
	    	 var attachments = businessAttachmentVendor.getAttachmentVendorById(objRequest);
	    	 resRequest.ATTACHMENTS = attachments;
	    	 
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
	} else{
		throw ErrorLib.getErrors().Forbidden("", "vendorRequestInquiryStatusService/handleGet/getVendorRequestById", "The user does not have permission to see this Vendor Request.");
	}
}

//Update vendor inquiry status
function updateVendorInquiryStatus(objVendorInquiry, userId) {
    if (validateUpdateVendorInquiryStatus(objVendorInquiry, userId)) {
    	if(!inquiry.existVendorInquiry(objVendorInquiry.VENDOR_INQUIRY_ID)){
    		throw ErrorLib.getErrors().CustomError("", "vendorRequestInquiryService/handlePut/updateVendorInquiryStatus", "The object Vendor Inquiry " + objVendorInquiry.VENDOR_INQUIRY_ID + " does not exist");
    	}
        return dataStatus.updateVendorInquiryStatus(objVendorInquiry, userId);
    }
}

//Update change vendor request status
function updateChangeVendorRequestStatus(objChangeVendorRequest, userId) {
    if (validateUpdateChangeVendorRequest(objChangeVendorRequest, userId)) {
    	if(!change.existChangeVendorRequest(objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID)){
    		throw ErrorLib.getErrors().CustomError("", "vendorRequestInquiryService/handlePut/updateChangeVendorRequestStatus", "The object Change Vendor Request " + objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID + " does not exist");
    	}
    	if(objChangeVendorRequest.STATUS_ID === statusMap.APPROVED){
    		return dataStatus.updateChangeVendorRequestStatusCompleted(objChangeVendorRequest, userId);
    	} else {
    		return dataStatus.updateChangeVendorRequestStatus(objChangeVendorRequest, userId);
    	}
    }
}

//Update extend vendor request status
function updateExtendVendorRequestStatus(objExtendVendorRequest, userId) {
    if (validateUpdateExtendVendorRequest(objExtendVendorRequest, userId)) {
    	if(!extend.existExtendVendorRequest(objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID)){
    		throw ErrorLib.getErrors().CustomError("", "vendorRequestInquiryService/handlePut/updateExtendVendorRequestStatus", "The object Extend Vendor Request " + objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID + " does not exist");
    	}
    	if(Number(objExtendVendorRequest.STATUS_ID) === statusMap.APPROVED){
    		return dataStatus.updateExtendVendorRequestStatusCompleted(objExtendVendorRequest, userId);
    	} else {
    		return dataStatus.updateExtendVendorRequestStatus(objExtendVendorRequest, userId);
    	}
    }
}

//Update vendor request status
function updateVendorRequestStatus(objVendorRequest, userId) {
    if (validateUpdateVendorRequestStatus(objVendorRequest, userId)){
    	if(!request.existVendorRequest(objVendorRequest.VENDOR_REQUEST_ID)){
    		throw ErrorLib.getErrors().CustomError("", "vendorRequestInquiryService/handlePut/updateVendorRequestStatus", "The object Vendor Request " + objVendorRequest.VENDOR_REQUEST_ID + " does not exist");
    	}
    	if(Number(objVendorRequest.STATUS_ID) === statusMap.APPROVED){
    		if(!vendor.existVendor(objVendorRequest.VENDOR_ID)){
        		throw ErrorLib.getErrors().CustomError("",
    					"vendorService/handlePut/updateVendorAccount",
    					"The vendor with the id \'" + objVendorRequest.VENDOR_ID + "\' does not exist");
        	}
    		vendor.updateVendorAccountManual(objVendorRequest, userId);
    		vendor.insertVendorAdditionalInformation(objVendorRequest, userId);
    		return dataStatus.updateVendorRequestStatusCompleted(objVendorRequest, userId);
    	} else if (Number(objVendorRequest.STATUS_ID) === statusMap.CANCELLED){
    		vendor.deleteManualVendor(objVendorRequest, userId);
    		return dataStatus.updateVendorRequestStatusCompleted(objVendorRequest, userId);
    	} else {
    		return dataStatus.updateVendorRequestStatus(objVendorRequest, userId);
    	}
    }
}

//Update vendor inquiry status manual
function updateVendorInquiryStatusManual(objVendorInquiry, userId) {
    if (validateUpdateVendorInquiryStatus(objVendorInquiry, userId)) {
    	if(!inquiry.existVendorInquiry(objVendorInquiry.VENDOR_INQUIRY_ID)){
    		throw ErrorLib.getErrors().CustomError("", "vendorRequestInquiryService/handlePut/updateVendorInquiryStatus", "The object Vendor Inquiry " + objVendorInquiry.VENDOR_INQUIRY_ID + " does not exist");
    	}
        return dataStatus.updateVendorInquiryStatusManual(objVendorInquiry, userId);
    }
}

//Update change vendor request status manual
function updateChangeVendorRequestStatusManual(objChangeVendorRequest, userId) {
    if (validateUpdateChangeVendorRequest(objChangeVendorRequest, userId)) {
    	if(!change.existChangeVendorRequest(objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID)){
    		throw ErrorLib.getErrors().CustomError("", "vendorRequestInquiryService/handlePut/updateChangeVendorRequestStatus", "The object Change Vendor Request " + objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID + " does not exist");
    	}
    	if(objChangeVendorRequest.STATUS_ID === statusMap.APPROVED){
    		return dataStatus.updateChangeVendorRequestStatusCompletedManual(objChangeVendorRequest, userId);
    	} else {
    		return dataStatus.updateChangeVendorRequestStatusManual(objChangeVendorRequest, userId);
    	}
    }
}

//Update extend vendor request status manual
function updateExtendVendorRequestStatusManual(objExtendVendorRequest, userId) {
    if (validateUpdateExtendVendorRequest(objExtendVendorRequest, userId)) {
    	if(!extend.existExtendVendorRequest(objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID)){
    		throw ErrorLib.getErrors().CustomError("", "vendorRequestInquiryService/handlePut/updateExtendVendorRequestStatus", "The object Extend Vendor Request " + objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID + " does not exist");
    	}
    	if(Number(objExtendVendorRequest.STATUS_ID) === statusMap.APPROVED){
    		return dataStatus.updateExtendVendorRequestStatusCompletedManual(objExtendVendorRequest, userId);
    	} else {
    		return dataStatus.updateExtendVendorRequestStatusManual(objExtendVendorRequest, userId);
    	}
    }
}

//Update vendor request status manual
function updateVendorRequestStatusManual(objVendorRequest, userId) {
    if (validateUpdateVendorRequestStatus(objVendorRequest, userId)){
    	if(!request.existVendorRequest(objVendorRequest.VENDOR_REQUEST_ID)){
    		throw ErrorLib.getErrors().CustomError("", "vendorRequestInquiryService/handlePut/updateVendorRequestStatus", "The object Vendor Request " + objVendorRequest.VENDOR_REQUEST_ID + " does not exist");
    	}
    	if(objVendorRequest.STATUS_ID === statusMap.APPROVED){
    		return dataStatus.updateVendorRequestStatusCompletedManual(objVendorRequest, userId);
    	} else {
    		return dataStatus.updateVendorRequestStatusManual(objVendorRequest, userId);
    	}
    }
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

//Validate update vendor inquiry status
function validateUpdateVendorInquiryStatus(objVendorInquiry, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "vendorInquiryService/handlePut/updateVendorInquiryStatus", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'VENDOR_INQUIRY_ID',
        'STATUS_ID',
        'PREVIOUS_STATUS_ID'];

    if (!objVendorInquiry) {
        throw ErrorLib.getErrors().CustomError("", "vendorInquiryService/handlePut/updateVendorInquiry", "The object Vendor Inquiry is not found");
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
            throw ErrorLib.getErrors().CustomError("", "vendorInquiryService/handlePut/updateVendorInquiry", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "vendorInquiryService/handlePut/updateVendorInquiry", JSON.stringify(errors));
        }
    }
    return isValid;
}

//Validate update change vendor request status
function validateUpdateChangeVendorRequest(objChangeVendorRequest, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "vendorRequestService/handlePut/updateChangeVendorRequestStatus", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
		'CHANGE_VENDOR_REQUEST_ID',
		'STATUS_ID',
		'PREVIOUS_STATUS_ID'];
    if(objChangeVendorRequest.STATUS_ID === statusMap.IN_PROCESS || objChangeVendorRequest.STATUS_ID === statusMap.APPROVED){
    	keys.push('RECEIVER_YVC_REQUEST', 'VENDOR_ACCOUNT');
    }

    if (!objChangeVendorRequest) {
        throw ErrorLib.getErrors().CustomError("", "vendorRequestService/handlePut/updateChangeVendorRequestStatus", "The object Vendor Request is not found");
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
            throw ErrorLib.getErrors().CustomError("", "vendorRequestService/handlePut/updateChangeVendorRequest", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "vendorRequestService/handlePut/updateChangeVendorRequest", JSON.stringify(errors));
        }
    }
    return isValid;
}

//Validate update extend vendor request status
function validateUpdateExtendVendorRequest(objExtendVendorRequest, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "vendorRequestService/handlePut/updateExtendVendorRequest", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'EXTEND_VENDOR_REQUEST_ID',
        'STATUS_ID',
		'PREVIOUS_STATUS_ID'];
    
    if(Number(objExtendVendorRequest.STATUS_ID) === statusMap.IN_PROCESS || (Number(objExtendVendorRequest.STATUS_ID) === statusMap.APPROVED)){
    	keys.push('RECEIVER_YVC_REQUEST');
    }

    if(Number(objExtendVendorRequest.STATUS_ID) === statusMap.APPROVED){
    	keys.push('VENDOR_ACCOUNT');
    }

    if (!objExtendVendorRequest) {
        throw ErrorLib.getErrors().CustomError("", "vendorRequestService/handlePut/updateExtendVendorRequest", "The object Vendor Request is not found");
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
            throw ErrorLib.getErrors().CustomError("", "vendorRequestService/handlePut/updateExtendVendorRequest", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "vendorRequestService/handlePut/updateExtendVendorRequest", JSON.stringify(errors));
        }
    }
    return isValid;
}

//Validate update vendor request status
function validateUpdateVendorRequestStatus(objVendorRequest, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "vendorRequestService/handlePut/updateVendorRequestStatus", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['VENDOR_REQUEST_ID',
                'STATUS_ID',
        		'PREVIOUS_STATUS_ID'];
    
    if(objVendorRequest.STATUS_ID === statusMap.IN_PROCESS || objVendorRequest.STATUS_ID === statusMap.APPROVED){
    	keys.push('RECEIVER_YVC_REQUEST');
    }

    if (!objVendorRequest) {
        throw ErrorLib.getErrors().CustomError("", "vendorRequestService/handlePut/updateVendorRequest", "The object Vendor Request is not found");
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
            throw ErrorLib.getErrors().CustomError("", "vendorRequestService/handlePut/updateVendorRequest", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "vendorRequestService/handlePut/updateVendorRequest", JSON.stringify(errors));
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

function sendChangeVendorMailByStatus(objRequest, userId){
	if(objRequest.STATUS_ID && (Number(objRequest.STATUS_ID) > 2 && Number(objRequest.STATUS_ID) < 7)){
		var changeVendorRequestMailObj = {};
		var mailObj = {};
		changeVendorRequestMailObj.CHANGE_VENDOR_REQUEST_ID = objRequest.CHANGE_VENDOR_REQUEST_ID;
		var statusId = objRequest.STATUS_ID;
		switch (statusId) {
			case '3':
				mailObj = changeVendorMail.parseInProcess(changeVendorRequestMailObj, getBasicData(pathName.CHANGE_VENDOR_MAIL), "Colleague");
				break;
			case '4':
				mailObj = changeVendorMail.parseReturnToRequest(changeVendorRequestMailObj, getBasicData(pathName.CHANGE_VENDOR_MAIL), "Colleague");
				break;
			case '5':
				mailObj = changeVendorMail.parseApproved(changeVendorRequestMailObj, getBasicData(pathName.CHANGE_VENDOR_MAIL), "Colleague");
				break;
			case '6':
				mailObj = changeVendorMail.parseCancelled(changeVendorRequestMailObj, getBasicData(pathName.CHANGE_VENDOR_MAIL), "Colleague");
				break;
		}
		
		var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
		mail.sendMail(emailObj,true,null);
	}
}

function sendExtendVendorMailByStatus(objRequest,extendVendorData, userId){
	if(objRequest.STATUS_ID && (Number(objRequest.STATUS_ID) > 2 && Number(objRequest.STATUS_ID) < 7)){
		var extendVendorRequestMailObj = {};
		var mailObj = {};
		extendVendorRequestMailObj.EXTEND_VENDOR_REQUEST_ID = objRequest.EXTEND_VENDOR_REQUEST_ID;
		extendVendorRequestMailObj.RECEIVER_YVC_REQUEST = objRequest.RECEIVER_YVC_REQUEST;
		extendVendorRequestMailObj.VENDOR_ID = extendVendorData.VENDOR_ID;
		var statusId = objRequest.STATUS_ID;
		switch (statusId) {
			case '3':
				mailObj = extendVendorMail.parseInProcess(extendVendorRequestMailObj, getBasicData(pathName.EXTEND_VENDOR_MAIL), "Colleague");
				break;
			case '4':
				mailObj = extendVendorMail.parseReturnToRequest(extendVendorRequestMailObj, getBasicData(pathName.EXTEND_VENDOR_MAIL), "Colleague");
				break;
			case '5':
				mailObj = extendVendorMail.parseApproved(extendVendorRequestMailObj, getBasicData(pathName.EXTEND_VENDOR_MAIL), "Colleague");
				break;
			case '6':
				mailObj = extendVendorMail.parseCancelled(extendVendorRequestMailObj, getBasicData(pathName.EXTEND_VENDOR_MAIL), "Colleague");
				break;
		}
		
		var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
		mail.sendMail(emailObj,true,null);
	}
}

function sendVendorInquiryMailByStatus(objRequest, userId){
	if(objRequest.STATUS_ID && (Number(objRequest.STATUS_ID) > 1 && Number(objRequest.STATUS_ID) < 5)){
		var vendorInquiryMailObj = {};
		var mailObj = {};
		vendorInquiryMailObj.VENDOR_INQUIRY_ID = objRequest.VENDOR_INQUIRY_ID;
		var statusId = objRequest.STATUS_ID;
		switch (statusId) {
			case '2':
				mailObj = vendorInquiryMail.parseReturnToRequest(vendorInquiryMailObj, getBasicData(pathName.VENDOR_INQUIRY_MAIL), "Colleague");
				break;
			case '3':
				mailObj = vendorInquiryMail.parseCompleted(vendorInquiryMailObj, getBasicData(pathName.VENDOR_INQUIRY_MAIL), "Colleague");
				break;
			case '4':
				mailObj = vendorInquiryMail.parseCancelled(vendorInquiryMailObj, getBasicData(pathName.VENDOR_INQUIRY_MAIL), "Colleague");
				break;
		}
		
		var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
		mail.sendMail(emailObj,true,null);
	}
}

function sendVendorRequestMailByStatus(objRequest, userId){
	if(objRequest.STATUS_ID && (Number(objRequest.STATUS_ID) > 2 && Number(objRequest.STATUS_ID) < 7)){
		var vendorRequestMailObj = {};
		var mailObj = {};
		var userData = businessUser.getUserById(userId)[0];
		var requester = userData.FIRST_NAME + ' ' + userData.LAST_NAME + ' (' + userData.USER_NAME + ')';
		vendorRequestMailObj.VENDOR_REQUEST_ID = objRequest.VENDOR_REQUEST_ID;
		vendorRequestMailObj.RECEIVER_YVC_REQUEST = objRequest.RECEIVER_YVC_REQUEST;
		vendorRequestMailObj.VENDOR_ID = objRequest.VENDOR_ID;
		var statusId = objRequest.STATUS_ID;
		switch (statusId) {
			case '3':
				mailObj = vendorRequestMail.parseInProcess(vendorRequestMailObj, getBasicData(pathName.VENDOR_REQUEST_MAIL), requester);
				break;
			case '4':
				mailObj = vendorRequestMail.parseReturnToRequest(vendorRequestMailObj, getBasicData(pathName.VENDOR_REQUEST_MAIL), requester);
				break;
			case '5':
				mailObj = vendorRequestMail.parseApproved(vendorRequestMailObj, getBasicData(pathName.VENDOR_REQUEST_MAIL), requester);
				break;
			case '6':
				mailObj = vendorRequestMail.parseCancelled(vendorRequestMailObj, getBasicData(pathName.VENDOR_REQUEST_MAIL), requester);
				break;
		}
		
		var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
		mail.sendMail(emailObj,true,null);
	}
}

function getUrlBase(){
	return config.getUrlBase();
}

function getEmailList(mailObj){
	return config.getEmailList();
}

function getPath(stringName){
	return config.getPath(stringName);
}

function getBasicData(stringPathName){
	return config.getBasicData(stringPathName);
}
