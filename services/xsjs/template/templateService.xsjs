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

var service_name = "templateService";

function processRequest() {
	httpUtil.processRequest3(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

function handleGet(parameters, userId) {
	var rdo = {};
	if (parameters.length > 0) {
		if (parameters[0].name === GET_ALL_TEMPLATE) {
			rdo = template.getAllTemplate(parameters[0].value);
		} else if (parameters[0].name === GET_TEMPLATE_BY_ID) {
			rdo = template.getTemplateById(parameters[0].value, userId);
		} else if (parameters[0].name === GET_TEMPLATE_BY_TYPE_ID) {
			rdo = template.getTemplateByTypeId(parameters[0].value, userId);
		} else if (parameters[0].name === GET_ALL_TEMPLATE_BY_PARENT_SECTION) {
			var objRequest = paramsToObj(parameters,["PARENT_ID","SECTION_ID"]);
			rdo = template.getAllTemplateByParentAndSection(objRequest, userId);
		} else {
			throw ErrorLib
					.getErrors()
					.BadRequest(
							"",
							"templateServices/handleGet",
							"invalid parameter name (can be: GET_ALL_TEMPLATE or GET_BY_TEMPLATE_BY_ID or GET_BY_TEMPLATE_BY_TYPE_ID)"
									+ parameters[0].name);
		}
	}
	return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handlePut(reqBody, userId) {
	var req = template.updateTemplate(reqBody, userId);
	return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

function handleDelete(reqBody, userId) {
	var req = {};
	if(reqBody.DELETE && reqBody.DELETE == 'SELECTED_TEMPLATE'){
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

function paramsToObj(params,paramsArray){
	var elements = {};
	Object.keys(params).forEach(function(key) {
		var value = params[key];
		if(paramsArray.indexOf(value.name) > -1){
			elements[value.name] = value.value;
		}
	});
	return elements;
}

processRequest();