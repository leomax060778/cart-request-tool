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
	var res = {};
	if (parameters.length > 0) {
		if (parameters[0].name === GET_ENTITY_BY_ID) {
			if (!parameters[0].value || isNaN(parameters[0].value)) {
				throw ErrorLib.getErrors().BadRequest(
						"",
						"entityService/handleGet",
						"invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (it should be a valid id)");
			}
			res = entity.getEntityById(parameters[0].value, user_id);
		} else if (parameters[0].name === GET_ALL_ENTITY) {
			res = entity.getEntity();
		} else {
			throw ErrorLib.getErrors().BadRequest(
					"",
					"entityService/handleGet",
					"invalid parameter name \'" + parameters[0].name + "\' (it can be: GET_ENTITY_BY_ID or GET_ALL_ENTITY)");
		}
	} else {
		throw ErrorLib.getErrors().BadRequest(
				"",
				"entityService/handleGet",
				"invalid parameter (it can be: GET_ENTITY_BY_ID or GET_ALL_ENTITY)");
	}

	return http.handleResponse(res, http.OK, http.AppJson);
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