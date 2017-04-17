/****** libs ************/
 $.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var http = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var attachments = mapper.getAttachmentStore();

var GET_ATTACHMENT_BY_ID = "GET_ATTACHMENT_BY_ID";

var service_name = "attachmentStoreService";

function processRequest() {
	http.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name, true);
}

function handleGet(parameters, user_id){
	//fileBody = $.util.codec.encodeBase64(fileBody);
	var rdo = {};
	if (parameters.length > 0) {
		if (parameters[0].name === GET_ATTACHMENT_BY_ID) {
			rdo = attachments.getAttachmentById(parameters[0].value)[0];
			$.response.contentType = rdo.FILE_TYPE;
			$.response.status = 200;
			$.response.setBody($.util.codec.decodeBase64(ab2str(rdo.FILE_CONTENT)));
			//$.response.setBody(ab2str(rdo.FILE_CONTENT));
			$.response.headers.set('Content-Disposition','attachment; filename=' + rdo.ORIGINAL_NAME);
			$.response.headers.set('Content-Encoding','binary');
			//rdo.FILE_CONTENT = JSON.stringify(rdo.FILE_CONTENT);
		}
	} else {
		throw ErrorLib.getErrors().BadRequest(
				"",
				"attachmentService/handleGet",
				"invalid parameter name (can be: GET_ATTACHMENT_BY_ID)"
						+ parameters[0].name);
	}
	//return http.handleResponse(rdo, http.OK, http.AppJson);
}

function ab2str(buf) {
	return String.fromCharCode.apply(null, new Uint8Array(buf));
}

function handlePost(objAttachment, user_id) {
	var file = {};
	var content = $.request.entities[0].body.asString();
	var contentDisposition = $.request.entities[0].headers.get("Content-Disposition");
	var fileName = contentDisposition.split(';')[2].split("=")[1].replace(/\"/g, "");
	var contentType = $.request.entities[0].headers.get("Content-Type");	
	
	var fileEncoded = $.util.codec.encodeBase64(content);
	file.FILE_CONTENT = fileEncoded;
	file.ORIGINAL_NAME = fileName;
	file.ATTACHMENT_SIZE = 200;
	file.ATTACHMENT_TYPE = contentType;
	var result = attachments.insertAttachmentStore(file, user_id);
	
	return http.handleResponse(result, http.OK, http.AppJson);
}

function handlePut(objAttachment, user_id) {
	return http.notImplementedMethod();
}

function handleDelete(objAttachment, user_id) {
	return http.notImplementedMethod();
}

function processRequest2(getMethod, postMethod, putMethod, deleteMethod) {
	try {

		/** ********here - Validate User() -----** */
		var userSessionID = 1;
		//userSessionID = validateUser(getHeaderByName("x-csrf-token"));
		if(!userSessionID)
			 throw ErrorLib.getErrors().Unauthorized(getHeaderByName("x-csrf-token"));
		
		 /** *********************************************** */
//		var reqBody = $.request.body ? JSON.parse($.request.body.asString())
//				: undefined;
		var reqBody = {};
		switch ($.request.method) {
		case $.net.http.GET:
			return getMethod(http.getUrlParameters(), userSessionID);
			break;
		case $.net.http.PUT:
			return putMethod(reqBody, userSessionID);
			break;
		case $.net.http.POST:
			return postMethod(reqBody, userSessionID);
			break;
		case $.net.http.DEL:
			return deleteMethod(reqBody, userSessionID);
			break;
		default:
			return http.notImplementedMethod();
			break;
		}

	} catch (e) {
		http.handleErrorResponse(e);
	}
}

processRequest();