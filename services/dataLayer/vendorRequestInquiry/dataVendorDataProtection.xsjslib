$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var INS_VENDOR_DATA_PROTECTION_ANSWER = "INS_VENDOR_DATA_PROTECTION_ANSWER";
var GET_DATA_PROTECTION_ANSWER = "GET_VENDOR_DATA_PROTECTION_ANSWER_BY_VENDOR_REQUEST_ID";
var GET_ALL_VENDOR_DATA_PROTECTION = "GET_ALL_VENDOR_DATA_PROTECTION";
var UPD_VENDOR_DATA_PROTECTION_ANSWER = "UPD_VENDOR_DATA_PROTECTION_ANSWER";
//------------------------------------------------------------

//Insert new answer to vendor data protection
function insertAnswerManual(objDataProtection, userId){
	var parameters = {};	
	parameters.in_vendor_request_id = objDataProtection.VENDOR_REQUEST_ID;
	parameters.in_question_id = objDataProtection.QUESTION_ID;
	parameters.in_option_id = objDataProtection.OPTION_ID; 
	parameters.in_created_user_id = userId;
	parameters.out_result = '?';
	return db.executeScalarManual(INS_VENDOR_DATA_PROTECTION_ANSWER, parameters, 'out_result');
}

//Insert new answer to vendor data protection
function insertAnswer(objDataProtection, userId){
	var parameters = {};	
	parameters.in_vendor_request_id = objDataProtection.VENDOR_REQUEST_ID;
	parameters.in_question_id = objDataProtection.QUESTION_ID;
	parameters.in_option_id = objDataProtection.OPTION_ID; 
	parameters.in_created_user_id = userId;
	parameters.out_result = '?';
	return db.executeScalar(INS_VENDOR_DATA_PROTECTION_ANSWER, parameters, 'out_result');
}

//Get answer to data protection by vendor request id
function getDataProtectionById(vendorRequestId){
	var parameters = {};
	parameters.in_vendor_request_id = vendorRequestId;
	parameters.out_result = '?';
	var answer = db.executeProcedure(GET_DATA_PROTECTION_ANSWER, parameters);
	return db.extractArray(answer.out_result);
}

//Get all questions and their options
function getAllDataProtection(){
	var question = db.executeProcedure(GET_ALL_VENDOR_DATA_PROTECTION, {});
	return db.extractArray(question.out_result);
}

//Update answer of vendor data protection
function updateDataProtectionManual(objDataProtection, userId) {
	var parameters = {};
	parameters.in_vendor_request_id = objDataProtection.VENDOR_REQUEST_ID;
	parameters.in_question_id = objDataProtection.QUESTION_ID;
	parameters.in_option_id = objDataProtection.OPTION_ID; 
	parameters.in_modified_user_id = userId;
	parameters.out_result = '?';
	return db.executeScalarManual(UPD_VENDOR_DATA_PROTECTION_ANSWER, parameters, 'out_result');
}