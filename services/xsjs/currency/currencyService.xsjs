/****** libs ************/
 $.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var http = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var currency = mapper.getCurrency();

var GET_CURRENCY_BY_ID = "GET_CURRENCY_BY_ID";
var GET_ALL_CURRENCY = "GET_ALL_CURRENCY";

var INS_CURRENCY = "INS_CURRENCY";
var UPD_CURRENCY = "UPD_CURRENCY";
var DEL_CURRENCY = "DEL_CURRENCY";

/******************************************/

function processRequest(){
	http.processRequest(handleGet,handlePost,handlePut,handleDelete);
	}

function handleGet(parameters, user_id) {
    var rdo = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_CURRENCY_BY_ID) {
        	if (parameters[0].value <= 0 || isNaN(parameters[0].value)){
        		throw ErrorLib.getErrors().BadRequest(
                        "",
                        "currencyService/handleGet",
                        "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (must be a valid id)"
                    );
        	} else {
        		rdo = currency.getCurrencyById(parameters[0].value, user_id);
        	}
        	} 
        else if (parameters[0].name === GET_ALL_CURRENCY) {
            rdo = currency.getAllCurrency(user_id);
          
        	} else {
                throw ErrorLib.getErrors().BadRequest(
                        "",
                        "currencyService/handleGet",
                        "invalid parameter name (can be: GET_CURRENCY_BY_ID or GET_ALL_CURRENCY)"
                        );
                }
        }
    else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "currencyService/handleGet",
                "invalid parameter name (can be: GET_CURRENCY_BY_ID or GET_ALL_CURRENCY)"
                );
        }

    return http.handleResponse(rdo, http.OK, http.AppJson);
}

function handlePost(curBody, user_id) {
	var res = currency.insertCurrency(curBody, user_id);
	return http.handleResponse(res, http.OK, http.AppJson);
}

function handlePut(curBody, user_id) {
    var rdo = {};
        rdo = currency.updateCurrency(curBody, user_id);
    return http.handleResponse(rdo, http.OK, http.AppJson);
}

function handleDelete(curBody, user_id) {
	var rdo =  currency.deleteCurrency(curBody.CURRENCY_ID, user_id);
	return http.handleResponse(rdo,http.OK,http.AppJson);
	
}

processRequest();