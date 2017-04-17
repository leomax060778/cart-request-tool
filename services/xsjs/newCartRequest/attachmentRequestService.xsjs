$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var request = mapper.getNewCartRequest();

var service_name = "attachmentRequestService";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
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
    var req = request.insertAttachmentRequestAuto(reqBody, reqBody.REQUEST_ID, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

processRequest();