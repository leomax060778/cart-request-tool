$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_ALL_MESSAGE_TYPE = "GET_ALL_MESSAGE_TYPE";
var GET_MESSAGE_TYPE_BY_ID = "GET_MESSAGE_TYPE_BY_ID";
var DEL_MESSAGE_TYPE = "DEL_MESSAGE_TYPE";
var INS_MESSAGE_TYPE = "INS_MESSAGE_TYPE";
var UPD_MESSAGE_TYPE = "UPD_MESSAGE_TYPE";

//Get all message type
function getAllMessageType() {
    var parameters = {};
    var result = db.executeProcedure(GET_ALL_MESSAGE_TYPE, parameters);
    return db.extractArray(result.out_result);
}

//Get message type by id
function getMessageTypeById(messageTypeId) {
    var parameters = {'in_message_type_id': messageTypeId};
    var result = db.executeProcedure(GET_MESSAGE_TYPE_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

//Get message type by id manually
function getMessageTypeByIdManual(messageTypeId) {
    var parameters = {'in_message_type_id': messageTypeId};
    var result = db.executeProcedureManual(GET_MESSAGE_TYPE_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

//Delete message type
function deleteMessageType(objMessageType, userId) {
    var parameters = {};
    parameters.in_message_type_id = objMessageType.MESSAGE_TYPE_ID;
    parameters.in_modified_user_id = userId;//objMessageType.MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(DEL_MESSAGE_TYPE, parameters, 'out_result');
}

//Insert message type
function insertMessageType(objMessageType, userId) {
    var parameters = {};
    parameters.in_name = objMessageType.NAME;
    parameters.in_additional_message_type_information = objMessageType.ADDITIONAL_MESSAGE_TYPE_INFORMATION;
    parameters.in_message_type_position = objMessageType.POSITION;
    parameters.in_created_user_id = userId;//objMessageType.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(INS_MESSAGE_TYPE, parameters, 'out_result');
}

//Update message type
function updateMessageType(objMessageType, userId) {
    var parameters = {};
    parameters.in_message_type_id = objMessageType.MESSAGE_TYPE_ID;
    parameters.in_name = objMessageType.NAME;
    parameters.in_additional_message_type_information = objMessageType.ADDITIONAL_MESSAGE_TYPE_INFORMATION;
    parameters.in_message_type_position = objMessageType.POSITION;
    parameters.in_modified_user_id = userId;//objMessageType.MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(UPD_MESSAGE_TYPE, parameters, 'out_result');
}