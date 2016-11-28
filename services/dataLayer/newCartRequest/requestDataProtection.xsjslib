$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME

var GET_DATA_ANSWERS = "GET_REQUEST_DATA_PROTECTION_ANSWER";
var INS_DATA_PROTECTION_ANSWER = "INS_REQUEST_DATA_PROTECTION_ANSWER";
var GET_REQUEST_DATA_PROTECTION_ANSWER_BY_REQUEST_ID = "GET_REQUEST_DATA_PROTECTION_ANSWER_BY_REQUEST_ID";
var UPD_DATA_PROTECTION_ANSWER = "UPD_DATA_PROTECTION_ANSWER";

function getDataProtectionAnswer(question_id, request_id){
	var param = {};
	param.in_question_id = question_id;
	param.in_request_id = request_id;
	param.out_result = '?';
	var answer = db.executeProcedure(GET_DATA_ANSWERS, param);
	return db.extractArray(answer.out_result);
}

function getDataProtectionByRequestId(requestId){
	var param = {};
	param.in_request_id = requestId;
	param.out_result = '?';
	var answer = db.executeProcedure(GET_REQUEST_DATA_PROTECTION_ANSWER_BY_REQUEST_ID, param);
	return db.extractArray(answer.out_result);
}

function insertDataProtectionAnswer(reqDP, user_id){
	var parameters = {};
	
	parameters.in_request_id = reqDP.REQUEST_ID;
	parameters.in_question_id = reqDP.QUESTION_ID;
	parameters.in_option_id = reqDP.OPTION_ID; 
	parameters.in_created_user_id = user_id;
	
	var result = db.executeProcedureManual(INS_DATA_PROTECTION_ANSWER, parameters);
	return db.extractArray(result.out_result);

}

function insertManualDataProtectionAnswer(reqDP, user_id){
	var parameters = {};
	
	parameters.in_request_id = reqDP.REQUEST_ID;
	parameters.in_question_id = reqDP.QUESTION_ID;
	parameters.in_option_id = reqDP.OPTION_ID; 
	parameters.in_modified_user_id = user_id;
	parameters.out_result = '?';
	
	return db.executeScalarManual(UPD_DATA_PROTECTION_ANSWER, parameters, 'out_result');

}