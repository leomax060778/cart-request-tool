/****** libs ************/
 $.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var http = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var note_type = mapper.getNoteTypeLib();

var GET_NOTE_TYPE_BY_ID = "GET_NOTE_TYPE_BY_ID";
var GET_ALL_NOTE_TYPE = "GET_ALL_NOTE_TYPE";

var service_name = "noteTypeService";

/******************************************/
function processRequest() {
	http.processRequest3(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

function handleGet(parameters, user_id) {
	var rdo = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_NOTE_TYPE_BY_ID) {
            rdo = note_type.getNoteTypeById(parameters[0].value, user_id);
            
        	} 
        else if (parameters[0].name === GET_ALL_NOTE_TYPE) {
            rdo = note_type.getAllNoteType();
          
        	}
        }
    else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "newsService/handleGet",
                "invalid parameter name (can be: GET_NOTE_TYPE_BY_ID, GET_ALL_NOTE_TYPE, GET_ALL_NOTE_TYPE_BY_STATUS, GET_ALL_NOTE_TYPE_BY_YEAR or GET_ALL_NOTE_TYPE_BY_STATUS_YEAR)"
                + parameters[0].name);
        }

    return http.handleResponse(rdo, http.OK, http.AppJson);
}

function handlePost(reqBody, user_id) {
	var res = note_type.insertNoteType(reqBody, user_id);
	return http.handleResponse(res, http.OK, http.AppJson);
}

function handlePut(reqBody, user_id) {
	var res = note_type.updateNoteType(reqBody, user_id);
	return http.handleResponse(res, http.OK, http.AppJson);
}
function handleDelete(reqBody, user_id) {
	var res = note_type.deleteNoteType(reqBody.NOTE_TYPE_ID, user_id);
	return http.handleResponse(res, http.OK, http.AppJson);
}

processRequest();
