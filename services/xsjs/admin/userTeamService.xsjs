$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var userTeam = mapper.getUserTeam();
var config = mapper.getDataConfig();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_TEAM_BY_USER_ID_BUDGET_YEAR = "GET_TEAM_BY_USER_ID_BUDGET_YEAR";

var service_name = "userTeamService";

function processRequest() {
    //httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete);
	httpUtil.processRequest3(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

/**
 * @typedef {object} Modal
 * @property {string} MODAL_ID - id of the modal
 * @property {string} DESCRIPTION - description of the modal
 * @property {string} CONTENT - content of the modal
 * @property {string} LINK - link of the modal
 */


/**
 *
 * @param {object} parameters
 * @param {void} [parameters.GET_ALL_MODAL] - get all
 * @param {string} [parameters.GET_MODAL_BY_ID] - get by id
 * @returns {Modal} Modal - one or more Modals
 */
function handleGet(parameters,userId) {
    var rdo = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_TEAM_BY_USER_ID_BUDGET_YEAR) {
        	var objRequest = paramsToObj(parameters,["BUDGET_YEAR_ID","USER_ID"]);
            rdo = userTeam.getSelectedTeamsByUserBudgetYear(objRequest,userId);
        } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "modalService/handleGet",
                "invalid parameter name " + parameters[0].name + " (can be: GET_ALL_MODAL or GET_MODAL_BY_ID)"
            );
        }
    } else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "modalService/handleGet",
            "invalid parameter (can be: GET_ALL_MODAL or GET_MODAL_BY_ID)"
        );
    }
    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

/**
 *
 * @param {Modal} reqBody
 * @param userId
 * @returns {int} count - Modified rows count
 */
function handlePut(reqBody, userId) {
    var req = userTeam.updateUserTeam(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

/**
 *
 * @param {object} reqBody
 * @param {string} reqBody.MODAL_ID - id of the modal to delete
 * @param userId
 * @returns {int} count - Modified rows count
 */
function handleDelete(reqBody, userId) {
    var req = modal.deleteModal(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

/**
 * 
 * @param {object} reqBody
 * @param {string} reqBody.DESCRIPTION - description of the modal
 * @param {string} reqBody.CONTENT - content of the modal
 * @param {string} reqBody.LINK - link of the modal
 * @param userId
 * @returns {string} id - Id of the new modal
 */
function handlePost(reqBody, userId) {
    var req = modal.insertModal(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

function paramsToObj(params,paramsArray){
	var elements = {};
	Object.keys(params).forEach(function(key) {
		var value = params[key];
		if(paramsArray.indexOf(value.name) > -1){
			elements[value.name] = value.value;
		}
	});
	return elements;
}

processRequest();