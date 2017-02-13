$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var request = mapper.getProcessingReportMessage();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_REQUEST_MESSAGE = "GET_REQUEST_MESSAGE";

var service_name = "requestMessageService";

function processRequest() {
    httpUtil.processRequest3(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

/**
 *
 * @param {object} parameters
 * @param {string} parameters.GET_REQUEST_MESSAGE - get by request id
 * @returns {VendorRequestMessage} VendorRequestMessage
 */
function handleGet(parameters, userId) {
    var res = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_REQUEST_MESSAGE) {
            if (parameters[0].value <= 0) {
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "requestMessageService/handleGet",
                    "invalid parameter value " + parameters[0].name + " (must be a valid change vendor request id)"
                );
            } else {
                res = request.getRequestMessage(parameters[0].value, userId);
            }
        } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "requestMessageService/handleGet",
                "invalid parameter name " + parameters[0].name + " (must be: GET_REQUEST_MESSAGE)"
            );
        }
    } else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "requestMessageService/handleGet",
            "invalid parameter (must be: GET_REQUEST_MESSAGE)"
        );
    }
    return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

function handlePut(reqBody, userId) {
    var req = request.updateRequestMessage(reqBody.REQUEST_ID, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

//Not Implemented Method
function handleDelete() {
    return httpUtil.notImplementedMethod();
}

/**
 *
 * @param {object} reqBody
 * @param {string} reqBody.REQUEST_ID - id of the request
 * @param {string} reqBody.MESSAGE_CONTENT - message content
 * @param {string} reqBody.RETURN_TYPE_ID - id of the return type
 * @param {string} reqBody.ISSUE_TYPE_ID - id of the issue type
 * @param {string} reqBody.OTHER_ISSUE_TYPE - description of other issue type
 * @param {string} reqBody.PREVIOUS_STATUS_ID - id of the previous status
 * @param userId
 * @returns {string} id - Id of the new request message
 */
function handlePost(reqBody, userId) {
    var req = request.insertRequestMessage(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

processRequest();