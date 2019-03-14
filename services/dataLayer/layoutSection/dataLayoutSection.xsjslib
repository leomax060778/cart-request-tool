$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_ALL_LAYOUT_SECTION = "GET_ALL_LAYOUT_SECTION";
var GET_LAYOUT_SECTION_BY_ID = "GET_LAYOUT_SECTION_BY_ID";
var INS_LAYOUT_SECTION = "INS_LAYOUT_SECTION";
var UPD_LAYOUT_SECTION = "UPD_LAYOUT_SECTION";

//Get all layout section
function getAllLayoutSection() {
    var parameters = {};
    var result = db.executeProcedure(GET_ALL_LAYOUT_SECTION, parameters);
    return db.extractArray(result.out_result);
}

//Get layout section by id
function getLayoutSectionById(sectionId) {
    var parameters = {'in_layout_section_id': sectionId};
    var result = db.executeProcedure(GET_LAYOUT_SECTION_BY_ID, parameters);
    return db.extractArray(result.out_result);
}

//Get layout section by id manually
function getLayoutSectionByIdManual(sectionId) {
  var parameters = {'in_layout_section_id': sectionId};
  var result = db.executeProcedureManual(GET_LAYOUT_SECTION_BY_ID, parameters);
  return db.extractArray(result.out_result);
}

//Insert layout section
function insertLayoutSection(objLayoutSection, userId) {
    var parameters = {};
    parameters.in_name = objLayoutSection.NAME;
    parameters.in_content = objLayoutSection.CONTENT;
    parameters.in_created_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalar(INS_LAYOUT_SECTION, parameters, 'out_result');
}

//Update layout section
function updateLayoutSection(objLayoutSection, userId) {
    var parameters = {};
    parameters.in_layout_section_id = objLayoutSection.LAYOUT_SECTION_ID;
    parameters.in_content = objLayoutSection.CONTENT;
    parameters.in_modified_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalar(UPD_LAYOUT_SECTION, parameters, 'out_result');
}
