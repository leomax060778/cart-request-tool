$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_MESSAGE_TYPE_BY_CRT_ID = "GET_MESSAGE_TYPE_BY_CRT_ID";
var DEL_CRT_MESSAGE_TYPE = "DEL_CRT_MESSAGE_TYPE";
var INS_CRT_MESSAGE_TYPE = "INS_CRT_MESSAGE_TYPE";
var UPD_CRT_MESSAGE_TYPE = "UPD_CRT_MESSAGE_TYPE";

//Get message type by crt id
function getMessageTypeByCrtIdManual(crtTypeId) {
    var parameters = {'in_crt_type_id': crtTypeId};
    var result = db.executeProcedureManual(GET_MESSAGE_TYPE_BY_CRT_ID, parameters);
    return db.extractArray(result.out_result);
}

//Delete crt message type
function deleteCrtMessageType(objCrtMessageType, userId) {
    var parameters = {};
    parameters.in_crt_type_id = objCrtMessageType.CRT_TYPE_ID;
    parameters.in_message_type_id = objCrtMessageType.MESSAGE_TYPE_ID;
    parameters.in_modified_user_id = userId;//objCrtMessageType.MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(DEL_CRT_MESSAGE_TYPE, parameters, 'out_result');
}

//Insert crt message type
function insertCrtMessageType(objCrtMessageType, userId) {
    var parameters = {};
    parameters.in_crt_type_id = objCrtMessageType.CRT_TYPE_ID;
    parameters.in_message_type_id = objCrtMessageType.MESSAGE_TYPE_ID;
    parameters.in_status_id = objCrtMessageType.STATUS_ID;
    parameters.in_created_user_id = userId;//objCrtMessageType.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(INS_CRT_MESSAGE_TYPE, parameters, 'out_result');
}

//Update crt message type
function updateCrtMessageType(objCrtMessageType, userId) {
	var parameters = {};
    parameters.in_crt_type_id = objCrtMessageType.CRT_TYPE_ID;
    parameters.in_message_type_id = objCrtMessageType.MESSAGE_TYPE_ID;
    parameters.in_status_id = objCrtMessageType.STATUS_ID;
    parameters.in_modified_user_id = userId;//objCrtMessageType.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(UPD_CRT_MESSAGE_TYPE, parameters, 'out_result');
}