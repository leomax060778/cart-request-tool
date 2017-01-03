$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_REPORT = "GET_REPORT";
var GET_REPORT_TYPE = "GET_REPORT_TYPE_BY_USER_ROLE";

function getReport(userId) {
    var result = db.extractArray(db.executeProcedure(GET_REPORT, {'in_user_id': userId}).out_result);
    return result;
}

function getReportType(userId){
	var result = db.extractArray(db.executeProcedure(GET_REPORT_TYPE, {'in_user_id': userId}).out_result);
	return result;
}