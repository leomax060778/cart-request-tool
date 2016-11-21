$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dbHelper = mapper.getdbHelper();
var dataRequest = mapper.getDataRequest();
var dataCatalog = mapper.getDataCatalog();
var dataRService = mapper.getDataRequestService();
var dataService = mapper.getDataService();
var dataSpecialRequest = mapper.getDataSpecialRequest();
var dataRCostObject = mapper.getDataShoppingCartHistoryRequestCostObject();
var dataRRiskFunded = mapper.getDataRequestRiskFunded();
var dataNewCartRequest = mapper.getDataNewCartRequest();
var dataAttachment = mapper.getDataAttachment();
var dataNoteRequest = mapper.getDataShoppingNoteRequest();
var dataRequestDataProtection = mapper.getDataRequestDataProtection();
var ErrorLib = mapper.getErrors();

/*----- REQUEST SERVICE -----*/

function getRequestServiceByRequestId(request_id, user_id) {
	if (!request_id) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter request_id is not found",
				"requestService/handleGet/getRequestServiceById", request_id);
	}
	return dataRService.getRequestServiceByRequestId(request_id);
}

function getAllRequestService(user_id) {
	if (!user_id) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"requestService/handleGet/getAllRequestService", user_id);
	}
	return dataRService.getAllRequestService();
}
/*----- SERVICES -----*/

function getServicesByRequestId(request_id, user_id) {
	if (!request_id) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter request_id is not found",
				"requestService/handleGet/getServicesByRequestId", request_id);
	}
	return dataService.getServiceByRequestId(request_id);
}

function getServiceById(serviceId, userId) {
	if (!serviceId) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter serviceId is not found",
				"requestService/handleGet/getServiceById", serviceId);
	}
	return dataService.getServiceById(serviceId);
}

function getSpecialRequestByRequestId(request_id, user_id){
	if (!request_id) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter request_id is not found",
				"requestService/handleGet/getSpecialRequestByRequestId", request_id);
	}
	return dataSpecialRequest.getSpecialRequestByRequestId(request_id);	
}


/*----- REQUEST COST OBJECT -----*/

function getCostObjectByRequestId(request_id, user_id) {
	if (!request_id) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter request_id is not found",
				"requestService/handleGet/getCostObjectById", request_id);
	}
	return dataRCostObject.getCostObjectByRequestId(request_id);
}

function getAllCostObject(user_id) {
	return dataRCostObject.getAllCostObject();
}

function getAllCostObjectType(user_id) {
	return dataRCostObject.getAllCostObjectType();
}

/*----- REQUEST RISK FUNDED -----*/

function getRiskFundedByRequestId(request_id, user_id) {
	if (!request_id) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter request_id is not found",
				"requestService/handleGet/getRiskFundedById", request_id);
	}
	return dataRRiskFunded.getRiskFundedByRequestId(request_id);
}

function getAllRiskFunded(user_id) {
	return dataRRiskFunded.getAllRiskFunded();
}

function getCatalogByParentId(catalog_id){
	return dataCatalog.getCatalogByIdManual(catalog_id);
}

function getNoteRequestByRequestId(request_id){
	return dataNoteRequest.getNoteRequestByRequestId(request_id);
}

function completeRequest(item, user_id) {
	if(item.MATERIAL_PARENT_ID){
		var catalog;
		var result = {};
		var catalogs = [];
		item.CATALOGS = dataCatalog.getManualCatalogById(item.MATERIAL_PARENT_ID);
		
		catalog = item.CATALOGS[0].CATALOG_PARENT_ID;
		if(catalog){		
			while(catalog != "0"){
				result = getCatalogByParentId(catalog);
				catalog = result[0].CATALOG_PARENT_ID;
				(item.CATALOGS).push(result[0]);
				if(!catalog){
					catalog = "0";
				}
			}
		}
		
	}

	item.SERVICES = getServicesByRequestId(item.REQUEST_ID, user_id);
	item.REQUEST_SERVICE = getRequestServiceByRequestId(item.REQUEST_ID, user_id);
	item.SPECIAL_REQUEST = getSpecialRequestByRequestId(item.REQUEST_ID, user_id);
	item.COST_OBJECT = getCostObjectByRequestId(item.REQUEST_ID, user_id);
	item.RISK_FUNDED = getRiskFundedByRequestId(item.REQUEST_ID, user_id);
	item.NOTES = getNoteRequestByRequestId(item.REQUEST_ID);
	item.DATA_PROTECTION = getRequestDataProtection(item.REQUEST_ID, user_id);
	item.ATTACHMENTS = getAttachmentRequest(item.REQUEST_ID, user_id);
	
}

/*----- REQUEST -----*/

function getAllRequest() {
	try {
		var request = dataRequest.getAllRequest();
		dbHelper.commit();
	} catch (e) {
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(),
				"getAllRequest");
	} finally {
		dbHelper.closeConnection();
	}

	return request;
}
function getRequestByFilters(objFilters, userId) {
	if (!objFilters) {
		throw ErrorLib.getErrors().BadRequest(
				"The Object Filters is not found",
				"requestService/handleGet/getRequestByFilters",
				getRequestByFilters);
	}
	try {
		var filtersArray = [ "GOODS_RECIPIENT", "TEAM_ID", "REQUEST_DATE_FROM",
				"REQUEST_DATE_TO", "USER_ID", "USER_ID", "VENDOR_ID",
				"STATUS_ID" ];
		validateFilterParameters(objFilters, filtersArray);
		if (!validateDateStringFormat(objFilters["REQUEST_DATE_FROM"])
				|| !validateDateStringFormat(objFilters["REQUEST_DATE_TO"])) {
			throw ErrorLib.getErrors().CustomError("",
					"Invalid date format (YYYY-MM-DD)", "getRequestByFilters");
		}
		var request = dataRequest.getRequestByFilters(objFilters);
		(request).forEach(function(item) {
			completeRequest(item, userId);
		});
		dbHelper.commit();
	} catch (e) {
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(),
				"getRequestByFilters");
	} finally {
		dbHelper.closeConnection();
	}

	return request;
}
function getRequestById(request_id, userId) {
	if (!request_id) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter request_id is not found",
				"requestService/handleGet/getRequestById", request_id);
	}

	try {
		var request = dataRequest.getRequestByIdManual(request_id);
		var req = {};
		if (request.length > 0) {
			req = JSON.parse(JSON.stringify(request));
			completeRequest(req, userId);
		}
		dbHelper.commit();
	} catch (e) {
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(),
				"getRequestById");
	} finally {
		dbHelper.closeConnection();
	}

	return req;
}

function deleteRequest(request_id, user_id) {
	if (!request_id) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter request_id is not found",
				"requestService/handleDelete/deleteRequest", request_id);
	}
	if (!user_id) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"requestService/handleDelete/deleteRequest", user_id);
	}
	try {
		dataRCostObject.deleteCostObject(request_id, user_id);
		dataRRiskFunded.deleteRiskFundedByRequestId(request_id, user_id);
		dataService.deleteServiceByRequestId(request_id, user_id);
		dataSpecialRequest.deleteSpecialRequestByRequestId(request_id, user_id);
		dataRService.deleteRequestServiceByRequestId(request_id, user_id);
		dataRequest.deleteRequestDataProtectionAnswersByRequestId(request_id,
				user_id);
		var atachmentList = dataRequest.getAttachmentByRequestId(request_id,
				user_id);
		atachmentList.forEach(function(attachmentRequest) {
			dataAttachment.deleteAttachment(attachmentRequest, user_id);
		});
		dataRequest.deleteAttachmentRequest(request_id, user_id);
		var request = dataRequest.deleteRequest(request_id, user_id);

		dbHelper.commit();
		return request;
	} catch (e) {
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(),
				"deleteRequest");
	} finally {
		dbHelper.closeConnection();
	}
}

function validateDateStringFormat(dateString) {
	return ((new Date(dateString)).toString() !== "Invalid Date") ? true
			: false;
}

function validateFilterParameters(objFilter, filters) {
	(filters).forEach(function(filter) {
		if (!objFilter[filter]) {
			objFilter[filter] = null;
		}
	});
}

function getRequestDataProtection(requestId, user_id){
	return dataRequestDataProtection.getDataProtectionByRequestId(requestId);
}

function getAttachmentRequest(requestId, user_id){
	return dataRequest.getAttachmentByRequestId(requestId, user_id);
}
