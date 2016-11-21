$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_ALL_INFRASTRUCTURE_OF_WORK = "GET_ALL_INFRASTRUCTURE_OF_WORK";
var GET_INFRASTRUCTURE_BY_ID = "GET_INFRASTRUCTURE_OF_WORK_BY_ID";
var INS_INFRASTRUCTURE = "INS_INFRASTRUCTURE_OF_WORK";
var UPD_INFRASTRUCTURE = "UPD_INFRASTRUCTURE_OF_WORK";
var DEL_INFRASTRUCTURE = "DEL_INFRASTRUCTURE_OF_WORK";

//Get all infrastructure of work
function getAllInfrastructure() {
    var parameters = {};
    var result = db.executeProcedure(GET_ALL_INFRASTRUCTURE_OF_WORK, parameters);
    return db.extractArray(result.out_result);
}

function getInfrastructureById (infrastructure_id){
	
	var param = {};
	param.in_infrastructure_id = infrastructure_id;
	param.out_result = '?';
	
	var result = db.executeProcedure(GET_INFRASTRUCTURE_BY_ID, param);
	return db.extractArray(result.out_result);
}

function getManualInfrastructureById(infrastructure_id){
	
	var param = {};
	param.in_infrastructure_id = infrastructure_id;
	param.out_result = '?';
	
	var result = db.executeProcedureManual(GET_INFRASTRUCTURE_BY_ID, param);
	return db.extractArray(result.out_result);
}

function insertInfrastructure(objInfrastructure, user_id){
	var param = {};
	param.in_infrastructure_name = objInfrastructure.INFRASTRUCTURE_NAME;
	param.in_created_user_id = user_id;
	param.out_result = '?';
	
	return db.executeScalar(INS_INFRASTRUCTURE, param, 'out_result');
}

function updateInfrastructure(objInfrastructure, user_id){
	var param = {};
	param.in_infrastructure_id = objInfrastructure.INFRASTRUCTURE_ID;
	param.in_infrastructure_name = objInfrastructure.INFRASTRUCTURE_NAME;
	param.in_modified_user_id = user_id;
	param.out_result = '?';
	
	return db.executeScalarManual(UPD_INFRASTRUCTURE, param, 'out_result');
	 
}

function deleteInfrastructure(infrastructure_id, user_id){
	var param = {};
	param.in_infrastructure_of_work_id = infrastructure_id;
	param.in_modified_user_id = user_id;
	param.out_result = '?';
	
	return db.executeScalarManual(DEL_INFRASTRUCTURE, param, 'out_result');
}