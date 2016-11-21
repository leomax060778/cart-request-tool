$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var INS_CATALOG = "INS_CATALOG";
var GET_ALL_CATALOG = "GET_ALL_CATALOG";
var GET_CATALOG_BY_ID = "GET_CATALOG_BY_ID";
var GET_CATALOG_BY_PARENT_ID = "GET_CATALOG_BY_PARENT_ID";
var GET_ALL_CATALOG_BY_PARENT_ID = "GET_ALL_CATALOG_BY_PARENT_ID";
var UPD_CATALOG = "UPD_CATALOG";
var DEL_CATALOG = "DEL_CATALOG";

//Insert catalog
function insertCatalog(objCatalog, userId) {
    var parameters = {};
    parameters.in_name = objCatalog.NAME;
    parameters.in_catalog_type_id = objCatalog.CATALOG_TYPE_ID;
    parameters.in_catalog_parent_id = objCatalog.CATALOG_PARENT_ID || 0;
    parameters.in_pop_up = objCatalog.POP_UP;
    parameters.in_created_user_id = userId;//objCatalog.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(INS_CATALOG, parameters, 'out_result');
}

//Get all catalog
function getAllCatalog() {
    var parameters = {};
    var result = db.executeProcedure(GET_ALL_CATALOG, parameters);
    return db.extractArray(result.out_result);
}

//Get catalog by id
function getCatalogById(catalogId) {
    var parameters = {};
    parameters.in_catalog_id = catalogId;
    var result = db.executeProcedure(GET_CATALOG_BY_ID, parameters);
    return db.extractArray(result.out_result);
}

//Get catalog by id
function getCatalogByParentId(catalogId) {
    var parameters = {};
    parameters.in_catalog_parent_id = catalogId;
    var result = db.executeProcedureManual(GET_CATALOG_BY_PARENT_ID, parameters);
    return db.extractArray(result.out_result);
}

//Get catalog by id Manual
function getManualCatalogById(catalogId) {
    var parameters = {};
    parameters.in_catalog_id = catalogId;
    var result = db.executeProcedureManual(GET_CATALOG_BY_ID, parameters);
    return db.extractArray(result.out_result);
}

function getAllCatalogByParentId(parentId, userId){
	var parameters = {};
    parameters.in_parent_id = parentId;
    parameters.out_result = '?';
    var result = db.executeProcedureManual(GET_ALL_CATALOG_BY_PARENT_ID, parameters);
    return db.extractArray(result.out_result);
}

//Get catalog by id manually
function getCatalogByIdManual(catalogId) {
    var parameters = {};
    parameters.in_catalog_id = catalogId;
    var result = db.executeProcedureManual(GET_CATALOG_BY_ID, parameters);
    return db.extractArray(result.out_result);
}

//Update catalog
function updateCatalog(objCatalog, userId) {
    var parameters = {};
    parameters.in_catalog_id = objCatalog.CATALOG_ID;
    parameters.in_name = objCatalog.NAME;
    parameters.in_catalog_type_id = objCatalog.CATALOG_TYPE_ID;
    parameters.in_catalog_parent_id = objCatalog.CATALOG_PARENT_ID || 0;
    parameters.in_pop_up = objCatalog.POP_UP;
    parameters.in_modified_user_id = userId;//objCatalog.MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(UPD_CATALOG, parameters, 'out_result');
}

//Delete catalog
function deleteCatalog(objCatalog, userId) {
    var parameters = {};
    parameters.in_catalog_id = objCatalog.CATALOG_ID;
    parameters.in_modified_user_id = userId;//objCatalog.MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(DEL_CATALOG, parameters, 'out_result');
}

//Delete catalog
function deleteCatalogManual(objCatalog, userId) {
    var parameters = {};
    parameters.in_catalog_id = objCatalog.CATALOG_ID;
    parameters.in_modified_user_id = userId;//objCatalog.MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalarManual(DEL_CATALOG, parameters, 'out_result');
}