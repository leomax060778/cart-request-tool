$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_ENTITY_BY_VENDOR = 'GET_ALL_ENTITY_BY_VENDOR_ID';
var GET_ALL_VENDOR_BY_ENTITY = 'GET_ALL_VENDOR_BY_ENTITY_ID';
var INS_VENDOR_ENTITY = 'INS_VENDOR_ENTITY';
var DEL_VENDOR_ENTITY_BY_VENDOR_ID = 'DEL_VENDOR_ENTITY_BY_VENDOR_ID';
var DEL_VENDOR_ENTITY_BY_VENDOR_ID_ENTITY_ID = "DEL_VENDOR_ENTITY_BY_VENDOR_ID_ENTITY_ID"; 

 
function getAllEntityByVendorId(vendor_id) {
	var param = {};
	param.in_vendor_id = vendor_id;
	param.out_result = '?';
	var result = db.executeProcedure(GET_ALL_ENTITY_BY_VENDOR, param);
	return db.extractArray(result.out_result);
}

function getAllVendorByEntityId(entity_id) {
	var param = {};
	param.in_entity_id = entity_id;
	param.out_result = '?';
	var result = db.executeProcedure(GET_ALL_VENDOR_BY_ENTITY, param);
	return db.extractArray(result.out_result);
}

function insertVendorEntity(vendor_id, entity_id, user_id) {
	var param = {};
	param.in_vendor_id = vendor_id;
	param.in_entity_id = entity_id;
	param.in_created_user_id = user_id;
	param.out_result = '?';

	return db.executeScalar(INS_VENDOR_ENTITY, param, 'out_result');
}

function deleteVendorEntityByVendorId(vendor_id, user_id) {
	var param = {};
	param.in_vendor_id = vendor_id;
	param.in_modified_user_id = user_id;
	param.out_result = '?';

	return db.executeScalar(DEL_VENDOR_ENTITY_BY_VENDOR_ID, param, 'out_result');
}

function deleteVendorEntityByVendorIdEntityId(vendor_id, entityId, user_id) {
	var param = {};
	param.in_vendor_id = vendor_id;
	param.in_entity_id = entityId;
	param.in_modified_user_id = user_id;
	param.out_result = '?';

	return db.executeScalar(DEL_VENDOR_ENTITY_BY_VENDOR_ID_ENTITY_ID, param, 'out_result');
}


function getManualAllEntityByVendorId(vendor_id) {
	var param = {};
	param.in_vendor_id = vendor_id;
	param.out_result = '?';
	var result = db.executeProcedureManual(GET_ALL_ENTITY_BY_VENDOR, param);
	
	return db.extractArray(result.out_result);
}

function getManualAllVendorByEntityId(entity_id) {
	var param = {};
	param.in_entity_id = entity_id;
	param.out_result = '?';
	var result = db.executeProcedureManual(GET_ALL_VENDOR_BY_ENTITY, param);
	return db.extractArray(result.out_result);
}

function insertManualVendorEntity(vendor_id, entity_id, user_id) {
	var param = {};
	param.in_vendor_id = vendor_id;
	param.in_entity_id = entity_id;
	param.in_created_user_id = user_id;
	param.out_result = '?';

	return db.executeScalarManual(INS_VENDOR_ENTITY, param, 'out_result');
}

function deleteManualVendorEntityByVendorId(vendor_id, user_id) {
	var param = {};
	param.in_vendor_id = vendor_id;
	param.in_modified_user_id = user_id;
	param.out_result = '?';

	return db.executeScalarManual(DEL_VENDOR_ENTITY_BY_VENDOR_ID, param, 'out_result');
}

function deleteManualVendorEntityByVendorIdEntityId(vendor_id, entityId, user_id) {
	var param = {};
	param.in_vendor_id = vendor_id;
	param.in_entity_id = entityId;
	param.in_modified_user_id = user_id;
	param.out_result = '?';

	return db.executeScalarManual(DEL_VENDOR_ENTITY_BY_VENDOR_ID_ENTITY_ID, param, 'out_result');
}