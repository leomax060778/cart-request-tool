/** **** libs *********** */
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var http = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var attachmentLib = mapper.getDataProtection();

var GET_ATTACHMENT_BY_ID = "GET_ATTACHMENT_BY_ID";
var GET_ALL_ATTACHMENT = "GET_ALL_ATTACHMENT";

/** *************************************** */
function processRequest() {
	http.processRequest(handleGet, handlePost, handlePut, handleDelete);
}

function handleGet(reqObj, user_id) {
	var req = {};
	if(reqObj.length > 0){
		if (reqObj[0].name === GET_ATTACHMENT_BY_ID) {
			req = attachmentLib.getAttachmentById(reqObj[0].value, user_id);
		} else if(reqObj[0].name === GET_ALL_ATTACHMENT){
			req = attachmentLib.getAllAttachment();
		}
	}
	return http.handleResponse(req, http.OK, http.AppJson);
}

function handlePost(reqBody, user_id) {
	var req = attachmentLib.insertAttachment(reqBody, user_id);
	return http.handleResponse(req, http.OK, http.AppJson);
}

function handlePut(reqBody, user_id) {
	var req = attachmentLib.updateAttachment(reqBody, user_id);
	return http.handleResponse(req, http.OK, http.AppJson);
}
function handleDelete(reqBody, user_id) {
	var req = attachmentLib.deleteAttachment(reqBody, user_id);
	return http.handleResponse(req, http.OK, http.AppJson);
}

processRequest();