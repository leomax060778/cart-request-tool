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
var status = mapper.getCartRequest();
var ErrorLib = mapper.getErrors();

var statusMap = {'TO_BE_CHECKED': 1, 'CHECKED': 2, 'IN_PROCESS': 3, 'RETURN_TO_REQUESTER': 4, 'APPROVED': 5, 'CANCELLED': 6};

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

//----------------------- UPDATE NEW CART REQUEST -----------------------//


//NOTES
function updateNotes(original_notes, notes, userId){
	var original_notes_local = original_notes;
    var updateOriginalNotes = notes;
    var insertOriginalNotes = [];
    var deleteOriginalNotes = [];
    original_notes_local.forEach(function (o_note) {
        var result = true;
        var o_note_id = o_note.NOTE_REQUEST_ID;
        if (typeof o_note_id === 'string') {
            o_note_id = Number(o_note_id);
        }
        updateOriginalNotes.forEach(function (updateNote) {
            if (o_note_id === updateNote) {
                result = false;
            }
        });
        if (result) {
            deleteOriginalNotes.push(o_note_id);
        }
    });
    updateOriginalNotes.forEach(function (newNote) {
        var result = true;
        original_notes_local.forEach(function (note) {
            var o_note_id = note.NOTE_REQUEST_ID;
            if (typeof o_note_id === 'string') {
                o_note_id = Number(o_note_id);
            }
            if (newNote === o_note_id) {
                result = false;
            }
        });
        if (result) {
            insertOriginalNotes.push(newNote);
        }
    });

    insertOriginalNotes.forEach(function (insertNote) {
        insertManualNoteRequest(insertNote, userId);
    });
    deleteOriginalNotes.forEach(function (deleteNote) {
        deleteManualNoteRequest(deleteNote, userId);
    });
}

//SERVICES
function insertService(reqBody, user_id){
	if(validateInsertService(reqBody, user_id)){
		return dataService.insertService(reqBody, user_id);
	}	
}

//Return the total amount to be used in Request Service
function insertServices(services, requestId, conversion_rate, userId){
	var amount = 0;
	(services).forEach(function(itemService){
		itemService.REQUEST_ID = requestId;
		amount += Number(itemService.AMOUNT);
		itemService.BUDGET = itemService.AMOUNT * conversion_rate;
		insertService(itemService, userId);
	});
	return amount;
}

//Return the total amount to be used in Request Service
function insertEditServices(services, conversion_rate, userId){
	(services).forEach(function(itemService){
		insertService(itemService, userId);
	});

}

function updateService(reqBody, user_id){
	if(validateInsertService(reqBody, user_id)){
		return dataService.updateService(reqBody, user_id);
	}	
}

//Return the total amount to be used in Request Service
function updateServices(original_services, services, conversion_rate, userId){
	var amount = 0;

	var original_services_local = original_services;
    var originalServicesToUpdate = services;
    var updateOriginalServices = [];
    var insertOriginalServices = [];
    var deleteOriginalServices = [];
    
    //DELETE
    original_services_local.forEach(function (o_service) {
        var result = true;
        var o_service_id = o_service.SERVICE_ID;
        if (typeof o_service_id === 'string') {
            o_service_id = Number(o_service_id);
        }
        originalServicesToUpdate.forEach(function (updateService) {
            if (o_service_id === updateService) {
                result = false;
            }
        });
        if (result) {
            deleteOriginalServices.push(o_service_id);
        }
    });
    
    //INSERT
    originalServicesToUpdate.forEach(function (newService) {
        var result = true;
        original_services_local.forEach(function (service) {
            var o_service_id = service.SERVICE_ID;
            if (typeof o_service_id === 'string') {
                o_service_id = Number(o_service_id);
            }
            if (newService === o_service_id) {
                result = false;
            }
        });
        if (result) {
            insertOriginalServices.push(newService);
        }
    });
    
    //UPDATE
    originalServicesToUpdate.forEach(function (newService) {
        var result = true;
        original_services_local.forEach(function (service) {
            var o_service_id = service.SERVICE_ID;
            if (typeof o_service_id === 'string') {
                o_service_id = Number(o_service_id);
            }
            if (newService === o_service_id) {
                result = true;
            }
        });
        if (result) {
            updateOriginalServices.push(newService);
        }
    });
    
    //ACTIONS
    insertEditServices(insertOriginalServices, conversion_rate, userId);
    
    updateServices(updateOriginalServices, conversion_rate, userId);
    
    deleteServicesManual(deleteOriginalServices, userId);
    
    //Obtain total amount to be used in REQUEST_SERVICE
	(services).forEach(function(itemService){
		amount += Number(itemService.AMOUNT);
		itemService.BUDGET = itemService.AMOUNT * conversion_rate;
	});
	
	return amount;
}


//REQUEST
function updateRequest(reqBody, user_id){
	var original_request = getRequestById(reqBody.REQUEST_ID, user_id);
	try{
		if(Number(reqBody.PREVIOUS_STATUS_ID) !== statusMap.TO_BE_CHECKED){
			reqBody.STATUS_ID = statusMap.TO_BE_CHECKED;
			status.updateRequestStatusManual(reqBody, user_id);
		}
			//REQUEST UPDATE
			dataRequest.updateRequest(reqBody, user_id);
			
			//NON-SAP VENDOR UPDATE
			if(original_request.NON_SAP_VENDOR_ID == null && reqBody.NON_SAP_VENDOR !== null){
				var nonsap = insertManualNonSapVendor(reqBody.NON_SAP_VENDOR, user_id);
				reqBody.NON_SAP_VENDOR_ID = nonsap;
			} else if(original_request.NON_SAP_VENDOR_ID !== null && reqBody.NON_SAP_VENDOR !== null) {
				updateManualNonSapVendor(reqBody.NON_SAP_VENDOR, user_id);
			} else if(original_request.NON_SAP_VENDOR_ID !== null && reqBody.NON_SAP_VENDOR == null){
				deleteManualNonSapVendor(original_request.NON_SAP_VENDOR_ID, user_id);
				reqBody.NON_SAP_VENDOR_ID = null;
			}
			
			//COST OBJECT UPDATE
			if(reqBody.COST_OBJECT !== null){
				updateCostObject(reqBody.COST_OBJECT, user_id);
			}
			
			//RISK_FUNDED UPDATE
			if(Object.keys(original_request.RISK_FUNDED).length > 0 && Object.keys(reqBody.RISK_FUNDED).length > 0){
				
				var risk_conversion_rate_table = dataCurrency.getManualCurrencyConversionRate(reqBody.RISK_FUNDED.CURRENCY_ID);
				var risk_conversion_rate = parseFloat(risk_conversion_rate_table[0].CONVERSION_RATE);
				reqBody.RISK_FUNDED.AMOUNT = Number(reqBody.RISK_FUNDED.AMOUNT);
				reqBody.RISK_FUNDED.AMOUNT_KEUR = Number(reqBody.RISK_FUNDED.AMOUNT) * risk_conversion_rate;
				updateRiskFunded(reqBody.RISK_FUNDED, user_id);
			
			} else if(Object.keys(original_request.RISK_FUNDED).length == 0 && Object.keys(reqBody.RISK_FUNDED).length > 0){
				
				var risk_conversion_rate_table = dataCurrency.getManualCurrencyConversionRate(reqBody.RISK_FUNDED.CURRENCY_ID);
				var risk_conversion_rate = parseFloat(risk_conversion_rate_table[0].CONVERSION_RATE);
				reqBody.RISK_FUNDED.REQUEST_ID = original_request.REQUEST_ID;
				reqBody.RISK_FUNDED.AMOUNT = Number(reqBody.RISK_FUNDED.AMOUNT);
				reqBody.RISK_FUNDED.AMOUNT_KEUR = Number(reqBody.RISK_FUNDED.AMOUNT) * risk_conversion_rate;
				
				insertRiskFunded(reqBody.RISK_FUNDED, user_id);
			
			} else if(Object.keys(original_request.RISK_FUNDED).length > 0 && Object.keys(reqBody.RISK_FUNDED).length == 0){
				
				deleteRiskFunded(reqBody.RISK_FUNDED, user_id);
			
			}
			 
			//REQUEST SERVICE & SERVICES UPDATES
			if(reqBody.REQUEST_SERVICE !== undefined){
				var conversion_rate_table = dataCurrency.getManualCurrencyConversionRate(reqBody.REQUEST_SERVICE.CURRENCY_ID);
				var conversion_rate = parseFloat(conversion_rate_table[0].CONVERSION_RATE);
				var cart_amount = updateServices(original_request.SERVICES, reqBody.SERVICES, conversion_rate, user_id);
				reqBody.CART_AMOUNT = cart_amount;
				reqBody.TOTAL_BUDGET = cart_amount * conversion_rate;
				updateRequestService(reqBody.REQUEST_SERVICE, request ,user_id);
			}
			
			//SPECIAL REQUEST UPDATE
			if((original_request.SPECIAL_REQUEST.length > 0) && (reqBody.SPECIAL_REQUEST && Object.keys(reqBody.SPECIAL_REQUEST).length > 0)){
				updateSpecialRequest(reqBody.SPECIAL_REQUEST, request ,user_id);
			} else if((original_request.SPECIAL_REQUEST.length == 0) && (reqBody.SPECIAL_REQUEST && Object.keys(reqBody.SPECIAL_REQUEST).length > 0)){
				insertSpecialRequest(reqBody.SPECIAL_REQUEST, request ,user_id);
			} else if((original_request.SPECIAL_REQUEST.length > 0) && (reqBody.SPECIAL_REQUEST && Object.keys(reqBody.SPECIAL_REQUEST).length == 0)){
				deleteSpecialRequest(reqBody.SPECIAL_REQUEST, request ,user_id);
			}
			
			//NOTES UPDATE
			if(reqBody.NOTES !== null && reqBody.NOTES !== undefined && Object.keys(reqBody.NOTES).length > 0){
				updateNotes(original_request.NOTES, reqBody.NOTES, user_id);
			} else if(original_request.NOTES.length > 0){
				deleteNotes(original_request.NOTES, reqBody.NOTES, user_id);
			}
			
			//DATA PROTECTION ANSWERS UPDATE
			(reqBody.DATA_PROTECTION_ANSWERS).forEach(function(item){
					updateDataProtectionAnswer(item, user_id);
			});
		dbHelper.commit();
	}
	catch(e){
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(),"updateRequest");
	}
	finally{
		dbHelper.closeConnection();
	}
	return request;
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
