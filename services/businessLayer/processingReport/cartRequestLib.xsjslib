$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var data = mapper.getDataCartRequest();
var request = mapper.getRequest();
var cartRequestMail = mapper.getCartRequestMail();
var mail = mapper.getMail();
var ErrorLib = mapper.getErrors();
var service = mapper.getService();
var purchase = mapper.getPurchaseOrderService();
var material = mapper.getMaterial();
var businessUser = mapper.getUser();
var catalog = mapper.getCatalog();
var special = mapper.getDataSpecialRequest();
var budgetYear = mapper.getBudgetYear();
var config = mapper.getDataConfig();
var userRole = mapper.getUserRole();
var dataRequest = mapper.getDataRequest();

/** ***********END INCLUDE LIBRARIES*************** */

var statusMap = {'TO_BE_CHECKED': 1, 'CHECKED': 2, 'IN_PROCESS': 3, 'RETURN_TO_REQUESTER': 4, 'APPROVED': 5, 'CANCELLED': 6};
var stageMap = {'STAGE_B': 2, 'STAGE_C': 3, 'STAGE_D': 4, 'STAGE_E': 5, 'STAGE_F': 6};
var pathName = "CART_REQUEST";

//Access validation by Status
function validateAccess(request_id){
	//In this case we validate against the Request Status only
	var request_status = dataRequest.getRequestStatusByRequestId(request_id);
	if(!request_status){
		return false;
	}
	
	return !(request_status.STATUS_NAME === 'Approved' || request_status.STATUS_NAME === 'Cancelled');
}

//Get request by status
function getAllCartRequest(userId) {
	if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "requestService/handleGet/getAllRequest", userId);
    }
	var request = [];
	request = data.getAllRequest(userId);
	request = JSON.parse(JSON.stringify(request));
	request.forEach(function(elem){
    	if(elem.MESSAGE_READ > 0){
    		elem.SHOW_MESSAGE_READ = 1;
    	} else {
    		elem.SHOW_MESSAGE_READ = 0;
    	}
    	if(elem.STATUS_NAME !== 'In process'){
    		elem.DAYS_OUTSTANDING = 'N/A';
    	}
    	if(Number(elem.DAYS_OUTSTANDING) < 0){
    		elem.DAYS_OUTSTANDING = 'N/A';
    	}
    });
	return request;
}

function validatePermissionByUserRole(roleData, resRequest){
	return (roleData.ROLE_ID !== "2")? true : (Number(roleData.USER_ID) === Number(resRequest.REQUESTER_ID));
}

//Get request by id
function getRequestById(requestId, userId) {
	var resRequest = data.getRequestByIdManual(requestId);
	var roleData = userRole.getUserRoleByUserId(userId);
	
	if(!validateAccess(requestId)){
		throw ErrorLib.getErrors().BadRequest(
				"",
				"cartRequestService/handleGet/getRequestById", '{"NOT_AVAILABLE_IN_PROCESSING": "Cart Request"}');
	}
	
	if(validatePermissionByUserRole(roleData[0], resRequest)){
		var resReqService = request.getRequestServiceByRequestId(requestId)[0];
		var resService = request.getServicesByRequestId(requestId);
	    var resNote = request.getNoteRequestByRequestId(requestId);
	    var resDataProtection = request.getRequestDataProtection(requestId);
	    var resPurchase = purchase.getPurchaseOrderByIdManual(requestId);
	    var resCostObject = request.getCostObjectByRequestId(requestId)[0];
	    var resAttachment = request.getAttachmentRequest(requestId, userId);
	    var resMaterial = "";
	    var resSubCategory = "";
	    var resCategory = "";
	    var resCatalog = "";
	    var resSpecial = "";
	    if (Number(resRequest.MATERIAL_ID) > 0){
	    	resMaterial = material.getManualMaterialById(Number(resRequest.MATERIAL_ID), userId)[0];
	    	if (resMaterial){
			    resSubCategory = catalog.getCatalogByIdManual(Number(resMaterial.CATALOG_ID))[0];
			    resCategory = catalog.getCatalogByIdManual(resSubCategory.CATALOG_PARENT_ID)[0];
			    if (resCategory.CATALOG_PARENT_ID > 0) {
			    	resCatalog = catalog.getCatalogByIdManual(resCategory.CATALOG_PARENT_ID)[0];
			    } else {
			    	resCatalog = resCategory;
			    	resCategory = resSubCategory;
			    	resSubCategory = "";
			    } 
	    	}
	    } else {
	    	resSpecial = special.getSpecialRequestByRequestId(requestId, userId);
	    }
	    var res = JSON.parse(JSON.stringify(resRequest));
	    res.NOTES = resNote;
	    res.REQUEST_SERVICE = resReqService;
	    res.SERVICE = resService;
	    resDataProtection = JSON.parse(JSON.stringify(resDataProtection));
	    resDataProtection.forEach(function (elem) {
	    	if (resDataProtection.indexOf(elem) % 2 === 0) {
	    		elem.INDEX_TYPE = 'odd';
	    	} else {
	    		elem.INDEX_TYPE = 'even';
	    	}
	    });
	    res.DATA_PROTECTION = resDataProtection;
	    res.PURCHASE = resPurchase;
	    res.COST_OBJECT = resCostObject;
	    res.ATTACHMENT = resAttachment;
	    if (res.MATERIAL_ID){
	    	res.MATERIAL = resMaterial || "";
	    	res.SUB_CATEGORY = resSubCategory;
	    	res.CATEGORY = resCategory;
	    	res.CATALOG = resCatalog;
	    } else {
	    	res.SPECIAL_REQUEST = resSpecial;
	    }
	    return res;
	} else{
		throw ErrorLib.getErrors().Forbidden("", "cartRequestService/handleGet/getRequestById", "The user does not have permission for this Cart Request.");
	}
 	
}

//Get request data protection answer by request id
function getRequestDataProtection(requestId) {
    return data.getRequestDataProtection(requestId);
}

//Update cart request status
function updateRequestStatus(objRequest, userId) {
    if (validateUpdateRequestStatus(objRequest, userId)) {
    	if(Number(objRequest.STATUS_ID) === statusMap.TO_BE_CHECKED){
    		switch (Number(objRequest.PREVIOUS_STATUS_ID)) {
    		case statusMap.APPROVED:
    			objRequest.STAGE_ID = stageMap.STAGE_E;
    			break;
    		case statusMap.CANCELLED:
    			objRequest.STAGE_ID = stageMap.STAGE_F;
    			break;
    		default:
    			objRequest.STAGE_ID = stageMap.STAGE_C;
    		}
    	} else if(Number(objRequest.STATUS_ID) === statusMap.CHECKED){
    		objRequest.STAGE_ID = stageMap.STAGE_C;
    	} else if(Number(objRequest.STATUS_ID) === statusMap.IN_PROCESS){
    		objRequest.STAGE_ID = stageMap.STAGE_D;
    	} else if(Number(objRequest.STATUS_ID) === statusMap.RETURN_TO_REQUESTER){
    		objRequest.STAGE_ID = stageMap.STAGE_B;
    	} else if(Number(objRequest.STATUS_ID) === statusMap.APPROVED){
    		objRequest.STAGE_ID = stageMap.STAGE_E;
    	} else if(Number(objRequest.STATUS_ID) === statusMap.CANCELLED){
    		objRequest.STAGE_ID = stageMap.STAGE_F;
    	} else {
    		throw ErrorLib.getErrors().CustomError("", "cartRequestService/handlePut/updateRequestStatus", "Invalid status id");
    	}
    	return data.updateRequestStatus(objRequest, userId);
    }
}

//Update cart request status manual
function updateRequestStatusManual(objRequest, userId) {
    if (validateUpdateRequestStatus(objRequest, userId)) {
    	if(Number(objRequest.STATUS_ID) === statusMap.TO_BE_CHECKED){
    		switch (Number(objRequest.PREVIOUS_STATUS_ID)) {
    		case statusMap.APPROVED:
    			objRequest.STAGE_ID = stageMap.STAGE_E;
    			break;
    		case statusMap.CANCELLED:
    			objRequest.STAGE_ID = stageMap.STAGE_F;
    			break;
    		default:
    			objRequest.STAGE_ID = stageMap.STAGE_C;
    		}
    	} else if(Number(objRequest.STATUS_ID) === statusMap.CHECKED){
    		objRequest.STAGE_ID = stageMap.STAGE_C;
    	} else if(Number(objRequest.STATUS_ID) === statusMap.IN_PROCESS){
    		objRequest.STAGE_ID = stageMap.STAGE_D;
    	} else if(Number(objRequest.STATUS_ID) === statusMap.RETURN_TO_REQUESTER){
    		objRequest.STAGE_ID = stageMap.STAGE_B;
    	} else if(Number(objRequest.STATUS_ID) === statusMap.APPROVED){
    		objRequest.STAGE_ID = stageMap.STAGE_E;
    	} else if(Number(objRequest.STATUS_ID) === statusMap.CANCELLED){
    		objRequest.STAGE_ID = stageMap.STAGE_F;
    	} else {
    		throw ErrorLib.getErrors().CustomError("", "cartRequestService/handlePut/updateRequestStatus", "Invalid status id");
    	}
    	return data.updateRequestStatusManual(objRequest, userId);
    }
}

//Validate update cart request status
function validateUpdateRequestStatus(objRequest, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "cartRequestService/handlePut/updateRequestStatus", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'REQUEST_ID',
        'STATUS_ID',
        'PREVIOUS_STATUS_ID'];

    if (!objRequest) {
        throw ErrorLib.getErrors().CustomError("", "cartRequestService/handlePut/updateRequestStatus", "The object Cart Request is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objRequest[key] === null || objRequest[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objRequest[key]);
                if (!isValid) {
                    errors[key] = objRequest[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "cartRequestService/handlePut/updateRequestStatus", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "cartRequestService/handlePut/updateRequestStatus", JSON.stringify(errors));
        }
    }
    return isValid;
}

//Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'REQUEST_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'STATUS_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'PREVIOUS_STATUS_ID':
            valid = !isNaN(value) && value > 0;
            break;
    }
    return valid;
}

function sendMailByStatus(objRequest, mailData, userId){
	if(objRequest.STATUS_ID && (Number(objRequest.STATUS_ID) > 2 && Number(objRequest.STATUS_ID) < 7)){
		var cartRequestMailObj = {};
		var mailObj = {};
		var userData = businessUser.getUserById(userId)[0];
		var requester = userData.FIRST_NAME + ' ' + userData.LAST_NAME + ' (' + userData.USER_NAME + ')';
		cartRequestMailObj.REQUEST_ID = objRequest.REQUEST_ID;
		var statusId = objRequest.STATUS_ID;
		switch (statusId) {
			case '3':
			case 3:
				cartRequestMailObj.SHOPPING_CART = objRequest.SHOPPING_CART;
				mailObj = cartRequestMail.parseInProcess(cartRequestMailObj, getBasicData(pathName),requester);
				break;
			case '4':
			case 4:
				mailObj = cartRequestMail.parseReturnToRequest(cartRequestMailObj, getBasicData(pathName), requester);
				break;
			case '5':
			case 5:
				cartRequestMailObj.SERVICES = mailData;
				mailObj = cartRequestMail.parseApproved(cartRequestMailObj, getBasicData(pathName), requester);
				break;
			case '6':
			case 6:
				mailObj = cartRequestMail.parseCancelled(cartRequestMailObj, getBasicData(pathName), requester);
				break;
		}
		
		var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
		mail.sendMail(emailObj,true,null);
	}
}

function getRequestMailDataByRequestId(objRequest, userId){
	return data.getRequestMailDataByRequestId(objRequest, userId);
}

function getUrlBase(){
	return config.getUrlBase();
}

function getEmailList(inquiryMailObj){
	return config.getEmailList();
}

function getPath(stringName){
	return config.getPath(stringName);
}

function getBasicData(stringPathName){
	return config.getBasicData(stringPathName);
}