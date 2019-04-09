$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var layout = mapper.getLayoutSection();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_LAYOUT_SECTION = "GET_ALL_LAYOUT_SECTION";
var GET_LAYOUT_SECTION_BY_ID = "GET_LAYOUT_SECTION_BY_ID";

var service_name = "layoutSectionService";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name, true);
}

/**
 * @typedef {object} LayoutSection
 * @property {string} LAYOUT_SECTION_ID - id of the layout
 * @property {string} NAME - name of layout
 * @property {string} CONTENT - content of the layout
 */


/**
 *
 * @param {object} parameters
 * @param {void} [parameters.GET_ALL_LAYOUT_SECTION] - get all
 * @param {string} [parameters.GET_LAYOUT_SECTION_BY_ID] - get by id
 * @returns {LayoutSection} LayoutSection - one or more LayoutSections
 */
function handleGet(parameters) {
    var res = {};
    if (parameters.length > 0) {
        switch (parameters[0].name) {
            case GET_ALL_LAYOUT_SECTION:
                res = layout.getAllLayoutSection();
                break;
            case GET_LAYOUT_SECTION_BY_ID:
                if (parameters[0].value <= 0 || isNaN(parameters[0].value)) {
                    throw ErrorLib.getErrors().BadRequest("", "",
                        "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (must be a valid id)"
                    );
                } else {
                    res = layout.getLayoutSectionById(parameters[0].value);
                }
                break;
            default:
                throw ErrorLib.getErrors().BadRequest(
                    "", "",
                    "invalid parameter name " + parameters[0].name + " (can be: GET_ALL_LAYOUT_SECTION or GET_LAYOUT_SECTION_BY_ID)"
                );
        }
    } else {
        throw ErrorLib.getErrors().BadRequest("", "",
            "invalid parameter (can be: GET_ALL_LAYOUT_SECTION or GET_LAYOUT_SECTION_BY_ID)"
        );
    }
    return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
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

//Not implemented method
function handleDelete() {
    return httpUtil.notImplementedMethod();
}

/**
 *
 * @param {object} reqBody
 * @param {string} reqBody.CONTENT - content of the layout
 * @param userId
 * @returns {string} id - Id of the new layout section
 */
function handlePost(reqBody, userId) {
    var req = layout.insertLayoutSection(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

processRequest();
