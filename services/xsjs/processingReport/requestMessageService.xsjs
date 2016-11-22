$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var request = mapper.getProcessingReportMessage();
var status = mapper.getCartRequest();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_REQUEST_MESSAGE = "GET_REQUEST_MESSAGE";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete);
}

/**
 *
 * @param {object} parameters
 * @param {string} parameters.GET_REQUEST_MESSAGE - get by request id
 * @returns {VendorRequestMessage} VendorRequestMessage
 */
function handleGet(parameters) {
    var rdo = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_REQUEST_MESSAGE) {
            if (parameters[0].value <= 0) {
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "requestMessageService/handleGet",
                    "invalid parameter value " + parameters[0].name + " (must be a valid change vendor request id)"
                );
            } else {
                rdo = request.getRequestMessage(parameters[0].value);
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
    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
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
	if (Number(reqBody.RETURN_TYPE_ID) === 3){
		reqBody.STATUS_ID = 4;
		status.updateRequestStatusManual(reqBody, userId);
	}
    var req = request.insertRequestMessage(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

processRequest();