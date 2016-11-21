/** **** libs *********** */
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var http = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var option = mapper.getDataProtection();

var GET_OPTION_BY_ID = "GET_OPTION_BY_ID";
var GET_OPTION_BY_QUESTION_ID = "GET_OPTION_BY_QUESTION_ID";
var GET_ALL_OPTION = "GET_ALL_OPTION";

/** *************************************** */
function processRequest() {
	http.processRequest(handleGet, handlePost, handlePut, handleDelete);
}

function handleGet(reqObj, user_id) {
	var req = {};
	if(reqObj.length > 0){
		if (reqObj[0].name === GET_OPTION_BY_ID) {
			req = option.getOptionById(reqObj[0].value, user_id);
		} else if(reqObj[0].name === GET_OPTION_BY_QUESTION_ID){
			req = option.getOptionByQuestionId(reqObj[0].value);
		} if(reqObj[0].name === GET_ALL_OPTION){
			req = option.getAllOption();
		}
	}
	return http.handleResponse(req, http.OK, http.AppJson);
}

function handlePost(reqBody, user_id) {
	var req = option.insertOption(reqBody, user_id);
	return http.handleResponse(req, http.OK, http.AppJson);
}

function handlePut(reqBody, user_id) {
	var req = option.updateOption(reqBody, user_id);
	return http.handleResponse(req, http.OK, http.AppJson);
}
function handleDelete(reqBody, user_id) {
	var req = option.deleteOption(reqBody, user_id);
	return http.handleResponse(req, http.OK, http.AppJson);
}

processRequest();