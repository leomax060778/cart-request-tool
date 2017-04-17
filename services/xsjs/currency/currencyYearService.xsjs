/****** libs ************/
 $.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var http = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var currency = mapper.getCurrency();

/******************************************/

var service_name = "currencyYearService";

function processRequest(){
	http.processRequest(handleGet,handlePost,handlePut,handleDelete, false, service_name);
	}

//Not implemented method
function handleGet() {
	return http.notImplementedMethod();
}

function handlePost(curBody) {
    var res = currency.getCurrencyByYearFilter(curBody); 
	return http.handleResponse(res, http.OK, http.AppJson);
}

//Not implemented method
function handlePut() {
	return http.notImplementedMethod();
}

//Not implemented method
function handleDelete() {
	return http.notImplementedMethod();
}

processRequest();