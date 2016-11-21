$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */


//STORE PROCEDURE LIST NAME
var GET_REQUEST_RISK_FUNDED_BY_REQUEST_ID = "GET_REQUEST_RISK_FUNDED_BY_REQUEST_ID";
var GET_ALL_REQUEST_RISK_FUNDED = "GET_ALL_REQUEST_RISK_FUNDED";
var DEL_REQUEST_RISK_FUNDED_BY_REQUEST_ID = "DEL_REQUEST_RISK_FUNDED_BY_REQUEST_ID";

function getRiskFundedByRequestId(in_request_id){
	
	var parameters = {};
	
	parameters.in_request_id = in_request_id; 
	parameters.out_result = '?';
	
	var result = db.executeProcedureManual(GET_REQUEST_RISK_FUNDED_BY_REQUEST_ID, parameters);
	return db.extractArray(result.out_result);
}

function getAllRiskFunded(){
	
	var parameters = {};
	parameters.out_result = '?';
	
	var result = db.executeProcedure(GET_ALL_REQUEST_RISK_FUNDED, parameters);
	return db.extractArray(result.out_result);
}

function deleteRiskFundedByRequestId(request_id, user_id){
	var parameters = {};
	
	parameters.in_request_id = request_id;
	parameters.in_modified_user_id = user_id;
	parameters.out_result = '?';
	
	return db.executeScalar(DEL_REQUEST_RISK_FUNDED_BY_REQUEST_ID, parameters, 'out_result');
}