$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var subject = mapper.getSubject();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_SUBJECT = "GET_ALL_SUBJECT";
var GET_SUBJECT_BY_ID = "GET_SUBJECT_BY_ID";
var GET_SUBJECT_BY_CRT_ID = "GET_SUBJECT_BY_CRT_ID";

var service_name = "subjectService";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

/**
 * @typedef {object} Subject
 * @property {string} subject_id - id of the issue type
 * @property {string} name - name of the issue type
 */


/**
 *
 * @param {object} parameters
 * @param {void} [parameters.GET_ALL_SUBJECT] - get all
 * @param {string} [parameters.GET_SUBJECT_BY_ID] - get by id
 * @returns {Subject} Subject - one or more Subjects
 */
function handleGet(parameters) {
    var rdo = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_ALL_SUBJECT) {
            rdo = subject.getAllSubject(parameters[0].value);
        } else if (parameters[0].name === GET_SUBJECT_BY_ID) {
            if (parameters[0].value <= 0){
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "subjectServices/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (must be a valid id)"
                );
            } else {
                rdo = subject.getSubjectById(parameters[0].value);
            }
        } else if (parameters[0].name === GET_SUBJECT_BY_CRT_ID) {
            if (parameters[0].value <= 0){
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "subjectServices/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (must be a valid id)"
                );
            } else {
                rdo = subject.getSubjectByCrtIdManual(parameters[0].value);
            }
        } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "subjectServices/handleGet",
                "invalid parameter name " + parameters[0].name + " (GET_ALL_SUBJECT, GET_SUBJECT_BY_ID or GET_SUBJECT_BY_CRT_ID)"
            );
        }
    } else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "inquiryServices/handleGet",
            "invalid parameter (GET_ALL_SUBJECT, GET_SUBJECT_BY_ID or GET_SUBJECT_BY_CRT_ID)"
        );
    }
    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

/**
 *
 * @param {object} reqBody
 * @param {string} reqBody.NAME - name of the subject
 * @param {int} reqBody.POSITION
 * @param {int} reqBody.ADDITIONAL_SUBJECT_INFORMATION
 * @param userId
 * @returns {int} count - Modified rows count
 */
function handlePut(reqBody, userId) {
    var req = subject.updateSubject(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

/**
 *
 * @param {object} reqBody
 * @param {string} reqBody.SUBJECT_ID - id of the subject to delete
 * @param userId
 * @returns {int} count - Modified rows count
 */
function handleDelete(reqBody, userId) {
    var req = subject.deleteSubject(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

/**
 *
 * @param {object} reqBody
 * @param {string} reqBody.NAME - name of the subject
 * @param {int} reqBody.POSITION
 * @param {int} reqBody.ADDITIONAL_SUBJECT_INFORMATION
 * @param userId
 * @returns {string} id - Id of the new issue type
 */
function handlePost(reqBody, userId) {
    var req = subject.insertSubject(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

processRequest();
