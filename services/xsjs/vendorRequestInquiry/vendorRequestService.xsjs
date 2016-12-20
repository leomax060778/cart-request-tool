$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var request = mapper.getVendorRequest();
var vendor = mapper.getVendor();
var protection = mapper.getVendorDataProtection();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_VENDOR_REQUEST = "GET_ALL_VENDOR_REQUEST";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete);
}

/**
 *
 * @param {object} parameters
 * @param {void} parameters.GET_ALL_VENDOR_REQUEST - get all
 * @returns {VendorRequest} VendorRequest
 */
function handleGet(parameters) {
    var rdo = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_ALL_VENDOR_REQUEST) {
            rdo = request.getAllVendorRequest(parameters[0].value);
        } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "vendorRequestServices/handleGet",
                "invalid parameter name " + parameters[0].name + " (must be: GET_ALL_VENDOR_REQUEST)"
            );
        }
    } else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "vendorRequestServices/handleGet",
            "invalid parameter (must be: GET_ALL_VENDOR_REQUEST)"
        );
    }
    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

/**
 *
 * @param {object} reqBody
 * @param {string} reqBody.VENDOR_REQUEST_ID - id of the vendor request to edit
 * @param {string} reqBody.COUNTRY_ID - id of the country
 * @param {string} reqBody.ENTITY_ID - id of the entity
 * @param {string} reqBody.COMMODITY_ID - id of the commodity
 * @param {string} reqBody.NOT_USED_SAP_SUPPLIER - reason why an existing or preferred SAP supplier is not used
 * @param {string} reqBody.SERVICE_SUPPLIER - description of the type of services the supplier is providing
 * @param {string} reqBody.PURCHASE_AMOUNT - volume of the purchase
 * @param {string} reqBody.EXPECTED_AMOUNT - expected business volume per year
 * @param {string} reqBody.PURCHASE_CURRENCY_ID - currency id of the purchase amount
 * @param {string} reqBody.EXPECTED_CURRENCY_ID - currency id of the expected amount of the purchase
 * @param {string} reqBody.ACCEPT_AMERICAN_EXPRESS - accept American Express
 * @param {string} reqBody.COST_CENTER_OWNER - Responsible Cost Center Owner
 * @param {string} reqBody.ADDITIONAL_INFORMATION - optional additional information
 * @param {string} reqBody.VENDOR_ID - id of the vendor
 * @param {string} reqBody.RECEIVER_USER_ID - id of the receiver
 * @param {string} reqBody.LEGAL_NAME - vendor legal name
 * @param {string} reqBody.INFORMAL_NAME - vendor informal name (optional)
 * @param {string} reqBody.CONTACT_NAME - vendor contact name
 * @param {string} reqBody.CONTACT_EMAIL - vendor contact email
 * @param {string} reqBody.ADDRESS1 - vendor address #1
 * @param {string} reqBody.ADDRESS2 - vendor address #2 (optional)
 * @param {string} reqBody.CITY - vendor city
 * @param {string} reqBody.STATE - vendor state
 * @param {string} reqBody.ZIP - zip code
 * @param {string} reqBody.PHONE - vendor phone number
 * @param {string} reqBody.FAX - vendor fax number
 * @param userId
 * @returns {int} count - Modified rows count
 */
function handlePut(reqBody, userId) {
	protection.updateDataProtectionManual(reqBody, userId);
	var resVendor = vendor.updateManualVendor(reqBody, userId);
    var resRequest = request.updateVendorRequest(reqBody, userId);
    var res = {"vendorId": resVendor, "vendorRequestId": resRequest};
    return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

/**
 *
 * @param {object} reqBody
 * @param {string} reqBody.VENDOR_REQUEST_ID - id of the vendor request to delete
 * @param userId
 * @returns {int} count - Modified rows count
 */
function handleDelete(reqBody, userId) {
    var res = request.deleteVendorRequest(reqBody, userId);
    return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

/**
 *
 * @param {object} reqBody
 * @param {string} reqBody.COUNTRY_ID - id of the country
 * @param {string} reqBody.ENTITY_ID - id of the entity
 * @param {string} reqBody.COMMODITY_ID - id of the commodity
 * @param {string} reqBody.LEGAL_NAME - vendor legal name
 * @param {string} reqBody.INFORMAL_NAME - vendor informal name (optional)
 * @param {string} reqBody.CONTACT_NAME - vendor contact name
 * @param {string} reqBody.CONTACT_EMAIL - vendor contact email
 * @param {string} reqBody.ADDRESS1 - vendor address #1
 * @param {string} reqBody.ADDRESS2 - vendor address #2 (optional)
 * @param {string} reqBody.CITY - vendor city
 * @param {string} reqBody.STATE - vendor state
 * @param {string} reqBody.ZIP - zip code
 * @param {string} reqBody.PHONE - vendor phone number
 * @param {string} reqBody.FAX - vendor fax number
 * @param {string} reqBody.NOT_USED_SAP_SUPPLIER - reason why an existing or preferred SAP supplier is not used
 * @param {string} reqBody.SERVICE_SUPPLIER - description of the type of services the supplier is providing
 * @param {int} reqBody.PURCHASE_AMOUNT - volume of the purchase
 * @param {int} reqBody.EXPECTED_AMOUNT - expected business volume per year
 * @param {string} reqBody.PURCHASE_CURRENCY_ID - currency id of the purchase amount
 * @param {string} reqBody.EXPECTED_CURRENCY_ID - currency id of the expected amount of the purchase
 * @param {int} reqBody.ACCEPT_AMERICAN_EXPRESS - accept American Express
 * @param {string} reqBody.COST_CENTER_OWNER - Responsible Cost Center Owner
 * @param {string} reqBody.ADDITIONAL_INFORMATION - optional additional information
 * @param {string} reqBody.QUESTION_ID - question id of the data protection
 * @param {string} reqBody.OPTION_ID - id of the answer of the data protection question
 * @param userId
 * @returns {object} id - Id of the new vendor request and the new vendor
 */
function handlePost(reqBody, userId) {
	var resVendor = vendor.insertManualVendor(reqBody, userId);
	reqBody.VENDOR_ID = resVendor;
    var resRequest = request.insertVendorRequestManual(reqBody, userId);
    reqBody.VENDOR_REQUEST_ID = resRequest;
    //request.sendSubmitMail(resRequest, userId);
    var res = {"vendorId": resVendor, "newVendorRequestId": resRequest};
    return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

processRequest();

/**
 * @typedef {object} VendorRequest
 * @property {string} VENDOR_REQUEST_ID - id of the vendor request
 * @property {string} USER_NAME - username
 * @property {string} FIRST_NAME - first name of the user
 * @property {string} LAST_NAME - last name of the user
 * @property {string} COUNTRY_ID - id of the country
 * @property {string} ENTITY_ID - id of the entity
 * @property {string} COMMODITY_ID - id of the commodity
 * @property {string} NOT_USED_SAP_SUPPLIER - reason why an existing or preferred SAP supplier is not used
 * @property {string} SERVICE_SUPPLIER - description of the type of services the supplier is providing
 * @property {string} VENDOR_TYPE_ID - id of the type of vendor
 * @property {string} PURCHASE_AMOUNT - volume of the purchase
 * @property {string} EXPECTED_AMOUNT - expected business volume per year
 * @property {string} PURCHASE_CURRENCY_ID - currency id of the purchase amount
 * @property {string} EXPECTED_CURRENCY_ID - currency id of the expected amount of the purchase
 * @property {string} ACCEPT_AMERICAN_EXPRESS - accept American Express
 * @property {string} COST_CENTER_OWNER - Responsible Cost Center Owner
 * @property {string} ADDITIONAL_INFORMATION - optional additional information
 * @property {string} VENDOR_ID - id of the vendor
 */
