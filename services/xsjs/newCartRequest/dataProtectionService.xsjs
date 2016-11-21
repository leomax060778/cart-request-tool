/****** libs ************/
 $.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var http = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var dataProtection = mapper.getDataProtection();


/******************************************/
function processRequest(){
	http.processRequest(handleGet,handlePost,handlePut,handleDelete);
}

function handleGet(reqObj, user_id) {
	var req;
	if(!reqObj.request_id){
		req = dataProtection.getDataProtection();
		return http.handleResponse(req,http.OK,http.AppJson);
	}
	else{
		req = dataProtection.getDataProtectionAnswer(reqObj.request_id);
		return http.handleResponse(req,http.OK,http.AppJson);
	}
}

function handlePost(reqBody, user_id) {
	var req = dataProtection.insertDataProtection(reqBody, user_id);
	return http.handleResponse(req,http.OK,http.AppJson);
}

function handlePut(reqBody, user_id) {
	return http.notImplementedMethod();
}
function handleDelete(reqBody, user_id) {
	return http.notImplementedMethod();
}

processRequest();
