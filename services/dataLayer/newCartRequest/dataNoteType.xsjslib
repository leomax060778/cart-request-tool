$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_NOTE_TYPE = 'GET_ALL_NOTE_TYPE';
var GET_NOTE_TYPE_BY_ID = 'GET_NOTE_TYPE_BY_ID';
var INS_NOTE_TYPE = 'INS_NOTE_TYPE';
var UPD_NOTE_TYPE = 'UPD_NOTE_TYPE';
var DEL_NOTE_TYPE = 'DEL_NOTE_TYPE';

function getAllNoteType(){
	var param = {};
	param.out_result = '?';
	var result = db.executeProcedure(GET_ALL_NOTE_TYPE, param);
	return db.extractArray(result.out_result);
}

function getNoteTypeById(note_type_id){
	
	var param = {};
	param.in_note_type_id = note_type_id;
	param.out_result = '?';
	
	var result = db.executeProcedure(GET_NOTE_TYPE_BY_ID, param);
	return db.extractArray(result.out_result);
}

function getManualNoteTypeById(note_type_id){
	
	var param = {};
	param.in_note_type_id = note_type_id;
	param.out_result = '?';
	
	var result = db.executeProcedureManual(GET_NOTE_TYPE_BY_ID, param);
	return db.extractArray(result.out_result);
}

function insertNoteType(objNoteType, user_id){
	var param = {};
	param.in_note_type_name = objNoteType.NOTE_TYPE_NAME;
	param.in_note_type_description = objNoteType.NOTE_TYPE_DESCRIPTION;
	param.in_created_user_id = user_id;
	param.out_result = '?';
	
	return db.executeScalarManual(INS_NOTE_TYPE, param, 'out_result');
}

function updateNoteType(objNoteType, user_id){
	var param = {};
	param.in_note_type_id = objNoteType.NOTE_TYPE_ID;
	param.in_note_type_name = objNoteType.NOTE_TYPE_NAME;
	param.in_note_type_description = objNoteType.NOTE_TYPE_DESCRIPTION;
	param.in_modified_user_id = user_id;
	param.out_result = '?';
	
	return db.executeScalarManual(UPD_NOTE_TYPE, param, 'out_result');
}

function deleteNoteType(note_type_id, user_id){
	var param = {};
	param.in_note_type_id = note_type_id;
	param.in_modified_user_id = user_id;
	param.out_result = '?';
	
	return db.executeScalarManual(DEL_NOTE_TYPE, param, 'out_result');
}