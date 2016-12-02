$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_REPORT = "GET_REPORT";

function getReport() {
    var result = db.extractArray(db.executeProcedure(GET_REPORT, {}).out_result);
    return result;
}