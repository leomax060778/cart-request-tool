$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var request = mapper.getNewCartRequest();

var service_name = "ncr_requestService";

function processRequest() {
    httpUtil.processRequest3(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

function handleGet(parameters, userId) {
	return httpUtil.notImplementedMethod();
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
