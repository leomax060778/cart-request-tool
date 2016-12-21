$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var crtType = mapper.getCrtType();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_CRT_TYPE = "GET_ALL_CRT_TYPE";
var GET_CRT_TYPE_BY_ID = "GET_CRT_TYPE_BY_ID";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete);
}

/**
 *
 * @param {object} parameters
 * @param {void} [parameters.GET_ALL_CRT_TYPE] - get all
 * @param {string} [parameters.GET_CRT_TYPE_BY_ID] - get by id
 * @returns {CrtType} CrtType - one or more CrtTypes
 */
function handleGet(parameters) {
    var rdo = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_ALL_CRT_TYPE) {
            rdo = crtType.getAllCrtType(parameters[0].value);
        } else if (parameters[0].name === GET_CRT_TYPE_BY_ID) {
            if (parameters[0].value <= 0){
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "crtTypeService/handleGet",
                    "invalid parameter value " + parameters[0].name + " (must be a valid id)"
                );
            } else {
                rdo = crtType.getCrtTypeById(parameters[0].value);
            }
        } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "crtTypeServices/handleGet",
                "invalid parameter name " + parameters[0].name + " (can be: GET_ALL_CRT_TYPE or GET_CRT_TYPE_BY_ID)"
            );
        }
    } else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "inquiryServices/handleGet",
            "invalid parameter (can be: GET_ALL_CRT_TYPE or GET_CRT_TYPE_BY_ID)"
        );
    }
    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

/**
 *
 * @param {object} reqBody
 * @param {string} reqBody.CRT_TYPE_ID - Id of the crt type to update
 * @param {string} reqBody.NAME - New name of the crt type
 * @param userId
 * @returns {int} count - Modified rows count
 */
function handlePut(reqBody, userId) {
    var req = crtType.updateCrtType(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

/**
 *
 * @param reqBody
 * @param {string} reqBody.CRT_TYPE_ID - Id of the crt type to delete
 * @param userId
 * @returns {int} count - Modified rows count
 */
function handleDelete(reqBody, userId) {
    var req = crtType.deleteCrtType(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

/**
 *
 * @param reqBody
 * @param {string} reqBody.NAME - Name of the
 * @param {string} reqBody.NAME - New name of the crt type
 * @param userId
 * @returns {string} id - Id of the new crt type
 */
function handlePost(reqBody, userId) {
    var req = crtType.insertCrtType(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

processRequest();

/**
 * @typedef {object} CrtType
 * @property {string} crt_type_id
 * @property {string} name
 */