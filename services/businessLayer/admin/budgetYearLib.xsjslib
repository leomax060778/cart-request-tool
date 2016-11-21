/***************Import Library*******************/
$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dbBudget = mapper.getDataBudgetYear();
/*************************************************/



function getAllBudgetYear(){
	return dbBudget.getAllBudgetYear();
}

function getDefaultBudgetYear(){
	return dbBudget.getDefaultBudgetYear();
}

function updateBudgetYear(budgetYear){
	return dbBudget.updateBudgetYear(budgetYear);
}