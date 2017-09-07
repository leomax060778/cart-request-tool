$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

var INS_NOTE_REQUEST = "INS_NOTE_REQUEST";
var UPD_NOTE_REQUEST = "UPD_NOTE_REQUEST";
var INS_NOTE_TYPE = "INS_NOTE_TYPE";
var DEL_NOTE_REQUEST_BY_ID = "DEL_NOTE_REQUEST";

function insertNoteRequest(objNoteReq, userId) {
    var parameters = {};
    parameters.in_request_id = objNoteReq.REQUEST_ID;
    parameters.in_note_text = objNoteReq.NOTE_TEXT;
    parameters.in_note_type_id = objNoteReq.NOTE_TYPE_ID;
    parameters.in_created_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalarManual(INS_NOTE_REQUEST, parameters, 'out_result');

}

function updateManualNoteRequest(objNoteReq, userId) {
    var parameters = {};
    parameters.out_result = '?';
    parameters.in_note_request_id = objNoteReq.NOTE_REQUEST_ID;
    parameters.in_note_text = objNoteReq.NOTE_TEXT;
    parameters.in_note_type_id = objNoteReq.NOTE_TYPE_ID;
    parameters.in_modified_user_id = userId;
    return db.executeScalarManual(UPD_NOTE_REQUEST, parameters, 'out_result');
}

function insertNoteType(objNoteType, userId) {

    var parameters = {};
    parameters.in_note_type_name = objNoteType.in_note_type_name;
    parameters.in_created_user_id = userId;
    return db.executeProcedureManual(INS_NOTE_TYPE, parameters);

}

function deleteManualNoteRequestById(note_request_id, user_id) {
    var param = {};
    param.in_note_request_id = note_request_id;
    param.in_modified_user_id = user_id;
    param.out_result = '?';

    return db.executeScalarManual(DEL_NOTE_REQUEST_BY_ID, param, 'out_result');
}