$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */


//STORE PROCEDURE LIST NAME
var GET_ALL_REQUEST = "GET_ALL_REQUEST";
var GET_REQUEST_BY_ID = "GET_REQUEST_BY_ID";
var GET_REQUEST_BY_FILTERS = "GET_REQUEST_BY_FILTERS";
var UPD_REQUEST_STATUS = "UPD_REQUEST_STATUS";
var UPD_REQUEST = "UPD_REQUEST";
var DEL_REQUEST = "DEL_REQUEST";
var DEL_REQUEST_DATA_PROTECTION_ANSWERS_BY_REQUEST_ID = "DEL_REQUEST_DATA_PROTECTION_ANSWERS_BY_REQUEST_ID";
var GET_ATTACHMENT_BY_REQUEST_ID = "GET_ATTACHMENT_BY_REQUEST_ID";
var DEL_ATTACHMENT_REQUEST = "DEL_ATTACHMENT_REQUEST";

function getAllRequest(){
    var param = {};
    param.out_result = '?';
    var result = db.executeProcedureManual(GET_ALL_REQUEST, param);
    return db.extractArray(result.out_result);
}

function getRequestByFilters(objFilters){
    var parameters = {};
    parameters.in_goods_recipient = objFilters.GOODS_RECIPIENT;
    parameters.in_team_id = objFilters.TEAM_ID;
    parameters.in_request_date_from = objFilters.REQUEST_DATE_FROM;
    parameters.in_request_date_to = objFilters.REQUEST_DATE_TO;
    parameters.in_user_id = objFilters.USER_ID;
    parameters.in_vendor_id = objFilters.VENDOR_ID;
    parameters.in_status_id = objFilters.STATUS_ID;
    parameters.out_result = '?';
    var result = db.executeProcedureManual(GET_REQUEST_BY_FILTERS, parameters);
    return db.extractArray(result.out_result);
}

function getRequestById(requestId){
    var parameters = {};
    parameters.in_request_id = requestId;
    parameters.out_result = '?';
    var result = db.executeProcedure(GET_REQUEST_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

function getRequestByIdManual(requestId){
    var parameters = {};
    parameters.in_request_id = requestId;
    parameters.out_result = '?';
    var result = db.executeProcedureManual(GET_REQUEST_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

/*
	IN in_request_id bigint,
	IN in_user_id bigint,
	IN in_team_id bigint,
	IN in_entity_id bigint,
	
	IN in_vendor_id bigint,
	IN in_stage_id bigint,
	IN in_status_id bigint,
	
	IN in_goods_recipient_username nvarchar(127),
	IN in_data_protection_enabled tinyint,
	IN in_infrastructure_of_work_id bigint,
	IN in_location_of_work_id bigint, 
 */

function updateRequestManual(objRequest, userId){
    var parameters = {};
    parameters.in_request_id = objRequest.REQUEST_ID;
    parameters.in_user_id = objRequest.USER_ID;
    parameters.in_team_id = objRequest.TEAM_ID;
    parameters.in_entity_id = objRequest.ENTITY_ID;
    parameters.in_material_id = objRequest.MATERIAL_ID;
    parameters.in_vendor_id = objRequest.VENDOR_ID;
    parameters.in_non_sap_vendor_id = objRequest.NON_SAP_VENDOR_ID;
    parameters.in_stage_id = 1; //objRequest.STAGE_ID;
    parameters.in_goods_recipient_username = objRequest.GOODS_RECIPIENT_USERNAME;
    parameters.in_data_protection_enabled = objRequest.DATA_PROTECTION_ENABLED;
    parameters.in_infrastructure_of_work_id = objRequest.INFRASTRUCTURE_OF_WORK_ID;
    parameters.in_location_of_work_id = objRequest.LOCATION_OF_WORK_ID;
    
    parameters.in_modified_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalar(UPD_REQUEST, parameters, 'out_result');
}

function updateRequestStatus(objRequest, userId){
    var parameters = {};
    parameters.in_request_id = objRequest.REQUEST_ID;
    parameters.in_status_id = objRequest.STATUS_ID;
    parameters.in_modified_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalar(UPD_REQUEST_STATUS, parameters, 'out_result');
}

function deleteRequest(request_id, user_id){
	var parameters = {};
	parameters.in_request_id = request_id;
	parameters.in_modified_user_id = user_id;
	parameters.out_result = '?';
		
	return db.executeScalarManual(DEL_REQUEST, parameters, 'out_result');

}

function deleteRequestDataProtectionAnswersByRequestId(requestId, userId){
	var parameters = {};
	parameters.in_request_id = requestId;
	parameters.in_modified_user_id = userId;
	parameters.out_result = '?';
	
	return db.executeScalarManual(DEL_REQUEST_DATA_PROTECTION_ANSWERS_BY_REQUEST_ID, parameters, 'out_result');
}

function getAttachmentByRequestId(requestId, userId){
	var parameters = {};
    parameters.in_request_id = requestId;
    parameters.out_result = '?';
    
    var result = db.executeProcedureManual(GET_ATTACHMENT_BY_REQUEST_ID, parameters);
    return db.extractArray(result.out_result);
}

function deleteAttachmentRequest(requestId, userId){
	var parameters = {};
	parameters.in_request_id = requestId;
	parameters.in_modified_user_id = userId;
	parameters.out_result = '?';
	
	return db.executeScalarManual(DEL_ATTACHMENT_REQUEST, parameters, 'out_result');
}