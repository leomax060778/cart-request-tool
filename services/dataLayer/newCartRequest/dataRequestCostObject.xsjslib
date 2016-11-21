$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */


//STORE PROCEDURE LIST NAME
var INS_REQUEST_COST_OBJECT = "INS_REQUEST_COST_OBJECT";

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