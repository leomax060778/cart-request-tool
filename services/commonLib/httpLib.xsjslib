/** **** libs *********** */
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var login = mapper.getLogin();
var permissions = mapper.getDataPermission();
var config = mapper.getDataConfig();
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
	}else{
		handleErrorResponse(ErrorLib.getErrors().InternalServerError("","",value+""));	//value + "" is a workaround!!!
	}	
}

// throw a Not Implemented Error
function notImplementedMethod() {
	throw ErrorLib.getErrors().NotImplemented("HTTP method is not supported.",
			"httpLib/processRequest", "");
}

function processRequest(getMethod, postMethod, putMethod, deleteMethod) {
	processRequest2(getMethod, postMethod, putMethod, deleteMethod, false, "", true);
}

//TODO: the following function should be the default one once all services are updated with the new contract
//This function choose method, between Get, Put, Post or Delete. Catch all error throwed across the entired app and validate the user per XS call.
function processRequest2(getMethod, postMethod, putMethod, deleteMethod, Notvalidate, ResourceID, WithOutPermission) {
	try {
		
		/**********here  - Validate User() -----***/
		var userSessionID = null;
		if(!Notvalidate){
			userSessionID = validateUser(getHeaderByName("x-csrf-token"));
	
			if(!userSessionID)
				throw ErrorLib.getErrors().Unauthorized(getHeaderByName("x-csrf-token"));		
			
		}		
		/**************************************************/
		
		var reqBody = $.request.body ? JSON.parse($.request.body.asString()) : undefined;
		
		
		    switch ($.request.method) {
		        case $.net.http.GET:{
		        	//Check Read Permission
		        	if(!WithOutPermission){
			        	permissions.isAuthorized(
		        			userSessionID,
		        			config.getPermissionIdByName(config.ReadPermission()),
		        			ResourceID
	        			);	
		        	}
		        	getMethod(getUrlParameters(),userSessionID);
		            break;
		        }		        	
		        case $.net.http.PUT:{
		        	if(!WithOutPermission){
		        	permissions.isAuthorized(userSessionID,
       		    	config.getPermissionIdByName(config.CreatePermission()),
         			ResourceID);
		        	}
		        	putMethod(reqBody,userSessionID);
		            break;
		        }		        	
	            case $.net.http.POST:{
	            	if(!WithOutPermission){
		        	permissions.isAuthorized(userSessionID,
        			config.getPermissionIdByName(config.CreatePermission()),
        			ResourceID);
	            	}
	            	postMethod(reqBody,userSessionID);
		            break;
	            }	            	
		        case $.net.http.DEL:{
		        	if(!WithOutPermission){
		        	permissions.isAuthorized(userSessionID,
        			config.getPermissionIdByName(config.DeletePermission()),
        			ResourceID);
		        	}
		        	deleteMethod(reqBody,userSessionID);
		            break;
		        }		        	
		        default:
		        	notImplementedMethod();
			    	break;
		    }	    

	} catch (e) {
		handleErrorResponse(e);
	}
}

//Function intended to be the main one.
function processRequest3(getMethod, postMethod, putMethod, deleteMethod, Notvalidate, serviceName, WithOutPermission) {
	try {
		
		/**********here  - Validate User() -----***/
		var userSessionID = null;
		
		if(!Notvalidate){
			userSessionID = validateUser(getHeaderByName("x-csrf-token"));
	
			if(!userSessionID)
				throw ErrorLib.getErrors().Unauthorized(getHeaderByName("x-csrf-token"));		
			
		}		
		/**************************************************/
		
		var reqBody = $.request.body ? JSON.parse($.request.body.asString()) : undefined;
		
		
		    switch ($.request.method) {
		        case $.net.http.GET:{
		        	//Check Read Permission
		        	if(!WithOutPermission){
			        	permissions.isAuthorized2(
		        			userSessionID,
		        			config.getPermissionIdByName(config.ReadPermission()),
		        			serviceName
	        			);	
		        	}
		        	getMethod(getUrlParameters(),userSessionID);
		            break;
		        }		        	
		        case $.net.http.PUT:{
		        	if(!WithOutPermission){
		        	permissions.isAuthorized2(userSessionID,
       		    	config.getPermissionIdByName(config.CreatePermission()),
       		    	serviceName);
		        	}
		        	putMethod(reqBody,userSessionID);
		            break;
		        }		        	
	            case $.net.http.POST:{
	            	if(!WithOutPermission){
		        	permissions.isAuthorized2(userSessionID,
        			config.getPermissionIdByName(config.CreatePermission()),
        			serviceName);
	            	}
	            	postMethod(reqBody,userSessionID);
		            break;
	            }	            	
		        case $.net.http.DEL:{
		        	if(!WithOutPermission){
		        	permissions.isAuthorized2(userSessionID,
        			config.getPermissionIdByName(config.DeletePermission()),
        			serviceName);
		        	}
		        	deleteMethod(reqBody,userSessionID);
		            break;
		        }		        	
		        default:
		        	notImplementedMethod();
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