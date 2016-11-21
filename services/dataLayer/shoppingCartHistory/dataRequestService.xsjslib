$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */


//STORE PROCEDURE LIST NAME
var GET_REQUEST_SERVICE_BY_REQUEST_ID = "GET_REQUEST_SERVICE_BY_REQUEST_ID";
var GET_ALL_REQUEST_SERVICE = "GET_ALL_REQUEST_SERVICE";
var DEL_REQUEST_SERVICE_BY_REQUEST_ID = "DEL_REQUEST_SERVICE_BY_REQUEST_ID";

function getRequestServiceByRequestId(in_request_id){
	
	var parameters = {};
	
	parameters.in_request_id = in_request_id; 
	parameters.out_result = '?';
	
	var result = db.executeProcedureManual(GET_REQUEST_SERVICE_BY_REQUEST_ID, parameters);
	return db.extractArray(result.out_result);
}

function getAllRequestService(){
	
	var parameters = {};
	parameters.out_result = '?';
	
	var result = db.executeProcedure(GET_ALL_REQUEST_SERVICE, parameters);
	return db.extractArray(result.out_result);
}

function deleteRequestServiceByRequestId(requestId, userId){
	var parameters = {};
	
	parameters.in_request_id = requestId;
	parameters.in_modified_user_id = userId;
	parameters.out_result = '?';
	
	return db.executeScalar(DEL_REQUEST_SERVICE_BY_REQUEST_ID, parameters, 'out_result');
}