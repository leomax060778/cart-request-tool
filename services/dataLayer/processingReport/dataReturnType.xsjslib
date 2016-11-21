$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_ALL_RETURN_TYPE = "GET_ALL_RETURN_TYPE";
var GET_RETURN_TYPE_BY_ID = "GET_RETURN_TYPE_BY_ID";
var DEL_RETURN_TYPE = "DEL_RETURN_TYPE";
var INS_RETURN_TYPE = "INS_RETURN_TYPE";
var UPD_RETURN_TYPE = "UPD_RETURN_TYPE";

//Get all return type
function getAllReturnType() {
    var parameters = {};
    var result = db.executeProcedure(GET_ALL_RETURN_TYPE, parameters);
    return db.extractArray(result.out_result);
}

//Get return type by id
function getReturnTypeById(returnTypeId) {
    var parameters = {'in_return_type_id': returnTypeId};
    var result = db.executeProcedure(GET_RETURN_TYPE_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

//Get return type by id manually
function getReturnTypeByIdManual(returnTypeId) {
    var parameters = {'in_return_type_id': returnTypeId};
    var result = db.executeProcedureManual(GET_RETURN_TYPE_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

//Delete return type
function deleteReturnType(objReturnType, userId) {
    var parameters = {};
    parameters.in_return_type_id = objReturnType.RETURN_TYPE_ID;
    parameters.in_modified_user_id = userId;//objReturnType.MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(DEL_RETURN_TYPE, parameters, 'out_result');
}

//Insert return type
function insertReturnType(objReturnType, userId) {
    var parameters = {};
    parameters.in_name = objReturnType.NAME;
    parameters.in_created_user_id = userId;//objReturnType.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(INS_RETURN_TYPE, parameters, 'out_result');
}

//Update return type
function updateReturnType(objReturnType, userId) {
    var parameters = {};
    parameters.in_return_type_id = objReturnType.RETURN_TYPE_ID;
    parameters.in_name = objReturnType.NAME;
    parameters.in_modified_user_id = userId;//objReturnType.MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(UPD_RETURN_TYPE, parameters, 'out_result');
}