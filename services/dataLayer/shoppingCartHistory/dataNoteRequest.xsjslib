$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */
 

//STORE PROCEDURE LIST NAME
var GET_NOTE_REQUEST_BY_REQUEST_ID = "GET_NOTE_REQUEST_BY_REQUEST_ID";
var GET_ALL_NOTE_REQUEST = "GET_ALL_NOTE_REQUEST";
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

function deleteNoteRequestByRequestId(requestId, userId){
	var parameters = {};
	
	parameters.in_request_id = requestId;
	parameters.in_modified_user_id = userId;
	parameters.out_result = '?';
	
	return db.executeScalar(DEL_NOTE_REQUEST_BY_REQUEST_ID, parameters, 'out_result');
}