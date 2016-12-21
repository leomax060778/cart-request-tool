$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var request = mapper.getChangeVendorRequest();
var selection = mapper.getChangeVendorSelection();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_CHANGE_VENDOR_REQUEST = "GET_ALL_CHANGE_VENDOR_REQUEST";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete);
}

/**
 *
 * @param {object} parameters
 * @param {void} parameters.GET_ALL_CHANGE_VENDOR_REQUEST - get all
 * @returns {ChangeVendorRequest} ChangeVendorRequest - one or more ChangeVendorRequests
 */
function handleGet(parameters) {
    var rdo = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_ALL_CHANGE_VENDOR_REQUEST) {
            rdo = request.getAllChangeVendorRequest();
        } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "vendorRequestServices/handleGet",
                "invalid parameter name " + parameters[0].name + " (can be: GET_ALL_CHANGE_VENDOR_REQUEST)"
            );
        }
    } else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "vendorRequestServices/handleGet",
            "invalid parameter (can be: GET_ALL_CHANGE_VENDOR_REQUEST)"
        );
    }
    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

//Not Implemented Method
function handlePut(){
    return httpUtil.notImplementedMethod();
}

/**
 *
 * @param {object} reqBody
 * @param {string} reqBody.change_vendor_request_id - id of the change vendor request
 * @param userId
 * @returns {int} count - Modified rows count
 */
function handleDelete(reqBody, userId) {
    var req = request.deleteChangeVendorRequest(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

/**
 *
 * @param {object} reqBody
 * @param {string} reqBody.ENTITY_ID - id of the entity
 * @param {string} reqBody.COMMODITY_ID - id of the commodity
 * @param {string} reqBody.VENDOR_ID - id of the vendor
 * @param {ChangeSelection[]} reqBody.CHECKBOX - array with the id of the checkbox and value
 * @param userId
 * @returns {string} id - Id of the new change vendor request
 */
function handlePost(reqBody, userId) {
    var resRequest = request.insertChangeVendorRequestManual(reqBody, userId);
    reqBody.CHANGE_VENDOR_REQUEST_ID = resRequest;
    var resSelection = selection.insertChangeSelection(reqBody, userId);
    var res = {'changeVendorId': resRequest, "selection": resSelection};
    return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

processRequest();
