$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_ALL_CRT_TYPE = "GET_ALL_CRT_TYPE";
var GET_CRT_TYPE_BY_ID = "GET_CRT_TYPE_BY_ID";
var DEL_CRT_TYPE = "DEL_CRT_TYPE";
var INS_CRT_TYPE = "INS_CRT_TYPE";
var UPD_CRT_TYPE = "UPD_CRT_TYPE";

//Get all crt type
function getAllCrtType() {
    var parameters = {};
    var result = db.executeProcedure(GET_ALL_CRT_TYPE, parameters);
    return db.extractArray(result.out_result);
}

//Get crt type by id
function getCrtTypeById(crtTypeId) {
    var parameters = {'in_crt_type_id': crtTypeId};
    var result = db.executeProcedure(GET_CRT_TYPE_BY_ID, parameters);
    return db.extractArray(result.out_result);
}

//Get crt type by id manually
function getCrtTypeByIdManual(crtTypeId) {
    var parameters = {'in_crt_type_id': crtTypeId};
    var result = db.executeProcedureManual(GET_CRT_TYPE_BY_ID, parameters);
    return db.extractArray(result.out_result);
}

//Delete crt type
function deleteCrtType(objCrtType, userId) {
    var parameters = {};
    parameters.in_crt_type_id = objCrtType.CRT_TYPE_ID;
    parameters.in_modified_user_id = userId;//objCrtType.MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(DEL_CRT_TYPE, parameters, 'out_result');
}

//Insert crt type
function insertCrtType(objCrtType, userId) {
    var parameters = {};
    parameters.in_name = objCrtType.NAME;
    parameters.in_created_user_id = userId;//objCrtType.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(INS_CRT_TYPE, parameters, 'out_result');
}

//Update crt type
function updateCrtType(objCrtType, userId) {
    var parameters = {};
    parameters.in_crt_type_id = objCrtType.CRT_TYPE_ID;
    parameters.in_name = objCrtType.NAME;
    parameters.in_modified_user_id = userId;//objCrtType.MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(UPD_CRT_TYPE, parameters, 'out_result');
}