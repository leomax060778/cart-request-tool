$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var layout = mapper.getLayoutSection();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_LAYOUT_SECTION = "GET_ALL_LAYOUT_SECTION";
var GET_LAYOUT_SECTION_BY_ID = "GET_LAYOUT_SECTION_BY_ID";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete);
}

/**
 * @typedef {object} LayoutSection
 * @property {string} LAYOUT_SECTION_ID - id of the layout
 * @property {string} BLOCK_TYPE - type of layout
 * @property {string} BLOCK_CONTENT - content of the layout
 */


/**
 *
 * @param {object} parameters
 * @param {void} [parameters.GET_ALL_LAYOUT_SECTION] - get all
 * @param {string} [parameters.GET_LAYOUT_SECTION_BY_ID] - get by id
 * @returns {LayoutSection} LayoutSection - one or more LayoutSections
 */
function handleGet(parameters) {
    var rdo = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_ALL_LAYOUT_SECTION) {
            rdo = layout.getAllLayoutSection();
        } else if (parameters[0].name === GET_LAYOUT_SECTION_BY_ID) {
            if (parameters[0].value <= 0 || isNaN(parameters[0].value)){
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "layoutSectionService/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (must be a valid id)"
                );
            } else {
                rdo = layout.getLayoutSectionById(parameters[0].value);
            }
        } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "layoutSectionService/handleGet",
                "invalid parameter name " + parameters[0].name + " (can be: GET_ALL_LAYOUT_SECTION or GET_LAYOUT_SECTION_BY_ID)"
            );
        }
    } else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "layoutSectionService/handleGet",
            "invalid parameter (can be: GET_ALL_LAYOUT_SECTION or GET_LAYOUT_SECTION_BY_ID)"
        );
    }
    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

/**
 *
 * @param {LayoutSection} reqBody
 * @param userId
 * @returns {int} count - Modified rows count
 */
function handlePut(reqBody, userId) {
    var req = layout.updateLayoutSection(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

/**
 *
 * @param {object} reqBody
 * @param {string} reqBody.LAYOUT_SECTION_ID - id of the layout to delete
 * @param userId
 * @returns {int} count - Modified rows count
 */
function handleDelete(reqBody, userId) {
    var req = layout.deleteLayoutSection(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

/**
 *
 * @param {object} reqBody
 * @param {string} reqBody.BLOCK_TYPE - type of layout
 * @param {string} reqBody.BLOCK_CONTENT - content of the layout
 * @param userId
 * @returns {string} id - Id of the new layout section
 */
function handlePost(reqBody, userId) {
    var req = layout.insertLayoutSection(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

processRequest();