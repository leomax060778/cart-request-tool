$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_ENTITY = 'GET_ALL_ENTITY';
var GET_ENTITY_BY_ID = 'GET_ENTITY_BY_ID';
var INS_ENTITY = 'INS_ENTITY';
var UPD_ENTITY = 'UPD_ENTITY';
var DEL_ENTITY = 'DEL_ENTITY';

function getAllEntity(){
	var param = {};
	param.out_result = '?';
	var result = db.executeProcedure(GET_ALL_ENTITY, param);
	return db.extractArray(result.out_result);
}

function getEntityById(entity_id){
	
	var param = {};
	param.in_entity_id = entity_id;
	param.out_result = '?';
	
	var result = db.executeProcedureManual(GET_ENTITY_BY_ID, param);
	return db.extractArray(result.out_result);
}

function insertEntity(objEntity, user_id){
	var param = {};
	param.in_entity_name = objEntity.ENTITY_NAME;
	param.in_sales_org = objEntity.SALES_ORG;
	param.in_cost_center = objEntity.COST_CENTER;
	param.in_entity_position = objEntity.ENTITY_POSITION;
	param.in_non_sap_help_message = objEntity.NON_SAP_HELP_MESSAGE;
	param.in_created_user_id = user_id;
	param.out_result = '?';
	
	return db.executeScalar(INS_ENTITY, param, 'out_result');
}

function updateEntity(objEntity, user_id){
	var param = {};
	param.in_entity_id = objEntity.ENTITY_ID;
	param.in_entity_name = objEntity.ENTITY_NAME;
	param.in_sales_org = objEntity.SALES_ORG;
	param.in_cost_center = objEntity.COST_CENTER;
	param.in_entity_position = objEntity.ENTITY_POSITION;
	param.in_non_sap_help_message = objEntity.NON_SAP_HELP_MESSAGE;
	param.in_modified_user_id = user_id;
	param.out_result = '?';
	
	var result = db.executeProcedure(UPD_ENTITY, param);
	return db.extractArray(result.out_result);
}

function deleteEntity(entity_id, user_id){
	var param = {};
	param.in_entity_id = entity_id;
	param.in_modified_user_id = user_id;
	param.out_result = '?';
	
	var result = db.executeProcedure(DEL_ENTITY, param);
	return db.extractArray(result.out_result);
}