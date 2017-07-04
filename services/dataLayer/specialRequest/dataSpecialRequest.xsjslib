$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_SPECIAL_REQUEST = 'GET_ALL_SPECIAL_REQUEST';
var GET_SPECIAL_REQUEST_BY_ID = 'GET_SPECIAL_REQUEST_BY_ID';
var INS_SPECIAL_REQUEST = 'INS_SPECIAL_REQUEST';
var UPD_SPECIAL_REQUEST = 'UPD_SPECIAL_REQUEST';
var DEL_SPECIAL_REQUEST = 'DEL_SPECIAL_REQUEST';
var DEL_SPECIAL_REQUEST_BY_REQUEST_ID = "DEL_SPECIAL_REQUEST_BY_REQUEST_ID"; 
var GET_SPECIAL_REQUEST_BY_REQUEST_ID = "GET_SPECIAL_REQUEST_BY_REQUEST_ID";

function getAllSpecialRequest(){
	var param = {};
	param.out_result = '?';
	var result = db.executeProcedure(GET_ALL_SPECIAL_REQUEST, param);
	return db.extractArray(result.out_result);
}

function getSpecialRequestById(special_request_id){
	
	var param = {};
	param.in_special_request_id = special_request_id;
	param.out_result = '?';
	
	var result = db.executeProcedure(GET_SPECIAL_REQUEST_BY_ID, param);
	return db.extractArray(result.out_result);
}

function getSpecialRequestByRequestId(request_id){
	
	var param = {};
	param.in_request_id = request_id;
	param.out_result = '?';
	
	var result = db.executeProcedureManual(GET_SPECIAL_REQUEST_BY_REQUEST_ID, param);
	return db.extractArray(result.out_result);
}

function getManualSpecialRequestById(special_request_id){
	
	var param = {}; 
	param.in_special_request_id = special_request_id;
	param.out_result = '?';
	
	var result = db.executeProcedureManual(GET_SPECIAL_REQUEST_BY_ID, param);
	return db.extractArray(result.out_result);
}

function insertSpecialRequest(objSpecialRequest, user_id){
	var param = {};
	param.in_request_id = objSpecialRequest.REQUEST_ID;
	param.in_material_description = objSpecialRequest.MATERIAL_DESCRIPTION;
	param.in_material_code = objSpecialRequest.MATERIAL_CODE;
	param.in_item = objSpecialRequest.ITEM;
	param.in_start_date = objSpecialRequest.START_DATE;
	param.in_end_date = objSpecialRequest.END_DATE;
	param.in_unit_price = objSpecialRequest.UNIT_PRICE;
	param.in_quantity = objSpecialRequest.QUANTITY;
	param.in_currency_id = objSpecialRequest.CURRENCY_ID;
	param.in_vendor_text = objSpecialRequest.VENDOR_TEXT;
	param.in_unit = objSpecialRequest.UNIT;
	param.in_amount = objSpecialRequest.AMOUNT;
	param.in_budget = objSpecialRequest.BUDGET;
	param.in_created_user_id = user_id;
	param.out_result = '?';
	
	return db.executeScalarManual(INS_SPECIAL_REQUEST, param, 'out_result');
}

function updateSpecialRequest(objSpecialRequest, user_id){
	var param = {};
	param.in_special_request_id = objSpecialRequest.SPECIAL_REQUEST_ID;
	param.in_material_description = objSpecialRequest.MATERIAL_DESCRIPTION;
	param.in_material_code = objSpecialRequest.MATERIAL_CODE;
	param.in_item = objSpecialRequest.ITEM;
	param.in_start_date = objSpecialRequest.START_DATE;
	param.in_end_date = objSpecialRequest.END_DATE;
	param.in_unit_price = objSpecialRequest.UNIT_PRICE;
	param.in_quantity = objSpecialRequest.QUANTITY;
	param.in_currency_id = objSpecialRequest.CURRENCY_ID;
	param.in_vendor_text = objSpecialRequest.VENDOR_TEXT;
	param.in_unit = objSpecialRequest.UNIT;
	param.in_amount = objSpecialRequest.AMOUNT;
	param.in_budget = objSpecialRequest.BUDGET;
	param.in_modified_user_id = user_id;
	param.out_result = '?';
	
	return db.executeScalarManual(UPD_SPECIAL_REQUEST, param, 'out_result');

}

function deleteSpecialRequest(special_request_id, user_id){
	var param = {};
	param.in_special_request_id = special_request_id;
	param.in_modified_user_id = user_id;
	param.out_result = '?';
	
	return db.executeScalarManual(DEL_SPECIAL_REQUEST, param, 'out_result');
}

function deleteSpecialRequestByRequestId(request_id, user_id){
	var param = {};
	param.in_request_id = request_id;
	param.in_modified_user_id = user_id;
	param.out_result = '?';
	
	return db.executeScalarManual(DEL_SPECIAL_REQUEST_BY_REQUEST_ID, param, 'out_result');
}