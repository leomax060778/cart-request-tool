$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */


//STORE PROCEDURE LIST NAME
var INS_REQUEST_RISK_FUNDED = "INS_REQUEST_RISK_FUNDED";
var UPD_REQUEST_RISK_FUNDED = "UPD_REQUEST_RISK_FUNDED";

function insertRiskFunded(reqBody, user_id){
	var parameters = {};
	
	parameters.in_request_id = reqBody.REQUEST_ID;
	parameters.in_amount = reqBody.AMOUNT; 
	parameters.in_currency_id = reqBody.CURRENCY_ID;
	parameters.in_amount_keur = reqBody.AMOUNT_KEUR;
	parameters.in_user_id = user_id;
	parameters.out_result = '?';
	
	return db.executeScalarManual(INS_REQUEST_RISK_FUNDED, parameters, 'out_result');
}

function updateManualRiskFunded(reqBody, user_id){
	var parameters = {};
	
	parameters.in_request_risk_funded_id = reqBody.REQUEST_RISK_FUNDED_ID;
	parameters.in_amount = reqBody.AMOUNT; 
	parameters.in_currency_id = reqBody.CURRENCY_ID;
	parameters.in_amount_keur = reqBody.AMOUNT_KEUR;
	parameters.in_modified_user_id = user_id;
	parameters.out_result = '?';
	
	return db.executeScalarManual(UPD_REQUEST_RISK_FUNDED, parameters, 'out_result');
}