/****** libs ************/
 $.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var http = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var location = mapper.getLocOfWork();

var GET_LOCATION_BY_ID = "GET_LOCATION_BY_ID";
var GET_ALL_LOCATION = "GET_ALL_LOCATION";

var INS_LOCATION = "INS_LOCATION";
var UPD_LOCATION = "UPD_LOCATION";
var DEL_LOCATION = "DEL_LOCATION";

var service_name = "locOfWorkService";

/******************************************/

function processRequest(){
	http.processRequest(handleGet,handlePost,handlePut,handleDelete, false, service_name);
	}

function handleGet(parameters, user_id) {
    var rdo = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_LOCATION_BY_ID) {
            rdo = location.getLocationById(parameters[0].value, user_id);
            
        	} 
        else if (parameters[0].name === GET_ALL_LOCATION) {
            rdo = location.getAllLocation(user_id);
          
        	}
        }
    else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "locOfWorkService/handleGet",
                "invalid parameter name (can be: GET_LOCATION_BY_ID or GET_ALL_LOCATION)"
                + parameters[0].name);
        }

    return http.handleResponse(rdo, http.OK, http.AppJson);
}

function handlePost(locBody, user_id) {
	var res = location.insertLocation(locBody, user_id);
	return http.handleResponse(res, http.OK, http.AppJson);
}

function handlePut(locBody, user_id) {
    var rdo = {};
        rdo = location.updateLocation(locBody, user_id);
    return http.handleResponse(rdo, http.OK, http.AppJson);
}

function handleDelete(locBody, user_id) {
	var rdo =  location.deleteLocation(locBody.LOCATION_ID, user_id);
	return http.handleResponse(rdo,http.OK,http.AppJson);
	
}

processRequest();