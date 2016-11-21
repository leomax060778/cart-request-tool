$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */


//STORE PROCEDURE LIST NAME
var GET_REQUEST_COST_OBJECT_BY_REQUEST_ID = "GET_REQUEST_COST_OBJECT_BY_REQUEST_ID";
var GET_ALL_REQUEST_COST_OBJECT = "GET_ALL_REQUEST_COST_OBJECT";
var DEL_COST_OBJECT = "DEL_REQUEST_COST_OBJECT";

var GET_ALL_COST_OBJECT_TYPE = "GET_ALL_COST_OBJECT_TYPE";

function getCostObjectByRequestId(in_request_id){
	
	var parameters = {};
	
	parameters.in_request_id = in_request_id; 
	parameters.out_result = '?';
	
	var result = db.executeProcedureManual(GET_REQUEST_COST_OBJECT_BY_REQUEST_ID, parameters);
	return db.extractArray(result.out_result);
}

function getAllCostObject(){
	
	var parameters = {};
	parameters.out_result = '?';
	
	var result = db.executeProcedure(GET_ALL_REQUEST_COST_OBJECT, parameters);
	return db.extractArray(result.out_result);
}

function getAllCostObjectType(){
	var parameters = {};
	parameters.out_result = '?';
	
	var result = db.executeProcedure(GET_ALL_COST_OBJECT_TYPE, parameters);
	return db.extractArray(result.out_result);
}

function deleteCostObject(cost_object_id, user_id){
	var parameters = {};
	parameters.in_request_cost_object_id = cost_object_id;
	parameters.in_modified_user_id = user_id;
	parameters.out_result = '?';
		
	return db.executeScalarManual(DEL_COST_OBJECT, parameters, 'out_result');

}