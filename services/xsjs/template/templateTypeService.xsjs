$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var templateType = mapper.getTemplateType();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_TEMPLATE_TYPE = "GET_ALL_TEMPLATE_TYPE";
var GET_TEMPLATE_TYPE_BY_ID = "GET_TEMPLATE_TYPE_BY_ID";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete);
}

function handleGet(parameters, user_id) {
    var rdo = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_TEMPLATE_TYPE_BY_ID) {
            rdo = templateType.getTemplateTypeById(parameters[0].value, user_id);
        } else if (parameters[0].name === GET_ALL_TEMPLATE_TYPE) {
            rdo = templateType.getAllTemplateType();
        } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "templateTypeServices/handleGet",
                "invalid parameter name (can be: GET_ALL_TEMPLATE_TYPE or GET_TEMPLATE_TYPE_BY_ID)"
                + parameters[0].name);
        }
    }
    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handlePut(reqBody, userId) {
    var req = templateType.updateTemplateType(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

function handleDelete(reqBody, userId) {
    var req = templateType.deleteTemplateType(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

function handlePost(reqBody, userId) {
    var req = templateType.insertTemplateType(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

processRequest();