$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var request = mapper.getProcessingReportMessage();
var status = mapper.getVendorRequestInquiryStatus();
var vendorRequest = mapper.getVendorRequest();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_VENDOR_INQUIRY_MESSAGE = "GET_VENDOR_INQUIRY_MESSAGE";
var GET_VENDOR_REQUEST_MESSAGE = "GET_VENDOR_REQUEST_MESSAGE";
var GET_EXTEND_VENDOR_REQUEST_MESSAGE = "GET_EXTEND_VENDOR_REQUEST_MESSAGE";
var GET_CHANGE_VENDOR_REQUEST_MESSAGE = "GET_CHANGE_VENDOR_REQUEST_MESSAGE";
var issueTypeMap = {'STATUS_CHECK': 1, 'SRM_SYSTEM_ISSUE': 2, 'GPO_PROCESS_ISSUE': 3, 'DELAYED_DPO_APPROVAL': 4, 'OTHERS': 5, 'YVC_SYSTEM_ISSUE': 6, 'INCORRECT_INFORMATION': 7, 'MISSING_INFORMATION': 8};
var statusMap = {'TO_BE_CHECKED': 1, 'CHECKED': 2, 'IN_PROCESS': 3, 'RETURN_TO_REQUESTER': 4, 'APPROVED': 5, 'CANCELLED': 6};
var statusInquiryMap = {'TO_BE_CHECKED': 1, 'RETURN_TO_REQUESTER': 2, 'COMPLETED': 3, 'CANCELLED': 4};
var returnTypeMap = {'FYI_ONLY': 1, 'BM_EYES_ONLY': 2, 'REQUEST_RESPONSE': 3};

var service_name = "vendorRequestInquiryMessageService";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
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
    var res = [];
    if (parameters.length > 0) {
        if (parameters[0].name === GET_VENDOR_INQUIRY_MESSAGE) {
            if (parameters[0].value <= 0) {
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "vendorMessageServices/handleGet",
                    "invalid parameter value " + parameters[0].name + " (must be a valid vendor inquiry id)"
                );
            } else {
                res = request.getVendorInquiryMessage(parameters[0].value, userId);
            }
        } else if (parameters[0].name === GET_VENDOR_REQUEST_MESSAGE) {
            if (parameters[0].value <= 0) {
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "vendorMessageService/handleGet",
                    "invalid parameter value " + parameters[0].name + " (must be a valid vendor request id)"
                );
            } else {
                res = request.getVendorRequestMessage(parameters[0].value, userId);
            }
        } else if (parameters[0].name === GET_EXTEND_VENDOR_REQUEST_MESSAGE) {
            if (parameters[0].value <= 0) {
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "vendorMessageService/handleGet",
                    "invalid parameter value " + parameters[0].name + " (must be a valid extend vendor request id)"
                );
            } else {
                res = request.getExtendVendorRequestMessage(parameters[0].value, userId);
            }
        } else if (parameters[0].name === GET_CHANGE_VENDOR_REQUEST_MESSAGE) {
            if (parameters[0].value <= 0) {
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "vendorMessageService/handleGet",
                    "invalid parameter value " + parameters[0].name + " (must be a valid change vendor request id)"
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
 * @param {string} reqBody.RETURN_TYPE_ID - id of the return type
 * @param {string} reqBody.ISSUE_TYPE_ID - id of the issue type
 * @param {string} reqBody.PREVIOUS_STATUS_ID - id of the previous status
 * @param userId
 * @returns {string} id - Id of the new vendor request inquiry message
 */
function handlePost(reqBody, userId) {
    var res;
    if (reqBody.VENDOR_INQUIRY_ID){
        res = request.insertVendorInquiryMessage(reqBody, userId);
    } else if (reqBody.VENDOR_REQUEST_ID) {
        res = request.insertVendorRequestMessage(reqBody, userId);
    } else if (reqBody.CHANGE_VENDOR_REQUEST_ID) {
        res = request.insertChangeVendorRequestMessage(reqBody, userId);
    } else if (reqBody.EXTEND_VENDOR_REQUEST_ID) {
        res = request.insertExtendVendorRequestMessage(reqBody, userId);
    } else {
    	throw ErrorLib.getErrors().CustomError("", 
    			"processingReport/handlePost", 
    			"The object reqBody is invalid. Should be included one of the following ids: VENDOR_INQUIRY_ID, VENDOR_REQUEST_ID, CHANGE_VENDOR_REQUEST_ID or EXTEND_VENDOR_REQUEST_ID"
    			);
    }
    return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

processRequest();