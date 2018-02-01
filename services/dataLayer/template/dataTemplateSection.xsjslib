$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_ALL_TEMPLATE_SECTION = "GET_ALL_TEMPLATE_SECTION";
var GET_TEMPLATE_SECTION_BY_ID = "GET_TEMPLATE_SECTION_BY_ID";
var INS_TEMPLATE_SECTION = "INS_TEMPLATE_SECTION";
var UPD_TEMPLATE_SECTION = "UPD_TEMPLATE_SECTION";
var DEL_TEMPLATE_SECTION = "DEL_TEMPLATE_SECTION";

//Get all template section
function getAllTemplateSection() {
    var parameters = {};
    var result = db.executeProcedure(GET_ALL_TEMPLATE_SECTION, parameters);
    return db.extractArray(result.out_result);
}

//Get template section by id
function getTemplateSectionById(sectionId) {
    var parameters = {};
    parameters.in_section_id = sectionId;
    var result = db.executeProcedure(GET_TEMPLATE_SECTION_BY_ID, parameters);
    return db.extractArray(result.out_result);
}

//Insert template section
function insertTemplateSection(objTemplateSection, userId) {
    var parameters = getParams(objTemplateSection);
    parameters.in_created_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalar(INS_TEMPLATE_SECTION, parameters, 'out_result');
}

//Update template section
function updateTemplateSection(objTemplateSection, userId) {
    var parameters = getParams(objTemplateSection);
    parameters.in_section_id = objTemplateSection.SECTION_ID;
    parameters.in_modified_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalar(UPD_TEMPLATE_SECTION, parameters, 'out_result');
}

//Delete template section
function deleteTemplateSection(objTemplateSection, userId) {
    var parameters = {};
    parameters.in_section_id = objTemplateSection.SECTION_ID;
    parameters.in_modified_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalar(DEL_TEMPLATE_SECTION, parameters, 'out_result');
}

function getParams(objSection){
	var params = {};
	params.in_name = objSection.NAME;
    params.in_section_order = objSection.SECTION_ORDER;

    return params;
}

//MANUAL PROCEDURES
function getManualTemplateSectionById(sectionId) {
    var parameters = {};    
    parameters.out_result = '?';
    parameters.in_section_id = sectionId;
    var result = db.executeProcedureManual(GET_TEMPLATE_SECTION_BY_ID, parameters);
    return db.extractArray(result.out_result);
	
}