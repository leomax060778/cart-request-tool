/** **** libs *********** */
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var http = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var nonSapVendor = mapper.getNonSapVendor();

/** ***GET PARAMETERS *** */

var GET_NON_SAP_VENDOR_BY_ID = "GET_NON_SAP_VENDOR_BY_ID";
var GET_NON_SAP_VENDOR_BY_VENDOR_ID = "GET_NON_SAP_VENDOR_BY_VENDOR_ID";
var GET_ALL_NON_SAP_VENDOR = "GET_ALL_NON_SAP_VENDOR";

var service_name = "nonSapVendorService";

/** *************************************** */

function processRequest() {
	http.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

function handleGet(parameters, userId) {
	var rdo = {};
	if (parameters.length > 0) {
		if (parameters[0].name === GET_NON_SAP_VENDOR_BY_ID) {
			if (parameters[0].value <= 0) {
                throw ErrorLib.getErrors().BadRequest("", "", "invalid parameter value " + parameters[0].name + " (must be a valid id)"
                );
            } else {
            	rdo = nonSapVendor.getNonSapVendorById(parameters[0].value, userId);
            }
		} else if (parameters[0].name === GET_NON_SAP_VENDOR_BY_VENDOR_ID) {
			if (parameters[0].value <= 0) {
                throw ErrorLib.getErrors().BadRequest("", "", "invalid parameter value " + parameters[0].name + " (must be a valid id)"
                );
            } else {
            	rdo = nonSapVendor.getNonSapVendorByVendorId(parameters[0].value, userId);
            }
		} else if (parameters[0].name === GET_ALL_NON_SAP_VENDOR) {
			rdo = nonSapVendor.getAllNonSapVendor();
		}
	} else {
		throw ErrorLib.getErrors().BadRequest("", "", "invalid parameter name (can be: GET_NON_SAP_VENDOR_BY_ID, GET_ALL_NON_SAP_VENDOR or GET_NON_SAP_VENDOR_BY_REQUEST_ID)"
						+ parameters[0].name);
	}
	return http.handleResponse(rdo, http.OK, http.AppJson);
}

function handlePost(objNonSapVendor, userId) {
	var	req = nonSapVendor.insertNonSapVendor(objNonSapVendor, userId);
	return http.handleResponse(req, http.OK, http.AppJson);
}

function handlePut(objNonSapVendor, userId) {
	var req = 0;
    if (objNonSapVendor.METHOD === "UPD_NON_SAP_VENDOR_MASK") {
    	req = nonSapVendor.updateNonSapVendorMask(objNonSapVendor, userId);
    } else {
        req = nonSapVendor.updateNonSapVendor(objNonSapVendor, userId);
    }
	return http.handleResponse(req, http.OK, http.AppJson);
}
function handleDelete(objNonSapVendor, userId) {
	var req = nonSapVendor.deleteNonSapVendor(objNonSapVendor, userId);
	return http.handleResponse(req, http.OK, http.AppJson);
}

processRequest();