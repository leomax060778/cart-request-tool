$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var request = mapper.getDataVendorRequest();
var businessAttachmentVendor = mapper.getAttachmentVendor();
var businessAttachment = mapper.getAttachment();
var businessVendorDP = mapper.getVendorDataProtection();
var vendorMail = mapper.getVendorMail();
var dataVRDataProtection = mapper.getDataVendorDataProtection();
var mail = mapper.getMail();
var utilLib = mapper.getUtil();
var dbHelper  = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();

/** ***********END INCLUDE LIBRARIES*************** */

var vendorType = {"VENDOR_REQUEST": 3};
var pathName = "VENDOR_REQUEST";

//Insert Vendor Request Data Protection
function insertDataProtectionAnswer(reqBody, in_vendor_request_id, user_id){
	reqBody.VENDOR_REQUEST_ID = in_vendor_request_id;
	if(validateInsertDataProtectionAnswer(reqBody, user_id)){
		reqBody.QUESTION_ID = Number(reqBody.QUESTION_ID);
		reqBody.QUESTION_ID = Number(reqBody.QUESTION_ID);
		return dataVRDataProtection.insertAnswerManual(reqBody, user_id);
	}	
}

//Insert vendor request
function insertVendorRequest(objVendorRequest, userId) {
    if (validateInsertVendorRequest(objVendorRequest, userId)) {
    	var result_id = request.insertVendorRequest(objVendorRequest, userId);
    	sendSubmitMail(result_id, userId);
    	return result_id;
    }
}

//Insert vendor request manual
function insertVendorRequestManual(objVendorRequest, userId) {
    if (validateInsertVendorRequest(objVendorRequest, userId)) {
    	try{
    		objVendorRequest.VENDOR_TYPE_ID = vendorType.VENDOR_REQUEST;
        	//Insert the Vendor Request
        	var result_id = request.insertVendorRequestManual(objVendorRequest, userId);
           	//Insert attachments
        	if(objVendorRequest.ATTACHMENTS != undefined && objVendorRequest.ATTACHMENTS != null && result_id !== null){
           		(objVendorRequest.ATTACHMENTS).forEach(function(attachment){
        			attachment.VENDOR_TYPE_ID = objVendorRequest.VENDOR_TYPE_ID;
        			attachment.VENDOR_ID = result_id;
        			businessAttachmentVendor.insertManualAttachmentVendor(attachment, userId);
           		});    		
        	}
        	//Insert vendor request Data Protection answers
    		(objVendorRequest.DATA_PROTECTION_ANSWERS).forEach(function(item){
    			insertDataProtectionAnswer(item, result_id, userId);
    		});
    		sendSubmitMail(result_id, userId);
            		
    		dbHelper.commit();
    	}
    	catch(e){
    		dbHelper.rollback();
    		throw ErrorLib.getErrors().CustomError("", e.toString(),"insertVendorRequestManual");
    	}
    	finally{
    		dbHelper.closeConnection();
    	}
		
        return result_id;
    }
}

//Delete vendor request
function deleteVendorRequest(objVendorRequest, userId) {
    if (!objVendorRequest.VENDOR_REQUEST_ID) {
        throw ErrorLib.getErrors().CustomError("", "vendorRequestService/handleDelete/deleteVendorRequest", "The VENDOR_REQUEST_ID is not found");
    }
    if (!existVendorRequest(objVendorRequest.VENDOR_REQUEST_ID)) {
        throw ErrorLib.getErrors().CustomError("", "vendorRequestService/handleDelete/insertVendorMessage", "The object Vendor Request " + objVendorRequest.VENDOR_REQUEST_ID + " does not exist");
    }
    return request.deleteVendorRequest(objVendorRequest, userId);
}

//Get vendor request by ID
function getVendorRequestById(vendorRequestId) {
    var objRequest = {};
    if (!vendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter vendorRequestId is not found", "vendorRequestInquiryService/handleGet/getVendorRequestById", vendorRequestId);
    }
    var resRequest = request.getVendorRequestById(vendorRequestId);
    
    resRequest = JSON.parse(JSON.stringify(resRequest));
    if(resRequest){
    	objRequest.VENDOR_TYPE_ID = vendorType.VENDOR_REQUEST;
    	objRequest.VENDOR_ID = resRequest.VENDOR_REQUEST_ID;
    	 var attachments = businessAttachmentVendor.getAttachmentVendorById(objRequest);
    	 resRequest.ATTACHMENTS = attachments;
    	 
    	 var data_protection = businessVendorDP.getDataProtectionById(resRequest.VENDOR_REQUEST_ID);
    	 resRequest.DATA_PROTECTION = data_protection;
    }
    return resRequest;
}

//Get vendor request by ID manually
function getVendorRequestByIdManual(vendorRequestId) {
    var objRequest = {};
    if (!vendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter vendorRequestId is not found", "vendorRequestInquiryService/handleGet/getVendorRequestById", vendorRequestId);
    }
    var resRequest = request.getVendorRequestById(vendorRequestId);
    
    resRequest = JSON.parse(JSON.stringify(resRequest));
    
    if(resRequest){
    	objRequest.VENDOR_TYPE_ID = vendorType.VENDOR_REQUEST;
    	objRequest.VENDOR_ID = resRequest.VENDOR_REQUEST_ID;
    	 var attachments = businessAttachmentVendor.getAttachmentVendorByIdManual(objRequest);
    	 resRequest.ATTACHMENTS = attachments;
    }
    return resRequest;
}

//Get all vendor request
function getAllVendorRequest() {
    return request.getAllVendorRequest();
}

//UPDATE VENDOR REQUEST ATTACHMENTS
function updateVendorRequestAttachments(reqBody, user_id){
	var params = {};
	params.VENDOR_TYPE_ID = vendorType.VENDOR_REQUEST;
	params.VENDOR_ID = reqBody.VENDOR_REQUEST_ID;
	var original_attachments = businessAttachmentVendor.getAttachmentVendorById(params);

	var originalAttachmentsToUpdate = reqBody.ATTACHMENTS;
	if(original_attachments.length > 0 && originalAttachmentsToUpdate.length == 0){
		original_attachments.forEach(function(attachment){
			businessAttachmentVendor.deleteAttachmentVendorManual(attachment, user_id);
			businessAttachment.deleteManualAttachment(attachment, user_id);
		});
	}else if(original_attachments.length == 0 && originalAttachmentsToUpdate.length > 0){
		originalAttachmentsToUpdate.forEach(function(attachment){
    		params.VENDOR_TYPE_ID = vendorType.VENDOR_REQUEST;
    		params.VENDOR_ID = reqBody.VENDOR_REQUEST_ID;
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
	    		data.VENDOR_TYPE_ID = vendorType.VENDOR_REQUEST;
	    		data.VENDOR_ID = reqBody.VENDOR_REQUEST_ID;
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

//Update Data Protection Answers
//DATA PROTECTION
function updateDataProtectionAnswer(item, user_id){
	dataVRDataProtection.updateDataProtectionManual(item, user_id);
}

//Update vendor request
function updateVendorRequest(objVendorRequest, userId) {
    if (!existVendorRequest(objVendorRequest.VENDOR_REQUEST_ID)) {
        throw ErrorLib.getErrors().CustomError("", "vendorRequestInquiryService/handlePut/updateVendorRequest", "The object Vendor Request " + objVendorRequest.VENDOR_REQUEST_ID + " does not exist");
    }
    validateParams(objVendorRequest.VENDOR_REQUEST_ID, userId);
    var keys = ['VENDOR_REQUEST_ID', 'COUNTRY_ID', 'ENTITY_ID', 'COMMODITY_ID', 'SERVICE_SUPPLIER', 'PURCHASE_AMOUNT', 'PURCHASE_CURRENCY_ID', 'ACCEPT_AMERICAN_EXPRESS', 'COST_CENTER_OWNER'];
    var optionalKeys = ['NOT_USED_SAP_SUPPLIER', 'EXPECTED_AMOUNT', 'EXPECTED_CURRENCY_ID', 'ADDITIONAL_INFORMATION'];
    var vendorRequestUrl = "vendorRequestInquiryService/handlePut/updateVendorRequest";
    utilLib.validateObjectAttributes(objVendorRequest, userId, keys, vendorRequestUrl, validateType);
    validateOptionalVendorRequestKeys(optionalKeys, objVendorRequest);
    
    updateVendorRequestAttachments(objVendorRequest, userId);
    
    //DATA PROTECTION ANSWERS UPDATE
    if(objVendorRequest.DATA_PROTECTION_ANSWERS.length > 0){
    	(objVendorRequest.DATA_PROTECTION_ANSWERS).forEach(function(item){
    		updateDataProtectionAnswer(item, userId);
    	});
    }
	
        
    return request.updateVendorRequest(objVendorRequest, userId);

}

//Check if the request exists
function existVendorRequest(vendorRequestId) {
    return Object.keys(getVendorRequestByIdManual(vendorRequestId)).length > 0;
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
            throw ErrorLib.getErrors().CustomError("", "vendorRequestService/handlePut/updateVendorRequest", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "vendorRequestService/handlePut/updateVendorRequest", JSON.stringify(errors));
        }
    }
}

function validateInsertVendorRequest(objVendorRequest, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "vendorRequestService/handlePut/insertVendorRequest", userId);
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

    if (!objVendorRequest)
        throw ErrorLib.getErrors().CustomError("", "vendorRequestService/handlePost/insertVendorRequest", "The object Vendor Request is not found");

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
            throw ErrorLib.getErrors().CustomError("", "vendorRequestService/handlePost/insertVendorRequest", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "vendorRequestService/handlePost/insertVendorRequest", JSON.stringify(errors));
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
            throw ErrorLib.getErrors().CustomError("", "vendorRequestService/handlePost/insertVendorRequest", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "vendorRequestService/handlePost/insertVendorRequest", JSON.stringify(errors));
        }
    }
}

function validateParams(vendorRequestId, userId) {
	if (!vendorRequestId) {
		throw ErrorLib.getErrors().CustomError("", "vendorDataProtectionService",
				"The vendorRequestId is not found");
	}
	if (!userId) {
		throw ErrorLib.getErrors().CustomError("", "vendorDataProtectionService",
				"The userId is not found");
	}
}

function validateInsertDataProtectionAnswer(reqBody, user_id) {
	if(!user_id)
		throw ErrorLib.getErrors().BadRequest("The Parameter user_id is not found","dataProtectionService/handlePost/insertDataProtection",request_id);	
	
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = ['VENDOR_REQUEST_ID',
	            'QUESTION_ID',
	            'OPTION_ID'];
	
	if(!reqBody)
		throw ErrorLib.getErrors().CustomError("","dataProtectionService/handlePost/insertDataProtection","The object DataProtection is not found");
	
	try {
		keys.forEach(function(key) {
			if (reqBody[key] === null || reqBody[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, reqBody[key])
				if (!isValid) {
					errors[key] = reqBody[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("", "dataProtectionService/handlePost/insertDataProtection", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("", "dataProtectionService/handlePost/insertDataProtection"
					,JSON.stringify(errors));
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

function sendSubmitMail(newVendorRequestId, userId){
	var vendorMailObj = {};
	vendorMailObj.REQUEST_ID = newVendorRequestId;
	var mailObj = vendorMail.parseSubmit(vendorMailObj, getBasicData(pathName),"Colleague");
	var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
	mail.sendMail(emailObj,true,null);
}

function sendResubmitMail(newVendorRequestId, userId){
	var vendorMailObj = {};
	vendorMailObj.REQUEST_ID = newVendorRequestId;
	var mailObj = vendorMail.parseResubmitted(vendorMailObj, getBasicData(pathName), "Colleague");
	var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
	mail.sendMail(emailObj,true,null);
}

function sendMessageMail(newVendorRequestId, userId){
	var vendorMailObj = {};
	vendorMailObj.REQUEST_ID = newVendorRequestId.VENDOR_REQUEST_ID;
	var mailObj = vendorMail.parseFYI(vendorMailObj, getBasicData(pathName), "Colleague");
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

function getBasicData(stringPathName){
	return config.getBasicData(stringPathName);
}
