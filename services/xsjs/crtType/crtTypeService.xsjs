$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var crtType = mapper.getCrtType();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_CRT_TYPE = "GET_ALL_CRT_TYPE";
var GET_CRT_TYPE_BY_ID = "GET_CRT_TYPE_BY_ID";
var GET_CRT_TYPE_WITH_DATA_PROTECTION = "GET_CRT_TYPE_WITH_DATA_PROTECTION";
var GET_CRT_TYPE_BY_RETURN_TYPE = "GET_CRT_TYPE_BY_RETURN_TYPE";
var GET_CRT_TYPE_BY_ISSUE_TYPE = "GET_CRT_TYPE_BY_ISSUE_TYPE";

var service_name = "crtTypeService";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

/**
 *
 * @param {object} parameters
 * @param {void} [parameters.GET_ALL_CRT_TYPE] - get all
 * @param {string} [parameters.GET_CRT_TYPE_BY_ID] - get by id
 * @param {string} [GET_CRT_TYPE_WITH_DATA_PROTECTION] - get crt types that use Data Protection
 * @param {string} [GET_CRT_TYPE_BY_RETURN_TYPE] - get crt types that use Data Protection
 * @param {string} [GET_CRT_TYPE_BY_ISSUE_TYPE] - get crt types that use Data Protection
 * @returns {CrtType} CrtType - one or more CrtTypes
 */
function handleGet(parameters) {
    var res = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_ALL_CRT_TYPE) {
            res = crtType.getAllCrtType(parameters[0].value);
        } else if (parameters[0].name === GET_CRT_TYPE_BY_ID) {
            if (parameters[0].value <= 0){
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "crtTypeService/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter \'" + parameters[0].name + "\' (should be a valid id)"
                );
            } else {
                res = crtType.getCrtTypeById(parameters[0].value);
            }
        } else if (parameters[0].name === GET_CRT_TYPE_BY_RETURN_TYPE) {
            if (parameters[0].value <= 0){
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "crtTypeService/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter \'" + parameters[0].name + "\' (should be a valid id)"
                );
            } else {
                res = crtType.getCrtTypeByReturnType(parameters[0].value);
            }
        } else if (parameters[0].name === GET_CRT_TYPE_BY_ISSUE_TYPE) {
            if (parameters[0].value <= 0){
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "crtTypeService/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter \'" + parameters[0].name + "\' (should be a valid id)"
                );
            } else {
                res = crtType.getCrtTypeByIssueType(parameters[0].value);
            }
        } else if (parameters[0].name === GET_CRT_TYPE_WITH_DATA_PROTECTION) {
                res = crtType.getCrtTypeWithDataProtection();
        } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "crtTypeServices/handleGet",
                "invalid parameter name " + parameters[0].name + " (can be: GET_ALL_CRT_TYPE, GET_CRT_TYPE_BY_ID, GET_CRT_TYPE_BY_RETURN_TYPE, GET_CRT_TYPE_BY_ISSUE_TYPE or GET_CRT_TYPE_WITH_DATA_PROTECTION)"
            );
        }
    } else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "inquiryServices/handleGet",
            "invalid parameter (can be: GET_ALL_CRT_TYPE, GET_CRT_TYPE_BY_ID, GET_CRT_TYPE_BY_RETURN_TYPE, GET_CRT_TYPE_BY_ISSUE_TYPE or GET_CRT_TYPE_WITH_DATA_PROTECTION)"
        );
    }
    return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
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