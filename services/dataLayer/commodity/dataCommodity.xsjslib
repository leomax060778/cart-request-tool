$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_ALL_COMMODITY = "GET_ALL_COMMODITY";
var GET_COMMODITY_BY_ID = "GET_COMMODITY_BY_ID";
var INS_COMMODITY = "INS_COMMODITY";
var DEL_COMMODITY= "DEL_COMMODITY";
var UPD_COMMODITY= "UPD_COMMODITY";

//Get all commodity
function getAllCommodity() {
    var parameters = {};
    var result = db.executeProcedure(GET_ALL_COMMODITY, parameters);
    return db.extractArray(result.out_result);
}

//Get commodity by id
function getCommodityById(commodityId) {
    var parameters = {'in_commodity_id': commodityId};
    var result = db.executeProcedure(GET_COMMODITY_BY_ID, parameters);
    return db.extractArray(result.out_result);
}

//Get commodity by id manual
function getCommodityByIdManual(commodityId) {
    var parameters = {'in_commodity_id': commodityId};
    var result = db.executeProcedureManual(GET_COMMODITY_BY_ID, parameters);
    return db.extractArray(result.out_result);
}

//Insert commodity
function insertCommodity(objCommodity, userId) {
    var parameters = {};
    parameters.in_description = objCommodity.DESCRIPTION;
    parameters.in_created_user_id = userId;//objCommodity.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(INS_COMMODITY, parameters, 'out_result');
}

//Delete commodity
function deleteCommodity(objCommodity, userId) {
    var parameters = {};
    parameters.in_commodity_id = objCommodity.COMMODITY_ID;
    parameters.in_modified_user_id = userId;//objCommodity.MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(DEL_COMMODITY, parameters, 'out_result');
}

//Update commodity
function updateCommodity(objCommodity, userId) {
    var parameters = {};
    parameters.in_commodity_id = objCommodity.COMMODITY_ID;
    parameters.in_description = objCommodity.DESCRIPTION;
    parameters.in_modified_user_id = userId;//objCommodity.MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(UPD_COMMODITY, parameters, 'out_result');
}