$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_ALL_REQUEST_PROCESSING_REPORT = "GET_ALL_REQUEST_PROCESSING_REPORT";
var GET_REQUEST_PROCESSING_REPORT_BY_ID = "GET_REQUEST_PROCESSING_REPORT_BY_ID";
var GET_REQUEST_DATA_PROTECTION = "GET_REQUEST_DATA_PROTECTION_ANSWER_BY_REQUEST_ID"; 
var UPD_REQUEST_STATUS = "UPD_REQUEST_STATUS";
var GET_REQUEST_SERVICE_MAIL_DATA_BY_REQUEST_ID = "GET_REQUEST_SERVICE_MAIL_DATA_BY_REQUEST_ID";

function getAllRequest(userId) {
    var parameters = {'in_user_id': userId};
    var result = db.executeProcedure(GET_ALL_REQUEST_PROCESSING_REPORT, parameters);
    return db.extractArray(result.out_result);
}

function getRequestById(requestId) {
    var parameters = {'in_request_id': requestId};
    var result = db.executeProcedure(GET_REQUEST_PROCESSING_REPORT_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

function getRequestByIdManual(requestId) {
    var parameters = {'in_request_id': requestId};
    var result = db.executeProcedureManual(GET_REQUEST_PROCESSING_REPORT_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

function getRequestDataProtection(requestId) {
    var parameters = {'in_request_id': requestId};
    var result = db.executeProcedureManual(GET_REQUEST_DATA_PROTECTION, parameters);
    return db.extractArray(result.out_result);
}

function updateRequestStatus(objRequest, userId) {
     var parameters = {};
     parameters.in_request_id = objRequest.REQUEST_ID;
     parameters.in_status_id = objRequest.STATUS_ID;
     parameters.in_modified_user_id = userId;
     parameters.in_previous_status_id = objRequest.PREVIOUS_STATUS_ID;
     parameters.in_stage_id = objRequest.STAGE_ID;
     parameters.out_result = '?';
     return db.executeScalar(UPD_REQUEST_STATUS, parameters, 'out_result');
}

function updateRequestStatusManual(objRequest, userId) {
    var parameters = {};
    parameters.in_request_id = objRequest.REQUEST_ID;
    parameters.in_status_id = objRequest.STATUS_ID;
    parameters.in_modified_user_id = userId;
    parameters.in_previous_status_id = objRequest.PREVIOUS_STATUS_ID;
    parameters.in_stage_id = objRequest.STAGE_ID;
    parameters.out_result = '?';
    return db.executeScalarManual(UPD_REQUEST_STATUS, parameters, 'out_result');
}

function getRequestMailDataByRequestId(objRequest){
	var params = {};
	params.in_request_id = objRequest.REQUEST_ID;
	params.out_result = '?';
	var result = db.executeProcedureManual(GET_REQUEST_SERVICE_MAIL_DATA_BY_REQUEST_ID, params);
    return db.extractArray(result.out_result);
}

