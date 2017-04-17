$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var commodity = mapper.getCommodity();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_COMMODITY = "GET_ALL_COMMODITY";
var GET_COMMODITY_BY_ID = "GET_COMMODITY_BY_ID";

var service_name = "commodityService";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

/**
 *
 * @param {object} parameters
 * @param {void} [parameters.GET_ALL_COMMODITY] - get all
 * @param {string} [parameters.GET_COMMODITY_BY_ID] - get by id
 * @returns {Commodity} Commodity - one or more Commodities
 */
function handleGet(parameters) {
    var rdo = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_ALL_COMMODITY) {
            rdo = commodity.getAllCommodity(parameters[0].value);
        } else if (parameters[0].name === GET_COMMODITY_BY_ID) {
            if (parameters[0].value <= 0 || isNaN(parameters[0].value)){
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "commodityService/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (must be a valid id)"
                );
            } else {
                rdo = commodity.getCommodityById(parameters[0].value);
            }
        } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "commodityService/handleGet",
                "invalid parameter name " + parameters[0].name + " (can be: GET_ALL_COMMODITY or GET_COMMODITY_BY_ID)"
            );
        }
    } else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "commodityService/handleGet",
            "invalid parameter (can be: GET_ALL_COMMODITY or GET_COMMODITY_BY_ID)"
        );
    }
    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

/**
 *
 * @param {Commodity} reqBody
 * @param userId
 * @returns {int} count - Modified rows count
 */
function handlePut(reqBody, userId) {
    var req = commodity.updateCommodity(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

/**
 *
 * @param {object} reqBody
 * @param {string} reqBody.COMMODITY_ID - id of the commodity to delete
 * @param userId
 * @returns {int} count - Modified rows count
 */
function handleDelete(reqBody, userId) {
    var req = commodity.deleteCommodity(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

/**
 *
 * @param {object} reqBody
 * @param {string} reqBody.DESCRIPTION - description of the commodity
 * @param userId
 * @returns {string} id - Id of the new commodity
 */
function handlePost(reqBody, userId) {
    var req = commodity.insertCommodity(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

processRequest();

/**
 * @typedef {object} Commodity
 * @property {string} COMMODITY_ID - id of the commodity
 * @property {string} DESCRIPTION - description of the commodity
 */