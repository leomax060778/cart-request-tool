/** **** libs *********** */
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var login = mapper.getLogin();
/** *************************************** */

// constants
var OK = $.net.http.OK;
var AppJson = "application/json";

// return a plain/text response with status 200;
function handleResponsePlain(strbody) {
	$.response.contentType = "plain/text";
	$.response.status = 200;
	$.response.setBody(strbody)
}

// return a Response
function handleResponse(body, code, type) {
	$.response.contentType = type;
	$.response.status = code;
	$.response.setBody(JSON.stringify(body));
}

// return object whit all Get's parameters. example
// myService.HttpLib.getUrlParameters().myParam
function getUrlParameters() {
	return $.request.parameters;
}

// This function set the Response with a error. value = error -->
// ErrorLib.Errors.SomeError("message","datails")
function handleErrorResponse(value) {
	if (value && value.code) {
		var error = ErrorLib.getErrors().getError(value.code);
		error.stack = value.stack;
		error.details = value.details;
		$.response.contentType = "application/json";
		$.response.status = error.code;
		$.response.setBody(JSON.stringify(error));
	} else {
		handleErrorResponse(ErrorLib.getErrors().InternalServerError("", "",
				value + "")); // value + "" is a workaround!!!
	}
}

// throw a Not Implemented Error
function notImplementedMethod() {
	throw ErrorLib.getErrors().NotImplemented("HTTP method is not supported.",
			"httpLib/processRequest", "");
}

// This function choose method, between Get, Put, Post or Delete. Catch all
// error throwed across the entired app and validate the user per XS call.
function processRequest(getMethod, postMethod, putMethod, deleteMethod) {
	try {

		/** ********here - Validate User() -----** */
		var userSessionID = 1;
		userSessionID = validateUser(getHeaderByName("x-csrf-token"));
		if(!userSessionID)
			 throw ErrorLib.getErrors().Unauthorized(getHeaderByName("x-csrf-token"));
		
		 /** *********************************************** */
		var reqBody = $.request.body ? JSON.parse($.request.body.asString())
				: undefined;

		switch ($.request.method) {
		case $.net.http.GET:
			return getMethod(getUrlParameters(), userSessionID);
			break;
		case $.net.http.PUT:
			return putMethod(reqBody, userSessionID);
			break;
		case $.net.http.POST:
			return postMethod(reqBody, userSessionID);
			break;
		case $.net.http.DEL:
			return deleteMethod(reqBody, userSessionID);
			break;
		default:
			return notImplementedMethod();
			break;
		}

	} catch (e) {
		handleErrorResponse(e);
	}
}

// get userSession from DB, if userToken ins't expired

function validateUser(userToken) {
	return login.validateUser(decodeURIComponent(userToken));
}

// find the header with this name
function getHeaderByName(name) {
	for (var j = 0; j < $.request.headers.length; ++j) {
		var headerName = $.request.headers[j].name;
		var headerValue = $.request.headers[j].value;

		if (headerName == name)
			return headerValue; // return headerValue;

	}
	return null;
}

function getHeaders() {
	if ($.request.headers.length > 0) {
		return $.request.headers;
	}

	return null;
}