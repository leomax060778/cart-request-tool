$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var businessApplication = mapper.getApplication();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_APPLICATION_INFO = "GET_APPLICATION_INFO";

/** *********************************************** */

var service_name = "applicationService";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

function handleGet(parameters, userId) {
    var res = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_APPLICATION_INFO) {
            res = businessApplication.getApplicationInfo();
        } else {
        	throw ErrorLib.getErrors().BadRequest(
        		"",
        		"applicationService/handleGet",
        		"invalid parameter name " + parameters[0].name + " (can be: GET_APPLICATION_INFO)"
            );
        }
    } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "applicationService/handleGet",
                "invalid parameter name (can be: GET_APPLICATION_INFO)"
                );
        }
    return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

//Not Implemented Method
function handlePut() {
	return httpUtil.notImplementedMethod();
}

//Not Implemented Method
function handleDelete() {
    return httpUtil.notImplementedMethod();
}

//Not Implemented Method
function handlePost() {
    return httpUtil.notImplementedMethod();
}

processRequest();