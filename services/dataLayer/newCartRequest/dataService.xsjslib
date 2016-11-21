$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */


//STORE PROCEDURE LIST NAME
var INS_SERVICE = "INS_SERVICE";
var DEL_SERVICE_BY_REQUEST_ID = "DEL_SERVICE_BY_REQUEST_ID";
var GET_SERVICE_BY_REQUEST_ID = "GET_SERVICE_BY_REQUEST_ID";
var GET_SERVICE_BY_ID = "GET_SERVICE_BY_ID";
var UPD_SERVICE = "UPD_SERVICE";

function insertService(objReq, user_id){
	var parameters = {};
	parameters.in_request_id = objReq.REQUEST_ID; 
	parameters.in_start_date = objReq.START_DATE; 
	parameters.in_end_date = objReq.END_DATE;
	parameters.in_description = objReq.DESCRIPTION;
	parameters.in_amount = objReq.AMOUNT;
	parameters.in_currency_id = objReq.CURRENCY_ID;
	parameters.in_budget = objReq.BUDGET;
	parameters.in_item = objReq.ITEM;
	parameters.in_created_user_id = user_id;
	parameters.out_result = '?';
	
	return db.executeScalarManual(INS_SERVICE, parameters, 'out_result');
}

function deleteServiceByRequestId(request_id, user_id){
	var params = {};
	params.in_request_id = request_id;
	params.in_modified_user_id = user_id;
	params.out_result = '?';
	return db.executeScalarManual(DEL_SERVICE_BY_REQUEST_ID, params, 'out_result');
}

function getServiceByRequestId(requestId){
	var parameters = {};
	parameters.in_request_id = requestId; 
	parameters.out_result = '?';
	var result = db.executeProcedureManual(GET_SERVICE_BY_REQUEST_ID, parameters);
	return db.extractArray(result.out_result);
}

function getServiceById(serviceId){
	var parameters = {};
	parameters.in_service_id = serviceId; 
	parameters.out_result = '?';
	var result = db.executeProcedureManual(GET_SERVICE_BY_ID, parameters);
	var list = db.extractArray(result.out_result);
	  if(list.length){
		   return list[0];
	  } else {
		   	return {};
	  }
}

function updateService(objService, userId){
	var parameters = {};
	parameters.in_service_id = objService.SERVICE_ID;
	parameters.in_line_number = objService.LINE_NUMBER;
	parameters.in_modified_user_id = userId;
	parameters.out_result = '?';
	return db.executeScalarManual(UPD_SERVICE, parameters, 'out_result');
}