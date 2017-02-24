$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var request = mapper.getApi();

var GET_L6_BY_ID = "GET_L6_BY_ID";
var GET_L6_BY_PATH = "GET_L6_BY_PATH";
var GET_ALL_ENTITY = "GET_ALL_ENTITY";

/** *************************************** */
function processRequest() {
	httpUtil.processRequest2(handleGet, handlePost, handlePut, handleDelete, true, "", true);
}

function handleGet(parameters, userId) {
	var req = {};
	if (parameters.length > 0) {
		if (parameters[0].name === GET_L6_BY_ID) {
			if (parameters[0].value <= 0 || isNaN(parameters[0].value)) {
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "apiService/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (must be a valid id)"
                );
            } else {
            	req = request.getL6ById(parameters[0].value);
            }
		} else if (parameters[0].name === GET_L6_BY_PATH) {
			   	req = request.getL6ByWBSPath(parameters[0].value);
		} else if (parameters[0].name ===GET_ALL_ENTITY) {
			req = request.getAllEntities();
		} else {
			throw ErrorLib
					.getErrors()
					.BadRequest(
							"",
							"apiServices/handleGet",
							"invalid parameter name (can be: GET_L6_BY_ID, GET_L6_BY_PATH)"
									+ parameters[0].name);
		}
	} else {
        throw ErrorLib.getErrors().BadRequest(
                "",
                "apiService/handleGet",
                "invalid parameter (can be: GET_L6_BY_ID on GET_L6_BY_PATH)"
            );
        }
	return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

function handlePost() {
	return httpUtil.notImplementedMethod();
}

function handlePut(reqBody, user_id) {
	return httpUtil.notImplementedMethod();
}

function handleDelete(reqBody, user_id) {
	return httpUtil.notImplementedMethod();
}


processRequest();
