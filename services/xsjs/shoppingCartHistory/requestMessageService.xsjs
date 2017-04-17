$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var request = mapper.getRequestMessage();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_REQUEST_MESSAGE = "GET_REQUEST_MESSAGE";

var service_name = "requestMessageService";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

/**
 * @typedef {object} RequestMessage
 * @property {string} USER_ID - id of the user
 * @property {string} REQUEST_ID - id of the request
 * @property {string} MESSAGE_CONTENT - content of the inquiry message
 * @property {string} RETURN_NAME - name of the return type
 * @property {string} ISSUE_NAME - name of the issue type
 * @property {string} OTHER_ISSUE_TYPE - name of the other issue type
 * @property {string} USER_TYPE_NAME - name of the user type
 * @property {string} USER_NAME - username
 * @property {string} FIRST_NAME - first name of the user
 * @property {string} LAST_NAME - last name of the user
 */

/**
 *
 * @param {object} parameters
 * @param {string} parameters.GET_REQUEST_MESSAGE - get by request id
 * @returns {RequestMessage} RequestMessage
 */
function handleGet(parameters, userId) {
    var res = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_REQUEST_MESSAGE) {
            if (parameters[0].value <= 0 || isNaN(parameters[0].value)) {
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "requestMessageService/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (should be a valid id)"
                );
            } else {
                res = request.getRequestMessage(parameters[0].value, userId);
            }
        } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "requestMessageService/handleGet",
                "invalid parameter name " + parameters[0].name + " (should be: GET_REQUEST_MESSAGE)"
            );
        }
    } else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "requestMessageService/handleGet",
            "invalid parameter (should be: GET_REQUEST_MESSAGE)"
        );
    }
    return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

function handlePut(reqBody, userId) {
	var res = request.updateRequestMessage(reqBody, userId);
    return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
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
 * @param {string} [reqBody.OTHER_ISSUE_TYPE] - name of other issue type
 * @param userId
 * @returns {string} id - Id of the new request message
 */
function handlePost(reqBody, userId) {
    var req = request.insertRequestMessage(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

processRequest();