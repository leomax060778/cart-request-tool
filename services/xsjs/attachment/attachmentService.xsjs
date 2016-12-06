/****** libs ************/
 $.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var http = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var attachments = mapper.getAttachment();

var GET_ATTACHMENT_BY_ID = "GET_ATTACHMENT_BY_ID";

function processRequest() {
	http.processRequest2(handleGet, handlePost, handlePut, handleDelete,true,"",true);
}

function handleGet(parameters, user_id) {
	var rdo = {};
	if (parameters.length > 0) {
		if (parameters[0].name === GET_ATTACHMENT_BY_ID) {
			rdo = attachments.getAttachmentById(parameters[0].value);
			if(rdo && rdo[0]){
				rdo = rdo[0];
			} else {
				rdo = {};
			}
		}
	} else {
		throw ErrorLib.getErrors().BadRequest(
				"",
				"attachmentService/handleGet",
				"invalid parameter name (can be: GET_ATTACHMENT_BY_ID)"
						+ parameters[0].name);
	}

	return http.handleResponse(rdo, http.OK, http.AppJson);
}

function handlePost(objAttachment, user_id) {
	var res = attachments.insertAttachment(objAttachment, 1);
	return http.handleResponse(res, http.OK, http.AppJson);
}

function handlePut(objAttachment, user_id) {
	var res = attachments.updateAttachment(objAttachment, user_id);
	return http.handleResponse(res, http.OK, http.AppJson);
}

function handleDelete(objAttachment, user_id) {
	var rdo = attachments.deleteAttachment(objAttachment, user_id);
	return http.handleResponse(objAttachment, http.OK, http.AppJson);
}

processRequest();