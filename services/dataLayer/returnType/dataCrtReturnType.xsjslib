$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_RETURN_TYPE_BY_CRT_ID = "GET_RETURN_TYPE_BY_CRT_ID";
var DEL_CRT_RETURN_TYPE = "DEL_CRT_RETURN_TYPE";
var INS_CRT_RETURN_TYPE = "INS_CRT_RETURN_TYPE";

//Get return type by crt id
function getReturnTypeByCrtIdManual(crtTypeId) {
    var parameters = {'in_crt_type_id': crtTypeId};
    var result = db.executeProcedureManual(GET_RETURN_TYPE_BY_CRT_ID, parameters);
    return db.extractArray(result.out_result);
}

//Delete crt return type
function deleteCrtReturnType(objCrtReturnType, userId) {
    var parameters = {};
    parameters.in_crt_type_id = objCrtReturnType.CRT_TYPE_ID;
    parameters.in_return_type_id = objCrtReturnType.RETURN_TYPE_ID;
    parameters.in_modified_user_id = userId;//objCrtReturnType.MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(DEL_CRT_RETURN_TYPE, parameters, 'out_result');
}

//Insert crt return type
function insertCrtReturnType(objCrtReturnType, userId) {
    var parameters = {};
    parameters.in_crt_type_id = objCrtReturnType.CRT_TYPE_ID;
    parameters.in_return_type_id = objCrtReturnType.RETURN_TYPE_ID;
    parameters.in_created_user_id = userId;//objCrtReturnType.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(INS_CRT_RETURN_TYPE, parameters, 'out_result');
}