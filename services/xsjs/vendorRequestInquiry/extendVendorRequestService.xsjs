$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var request = mapper.getExtendVendorRequest();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_EXTEND_VENDOR_REQUEST = "GET_ALL_EXTEND_VENDOR_REQUEST";

var service_name = "extendVendorRequestService";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

/**
 *
 * @param {object} parameters
 * @param {void} parameters.GET_ALL_EXTEND_VENDOR_REQUEST - get all
 * @returns {ExtendVendorRequest} ExtendVendorRequest - one or more ExtendVendorRequests
 */
function handleGet(parameters) {
    var rdo = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_ALL_EXTEND_VENDOR_REQUEST) {
            rdo = request.getAllExtendVendorRequest(parameters[0].value);
        } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "extendVendorRequestServices/handleGet",
                "invalid parameter name" + parameters[0].name + " (can be: GET_ALL_EXTEND_VENDOR_REQUEST)"
                );
        }
    } else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "extendVendorRequestServices/handleGet",
            "invalid parameter (can be: GET_ALL_EXTEND_VENDOR_REQUEST)"
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
 * @param {string} reqBody.ENTITY_ID - id of the entity
 * @param {string} reqBody.COMMODITY_ID -  id of the commodity
 * @param {string} reqBody.SERVICE_SUPPLIER - description of the services provided by the supplier
 * @param {string} reqBody.PURCHASE_AMOUNT - amount of the purchase
 * @param {string} reqBody.EXPECTED_AMOUNT - expected amount of the purchase
 * @param {string} reqBody.PURCHASE_CURRENCY_ID - currency id of the purchase amount
 * @param {string} reqBody.EXPECTED_CURRENCY_ID - currency id of the expected purchase amount
 * @param {string} reqBody.ADDITIONAL_INFORMATION - optional additional information
 * @param {string} reqBody.VENDOR_ID - id of the vendor
 * @param userId
 * @returns {string} id - Id of the new extend vendor request
 */
function handlePost(reqBody, userId) {
	var req;
    req = request.insertExtendVendorRequest(reqBody, userId);
    request.sendSubmitMail(req,userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

processRequest();

/**
 * @typedef {object} ExtendVendorRequest
 * @property {string} EXTEND_VENDOR_REQUEST_ID - id of the extend vendor request
 * @property {string} USER_NAME - username
 * @property {string} FIRST_NAME - first name of the user
 * @property {string} LAST_NAME - last name of the user
 * @property {string} ENTITY_ID - id of the entity
 * @property {string} COMMODITY_ID - id of the commodity
 * @property {string} SERVICE_SUPPLIER - description of the services provided by the supplier
 * @property {string} VENDOR_TYPE_ID - id of the vendor type
 * @property {string} PURCHASE_AMOUNT - amount of the purchase
 * @property {string} EXPECTED_AMOUNT - expected amount of the purchase
 * @property {string} PURCHASE_CURRENCY_ID - id of the currency of the purchase amount
 * @property {string} EXPECTED_CURRENCY_ID - id of the currency of the expected purchase amount
 * @property {string} ADDITIONAL_INFORMATION - optional additional information
 * @property {string} VENDOR_ID - id of the vendor
 */