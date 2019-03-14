$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_REPORT = "GET_REPORT";
var GET_REPORT_BY_USER_ID = "GET_REPORT_BY_USER_ID";
var GET_REPORT_BY_TEAM = "GET_REPORT_BY_TEAM";
var GET_REPORT_TYPE = "GET_REPORT_TYPE_BY_USER_ROLE";
var GET_USER_REPORT = "GET_USER_REPORT";
var GET_VENDOR_REPORT = "GET_VENDOR_REPORT";
var GET_CATALOG_REPORT = "GET_CATALOG_REPORT";
var GET_COMMODITY_REPORT = "GET_COMMODITY_REPORT";

function getReport(userId) {
    return db.extractArray(db.executeProcedure(GET_REPORT, {'in_user_id': userId}).out_result);
}

function getReportByUserId(userId) {
    return db.extractArray(db.executeProcedure(GET_REPORT_BY_USER_ID, {'in_user_id': userId}).out_result);
}

function getReportByTeam(userId) {
    return db.extractArray(db.executeProcedure(GET_REPORT_BY_TEAM, {'in_user_id': userId}).out_result);
}

function getUserReport() {
    return db.extractArray(db.executeProcedure(GET_USER_REPORT, {}).out_result);
}

function getVendorReport() {
    return db.extractArray(db.executeProcedure(GET_VENDOR_REPORT, {}).out_result);
}

function getCatalogReport() {
    return db.extractArray(db.executeProcedure(GET_CATALOG_REPORT, {}).out_result);
}

function getCommodityReport() {
    return db.extractArray(db.executeProcedure(GET_COMMODITY_REPORT, {}).out_result);
}

function getReportType(userId){
    return db.extractArray(db.executeProcedure(GET_REPORT_TYPE, {'in_user_id': userId}).out_result);
}