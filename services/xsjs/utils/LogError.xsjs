
/****** libs ************/
$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var businessError = mapper.getLogError();
var ErrorLib = mapper.getErrors();
/******************************************/




function processRequest(){
	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete);
}

//Not Implemented Method
function handleGet(){
	return httpUtil.notImplementedMethod();
};
//Not Implemented Method
function handlePut(){
	return httpUtil.notImplementedMethod();
};
//Not Implemented Method
function handleDelete(){
	return httpUtil.notImplementedMethod();
};


//Implementation of POST call
function handlePost(reqBody) {
	if(businessError.log(reqBody,1,1)){
			httpUtil.handleResponsePlain("Error Logged");
		}	
		else{
			httpUtil.handleResponsePlain("Error not Logged");
		}
}


processRequest();