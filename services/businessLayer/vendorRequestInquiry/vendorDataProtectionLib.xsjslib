$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var data = mapper.getDataVendorDataProtection();
var dp = mapper.getDataDataProtection();
var vendorRequest = mapper.getVendorRequest();
var utilLib = mapper.getUtil();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//Insert answer to vendor data protection manual
function insertAnswerManual(objDataProtection, userId) {
	validateParams(objDataProtection.VENDOR_REQUEST_ID, userId);
	var keys = ['VENDOR_REQUEST_ID', 'QUESTION_ID', 'OPTION_ID'];
	var vendorDataProtectionUrl = "vendorRequestInquiryService/handlePost/insertAnswerManual";
    utilLib.validateObjectAttributes(objDataProtection, userId, keys, vendorDataProtectionUrl, validateType);
    return data.insertAnswerManual(objDataProtection, userId);
}

//Insert answer to vendor data protection
function insertAnswer(objDataProtection, userId) {
	validateParams(objDataProtection.VENDOR_REQUEST_ID, userId);
	var keys = ['VENDOR_REQUEST_ID', 'QUESTION_ID', 'OPTION_ID'];
	var vendorDataProtectionUrl = "vendorRequestInquiryService/handlePost/insertAnswer";
    utilLib.validateObjectAttributes(objDataProtection, userId, keys, vendorDataProtectionUrl, validateType);
    return data.insertAnswer(objDataProtection, userId);
}

//Get all questions and their options
function getAllDataProtection() {
    return data.getAllDataProtection();
}

//Get answer to data protection by vendor request id
function getDataProtectionById(vendorRequestId) {
    if (!vendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter vendorRequestId is not found", "vendorDataProtectionService/handleGet/getDataProtectionById", vendorRequestId);
    }
    return data.getDataProtectionById(vendorRequestId);
}

//Update answer of vendor data protection manually
function updateDataProtectionManual(objDataProtection, vendor_request_id, userId) {
    if (!vendorRequest.existVendorRequest(vendor_request_id)) {
        throw ErrorLib.getErrors().CustomError("", "vendorRequestInquiryService/handlePut/updateDataProtectionManual", "The object Vendor Request " + objDataProtection.VENDOR_REQUEST_ID + " does not exist");
    }
    validateParams(vendor_request_id, userId);
    var keys = ['VENDOR_REQUEST_ID', 'QUESTION_ID', 'OPTION_ID'];
    var vendorDataProtectionUrl = "vendorRequestInquiryService/handlePut/updateDataProtectionManual";
    (objDataProtection).forEach(function(datap) {
    	utilLib.validateObjectAttributes(datap, userId, keys, vendorDataProtectionUrl, validateType);
    	data.updateDataProtectionManual(datap, userId);
    });

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
        case 'VENDOR_REQUEST_ID':
            valid = !isNaN(value) && value > 0;
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