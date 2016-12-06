$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataStatus = mapper.getDataVendorRequestInquiryStatus();
var dataExtendVendor = mapper.getDataExtendVendorRequest();
var request = mapper.getVendorRequest();
var inquiry = mapper.getVendorInquiry();
var extend = mapper.getExtendVendorRequest();
var change = mapper.getChangeVendorRequest();
var vendor = mapper.getVendor();
var changeVendorMail = mapper.getChangeVendorMail();
var extendVendorMail = mapper.getExtendVendorMail();
var vendorInquiryMail = mapper.getVendorInquiryMail();
var vendorRequestMail = mapper.getVendorMail();
var mail = mapper.getMail();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

var statusMap = {'IN_PROCESS': 3, 'APPROVED': 5, 'CANCELLED': 6};

//Get vendor request inquiry by status
function getVendorRequestInquiryByStatus(statusId) {
    if (!statusId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter statusId is not found", "vendorRequestInquiryService/handleGet/getVendorRequestInquiryByStatus", statusId);
    }
    return dataStatus.getVendorRequestInquiryByStatus(statusId);
}

//Get vendor request inquiry by status administrable
function getVendorRequestInquiryByStatusAdministrable(isAdministrable, userId) {
    if (!isAdministrable) {
        throw ErrorLib.getErrors().BadRequest("The Parameter value is not found", "vendorRequestInquiryService/handleGet/getVendorRequestInquiryByStatusAdministrable", isAdministrable);
    }
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "vendorRequestInquiryService/handleGet/getVendorRequestInquiryByStatusAdministrable", userId);
    }
	var vendorRequestInquiry = [];
	vendorRequestInquiry = dataStatus.getVendorRequestInquiryByStatusAdministrable(isAdministrable, userId);
	vendorRequestInquiry = JSON.parse(JSON.stringify(vendorRequestInquiry));
	vendorRequestInquiry.forEach(function(elem){
    	if(elem.MESSAGE_READ > 0){
    		elem.SHOW_MESSAGE_READ = 1;
    	} else {
    		elem.SHOW_MESSAGE_READ = 0;
    	}
    });
	return vendorRequestInquiry;
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

function getManualExtendVendorRequestById(extendId) {
    if (!extendId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter extendId is not found", "vendorRequestInquiryService/handleGet/getExtendVendorRequestById", extendId);
    }
    return dataExtendVendor.getExtendVendorRequestByIdManual(extendId);
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
    	if(objChangeVendorRequest.STATUS_ID === statusMap.APPROVED){
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
    	if(objExtendVendorRequest.STATUS_ID === statusMap.APPROVED){
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
    	if(Number(objVendorRequest.STATUS_ID) === statusMap.APPROVED){
    		if(!vendor.existVendor(objVendorRequest.VENDOR_ID)){
        		throw ErrorLib.getErrors().CustomError("",
    					"vendorService/handlePut/updateVendorAccount",
    					"The vendor with the id \'" + objVendorRequest.VENDOR_ID + "\' does not exist");
        	}
    		vendor.updateVendorAccountManual(objVendorRequest, userId);
    		vendor.insertVendorAdditionalInformation(objVendorRequest, userId);
    		return dataStatus.updateVendorRequestStatusCompleted(objVendorRequest, userId);
    	} else if (Number(objVendorRequest.STATUS_ID) === statusMap.CANCELLED){
    		vendor.deleteManualVendor(objVendorRequest, userId);
    		return dataStatus.updateVendorRequestStatusCompleted(objVendorRequest, userId);
    	} else {
    		return dataStatus.updateVendorRequestStatus(objVendorRequest, userId);
    	}
    }
}

//Update vendor inquiry status manual
function updateVendorInquiryStatusManual(objVendorInquiry, userId) {
    if (validateUpdateVendorInquiryStatus(objVendorInquiry, userId)) {
    	if(!inquiry.existVendorInquiry(objVendorInquiry.VENDOR_INQUIRY_ID)){
    		throw ErrorLib.getErrors().CustomError("", "vendorRequestInquiryService/handlePut/updateVendorInquiryStatus", "The object Vendor Inquiry " + objVendorInquiry.VENDOR_INQUIRY_ID + " does not exist");
    	}
        return dataStatus.updateVendorInquiryStatusManual(objVendorInquiry, userId);
    }
}

//Update change vendor request status manual
function updateChangeVendorRequestStatusManual(objChangeVendorRequest, userId) {
    if (validateUpdateChangeVendorRequest(objChangeVendorRequest, userId)) {
    	if(!change.existChangeVendorRequest(objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID)){
    		throw ErrorLib.getErrors().CustomError("", "vendorRequestInquiryService/handlePut/updateChangeVendorRequestStatus", "The object Change Vendor Request " + objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID + " does not exist");
    	}
    	if(objChangeVendorRequest.STATUS_ID === statusMap.APPROVED){
    		return dataStatus.updateChangeVendorRequestStatusCompletedManual(objChangeVendorRequest, userId);
    	} else {
    		return dataStatus.updateChangeVendorRequestStatusManual(objChangeVendorRequest, userId);
    	}
    }
}

//Update extend vendor request status manual
function updateExtendVendorRequestStatusManual(objExtendVendorRequest, userId) {
    if (validateUpdateExtendVendorRequest(objExtendVendorRequest, userId)) {
    	if(!extend.existExtendVendorRequest(objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID)){
    		throw ErrorLib.getErrors().CustomError("", "vendorRequestInquiryService/handlePut/updateExtendVendorRequestStatus", "The object Extend Vendor Request " + objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID + " does not exist");
    	}
    	if(objExtendVendorRequest.STATUS_ID === statusMap.APPROVED){
    		return dataStatus.updateExtendVendorRequestStatusCompletedManual(objExtendVendorRequest, userId);
    	} else {
    		return dataStatus.updateExtendVendorRequestStatusManual(objExtendVendorRequest, userId);
    	}
    }
}

//Update vendor request status manual
function updateVendorRequestStatusManual(objVendorRequest, userId) {
    if (validateUpdateVendorRequestStatus(objVendorRequest, userId)){
    	if(!request.existVendorRequest(objVendorRequest.VENDOR_REQUEST_ID)){
    		throw ErrorLib.getErrors().CustomError("", "vendorRequestInquiryService/handlePut/updateVendorRequestStatus", "The object Vendor Request " + objVendorRequest.VENDOR_REQUEST_ID + " does not exist");
    	}
    	if(objVendorRequest.STATUS_ID === statusMap.APPROVED){
    		return dataStatus.updateVendorRequestStatusCompletedManual(objVendorRequest, userId);
    	} else {
    		return dataStatus.updateVendorRequestStatusManual(objVendorRequest, userId);
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
    if(objChangeVendorRequest.STATUS_ID === statusMap.IN_PROCESS || objChangeVendorRequest.STATUS_ID === statusMap.APPROVED){
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
    
    if(objExtendVendorRequest.STATUS_ID === statusMap.IN_PROCESS || objExtendVendorRequest.STATUS_ID === statusMap.APPROVED){
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
    
    if(objVendorRequest.STATUS_ID === statusMap.IN_PROCESS || objVendorRequest.STATUS_ID === statusMap.APPROVED){
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
				mailObj = changeVendorMail.parseInProcess(changeVendorRequestMailObj,getUrlBase(),"Colleague");
				break;
			case '4':
				mailObj = changeVendorMail.parseReturnToRequest(changeVendorRequestMailObj,getUrlBase(),"Colleague");
				break;
			case '5':
				mailObj = changeVendorMail.parseApproved(changeVendorRequestMailObj,getUrlBase(),"Colleague");
				break;
			case '6':
				mailObj = changeVendorMail.parseCancelled(changeVendorRequestMailObj,getUrlBase(),"Colleague");
				break;
		}
		
		var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
		mail.sendMail(emailObj,true,null);
	}
}

function sendExtendVendorMailByStatus(objRequest,extendVendorData, userId){
	if(objRequest.STATUS_ID && (Number(objRequest.STATUS_ID) > 2 && Number(objRequest.STATUS_ID) < 7)){
		var extendVendorRequestMailObj = {};
		var mailObj = {};
		extendVendorRequestMailObj.EXTEND_VENDOR_REQUEST_ID = objRequest.EXTEND_VENDOR_REQUEST_ID;
		extendVendorRequestMailObj.RECEIVER_YVC_REQUEST = objRequest.RECEIVER_YVC_REQUEST;
		extendVendorRequestMailObj.VENDOR_ID = extendVendorData.VENDOR_ID;
		var statusId = objRequest.STATUS_ID;
		switch (statusId) {
			case '3':
				mailObj = extendVendorMail.parseInProcess(extendVendorRequestMailObj,getUrlBase(),"Colleague");
				break;
			case '4':
				mailObj = extendVendorMail.parseReturnToRequest(extendVendorRequestMailObj,getUrlBase(),"Colleague");
				break;
			case '5':
				mailObj = extendVendorMail.parseApproved(extendVendorRequestMailObj,getUrlBase(),"Colleague");
				break;
			case '6':
				mailObj = extendVendorMail.parseCancelled(extendVendorRequestMailObj,getUrlBase(),"Colleague");
				break;
		}
		
		var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
		mail.sendMail(emailObj,true,null);
	}
}

function sendVendorInquiryMailByStatus(objRequest, userId){
	if(objRequest.STATUS_ID && (Number(objRequest.STATUS_ID) > 1 && Number(objRequest.STATUS_ID) < 5)){
		var vendorInquiryMailObj = {};
		var mailObj = {};
		vendorInquiryMailObj.VENDOR_INQUIRY_ID = objRequest.VENDOR_INQUIRY_ID;
		var statusId = objRequest.STATUS_ID;
		switch (statusId) {
			case '2':
				mailObj = vendorInquiryMail.parseReturnToRequest(vendorInquiryMailObj,getUrlBase(),"Colleague");
				break;
			case '3':
				mailObj = vendorInquiryMail.parseCompleted(vendorInquiryMailObj,getUrlBase(),"Colleague");
				break;
			case '4':
				mailObj = vendorInquiryMail.parseCancelled(vendorInquiryMailObj,getUrlBase(),"Colleague");
				break;
		}
		
		var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
		mail.sendMail(emailObj,true,null);
	}
}

function sendVendorRequestMailByStatus(objRequest, userId){
	if(objRequest.STATUS_ID && (Number(objRequest.STATUS_ID) > 2 && Number(objRequest.STATUS_ID) < 7)){
		var vendorRequestMailObj = {};
		var mailObj = {};
		vendorRequestMailObj.VENDOR_REQUEST_ID = objRequest.VENDOR_REQUEST_ID;
		vendorRequestMailObj.RECEIVER_YVC_REQUEST = objRequest.RECEIVER_YVC_REQUEST;
		vendorRequestMailObj.VENDOR_ID = objRequest.VENDOR_ID;
		var statusId = objRequest.STATUS_ID;
		switch (statusId) {
			case '3':
				mailObj = vendorRequestMail.parseInProcess(vendorRequestMailObj,getUrlBase(),"Colleague");
				break;
			case '4':
				mailObj = vendorRequestMail.parseReturnToRequest(vendorRequestMailObj,getUrlBase(),"Colleague");
				break;
			case '5':
				mailObj = vendorRequestMail.parseApproved(vendorRequestMailObj,getUrlBase(),"Colleague");
				break;
			case '6':
				mailObj = vendorRequestMail.parseCancelled(vendorRequestMailObj,getUrlBase(),"Colleague");
				break;
		}
		
		var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
		mail.sendMail(emailObj,true,null);
	}
}

function getUrlBase(){
	return "http://localhost:63342/crt/webapp/index.html";
}

function getEmailList(mailObj){
	return [{address:'gorellano@folderit.net'}];
}