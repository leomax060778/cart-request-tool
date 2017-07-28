/***************Import Library*******************/
$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var spGetAllBudgetYear = "GET_ALL_BUDGET_YEAR";
var spGetDefaultBudgetYear = "GET_DEFAULT_BUDGET_YEAR";
var spGetBudgetYearNCREnabled = "GET_BUDGET_YEAR_NEW_CART_REQUEST_ENABLED";
var spUdpBudgetYear = "UPD_BUDGET_YEAR";

var GET_BUDGET_YEAR = "GET_BUDGET_YEAR";
var GET_BUDGET_YEAR_ID = "GET_BUDGET_YEAR_ID";
var DEL_BUDGET_YEAR = "DEL_BUDGET_YEAR";

var spGET_HL1_QUANTITY_BY_BUDGET_YEAR_ID = "GET_HL1_QUANTITY_BY_BUDGET_YEAR_ID";

var spInsBudgetYear = "INS_BUDGET_YEAR";
var RESET_ALL_BUDGET_YEAR_DEFAULT_YEAR = "RESET_ALL_BUDGET_YEAR_DEFAULT_YEAR";
var spGET_BUDGET_YEAR_BY_LEVEL_PARENT = "GET_BUDGET_YEAR_BY_LEVEL_PARENT";
var GET_LOCK_FLAG_BY_HL_ID_LEVEL = "GET_LOCK_FLAG_BY_HL_ID_LEVEL";
/******************************************************/


function getAllBudgetYear(){
	var result = db.executeProcedure(spGetAllBudgetYear,{});
	return db.extractArray(result['out_result']);
}

function getDefaultBudgetYear(){
	var result = db.executeProcedure(spGetDefaultBudgetYear,{});
	return db.extractArray(result['out_result']);
}

function getBudgetYearNCREnabled(){
	var result = db.executeProcedure(spGetBudgetYearNCREnabled,{});
	return db.extractArray(result['out_result']);
}

function getBudgetYear(budgetYear){
	var params = {
			"in_budget_year" : budgetYear
	};
	var result = db.executeProcedureManual(GET_BUDGET_YEAR,params);
	return db.extractArray(result['out_result'])[0];
}

function getBudgetYearId(budgetYearid){
	var params = {
		"in_budget_year" : budgetYearid
	};
	var result = db.executeProcedureManual(GET_BUDGET_YEAR_ID,params);
	return db.extractArray(result['out_result'])[0];
}

function updateBudgetYear(budgetYear, userId){
	var params = {
			"start_date" : budgetYear.START_DATE,
			"end_date": budgetYear.END_DATE,
			"default_year": budgetYear.DEFAULT_YEAR,
			"description": budgetYear.DESCRIPTION,
			"modified_user_id": userId,
			"new_cart_request_enabled": budgetYear.NEW_CART_REQUEST_ENABLED,
			"budget_year": budgetYear.BUDGET_YEAR
	};
	
	return db.executeProcedure(spUdpBudgetYear,params);
}

function insertBudgetYear(budgetYear, userId){
	var params = {
		'in_budget_year' : budgetYear.BUDGET_YEAR,
		'in_start_date'  : budgetYear.START_DATE,
		'in_end_date' : budgetYear.END_DATE,
		'in_default_year' : budgetYear.DEFAULT_YEAR,
		'in_description': budgetYear.DESCRIPTION || null,
		'in_new_cart_request_enabled': budgetYear.NEW_CART_REQUEST_ENABLED,
		'in_created_user_id' : userId
	};
	var rdo;
	rdo = db.executeScalar(spInsBudgetYear,params,'out_budget_year_id');

	return rdo;
}

function deleteBudgetYear(budgetYearId, userId){
	var params = {
		'in_budget_year_id' : budgetYearId,
		'in_user_id' : userId
	};
	return db.executeScalar(DEL_BUDGET_YEAR,params,'out_result');
}

function resetAllBudgetYearDefaultYear(budgetYearId, userId){
	var params = {
		'in_budget_year_id' : budgetYearId,
		'in_user_id' : userId
	};
	return db.executeScalarManual(RESET_ALL_BUDGET_YEAR_DEFAULT_YEAR,params,'out_result');
}
