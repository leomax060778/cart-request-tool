/***************Import Library*******************/
$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataApp = mapper.getDataApplication();

/*************************************************/

function getApplicationInfo() {
	return dataApp.getApplicationInfo();
}