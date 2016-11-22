$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var request = mapper.getDataVendorRequest();
var vendorMail = mapper.getVendorMail();
var mail = mapper.getMail();
var utilLib = mapper.getUtil();
var dbHelper  = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//Insert vendor request
function insertVendorRequest(objVendorRequest, userId) {
    if (validateInsertVendorRequest(objVendorRequest, userId)) {
        return request.insertVendorRequest(objVendorRequest, userId);
    }
}

//Insert vendor request manual
function insertVendorRequestManual(objVendorRequest, userId) {
	if (validateInsertVendorRequest(objVendorRequest, userId)) {
    	return request.insertVendorRequestManual(objVendorRequest, userId);
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
    if (!vendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter vendorRequestId is not found", "vendorRequestInquiryService/handleGet/getVendorRequestById", vendorRequestId);
    }
    return request.getVendorRequestById(vendorRequestId);
}

//Get vendor request by ID manually
function getVendorRequestByIdManual(vendorRequestId) {
    if (!vendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter vendorRequestId is not found", "vendorRequestService/handleGet/getVendorRequestById", vendorRequestId);
    }
    return request.getVendorRequestByIdManual(vendorRequestId);
}

//Get all vendor request
function getAllVendorRequest() {
    return request.getAllVendorRequest();
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
    return request.updateVendorRequest(objVendorRequest, userId);

}

//Check if the request exists
function existVendorRequest(vendorRequestId) {
    return getVendorRequestByIdManual(vendorRequestId).length > 0;
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
        'OPTION_ID',
        'QUESTION_ID'
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
        case 'OPTION_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'QUESTION_ID':
            valid = !isNaN(value) && value > 0;
            break;
    }
    return valid;
}

function sendSubmitMail(newVendorRequestId, userId){
	var vendorMailObj = {};
	vendorMailObj.REQUEST_ID = newVendorRequestId;
	var mailObj = vendorMail.parseSubmit(vendorMailObj,getUrlBase(),"Colleague");
	var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
	mail.sendMail(emailObj,true,null);
}

function sendResubmitMail(newVendorRequestId, userId){
	var vendorMailObj = {};
	vendorMailObj.REQUEST_ID = newVendorRequestId;
	var mailObj = vendorMail.parseResubmitted(vendorMailObj,getUrlBase(),"Colleague");
	var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
	mail.sendMail(emailObj,true,null);
}

function sendMessageMail(newVendorRequestId, userId){
	var vendorMailObj = {};
	vendorMailObj.REQUEST_ID = newVendorRequestId.VENDOR_REQUEST_ID;
	var mailObj = vendorMail.parseFYI(vendorMailObj,getUrlBase(),"Colleague");
	var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
	mail.sendMail(emailObj,true,null);
}

function getUrlBase(){
	return "http://localhost:63342/crt/webapp/index.html";
}

function getEmailList(vendorRequestObj){
	return [{address:'gorellano@folderit.net'}];
}