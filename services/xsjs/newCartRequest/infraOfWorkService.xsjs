/****** libs ************/
 $.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var http = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var infrastructure = mapper.getInfraOfWork();

var GET_INFRASTRUCTURE_BY_ID = "GET_INFRASTRUCTURE_BY_ID";
var GET_ALL_INFRASTRUCTURE = "GET_ALL_INFRASTRUCTURE";

var INS_INFRASTRUCTURE = "INS_INFRASTRUCTURE";
var UPD_INFRASTRUCTURE = "UPD_INFRASTRUCTURE";
var DEL_INFRASTRUCTURE = "DEL_INFRASTRUCTURE";

var service_name = "infraOfWorkService";

/******************************************/

function processRequest(){
	http.processRequest3(handleGet,handlePost,handlePut,handleDelete, false, service_name);
	}

function handleGet(parameters, user_id) {
    var rdo = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_INFRASTRUCTURE_BY_ID) {
            rdo = infrastructure.getInfrastructureById(parameters[0].value, user_id);
            
        	} 
        else if (parameters[0].name === GET_ALL_INFRASTRUCTURE) {
            rdo = infrastructure.getAllInfrastructure(user_id);
          
        	}
        }
    else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "infraOfWorkService/handleGet",
                "invalid parameter name (can be: GET_INFRASTRUCTURE_BY_ID or GET_ALL_INFRASTRUCTURE)"
                + parameters[0].name);
        }

    return http.handleResponse(rdo, http.OK, http.AppJson);
}

function handlePost(infraBody, user_id) {
	var res = infrastructure.insertInfrastructure(infraBody, user_id);
	return http.handleResponse(res, http.OK, http.AppJson);
}

function handlePut(infraBody, user_id) {
    var rdo = {};
        rdo = infrastructure.updateInfrastructure(infraBody, user_id);
    return http.handleResponse(rdo, http.OK, http.AppJson);
}

function handleDelete(infraBody, user_id) {
	var rdo =  infrastructure.deleteInfrastructure(infraBody.INFRASTRUCTURE_ID, user_id);
	return http.handleResponse(rdo,http.OK,http.AppJson);
	
}

processRequest();