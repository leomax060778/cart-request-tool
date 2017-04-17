$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var cost_object_type = mapper.getRequest();

var GET_ALL_COST_OBJECT_TYPE = "GET_ALL_COST_OBJECT_TYPE";
var GET_COST_OBJECT_TYPE_BY_ID = "GET_COST_OBJECT_TYPE_BY_ID";

var service_name = "costObjectTypeService";

/** *************************************** */
function processRequest() {
	httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

function handleGet(objReq, userId) {
	var req = {};
	if (objReq.length > 0) {
		if (objReq[0].name === GET_ALL_COST_OBJECT_TYPE) {
			req = cost_object_type.getAllCostObjectType(userId);

		} else if (objReq[0].name === GET_COST_OBJECT_TYPE_BY_ID) {
			if (objReq[0].value <= 0) {
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "costObjectTypeService/handleGet",
                    "invalid parameter value " + objReq[0].name + " (must be a valid Cost Object Type id)"
                );
            } else {
            	req = cost_object_type.getCostObjectTypeById(objReq[0].value, userId);
            }
		} else {
			throw ErrorLib
					.getErrors()
					.BadRequest(
							"",
							"costObjectTypeService/handleGet",
							"invalid parameter name (can be: GET_ALL_COST_OBJECT_TYPE or GET_COST_OBJECT_TYPE_BY_ID)"
									+ objReq[0].name);
		}
	} else {
        throw ErrorLib.getErrors().BadRequest(
                "",
                "costObjectTypeService/handleGet",
                "invalid parameter (can be: GET_ALL_COST_OBJECT_TYPE or GET_COST_OBJECT_TYPE_BY_ID)"
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

function handleDelete(reqBody, user_id) {
	var rdo =  cost_object_type.deleteCostObjectType(reqBody.COST_OBJECT_TYPE_ID, user_id);
	return httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
}

processRequest();
