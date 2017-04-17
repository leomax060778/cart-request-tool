$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var templateSection = mapper.getTemplateSection();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_TEMPLATE_SECTION = "GET_ALL_TEMPLATE_SECTION";
var GET_TEMPLATE_SECTION_BY_ID = "GET_TEMPLATE_SECTION_BY_ID";

var service_name = "templateSectionService";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

function handleGet(parameters, userId) {
    var rdo = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_ALL_TEMPLATE_SECTION) {
            rdo = templateSection.getAllTemplateSection();
        } else if (parameters[0].name === GET_TEMPLATE_SECTION_BY_ID) {
            rdo = templateSection.getTemplateSectionById(parameters[0].value, userId);
        } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "templateSectionServices/handleGet",
                "invalid parameter name (can be: GET_ALL_TEMPLATE_SECTION or GET_TEMPLATE_SECTION_BY_ID)"
                + parameters[0].name);
        }
    }
    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handlePut(reqBody, userId) {
    var req = templateSection.updateTemplateSection(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

function handleDelete(reqBody, userId) {
    var req = templateSection.deleteTemplateSection(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

function handlePost(reqBody, userId) {
    var req = templateSection.insertTemplateSection(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

processRequest();
