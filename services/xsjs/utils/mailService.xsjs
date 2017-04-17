

/****** libs ************/
$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var businessMail = mapper.getMail();

var service_name = "mailService";

/******************************************/

var SEND_CART_REQUEST_MAIL = "SEND_CART_REQUEST_MAIL";

function processRequest(){
	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete, false, service_name);
}

function handleGet(params, userId){
	var rdo = {};
	if (params.length > 0) {
		if (params[0].name === SEND_CART_REQUEST_MAIL) {
			$.import("xscartrequesttool.services.mails","cartRequestMail");
			var carRequestMail = $.xscartrequesttool.services.mails.cartRequestMail;
			var cartRequest =  {
				REQUEST_ID : 1,
				SERVICES: []
			};
			var mailValues = carRequestMail.parseApproved(cartRequest,'http://localhost:63342/crt/webapp/index.html#',userId);
			var emailObj = businessMail.getJson([{address:'gorellano@folderit.net'}], mailValues.subject, mailValues.body, null, null);
			rdo = emailObj;
			businessMail.sendMail(emailObj,true,null);
		} else {
			throw ErrorLib.getErrors().BadRequest(
					"",
					"topicServices/handleGet",
					"invalid parameter name (can be: GET_ALL_TOPIC or GET_TOPIC_BY_ID)");
		}
	} else {
		throw ErrorLib.getErrors().BadRequest(
				"",
				"topicServices/handleGet",
				"invalid parameter name (can be: GET_ALL_TOPIC or GET_TOPIC_ID)");
	}
	return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
	
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