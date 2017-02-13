$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */


//STORE PROCEDURE LIST NAME
var GET_MATERIAL_BY_ID = "GET_MATERIAL_BY_ID";
var GET_MATERIAL_BY_CODE = "GET_MATERIAL_BY_CODE";
var GET_MATERIAL_BY_NAME = "GET_MATERIAL_BY_NAME";
var GET_MATERIAL_BY_CATALOG_ID = "GET_MATERIAL_BY_CATALOG_ID";
var GET_ALL_MATERIAL = "GET_ALL_MATERIAL";

var INS_MATERIAL = "INS_MATERIAL";
var UPD_MATERIAL = "UPD_MATERIAL";
var DEL_MATERIAL = "DEL_MATERIAL";

function getMaterialById(in_material_id){
	
	var parameters = {};
	
	parameters.in_material_id = in_material_id; 
	parameters.out_result = '?';
	
	var result = db.executeProcedure(GET_MATERIAL_BY_ID, parameters);
	return db.extractArray(result.out_result);
}

function getMaterialByCode(in_material_code){
	
	var parameters = {};
	
	parameters.in_material_code = in_material_code; 
	parameters.out_result = '?';
	
	var result = db.executeProcedure(GET_MATERIAL_BY_CODE, parameters);
	return db.extractArray(result.out_result);
}

function getMaterialByName(materialName){
	
	var parameters = {};
	
	parameters.in_material_name = materialName; 
	parameters.out_result = '?';
	
	var result = db.executeProcedure(GET_MATERIAL_BY_NAME, parameters);
	return db.extractArray(result.out_result);
}

function getManualMaterialByCatalogId(in_catalog_id){
	
	var parameters = {};
	
	parameters.in_catalog_id = in_catalog_id; 
	parameters.out_result = '?';
	
	var result = db.executeProcedureManual(GET_MATERIAL_BY_CATALOG_ID, parameters);
	return db.extractArray(result.out_result);
}

function getMaterialByCatalogId(in_catalog_id){
	
	var parameters = {};
	
	parameters.in_catalog_id = in_catalog_id; 
	parameters.out_result = '?';
	
	var result = db.executeProcedure(GET_MATERIAL_BY_CATALOG_ID, parameters);
	return db.extractArray(result.out_result);
}

function getManualMaterialById(in_material_id){
	var parameters = {};
	
	parameters.in_material_id = in_material_id; 
	parameters.out_result = '?';
	
	var result = db.executeProcedureManual(GET_MATERIAL_BY_ID, parameters);
	return db.extractArray(result.out_result);
}


function getAllMaterial(){
	
	var parameters = {};
	parameters.out_result = '?';
	
	var result = db.executeProcedure(GET_ALL_MATERIAL, parameters);
	return db.extractArray(result.out_result);
}

function insertMaterial(objMaterial, user_id){
	var parameters = {};
	
	parameters.in_catalog_id = objMaterial.CATALOG_ID;
	parameters.in_description = objMaterial.DESCRIPTION; 
	parameters.in_popup = objMaterial.POP_UP; 
	parameters.in_code = objMaterial.CODE;
	parameters.in_created_user_id = user_id;
	parameters.out_result = '?';
	
	return db.executeScalar(INS_MATERIAL, parameters, 'out_result');
}

function updateMaterial(objMaterial, user_id){
	var parameters = {};
	
	parameters.in_material_id = objMaterial.MATERIAL_ID;
	parameters.in_catalog_id = objMaterial.CATALOG_ID;
	parameters.in_description = objMaterial.DESCRIPTION; 
	parameters.in_popup = objMaterial.POP_UP; 
	parameters.in_code = objMaterial.CODE;
	parameters.in_modified_user_id = user_id;
	parameters.out_result = '?';
	
	return db.executeScalarManual(UPD_MATERIAL, parameters, 'out_result');
}


function deleteMaterial(in_material_id, user_id){
	var parameters = {};
	parameters.in_material_id = in_material_id;
	parameters.in_modified_user_id = user_id;
	parameters.out_result = '?';
	
	return db.executeScalarManual(DEL_MATERIAL, parameters, 'out_result');
}
