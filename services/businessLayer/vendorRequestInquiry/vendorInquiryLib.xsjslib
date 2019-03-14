$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var inquiry = mapper.getDataVendorInquiry();
var vendorInquiryMail = mapper.getVendorInquiryMail();
var businessAttachmentVendor = mapper.getAttachmentVendor();
var businessAttachment = mapper.getAttachment();
var businessUser = mapper.getUser();
var businessVendorInquiryMessage =  mapper.getVendorMessage();
var businessVendorChangeColumn = mapper.getVendorRequestInquiryChangedColumn();

var mail = mapper.getMail();
var vendorInquiryMailSend = mapper.getVendorInquiryMailSend();
var businessStatus = mapper.getVendorRequestInquiryStatus();

var config = mapper.getDataConfig();
var utilLib = mapper.getUtil();
var ErrorLib = mapper.getErrors();
var dbHelper = mapper.getdbHelper();
var userRole = mapper.getUserRole();
var dataUserRole = mapper.getDataUserRole();

var message = mapper.getVendorMessage();

/** ***********END INCLUDE LIBRARIES*************** */

//VENDOR TYPE
var vendorType = {"VENDOR_INQUIRY": 4};
var pathName = "VENDOR_INQUIRY";
var messageTypeMap = {'FYI_ONLY': 1, 'BM_EYES_ONLY': 2, 'REQUEST_RESPONSE': 3};
var resourceMap = {'VENDOR_REQUEST_INQUIRY': 3};
var permissionMap = {'CREATE_EDIT': 10};
var statusInquiryMap = {'TO_BE_CHECKED': 1, 'RETURN_TO_REQUESTER': 2, 'COMPLETED': 3, 'CANCELLED': 4};
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

function validatePermissionByUserRole(roleData, resRequest){
	return (Number(roleData.ROLE_ID) !== roleMap.REQUESTER)? true : (Number(roleData.USER_ID) === Number(resRequest.CREATED_USER_ID));
}

//Get vendor inquiry by ID
function getVendorInquiryById(vendorInquiryId, userId, edition_mode) {
	var objInquiry = {};
    if (!vendorInquiryId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter vendorInquiryId is not found", "", vendorInquiryId);
    }

    var roleData = userRole.getUserRoleByUserId(userId);
    var resInquiry = inquiry.getVendorInquiryById(vendorInquiryId, permissionData, userId);
    if(edition_mode && !resInquiry.EDITABLE){
        throw ErrorLib.getErrors().BadRequest(
            "Unauthorized request.",
            "",
            '{"EDIT_PERMISSION_ERROR": "vendorInquiry"}');
    }
    var vendorInquiryText = businessVendorInquiryMessage.getVendorInquiryMessage(vendorInquiryId, userId);
    var lastVendorInquiryMessage = vendorInquiryText.length - 1;
    if(validatePermissionByUserRole(roleData[0], resInquiry)){
	    resInquiry = JSON.parse(JSON.stringify(resInquiry));
	    if(resInquiry){
	    	objInquiry.VENDOR_TYPE_ID = vendorType.VENDOR_INQUIRY;
	    	objInquiry.VENDOR_ID = resInquiry.VENDOR_INQUIRY_ID;
	    	if (objInquiry.VENDOR_ID) {
                resInquiry.ATTACHMENTS = businessAttachmentVendor.getAttachmentVendorById(objInquiry);
	    	}
	    }
	    if (resInquiry.VENDOR_INQUIRY_ID) {
	    	resInquiry.MESSAGE_CONTENT = encodeURIComponent(vendorInquiryText[lastVendorInquiryMessage].MESSAGE_CONTENT);
	    }

	    return resInquiry;
    }else{
		throw ErrorLib.getErrors().Forbidden("", "", "The user does not have permission to Read/View this Vendor Inquiry.");
	}
}

//Get vendor inquiry by ID manually
function getVendorInquiryByIdManual(vendorInquiryId, userId) {
	var objInquiry = {};
    if (!vendorInquiryId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter vendorInquiryId is not found", "", vendorInquiryId);
    }
    var resInquiry = inquiry.getVendorInquiryByIdManual(vendorInquiryId, permissionData, userId);

    resInquiry = JSON.parse(JSON.stringify(resInquiry));
    if(resInquiry){
    	objInquiry.VENDOR_TYPE_ID = vendorType.VENDOR_INQUIRY;
    	objInquiry.VENDOR_ID = resInquiry.VENDOR_INQUIRY_ID;
    	if (objInquiry.VENDOR_ID) {
            resInquiry.ATTACHMENTS = businessAttachmentVendor.getAttachmentVendorById(objInquiry);
    	}
    }
    return resInquiry;
}

//Get all vendor inquiry
function getAllVendorInquiry() {
    return inquiry.getAllVendorInquiry();
}

//Insert new vendor inquiry
function insertVendorInquiry(objVendorInquiry, userId) {
    if (validateInsertVendorInquiry(objVendorInquiry, userId)) {
    	objVendorInquiry.VENDOR_TYPE_ID = vendorType.VENDOR_INQUIRY;
        return inquiry.insertVendorInquiry(objVendorInquiry, userId);
    }
}

//Insert new vendor inquiry manually
function insertVendorInquiryManual(objVendorInquiry, userId) {
    if (validateInsertVendorInquiry(objVendorInquiry, userId)) {
		objVendorInquiry.VENDOR_TYPE_ID = vendorType.VENDOR_INQUIRY;
		//Insert the Vendor Inquiry
		var result_id = inquiry.insertVendorInquiryManual(objVendorInquiry, userId);
	   	//If the Inquiry insert was success and has attachments, then we insert them.
		if(objVendorInquiry.ATTACHMENTS !== undefined && objVendorInquiry.ATTACHMENTS !== null && result_id !== null){
	   		(objVendorInquiry.ATTACHMENTS).forEach(function(attachment){
				attachment.VENDOR_TYPE_ID = objVendorInquiry.VENDOR_TYPE_ID;
				attachment.VENDOR_ID = result_id;
				businessAttachmentVendor.insertManualAttachmentVendor(attachment, userId);
	   		});
		}
		objVendorInquiry.VENDOR_INQUIRY_ID = result_id;
	    var resMessage = message.insertVendorInquiryMessage(objVendorInquiry, userId);
	    var mail = sendSubmitMail(result_id, userId);
        return {'inquiry': result_id, 'message': resMessage, 'mail': mail};
    }
}

//Delete vendor inquiry
function deleteVendorInquiry(objVendorInquiry, userId) {
    if (!objVendorInquiry.VENDOR_INQUIRY_ID) {
        throw ErrorLib.getErrors().CustomError("", "", "The VENDOR_INQUIRY_ID is not found");
    }
    if (!existVendorInquiry(objVendorInquiry.VENDOR_INQUIRY_ID, userId)) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Vendor Inquiry " + objVendorInquiry.VENDOR_INQUIRY_ID + " does not exist");
    }
    return inquiry.deleteVendorInquiry(objVendorInquiry, userId);
}

//Update vendor inquiry
function updateVendorInquiry(objVendorInquiry, userId) {
    if (!existVendorInquiry(objVendorInquiry.VENDOR_INQUIRY_ID, userId)) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Vendor Inquiry " + objVendorInquiry.VENDOR_INQUIRY_ID + " does not exist");
    }
    validateParams(objVendorInquiry.VENDOR_INQUIRY_ID, userId);

    if (Object.keys(objVendorInquiry.CHANGED_FIELDS).length) {
        businessVendorChangeColumn.insertVendorInquiryChangedColumn(objVendorInquiry, userId);
    }

    if (Number(objVendorInquiry.PREVIOUS_STATUS_ID) !== statusInquiryMap.TO_BE_CHECKED) {
        objVendorInquiry.STATUS_ID = statusInquiryMap.TO_BE_CHECKED;
        businessStatus.updateVendorInquiryStatus(objVendorInquiry, userId);
    }

    var keys = ['VENDOR_NAME', 'VENDOR_INQUIRY_ID'];
    var vendorInquiryUrl = "vendorRequestInquiryService/handlePut/updateVendorInquiry";
    utilLib.validateObjectAttributes(objVendorInquiry, userId, keys, vendorInquiryUrl, validateType);
    updateVendorInquiryAttachments(objVendorInquiry, userId);
    return inquiry.updateVendorInquiry(objVendorInquiry, userId);
}

//UPDATE VENDOR INQUIRY ATTACHMENTS
function updateVendorInquiryAttachments(reqBody, user_id){
	var params = {};
	params.VENDOR_TYPE_ID = vendorType.VENDOR_INQUIRY;
	params.VENDOR_ID = reqBody.VENDOR_INQUIRY_ID;
	var original_attachments = businessAttachmentVendor.getAttachmentVendorById(params);

	var originalAttachmentsToUpdate = reqBody.ATTACHMENTS;
	if(original_attachments.length > 0 && originalAttachmentsToUpdate.length === 0){
		original_attachments.forEach(function(attachment){
			businessAttachmentVendor.deleteAttachmentVendorManual(attachment, user_id);
			businessAttachment.deleteManualAttachment(attachment, user_id);
		});
	}else if(original_attachments.length === 0 && originalAttachmentsToUpdate.length > 0){
		originalAttachmentsToUpdate.forEach(function(attachment){
    		params.VENDOR_TYPE_ID = vendorType.VENDOR_INQUIRY;
    		params.VENDOR_ID = reqBody.VENDOR_INQUIRY_ID;
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
	    		data.VENDOR_TYPE_ID = vendorType.VENDOR_INQUIRY;
	    		data.VENDOR_ID = reqBody.VENDOR_INQUIRY_ID;
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

//Check if the inquiry exists
function existVendorInquiry(vendorInquiryId, userId) {
    return Object.keys(inquiry.getVendorInquiryByIdManual(vendorInquiryId, permissionData, userId)).length > 0;
}

function validateInsertVendorInquiry(objVendorInquiry, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['VENDOR_NAME'];

    if (!objVendorInquiry){
        throw ErrorLib.getErrors().CustomError("", "", "The object Vendor Inquiry is not found");
    }
    try {
        keys.forEach(function (key) {
                // validate attribute type
                isValid = validateType(key, objVendorInquiry[key]);
                if (!isValid) {
                    errors[key] = objVendorInquiry[key];
                    throw BreakException;
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

function validateParams(vendorInquiryId, userId) {
	if (!vendorInquiryId) {
		throw ErrorLib.getErrors().CustomError("", "",
				"The vendorInquiryId is not found");
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
        case 'RECEIVER_USER_ID':
            valid =  (!value) || (!isNaN(value) && value > 0);
            break;
        case 'RECEIVER_YVC_REQUEST':
            valid = (!value) || (value.length > 0 && value.length <= 255);
            break;
        case 'RECEIVER_VENDOR_ACCOUNT':
            valid = (!value) || (value.length > 0 && value.length <= 255);
            break;
        case 'VENDOR_INQUIRY_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'VENDOR_ID':
            valid = !value || (!isNaN(value) && value > 0);
            break;
        case 'VENDOR_NAME':
            valid = (value.length > 0 && value.length <= 255);
            break;
    }
    return valid;
}

function sendSubmitMail(vendorInquiryId, userId){
	vendorInquiryMailSend.sendSubmitMail(vendorInquiryId, userId);
}

function sendResubmitMail(vendorInquiryId, userId){
	vendorInquiryMailSend.sendResubmitMail(vendorInquiryId, userId);
}

function sendMessageMail(vendorInquiry, userId){
	var messageType = Number(vendorInquiry.MESSAGE_TYPE_ID);
	switch(messageType){
    case messageTypeMap.FYI_ONLY:
    	vendorInquiryMailSend.sendFYIMail(vendorInquiry, userId);
        break;
    case messageTypeMap.BM_EYES_ONLY:
    	break;
    default:
    	vendorInquiryMailSend.sendMessageMail(vendorInquiry, userId);
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