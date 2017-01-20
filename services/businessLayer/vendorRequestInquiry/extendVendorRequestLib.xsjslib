$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var extend = mapper.getDataExtendVendorRequest();
var extendVendorMail = mapper.getExtendVendorMail();
var businessAttachmentVendor = mapper.getAttachmentVendor();
var businessAttachment = mapper.getAttachment();
var mail = mapper.getMail();
var config = mapper.getDataConfig();

var utilLib = mapper.getUtil();
var ErrorLib = mapper.getErrors();
var dbHelper = mapper.getdbHelper();

/** ***********END INCLUDE LIBRARIES*************** */

var vendorType = {"EXTEND_VENDOR_REQUEST": 2};
var pathName = "EXTEND_VENDOR_REQUEST";

//Insert extend vendor request
function insertExtendVendorRequest(objExtendVendorRequest, userId) {
		var result_id;
		if (validateInsertExtendVendorRequest(objExtendVendorRequest, userId)) {
			try{
					objExtendVendorRequest.VENDOR_TYPE_ID = vendorType.EXTEND_VENDOR_REQUEST;
		        	//Insert the Extend Vendor
		        	result_id = extend.insertExtendVendorRequestManual(objExtendVendorRequest, userId);

		        	if(objExtendVendorRequest.ATTACHMENTS != undefined && objExtendVendorRequest.ATTACHMENTS != null && result_id !== null){
		           		(objExtendVendorRequest.ATTACHMENTS).forEach(function(attachment){
		        			attachment.VENDOR_TYPE_ID = objExtendVendorRequest.VENDOR_TYPE_ID;
		        			attachment.VENDOR_ID = result_id;
		        			businessAttachmentVendor.insertManualAttachmentVendor(attachment, userId);
		           		});    		
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
        throw ErrorLib.getErrors().CustomError("", "extendVendorRequestService/handleDelete/deleteExtendVendorRequest", "The VENDOR_REQUEST_ID is not found");
    }
    if(!existExtendVendorRequest(objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID)){
        throw ErrorLib.getErrors().CustomError("", "extendVendorRequestService/handleDelete/insertExtendVendorRequest", "The object Extend Vendor Request " + objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID + " does not exist");
    }
    return extend.deleteExtendVendorRequest(objExtendVendorRequest, userId);
}

//Get extend vendor request by ID
function getExtendVendorRequestById(extendVendorRequestId) {
	var objExtend = {};
	if (!extendVendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter extendVendorRequestId is not found", "extendVendorRequestService/handleGet/getVendorRequestById", extendVendorRequestId);
    }
    
    var resExtend = extend.getExtendVendorRequestById(extendVendorRequestId);
    resExtend = JSON.parse(JSON.stringify(resExtend));
    if(resExtend){
    	objExtend.VENDOR_TYPE_ID = vendorType.EXTEND_VENDOR_REQUEST;
    	objExtend.VENDOR_ID = resExtend.EXTEND_VENDOR_REQUEST_ID;
    	 var attachments = businessAttachmentVendor.getAttachmentVendorById(objExtend);
    	 resExtend.ATTACHMENTS = attachments;
    }
    return resExtend;
}

//Get extend vendor request by ID manually
function getExtendVendorRequestByIdManual(extendVendorRequestId) {
    var objExtend = {};
	if (!extendVendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter extendVendorRequestId is not found", "extendVendorRequestService/handleGet/getVendorRequestById", extendVendorRequestId);
    }
    
    var resExtend = extend.getExtendVendorRequestByIdManual(extendVendorRequestId);
    resExtend = JSON.parse(JSON.stringify(resExtend));
    if(resExtend){
    	objExtend.VENDOR_TYPE_ID = vendorType.EXTEND_VENDOR_REQUEST;
    	objExtend.VENDOR_ID = resExtend.EXTEND_VENDOR_REQUEST_ID;
    	 var attachments = businessAttachmentVendor.getAttachmentVendorById(objExtend);
    	 resExtend.ATTACHMENTS = attachments;
    }
    return resExtend;

}

//Get all extend vendor request
function getAllExtendVendorRequest() {
    return extend.getAllExtendVendorRequest();
}

//Update extend vendor request
function updateExtendVendorRequest(objExtendVendorRequest, userId) {
    if (!existExtendVendorRequest(objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID)) {
        throw ErrorLib.getErrors().CustomError("", "vendorRequestInquiryService/handlePut/updateExtendVendorRequest", "The object Extend Vendor Request " + objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID + " does not exist");
    }
    validateParams(objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID, userId);
    var keys = ['EXTEND_VENDOR_REQUEST_ID', 'ENTITY_ID', 'COMMODITY_ID', 'SERVICE_SUPPLIER', 'PURCHASE_AMOUNT', 'PURCHASE_CURRENCY_ID', 'VENDOR_ID'];
    var optionalKeys = ['EXPECTED_AMOUNT', 'EXPECTED_CURRENCY_ID', 'ADDITIONAL_INFORMATION'];
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
	if(original_attachments.length > 0 && originalAttachmentsToUpdate.length == 0){
		original_attachments.forEach(function(attachment){
			businessAttachmentVendor.deleteAttachmentVendorManual(attachment, user_id);
			businessAttachment.deleteManualAttachment(attachment, user_id);
		});
	}else if(original_attachments.length == 0 && originalAttachmentsToUpdate.length > 0){
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
function existExtendVendorRequest(extendVendorRequestId) {
    return Object.keys(getExtendVendorRequestByIdManual(extendVendorRequestId)).length > 0;
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
            throw ErrorLib.getErrors().CustomError("", "vendorRequestInquiryService/handlePut/updateExtendVendorRequest", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "vendorRequestInquiryService/handlePut/updateExtendVendorRequest", JSON.stringify(errors));
        }
    }
}

function validateInsertExtendVendorRequest(objExtendVendorRequest, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "extendVendorRequestService/handlePut/insertExtendVendorRequest", userId);
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
        'VENDOR_ID'
    ];

    var optionalKeys = ['EXPECTED_AMOUNT',
        'EXPECTED_CURRENCY_ID',
        'ADDITIONAL_INFORMATION'
    ];

    if (!objExtendVendorRequest) {
        throw ErrorLib.getErrors().CustomError("", "extendVendorRequestService/handlePost/insertExtendVendorRequest", "The object Extend Vendor Request is not found");
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
            throw ErrorLib.getErrors().CustomError("", "extendVendorRequestService/handlePost/insertExtendVendorRequest", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "extendVendorRequestService/handlePost/insertExtendVendorRequest", JSON.stringify(errors));
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
            throw ErrorLib.getErrors().CustomError("", "extendVendorRequestService/handlePost/updateExtendVendorRequest", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "extendVendorRequestService/handlePost/updateExtendVendorRequest", JSON.stringify(errors));
        }
    }
}

function validateParams(extendVendorRequestId, userId) {
	if (!extendVendorRequestId) {
		throw ErrorLib.getErrors().CustomError("", "vendorDataProtectionService",
				"The extendVendorRequestId is not found");
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
        case 'VENDOR_ID':
            valid = !isNaN(value) && value > 0;
            break;
    }
    return valid;
}

function sendSubmitMail(extendVendorRequestId, userId){
	var vendorMailObj = {};
	vendorMailObj.EXTEND_VENDOR_REQUEST_ID = extendVendorRequestId;
	var mailObj = extendVendorMail.parseSubmit(vendorMailObj, getBasicData(pathName), "Colleague");
	var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
	mail.sendMail(emailObj,true,null);
}

function sendResubmitMail(extendVendorRequestId, userId){
	var vendorMailObj = {};
	vendorMailObj.EXTEND_VENDOR_REQUEST_ID = extendVendorRequestId;
	var mailObj = extendVendorMail.parseResubmitted(vendorMailObj, getBasicData(pathName), "Colleague");
	var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
	mail.sendMail(emailObj,true,null);
}

function sendMessageMail(extendVendorRequest, userId){
	var vendorMailObj = {};
	vendorMailObj.EXTEND_VENDOR_REQUEST_ID = extendVendorRequest.EXTEND_VENDOR_REQUEST_ID;
	var mailObj = extendVendorMail.parseFYI(vendorMailObj, getBasicData(pathName), "Colleague");
	var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
	mail.sendMail(emailObj,true,null);
}

function getUrlBase(){
	return config.getUrlBase();
}

function getEmailList(extendVendorRequest){
	return config.getEmailList();
}

function getPath(stringName){
	return config.getPath(stringName);
}

function getBasicData(stringPathName){
	return config.getBasicData(stringPathName);
}