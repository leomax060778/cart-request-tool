$.import("xscartrequesttool.services.commonLib", "mapper");
$.import("xscartrequesttool.services.commonLib", "httpLib");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpLib = $.xscartrequesttool.services.commonLib.httpLib;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_ALL_CURRENCY = "GET_ALL_CURRENCY";
var GET_CURRENCY_BY_ID = 'GET_CURRENCY_BY_ID';
var GET_CURRENCY_CONVERSION_RATE = "GET_CURRENCY_CONVERSION_RATE";
var INS_CURRENCY = 'INS_CURRENCY';
var UPD_CURRENCY = 'UPD_CURRENCY';
var DEL_CURRENCY = 'DEL_CURRENCY';

//Get all currency
function getAllCurrency() {
    var parameters = {};
    var result = db.executeProcedure(GET_ALL_CURRENCY, parameters);
    return db.extractArray(result.out_result);
}

function getCurrencyById (currency_id){
	
	var param = {};
	param.in_currency_id = currency_id;
	param.out_result = '?';
	
	var result = db.executeProcedure(GET_CURRENCY_BY_ID, param);
	return db.extractArray(result.out_result);
}

function getManualCurrencyById(currency_id){
	
	var param = {};
	param.in_currency_id = currency_id;
	param.out_result = '?';
	
	var result = db.executeProcedureManual(GET_CURRENCY_BY_ID, param);
	return db.extractArray(result.out_result);
}

function getManualCurrencyConversionRate(currency_id){
	
	var param = {};
	param.in_currency_id = currency_id;
	param.out_result = '?';
	
	var result = db.executeProcedureManual(GET_CURRENCY_CONVERSION_RATE, param);
	return db.extractArray(result.out_result);
}

function insertCurrency(objCurrency, user_id){
	var param = {};
	param.in_country = objCurrency.COUNTRY;
	param.in_name = objCurrency.NAME;
	param.in_abbreviation = objCurrency.ABBREVIATION;
	param.in_conversion_rate = objCurrency.CONVERSION_RATE;
	param.in_currency_year = objCurrency.CURRENCY_YEAR;
	param.in_created_user_id = user_id;
	param.out_result = '?';
	
	return db.executeScalar(INS_CURRENCY, param, 'out_result');
}

function updateCurrency(objCurrency, user_id){
	var param = {};
	param.in_currency_id = objCurrency.CURRENCY_ID;
	param.in_country = objCurrency.COUNTRY;
	param.in_name = objCurrency.NAME;
	param.in_abbreviation = objCurrency.ABBREVIATION;
	param.in_conversion_rate = objCurrency.CONVERSION_RATE;
	param.in_currency_year = objCurrency.CURRENCY_YEAR;
	param.in_modified_user_id = user_id;
	param.out_result = '?';
	
	return db.executeScalarManual(UPD_CURRENCY, param, 'out_result');
	 
}

function deleteCurrency(currency_id, user_id){
	var param = {};
	param.in_currency_id = currency_id;
	param.in_modified_user_id = user_id;
	param.out_result = '?';
	
	return db.executeScalarManual(DEL_CURRENCY, param, 'out_result');
}