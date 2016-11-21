/** **** libs *********** */
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var http = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var non_sap_vendor = mapper.getNonSapVendor();

/** ***GET PARAMETERS *** */

var GET_NON_SAP_VENDOR_BY_ID = "GET_NON_SAP_VENDOR_BY_ID";
var GET_ALL_NON_SAP_VENDOR = "GET_ALL_NON_SAP_VENDOR";

/** *************************************** */

function processRequest() {
	http.processRequest(handleGet, handlePost, handlePut, handleDelete);
}

function handleGet(parameters, user_id) {
	var rdo = {};
	if (parameters.length > 0) {
		if (parameters[0].name === GET_NON_SAP_VENDOR_BY_ID) {
			if (parameters[0].value <= 0) {
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "nonSapVendorService/handleGet",
                    "invalid parameter value " + parameters[0].name + " (must be a valid id)"
                );
            } else {
            	rdo = non_sap_vendor.getNonSapVendorById(parameters[0].value, user_id);
            }
		} else if (parameters[0].name === GET_ALL_NON_SAP_VENDOR) {
			rdo = non_sap_vendor.getAllNonSapVendor();
		}
	} else {
		throw ErrorLib.getErrors().BadRequest(
				"",
				"nonSapVendorService/handleGet",
				"invalid parameter name (can be: GET_NON_SAP_VENDOR_BY_ID, GET_ALL_NON_SAP_VENDOR or GET_NON_SAP_VENDOR_BY_REQUEST_ID)"
						+ parameters[0].name);
	}
	return http.handleResponse(rdo, http.OK, http.AppJson);
}

function handlePost(vendorObj, user_id) {
	var req = non_sap_vendor.insertNonSapVendor(vendorObj, user_id);
	return http.handleResponse(req, http.OK, http.AppJson);
}

function handlePut(vendorObj, user_id) {
	var req = non_sap_vendor.updateNonSapVendor(vendorObj, user_id);
	return http.handleResponse(req, http.OK, http.AppJson);
}
function handleDelete(vendorObj, user_id) {
	var req = non_sap_vendor.deleteNonSapVendor(vendorObj, user_id);
	return http.handleResponse(req, http.OK, http.AppJson);
}

processRequest();