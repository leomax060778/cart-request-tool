$.import("xscartrequesttool.services.commonLib", "mapper");
$.import("xscartrequesttool.services.commonLib", "httpLib");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpLib = $.xscartrequesttool.services.commonLib.httpLib;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_ALL_COUNTRY = "GET_ALL_COUNTRY";
var GET_COUNTRY_BY_ID = "GET_COUNTRY_BY_ID";

//Get all countries
function getAllCountry() {
    var parameters = {};
    var result = db.executeProcedure(GET_ALL_COUNTRY, parameters);
    return db.extractArray(result.out_result);
}

function getCountryById(countryId) {
    var parameters = {};
    parameters.in_country_id = countryId;
    
    var result = db.executeProcedure(GET_COUNTRY_BY_ID, parameters);
    return db.extractArray(result.out_result);
}