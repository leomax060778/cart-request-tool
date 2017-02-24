/****** libs ************/
 $.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var http = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var attachments = mapper.getAttachment();

var GET_ATTACHMENT_BY_ID = "GET_ATTACHMENT_BY_ID";
var GET_ATTACHMENTS_BY_ID = "GET_ATTACHMENTS_BY_ID";

var service_name = "attachmentService";

function processRequest() {
	http.processRequest3(handleGet, handlePost, handlePut, handleDelete,true, service_name, true);
}

function handleGet(parameters, user_id) {
	var res = {};
	if (parameters.length > 0) {
		if (parameters[0].name === GET_ATTACHMENTS_BY_ID) {
			res = attachments.getAttachmentsById(parameters[0].value);
		} else if (parameters[0].name === GET_ATTACHMENT_BY_ID) {
			res = attachments.getAttachmentById(parameters[0].value);
		}
	} else {
		throw ErrorLib.getErrors().BadRequest(
				"",
				"attachmentService/handleGet",
				"invalid parameter name (can be: GET_ATTACHMENT_BY_ID)");
	}

	return http.handleResponse(res, http.OK, http.AppJson);
}

function handlePost(objAttachment, user_id) {
	if(user_id == null || user_id == undefined)
		user_id = 1;
	
	var res = attachments.insertAttachment(objAttachment, user_id);
	return http.handleResponse(res, http.OK, http.AppJson);
}

function handlePut(objAttachment, user_id) {
	var res = attachments.updateAttachment(objAttachment, user_id);
	return http.handleResponse(res, http.OK, http.AppJson);
}

function handleDelete(objAttachment, user_id) {
	var res = attachments.deleteAttachment(objAttachment, user_id);
	return http.handleResponse(objAttachment, http.OK, http.AppJson);
}

processRequest();