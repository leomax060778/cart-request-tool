$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_ISSUE_TYPE_BY_CRT_ID = "GET_ISSUE_TYPE_BY_CRT_ID";
var DEL_CRT_ISSUE_TYPE = "DEL_CRT_ISSUE_TYPE";
var INS_CRT_ISSUE_TYPE = "INS_CRT_ISSUE_TYPE";

//Get issue type by crt id
function getIssueTypeByCrtIdManual(crtTypeId) {
    var parameters = {'in_crt_type_id': crtTypeId};
    var result = db.executeProcedureManual(GET_ISSUE_TYPE_BY_CRT_ID, parameters);
    return db.extractArray(result.out_result);
}

//Delete crt issue type
function deleteCrtIssueType(objCrtIssueType, userId) {
    var parameters = {};
    parameters.in_crt_type_id = objCrtIssueType.CRT_TYPE_ID;
    parameters.in_issue_type_id = objCrtIssueType.ISSUE_TYPE_ID;
    parameters.in_modified_user_id = userId;//objCrtIssueType.MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(DEL_CRT_ISSUE_TYPE, parameters, 'out_result');
}

//Insert crt issue type
function insertCrtIssueType(objCrtIssueType, userId) {
    var parameters = {};
    parameters.in_crt_type_id = objCrtIssueType.CRT_TYPE_ID;
    parameters.in_issue_type_id = objCrtIssueType.ISSUE_TYPE_ID;
    parameters.in_created_user_id = userId;//objCrtIssueType.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(INS_CRT_ISSUE_TYPE, parameters, 'out_result');
}