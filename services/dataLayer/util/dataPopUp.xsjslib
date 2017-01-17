$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_POP_UP = 'GET_ALL_POP_UP';
var GET_POP_UP_BY_ID = 'GET_POP_UP_BY_ID';
var GET_POP_UP_BY_CODE = 'GET_POP_UP_BY_CODE';
var UPD_POP_UP = 'UPD_POP_UP';
var DEL_POP_UP = 'DEL_POP_UP';

function getPopUpByCode(popUpCode){
	var param = {};
	param.out_result = '?';
	param.in_code = popUpCode;

	var result = db.executeProcedure(GET_POP_UP_BY_CODE, param);
	return db.extractArray(result.out_result);
}

function getManualPopUpByCode(popUpCode){
	var param = {};
	param.out_result = '?';
	param.in_code = popUpCode;

	var result = db.executeProcedureManual(GET_POP_UP_BY_CODE, param);
	return db.extractArray(result.out_result);
}

function getAllPopUp(){
	var param = {};
	param.out_result = '?';
	var result = db.executeProcedure(GET_ALL_POP_UP, param);
	return db.extractArray(result.out_result);
}

function getPopUpById(pop_up_id){
	
	var param = {};
	param.in_pop_up_id = pop_up_id;
	param.out_result = '?';
	
	var result = db.executeProcedure(GET_POP_UP_BY_ID, param);
	return db.extractArray(result.out_result);
}

function getManualPopUpById(pop_up_id){
	
	var param = {}; 
	param.in_pop_up_id = pop_up_id;
	param.out_result = '?';
	
	var result = db.executeProcedureManual(GET_POP_UP_BY_ID, param);
	return db.extractArray(result.out_result);
}

function updatePopUp(objPopUp, user_id){
	var param = {};
	param.in_pop_up_id = objPopUp.POP_UP_ID;
	param.in_name = objPopUp.POP_UP_NAME;
	param.in_content = objPopUp.CONTENT;
	param.in_modified_user_id = user_id;
	param.out_result = '?';
	
	return db.executeScalarManual(UPD_POP_UP, param, 'out_result');

}

function deletePopUp(pop_up_id, user_id){
	var param = {};
	param.in_pop_up_id = pop_up_id;
	param.in_modified_user_id = user_id;
	param.out_result = '?';
	
	return db.executeScalarManual(DEL_POP_UP, param, 'out_result');
}