$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var issueType = mapper.getIssueType();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_ISSUE_TYPE = "GET_ALL_ISSUE_TYPE";
var GET_ISSUE_TYPE_BY_ID = "GET_ISSUE_TYPE_BY_ID";
var GET_ISSUE_TYPE_BY_CRT_ID = "GET_ISSUE_TYPE_BY_CRT_ID";

var service_name = "issueTypeService";

function processRequest() {
    httpUtil.processRequest3(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

/**
 * @typedef {object} IssueType
 * @property {string} issue_type_id - id of the issue type
 * @property {string} name - name of the issue type
 */


/**
 *
 * @param {object} parameters
 * @param {void} [parameters.GET_ALL_ISSUE_TYPE] - get all
 * @param {string} [parameters.GET_ISSUE_TYPE_BY_ID] - get by id
 * @returns {IssueType} IssueType - one or more IssueTypes
 */
function handleGet(parameters) {
    var rdo = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_ALL_ISSUE_TYPE) {
            rdo = issueType.getAllIssueType(parameters[0].value);
        } else if (parameters[0].name === GET_ISSUE_TYPE_BY_ID) {
            if (parameters[0].value <= 0){
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "issueTypeServices/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (must be a valid id)"
                );
            } else {
                rdo = issueType.getIssueTypeById(parameters[0].value);
            }
        } else if (parameters[0].name === GET_ISSUE_TYPE_BY_CRT_ID) {
            if (parameters[0].value <= 0){
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "issueTypeServices/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (must be a valid id)"
                );
            } else {
                rdo = issueType.getIssueTypeByCrtIdManual(parameters[0].value);
            }
        } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "issueTypeServices/handleGet",
                "invalid parameter name " + parameters[0].name + " (GET_ALL_ISSUE_TYPE, GET_ISSUE_TYPE_BY_ID or GET_ISSUE_TYPE_BY_CRT_ID)"
            );
        }
    } else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "inquiryServices/handleGet",
            "invalid parameter (GET_ALL_ISSUE_TYPE, GET_ISSUE_TYPE_BY_ID or GET_ISSUE_TYPE_BY_CRT_ID)"
        );
    }
    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

/**
 *
 * @param {IssueType} reqBody
 * @param userId
 * @returns {int} count - Modified rows count
 */
function handlePut(reqBody, userId) {
    var req = issueType.updateIssueType(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

/**
 *
 * @param {object} reqBody
 * @param {string} reqBody.ISSUE_TYPE_ID - id of the issue type to delete
 * @param userId
 * @returns {int} count - Modified rows count
 */
function handleDelete(reqBody, userId) {
    var req = issueType.deleteIssueType(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

/**
 *
 * @param {object} reqBody
 * @param {string} reqBody.NAME - name of the issue type
 * @param userId
 * @returns {string} id - Id of the new issue type
 */
function handlePost(reqBody, userId) {
    var req = issueType.insertIssueType(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

processRequest();
