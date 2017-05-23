$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var request = mapper.getChangeVendorRequest();
var selection = mapper.getChangeVendorSelection();

var db = mapper.getdbHelper(); 
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_CHANGE_VENDOR_REQUEST = "GET_ALL_CHANGE_VENDOR_REQUEST";

var service_name = "changeVendorRequestService";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
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
	selection.deleteChangeSelectionManual(reqBody, userId);
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
* @returns {object} id - Id of the new change vendor request and the number of modified selection 
*/
function handlePost(reqBody, userId) {
	try {
		var resRequest = request.insertChangeVendorRequestManual(reqBody, userId);
		reqBody.CHANGE_VENDOR_REQUEST_ID = resRequest;
		var resSelection = selection.insertChangeSelectionManual(reqBody, userId);
		var mail = request.sendSubmitMail(resRequest, userId);
		var res = {'changeVendorId': resRequest, "selection": resSelection, "mail": mail};
		return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
	} catch(e){
		db.rollback();		
		throw ErrorLib.getErrors().InternalServerError("Internal Server Error - SQL ",e.toString(),"dbHelper.executeScalar");	
	}
}

processRequest();

/**
 * @typedef {object} ChangeVendorRequest
 * @property {string} CHANGE_VENDOR_REQUEST_ID - id of the change vendor request
 * @property {string} USER_NAME - username
 * @property {string} FIRST_NAME - first name of the user
 * @property {string} LAST_NAME - last name of the user
 * @property {string} ENTITY_ID - id of the entity
 * @property {string} COMMODITY_ID - id of the commodity
 * @property {string} VENDOR_NAME - name of the vendor
 * @property {string} VENDOR_CONTACT_NAME - name of the contact
 * @property {string} VENDOR_CONTACT_EMAIL - email of the contact
 * @property {int} DATA_PROTECTION_ENABLED - is enabled data protection (1 or 0 only)
 * @property {int} CHANGE_NAME - is change name (1 or 0 only)
 * @property {int} CHANGE_ADDRESS - is change address (1 or 0 only)
 * @property {int} CHANGE_BANK_DATA - is bank data (1 or 0 only)
 * @property {int} CHANGE_TAX_ID - is change tax id (1 or 0 only)
 * @property {int} CHANGE_TELEPHONE_FAX_EMAIL - is change telephone, fax or email (1 or 0 only)
 * @property {int} CHANGE_PAYMENT_TERM - is change payment term (1 or 0 only)
 * @property {string} VENDOR_ID - id of the vendor
 */

/**
* 
* @typedef {int[]} ChangeSelection
* @property {int} SUPPORTING_DOCUMENTATION_ID - id of the change vendor supporting documentation option
* @property {int} SELECTION - 1 if it is selected, 0 if it is not
*/