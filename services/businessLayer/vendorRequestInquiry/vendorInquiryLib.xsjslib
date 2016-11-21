$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var inquiry = mapper.getDataVendorInquiry();
var vendorInquiryMail = mapper.getVendorInquiryMail();
var mail = mapper.getMail();
var utilLib = mapper.getUtil();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//Get vendor inquiry by ID
function getVendorInquiryById(vendorInquiryId) {
    if (!vendorInquiryId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter vendorInquiryId is not found", "vendorRequestInquiryService/handleGet/getVendorInquiryById", vendorInquiryId);
    }
    return inquiry.getVendorInquiryById(vendorInquiryId);
}

//Get vendor inquiry by ID manually
function getVendorInquiryByIdManual(vendorInquiryId) {
    if (!vendorInquiryId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter vendorInquiryId is not found", "vendorInquiryService/handleGet/getVendorInquiryById", vendorInquiryId);
    }
    return inquiry.getVendorInquiryByIdManual(vendorInquiryId);
}

//Get all vendor inquiry
function getAllVendorInquiry() {
    return inquiry.getAllVendorInquiry();
}

//Insert new vendor inquiry
function insertVendorInquiry(objVendorInquiry, userId) {
    if (validateInsertVendorInquiry(objVendorInquiry, userId)) {
        return inquiry.insertVendorInquiry(objVendorInquiry, userId);
    }
}

//Insert new vendor inquiry manually
function insertVendorInquiryManual(objVendorInquiry, userId) {
    if (validateInsertVendorInquiry(objVendorInquiry, userId)) {
        return inquiry.insertVendorInquiryManual(objVendorInquiry, userId);
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
    return inquiry.updateVendorInquiry(objVendorInquiry, userId);
}

//Check if the inquiry exists
function existVendorInquiry(vendorInquiryId) {
    return getVendorInquiryByIdManual(vendorInquiryId).length > 0;
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
            valid = !isNaN(value) && value > 0;
            break;
    }
    return valid;
}

function sendSubmitMail(vendorInquiryRequestId, userId){
	var vendorMailObj = {};
	vendorMailObj.VENDOR_INQUIRY_ID = vendorInquiryRequestId;
	var mailObj = vendorInquiryMail.parseSubmit(vendorMailObj,"http://localhost:63342/crt/webapp/index.html","admin");
	var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
	mail.sendMail(emailObj,true,null);
}

function sendResubmitMail(vendorInquiryRequestId, userId){
	var vendorMailObj = {};
	vendorMailObj.VENDOR_INQUIRY_ID = vendorInquiryRequestId;
	var mailObj = vendorInquiryMail.parseResubmitted(vendorMailObj,"http://localhost:63342/crt/webapp/index.html","admin");
	var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
	mail.sendMail(emailObj,true,null);
}

function sendMessageMail(vendorInquiryRequest, userId){
	var vendorMailObj = {};
	vendorMailObj.VENDOR_INQUIRY_ID = vendorInquiryRequest.VENDOR_INQUIRY_ID;
	var mailObj = vendorInquiryMail.parseFYI(vendorMailObj,"http://localhost:63342/crt/webapp/index.html","admin");
	var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
	mail.sendMail(emailObj,true,null);
}

function getEmailList(vendorRequestObj){
	return [{address:'gorellano@folderit.net'}];
}