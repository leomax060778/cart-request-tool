$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var extend = mapper.getDataExtendVendorRequest();
var extendVendorMail = mapper.getExtendVendorMail();
var mail = mapper.getMail();
var utilLib = mapper.getUtil();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//Insert extend vendor request
function insertExtendVendorRequest(objExtendVendorRequest, userId) {
    if (validateInsertExtendVendorRequest(objExtendVendorRequest, userId)) {
        return extend.insertExtendVendorRequest(objExtendVendorRequest, userId);
    }
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
    if (!extendVendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter extendVendorRequestId is not found", "vendorRequestInquiryService/handleGet/getVendorRequestById", extendVendorRequestId);
    }
    return extend.getExtendVendorRequestById(extendVendorRequestId);
}

//Get extend vendor request by ID manually
function getExtendVendorRequestByIdManual(extendVendorRequestId) {
    if (!extendVendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter extendVendorRequestId is not found", "extendVendorRequestService/handleGet/getVendorRequestById", extendVendorRequestId);
    }
    return extend.getExtendVendorRequestByIdManual(extendVendorRequestId);
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
    return extend.updateExtendVendorRequest(objExtendVendorRequest, userId);
}

//Check if the request exists
function existExtendVendorRequest(extendVendorRequestId) {
    return getExtendVendorRequestByIdManual(extendVendorRequestId).length > 0;
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
	var mailObj = extendVendorMail.parseSubmit(vendorMailObj,getUrlBase(),"Colleague");
	var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
	mail.sendMail(emailObj,true,null);
}

function sendResubmitMail(extendVendorRequestId, userId){
	var vendorMailObj = {};
	vendorMailObj.EXTEND_VENDOR_REQUEST_ID = extendVendorRequestId;
	var mailObj = extendVendorMail.parseResubmitted(vendorMailObj,getUrlBase(),"Colleague");
	var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
	mail.sendMail(emailObj,true,null);
}

function sendMessageMail(extendVendorRequest, userId){
	var vendorMailObj = {};
	vendorMailObj.EXTEND_VENDOR_REQUEST_ID = extendVendorRequest.EXTEND_VENDOR_REQUEST_ID;
	var mailObj = extendVendorMail.parseFYI(vendorMailObj,getUrlBase(),"Colleague");
	var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
	mail.sendMail(emailObj,true,null);
}

function getUrlBase(){
	return "http://localhost:63342/crt/webapp/index.html";
}

function getEmailList(extendVendorRequest){
	return [{address:'gorellano@folderit.net'}];
}
