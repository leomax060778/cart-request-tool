$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var request = mapper.getRequest();

var GET_ALL_REQUEST = "GET_ALL_REQUEST";
var GET_REQUEST_BY_ID = "GET_REQUEST_BY_ID";
var GET_REQUEST_BY_FILTERS = "GET_REQUEST_BY_FILTERS";
var GET_REQUEST_LAST_ID = "GET_REQUEST_LAST_ID";

var service_name = "sch_requestService";

/** *************************************** */
function processRequest() {
	httpUtil.processRequest3(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

function handleGet(parameters, userId) {
	var req = {};
	if (parameters.length > 0) {
		if (parameters[0].name === GET_ALL_REQUEST) {
			req = request.getAllRequest(userId);

		} else if (parameters[0].name === GET_REQUEST_LAST_ID) {
			req = request.getRequestLastId();

		} else if (parameters[0].name === GET_REQUEST_BY_ID) {
			if (parameters[0].value <= 0 || isNaN(parameters[0].value)) {
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "requestService/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (should be a valid id)"
                );
            } else {
            	req = request.getRequestById(parameters[0].value, userId);
            }
		} else if (parameters[0].name === GET_REQUEST_BY_FILTERS) {
			var filtersArray = ["GOODS_RECIPIENT","BUDGET_YEAR_ID","TEAM_ID","REQUEST_DATE_FROM",
			                    "REQUEST_DATE_TO","USER_ID","VENDOR_ID",
			                    "STATUS_ID"];
			var filters = getFilters(parameters,filtersArray);
			req = request.getRequestByFilters(filters, userId);
		} else {
			throw ErrorLib
					.getErrors()
					.BadRequest(
							"",
							"requestServices/handleGet",
							"invalid parameter name (can be: GET_ALL_REQUEST, GET_REQUEST_BY_ID, GET_REQUEST_LAST_ID or GET_REQUEST_BY_FILTERS)"
									+ parameters[0].name);
		}
	} else {
        throw ErrorLib.getErrors().BadRequest(
                "",
                "requestService/handleGet",
                "invalid parameter (can be: GET_ALL_REQUEST, GET_REQUEST_BY_ID, GET_REQUEST_LAST_ID or GET_REQUEST_BY_FILTERS)"
            );
        }
	return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

function handlePost() {
	return httpUtil.notImplementedMethod();
}

function handlePut(reqBody, user_id) {
	if(reqBody.ONLY_ATTACHMENTS){
		var rdo =  request.updateAttachmentRequest(reqBody, user_id);
		return httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
	}else{
		var rdo =  request.updateRequest(reqBody, user_id);
		return httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
	}
	
}

function handleDelete(reqBody, user_id) {
	var rdo =  request.deleteRequest(reqBody.REQUEST_ID, user_id);
	return httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
}

function getFilters(params,filtersArray){
	var filters = {};
	Object.keys(params).forEach(function(key) {
		var value = params[key];
		if(filtersArray.indexOf(value.name) > -1){
			filters[value.name] = value.value;
		}
	});
//	(params).forEach(function(param){
//		if(filtersArray.indexOf(param.name) > -1){
//			filters[param.name] = param.value;
//		}
//	});
	return filters;
}

processRequest();
