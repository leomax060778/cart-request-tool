$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var messageType = mapper.getMessageType();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_MESSAGE_TYPE = "GET_ALL_MESSAGE_TYPE";
var GET_MESSAGE_TYPE_BY_ID = "GET_MESSAGE_TYPE_BY_ID";
var GET_MESSAGE_TYPE_BY_CRT_ID = "GET_MESSAGE_TYPE_BY_CRT_ID";

var service_name = "messageTypeService";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

/**
 * @typedef {object} MessageType
 * @property {string} MESSAGE_TYPE_ID - id of the return type
 * @property {string} NAME - name of the return type
 */


/**
 *
 * @param {object} parameters
 * @param {void} [parameters.GET_ALL_MESSAGE_TYPE] - get all
 * @param {string} [parameters.GET_MESSAGE_TYPE_BY_ID] - get by id
 * @returns {MessageType} MessageType - one or more MessageTypes
 */
function handleGet(parameters) {
    var rdo = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_ALL_MESSAGE_TYPE) {
            rdo = messageType.getAllMessageType(parameters[0].value);
        } else if (parameters[0].name === GET_MESSAGE_TYPE_BY_ID) {
            if (parameters[0].value <= 0){
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "messageTypeServices/handleGet",
                    "invalid parameter value " + parameters[0].name + " (must be a valid id)"
                );
            } else {
                rdo = messageType.getMessageTypeById(parameters[0].value);
            }
        } else if (parameters[0].name === GET_MESSAGE_TYPE_BY_CRT_ID) {
            if (parameters[0].value <= 0){
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "messageTypeServices/handleGet",
                    "invalid parameter value " + parameters[0].name + " (must be a valid id)"
                );
            } else {
                rdo = messageType.getMessageTypeByCrtIdManual(parameters[0].value);
            }
        } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "messageTypeServices/handleGet",
                "invalid parameter name " + parameters[0].name + " (can be: GET_ALL_MESSAGE_TYPE, GET_MESSAGE_TYPE_BY_ID or GET_MESSAGE_TYPE_BY_CRT_ID)"
                + parameters[0].name);
        }
    } else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "messageTypeServices/handleGet",
            "invalid parameter (can be: GET_ALL_MESSAGE_TYPE, GET_MESSAGE_TYPE_BY_ID or GET_MESSAGE_TYPE_BY_CRT_ID)"
        );
    }
    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

/**
 *
 * @param {MessageType} reqBody
 * @param userId
 * @returns {int} count - Modified rows count
 */
function handlePut(reqBody, userId) {
    var req = messageType.updateMessageType(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

/**
 *
 * @param {object} reqBody
 * @param {string} reqBody.MESSAGE_TYPE_ID
 * @param {int} reqBody.POSITION
 * @param {int} reqBody.ADDITIONAL_MESSAGE_TYPE_INFORMATION
 * @param userId
 * @returns {int} count - Modified rows count
 */
function handleDelete(reqBody, userId) {
    var req = messageType.deleteMessageType(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

/**
 *
 * @param {object} reqBody
 * @param {string} reqBody.NAME
 * @param {int} reqBody.POSITION
 * @param {int} reqBody.ADDITIONAL_MESSAGE_TYPE_INFORMATION
 * @param userId
 * @returns {string} id - Id of the new return type
 */
function handlePost(reqBody, userId) {
    var req = messageType.insertMessageType(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

processRequest();