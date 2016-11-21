

/****** libs ************/
$.import("xscartrequesttool.commonLib","mapper");
var mapper = $.xscartrequesttool.commonLib.mapper;
var httpUtil = mapper.getHttp();
var businessMail = mapper.getMail();
/******************************************/


function processRequest(){
	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete);
}

function handleGet(){
	return httpUtil.notImplementedMethod();
};
function handlePut(){
	return httpUtil.notImplementedMethod();
};
function handleDelete(){
	return httpUtil.notImplementedMethod();
};


//Implementation of POST call
function handlePost(reqBody) {
	var rdo = "";	
	rdo = businessMail.sendMail(reqBody);		
	httpUtil.handleResponsePlain(rdo);
}


processRequest();