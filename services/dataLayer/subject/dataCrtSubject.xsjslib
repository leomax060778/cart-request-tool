$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_SUBJECT_BY_CRT_ID = "GET_SUBJECT_BY_CRT_ID";
var DEL_CRT_SUBJECT = "DEL_CRT_SUBJECT";
var INS_CRT_SUBJECT = "INS_CRT_SUBJECT";

//Get subject by crt id
function getSubjectByCrtIdManual(crtTypeId) {
    var parameters = {'in_crt_type_id': crtTypeId};
    var result = db.executeProcedureManual(GET_SUBJECT_BY_CRT_ID, parameters);
    return db.extractArray(result.out_result);
}

//Delete crt subject
function deleteCrtSubject(objCrtSubject, userId) {
    var parameters = {};
    parameters.in_crt_type_id = objCrtSubject.CRT_TYPE_ID;
    parameters.in_subject_id = objCrtSubject.SUBJECT_ID;
    parameters.in_modified_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalar(DEL_CRT_SUBJECT, parameters, 'out_result');
}

//Insert crt subject
function insertCrtSubject(objCrtSubject, userId) {
    var parameters = {};
    parameters.in_crt_type_id = objCrtSubject.CRT_TYPE_ID;
    parameters.in_subject_id = objCrtSubject.SUBJECT_ID;
    parameters.in_created_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalar(INS_CRT_SUBJECT, parameters, 'out_result');
}