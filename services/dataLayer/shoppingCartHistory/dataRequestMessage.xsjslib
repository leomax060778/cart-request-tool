$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURES LIST NAME
var INS_REQUEST_MESSAGE = "INS_REQUEST_MESSAGE";
var GET_REQUEST_MESSAGE = "GET_REQUEST_MESSAGE_BY_REQUEST_ID";
var GET_REQUEST_MESSAGE_CONTENT = "GET_REQUEST_MESSAGE_CONTENT";
var UPD_REQUEST_MESSAGE_READ = "UPD_REQUEST_MESSAGE_READ";
var UPD_REQUEST_MESSAGE_READ_BY_MESSAGE_ID = "UPD_REQUEST_MESSAGE_READ_BY_MESSAGE_ID";

//Insert message in Request
function insertRequestMessage(objRequest, userId) {
    var parameters = {};
    parameters.in_user_id = userId;
    parameters.in_request_id = objRequest.REQUEST_ID;
    parameters.in_message_content = objRequest.MESSAGE_CONTENT;
    parameters.in_message_type_id = objRequest.MESSAGE_TYPE_ID || 0;
    parameters.in_subject_id = objRequest.SUBJECT_ID || 0;
    parameters.in_additional_message_type_information = null;
    parameters.in_additional_subject_information = null;
    parameters.in_message_read = 0;
    parameters.in_created_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalar(INS_REQUEST_MESSAGE, parameters, 'out_result');
}

//Get message of Request
function getRequestMessage(requestId) {
    var parameters = {'in_request_id': requestId};
    var result = db.executeProcedure(GET_REQUEST_MESSAGE, parameters);
    return db.extractArray(result.out_result);
}

//Get message of Request manual
function getRequestMessageManual(requestId) {
    var parameters = {'in_request_id': requestId};
    var result = db.executeProcedureManual(GET_REQUEST_MESSAGE, parameters);
    return db.extractArray(result.out_result);
}

//Get Request message content manual
function getRequestMessageContentManual(requestId, messageId, startPosition, stringLength) {
    var parameters = {};
    parameters.in_request_id = requestId;
    parameters.in_message_id = messageId;
    parameters.in_start_position = startPosition;
    parameters.in_string_length = stringLength;
    var result = db.executeProcedureManual(GET_REQUEST_MESSAGE_CONTENT, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

//Change message flag manual
function updateRequestMessageReadManual(objRequest, userId){
	var parameters = {};
	parameters.in_user_id_read = userId;
	parameters.in_message_read = objRequest.MESSAGE_READ;
	parameters.out_result = '?';
	return db.executeScalarManual(UPD_REQUEST_MESSAGE_READ, parameters, 'out_result');
}

//Change message flag manual
function updateRequestMessageReadByMessageIdManual(objRequest, userId){
	var parameters = {};
	parameters.in_user_id_read = userId;
	parameters.in_message_read = objRequest.MESSAGE_READ;
	parameters.in_message_id = objRequest.MESSAGE_ID;
	parameters.out_result = '?';
	return db.executeScalarManual(UPD_REQUEST_MESSAGE_READ_BY_MESSAGE_ID, parameters, 'out_result');
}

//Change message flag
function updateRequestMessageRead(objRequest, userId){
	var parameters = {};
	parameters.in_user_id_read = userId;
	parameters.in_message_read = objRequest.MESSAGE_READ;
	parameters.out_result = '?';
	return db.executeScalar(UPD_REQUEST_MESSAGE_READ, parameters, 'out_result');
}