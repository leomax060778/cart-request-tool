$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var template = mapper.getTemplate();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_TEMPLATE = "GET_ALL_TEMPLATE";
var GET_TEMPLATE_BY_ID = "GET_TEMPLATE_BY_ID";
var GET_TEMPLATE_BY_TYPE_ID = "GET_TEMPLATE_BY_TYPE_ID";
var GET_ALL_TEMPLATE_BY_PARENT_SECTION = "GET_ALL_TEMPLATE_BY_PARENT_SECTION";
var GET_ALL_TEMPLATE_BY_SECTION_ID = "GET_ALL_TEMPLATE_BY_SECTION_ID";

var service_name = "templateService";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

function handleGet(parameters, userId) {
    var res = {};
    if (parameters.length > 0) {
        switch (parameters[0].name) {
            case GET_ALL_TEMPLATE:
                res = template.getAllTemplate(parameters[0].value);
                break;
            case GET_ALL_TEMPLATE_BY_SECTION_ID:
                res = template.getAllTemplateBySectionId(parameters[0].value);
                break;
            case GET_TEMPLATE_BY_ID:
                res = template.getTemplateById(parameters[0].value, userId);
                break;
            case GET_TEMPLATE_BY_TYPE_ID:
                res = template.getTemplateByTypeId(parameters[0].value, userId);
                break;
            case GET_ALL_TEMPLATE_BY_PARENT_SECTION:
                var objRequest = paramsToObj(parameters, ["PARENT_ID", "SECTION_ID"]);
                res = template.getAllTemplateByParentAndSection(objRequest, userId);
                break;
            default:
                throw ErrorLib.getErrors().BadRequest("", "",
                    "invalid parameter name (can be: GET_ALL_TEMPLATE, GET_ALL_TEMPLATE_BY_SECTION_ID, GET_BY_TEMPLATE_BY_ID, GET_BY_TEMPLATE_BY_TYPE_ID or GET_ALL_TEMPLATE_BY_PARENT_SECTION)" + parameters[0].name);
        }
    }
    return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

function handlePut(reqBody, userId) {
    var req;
    switch (reqBody.METHOD) {
        case "ORDER":
            req = template.updateTemplateOrder(reqBody, userId);
            break;
        case "FULL_EDIT":
            req = template.updateTemplate(reqBody, userId);
            break;
    }
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

function handleDelete(reqBody, userId) {
    var req = {};
    if (reqBody.DELETE && reqBody.DELETE === 'SELECTED_TEMPLATE') {
        req = template.deleteSelectedTemplate(reqBody, userId);
    } else {
        req = template.deleteTemplate(reqBody, userId);
    }
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

function handlePost(reqBody, userId) {
    var req = template.insertTemplate(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

function paramsToObj(params, paramsArray) {
    var elements = {};
    Object.keys(params).forEach(function (key) {
        var value = params[key];
        if (paramsArray.indexOf(value.name) > -1) {
            elements[value.name] = value.value;
        }
    });
    return elements;
}

processRequest();