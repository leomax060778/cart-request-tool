$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var request = mapper.getNewCartRequest();
var shopping_request = mapper.getRequest();

var GET_REQUEST_LAST_ID = "GET_REQUEST_LAST_ID";
var service_name = "ncr_requestService";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

function handleGet(parameters, userId) {
	var req = {};
	if (parameters.length > 0) {
		if (parameters[0].name === GET_REQUEST_LAST_ID) {
			req = shopping_request.getRequestLastId();

		} else {
			throw ErrorLib
					.getErrors()
					.BadRequest(
							"",
							"requestServices/handleGet",
							"invalid parameter name (can be: GET_REQUEST_LAST_ID"
									+ parameters[0].name);
		}
	} else {
        throw ErrorLib.getErrors().BadRequest(
                "",
                "requestService/handleGet",
                "invalid parameter (can be: GET_REQUEST_LAST_ID"
            );
        }
	return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

function handlePut(reqBody, userId) {
	return httpUtil.notImplementedMethod();
}

function handleDelete(reqBody, userId) {
	return httpUtil.notImplementedMethod();
}

function handlePost(reqBody, userId) {

    var req = request.insertRequest(reqBody, userId);
    request.sendSubmitMail(req, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

processRequest();
