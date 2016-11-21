$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var INS_CATALOG_TYPE = "INS_CATALOG_TYPE";
var GET_ALL_CATALOG_TYPE = "GET_ALL_CATALOG_TYPE";
var GET_CATALOG_TYPE_BY_ID = "GET_CATALOG_TYPE_BY_ID";
var UPD_CATALOG_TYPE = "UPD_CATALOG_TYPE";
var DEL_CATALOG_TYPE = "DEL_CATALOG_TYPE";

//Insert Catalog
function insertCatalogType(objCatalog, userId) {
    var parameters = getCatalogTypeParams(objCatalog);
    parameters.in_created_user_id = userId;//objCatalog.IN_CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(INS_CATALOG_TYPE, parameters, 'out_result');
}

//Get Catalog files
function getCatalogTypeById(catalogTypeId) {
    var parameters = {};
    parameters.in_catalog_type_id = catalogTypeId;
    var result = db.executeProcedure(GET_CATALOG_TYPE_BY_ID, parameters);
    return db.extractArray(result.out_result);
}

function getAllCatalogType() {
    var parameters = {};
    var result = db.executeProcedure(GET_ALL_CATALOG_TYPE, parameters);
    return db.extractArray(result.out_result);
}

//Update vendor request
function updateCatalogType(objCatalog, userId) {
    var parameters = getCatalogTypeParams(objCatalog);
    parameters.in_catalog_type_id = objCatalog.CATALOG_TYPE_ID;
    parameters.in_modified_user_id = userId;//objCatalog.IN_MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(UPD_CATALOG_TYPE, parameters, 'out_result');
}

//Delete vendor request
function deleteCatalogType(objCatalog, userId) {
    var parameters = {};
    parameters.in_catalog_type_id = objCatalog.CATALOG_TYPE_ID;
    parameters.in_modified_user_id = userId;//objCatalog.IN_MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(DEL_CATALOG_TYPE, parameters, 'out_result');
}

function getCatalogTypeParams(objCatalog){
	var parameters = {};
	parameters.IN_NAME = objCatalog.NAME;
	return parameters;
}

//MANUAL PROCEDURES
function getCatalogTypeManual(catalogTypeId) {
    var parameters = {};
    parameters.in_catalog_type_id = catalogTypeId;
    var result = db.executeProcedureManual(GET_CATALOG_TYPE_BY_ID, parameters);
    return db.extractArray(result.out_result);
}