/****** libs ************/
 $.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var http = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var question = mapper.getDataProtection();

var GET_QUESTION_BY_ID = "GET_QUESTION_BY_ID";
var GET_ALL_QUESTION = "GET_ALL_QUESTION";
var GET_ALL_QUESTION_BY_CRT_TYPE_ID = "GET_ALL_QUESTION_BY_CRT_TYPE_ID";

/******************************************/
function processRequest(){
	http.processRequest(handleGet,handlePost,handlePut,handleDelete);
}

function handleGet(reqObj, user_id) {
	var req = {};
	if(reqObj.length > 0){
		if (reqObj[0].name === GET_QUESTION_BY_ID) {
			req = question.getQuestionById(reqObj[0].value, user_id);
		} else if(reqObj[0].name === GET_ALL_QUESTION){
			req = question.getAllQuestion();
		}	else if(reqObj[0].name === GET_ALL_QUESTION_BY_CRT_TYPE_ID){
			req = question.getAllQuestionByCrtTypeId(reqObj[0].value, user_id);
		}
	}
	return http.handleResponse(req, http.OK, http.AppJson);

}

function handlePost(reqBody, user_id) {
	var req = question.insertQuestion(reqBody, user_id);
	return http.handleResponse(req,http.OK,http.AppJson);
}

function handlePut(reqBody, user_id) {
	var req = question.updateQuestion(reqBody, user_id);
	return http.handleResponse(req,http.OK,http.AppJson);
}
function handleDelete(reqBody, user_id) {
	var req = question.deleteQuestion(reqBody, user_id);
	return http.handleResponse(req,http.OK,http.AppJson);
}

processRequest();