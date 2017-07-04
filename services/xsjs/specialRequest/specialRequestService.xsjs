/****** libs ************/
 $.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var http = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var special_request = mapper.getSpecialRequest();

var GET_SPECIAL_REQUEST_BY_ID = "GET_SPECIAL_REQUEST_BY_ID";
var GET_ALL_SPECIAL_REQUEST = "GET_ALL_SPECIAL_REQUEST";

var service_name = "specialRequestService";

/******************************************/
function processRequest(){
	http.processRequest(handleGet,handlePost,handlePut,handleDelete, false, service_name);
	}

function handleGet(parameters, user_id) {
    var res = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_SPECIAL_REQUEST_BY_ID) {
            res = special_request.getSpecialRequestById(parameters[0].value, user_id);

        	}
        else if (parameters[0].name === GET_ALL_SPECIAL_REQUEST) {
            res = special_request.getAllSpecialRequest(user_id);

        	}
        }
    else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "SpecialRequestService/handleGet",
                "invalid parameter name (can be: GET_SPECIAL_REQUEST_BY_ID or GET_ALL_SPECIAL_REQUEST)"
                + parameters[0].name);
        }

    return http.handleResponse(res, http.OK, http.AppJson);
}

function handlePost(specialReqBody, user_id) {
	var res = special_request.insertSpecialRequest(specialReqBody, user_id);
	return http.handleResponse(res, http.OK, http.AppJson);
}

function handlePut(specialReqBody, user_id) {
    var res = special_request.updateSpecialRequest(specialReqBody, user_id);
    return http.handleResponse(res, http.OK, http.AppJson);
}

function handleDelete(specialReqBody, user_id) {
	var res =  special_request.deleteSpecialRequest(specialReqBody.SPECIAL_REQUEST_ID, user_id);
	return http.handleResponse(res,http.OK,http.AppJson);
	
}

processRequest();