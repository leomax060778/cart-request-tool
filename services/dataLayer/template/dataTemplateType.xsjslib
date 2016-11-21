$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

// STORE PROCEDURE LIST NAME
var INS_TEMPLATE = "INS_TEMPLATE_TYPE";
var GET_TEMPLATE_TYPE_BY_ID = "GET_TEMPLATE_TYPE_BY_ID";
var GET_ALL_TEMPLATE_TYPE = "GET_ALL_TEMPLATE_TYPE";
var UPD_TEMPLATE_TYPE = "UPD_TEMPLATE_TYPE";
var DEL_TEMPLATE_TYPE = "DEL_TEMPLATE_TYPE";

// Insert template
function insertTemplateType(objTemplateType, userId) {
	var parameters = getParams(objTemplateType);
	parameters.in_created_user_id = userId;

	parameters.out_result = '?';
	return db.executeScalar(INS_TEMPLATE, parameters, 'out_result');
}

// Get all template
function getAllTemplateType() {
	var parameters = {};
	var result = db.executeProcedure(GET_ALL_TEMPLATE_TYPE, parameters);
	return db.extractArray(result.out_result);
}

// Get template by ID
function getTemplateTypeById(templateTypeId) {
	var parameters = {};
	parameters.in_template_type_id = templateTypeId;
	parameters.out_result = '?';
	var result = db.executeProcedure(GET_TEMPLATE_TYPE_BY_ID, parameters);
	return db.extractArray(result.out_result);
}

// Update template
function updateTemplateType(objTemplateType, userId) {
	var parameters = getParams(objTemplateType);
	parameters.in_template_type_id = objTemplateType.TEMPLATE_TYPE_ID;
	parameters.in_modified_user_id = userId;
	parameters.out_result = '?';
	return db.executeScalar(UPD_TEMPLATE_TYPE, parameters, 'out_result');
}

// Delete template
function deleteTemplateType(objTemplateType, userId) {
	var parameters = {};
	parameters.in_template_type_id = objTemplateType.TEMPLATE_TYPE_ID;
	parameters.in_modified_user_id = userId;// objTemplateType.IN_MODIFIED_USER_ID;
	parameters.out_result = '?';
	return db.executeScalar(DEL_TEMPLATE_TYPE, parameters, 'out_result');
}

function getParams(objTemplateType) {
	var params = {};
	params.in_name = objTemplateType.NAME;
	return params;
}

// MANUAL PROCEDURES
function getManualTemplateTypeById(templateTypeId) {
	var parameters = {};
	parameters.in_template_type_id = templateTypeId;
	var result = db.executeProcedureManual(GET_TEMPLATE_TYPE_BY_ID, parameters);
	return db.extractArray(result.out_result);
}
