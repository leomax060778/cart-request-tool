$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var countryLib = mapper.getCountry();
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();

var GET_ALL_COUNTRY = "GET_ALL_COUNTRY";
var GET_COUNTRY_BY_ID = "GET_COUNTRY_BY_ID";

var service_name = "countryService";

function processRequest() {
	httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

function handleGet(params, userId) {
	var rdo = {};
	if (params.length > 0) {
		if (params[0].name === GET_ALL_COUNTRY) {
			rdo = countryLib.getAllCountry();
		} else if (params[0].name === GET_COUNTRY_BY_ID) {
			if (params[0].value <= 0 || isNaN(params[0].value)){
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "countryServices/handleGet",
                    "invalid value \'" + params[0].value + "\' for parameter " + params[0].name + " (must be a valid id)"
                );
            } else {
            	rdo = countryLib.getCountryById(params[0].value, userId);
            }
		} else {
			throw ErrorLib.getErrors().BadRequest(
					"",
					"countryServices/handleGet",
					"invalid parameter name (can be: GET_ALL_COUNTRY or GET_COUNTRY_BY_ID)"
					);
		}
	} else {
		throw ErrorLib.getErrors().BadRequest(
				"",
				"countryServices/handleGet",
				"invalid parameter name (can be: GET_ALL_COUNTRY or GET_COUNTRY_BY_ID)"
				);
	}
	return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handlePost(objReq, userId) {
	return httpUtil.notImplementedMethod();
}

function handlePut(objReq, userId) {
	return httpUtil.notImplementedMethod();
}

function handleDelete(objReq, userId) {
	return httpUtil.notImplementedMethod();
}

processRequest();