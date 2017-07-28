/***************Import Library*******************/
$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dbBudget = mapper.getDataBudgetYear();
var util = mapper.getUtil();

/*************************************************/

var BUDGET_YEAR_NOT_FOUND = "The Budget Year can not be found.";
var DELETE_DEFAULT_BUDGET_YEAR = "Cannot delete a default Budget Year.";
var MSG_ID_NOT_FOUND = "The Parameter ID is not found";
var BUDGET_YEAR_IS_USED = "Cannot delete the current Budget Year because it is used.";
var MSG_MISSING_DATA = "Data is missing.";
var MSG_BUDGET_YEAR_NOT_FOUND = "Budget Year not found.";
var MSG_INVALID_BUDGET_YEAR = "Another Budget Year with the same year already exist.";
var MSG_ACTUAL_START_DATE_NOT_FOUND = "Invalid Budget Year ACTUAL START DATE.";
var MSG_ACTUAL_END_DATE_NOT_FOUND = "Invalid Budget Year ACTUAL END DATE.";

var MSG_INVALID_DATE_RANGE = "Invalid Budget Year DATE RANGE.";
var MSG_DATE_RANGE_OVERLAPPING = "Date range is overlapped with another Budget Year date range.";

var map = {
	"in_budget_year_id": "BUDGET_YEAR_ID",
	"in_budget_year":  "BUDGET_YEAR",
	"in_start_date":  "START_DATE",
	"in_end_date":  "END_DATE",
	"in_default_year":  "DEFAULT_YEAR",
	"in_description":  "DESCRIPTION"
};


function getAllBudgetYear(){
	return dbBudget.getAllBudgetYear();
}

function getDefaultBudgetYear(){
	return dbBudget.getDefaultBudgetYear();
}

function getBudgetYearNCREnabled(){
	return dbBudget.getBudgetYearNCREnabled();
}

function updateBudgetYear(budgetYear, userId){
	budgetYear.NEW_CART_REQUEST_ENABLED = (budgetYear.NEW_CART_REQUEST_ENABLED)? 1:0;
	budgetYear.DEFAULT_YEAR = (budgetYear.DEFAULT_YEAR)? 1:0;
	
	if(Number(budgetYear.DEFAULT_YEAR)){
		dbBudget.resetAllBudgetYearDefaultYear(0, userId);
	}
		
	return dbBudget.updateBudgetYear(budgetYear, userId);
}

function checkDefautBudgetYear(budgetYear) {
	return budgetYear.DEFAULT_YEAR === 1;
}

function insertBudgetYear(budgetYear, userId){

	validate(budgetYear);

	if(Number(budgetYear.DEFAULT_YEAR)){
		dbBudget.resetAllBudgetYearDefaultYear(0, userId);
	}
	
	budgetYear.NEW_CART_REQUEST_ENABLED =  (budgetYear.NEW_CART_REQUEST_ENABLED) ? 1: 0;
	budgetYear.DEFAULT_YEAR =  (budgetYear.DEFAULT_YEAR) ? 1: 0;
	
	return dbBudget.insertBudgetYear(budgetYear, userId);
}

function deleteBudgetYear(budgetYear, userId){
	var budgetYearId = Number(budgetYear.BUDGET_YEAR_ID);
	if (!budgetYearId)
		throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found", "budgetYearServices/handleDelete/deleteBudgetYear", BUDGET_YEAR_NOT_FOUND);
	
	var budget = getDefaultBudgetYear();
	
	if(Number(budget[0].BUDGET_YEAR_ID) === budgetYearId){
		throw ErrorLib.getErrors().BadRequest("A default budget year cannot be deleted", "budgetYearServices/handleDelete/deleteBudgetYear", DELETE_DEFAULT_BUDGET_YEAR);
	}
	
	return dbBudget.deleteBudgetYear(budgetYearId, userId);
}

function validate(data){
	if (!data)
		throw ErrorLib.getErrors().CustomError("", "budgetYearServices/handlePost/validateBudgetYearData", MSG_MISSING_DATA);

	if(!data.BUDGET_YEAR)
		throw ErrorLib.getErrors().CustomError("", "budgetYearServices/handlePost/validateBudgetYearData", MSG_BUDGET_YEAR_NOT_FOUND);

	if(existOtherBudgetYear(data))
		throw ErrorLib.getErrors().CustomError("", "budgetYearServices/handlePost/validateBudgetYearData", MSG_INVALID_BUDGET_YEAR);

	if(!data.START_DATE)
		throw ErrorLib.getErrors().CustomError("", "budgetYearServices/handlePost/validateBudgetYearData", MSG_ACTUAL_START_DATE_NOT_FOUND);

	if(!data.END_DATE)
		throw ErrorLib.getErrors().CustomError("", "budgetYearServices/handlePost/validateBudgetYearData", MSG_ACTUAL_END_DATE_NOT_FOUND);

	if(util.validateDateEndMayorStart((new Date(data.START_DATE)),(new Date(data.END_DATE))))
		throw ErrorLib.getErrors().CustomError("", "budgetYearServices/handlePost/validateBudgetYearData",  MSG_INVALID_DATE_RANGE);

	data.DESCRIPTION = data.DESCRIPTION || null;

	return data;
}

function existOtherBudgetYear(data){
	var budgetYear = dbBudget.getBudgetYear(data.BUDGET_YEAR);
	return budgetYear && budgetYear.BUDGET_YEAR_ID != data.BUDGET_YEAR_ID;
}

function overlappingDates(data){
	var allBudgetYear = getAllBudgetYear();
	var isOrverLappeing = 0;
	allBudgetYear.forEach(function(budgetYear){
		if(!(new Date(data.START_DATE).valueOf() < new Date(budgetYear.START_DATE).valueOf()
			&& new Date(data.END_DATE).valueOf() < new Date(budgetYear.START_DATE).valueOf())
			&& !(new Date(data.START_DATE).valueOf() > new Date(budgetYear.END_DATE).valueOf()
			&& new Date(data.END_DATE).valueOf() > new Date(budgetYear.END_DATE).valueOf())
			&& budgetYear.BUDGET_YEAR_ID != data.BUDGET_YEAR_ID){

			++isOrverLappeing;
		}
	});

	return !!isOrverLappeing;
}