$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var inquiry = mapper.getVendorInquiry();
var message = mapper.getVendorMessage();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_VENDOR_INQUIRY = "GET_ALL_VENDOR_INQUIRY";

var service_name = "vendorInquiryService";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

/**
 *
 * @param {object} parameters
 * @param {void} [parameters.GET_ALL_EXTEND_VENDOR_REQUEST] - get all
 * @param {string} [parameters.GET_EXTEND_VENDOR_REQUEST_BY_ID] - get by id
 * @returns {VendorInquiry} VendorInquiry - one or more VendorInquiry
 */
function handleGet(parameters) {
    var rdo = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_ALL_VENDOR_INQUIRY) {
            rdo = inquiry.getAllVendorInquiry(parameters[0].value);
        } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "vendorInquiryServices/handleGet",
                "invalid parameter name " + parameters[0].name + " (can be: GET_ALL_VENDOR_INQUIRY)"
                );
        }
    } else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "vendorInquiryServices/handleGet",
            "invalid parameter (can be: GET_ALL_VENDOR_INQUIRY)"
        );
    }
    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

//Not Implemented Method
function handlePut(){
    return httpUtil.notImplementedMethod();
}

//Not Implemented Method
function handleDelete() {
   return httpUtil.notImplementedMethod();
}

/**
 *
 * @param {object} reqBody
 * @param {string} reqBody.VENDOR_ID - id of the vendor
 * @param userId
 * @returns {object} responseId - Id of the new vendor inquiry and the new message 
 */
function handlePost(reqBody, userId) {
    var res = inquiry.insertVendorInquiryManual(reqBody, userId);
   
    return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

processRequest();

/**
 * @typedef {object} VendorInquiry
 * @property {string} VENDOR_INQUIRY_ID - id of the inquiry
 * @property {string} USER_NAME - username
 * @property {string} FIRST_NAME - first name of the vendor
 * @property {string} LAST_NAME - last name of the vendor
 * @property {string} VENDOR_LEGAL_NAME - legal name of the vendor
 * @property {string} VENDOR_TYPE_ID - id of the vendor type
 */