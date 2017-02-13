$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var selection = mapper.getChangeVendorSelection();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_CHANGE_VENDOR_SELECTION = "GET_CHANGE_VENDOR_SELECTION";

var service_name = "changeVendorSelectionService";

function processRequest() {
    httpUtil.processRequest3(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

/**
 *
 * @param {object} parameters
 * @param {string} parameters.GET_CHANGE_VENDOR_SELECTION - get all checkboxes and values for the change vendor request
 * @returns {ChangeSelection} ChangeSelection
 */
function handleGet(parameters) {
    var res = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_CHANGE_VENDOR_SELECTION) {
        	 if (parameters[0].value <= 0 || isNaN(parameters[0].value)) {
                 throw ErrorLib.getErrors().BadRequest(
                     "",
                     "vendorRequestInquiryService/handleGet",
                     "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (must be a valid id)"
                 );
             } else {
            	 res = selection.getChangeSelectionById(parameters[0].value);
             }
        } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "vendorRequestServices/handleGet",
                "invalid parameter name " + parameters[0].name + " (can be: GET_CHANGE_VENDOR_SELECTION)"
            );
        }
    } else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "vendorRequestServices/handleGet",
            "invalid parameter (can be: GET_CHANGE_VENDOR_SELECTION)"
        );
    }
    return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

//Not Implemented Method
function handlePut(){
    return httpUtil.notImplementedMethod();
}

//Not Implemented Method
function handleDelete(){
    return httpUtil.notImplementedMethod();
}

//Not Implemented Method
function handlePost(){
    return httpUtil.notImplementedMethod();
}

processRequest();