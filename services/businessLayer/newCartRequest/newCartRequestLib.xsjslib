$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var data = mapper.getDataNewCartRequest();
var dataRService = mapper.getDataNewCartRequestService();
var dataService = mapper.getDataService();
var dataSpecialRequest = mapper.getDataSpecialRequest();
var businessSpecialRequest = mapper.getSpecialRequest();
var businessNonSap = mapper.getNonSapVendor();
var dataRCostObject = mapper.getDataRequestCostObject();
var dataRRiskFunded = mapper.getDataNewCartRequestRiskFunded();
var dataRDataProtection = mapper.getDataRequestDataProtection();
var dataMaterial = mapper.getDataMaterial();
var dataAttachmentR = mapper.getDataAttachmentRequest();
var dataAttachment = mapper.getDataAttachment();
var businessAttachment = mapper.getAttachment();
var dataNoteReq = mapper.getDataNoteRequest();
var newCartRequestMail = mapper.getCartRequestMail();
var mail = mapper.getMail();
var dbHelper = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();

function insertRequestService(reqBody, requestId, user_id){
	reqBody.REQUEST_ID = requestId;
	if(validateInsertRequestService(reqBody, user_id)){
		return dataRService.insertRequestService(reqBody, user_id);
	}	
}

function insertSpecialRequest(reqBody, requestId, user_id){
	reqBody.REQUEST_ID = requestId;
	if(businessSpecialRequest.validateInsertSpecialRequest(reqBody, user_id)){
		return dataSpecialRequest.insertSpecialRequest(reqBody, user_id);
	}	
}

function insertService(reqBody, user_id){
	if(validateInsertService(reqBody, user_id)){
		return dataService.insertService(reqBody, user_id);
	}	
}

function insertServices(services, requestId, userId){
	(services).forEach(function(itemService){
		itemService.REQUEST_ID = requestId;
		insertService(itemService, userId);
	});
}


function insertCostObject(reqBody, user_id){
	if(validateInsertCostObject(reqBody, user_id)){
		return dataRCostObject.insertCostObject(reqBody, user_id);
	}	
}

function insertRiskFunded(reqBody, user_id){
	if(validateInsertRiskFunded(reqBody, user_id)){
		return dataRRiskFunded.insertRiskFunded(reqBody, user_id);
	}	
}

function insertDataProtectionAnswer(reqBody, in_request_id, user_id){
	reqBody.REQUEST_ID = in_request_id;
	if(validateInsertDataProtectionAnswer(reqBody, user_id)){
		return dataRDataProtection.insertDataProtectionAnswer(reqBody, user_id);
	}	
}


function insertMaterial(reqBody, user_id){
	if(validateInsertMaterial(reqBody, user_id)){
		return dataMaterial.insertMaterial(reqBody, user_id);
	}	
}

function insertAttachmentRequest(objAttachment, in_request_id, userId){
	var param = {};
    if (businessAttachment.validateInsertAttachment(objAttachment, userId)) {
    	
    		var attachment_id = dataAttachment.insertAttachment(objAttachment, userId);
    		if(attachment_id){
    			param.REQUEST_ID = in_request_id;
    			param.ATTACHMENT_ID = attachment_id;
    			dataAttachmentR.insertAttachmentRequest(param, userId);  
    		}
    		else{
    			 throw ErrorLib.getErrors().BadRequest("The Parameter attachment_id is not found or is incorrect", "requestService/handleGet/insertAttachmentRequest", attachment_id);
    		} 	
    }
}

function insertNoteRequest(objNoteReq, in_request_id, user_id){
	objNoteReq.REQUEST_ID = in_request_id;
	objNoteReq.USER_ID = user_id;
	if(validateInsertNoteRequest(objNoteReq, user_id)){
		dataNoteReq.insertNoteRequest(objNoteReq, user_id); 
	}
}

function insertNoteType(ObjNoteType, user_id){
	if(validateInsertNoteType(ObjNoteType, user_id)){
		dataNoteReq.insertNoteType(ObjNoteType, user_id);
	}
}

function insertManualNonSapVendor(objVendor, user_id){
	return businessNonSap.insertManualNonSapVendor(objVendor, user_id);
}

function insertRequest(reqBody, user_id){
	try{
		if(reqBody.NON_SAP_VENDOR !== null){
			var nonsap = insertManualNonSapVendor(reqBody.NON_SAP_VENDOR, user_id);
			reqBody.NON_SAP_VENDOR_ID = nonsap;
		} else{
			reqBody.NON_SAP_VENDOR_ID = null;
		}

		var request;
		if(validateInsertRequest(reqBody, user_id)){
			request = data.insertRequest(reqBody, user_id);
		}
		if(request){
			reqBody.COST_OBJECT.REQUEST_ID = request;
			if(reqBody.REQUEST_SERVICE !== undefined){
				insertRequestService(reqBody.REQUEST_SERVICE, request ,user_id);
			}
			insertServices(reqBody.SERVICES, request, user_id);
			if(reqBody.SPECIAL_REQUEST && Object.keys(reqBody.SPECIAL_REQUEST).length > 0){
				insertSpecialRequest(reqBody.SPECIAL_REQUEST, request ,user_id);
			}
			insertCostObject(reqBody.COST_OBJECT, user_id);
			if(Object.keys(reqBody.RISK_FUNDED).length > 0){
				reqBody.RISK_FUNDED.REQUEST_ID = request;
				reqBody.RISK_FUNDED.AMOUNT = Number(reqBody.RISK_FUNDED.AMOUNT);
				reqBody.RISK_FUNDED.AMOUNT_KEUR = Number(reqBody.RISK_FUNDED.AMOUNT_KEUR);
				insertRiskFunded(reqBody.RISK_FUNDED, user_id);
			}
			(reqBody.DATA_PROTECTION_ANSWERS).forEach(function(item){
				insertDataProtectionAnswer(item, request, user_id);
			});
			//(reqBody.ATTACHMENTS).forEach(function(attachment){
				//insertAttachmentRequest(attachment, request, user_id);
			//});
			if(reqBody.NOTES !== null && reqBody.NOTES !== undefined && Object.keys(reqBody.NOTES).length > 0){
				(reqBody.NOTES).forEach(function(note_request){
					insertNoteRequest(note_request, request, user_id);
				});
			}
		}
		dbHelper.commit();
	}
	catch(e){
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(),"insertRequest");
	}
	finally{
		dbHelper.closeConnection();
	}
	return request;
}

function validateInsertAttachmentRequest(objReq, userId) {
    if (!userId){
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "requestService/handlePut/insertRequest", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'REQUEST_ID',
        'ATTACHMENT_ID'];

    if (!objReq){
        throw ErrorLib.getErrors().CustomError("", "requestService/handlePost/insertRequest", "The object Request is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objReq[key] === null || objReq[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objReq[key]);
                if (!isValid) {
                    errors[key] = objReq[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "requestService/handlePost/insertRequest", e.toString());
        }
        else{
            throw ErrorLib.getErrors().CustomError("", "requestService/handlePost/insertRequest", JSON.stringify(errors));
        }
    }
    return isValid;
}

function validateInsertRequest(objRequest, user_id) {
	
	if(!user_id)
		throw ErrorLib.getErrors().BadRequest("The Parameter user_id is not found","requestService/handlePost/insertRequest",user_id);	
	
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = ['USER_ID',
	            'TEAM_ID',
	            'ENTITY_ID',
	            'STAGE_ID',
	            'GOODS_RECIPIENT_USERNAME',
	            'INFRASTRUCTURE_OF_WORK_ID',
	            'LOCATION_OF_WORK_ID',
	            'DATA_PROTECTION_ENABLED',
	            'BUDGET_YEAR_ID',
	            'DATA_PROTECTION_ANSWERS'
	            //'ATTACHMENTS'
	            ];
	
	if(!objRequest)
		throw ErrorLib.getErrors().CustomError("","requestService/handlePost/insertRequest","The object Request is not found");
	
	try {
		keys.forEach(function(key) {
			if (objRequest[key] === null || objRequest[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objRequest[key])
				if (!isValid) {
					errors[key] = objRequest[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("", "requestService/handlePost/InsertRequest", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("", "requestService/handlePost/InsertRequest"
					,JSON.stringify(errors));
	}
	return isValid;
}

function validateInsertRequestService(reqBody, user_id) {
	
	if(!user_id)
		throw ErrorLib.getErrors().BadRequest("The Parameter user_id is not found","requestServiceService/handlePost/insertRequestService",user_id);	
	
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = ['REQUEST_ID',
	            'CURRENCY_ID',
	            'CART_AMOUNT',
	            'TOTAL_BUDGET'];
	var optional_keys = ['PURCHASE_ORDER_TO_UPLIFT',
	                     'LINE_TO_UPLIFT',
	                     'PURCHASE_ORDER_AMOUNT',
	                     'SAP_BUYER_NAME'];
	
	if(!reqBody)
		throw ErrorLib.getErrors().CustomError("","requestServiceService/handlePost/insertRequestService","The object Request Service is not found");
	
	try {
		keys.forEach(function(key) {
			if (reqBody[key] === null || reqBody[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, reqBody[key])
				if (!isValid) {
					errors[key] = reqBody[key];
					throw BreakException;
				}
			}
		});
		optional_keys.forEach(function(key) {
				// validate attribute type
				isValid = validateType(key, reqBody[key])
				if (!isValid) {
					errors[key] = reqBody[key];
					throw BreakException;
				}
		});
		
		
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("", "requestServiceService/handlePost/insertRequestService", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("", "requestServiceService/handlePost/insertRequestService"
					,JSON.stringify(errors));
	}
	return isValid;
}

function validateInsertService(reqBody, user_id) {
	
	if(!user_id)
		throw ErrorLib.getErrors().BadRequest("The Parameter user_id is not found","serviceService/handlePost/insertService",user_id);	
	
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = ['REQUEST_ID',
	            'START_DATE',
	            'END_DATE',
	            'DESCRIPTION',
	            'BUDGET',
	            'ITEM'];
	var specialKeys = ['AMOUNT',
	                   'CURRENCY_ID'];
	
	if(!reqBody)
		throw ErrorLib.getErrors().CustomError("","serviceService/handlePost/insertService","The object Service is not found");
	
	try {
		keys.forEach(function(key) {
			if (reqBody[key] === null || reqBody[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, reqBody[key])
				if (!isValid) {
					errors[key] = reqBody[key];
					throw BreakException;
				}
			}
		});
		specialKeys.forEach(function(key) {
			if (reqBody[key] === null || reqBody[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateServiceType(key, reqBody[key])
				if (!isValid) {
					errors[key] = reqBody[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("", "serviceService/handlePost/insertService", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("", "serviceService/handlePost/insertService"
					,JSON.stringify(errors));
	}
	return isValid;
}


function validateInsertCostObject(reqBody, user_id) {
	
	if(!user_id)
		throw ErrorLib.getErrors().BadRequest("The Parameter user_id is not found","requestCostObjectService/handlePost/insertCostObject",user_id);	
	
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = ['REQUEST_ID',
	            'ENTITY_ID',
	            'COST_OBJECT_TYPE_ID',
	            'COST_VALUE'];
	
	if(!reqBody)
		throw ErrorLib.getErrors().CustomError("","requestCostObjectService/handlePost/insertCostObject","The object Cost Object is not found");
	
	try {
		keys.forEach(function(key) {
			if (reqBody[key] === null || reqBody[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, reqBody[key])
				if (!isValid) {
					errors[key] = reqBody[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("", "requestCostObjectService/handlePost/insertCostObject", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("", "requestCostObjectService/handlePost/insertCostObject"
					,JSON.stringify(errors));
	}
	return isValid;
}


function validateInsertDataProtectionAnswer(reqBody, user_id) {
	
	if(!user_id)
		throw ErrorLib.getErrors().BadRequest("The Parameter user_id is not found","dataProtectionService/handlePost/insertDataProtection",request_id);	
	
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = ['REQUEST_ID',
	            'QUESTION_ID',
	            'OPTION_ID'];
	
	if(!reqBody)
		throw ErrorLib.getErrors().CustomError("","dataProtectionService/handlePost/insertDataProtection","The object DataProtection is not found");
	
	try {
		keys.forEach(function(key) {
			if (reqBody[key] === null || reqBody[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, reqBody[key])
				if (!isValid) {
					errors[key] = reqBody[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("", "dataProtectionService/handlePost/insertDataProtection", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("", "dataProtectionService/handlePost/insertDataProtection"
					,JSON.stringify(errors));
	}
	return isValid;
}

function validateInsertNoteRequest(objReq, userId) {
    if (!userId){
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "requestService/handlePut/insertNoteRequest", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'REQUEST_ID',
        'USER_ID',
        'NOTE_TEXT',
        'NOTE_TYPE_ID'];

    if (!objReq){
        throw ErrorLib.getErrors().CustomError("", "requestService/handlePost/insertNoteRequest", "The object Note Request is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objReq[key] === null || objReq[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objReq[key]);
                if (!isValid) {
                    errors[key] = objReq[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "requestService/handlePost/insertNoteRequest", e.toString());
        }
        else{
            throw ErrorLib.getErrors().CustomError("", "requestService/handlePost/insertNoteRequest", JSON.stringify(errors));
        }
    }
    return isValid;
}

function validateInsertRiskFunded(reqBody, user_id) {
	
	if(!user_id)
		throw ErrorLib.getErrors().BadRequest("The Parameter user_id is not found","requestRiskFundedService/handlePost/insertRiskFunded",user_id);	
	
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = ['REQUEST_ID',
	            'AMOUNT',
	            'CURRENCY_ID',
	            'AMOUNT_KEUR'];
	
	if(!reqBody)
		throw ErrorLib.getErrors().CustomError("","requestRiskFundedService/handlePost/insertRiskFunded","The object Risk Funded is not found");
	
	try {
		keys.forEach(function(key) {
			if (reqBody[key] === null || reqBody[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, reqBody[key])
				if (!isValid) {
					errors[key] = reqBody[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("", "requestRiskFundedService/handlePost/insertRiskFunded", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("", "requestRiskFundedService/handlePost/insertRiskFunded"
					,JSON.stringify(errors));
	}
	return isValid;
}

function validateInsertMaterial(reqBody, user_id) {
	
	if(!user_id)
		throw ErrorLib.getErrors().BadRequest("The Parameter user_id is not found","materialService/handlePost/insertMaterial",user_id);	
	
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = ['PARENT_MATERIAL_ID',
	            'MATERIAL_DESCRIPTION',
	            'POPUP',
	            'CODE'];
	
	if(!reqBody)
		throw ErrorLib.getErrors().CustomError("","materialService/handlePost/insertMaterial","The object Material is not found");
	
	try {
		keys.forEach(function(key) {
			if (reqBody[key] === null || reqBody[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, reqBody[key])
				if (!isValid) {
					errors[key] = reqBody[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("", "materialService/handlePost/insertMaterial", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("", "materialService/handlePost/insertMaterial"
					,JSON.stringify(errors));
	}
	return isValid;
}

//Check data types
function validateType(key, value) {
	var valid = true;
	switch (key) {
	case 'REQUEST_SERVICE_ID':
		valid = !isNaN(value) && value > 0;
		break;	
	case 'REQUEST_RISK_FUNDED_ID':
		valid = !isNaN(value) && value > 0;
		break;		
	case 'REQUEST_COST_OBJECT_ID':
		valid = !isNaN(value) && value > 0;
		break;		
	case 'REQUEST_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'ENTITY_ID':
		valid = !isNaN(value) && value > 0;
		break;		
	case 'VENDOR_ID':
		valid = (!value) || (!isNaN(value) && value > 0);
		break;
	case 'NON_SAP_VENDOR_ID':
		valid = (!value) || (!isNaN(value) && value > 0);
		break;
	case 'STAGE_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'TEAM_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'STATUS_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'GOODS_RECIPIENT_USERNAME':
		valid = value.length > 0 && value.length <= 127;
		break;
	case 'INFRASTRUCTURE_OF_WORK_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'LOCATION_OF_WORK_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'DATA_PROTECTION_ENABLED':
		valid = !isNaN(value);
		break;
	case 'CREATED_USER_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'ATTACHMENT_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'COST_OBJECT_TYPE_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'COST_VALUE':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'PURCHASE_ORDER_TO_UPLIFT':
		valid = (!value) || (value.length > 0 && value.length <= 255);
		break;
	case 'LINE_TO_UPLIFT':
		valid = (!value) || (value.length > 0 && value.length <= 255);
		break;		
	case 'PURCHASE_ORDER_AMOUNT':
		valid = (!value) || (!isNaN(value));
		break;
	case 'SAP_BUYER_NAME':
		valid = (!value) || (value.length > 0 && value.length <= 511);
		break;
	case 'CART_AMOUNT':
		valid = (!isNaN(value)) || !(value);
		break;
	case 'TOTAL_BUDGET':
		valid = !isNaN(value);
		break;
	case 'QUESTION_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'OPTION_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'AMOUNT':
		valid = !isNaN(value) || (!value);
		break;
	case 'CURRENCY_ID':
		valid = (!isNaN(value) && value > 0) || (!value);
		break;
	case 'AMOUNT_KEUR':
		valid = !isNaN(value) || (!value);
		break;	
	case 'USER_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'MATERIAL_ID':
		valid = !isNaN(value) && value > 0;
		break;	
	case 'PARENT_MATERIAL_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'MATERIAL_DESCRIPTION':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'POPUP':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'POP_UP':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'CODE':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'MATERIAL_CODE':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'NOTE_TEXT':
		valid = value.length > 0 && value.length <= 1000;
		break;
	case 'NOTE_TYPE_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'DATA_PROTECTION_ANSWERS':
		valid = Array.isArray(value) && value.length > 0;
		break;
	case 'ATTACHMENTS':
		valid = Array.isArray(value) && value.length > 0;
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
	case 'BUDGET':
		valid = !isNaN(value);
		break;
	case 'ITEM':
		valid = !isNaN(value);
		break;
	case 'BUDGET_YEAR_ID':
		valid = !isNaN(value) && value > 0;
		break;
	}
	
	return valid;
}

//Check data types
function validateServiceType(key, value) {
	var valid = true;
	switch (key) {
		case 'AMOUNT':
			valid = !isNaN(value);
			break;
		case 'CURRENCY_ID':
			valid = (!isNaN(value) && value > 0);
			break;
	}
	
	return valid;
}

function sendSubmitMail(newCartRequestId, userId){
	var newCartRequestObj = {};
	newCartRequestObj.REQUEST_ID = newCartRequestId;
	var mailObj = newCartRequestMail.parseSubmit(newCartRequestObj,"http://localhost:63342/crt/webapp/index.html","admin");
	var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
	mail.sendMail(emailObj,true,null);
}

function getEmailList(vendorRequestObj){
	return [{address:'gorellano@folderit.net'}];
}