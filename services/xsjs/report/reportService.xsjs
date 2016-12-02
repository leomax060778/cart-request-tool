$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var report = mapper.getReport();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_REPORT = "GET_REPORT";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete);
}

function handleGet(parameters) {
    var res = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_REPORT) {
            res = report.getReport();
        } else {
        	throw ErrorLib.getErrors().BadRequest(
        		"",
        		"reportService/handleGet",
        		"invalid parameter name " + parameters[0].name + " (should be: GET_REPORT)"
            );
        }
    } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "reportService/handleGet",
                "invalid parameter name (should be: GET_REPORT)"
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