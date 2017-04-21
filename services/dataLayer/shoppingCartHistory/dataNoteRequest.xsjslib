$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */


//STORE PROCEDURE LIST NAME
var GET_NOTE_REQUEST_BY_REQUEST_ID = "GET_NOTE_REQUEST_BY_REQUEST_ID";
var GET_ALL_NOTE_REQUEST = "GET_ALL_NOTE_REQUEST";
var GET_NOTE_REQUEST_CONTENT = "GET_NOTE_REQUEST_CONTENT";
var DEL_NOTE_REQUEST_BY_REQUEST_ID = "DEL_NOTE_REQUEST_BY_REQUEST_ID";

function getNoteRequestByRequestId(request_id){
	
	var parameters = {};
	
	parameters.in_request_id = request_id; 
	parameters.out_result = '?';
	
	var result = db.executeProcedureManual(GET_NOTE_REQUEST_BY_REQUEST_ID, parameters);
	return db.extractArray(result.out_result);
}

function getAllNoteRequest(){
	
	var parameters = {};
	parameters.out_result = '?';
	
	var result = db.executeProcedure(GET_ALL_NOTE_REQUEST, parameters);
	return db.extractArray(result.out_result);
}

//Get note request content manual
function getNoteRequestContentManual(requestId, noteRequestId, startPosition, stringLength) {
    var parameters = {};
    parameters.in_request_id = requestId;
    parameters.in_note_request_id = noteRequestId;
    parameters.in_start_position = startPosition;
    parameters.in_string_length = stringLength;
    var result = db.executeProcedureManual(GET_NOTE_REQUEST_CONTENT, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

function deleteNoteRequestByRequestId(requestId, userId){
	var parameters = {};
	
	parameters.in_request_id = requestId;
	parameters.in_modified_user_id = userId;
	parameters.out_result = '?';
	
	return db.executeScalar(DEL_NOTE_REQUEST_BY_REQUEST_ID, parameters, 'out_result');
}