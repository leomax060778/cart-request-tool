$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var request = mapper.getVendorMessage();
var vendorRequest = mapper.getVendorRequest();
var extendVendorRequest = mapper.getExtendVendorRequest();
var changeVendorRequest = mapper.getChangeVendorRequest();
var vendorInquiry = mapper.getVendorInquiry();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_VENDOR_INQUIRY_MESSAGE = "GET_VENDOR_INQUIRY_MESSAGE";
var GET_VENDOR_REQUEST_MESSAGE = "GET_VENDOR_REQUEST_MESSAGE";
var GET_EXTEND_VENDOR_REQUEST_MESSAGE = "GET_EXTEND_VENDOR_REQUEST_MESSAGE";
var GET_CHANGE_VENDOR_REQUEST_MESSAGE = "GET_CHANGE_VENDOR_REQUEST_MESSAGE";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete);
}

/**
 *
 * @param {object} parameters
 * @param {string} [parameters.GET_VENDOR_INQUIRY_MESSAGE] - get by vendor inquiry id
 * @param {string} [parameters.GET_VENDOR_REQUEST_MESSAGE] - get by vendor request id
 * @param {string} [parameters.GET_EXTEND_VENDOR_REQUEST_MESSAGE] - get by extend vendor request id
 * @param {string} [parameters.GET_CHANGE_VENDOR_REQUEST_MESSAGE] - get by change vendor request id
 * @returns {VendorRequestMessage | VendorInquiryMessage | ChangeVendorRequestMessage | ExtendVendorRequestMessage} VendorRequestInquiry - All messages for vendor request, vendor inquiry, change vendor request or extend vendor request
 */
function handleGet(parameters, userId) {
    var res = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_VENDOR_INQUIRY_MESSAGE) {
            if (parameters[0].value <= 0 || isNaN(parameters[0].value)) {
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "vendorMessageServices/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (must be a valid id)"
                );
            } else {
                res = request.getVendorInquiryMessage(parameters[0].value, userId);
            }
        } else if (parameters[0].name === GET_VENDOR_REQUEST_MESSAGE) {
            if (parameters[0].value <= 0 || isNaN(parameters[0].value)) {
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "vendorMessageService/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (must be a valid id)"
                );
            } else {
                res = request.getVendorRequestMessage(parameters[0].value, userId);
            }
        } else if (parameters[0].name === GET_EXTEND_VENDOR_REQUEST_MESSAGE) {
            if (parameters[0].value <= 0 || isNaN(parameters[0].value)) {
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "vendorMessageService/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (must be a valid id)"
                );
            } else {
                res = request.getExtendVendorRequestMessage(parameters[0].value, userId);
            }
        } else if (parameters[0].name === GET_CHANGE_VENDOR_REQUEST_MESSAGE) {
            if (parameters[0].value <= 0 || isNaN(parameters[0].value)) {
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "vendorMessageService/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (must be a valid id)"
                );
            } else {
                res = request.getChangeVendorRequestMessage(parameters[0].value, userId);
            }
        } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "vendorMessageService/handleGet",
                "invalid parameter name " + parameters[0].name + " (can be: GET_VENDOR_INQUIRY_MESSAGE, GET_VENDOR_REQUEST_MESSAGE, GET_EXTEND_VENDOR_REQUEST_MESSAGE or GET_CHANGE_VENDOR_REQUEST_MESSAGE)"
            );
        }
    } else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "vendorMessageService/handleGet",
            "invalid parameter (can be: GET_VENDOR_INQUIRY_MESSAGE, GET_VENDOR_REQUEST_MESSAGE, GET_EXTEND_VENDOR_REQUEST_MESSAGE or GET_CHANGE_VENDOR_REQUEST_MESSAGE)"
        );
    }
    return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

//Not Implemented Method
function handlePut() {
    return httpUtil.notImplementedMethod();
}

//Not Implemented Method
function handleDelete() {
    return httpUtil.notImplementedMethod();
}

/**
 *
 * @param {object} reqBody
 * @param {string} [reqBody.VENDOR_INQUIRY_ID] - id of the inquiry
 * @param {string} [reqBody.VENDOR_REQUEST_ID] - id of the request
 * @param {string} [reqBody.CHANGE_VENDOR_REQUEST_ID] - id of the change vendor
 * @param {string} [reqBody.EXTEND_VENDOR_REQUEST_ID] - id of the extend vendor
 * @param {string} reqBody.MESSAGE_CONTENT - message content
 * @param userId
 * @returns {string} id - Id of the new message
 */
function handlePost(reqBody, userId) {
    var res;
    if (reqBody.VENDOR_INQUIRY_ID){
        res = request.insertVendorInquiryMessage(reqBody, userId);
        vendorInquiry.sendMessageMail(reqBody, userId);
    } else if (reqBody.VENDOR_REQUEST_ID) {
        res = request.insertVendorRequestMessage(reqBody, userId);
        vendorRequest.sendMessageMail(reqBody, userId);
    } else if (reqBody.CHANGE_VENDOR_REQUEST_ID) {
        res = request.insertChangeVendorRequestMessage(reqBody, userId);
        changeVendorRequest.sendMessageMail(reqBody, userId);
    } else if (reqBody.EXTEND_VENDOR_REQUEST_ID) {
        res = request.insertExtendVendorRequestMessage(reqBody, userId);
        extendVendorRequest.sendMessageMail(reqBody, userId);
    } else {
    	throw ErrorLib.getErrors().BadRequest(
                "",
                "vendorMessageService/handlePost",
                "invalid Body. Should have one of the following ids: VENDOR_INQUIRY_ID, VENDOR_REQUEST_ID, CHANGE_VENDOR_REQUEST_ID, EXTEND_VENDOR_REQUEST_ID"
            );
    }
    return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

processRequest();

/**
*
* @typedef {object} VendorRequestMessage
* @property {string} VENDOR_REQUEST_MESSAGE_ID - id of the vendor request
* @property {string} MESSAGE_CONTENT - message content
* @property {int} RETURN_NAME - name of the return type
* @property {int} ISSUE_NAME - name of the issue type
* @property {string} ROLE_NAME - name of the role
* @property {string} USER_NAME - username of the user
* @property {string} FIRST_NAME - first name of the user
* @property {string} LAST_NAME - last name of the user
*/
/**
*
* @typedef {object} VendorInquiryMessage
* @property {string} VENDOR_INQUIRY_MESSAGE_ID - id of the vendor inquiry
* @property {string} MESSAGE_CONTENT - message content
* @property {int} RETURN_NAME - name of the return type
* @property {int} ISSUE_NAME - name of the issue type
* @property {string} ROLE_NAME - name of the role
* @property {string} USER_NAME - username of the user
* @property {string} FIRST_NAME - first name of the user
* @property {string} LAST_NAME - last name of the user
*/
/**
*
* @typedef {object} ChangeVendorRequestMessage
* @property {string} CHANGE_VENDOR_REQUEST_MESSAGE_ID - id of the change vendor request
* @property {string} MESSAGE_CONTENT - message content
* @property {int} RETURN_NAME - name of the return type
* @property {int} ISSUE_NAME - name of the issue type
* @property {string} ROLE_NAME - name of the role
* @property {string} USER_NAME - username of the user
* @property {string} FIRST_NAME - first name of the user
* @property {string} LAST_NAME - last name of the user
*/
/**
*
* @typedef {object} ExtendVendorRequestMessage
* @property {string} EXTEND_VENDOR_REQUEST_MESSAGE_ID - id of the extend vendor request
* @property {string} MESSAGE_CONTENT - message content
* @property {int} RETURN_NAME - name of the return type
* @property {int} ISSUE_NAME - name of the issue type
* @property {string} ROLE_NAME - name of the role
* @property {string} USER_NAME - username of the user
* @property {string} FIRST_NAME - first name of the user
* @property {string} LAST_NAME - last name of the user
*/