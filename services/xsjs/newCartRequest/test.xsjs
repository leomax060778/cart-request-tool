/** ********************** libs ************************* */
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var http = mapper.getHttp();
/** **************************************************** */

function processRequest() {
	httpUtil.processPublicRequest(handleGet, handlePut, handleDelete, handlePost);
}

// Not Implemented Method
function handleGet() {
	return httpUtil.handleResponse("GET sample service test", httpUtil.OK,
			httpUtil.AppJson);
};
// Not Implemented Method
function handlePut() {
	return httpUtil.notImplementedMethod();
};
// Not Implemented Method
function handleDelete() {
	return httpUtil.notImplementedMethod();
};

// Implementation of POST call
function handlePost(reqBody) {
	return httpUtil.notImplementedMethod();
}

processRequest();