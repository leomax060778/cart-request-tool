/** **** libs *********** */
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var http = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var vendorCI = mapper.getVendorContactInformation();

/** ***GET PARAMETERS *** */

var GET_VENDOR_CONTACT_INFORMATION_BY_VENDOR_ID = "GET_VENDOR_CONTACT_INFORMATION_BY_VENDOR_ID";
var GET_ALL_VENDOR_CONTACT_INFORMATION = "GET_ALL_VENDOR_CONTACT_INFORMATION";
var GET_VENDOR_CONTACT_INFORMATION_BY_ID = "GET_VENDOR_CONTACT_INFORMATION_BY_ID";
var UPDATE_DEFAULT_VENDOR_CONTACT_INFORMATION = "UPDATE_DEFAULT_VENDOR_CONTACT_INFORMATION";

var service_name = "vendorContactInformationService";

/** *************************************** */

function processRequest() {
	http.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

function handleGet(parameters, user_id) {
	var rdo = {};
	if (parameters.length > 0) {
		if (parameters[0].name === GET_VENDOR_CONTACT_INFORMATION_BY_ID) {
			if (parameters[0].value <= 0 || isNaN(parameters[0].value)) {
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "vendorContactInformationService/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (must be a valid id)"
                );
            } else {
            	rdo = vendorCI.getVendorContactInformationById(parameters[0].value, user_id);
            }
		} else if (parameters[0].name === GET_VENDOR_CONTACT_INFORMATION_BY_VENDOR_ID) {
			if (parameters[0].value <= 0 || isNaN(parameters[0].value)) {
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "vendorContactInformationService/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (must be a valid id)"
                );
            } else {
            	rdo = vendorCI.getVendorContactInformationByVendorId(parameters[0].value, user_id);
            }
		} else if (parameters[0].name === GET_ALL_VENDOR_CONTACT_INFORMATION) {
			rdo = vendorCI.getAllVendorContactInformation(user_id);
		}
	} else {
		throw ErrorLib.getErrors().BadRequest(
				"",
				"vendorContactInformationService/handleGet",
				"invalid parameter (can be: GET_VENDOR_CONTACT_INFORMATION_BY_ID, GET_ALL_VENDOR_CONTACT_INFORMATION or GET_VENDOR_CONTACT_INFORMATION_BY_VENDOR_ID)"
				);
	}
	return http.handleResponse(rdo, http.OK, http.AppJson);
}

function handlePost(vendorContactInfoObj, user_id) {
	var req = vendorCI.insertVendorContactInformation(vendorContactInfoObj, user_id);
	return http.handleResponse(req, http.OK, http.AppJson);
}

function handlePut(vendorContactInfoObj, user_id) {
	if(vendorContactInfoObj.METHOD && vendorContactInfoObj.METHOD === UPDATE_DEFAULT_VENDOR_CONTACT_INFORMATION){
		var req = vendorCI.updateDefaultVendorContactInformation(vendorContactInfoObj, user_id);
	}else{
		var req = vendorCI.updateVendorContactInformation(vendorContactInfoObj, user_id);
	}
	return http.handleResponse(req, http.OK, http.AppJson);
	
}

function handleDelete(vendorContactInfoObj, user_id) {
	var req = vendorCI.deleteVendorContactInformation(vendorContactInfoObj, user_id);
	return http.handleResponse(req, http.OK, http.AppJson);
}

processRequest();