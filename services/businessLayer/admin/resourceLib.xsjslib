/** *************Import Library****************** */
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var data = mapper.getDataResource();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
/** ********************************************** */

function getAllResource() {
	return data.getAllResource();
}