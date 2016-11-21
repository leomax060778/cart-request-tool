$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

var INS_NOTE_REQUEST = "INS_NOTE_REQUEST";
var INS_NOTE_TYPE = "INS_NOTE_TYPE";

function insertNoteRequest(objNoteReq, userId) {

        var parameters = {};
        parameters.in_request_id = objNoteReq.REQUEST_ID;
        parameters.in_user_id = objNoteReq.USER_ID;
        parameters.in_note_text = objNoteReq.NOTE_TEXT;
        parameters.in_note_type_id = objNoteReq.NOTE_TYPE_ID;
        parameters.in_created_user_id = userId;//objAttachment.IN_CREATED_USER_ID;
        return db.executeProcedureManual(INS_NOTE_REQUEST, parameters);
  
}

function insertNoteType(objNoteType, userId) {

    var parameters = {};
    parameters.in_note_type_name = objNoteType.in_note_type_name;
    parameters.in_created_user_id = userId;//objAttachment.IN_CREATED_USER_ID;
    return db.executeProcedureManual(INS_NOTE_TYPE, parameters);

} 