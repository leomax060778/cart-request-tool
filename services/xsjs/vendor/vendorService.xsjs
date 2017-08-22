/** **** libs *********** */
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var http = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var vendor = mapper.getVendor();

/** ***GET PARAMETERS *** */

var GET_VENDOR_BY_ID = "GET_VENDOR_BY_ID";
var GET_ALL_VENDOR = "GET_ALL_VENDOR";
var GET_ALL_VENDOR_STATUS = "GET_ALL_VENDOR_STATUS";
var GET_ALL_VENDOR_FOR_FILTERS = "GET_ALL_VENDOR_FOR_FILTERS";
var GET_VENDOR_BY_ENTITY_ID = "GET_VENDOR_BY_ENTITY_ID";
var GET_VENDOR_BY_STATUS = "GET_VENDOR_BY_STATUS";
var GET_VENDOR_BY_ACCOUNT = "GET_VENDOR_BY_ACCOUNT";

var service_name = "vendorService";

/** *************************************** */

function processRequest() {
	http.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

function handleGet(parameters, user_id) {
	var res = {};
	if (parameters.length > 0) {
		if (parameters[0].name === GET_VENDOR_BY_ID) {
			if (parameters[0].value <= 0 || isNaN(parameters[0].value)) {
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "vendorRequestService/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (must be a valid id)"
                );
            } else {
            	res = vendor.getVendorById(parameters[0].value, user_id);
            }
		} else if (parameters[0].name === GET_VENDOR_BY_ACCOUNT) {
			if (!parameters[0].value) {
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "vendorRequestService/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (must be a valid account)"
                );
            } else {
            	res = vendor.getVendorByAccount(parameters[0].value);
            }
		} else if (parameters[0].name === GET_VENDOR_BY_ENTITY_ID) {
			if (parameters[0].value <= 0 || isNaN(parameters[0].value)) {
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "vendorRequestService/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (must be a valid id)"
                );
            } else if (parameters[1] && (Number(parameters[1].value) > 0 || !isNaN(parameters[1].value))){
            	res = vendor.getAllVendorByEntity(parameters[0].value, parameters[1].value);
            } else {
            	res = vendor.getAllVendorByEntity(parameters[0].value);
            }
		} else if (parameters[0].name === GET_ALL_VENDOR) {
			res = vendor.getAllVendor();
		} else if (parameters[0].name === GET_ALL_VENDOR_STATUS) {
			res = vendor.getAllVendorStatus();
		} else if (parameters[0].name === GET_ALL_VENDOR_FOR_FILTERS) {
			res = vendor.getAllVendorForFilters(user_id);
		} else if (parameters[0].name === GET_VENDOR_BY_STATUS) {
			if (parameters[0].value <= 0 || isNaN(parameters[0].value)) {
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "vendorRequestService/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (must be a valid id)"
                );
            } else {
            	res = vendor.getVendorByStatus(parameters[0].value);
            }
		} else {
			throw ErrorLib.getErrors().BadRequest(
					"",
					"vendorService/handleGet",
					"invalid parameter (can be: GET_VENDOR_BY_ID, GET_ALL_VENDOR, GET_VENDOR_BY_ENTITY_ID, GET_ALL_VENDOR_FOR_FILTERS, GET_VENDOR_BY_ACCOUNT or GET_VENDOR_BY_STATUS)"
					);
		}
	} else {
		throw ErrorLib.getErrors().BadRequest(
				"",
				"vendorService/handleGet",
				"invalid parameter (can be: GET_VENDOR_BY_ID, GET_ALL_VENDOR, GET_VENDOR_BY_ENTITY_ID, GET_ALL_VENDOR_FOR_FILTERS, GET_VENDOR_BY_ACCOUNT or GET_VENDOR_BY_STATUS)"
				);
	}
	return http.handleResponse(res, http.OK, http.AppJson);
}

function handlePost(vendorObj, user_id) {
	var req = vendor.insertVendor(vendorObj, user_id);
	return http.handleResponse(req, http.OK, http.AppJson);
}

function handlePut(vendorObj, user_id) {
	var req = vendor.updateVendor(vendorObj, user_id);
	return http.handleResponse(req, http.OK, http.AppJson);
}
function handleDelete(vendorObj, user_id) {
	var req = vendor.deleteVendor(vendorObj, user_id);
	return http.handleResponse(req, http.OK, http.AppJson);
}

processRequest();