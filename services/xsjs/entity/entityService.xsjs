/****** libs ************/
 $.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var http = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var entity = mapper.getEntity();


/*********/
var GET_ENTITY_BY_ID = "GET_ENTITY_BY_ID";
var GET_ALL_ENTITY = "GET_ALL_ENTITY";

var service_name = "entityService";

/******************************************/
function processRequest(){  
	http.processRequest(handleGet,handlePost,handlePut,handleDelete, false, service_name);
}

function handleGet(parameters, user_id) {
	var rdo = {};
	if (parameters.length > 0) {
		if (parameters[0].name === GET_ENTITY_BY_ID) {
			rdo = entity.getEntityById(parameters[0].value, user_id);
		} else if (parameters[0].name === GET_ALL_ENTITY) {
			rdo = entity.getEntity();
		}
	} else {
		throw ErrorLib.getErrors().BadRequest(
				"",
				"entityService/handleGet",
				"invalid parameter name (can be: GET_ENTITY_BY_ID)"
						+ parameters[0].name);
	}

	return http.handleResponse(rdo, http.OK, http.AppJson);
}

function handlePost(reqBody, user_id) {
	var req = entity.insertEntity(reqBody, user_id);
	return http.handleResponse(req,http.OK,http.AppJson);
}

function handlePut(reqBody, user_id) {
	var req = entity.updateEntity(reqBody, user_id);
	return http.handleResponse(req,http.OK,http.AppJson);
}
function handleDelete(reqBody, user_id) {
	var req = entity.deleteEntity(reqBody.ENTITY_ID, user_id);
	return http.handleResponse(req,http.OK,http.AppJson);
}

processRequest();