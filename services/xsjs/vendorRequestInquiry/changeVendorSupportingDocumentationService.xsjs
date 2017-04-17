$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var supDoc = mapper.getChangeVendorSupportingDocumentation();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL = "GET_ALL";
var GET_BY_ID = "GET_BY_ID";

var service_name = "changeVendorSupportingDocumentationService";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

/**
*
* @param {object} parameters
* @param {void} [parameters.GET_ALL] - get all
* @param {string} [parameters.GET_BY_ID] - get by id
* @returns {ChangeSupporting} ChangeSupporting
*/
function handleGet(parameters) {
    var res = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_ALL) {
            res = supDoc.getAllChangeSupporting();
        } else if (parameters[0].name === GET_BY_ID) {
            if (parameters[0].value <= 0 || isNaN(parameters[0].value)) {
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "changeVendorSupportingDocumentationService/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (must be a valid id)"
                );
            } else {
                res = supDoc.getChangeVendorSupportingById(parameters[0].value);
            }
        } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "changeVendorSupportingDocumentationService/handleGet",
                "invalid parameter name " + parameters[0].name + " (can be: GET_ALL or GET_BY_ID)"
            );
        }
    } else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "changeVendorSupportingDocumentationService/handleGet",
            "invalid parameter (can be: GET_ALL or GET_BY_ID)"
        );
    }
    return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

/**
*
* @param {ChangeSupporting} reqBody
* @param userId
* @returns {int} count - Modified rows count
*/
function handlePut(reqBody, userId) {
   var res = supDoc.updateChangeSupporting(reqBody, userId);
   return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

/**
*
* @param {object} reqBody
* @param {string} reqBody.SUPPORTING_DOCUMENTATION_ID - id of the change vendor support documentation to delete
* @param userId
* @returns {int} count - Modified rows count
*/
function handleDelete(reqBody, userId) {
   var res = supDoc.deleteChangeSupporting(reqBody, userId);
   return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

/**
*
* @param {object} reqBody
* @param {string} reqBody.NAME - name of the checkbox
* @param {string} reqBody.DESCRIPTION - description of the checkbox
* @param userId
* @returns {object} id - Id of the new vendor request and the new vendor
*/
function handlePost(reqBody, userId) {
	var res = supDoc.insertChangeSupporting(reqBody, userId);
	return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

processRequest();

/**
* @typedef {object} ChangeSupporting
* @property {string} SUPPORTING_DOCUMENTATION_ID - id of the change vendor support documentation
* @property {string} NAME - name of the checkbox
* @property {string} DESCRIPTION - description of the checkbox
*/