/****** libs ************/
$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var http = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var businessPopUp = mapper.getPopUpLib();
/******************************************/

var GET_POP_UP_BY_CODE = "GET_POP_UP_BY_CODE";
var GET_POP_UP_BY_ID = "GET_POP_UP_BY_ID";
var GET_ALL_POP_UP = "GET_ALL_POP_UP";
var GET_ALL_POP_UP_ADMINISTRATION = "GET_ALL_POP_UP_ADMINISTRATION";

function processRequest(){
	http.processRequest(handleGet,handlePost,handlePut,handleDelete);
}

function handleGet(parameters, user_id){
	var rdo = {};
	if (parameters.length > 0) {
		if (parameters[0].name === GET_POP_UP_BY_CODE) {
			rdo = businessPopUp.getPopUpByCode(parameters[0].value,user_id);
		} else if (parameters[0].name === GET_POP_UP_BY_ID) {
			rdo = businessPopUp.getPopUpById(parameters[0].value, user_id);
		} else if (parameters[0].name === GET_ALL_POP_UP) {
			rdo = businessPopUp.getAllPopUp(user_id);
		} else if (parameters[0].name === GET_ALL_POP_UP_ADMINISTRATION) {
			rdo = businessPopUp.getAllPopUpAdministration(user_id);
		}
	} else {
		throw ErrorLib.getErrors().BadRequest(
				"",
				"popUpService/handleGet",
				"invalid parameter name (can be: GET_POP_UP_BY_CODE or GET_POP_UP_BY_ID or GET_ALL_POP_UP or GET_ALL_POP_UP_ADMINISTRATION)"
						+ parameters[0].name);
	}

	return http.handleResponse(rdo, http.OK, http.AppJson);
};

function handlePut(reqBody, user_id){
	var rdo = "";	
	rdo = businessPopUp.updatePopUp(reqBody, user_id);		
	return http.handleResponse(rdo, http.OK, http.AppJson);
};

function handleDelete(popUpBody, user_id){
	var rdo = businessPopUp.deletePopUp(popUpBody.POP_UP_ID, user_id);
	return http.handleResponse(rdo, http.OK, http.AppJson);
};

//Implementation of POST call
function handlePost() {
	return http.notImplementedMethod();
}


processRequest();