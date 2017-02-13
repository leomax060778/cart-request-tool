$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var catalog = mapper.getCatalog();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_CATALOG = "GET_ALL_CATALOG";
var GET_CATALOG_BY_ID = "GET_CATALOG_BY_ID";
var GET_CATALOG_BY_PARENT_ID = "GET_CATALOG_BY_PARENT_ID";

var service_name = "catalogService";

function processRequest() {
    httpUtil.processRequest3(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

/**
 * @typedef {object} Catalog
 * @property {string} CATALOG_ID - id of the catalog
 * @property {string} NAME - name of the catalog
 * @property {string} CATALOG_TYPE_ID - id of the catalog type
 * @property {string} CATALOG_PARENT_ID - parent id of the catalog
 */

 
/**
 *
 * @param {object} parameters
 * @param {void} [parameters.GET_ALL_CATALOG] - get all
 * @param {string} [parameters.GET_CATALOG_BY_ID] - get by id
 * @returns {Catalog} Catalog - one or more Catalogs
 */
function handleGet(parameters) {
    var rdo = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_ALL_CATALOG) {
            rdo = catalog.getAllCatalog(parameters[0].value);
        } else if (parameters[0].name === GET_CATALOG_BY_ID) {
            if (parameters[0].value <= 0 || isNaN(parameters[0].value)){
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "catalogService/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (must be a valid id)"
                );
            } else {
                rdo = catalog.getCatalogById(parameters[0].value);
            }
        } else if (parameters[0].name === GET_CATALOG_BY_PARENT_ID) {
            if (parameters[0].value <= 0 || isNaN(parameters[0].value)){
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "catalogService/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (must be a valid id)"
                );
            } else {
                rdo = catalog.getCatalogByParentId(parameters[0].value);
            }
        } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "catalogService/handleGet",
                "invalid parameter name " + parameters[0].name + " (can be: GET_ALL_CATALOG or GET_CATALOG_BY_ID)"
            );
        }
    } else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "catalogService/handleGet",
            "invalid parameter (can be: GET_ALL_CATALOG or GET_CATALOG_BY_ID)"
        );
    }
    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

/**
 *
 * @param {Catalog} reqBody
 * @param userId
 * @returns {int} count - Modified rows count
 */
function handlePut(reqBody, userId) {
    var req = catalog.updateCatalog(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

/**
 *
 * @param {object} reqBody
 * @param {string} reqBody.CATALOG_ID - id of the catalog to delete
 * @param userId
 * @returns {int} count - Modified rows count
 */
function handleDelete(reqBody, userId) {
    var req = catalog.deleteCatalog(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

/**
 *
 * @param {Catalog} reqBody
 * @param userId
 * @returns {int} count - Modified rows count
 */
function handlePost(reqBody, userId) {
    var req = catalog.insertCatalog(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

processRequest();