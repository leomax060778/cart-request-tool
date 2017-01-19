$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var inquiry = mapper.getDataVendorInquiry();
var vendorInquiryMail = mapper.getVendorInquiryMail();
var businessAttachmentVendor = mapper.getAttachmentVendor();
var businessAttachment = mapper.getAttachment();
var mail = mapper.getMail();
var config = mapper.getDataConfig();
var utilLib = mapper.getUtil();
var ErrorLib = mapper.getErrors();
var dbHelper = mapper.getdbHelper();

var message = mapper.getVendorMessage();

/** ***********END INCLUDE LIBRARIES*************** */

//VENDOR TYPE
var vendorType = {"VENDOR_INQUIRY": 4};
var pathName = "VENDOR_INQUIRY";

//Get vendor inquiry by ID
function getVendorInquiryById(vendorInquiryId) {
	var objInquiry = {};
    if (!vendorInquiryId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter vendorInquiryId is not found", "vendorRequestInquiryService/handleGet/getVendorInquiryById", vendorInquiryId);
    }
    var resInquiry = inquiry.getVendorInquiryById(vendorInquiryId);
    
    resInquiry = JSON.parse(JSON.stringify(resInquiry));
    if(resInquiry){
    	objInquiry.VENDOR_TYPE_ID = vendorType.VENDOR_INQUIRY;
    	objInquiry.VENDOR_ID = resInquiry.VENDOR_INQUIRY_ID;
    	 var attachments = businessAttachmentVendor.getAttachmentVendorById(objInquiry);
    	 resInquiry.ATTACHMENTS = attachments;
    }
    return resInquiry;
}

//Get vendor inquiry by ID manually
function getVendorInquiryByIdManual(vendorInquiryId) {
	var objInquiry = {};
    if (!vendorInquiryId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter vendorInquiryId is not found", "vendorRequestInquiryService/handleGet/getVendorInquiryById", vendorInquiryId);
    }
    var resInquiry = inquiry.getVendorInquiryByIdManual(vendorInquiryId);
    
    resInquiry = JSON.parse(JSON.stringify(resInquiry));
    if(resInquiry){
    	objInquiry.VENDOR_TYPE_ID = vendorType.VENDOR_INQUIRY;
    	objInquiry.VENDOR_ID = resInquiry.VENDOR_INQUIRY_ID;
    	 var attachments = businessAttachmentVendor.getAttachmentVendorById(objInquiry);
    	 resInquiry.ATTACHMENTS = attachments;
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
//    	try{
    		objVendorInquiry.VENDOR_TYPE_ID = vendorType.VENDOR_INQUIRY;
        	//Insert the Vendor Inquiry
        	var result_id = inquiry.insertVendorInquiryManual(objVendorInquiry, userId);
           	//If the Inquiry insert was success and has attachments, then we insert them.
        	if(objVendorInquiry.ATTACHMENTS != undefined && objVendorInquiry.ATTACHMENTS != null && result_id !== null){
           		(objVendorInquiry.ATTACHMENTS).forEach(function(attachment){
        			attachment.VENDOR_TYPE_ID = objVendorInquiry.VENDOR_TYPE_ID;
        			attachment.VENDOR_ID = result_id;
        			businessAttachmentVendor.insertManualAttachmentVendor(attachment, userId);
           		});    		
        	}
        	
        	
        		objVendorInquiry.VENDOR_INQUIRY_ID = result_id;
        	    var resMessage = message.insertVendorInquiryMessage(objVendorInquiry, userId);
        	    sendSubmitMail(result_id, userId);
        	    var resVendorInquiry = {'inquiry': result_id, 'message': resMessage};
        	
//        	dbHelper.commit();
//    	}
//    	catch(e){
//    		dbHelper.rollback();
//    		throw ErrorLib.getErrors().CustomError("", e.toString(),"insertRequest");
//    	}
//    	finally{
//    		dbHelper.closeConnection();
//    	}
    	
        return resVendorInquiry;
    }
}

//Delete vendor inquiry
function deleteVendorInquiry(objVendorInquiry, userId) {
    if (!objVendorInquiry.VENDOR_INQUIRY_ID) {
        throw ErrorLib.getErrors().CustomError("", "vendorInquiryService/handlePost/deleteVendorInquiry", "The VENDOR_INQUIRY_ID is not found");
    }
    if (!existVendorInquiry(objVendorInquiry.VENDOR_INQUIRY_ID)) {
        throw ErrorLib.getErrors().CustomError("", "vendorInquiryService/handlePost/insertVendorMessage", "The object Vendor Inquiry " + objVendorInquiry.VENDOR_INQUIRY_ID + " does not exist");
    }
    return inquiry.deleteVendorInquiry(objVendorInquiry, userId);
}

//Update vendor inquiry
function updateVendorInquiry(objVendorInquiry, userId) {
    if (!existVendorInquiry(objVendorInquiry.VENDOR_INQUIRY_ID)) {
        throw ErrorLib.getErrors().CustomError("", "vendorRequestInquiryService/handlePut/updateVendorInquiry", "The object Vendor Inquiry " + objVendorInquiry.VENDOR_INQUIRY_ID + " does not exist");
    }
    validateParams(objVendorInquiry.VENDOR_INQUIRY_ID, userId);
    var keys = ['VENDOR_ID', 'VENDOR_INQUIRY_ID'];
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
	if(original_attachments.length > 0 && originalAttachmentsToUpdate.length == 0){
		original_attachments.forEach(function(attachment){
			businessAttachmentVendor.deleteAttachmentVendorManual(attachment, user_id);
			businessAttachment.deleteManualAttachment(attachment, user_id);
		});
	}else if(original_attachments.length == 0 && originalAttachmentsToUpdate.length > 0){
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
function existVendorInquiry(vendorInquiryId) {
    return Object.keys(inquiry.getVendorInquiryByIdManual(vendorInquiryId)).length > 0;
}

function validateInsertVendorInquiry(objVendorInquiry, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "vendorInquiryService/handlePut/insertVendorInquiry", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['VENDOR_ID'];

    if (!objVendorInquiry){
        throw ErrorLib.getErrors().CustomError("", "vendorInquiryService/handlePost/insertVendorInquiry", "The object Vendor Inquiry is not found");
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
            throw ErrorLib.getErrors().CustomError("", "vendorInquiryService/handlePost/insertVendorInquiry", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "vendorInquiryService/handlePost/insertVendorInquiry", JSON.stringify(errors));
        }
    }
    return isValid;
}

function validateParams(vendorInquiryId, userId) {
	if (!vendorInquiryId) {
		throw ErrorLib.getErrors().CustomError("", "vendorDataProtectionService",
				"The vendorInquiryId is not found");
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
            valid = (!value) || !isNaN(value) && value > 0;
            break;
    }
    return valid;
}

function sendSubmitMail(vendorInquiryRequestId, userId){
	var vendorMailObj = {};
	vendorMailObj.VENDOR_INQUIRY_ID = vendorInquiryRequestId;
	var mailObj = vendorInquiryMail.parseSubmit(vendorMailObj,getUrlBase(), getPath(pathName), "Colleague");
	var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
	mail.sendMail(emailObj,true,null);
}

function sendResubmitMail(vendorInquiryRequestId, userId){
	var vendorMailObj = {};
	vendorMailObj.VENDOR_INQUIRY_ID = vendorInquiryRequestId;
	var mailObj = vendorInquiryMail.parseResubmitted(vendorMailObj,getUrlBase(), getPath(pathName), "Colleague");
	var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
	mail.sendMail(emailObj,true,null);
}

function sendMessageMail(vendorInquiryRequest, userId){
	var vendorMailObj = {};
	vendorMailObj.VENDOR_INQUIRY_ID = vendorInquiryRequest.VENDOR_INQUIRY_ID;
	var mailObj = vendorInquiryMail.parseFYI(vendorMailObj, getUrlBase(), getPath(pathName), "Colleague");
	var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
	mail.sendMail(emailObj,true,null);
}

function getUrlBase(){
	return config.getUrlBase();
}

function getEmailList(vendorRequestObj){
	return config.getEmailList();
}

function getPath(stringName){
	return config.getPath(stringName);
}