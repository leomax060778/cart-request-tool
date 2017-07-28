$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var budgetYear = mapper.getBudgetYear();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_BUDGET_YEAR = "GET_ALL_BUDGET_YEAR";
var GET_DEFAULT_BUDGET_YEAR = "GET_DEFAULT_BUDGET_YEAR";
var GET_BUDGET_YEAR_NEW_CART_REQUEST_ENABLED = "GET_BUDGET_YEAR_NEW_CART_REQUEST_ENABLED";

var service_name = "budgetYearService";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

function handleGet(parameters) {
    var rdo = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_ALL_BUDGET_YEAR) {
            rdo = budgetYear.getAllBudgetYear(parameters[0].value);
        } else if (parameters[0].name === GET_DEFAULT_BUDGET_YEAR) {
            rdo = budgetYear.getDefaultBudgetYear(parameters[0].value);
        } else if (parameters[0].name === GET_BUDGET_YEAR_NEW_CART_REQUEST_ENABLED) {
            rdo = budgetYear.getBudgetYearNCREnabled(parameters[0].value);
        } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "budgetYearService/handleGet",
                "invalid parameter name " + parameters[0].name + " (can be: GET_ALL_BUDGET_YEAR or GET_DEFAULT_BUDGET_YEAR or GET_BUDGET_YEAR_NEW_CART_REQUEST_ENABLED)"
            );
        }
    } else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "budgetYearService/handleGet",
            "invalid parameter (can be: GET_ALL_BUDGET_YEAR)"
        );
    }
    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handlePut(reqBody, userId) {
	var rdo = budgetYear.updateBudgetYear(reqBody, userId);
	return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
}

function handleDelete(reqBody, userId){
	var result = budgetYear.deleteBudgetYear(reqBody, userId);
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

function handlePost(reqBody, userId){
	var result = budgetYear.insertBudgetYear(reqBody, userId);
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

processRequest();