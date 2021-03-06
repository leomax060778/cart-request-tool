$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var report = mapper.getReport();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_REPORT = "GET_REPORT";
var GET_REPORT_TYPE = "GET_REPORT_TYPE";

var service_name = "reportService";

function processRequest() {
    httpUtil.processRequest3(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

function handleGet(parameters, userId) {
    var res = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_REPORT) {
            res = report.getReport(userId);
        } else if (parameters[0].name === GET_REPORT_TYPE) {
            res = report.getReportType(userId);
        } else {
        	throw ErrorLib.getErrors().BadRequest(
        		"",
        		"reportService/handleGet",
        		"invalid parameter name " + parameters[0].name + " (can be: GET_REPORT or GET_REPORT_TYPE)"
            );
        }
    } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "reportService/handleGet",
                "invalid parameter name (can be: GET_REPORT or GET_REPORT_TYPE)"
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