$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var request = mapper.getApi();

var GET_L6_BY_ID = "GET_L6_BY_ID";
var GET_L6_BY_PATH = "GET_L6_BY_PATH";
var GET_ALL_ENTITY = "GET_ALL_ENTITY";
var GET_REQUEST_BY_WBS_PATH = "GET_REQUEST_BY_WBS_PATH";

/** *************************************** */
function processRequest() {
	httpUtil.processPublicRequest(handleGet, handlePost, handlePut, handleDelete);
}

function handleGet(parameters) {
	var req = {};
	var objWBSPath = {};
	if (parameters.length > 0) {
		if (parameters[0].name === GET_ALL_ENTITY) {
			req = request.getAllEntities();
		} else if (parameters[0].name === GET_REQUEST_BY_WBS_PATH) {
			if ((parameters[0].value).length <= 0) {
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "apiService/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (must be a valid WBS ID)"
                );
            } else {
            	objWBSPath.WBS_PATH = parameters[0].value;
            	if (parameters[1]) {
            		if (parameters[1].name === "REQUEST_ID") {
            			if (parameters[1].value <= 0 || isNaN(parameters[1].value)) {
            				throw ErrorLib.getErrors().BadRequest(
            	                    "",
            	                    "apiService/handleGet",
            	                    "invalid value \'" + parameters[1].value + "\' for parameter " + parameters[1].name + " (must be a valid id)"
            	                );
            			}
            			objWBSPath.REQUEST_ID = parameters[1].value;
            		} else {
            			throw ErrorLib
    					.getErrors()
    					.BadRequest(
    							"",
    							"apiServices/handleGet","invalid parameter name " + parameters[1].name + " (it should be REQUEST_ID)");
            		}
            	}
            	req = request.getRequestByWBSPath(objWBSPath);
            }
		} else {
			throw ErrorLib
					.getErrors()
					.BadRequest(
							"",
							"apiServices/handleGet",
							"invalid parameter name (can be: GET_ALL_ENTITY or GET_REQUEST_BY_WBS_PATH)");
		}
	} else {
        throw ErrorLib.getErrors().BadRequest(
                "",
                "apiService/handleGet",
                "invalid parameter (can be: GET_ALL_ENTITY or GET_REQUEST_BY_WBS_PATH)"
            );
        }
	return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

function handlePost() {
	return httpUtil.notImplementedMethod();
}

function handlePut() {
	return httpUtil.notImplementedMethod();
}

function handleDelete() {
	return httpUtil.notImplementedMethod();
}


processRequest();
