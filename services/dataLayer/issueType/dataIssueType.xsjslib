$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_ALL_ISSUE_TYPE = "GET_ALL_ISSUE_TYPE";
var GET_ISSUE_TYPE_BY_ID = "GET_ISSUE_TYPE_BY_ID";
var DEL_ISSUE_TYPE = "DEL_ISSUE_TYPE";
var INS_ISSUE_TYPE = "INS_ISSUE_TYPE";
var UPD_ISSUE_TYPE = "UPD_ISSUE_TYPE";

//Get all issue type
function getAllIssueType() {
    var parameters = {};
    var result = db.executeProcedure(GET_ALL_ISSUE_TYPE, parameters);
    return db.extractArray(result.out_result);
}

//Get issue type by id
function getIssueTypeById(issueTypeId) {
    var parameters = {'in_issue_type_id': issueTypeId};
    var result = db.executeProcedure(GET_ISSUE_TYPE_BY_ID, parameters);

    var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

//Get issue type by id manually
function getIssueTypeByIdManual(issueTypeId) {
  var parameters = {'in_issue_type_id': issueTypeId};
  var result = db.executeProcedureManual(GET_ISSUE_TYPE_BY_ID, parameters);
  var list = db.extractArray(result.out_result);
  if(list.length){
	   return list[0];
  } else {
	   	return {};
  }
}

//Delete issue type
function deleteIssueType(objIssueType, userId) {
    var parameters = {};
    parameters.in_issue_type_id = objIssueType.ISSUE_TYPE_ID;
    parameters.in_modified_user_id = userId;//objIssueType.MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(DEL_ISSUE_TYPE, parameters, 'out_result');
}

//Insert issue type
function insertIssueType(objIssueType, userId) {
    var parameters = {};
    parameters.in_name = objIssueType.NAME;
    parameters.in_additional_issue_type_information = objIssueType.ADDITIONAL_ISSUE_TYPE_INFORMATION;
    parameters.in_created_user_id = userId;//objIssueType.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(INS_ISSUE_TYPE, parameters, 'out_result');
}

//Update issue type
function updateIssueType(objIssueType, userId) {
    var parameters = {};
    parameters.in_issue_type_id = objIssueType.ISSUE_TYPE_ID;
    parameters.in_name = objIssueType.NAME;
    parameters.in_additional_issue_type_information = objIssueType.ADDITIONAL_ISSUE_TYPE_INFORMATION;
    parameters.in_modified_user_id = userId;//objIssueType.MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(UPD_ISSUE_TYPE, parameters, 'out_result');
}