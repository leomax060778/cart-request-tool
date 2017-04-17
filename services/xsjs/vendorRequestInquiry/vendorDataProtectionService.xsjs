$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var protection = mapper.getVendorDataProtection();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_DATA_PROTECTION = "GET_ALL_DATA_PROTECTION";
var GET_ANSWER_BY_VENDOR_REQUEST_ID = "GET_ANSWER_BY_VENDOR_REQUEST_ID";

var service_name = "vendorDataProtectionService";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

/**
 *
 * @param {object} parameters
 * @param {void} parameters.GET_ALL_DATA_PROTECTION - get all
 * @param {void} parameters.GET_ANSWER_BY_VENDOR_REQUEST_ID - get all
 * @returns {VendorRequest} VendorRequest
 */
function handleGet(parameters) {
    var res = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_ALL_DATA_PROTECTION) {
            res = protection.getAllDataProtection();
        } else if (parameters[0].name === GET_ANSWER_BY_VENDOR_REQUEST_ID) {
        	if (parameters[0].value <= 0 || isNaN(parameters[0].value)) {
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "vendorRequestInquiryService/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (must be a valid id)"
                );
            } else {
            	res = protection.getDataProtectionById(parameters[0].value);
            }
        } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "vendorRequestServices/handleGet",
                "invalid parameter name " + parameters[0].name + " (can be: GET_ALL_DATA_PROTECTION, GET_ANSWER_BY_VENDOR_REQUEST_ID)"
            );
        }
    } else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "vendorRequestServices/handleGet",
            "invalid parameter (can be: GET_ALL_DATA_PROTECTION, GET_ANSWER_BY_VENDOR_REQUEST_ID)"
        );
    }
    return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

//Not Implemented Method
function handlePut(){
    return httpUtil.notImplementedMethod();
}

//Not Implemented Method
function handleDelete(){
    return httpUtil.notImplementedMethod();
}

//Not Implemented Method
function handlePost(){
    return httpUtil.notImplementedMethod();
}

processRequest();