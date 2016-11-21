$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataStatus = mapper.getDataVendorRequestInquiryStatus();
var request = mapper.getVendorRequest();
var inquiry = mapper.getVendorInquiry();
var extend = mapper.getExtendVendorRequest();
var change = mapper.getChangeVendorRequest();
var changeVendorMail = mapper.getChangeVendorMail();
var mail = mapper.getMail();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//Get vendor request inquiry by status
function getVendorRequestInquiryByStatus(statusId) {
    if (!statusId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter statusId is not found", "vendorRequestInquiryService/handleGet/getVendorRequestInquiryByStatus", statusId);
    }
    return dataStatus.getVendorRequestInquiryByStatus(statusId);
}

//Get vendor request inquiry by status administrable
function getVendorRequestInquiryByStatusAdministrable(isAdministrable) {
    if (!isAdministrable) {
        throw ErrorLib.getErrors().BadRequest("The Parameter value is not found", "vendorRequestInquiryService/handleGet/getVendorRequestInquiryByStatusAdministrable", isAdministrable);
    }
    return dataStatus.getVendorRequestInquiryByStatusAdministrable(isAdministrable);
}

//Get vendor inquiry by status
function getVendorInquiryByStatus(statusId) {
    if (!statusId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter statusId is not found", "vendorInquiryService/handleGet/getVendorInquiryByStatus", statusId);
    }
    return dataStatus.getVendorInquiryByStatus(statusId);
}

//Get vendor inquiry by id
function getVendorInquiryById(inquiryId) {
    if (!inquiryId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter inquiryId is not found", "vendorRequestInquiryService/handleGet/getVendorInquiryById", inquiryId);
    }
    return dataStatus.getVendorInquiryById(inquiryId);
}

//Get change vendor request by status
function getChangeVendorRequestByStatus(statusId) {
    if (!statusId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter statusId is not found", "changeVendorRequestService/handleGet/getChangeVendorRequestByStatus", statusId);
    }
    return dataStatus.getChangeVendorRequestByStatus(statusId);
}

//Get change vendor request by id
function getChangeVendorRequestById(changeId) {
    if (!changeId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter changeId is not found", "vendorRequestInquiryService/handleGet/getChangeVendorRequestById", changeId);
    }
    return dataStatus.getChangeVendorRequestById(changeId);
}

//Get extend vendor request by status
function getExtendVendorRequestByStatus(statusId) {
    if (!statusId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter statusId is not found", "extendVendorRequestService/handleGet/getExtendVendorRequestByStatus", statusId);
    }
    return dataStatus.getExtendVendorRequestByStatus(statusId);
}

//Get extend vendor request by id
function getExtendVendorRequestById(extendId) {
    if (!extendId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter extendId is not found", "vendorRequestInquiryService/handleGet/getExtendVendorRequestById", extendId);
    }
    return dataStatus.getExtendVendorRequestById(extendId);
}

//Get vendor request by status
function getVendorRequestByStatus(statusId) {
    if (!statusId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter statusId is not found", "vendorRequestService/handleGet/getVendorRequestByStatus", statusId);
    }
    return dataStatus.getVendorRequestByStatus(statusId);
}

//Get vendor request by id
function getVendorRequestById(requestId) {
    if (!requestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter requestId is not found", "vendorRequestInquiryService/handleGet/getVendorRequestById", requestId);
    }
    return dataStatus.getVendorRequestById(requestId);
}

//Update vendor inquiry status
function updateVendorInquiryStatus(objVendorInquiry, userId) {
    if (validateUpdateVendorInquiryStatus(objVendorInquiry, userId)) {
    	if(!inquiry.existVendorInquiry(objVendorInquiry.VENDOR_INQUIRY_ID)){
    		throw ErrorLib.getErrors().CustomError("", "vendorRequestInquiryService/handlePut/updateVendorInquiryStatus", "The object Vendor Inquiry " + objVendorInquiry.VENDOR_INQUIRY_ID + " does not exist");
    	}
        return dataStatus.updateVendorInquiryStatus(objVendorInquiry, userId);
    }
}

//Update change vendor request status
function updateChangeVendorRequestStatus(objChangeVendorRequest, userId) {
    if (validateUpdateChangeVendorRequest(objChangeVendorRequest, userId)) {
    	if(!change.existChangeVendorRequest(objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID)){
    		throw ErrorLib.getErrors().CustomError("", "vendorRequestInquiryService/handlePut/updateChangeVendorRequestStatus", "The object Change Vendor Request " + objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID + " does not exist");
    	}
    	if(objChangeVendorRequest.STATUS_ID === 5){
    		return dataStatus.updateChangeVendorRequestStatusCompleted(objChangeVendorRequest, userId);
    	} else {
    		return dataStatus.updateChangeVendorRequestStatus(objChangeVendorRequest, userId);
    	}
    }
}

//Update extend vendor request status
function updateExtendVendorRequestStatus(objExtendVendorRequest, userId) {
    if (validateUpdateExtendVendorRequest(objExtendVendorRequest, userId)) {
    	if(!extend.existExtendVendorRequest(objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID)){
    		throw ErrorLib.getErrors().CustomError("", "vendorRequestInquiryService/handlePut/updateExtendVendorRequestStatus", "The object Extend Vendor Request " + objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID + " does not exist");
    	}
    	if(objExtendVendorRequest.STATUS_ID === 5){
    		return dataStatus.updateExtendVendorRequestStatusCompleted(objExtendVendorRequest, userId);
    	} else {
    		return dataStatus.updateExtendVendorRequestStatus(objExtendVendorRequest, userId);
    	}
    }
}

//Update vendor request status
function updateVendorRequestStatus(objVendorRequest, userId) {
    if (validateUpdateVendorRequestStatus(objVendorRequest, userId)){
    	if(!request.existVendorRequest(objVendorRequest.VENDOR_REQUEST_ID)){
    		throw ErrorLib.getErrors().CustomError("", "vendorRequestInquiryService/handlePut/updateVendorRequestStatus", "The object Vendor Request " + objVendorRequest.VENDOR_REQUEST_ID + " does not exist");
    	}
    	if(objVendorRequest.STATUS_ID === 5){
    		return dataStatus.updateVendorRequestStatusCompleted(objVendorRequest, userId);
    	} else {
    		return dataStatus.updateVendorRequestStatus(objVendorRequest, userId);
    	}
    }
}

//Validate update vendor inquiry status
function validateUpdateVendorInquiryStatus(objVendorInquiry, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "vendorInquiryService/handlePut/updateVendorInquiryStatus", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'VENDOR_INQUIRY_ID',
        'STATUS_ID',
        'PREVIOUS_STATUS_ID'];

    if (!objVendorInquiry) {
        throw ErrorLib.getErrors().CustomError("", "vendorInquiryService/handlePut/updateVendorInquiry", "The object Vendor Inquiry is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objVendorInquiry[key] === null || objVendorInquiry[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objVendorInquiry[key]);
                if (!isValid) {
                    errors[key] = objVendorInquiry[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "vendorInquiryService/handlePut/updateVendorInquiry", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "vendorInquiryService/handlePut/updateVendorInquiry", JSON.stringify(errors));
        }
    }
    return isValid;
}

//Validate update change vendor request status
function validateUpdateChangeVendorRequest(objChangeVendorRequest, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "vendorRequestService/handlePut/updateChangeVendorRequest", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
		'CHANGE_VENDOR_REQUEST_ID',
		'STATUS_ID',
		'PREVIOUS_STATUS_ID'];
    if(objChangeVendorRequest.STATUS_ID === 3 || objChangeVendorRequest.STATUS_ID === 5){
    	keys.push('RECEIVER_YVC_REQUEST');
    }

    if (!objChangeVendorRequest) {
        throw ErrorLib.getErrors().CustomError("", "vendorRequestService/handlePut/updateChangeVendorRequest", "The object Vendor Request is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objChangeVendorRequest[key] === null || objChangeVendorRequest[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objChangeVendorRequest[key]);
                if (!isValid) {
                    errors[key] = objChangeVendorRequest[key];
                    throw BreakException;
                }
            }
        });
        
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "vendorRequestService/handlePut/updateChangeVendorRequest", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "vendorRequestService/handlePut/updateChangeVendorRequest", JSON.stringify(errors));
        }
    }
    return isValid;
}

//Validate update extend vendor request status
function validateUpdateExtendVendorRequest(objExtendVendorRequest, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "vendorRequestService/handlePut/updateExtendVendorRequest", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'EXTEND_VENDOR_REQUEST_ID',
        'STATUS_ID',
		'PREVIOUS_STATUS_ID'];
    
    if(objExtendVendorRequest.STATUS_ID === 3 || objExtendVendorRequest.STATUS_ID === 5){
    	keys.push('RECEIVER_YVC_REQUEST');
    }

    if (!objExtendVendorRequest) {
        throw ErrorLib.getErrors().CustomError("", "vendorRequestService/handlePut/updateExtendVendorRequest", "The object Vendor Request is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objExtendVendorRequest[key] === null || objExtendVendorRequest[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objExtendVendorRequest[key]);
                if (!isValid) {
                    errors[key] = objExtendVendorRequest[key];
                    throw BreakException;
                }
            }
        });
        
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "vendorRequestService/handlePut/updateExtendVendorRequest", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "vendorRequestService/handlePut/updateExtendVendorRequest", JSON.stringify(errors));
        }
    }
    return isValid;
}

//Validate update vendor request status
function validateUpdateVendorRequestStatus(objVendorRequest, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "vendorRequestService/handlePut/updateVendorRequestStatus", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['VENDOR_REQUEST_ID',
                'STATUS_ID',
        		'PREVIOUS_STATUS_ID'];
    
    if(objVendorRequest.STATUS_ID === 3 || objVendorRequest.STATUS_ID === 5){
    	keys.push('RECEIVER_YVC_REQUEST');
    }

    if (!objVendorRequest) {
        throw ErrorLib.getErrors().CustomError("", "vendorRequestService/handlePut/updateVendorRequest", "The object Vendor Request is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objVendorRequest[key] === null || objVendorRequest[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objVendorRequest[key]);
                if (!isValid) {
                    errors[key] = objVendorRequest[key];
                    throw BreakException;
                }
            }
        });
        
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "vendorRequestService/handlePut/updateVendorRequest", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "vendorRequestService/handlePut/updateVendorRequest", JSON.stringify(errors));
        }
    }
    return isValid;
}

//Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'VENDOR_INQUIRY_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'CHANGE_VENDOR_REQUEST_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'EXTEND_VENDOR_REQUEST_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'VENDOR_REQUEST_ID':
            valid = (!value) || (!isNaN(value) && value > 0);
            break;
        case 'RECEIVER_USER_ID':
            valid = (!value) || (!isNaN(value) && value > 0);
            break;
        case 'RECEIVER_YVC_REQUEST':
            valid = (!value) || (value.length > 0 && value.length <= 255);
            break;
        case 'PREVIOUS_STATUS_ID':
            valid = (!value) || (!isNaN(value) && value > 0);
            break;
        case 'USER_ID_STATUS':
            valid = (!value) || (!isNaN(value) && value > 0);
            break;
        case 'STATUS_ID':
            valid = !isNaN(value) && value > 0;
            break;
    }
    return valid;
}

function sendChangeVendorMailByStatus(objRequest, userId){
	if(objRequest.STATUS_ID && (Number(objRequest.STATUS_ID) > 2 && Number(objRequest.STATUS_ID) < 7)){
		var changeVendorRequestMailObj = {};
		var mailObj = {};
		changeVendorRequestMailObj.CHANGE_VENDOR_REQUEST_ID = objRequest.CHANGE_VENDOR_REQUEST_ID;
		var statusId = objRequest.STATUS_ID;
		switch (statusId) {
			case '3':
				mailObj = changeVendorMail.parseInProcess(changeVendorRequestMailObj,"http://localhost:63342/crt/webapp/index.html","admin");
				break;
			case '4':
				mailObj = changeVendorMail.parseReturnToRequest(changeVendorRequestMailObj,"http://localhost:63342/crt/webapp/index.html","admin");
				break;
			case '5':
				mailObj = changeVendorMail.parseApproved(changeVendorRequestMailObj,"http://localhost:63342/crt/webapp/index.html","admin");
				break;
			case '6':
				mailObj = changeVendorMail.parseCancelled(changeVendorRequestMailObj,"http://localhost:63342/crt/webapp/index.html","admin");
				break;
		}
		
		var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
		mail.sendMail(emailObj,true,null);
	}
}

function getEmailList(mailObj){
	return [{address:'gorellano@folderit.net'}];
}