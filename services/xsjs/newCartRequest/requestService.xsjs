$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var request = mapper.getNewCartRequest();

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete);
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
