$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var change = mapper.getDataChangeVendorRequest();
var changeVendorMail = mapper.getChangeVendorMail();
var mail = mapper.getMail();
var utilLib = mapper.getUtil();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

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
        return change.insertChangeRequestManual(objChangeVendorRequest, userId);
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
    if (!changeVendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter changeVendorRequestId is not found", "vendorRequestInquiryService/handleGet/getChangeVendorRequestById", changeVendorRequestId);
    }
    return change.getChangeVendorRequestById(changeVendorRequestId);
}

//Get change vendor request by ID manually
function getChangeVendorRequestByIdManual(changeVendorRequestId) {
    if (!changeVendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter changeVendorRequestId is not found", "changeVendorRequestService/handleGet/getVendorRequestById", changeVendorRequestId);
    }
    return change.getChangeVendorRequestByIdManual(changeVendorRequestId);
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
    return change.updateChangeVendorRequest(objChangeVendorRequest, userId);
}

//Check if the request exists
function existChangeVendorRequest(changeVendorRequestId) {
    return getChangeVendorRequestByIdManual(changeVendorRequestId).length > 0;
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
	vendorMailObj.CHANGE_VENDOR_REQUEST_ID = changeVendorRequestId;
	var mailObj = changeVendorMail.parseSubmit(vendorMailObj,getUrlBase(),"Colleague");
	var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
	mail.sendMail(emailObj,true,null);
}

function sendResubmitMail(changeVendorRequestId, userId){
	var vendorMailObj = {};
	vendorMailObj.CHANGE_VENDOR_REQUEST_ID = changeVendorRequestId;
	var mailObj = changeVendorMail.parseResubmitted(vendorMailObj,getUrlBase(),"Colleague");
	var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
	mail.sendMail(emailObj,true,null);
}

function sendMessageMail(changeVendorRequest, userId){
	var vendorMailObj = {};
	vendorMailObj.CHANGE_VENDOR_REQUEST_ID = changeVendorRequest.CHANGE_VENDOR_REQUEST_ID;
	var mailObj = changeVendorMail.parseFYI(vendorMailObj,getUrlBase(),"Colleague");
	var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
	mail.sendMail(emailObj,true,null);
}

function getUrlBase(){
	return "http://localhost:63342/crt/webapp/index.html";
}

function getEmailList(changeVendorRequest){
	return [{address:'gorellano@folderit.net'}];
}