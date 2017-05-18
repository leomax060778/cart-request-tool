$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_OPTIONS_BY_QUESTION = "GET_ALL_DATA_PROTECTION_OPTION_BY_QUESTION";
var GET_ALL_DATA_PROTECTION_OPTION = "GET_ALL_DATA_PROTECTION_OPTION";
var GET_ALL_DATA_PROTECTION_QUESTION = "GET_ALL_DATA_PROTECTION_QUESTION";
var GET_ALL_DATA_PROTECTION_QUESTION_BY_CRT_TYPE_ID = "GET_ALL_DATA_PROTECTION_QUESTION_BY_CRT_TYPE_ID";
var GET_DATA_PROTECTION_OPTION_BY_ID = "GET_DATA_PROTECTION_OPTION_BY_ID";
var GET_DATA_PROTECTION_QUESTION_BY_ID = "GET_DATA_PROTECTION_QUESTION_BY_ID";
var INS_DATA_PROTECTION_QUESTION = "INS_DATA_PROTECTION_QUESTION";
var UPD_DATA_PROTECTION_QUESTION = "UPD_DATA_PROTECTION_QUESTION";
var DEL_DATA_PROTECTION_QUESTION = "DEL_DATA_PROTECTION_QUESTION";
var INS_DATA_PROTECTION_OPTION = "INS_DATA_PROTECTION_OPTION";
var UPD_DATA_PROTECTION_OPTION = "UPD_DATA_PROTECTION_OPTION";
var DEL_DATA_PROTECTION_OPTION = "DEL_DATA_PROTECTION_OPTION";
var INS_DATA_PROTECTION_QUESTION_OPTION = "INS_DATA_PROTECTION_QUESTION_OPTION";
var DEL_DATA_PROTECTION_QUESTION_OPTION_BY_OPTION = "DEL_DATA_PROTECTION_QUESTION_OPTION_BY_OPTION";
var DEL_DATA_PROTECTION_QUESTION_OPTION_BY_QUESTION = "DEL_DATA_PROTECTION_QUESTION_OPTION_BY_QUESTION";
var GET_ALL_ATTACHMENT_DATA_PROTECTION = "GET_ALL_ATTACHMENT_DATA_PROTECTION";
var GET_ATTACHMENT_DATA_PROTECTION_BY_ID = "GET_ATTACHMENT_DATA_PROTECTION_BY_ID";
var INS_ATTACHMENT_DATA_PROTECTION = "INS_ATTACHMENT_DATA_PROTECTION";
var UPD_ATTACHMENT_DATA_PROTECTION = "UPD_ATTACHMENT_DATA_PROTECTION";
var DEL_ATTACHMENT_DATA_PROTECTION = "DEL_ATTACHMENT_DATA_PROTECTION";

/*-------------- OPTION --------------*/

function getAllOption(){
	var param = {};
	param.out_result = '?';
	var options = db.executeProcedureManual(GET_ALL_DATA_PROTECTION_OPTION, param);
	return db.extractArray(options.out_result);
	
}

function getManualOptionById(optionId){
	var param = {};
	param.in_option_id = optionId;
	param.out_result = '?';
	var options = db.executeProcedureManual(GET_DATA_PROTECTION_OPTION_BY_ID, param);
	return db.extractArray(options.out_result);
}

function getOptionById(optionId){
	var param = {};
	param.in_option_id = optionId;
	param.out_result = '?';
	var options = db.executeProcedure(GET_DATA_PROTECTION_OPTION_BY_ID, param);
	return db.extractArray(options.out_result);
}

function insertOption(objOption, user_id){
	var param = {};
	param.in_content = objOption.CONTENT;
	param.in_created_user_id = user_id;
	param.out_result = '?';
	
	return db.executeScalar(INS_DATA_PROTECTION_OPTION, param, 'out_result');
}

function updateOption(objOption, user_id){
	var param = {};
	param.in_option_id = objOption.OPTION_ID;
	param.in_content = objOption.CONTENT;
	param.in_modified_user_id = user_id;
	param.out_result = '?';
	
	return db.executeScalar(UPD_DATA_PROTECTION_OPTION, param, 'out_result');
}

function deleteOption(option_id, user_id){
	var param = {};
	param.in_option_id = option_id;
	param.in_modified_user_id = user_id;
	param.out_result = '?';
	
	var result = db.executeProcedure(DEL_DATA_PROTECTION_OPTION, param);
	return db.extractArray(result.out_result);
}

function getAllOptionsByQuestionId(question_id){
	var param = {};
	param.in_question_id = question_id;
	var options = db.executeProcedureManual(GET_ALL_OPTIONS_BY_QUESTION, param);
	return db.extractArray(options.out_result);
}

/*-------------- QUESTION --------------*/

function getAllQuestion(){
	var param = {};
	param.out_result = '?';
	var questions = db.executeProcedureManual(GET_ALL_DATA_PROTECTION_QUESTION, param);
	return db.extractArray(questions.out_result);
}

function getAllQuestionByCrtTypeId(crt_type_id){
	var param = {};
	param.in_crt_type_id = crt_type_id;
	param.out_result = '?';
	var questions = db.executeProcedureManual(GET_ALL_DATA_PROTECTION_QUESTION_BY_CRT_TYPE_ID, param);
	return db.extractArray(questions.out_result);
}

function insertQuestion(objQuestion, user_id){
	var param = {};
	param.in_content = objQuestion.CONTENT;
	param.in_description = objQuestion.DESCRIPTION;
	param.in_short_description = objQuestion.SHORT_DESCRIPTION;
	param.in_crt_type_id = objQuestion.CRT_TYPE_ID;
	param.in_created_user_id = user_id;
	param.out_result = '?';
	
	return db.executeScalar(INS_DATA_PROTECTION_QUESTION, param, 'out_result');
	
}

function insertQuestionManual(objQuestion, user_id){
	var param = {};
	param.in_content = objQuestion.CONTENT;
	param.in_description = objQuestion.DESCRIPTION;
	param.in_short_description = objQuestion.SHORT_DESCRIPTION;
	param.in_crt_type_id = objQuestion.CRT_TYPE_ID;
	param.in_created_user_id = user_id;
	param.out_result = '?';
	
	return db.executeScalarManual(INS_DATA_PROTECTION_QUESTION, param, 'out_result');
	
}

function updateQuestion(objQuestion, user_id){
	var param = {};
	param.in_question_id = objQuestion.QUESTION_ID;
	param.in_content = objQuestion.CONTENT;
	param.in_description = objQuestion.DESCRIPTION;
	param.in_short_description = objQuestion.SHORT_DESCRIPTION;
	param.in_crt_type_id = objQuestion.CRT_TYPE_ID;
	param.in_modified_user_id = user_id;
	param.out_result = '?';
	
	return db.executeScalar(UPD_DATA_PROTECTION_QUESTION, param, 'out_result');
	
}

function updateQuestionManual(objQuestion, user_id){
	var param = {};
	param.in_question_id = objQuestion.QUESTION_ID;
	param.in_content = objQuestion.CONTENT;
	param.in_description = objQuestion.DESCRIPTION;
	param.in_short_description = objQuestion.SHORT_DESCRIPTION;
	param.in_crt_type_id = objQuestion.CRT_TYPE_ID;
	param.in_modified_user_id = user_id;
	param.out_result = '?';
	
	return db.executeScalarManual(UPD_DATA_PROTECTION_QUESTION, param, 'out_result');
	
}

function deleteQuestion(question_id, user_id){
	var param = {};
	param.in_question_id = question_id;
	param.in_modified_user_id = user_id;
	param.out_result = '?';
	
	return db.executeScalar(DEL_DATA_PROTECTION_QUESTION, param, 'out_result');
	
}

function getManualQuestionById(questionId){
	var param = {};
	param.in_question_id = questionId;
	param.out_result = '?';
	var questions = db.executeProcedureManual(GET_DATA_PROTECTION_QUESTION_BY_ID, param);
	return db.extractArray(questions.out_result);
}

function getQuestionById(questionId){
	var param = {};
	param.in_question_id = questionId;
	param.out_result = '?';
	var questions = db.executeProcedure(GET_DATA_PROTECTION_QUESTION_BY_ID, param);
	return db.extractArray(questions.out_result);
}

//QUESTION - OPTION
function insertQuestionOption(questionId, optionId, userId){
	var params = {};
	params.in_question_id = questionId;
	params.in_option_id = optionId;
	params.in_created_user_id = userId;
	
	db.executeProcedureManual(INS_DATA_PROTECTION_QUESTION_OPTION, params);
}

function deleteQuestionOptionByOption(questionId, optionId, userId){
	var params = {};
	params.in_question_id = questionId;
	params.in_option_id = optionId;
	params.in_modified_user_id = userId;
	params.out_result = '?';
	
	return db.executeScalarManual(DEL_DATA_PROTECTION_QUESTION_OPTION_BY_OPTION, params, 'out_result');
}

function deleteQuestionOptionByQuestion(questionId, userId){
	var params = {};
	params.in_question_id = questionId;
	params.in_modified_user_id = userId;
	params.out_result = '?';
	
	return db.executeScalarManual(DEL_DATA_PROTECTION_QUESTION_OPTION_BY_QUESTION, params, 'out_result');
}

//ATTACHMENT DATA PROTECTION
function getAllAttachment(){
	var param = {};
	param.out_result = '?';
	
	var attachments = db.executeProcedure(GET_ALL_ATTACHMENT_DATA_PROTECTION, param);
	return db.extractArray(attachments.out_result);
}

function getAttachmentById(attachementId){
	var param = {};
	param.out_result = '?';
	param.in_attachment_data_protection_id = attachementId;
	var attachments = db.executeProcedure(GET_ATTACHMENT_DATA_PROTECTION_BY_ID, param);
	return db.extractArray(attachments.out_result);
}

function getManualAttachmentById(attachementId){
	var param = {};
	param.out_result = '?';
	param.in_attachment_data_protection_id = attachementId;
	var attachments = db.executeProcedureManual(GET_ATTACHMENT_DATA_PROTECTION_BY_ID, param);
	return db.extractArray(attachments.out_result);
}

function insertAttachment(objReq, userId){
	var params = {};
	params.in_attachment_data_protection_description = objReq.ATTACHMENT_DATA_PROTECTION_DESCRIPTION;
	params.in_attachment_id = objReq.ATTACHMENT_ID;
	params.in_created_user_id = userId;
	params.out_result = '?';
	
	return db.executeScalar(INS_ATTACHMENT_DATA_PROTECTION, params, 'out_result');
}

function updateAttachment(objReq, userId){
	var params = {};
	params.in_attachment_data_protection_id = objReq.ATTACHMENT_DATA_PROTECTION_ID;
	params.in_attachment_data_protection_description = objReq.ATTACHMENT_DATA_PROTECTION_DESCRIPTION;
	params.in_attachment_id = objReq.ATTACHMENT_ID;
	params.in_modified_user_id = userId;
	param.out_result = '?';
	
	return db.executeScalarManual(UPD_ATTACHMENT_DATA_PROTECTION, param, 'out_result');
}

function deleteAttachment(objReq, userId){
	var params = {};
	params.in_attachment_data_protection_id = objReq.ATTACHMENT_DATA_PROTECTION_ID;
	params.in_modified_user_id = userId;
	param.out_result = '?';
	
	return db.executeScalarManual(DEL_ATTACHMENT_DATA_PROTECTION, param, 'out_result');
}
