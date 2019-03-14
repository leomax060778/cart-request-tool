/** *************Import Library****************** */
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ********************************************** */

var SEARCH_PERSONAL_DATA = "SEARCH_PERSONAL_DATA";

/** *************************************************** */

function searchPersonalData(objPersonalData) {
    var parameters = {};
    parameters.in_search_criteria = objPersonalData.SEARCH_CRITERIA;
    var result = db.executeProcedure(SEARCH_PERSONAL_DATA, parameters);
    return db.extractArray(result.out_result);
}