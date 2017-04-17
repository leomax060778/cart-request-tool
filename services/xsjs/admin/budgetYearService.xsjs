$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var budgetYear = mapper.getBudgetYear();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_BUDGET_YEAR = "GET_ALL_BUDGET_YEAR";
var GET_DEFAULT_BUDGET_YEAR = "GET_DEFAULT_BUDGET_YEAR";

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
        } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "budgetYearService/handleGet",
                "invalid parameter name " + parameters[0].name + " (can be: GET_ALL_BUDGET_YEAR or GET_DEFAULT_BUDGET_YEAR)"
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
	return httpUtil.notImplementedMethod();
}


function handleDelete(reqBody, userId) {
	return httpUtil.notImplementedMethod();
}


function handlePost(reqBody, userId) {
	return httpUtil.notImplementedMethod();
}

processRequest();