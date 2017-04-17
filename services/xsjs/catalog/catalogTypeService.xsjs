$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var catalogType = mapper.getCatalogType();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_CATALOG_TYPE = "GET_ALL_CATALOG_TYPE";
var GET_CATALOG_TYPE_BY_ID = "GET_CATALOG_TYPE_BY_ID";

var service_name = "catalogTypeService";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

function handleGet(parameters, userId) {
    var rdo = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_ALL_CATALOG_TYPE) {
            rdo = catalogType.getAllCatalogType();
        } else if (parameters[0].name === GET_CATALOG_TYPE_BY_ID) {
            rdo = catalogType.getCatalogTypeById(parameters[0].value, userId);
        } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "catalogTypeServices/handleGet",
                "invalid parameter name (can be: GET_ALL_CATALOG_TYPE or GET_CATALOG_TYPE_BY_ID)"
                + parameters[0].name);
        }
    }
    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handlePut(reqBody, userId) {
    var req = catalogType.updateCatalogType(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

function handleDelete(reqBody, userId) {
    var req = catalogType.deleteCatalogType(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

function handlePost(reqBody, userId) {
    var req = catalogType.insertCatalogType(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

processRequest();