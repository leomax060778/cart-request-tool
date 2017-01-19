$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dbHelper = mapper.getdbHelper();
var businessSpecialRequest = mapper.getSpecialRequest();
var businessNonSap = mapper.getNonSapVendor();
var businessPOService = mapper.getPurchaseOrderService();
var dataRequest = mapper.getDataRequest();
var dataAttachmentR = mapper.getDataAttachmentRequest();
var bussinesAttachment = mapper.getAttachment();
var dataNoteReq = mapper.getDataNoteRequest();
var dataCatalog = mapper.getDataCatalog();
var dataCurrency = mapper.getDataCurrency();
var dataRService = mapper.getDataRequestService();
var dataRUpdateService = mapper.getDataNewCartRequestService();
var dataService = mapper.getDataService();
var dataUpdateService = mapper.getDataService();
var dataSpecialRequest = mapper.getDataSpecialRequest();
var dataRCostObject = mapper.getDataShoppingCartHistoryRequestCostObject();
var dataUpdateCostObject = mapper.getDataRequestCostObject();
var dataRRiskFunded = mapper.getDataRequestRiskFunded();
var dataNewCartRiskFunded = mapper.getDataNewCartRequestRiskFunded();
var dataNewCartRequest = mapper.getDataNewCartRequest();
var dataAttachment = mapper.getDataAttachment();
var dataNoteRequest = mapper.getDataShoppingNoteRequest();
var dataRequestDataProtection = mapper.getDataRequestDataProtection();
var dataRDataProtection = mapper.getDataRequestDataProtection();
var ErrorLib = mapper.getErrors();
var status = mapper.getCartRequest();
var utilLib = mapper.getUtil();
var requestMail = mapper.getCartRequestMail();
var config = mapper.getDataConfig();
var mail = mapper.getMail();

var statusMap = {'TO_BE_CHECKED': 1, 'CHECKED': 2, 'IN_PROCESS': 3, 'RETURN_TO_REQUESTER': 4, 'APPROVED': 5, 'CANCELLED': 6};
var pathName = "CART_REQUEST";

/* VALIDATION KEYS FOR INSERTS & UPDATES */

var RequestServiceKeys = ["REQUEST_SERVICE_ID", "REQUEST_ID", "CURRENCY_ID", "CART_AMOUNT", "TOTAL_BUDGET"];
var nonSapVendorKeys = ["ENTITY_ID", "NAME", "CONTACT_NAME", "CONTACT_PHONE", "CONTACT_EMAIL"];
var RequestServiceOptKeys = ["PURCHASE_ORDER_AMOUNT", "PURCHASE_ORDER_TO_UPLIFT", "LINE_TO_UPLIFT", "SAP_BUYER_NAME"];
var CostObjectKeys = ["REQUEST_COST_OBJECT_ID", "REQUEST_ID", "ENTITY_ID", "COST_OBJECT_TYPE_ID", "COST_VALUE"];
var ServiceKeys = ["REQUEST_ID", "START_DATE", "END_DATE", "DESCRIPTION", "AMOUNT", "CURRENCY_ID", "BUDGET", "ITEM"];
var dpAnswersKeys = ["REQUEST_ID", "QUESTION_ID", "OPTION_ID"];
var noteKeys = ["NOTE_TYPE_ID", "NOTE_TEXT"];
var attachmentKeys = ["REQUEST_ID", "ATTACHMENT_ID"];
var riskFundedKeys = ["REQUEST_ID", "AMOUNT", "CURRENCY_ID", "AMOUNT_KEUR"];

//Check data types
function validateType(key, value) {
	var valid = true;
	switch (key) {
	case 'REQUEST_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'SERVICE_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'NON_SAP_VENDOR_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'NOTE_TYPE_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'REQUEST_RISK_FUNDED_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'ATTACHMENT_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'ENTITY_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'CURRENCY_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'START_DATE':
		valid = value.length > 0;
		break;
	case 'END_DATE':
		valid = value.length > 0;
		break;
	case 'DESCRIPTION':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'AMOUNT':
		valid = !isNaN(value) && value > 0;
		break;
	case 'BUDGET':
		valid = !isNaN(value) && value > 0;
		break;
	case 'AMOUNT_KEUR':
		valid = !isNaN(value) && value > 0;
		break;
	case 'ITEM':
		valid = !isNaN(value);
		break;
	case 'NAME':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'CONTACT_NAME':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'CONTACT_PHONE':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'CONTACT_EMAIL':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'NOTE_TEXT':
		valid = value.length > 0 && value.length <= 1000;
		break;
	}
	return valid;
}


/* ! VALIDATION KEYS FOR UPDATES */

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

function completeAllRequest(request, user_id) {
	request.SERVICES = getServicesByRequestId(request.REQUEST_ID, user_id);
	var purchase_order_service = businessPOService.getPurchaseOrderByIdManual(request.REQUEST_ID);
	request.SERVICES = JSON.parse(JSON.stringify(request.SERVICES));
	request.SERVICES.forEach(function(service){
		service.PURCHASE_ORDER_SERVICE = purchase_order_service;
	});
	request.ATTACHMENTS = getAttachmentRequest(request.REQUEST_ID, user_id);
}

/*----- REQUEST -----*/

function getAllRequest(userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "requestMessageService/handleGet/getRequestMessage", userId);
    }
    var request = [];
	try {
		request = dataRequest.getAllRequest(userId);
		request = JSON.parse(JSON.stringify(request));
		request.forEach(function(elem){
	    	if(elem.MESSAGE_READ > 0){
	    		elem.SHOW_MESSAGE_READ = 1;
	    	} else {
	    		elem.SHOW_MESSAGE_READ = 0;
	    	}
	    	completeAllRequest(elem, userId);
	    });

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
		var filtersArray = [ "GOODS_RECIPIENT","BUDGET_YEAR_ID" ,"TEAM_ID", "REQUEST_DATE_FROM",
				"REQUEST_DATE_TO", "USER_ID", "USER_ID", "VENDOR_ID",
				"STATUS_ID" ];
		validateFilterParameters(objFilters, filtersArray);
		if (!validateDateStringFormat(objFilters["REQUEST_DATE_FROM"])
				|| !validateDateStringFormat(objFilters["REQUEST_DATE_TO"])) {
			throw ErrorLib.getErrors().CustomError("",
					"Invalid date format (YYYY-MM-DD)", "getRequestByFilters");
		}
		var request = dataRequest.getRequestByFilters(objFilters, userId);
		request = JSON.parse(JSON.stringify(request));
		(request).forEach(function(item) {
			if(item.MESSAGE_READ > 0){
				item.SHOW_MESSAGE_READ = 1;
	    	} else {
	    		item.SHOW_MESSAGE_READ = 0;
	    	}
			completeAllRequest(item, userId);
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

//DATA PROTECTION
function updateDataProtectionAnswer(item, user_id){
	dataRDataProtection.updateManualDataProtectionAnswer(item, user_id);
}

//NOTE REQUEST
function insertManualNoteRequest(objNoteReq, request_id, user_id){
	objNoteReq.REQUEST_ID = request_id;
	var serviceUrl = "requestService/handleUpdate/updateRequest/insertManualNoteRequest";
	if(utilLib.validateObjectAttributes(objNoteReq, user_id, noteKeys, serviceUrl, validateType)){
		dataNoteReq.insertNoteRequest(objNoteReq, user_id); 
	}
}

//ATTACHMENT REQUEST
function insertAttachmentRequest(attachment, in_request_id, userId){
	attachment.REQUEST_ID = in_request_id;
	var serviceUrl = "requestService/handleUpdate/updateRequest/insertAttachmentRequest";
	
	if(utilLib.validateObjectAttributes(attachment, userId, attachmentKeys, serviceUrl, validateType)){
		return dataAttachmentR.insertAttachmentRequest(attachment, userId);
	}
}

function deleteAttachment(attachment, in_request_id, userId){
	attachment.REQUEST_ID = in_request_id;
		if(bussinesAttachment.deleteManualAttachment(attachment, userId)){
			bussinesAttachment.deleteManualAttachmentRequestConection(attachment.ATTACHMENT_ID, in_request_id ,userId);
		}
}

function updateAttachments(original_attachments, newAttachments, request_id, user_id){

	var original_attachments_local = original_attachments;
    var originalAttachmentsToUpdate = newAttachments;

    var insertOriginalAttachments = [];
    var deleteOriginalAttachments = [];
    
    //DELETE
    original_attachments_local.forEach(function (o_attachment) {
        var result = true;
        var o_attachment_id = o_attachment.ATTACHMENT_ID;
        if (typeof o_attachment_id === 'string') {
        	o_attachment_id = Number(o_attachment_id);
        }
        originalAttachmentsToUpdate.forEach(function (updateAttach) {
        	updateAttach.ATTACHMENT_ID = Number(updateAttach.ATTACHMENT_ID);
            if (o_attachment_id === updateAttach.ATTACHMENT_ID) {
                result = false;
            }
        });
        if (result) {
        	deleteOriginalAttachments.push(o_attachment);
        }
    });
    
    //INSERT
    originalAttachmentsToUpdate.forEach(function (newAttach) {
        var result = true;
        newAttach.ATTACHMENT_ID = Number(newAttach.ATTACHMENT_ID);
        original_attachments_local.forEach(function (attachment) {
            var o_attachment_id = attachment.ATTACHMENT_ID;
            if (typeof o_attachment_id === 'string') {
            	o_attachment_id = Number(o_attachment_id);
            }
            if (newAttach.ATTACHMENT_ID === o_attachment_id) {
                result = false;
            }
        });
        if (result) {
        	insertOriginalAttachments.push(newAttach);
        }
    });
         
    //ACTIONS
    if(insertOriginalAttachments.length > 0){
    	insertOriginalAttachments.forEach(function(attachment){
    		insertAttachmentRequest(attachment, request_id, user_id);
    	});
    }
    if(deleteOriginalAttachments.length > 0){
    	deleteOriginalAttachments.forEach(function(attachment){
    		deleteAttachment(attachment, request_id, user_id);
    	});
    }
	return 1; 
}

function deleteManualNoteRequest(note_request_id, user_id){
	dataNoteReq.deleteManualNoteRequestById(note_request_id, user_id); 
}


function updateManualNoteRequest(objNoteReq, user_id){
	dataNoteReq.updateManualNoteRequest(objNoteReq, user_id); 	
}

function deleteNotes(notes, user_id){
	notes.forEach(function(note){
		deleteManualNoteRequest(note.NOTE_REQUEST_ID, user_id);
	});
}



//SPECIAL REQUEST
function updateSpecialRequest(special_request, user_id){
	return businessSpecialRequest.updateSpecialRequest(special_request, user_id);
}

function insertSpecialRequest(special_request, request_id, user_id){
	special_request.REQUEST_ID = request_id;
	return businessSpecialRequest.insertSpecialRequest(special_request, user_id);
}

function deleteSpecialRequest(special_request_id, user_id){
	return businessSpecialRequest.deleteSpecialRequest(special_request_id, user_id);
}

//RISK FUNDED
function updateRiskFunded(risk_funded, user_id){
	var serviceUrl = "requestService/handleUpdate/updateRequest/updateRiskFunded";
	var updateRiskFundedKeys = riskFundedKeys;
	updateRiskFundedKeys.push("REQUEST_RISK_FUNDED_ID");
	if(utilLib.validateObjectAttributes(risk_funded, user_id, updateRiskFundedKeys, serviceUrl, validateType)){
		return dataRRiskFunded.updateManualRiskFunded(risk_funded, user_id);
	}	
	
}

function deleteRiskFunded(risk_funded, user_id){
	dataNewCartRiskFunded.deleteManualRiskFunded(risk_funded.REQUEST_RISK_FUNDED_ID, user_id);
}

function insertRiskFunded(reqBody, user_id){
	var serviceUrl = "requestService/handleUpdate/updateRequest/insertRiskFunded";
	if(utilLib.validateObjectAttributes(reqBody, user_id, riskFundedKeys, serviceUrl, validateType)){
		return dataNewCartRiskFunded.insertRiskFunded(reqBody, user_id);
	}	
}

//COST OBJECT
function updateCostObject(cost_object, user_id){
	return dataUpdateCostObject.updateManualCostObject(cost_object, user_id);
}

//NON-SAP VENDOR
function insertManualNonSapVendor(non_sap_vendor, user_id){
	var serviceUrl = "requestService/handleUpdate/updateRequest/insertManualNonSapVendor";
	if(utilLib.validateObjectAttributes(non_sap_vendor, user_id, nonSapVendorKeys, serviceUrl, validateType)){
		return businessNonSap.insertManualNonSapVendor(non_sap_vendor, user_id);	
	}
}

function updateManualNonSapVendor(non_sap_vendor, user_id){
	var serviceUrl = "requestService/handleUpdate/updateRequest/updateManualNonSapVendor";
	var updateNonSapVendorKeys = nonSapVendorKeys;
	updateNonSapVendorKeys.push("NON_SAP_VENDOR_ID");
	if(utilLib.validateObjectAttributes(non_sap_vendor, user_id, updateNonSapVendorKeys, serviceUrl, validateType)){
		return businessNonSap.updateManualNonSapVendor(non_sap_vendor, user_id);	
	}
}

function deleteManualNonSapVendor(non_sap_vendor_id, user_id){
	non_sap_vendor_id = Number(non_sap_vendor_id);
	
	return businessNonSap.deleteManualNonSapVendor(non_sap_vendor_id, user_id);	
}

//NOTES
function updateNotes(original_notes, notes, request_id, userId){
	var original_notes_local = original_notes;
    var updateOriginalNotes = notes;
    var insertOriginalNotes = [];
    var updateNotesArray = [];
    var deleteOriginalNotes = [];
    
    if( original_notes_local.length > 0){
    	//DELETE
        original_notes_local.forEach(function (o_note) {
            var result = true;
            var o_note_id = o_note.NOTE_REQUEST_ID;
            if (typeof o_note_id === 'string') {
                o_note_id = Number(o_note_id);
            }
            updateOriginalNotes.forEach(function (updateNote) {
            	updateNote.NOTE_REQUEST_ID = Number(updateNote.NOTE_REQUEST_ID);
                if (updateNote.NOTE_TEXT !== null && (updateNote.NOTE_TEXT).length > 0 && o_note_id === updateNote.NOTE_REQUEST_ID) {
       
                	result = false;
                }
            });
            if (result) {
                deleteOriginalNotes.push(o_note_id);
            }
        });
        
        //UPDATE
        updateOriginalNotes.forEach(function (newNote) {
            var result = false;
            newNote.NOTE_REQUEST_ID = Number(newNote.NOTE_REQUEST_ID);
            original_notes_local.forEach(function (note) {
                var o_note_id = note.NOTE_REQUEST_ID;
                if (typeof o_note_id === 'string') {
                    o_note_id = Number(o_note_id);
                }
                if (newNote.NOTE_REQUEST_ID !== undefined && newNote.NOTE_TEXT !== null && (newNote.NOTE_TEXT).length > 0 && newNote.NOTE_REQUEST_ID === o_note_id) {
                    result = true;
                }
            });
            if (result) {
            	updateNotes.push(newNote);
            }
        }); 
        
        //INSERT
        updateOriginalNotes.forEach(function (newNote) {
            var result = true;
            newNote.NOTE_REQUEST_ID = Number(newNote.NOTE_REQUEST_ID);
            original_notes_local.forEach(function (note) {
                var o_note_id = note.NOTE_REQUEST_ID;
                if (typeof o_note_id === 'string') {
                    o_note_id = Number(o_note_id);
                }
                if (newNote.NOTE_TEXT === null || (newNote.NOTE_TEXT).length === 0 || newNote.NOTE_REQUEST_ID === o_note_id) {
                    result = false;
                }
            });
            if (result) {
                insertOriginalNotes.push(newNote);
            }
        });
    }
    else{
    	updateOriginalNotes.forEach(function (newNote) {
            if (newNote.NOTE_TEXT !== null) {
                insertOriginalNotes.push(newNote);
            }
        });
    }

    insertOriginalNotes.forEach(function (insertNote) {
        insertManualNoteRequest(insertNote, request_id, userId);
    });
    updateNotesArray.forEach(function (note){
    	updateManualNoteRequest(note, userId);
    });
    deleteOriginalNotes.forEach(function (deleteNote) {
        deleteManualNoteRequest(deleteNote, userId);
    });
    
}

//SERVICES

function updateRequestService(reqBody, user_id){
	dataRUpdateService.updateManualRequestService(reqBody, user_id);
} 

function insertService(reqBody, user_id){
	var serviceUrl = "requestService/handleUpdate/updateRequest/insertService";
	if(utilLib.validateObjectAttributes(reqBody, user_id, ServiceKeys, serviceUrl, validateType)){
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
function insertEditServices(services, requestId, userId){
	(services).forEach(function(itemService){
		itemService.REQUEST_ID = requestId;
		insertService(itemService, userId);
	});

}

function updateService(reqBody, user_id){
	var updateServiceKeys = ServiceKeys;
	updateServiceKeys.push('SERVICE_ID');
	var serviceUrl = "requestService/handleUpdate/updateRequest/updateService";
	if(utilLib.validateObjectAttributes(reqBody, user_id, updateServiceKeys, serviceUrl, validateType)){
		return dataUpdateService.updateService(reqBody, user_id);
	}	
}

function deleteService(service_id, user_id){
		return dataService.deleteManualServiceById(service_id, user_id);
}

function deleteServices(services, user_id){ 
	services.forEach(function(service){
		deleteService(service, user_id);
	});
}

function updateEachService(services, userId){
	services.forEach(function(service){
		updateService(service, userId);
	});
}

//Return the total amount to be used in Request Service
function updateServices(original_services, services, request_id, conversion_rate, userId){
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
        	updateService.SERVICE_ID = Number(updateService.SERVICE_ID);
            if (o_service_id === updateService.SERVICE_ID) {
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
        newService.SERVICE_ID = Number(newService.SERVICE_ID);
        original_services_local.forEach(function (service) {
            var o_service_id = service.SERVICE_ID;
            if (typeof o_service_id === 'string') {
                o_service_id = Number(o_service_id);
            }
            if (newService.SERVICE_ID === o_service_id) {
                result = false;
            }
        });
        if (result) {
            insertOriginalServices.push(newService);
        }
    });
    
    //UPDATE
    originalServicesToUpdate.forEach(function (newService) {
        var result = false;
        newService.SERVICE_ID = Number(newService.SERVICE_ID);
        original_services_local.forEach(function (service) {
            var o_service_id = service.SERVICE_ID;
            if (typeof o_service_id === 'string') {
                o_service_id = Number(o_service_id);
            }
            if (newService.SERVICE_ID === o_service_id) {
                result = true;
            }
        });
        if (result) {
            updateOriginalServices.push(newService);
        }
    });
     
    //ACTIONS
    if(insertOriginalServices.length > 0){
    	 insertEditServices(insertOriginalServices, request_id, userId);
    }
    if(updateOriginalServices.length > 0){
    	updateEachService(updateOriginalServices, userId);
    }
    if(deleteOriginalServices.length > 0){
    	deleteServices(deleteOriginalServices, userId);
    }
    
    //Obtain total amount to be used in REQUEST_SERVICE
	(services).forEach(function(itemService){
		amount += Number(itemService.AMOUNT);
		itemService.BUDGET = itemService.AMOUNT * conversion_rate;
	});
	
	return amount;
}

function updateAttachmentRequest(objRequest, user_id){
	var request;
	try{
		var atachmentList = dataRequest.getAttachmentByRequestId(objRequest.REQUEST_ID, user_id);
		
		//ATTACHMENTS UPDATE
		if(atachmentList){
			request = updateAttachments(atachmentList, objRequest.ATTACHMENTS, objRequest.REQUEST_ID, user_id);
		}
		dbHelper.commit();
	}
	catch(e){
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(),"updateAttachmentRequest");
	}
	finally{
		dbHelper.closeConnection();
	}
	return request;
	
}

//Send Mail
function sendResubmitMail(requestId, requester, userId){
	 var requestMailObj = {};
	 requestMailObj.REQUEST_ID = requestId;
	 var mailObj = requestMail.parseResubmitted(requestMailObj,getUrlBase(), getPath(pathName), requester);
	 var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);         
	 mail.sendMail(emailObj,true,null);
}

//REQUEST
function updateRequest(reqBody, user_id){
	var original_request = getRequestById(reqBody.REQUEST_ID, user_id);
	var atachmentList = dataRequest.getAttachmentByRequestId(reqBody.REQUEST_ID, user_id);
	var request;
	try{
		//Infrastructure & location of work logic
		if(reqBody.INFRASTRUCTURE_OF_WORK_ID == 0 || reqBody.LOCATION_OF_WORK_ID == 0){
			reqBody.INFRASTRUCTURE_OF_WORK_ID = null;
			reqBody.LOCATION_OF_WORK_ID = null;
		}
		//STATUS UPDATE
		reqBody.PREVIOUS_STATUS_ID = reqBody.STATUS_ID;
		if(Number(reqBody.PREVIOUS_STATUS_ID) !== statusMap.TO_BE_CHECKED){
			reqBody.STATUS_ID = statusMap.TO_BE_CHECKED;
			status.updateRequestStatusManual(reqBody, user_id);
		}
		
		//NON-SAP VENDOR UPDATE
		if(original_request.NON_SAP_VENDOR_ID == null && reqBody.NON_SAP_VENDOR !== null){
			var nonsap = insertManualNonSapVendor(reqBody.NON_SAP_VENDOR, user_id);
			reqBody.NON_SAP_VENDOR_ID = nonsap;
			reqBody.VENDOR_ID = null;
		
		} else if(original_request.NON_SAP_VENDOR_ID !== null && reqBody.NON_SAP_VENDOR !== null) {
			var non_sap_id = Number(original_request.NON_SAP_VENDOR_ID);
			updateManualNonSapVendor(reqBody.NON_SAP_VENDOR, user_id);
			reqBody.NON_SAP_VENDOR_ID = reqBody.NON_SAP_VENDOR.NON_SAP_VENDOR_ID;
			reqBody.VENDOR_ID = null;

		} else if(original_request.NON_SAP_VENDOR_ID !== null && reqBody.NON_SAP_VENDOR == null){
			var non_sap_id = Number(original_request.NON_SAP_VENDOR_ID);
			deleteManualNonSapVendor(non_sap_id, user_id);
			reqBody.NON_SAP_VENDOR_ID = null;
		} else{
			reqBody.NON_SAP_VENDOR_ID = null;
		}
		
		//MATERIAL_ID LOGIC
		//SPECIAL REQUEST UPDATE
		if((original_request.SPECIAL_REQUEST.length > 0) && (reqBody.SPECIAL_REQUEST && Object.keys(reqBody.SPECIAL_REQUEST).length > 0)){
			updateSpecialRequest(reqBody.SPECIAL_REQUEST, original_request.REQUEST_ID ,user_id);
			reqBody.MATERIAL_ID = null;
		
		} else if((original_request.SPECIAL_REQUEST.length == 0) && (reqBody.SPECIAL_REQUEST && Object.keys(reqBody.SPECIAL_REQUEST).length > 0)){
			insertSpecialRequest(reqBody.SPECIAL_REQUEST, original_request.REQUEST_ID ,user_id);
			reqBody.MATERIAL_ID = null;
		} else if((original_request.SPECIAL_REQUEST.length > 0) && (reqBody.SPECIAL_REQUEST && Object.keys(reqBody.SPECIAL_REQUEST).length == 0)){
			deleteSpecialRequest(original_request.SPECIAL_REQUEST[0].SPECIAL_REQUEST_ID, original_request.REQUEST_ID ,user_id);
		}
		
		//NOTES UPDATE
		if(reqBody.NOTES !== null && reqBody.NOTES !== undefined && Object.keys(reqBody.NOTES).length > 0){
			updateNotes(original_request.NOTES, reqBody.NOTES, original_request.REQUEST_ID, user_id);
		
		} else if(original_request.NOTES.length > 0){
			deleteNotes(reqBody.NOTES, user_id);
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
			reqBody.RISK_FUNDED.AMOUNT_KEUR = (Number(reqBody.RISK_FUNDED.AMOUNT) / risk_conversion_rate) / 1000;
			updateRiskFunded(reqBody.RISK_FUNDED, user_id);
		
		} else if((original_request.RISK_FUNDED).length == 0 && Object.keys(reqBody.RISK_FUNDED).length > 0){
			var risk_conversion_rate_table = dataCurrency.getManualCurrencyConversionRate(reqBody.RISK_FUNDED.CURRENCY_ID);
			var risk_conversion_rate = parseFloat(risk_conversion_rate_table[0].CONVERSION_RATE);
			
			reqBody.RISK_FUNDED.REQUEST_ID = original_request.REQUEST_ID;
			reqBody.RISK_FUNDED.AMOUNT = Number(reqBody.RISK_FUNDED.AMOUNT);
			reqBody.RISK_FUNDED.AMOUNT_KEUR = Number(reqBody.RISK_FUNDED.AMOUNT) * risk_conversion_rate;
			
			insertRiskFunded(reqBody.RISK_FUNDED, user_id);
		
		} else if((original_request.RISK_FUNDED).length > 0 && Object.keys(reqBody.RISK_FUNDED).length == 0){
			deleteRiskFunded(original_request.RISK_FUNDED[0], user_id);
		
		}
		 
		//REQUEST SERVICE & SERVICES UPDATES
		if(reqBody.REQUEST_SERVICE !== undefined){
			if((reqBody.REQUEST_SERVICE.PURCHASE_ORDER_AMOUNT) == ""){
				reqBody.REQUEST_SERVICE.PURCHASE_ORDER_AMOUNT = null;
				reqBody.REQUEST_SERVICE.PURCHASE_ORDER_TO_UPLIFT = null;
				reqBody.REQUEST_SERVICE.LINE_TO_UPLIFT = null;
			}
			if((reqBody.REQUEST_SERVICE.SAP_BUYER_NAME) == ""){
				reqBody.REQUEST_SERVICE.SAP_BUYER_NAME = null;
			}
			var conversion_rate_table = dataCurrency.getManualCurrencyConversionRate(reqBody.REQUEST_SERVICE.CURRENCY_ID);
			var conversion_rate = parseFloat(conversion_rate_table[0].CONVERSION_RATE);
			var cart_amount = updateServices(original_request.SERVICES, reqBody.SERVICES, reqBody.REQUEST_ID, conversion_rate, user_id);
			reqBody.CART_AMOUNT = cart_amount;
			reqBody.TOTAL_BUDGET = cart_amount * conversion_rate;

			updateRequestService(reqBody.REQUEST_SERVICE, user_id);
		}
		//REQUEST UPDATE
		request = dataRequest.updateRequestManual(reqBody, user_id);
		
		//DATA PROTECTION ANSWERS UPDATE
		(reqBody.DATA_PROTECTION_ANSWERS).forEach(function(item){
			updateDataProtectionAnswer(item, user_id);
		});
		
		//ATTACHMENTS UPDATE
		if(atachmentList){
			updateAttachments(atachmentList, reqBody.ATTACHMENTS, reqBody.REQUEST_ID, user_id);
		}
		
		dbHelper.commit();
		
		sendResubmitMail(reqBody.REQUEST_ID, reqBody.REQUESTER,user_id);
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
		dataRequest.deleteRequestDataProtectionAnswersByRequestId(request_id, user_id);
		var atachmentList = dataRequest.getAttachmentByRequestId(request_id, user_id);
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
	var result = dataRequest.getAttachmentByRequestId(requestId, user_id);
	result = JSON.parse(JSON.stringify(result));
	result.forEach(function(attach){
		attach.ATTACHMENT_SIZE = (parseFloat(Number(attach.ATTACHMENT_SIZE) / 1048576).toFixed(2)) + " MB";
	});
	
	return result;
}

function getUrlBase(){
	return config.getUrlBase();
}

function getEmailList(requestMailObj){
	return config.getEmailList();
}

function getPath(stringName){
	return config.getPath(stringName);
}
