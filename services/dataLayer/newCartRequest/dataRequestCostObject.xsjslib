$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */


//STORE PROCEDURE LIST NAME
var INS_REQUEST_COST_OBJECT = "INS_REQUEST_COST_OBJECT";
var UPD_REQUEST_COST_OBJECT = "UPD_REQUEST_COST_OBJECT";

function insertCostObject(reqBody, user_id){
	var parameters = {};
	
	parameters.in_request_id = reqBody.REQUEST_ID;
	parameters.in_entity_id = reqBody.ENTITY_ID; 
	parameters.in_cost_object_type_id = reqBody.COST_OBJECT_TYPE_ID; 
	parameters.in_cost_value = reqBody.COST_VALUE;
	parameters.in_user_id = user_id;
	parameters.out_result = '?';
	
	return db.executeScalarManual(INS_REQUEST_COST_OBJECT, parameters, 'out_result');
}

function updateManualCostObject(reqBody, user_id){
	var parameters = {};
	
	parameters.in_request_cost_object_id = reqBody.REQUEST_COST_OBJECT_ID;
	parameters.in_request_id = reqBody.REQUEST_ID;
	parameters.in_entity_id = reqBody.ENTITY_ID; 
	parameters.in_cost_object_type_id = reqBody.COST_OBJECT_TYPE_ID; 
	parameters.in_cost_value = reqBody.COST_VALUE;
	parameters.in_modified_user_id = user_id;
	parameters.out_result = '?';
	
	return db.executeScalarManual(UPD_REQUEST_COST_OBJECT, parameters, 'out_result');
}