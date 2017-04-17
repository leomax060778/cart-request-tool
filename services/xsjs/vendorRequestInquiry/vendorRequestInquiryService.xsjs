$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var requestInquiry = mapper.getVendorRequestInquiry();
var request = mapper.getVendorRequest();
var inquiry = mapper.getVendorInquiry();
var extend = mapper.getExtendVendorRequest();
var change = mapper.getChangeVendorRequest();
var selection = mapper.getChangeVendorSelection();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_VENDOR_REQUEST_INQUIRY = "GET_ALL_VENDOR_REQUEST_INQUIRY";
var GET_VENDOR_INQUIRY_BY_ID = "GET_VENDOR_INQUIRY_BY_ID";
var GET_VENDOR_REQUEST_BY_ID = "GET_VENDOR_REQUEST_BY_ID";
var GET_EXTEND_VENDOR_REQUEST_BY_ID = "GET_EXTEND_VENDOR_REQUEST_BY_ID";
var GET_CHANGE_VENDOR_REQUEST_BY_ID = "GET_CHANGE_VENDOR_REQUEST_BY_ID";
var GET_LAST_ID = "GET_LAST_ID";
var EDITION_MODE = "EDITION_MODE";

var service_name = "vendorRequestInquiryService";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}


/**
 *
 * @param {object} parameters
 * @param {void} [parameters.GET_ALL_VENDOR_REQUEST_INQUIRY] - get all
 * @param {string} [parameters.GET_VENDOR_INQUIRY_BY_ID] - get by id
 * @param {string} [parameters.GET_VENDOR_REQUEST_BY_ID] - get by id
 * @param {string} [parameters.GET_EXTEND_VENDOR_REQUEST_BY_ID] - get by id
 * @param {string} [parameters.GET_CHANGE_VENDOR_REQUEST_BY_ID] - get by id
 * @returns {VendorRequestInquiry | VendorRequest | VendorInquiry | ExtendVendorRequest | ChangeVendorRequest} VendorRequestInquiry
 */
function handleGet(parameters, userId) {
    var res = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_ALL_VENDOR_REQUEST_INQUIRY) {
            res = requestInquiry.getAllVendorRequestInquiry(userId);
        } else if (parameters[0].name === GET_LAST_ID) {
        	if (!parameters[0].value){
        		throw ErrorLib.getErrors().CustomError("vendorRequestInquiryService/handleGet/getLastId", "Invalid parameter " + parameters[0].value + " for vendorRequestInquiryId. It can be EXTEND, CHANGE, REQUEST or INQUIRY");
        	}
            res = requestInquiry.getLastId(parameters[0].value);
        } else if (parameters[0].name === GET_VENDOR_INQUIRY_BY_ID) {
            if (parameters[0].value <= 0 || isNaN(parameters[0].value)) {
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "vendorRequestInquiryService/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (should be a valid id)"
                );
            } else {
            	if (parameters[1] && parameters[1].name === EDITION_MODE) {
            		res = inquiry.getVendorInquiryById(parameters[0].value, userId, parameters[1].value);
            	}else{
            		res = inquiry.getVendorInquiryById(parameters[0].value, userId);
                }
            }
        } else if (parameters[0].name === GET_VENDOR_REQUEST_BY_ID) {
            if (parameters[0].value <= 0 || isNaN(parameters[0].value)) {
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "vendorRequestInquiryService/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (should be a valid id)"
                );
            } else {
            	if (parameters[1] && parameters[1].name === EDITION_MODE) {
            		res = request.getVendorRequestById(parameters[0].value, userId, parameters[1].value);
            	}else{
            		res = request.getVendorRequestById(parameters[0].value, userId);
                }
            }
        } else if (parameters[0].name === GET_EXTEND_VENDOR_REQUEST_BY_ID) {
            if (parameters[0].value <= 0 || isNaN(parameters[0].value)) {
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "vendorRequestInquiryService/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (should be a valid id)"
                );
            } else {
            	if (parameters[1] && parameters[1].name === EDITION_MODE) {
            		res = extend.getExtendVendorRequestById(parameters[0].value, userId, parameters[1].value);
            	}else{
            		res = extend.getExtendVendorRequestById(parameters[0].value, userId);
                }
            }
        } else if (parameters[0].name === GET_CHANGE_VENDOR_REQUEST_BY_ID) {
            if (parameters[0].value <= 0 || isNaN(parameters[0].value)) {
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "vendorRequestInquiryService/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (should be a valid id)"
                );
            } else {
            	if (parameters[1] && parameters[1].name === EDITION_MODE) {
            		var resSelection = selection.getChangeSelectionByIdManual(parameters[0].value);
                    var resChange = change.getChangeVendorRequestById(parameters[0].value, userId, parameters[1].value);
            	}else{
            		var resSelection = selection.getChangeSelectionByIdManual(parameters[0].value);
                    var resChange = change.getChangeVendorRequestById(parameters[0].value, userId);           
                }
            	res = {'changeVendor': resChange, 'selection': resSelection};
            }
        }

        else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "vendorRequestInquiryService/handleGet",
                "invalid parameter name " + parameters[0].name + " (can be: GET_ALL_VENDOR_REQUEST_INQUIRY, GET_VENDOR_INQUIRY_BY_ID, GET_VENDOR_REQUEST_BY_ID, GET_EXTEND_VENDOR_REQUEST_BY_ID, GET_CHANGE_VENDOR_REQUEST_BY_ID or GET_LAST_ID)"
            );
        }
    } else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "vendorRequestInquiryService/handleGet",
            "invalid parameter (can be: GET_ALL_VENDOR_REQUEST_INQUIRY, GET_VENDOR_INQUIRY_BY_ID, GET_VENDOR_REQUEST_BY_ID, GET_EXTEND_VENDOR_REQUEST_BY_ID, GET_CHANGE_VENDOR_REQUEST_BY_ID or GET_LAST_ID)"
        );
    }
    return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

/**
 *
 * @param {UpdVendorInquiry | UpdVendorRequest | UpdChangeVendorRequest | UpdExtendVendorRequest} reqBody
 * @param userId
 * @returns {int} count - Modified rows count
 */
function handlePut(reqBody, userId) {
    var res;
    if (reqBody.VENDOR_INQUIRY_ID) {
        res = inquiry.updateVendorInquiry(reqBody, userId);
        inquiry.sendResubmitMail(reqBody.VENDOR_INQUIRY_ID,userId);
    } else if (reqBody.VENDOR_REQUEST_ID) {
        res = request.updateVendorRequest(reqBody, userId);
        request.sendResubmitMail(reqBody.VENDOR_REQUEST_ID,userId);
    } else if (reqBody.EXTEND_VENDOR_REQUEST_ID) {
        res = extend.updateExtendVendorRequest(reqBody, userId);
        extend.sendResubmitMail(reqBody.EXTEND_VENDOR_REQUEST_ID,userId);
    } else if (reqBody.CHANGE_VENDOR_REQUEST_ID) {
    	selection.updateChangeSelectionManual(reqBody, userId);
        res = change.updateChangeVendorRequest(reqBody, userId);
        change.sendResubmitMail(reqBody.CHANGE_VENDOR_REQUEST_ID,userId);
    } else {
        throw ErrorLib.getErrors().CustomError("", "vendorRequestInquiryService",
            "The object reqBody is invalid. Must be included one of the following id: VENDOR_INQUIRY_ID, VENDOR_REQUEST_ID, EXTEND_VENDOR_REQUEST_ID or CHANGE_VENDOR_REQUEST_ID");
    }
    return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

//Not Implemented Method
function handleDelete() {
    return httpUtil.notImplementedMethod();
}

//Not Implemented Method
function handlePost() {
    return httpUtil.notImplementedMethod();
}

processRequest();

/**
 * @typedef {object} VendorRequestInquiry
 * @property {string} VENDOR_REQUEST_INQUIRY_ID - id of the requests with the vendor type iso
 * @property {string} CREATED_DATE_TZ - creation date of the request
 * @property {string} VENDOR_NAME - name of the vendor
 * @property {string} RECEIVER_DATE_SUBMITTED_TZ - Shows the date of the first status change by the RBM team on the processing report.
 * @property {string} RECEIVER_YVC_REQUEST - Shows number of request when RBM team apply on the processing report. When creating a new Inquiry or request, this field will be empty. Only applies to New Vendor and Extend Vendor.
 * @property {string} RECEIVER_DATE_COMPLETED_TZ - Shows the date when the request / inquiry is set into Approved or Cancelled status by the RBM team on the processing report.
 * @property {string} RECEIVER_VENDOR_ACCOUNT - Shows Vendor ID when applicable to New Vendor, Extend Vendor and Change Vendor
 * @property {string} STATUS_NAME - Shows the status of Vendor Request / Inquiry
 * @property {string} VENDOR_TYPE_ID - id of the vendor type
 */

/**
 * @typedef {object} UpdVendorInquiry
 * @property {string} VENDOR_INQUIRY_ID - id of the inquiry
 * @property {string} VENDOR_ID - vendor id
 */

/**
 * @typedef {object} UpdVendorRequest
 * @property {string} VENDOR_REQUEST_ID - id of the vendor request
 * @property {string} COUNTRY_ID - id of the country
 * @property {string} ENTITY_ID - id of the entity
 * @property {string} COMMODITY_ID - id of the commodity
 * @property {string} SERVICE_SUPPLIER - description of the supplier service
 * @property {string} PURCHASE_AMOUNT - amount of the purchase
 * @property {string} PURCHASE_CURRENCY_ID - id of the currency
 * @property {string} ACCEPT_AMERICAN_EXPRESS - indicate if the vendor accept american express
 * @property {string} COST_CENTER_OWNER - responsible Cost Center Owner
 * @property {string} RECEIVER_USER_ID - id of the receiver user - only in getter
 * @property {string} NOT_USED_SAP_SUPPLIER - reason why an existing or preferred SAP supplier is not used
 * @property {string} EXPECTED_AMOUNT - amount expected
 * @property {string} EXPECTED_CURRENCY_ID - currency id of the expected amount of the purchase
 * @property {string} ADDITIONAL_INFORMATION - optional additional information
 */

/**
 * @typedef {object} UpdExtendVendorRequest
 * @property {string} EXTEND_VENDOR_REQUEST_ID - id of the extend vendor request
 * @property {string} ENTITY_ID - id of the entity
 * @property {string} COMMODITY_ID - id of the commodity
 * @property {string} SERVICE_SUPPLIER - description of the supplier service
 * @property {string} PURCHASE_AMOUNT - amount of the purchase
 * @property {string} PURCHASE_CURRENCY_ID - id of the currency
 * @property {string} VENDOR_ID - id of the vendor
 * @property {string} EXPECTED_AMOUNT - amount expected
 * @property {string} EXPECTED_CURRENCY_ID - currency id of the expected amount of the purchase
 * @property {string} ADDITIONAL_INFORMATION - optional additional information
 */

/**
 * @typedef {object} UpdChangeVendorRequest
 * @property {string} CHANGE_VENDOR_REQUEST_ID - id of the change vendor request
 * @property {string} ENTITY_ID - id of the entity
 * @property {string} COMMODITY_ID - id of the commodity
 * @property {string} RECEIVER_USER_ID - id of the receiver user - only in getter
 * @property {ChangeSelection[]} CHECKBOX - array with the id of the option and the value of the selection
 */