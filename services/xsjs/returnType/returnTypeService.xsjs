$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var returnType = mapper.getReturnType();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_RETURN_TYPE = "GET_ALL_RETURN_TYPE";
var GET_RETURN_TYPE_BY_ID = "GET_RETURN_TYPE_BY_ID";
var GET_RETURN_TYPE_BY_CRT_ID = "GET_RETURN_TYPE_BY_CRT_ID";

var service_name = "returnTypeService";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

/**
 * @typedef {object} ReturnType
 * @property {string} RETURN_TYPE_ID - id of the return type
 * @property {string} NAME - name of the return type
 */


/**
 *
 * @param {object} parameters
 * @param {void} [parameters.GET_ALL_RETURN_TYPE] - get all
 * @param {string} [parameters.GET_RETURN_TYPE_BY_ID] - get by id
 * @returns {ReturnType} ReturnType - one or more ReturnTypes
 */
function handleGet(parameters) {
    var rdo = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_ALL_RETURN_TYPE) {
            rdo = returnType.getAllReturnType(parameters[0].value);
        } else if (parameters[0].name === GET_RETURN_TYPE_BY_ID) {
            if (parameters[0].value <= 0){
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "returnTypeServices/handleGet",
                    "invalid parameter value " + parameters[0].name + " (must be a valid id)"
                );
            } else {
                rdo = returnType.getReturnTypeById(parameters[0].value);
            }
        } else if (parameters[0].name === GET_RETURN_TYPE_BY_CRT_ID) {
            if (parameters[0].value <= 0){
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "returnTypeServices/handleGet",
                    "invalid parameter value " + parameters[0].name + " (must be a valid id)"
                );
            } else {
                rdo = returnType.getReturnTypeByCrtIdManual(parameters[0].value);
            }
        } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "returnTypeServices/handleGet",
                "invalid parameter name " + parameters[0].name + " (can be: GET_ALL_RETURN_TYPE, GET_RETURN_TYPE_BY_ID or GET_RETURN_TYPE_BY_CRT_ID)"
                + parameters[0].name);
        }
    } else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "returnTypeServices/handleGet",
            "invalid parameter (can be: GET_ALL_RETURN_TYPE, GET_RETURN_TYPE_BY_ID or GET_RETURN_TYPE_BY_CRT_ID)"
        );
    }
    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

/**
 *
 * @param {ReturnType} reqBody
 * @param userId
 * @returns {int} count - Modified rows count
 */
function handlePut(reqBody, userId) {
    var req = returnType.updateReturnType(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

/**
 *
 * @param {object} reqBody
 * @param {string} reqBody.RETURN_TYPE_ID
 * @param userId
 * @returns {int} count - Modified rows count
 */
function handleDelete(reqBody, userId) {
    var req = returnType.deleteReturnType(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

/**
 *
 * @param {object} reqBody
 * @param {string} reqBody.NAME
 * @param userId
 * @returns {string} id - Id of the new return type
 */
function handlePost(reqBody, userId) {
    var req = returnType.insertReturnType(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

processRequest();