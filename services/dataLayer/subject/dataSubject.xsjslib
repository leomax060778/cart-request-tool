$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_ALL_SUBJECT = "GET_ALL_SUBJECT";
var GET_SUBJECT_BY_ID = "GET_SUBJECT_BY_ID";
var DEL_SUBJECT = "DEL_SUBJECT";
var INS_SUBJECT = "INS_SUBJECT";
var UPD_SUBJECT = "UPD_SUBJECT";

//Get all subject
function getAllSubject() {
    var parameters = {};
    var result = db.executeProcedure(GET_ALL_SUBJECT, parameters);
    return db.extractArray(result.out_result);
}

//Get subject by id
function getSubjectById(subjectId) {
    var parameters = {'in_subject_id': subjectId};
    var result = db.executeProcedure(GET_SUBJECT_BY_ID, parameters);

    var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

//Get subject by id manually
function getSubjectByIdManual(subjectId) {
  var parameters = {'in_subject_id': subjectId};
  var result = db.executeProcedureManual(GET_SUBJECT_BY_ID, parameters);
  var list = db.extractArray(result.out_result);
  if(list.length){
	   return list[0];
  } else {
	   	return {};
  }
}

//Delete subject
function deleteSubject(objSubject, userId) {
    var parameters = {};
    parameters.in_subject_id = objSubject.SUBJECT_ID;
    parameters.in_modified_user_id = userId;//objSubject.MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(DEL_SUBJECT, parameters, 'out_result');
}

//Insert subject
function insertSubject(objSubject, userId) {
    var parameters = {};
    parameters.in_name = objSubject.NAME;
    parameters.in_additional_subject_information = objSubject.ADDITIONAL_SUBJECT_INFORMATION;
    parameters.in_subject_position = objSubject.POSITION;
    parameters.in_created_user_id = userId;//objSubject.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(INS_SUBJECT, parameters, 'out_result');
}

//Update subject
function updateSubject(objSubject, userId) {
    var parameters = {};
    parameters.in_subject_id = objSubject.SUBJECT_ID;
    parameters.in_name = objSubject.NAME;
    parameters.in_additional_subject_information = objSubject.ADDITIONAL_SUBJECT_INFORMATION;
    parameters.in_subject_position = objSubject.POSITION;
    parameters.in_modified_user_id = userId;//objSubject.MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(UPD_SUBJECT, parameters, 'out_result');
}