$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var INS_TEMPLATE = "INS_TEMPLATE";
var GET_ALL_TEMPLATE = "GET_ALL_TEMPLATE";
var GET_TEMPLATE_BY_ID = "GET_TEMPLATE_BY_ID";
var GET_TEMPLATE_BY_TYPE_ID = "GET_TEMPLATE_BY_TYPE_ID";
var UPD_TEMPLATE = "UPD_TEMPLATE";
var DEL_TEMPLATE = "DEL_TEMPLATE";

//Insert template
function insertTemplate(objTemplate, userId) {
    var parameters = getTemplateParams(objTemplate);
    parameters.in_user_id = userId;//objTemplate.IN_USER_ID;
    parameters.in_created_user_id = userId;    
    parameters.out_result = '?';
    return db.executeScalar(INS_TEMPLATE, parameters, 'out_result');
}

//Get all template
function getAllTemplate() {
    var parameters = {};
    var result = db.executeProcedure(GET_ALL_TEMPLATE, parameters);
    return db.extractArray(result.out_result);
}

//Get template by ID
function getTemplateById(templateId) {
    var parameters = {};
    parameters.in_template_id = templateId;
    var result = db.executeProcedure(GET_TEMPLATE_BY_ID, parameters);
    return db.extractArray(result.out_result);
}

function getManualTemplateById(templateId) {
    var parameters = {};
    parameters.in_template_id = templateId;
    var result = db.executeProcedureManual(GET_TEMPLATE_BY_ID, parameters);
    return db.extractArray(result.out_result);
}

//Get template by type ID
function getTemplateByTypeId(typeId) {
    var parameters = {};
    parameters.in_template_type_id = typeId;
    var result = db.executeProcedure(GET_TEMPLATE_BY_TYPE_ID, parameters);
    return db.extractArray(result.out_result);
}

//Update template
function updateTemplate(objTemplate, userId) {
    var parameters = getTemplateParams(objTemplate);
    parameters.in_template_id = objTemplate.TEMPLATE_ID;
    parameters.in_user_id = userId;//objTemplate.IN_USER_ID;
    parameters.in_modified_user_id = userId;//objTemplate.IN_MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(UPD_TEMPLATE, parameters, 'out_result');
}

//Delete template
function deleteTemplate(objTemplate, userId) {
    var parameters = {};
    parameters.in_template_id = objTemplate.TEMPLATE_ID;
    parameters.in_modified_user_id = userId;//objTemplate.IN_MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(DEL_TEMPLATE, parameters, 'out_result');
}

function getTemplateParams(objTemplate){
	var parameters = {};
	parameters.in_template_type_id = objTemplate.TEMPLATE_TYPE_ID;//objTemplate.IN_CREATED_USER_ID;
    parameters.in_template_parent_id = objTemplate.TEMPLATE_PARENT_ID;
    parameters.in_name = objTemplate.NAME;
    parameters.in_link = objTemplate.LINK;
    parameters.in_template_order = objTemplate.TEMPLATE_ORDER;
    parameters.in_description = objTemplate.DESCRIPTION;
    parameters.in_section_id = objTemplate.SECTION_ID;
    return parameters;
}
