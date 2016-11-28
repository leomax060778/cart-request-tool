$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataMessage = mapper.getDataVendorMessage();
var request = mapper.getDataVendorRequest();
var change = mapper.getDataChangeVendorRequest();
var extend = mapper.getDataExtendVendorRequest();
var inquiry = mapper.getDataVendorInquiry();
var status = mapper.getVendorRequestInquiryStatus();
var ErrorLib = mapper.getErrors();
var dbHelper = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

var statusMap = {'TO_BE_CHECKED': 1, 'CHECKED': 2, 'IN_PROCESS': 3, 'RETURN_TO_REQUESTER': 4, 'APPROVED': 5, 'CANCELLED': 6};
var statusInquiryMap = {'TO_BE_CHECKED': 1, 'RETURN_TO_REQUESTER': 2, 'COMPLETED': 3, 'CANCELLED': 4};

/** ***********INSERT*************** */
//Insert new change vendor request message
function insertChangeVendorRequestMessage(objChangeVendorRequest, userId) {
    if (validateInsertChangeVendorRequestMessage(objChangeVendorRequest, userId)) {
    	if (existChangeVendorRequest(objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID)) {
    		if(Number(objChangeVendorRequest.PREVIOUS_STATUS_ID) === statusMap.RETURN_TO_REQUESTER || Number(objChangeVendorRequest.PREVIOUS_STATUS_ID) === statusMap.CHECKED || Number(objChangeVendorRequest.PREVIOUS_STATUS_ID) === statusMap.IN_PROCESS || Number(objChangeVendorRequest.PREVIOUS_STATUS_ID) === statusMap.CANCELLED){
    			objChangeVendorRequest.STATUS_ID = statusMap.TO_BE_CHECKED;
    			status.updateChangeVendorRequestStatusManual(objChangeVendorRequest, userId);
    		}
    		return dataMessage.insertChangeVendorRequestMessage(objChangeVendorRequest, userId);
    	} else {
            throw ErrorLib.getErrors().CustomError("", "vendorMessageService/handlePost/insertChangeVendorRequesMessage", "The Change Vendor Request with the id: " + objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID + " does not exist");
        }
    } else {
        throw ErrorLib.getErrors().CustomError("", "vendorMessageService/handlePost/insertChangeVendorRequesMessage", "The Change Vendor Request with the id: " + objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID + " does not exist");
    }
}

//Insert new extend vendor request message
function insertExtendVendorRequestMessage(objExtendVendorRequest, userId) {
    if (validateInsertExtendVendorRequestMessage(objExtendVendorRequest, userId)) {
    	if (existExtendVendorRequest(objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID)) {
    		if(Number(objExtendVendorRequest.PREVIOUS_STATUS_ID) === statusMap.RETURN_TO_REQUESTER || Number(objExtendVendorRequest.PREVIOUS_STATUS_ID) === statusMap.CHECKED || Number(objExtendVendorRequest.PREVIOUS_STATUS_ID) === statusMap.IN_PROCESS || Number(objExtendVendorRequest.PREVIOUS_STATUS_ID) === statusMap.CANCELLED){
    			objExtendVendorRequest.STATUS_ID = statusMap.TO_BE_CHECKED;
    			status.updateExtendVendorRequestStatusManual(objExtendVendorRequest, userId);
    		}
    		return dataMessage.insertExtendVendorRequestMessage(objExtendVendorRequest, userId);
    	} else {
            throw ErrorLib.getErrors().CustomError("", "vendorMessageService/handlePost/insertExtendVendorRequesMessage", "The Extend Vendor Request with the id: " + objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID + " does not exist");
        }
    }
}

//Insert new vendor request message
function insertVendorRequestMessage(objVendorRequest, userId) {
    if (validateInsertVendorRequestMessage(objVendorRequest, userId)) {
        if (existVendorRequest(objVendorRequest.VENDOR_REQUEST_ID)) {
        	if(Number(objVendorRequest.PREVIOUS_STATUS_ID) === statusMap.RETURN_TO_REQUESTER || Number(objVendorRequest.PREVIOUS_STATUS_ID) === statusMap.CHECKED || Number(objVendorRequest.PREVIOUS_STATUS_ID) === statusMap.IN_PROCESS || Number(objVendorRequest.PREVIOUS_STATUS_ID) === statusMap.CANCELLED){
        		objVendorRequest.STATUS_ID = statusMap.TO_BE_CHECKED;
    			status.updateVendorRequestStatusManual(objVendorRequest, userId);
    		}
            return dataMessage.insertVendorRequestMessage(objVendorRequest, userId);
        } else {
            throw ErrorLib.getErrors().CustomError("", "vendorMessageService/handlePost/insertVendorRequestMessage", "The Vendor Request with the id: " + objVendorRequest.VENDOR_REQUEST_ID + " does not exist");
        }
    }
}

//Insert new vendor inquiry message
function insertVendorInquiryMessage(objVendorInquiry, userId) {
    if (validateInsertVendorInquiryMessage(objVendorInquiry, userId)) {
    	if (existVendorInquiry(objVendorInquiry.VENDOR_INQUIRY_ID)) {
    		if(Number(objVendorInquiry.PREVIOUS_STATUS_ID) === statusInquiryMap.RETURN_TO_REQUESTER || Number(objVendorInquiry.PREVIOUS_STATUS_ID) === statusInquiryMap.CANCELLED){
    			objVendorInquiry.STATUS_ID = statusInquiryMap.TO_BE_CHECKED;
    			status.updateVendorInquiryStatusManual(objVendorInquiry, userId);
    		}
    		return dataMessage.insertVendorInquiryMessage(objVendorInquiry, userId);
    	} else {
            throw ErrorLib.getErrors().CustomError("", "vendorMessageService/handlePost/insertVendorRequestMessage", "The Vendor inquiry with the id: " + objVendorInquiry.VENDOR_INQUIRY_ID + " does not exist");
        }
    }
}
/** ***********END INSERT*************** */

/** ***********GET*************** */
//Get messages for vendor request
function getVendorRequestMessage(vendorRequestId, userId) {
    if (!vendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter vendorRequestId is not found", "vendorMessageService/handleGet/getVendorMessage", vendorRequestId);
    }
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "vendorMessageService/handleGet/getVendorRequestMessage", userId);
    }
    var result = [];
    var objVendorRequest = {};
    try{
	    result = dataMessage.getVendorRequestMessageManual(vendorRequestId);
	    result.forEach(function (elem) {
		    if(elem.MESSAGE_READ === 0) {
		    	objVendorRequest.MESSAGE_READ = 1;
		    	dataMessage.updateVendorRequestMessageReadManual(objVendorRequest, userId);
		    }
	    });
    }
	catch(e){
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", "requestService/handleGet/getRequestMessage", e.toString());
	}
	finally{
		dbHelper.commit();
		dbHelper.closeConnection();
	}
    return result;
}

//Get messages of vendor inquiry
function getVendorInquiryMessage(vendorInquiryId, userId) {
    if (!vendorInquiryId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter vendorInquiryId is not found", "vendorMessageService/handleGet/getVendorMessage", vendorInquiryId);
    }
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "vendorMessageService/handleGet/getVendorInquiryMessage", userId);
    }
    var result = [];
    var objVendorInquiry = {};
    try{
	    result = dataMessage.getVendorInquiryMessageManual(vendorInquiryId);
	    result.forEach(function (elem) {
		    if(elem.MESSAGE_READ === 0) {
		    	objVendorInquiry.MESSAGE_READ = 1;
		    	dataMessage.updateVendorInquiryMessageReadManual(objVendorInquiry, userId);
		    }
	    });
    }
	catch(e){
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", "requestService/handleGet/getVendorInquiryMessage", e.toString());
	}
	finally{
		dbHelper.commit();
		dbHelper.closeConnection();
	}
    return result;
}

//Get messages for change vendor request
function getChangeVendorRequestMessage(changeVendorRequestId, userId) {
    if (!changeVendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter changeVendorRequestId is not found", "vendorMessageService/handleGet/getChangeVendorMessage", changeVendorRequestId);
    }
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "vendorMessageService/handleGet/getChangeVendorRequestMessage", userId);
    }
    var result = [];
    var objChangeVendorRequest = {};
    try{
	    result = dataMessage.getChangeVendorRequestMessageManual(changeVendorRequestId);
	    result.forEach(function (elem) {
		    if(elem.MESSAGE_READ === 0) {
		    	objChangeVendorRequest.MESSAGE_READ = 1;
		    	dataMessage.updateChangeVendorRequestMessageReadManual(objChangeVendorRequest, userId);
		    }
	    });
    }
	catch(e){
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", "requestService/handleGet/getChangeVendorRequestMessage", e.toString());
	}
	finally{
		dbHelper.commit();
		dbHelper.closeConnection();
	}
    return result;
}

//Get messages for extend vendor request
function getExtendVendorRequestMessage(extendVendorRequestId, userId) {
    if (!extendVendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter extendVendorRequestId is not found", "vendorMessageService/handleGet/getExtendVendorMessage", extendVendorRequestId);
    }
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "vendorMessageService/handleGet/getExtendVendorRequestMessage", userId);
    }
    var result = [];
    var objExtendVendorRequest = {};
    try{
	    result = dataMessage.getExtendVendorRequestMessageManual(extendVendorRequestId);
	    result.forEach(function (elem) {
		    if(elem.MESSAGE_READ === 0) {
		    	objExtendVendorRequest.MESSAGE_READ = 1;
		    	dataMessage.updateExtendVendorRequestMessageReadManual(objExtendVendorRequest, userId);
		    }
	    });
    }
	catch(e){
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", "requestService/handleGet/getExtendVendorRequestMessage", e.toString());
	}
	finally{
		dbHelper.commit();
		dbHelper.closeConnection();
	}
    return result;
}
/** ***********END GET*************** */

/** ***********CHECK IF EXIST*************** */
//Check if the request exists
function existVendorRequest(vendorRequestId) {
  return request.getVendorRequestByIdManual(vendorRequestId).length > 0;
}

//Check if the inquiry exists
function existVendorInquiry(vendorInquiryId) {
  return inquiry.getVendorInquiryByIdManual(vendorInquiryId).length > 0;
}

//Check if the extend vendor request exists
function existExtendVendorRequest(extendVendorRequestId) {
  return extend.getExtendVendorRequestByIdManual(extendVendorRequestId).length > 0;
}

//Check if the change vendor request exists
function existChangeVendorRequest(changeVendorRequestId) {
  return change.getChangeVendorRequestByIdManual(changeVendorRequestId).length > 0;
}
/** ***********END CHECK IF EXIST*************** */

/** ***********VALIDATE INSERT*************** */
function validateInsertExtendVendorRequestMessage(objExtendVendorRequest, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "vendorMessageService/handlePut/insertExtendVendorRequestMessage", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'EXTEND_VENDOR_REQUEST_ID',
        'MESSAGE_CONTENT',
        'PREVIOUS_STATUS_ID'
    ];

    if (!objExtendVendorRequest) {
        throw ErrorLib.getErrors().CustomError("", "vendorMessageService/handlePost/insertVendorRequestMessage", "The object Extend Vendor Request is not found");
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
            throw ErrorLib.getErrors().CustomError("", "vendorMessageService/handlePost/insertExtendVendorRequest", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "vendorMessageService/handlePost/insertExtendVendorRequest", JSON.stringify(errors));
        }
    }
    return isValid;
}

function validateInsertChangeVendorRequestMessage(objChangeVendorRequest, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "vendorMessageService/handlePut/insertChangeVendorRequestMessage", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'CHANGE_VENDOR_REQUEST_ID',
        'MESSAGE_CONTENT',
        'PREVIOUS_STATUS_ID'
    ];

    if (!objChangeVendorRequest) {
        throw ErrorLib.getErrors().CustomError("", "vendorMessageService/handlePost/insertChangeVendorRequest", "The object Change Vendor Request is not found");
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
            throw ErrorLib.getErrors().CustomError("", "vendorMessageService/handlePost/insertChangeVendorRequest", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "vendorMessageService/handlePost/insertChangeVendorRequest", JSON.stringify(errors));
        }
    }
    return isValid;
}

function validateInsertVendorInquiryMessage(objVendorInquiry, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "vendorMessageService/handlePut/insertVendorInquiryMessage", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['VENDOR_INQUIRY_ID',
        'MESSAGE_CONTENT',
        'PREVIOUS_STATUS_ID'];

    if (!objVendorInquiry) {
        throw ErrorLib.getErrors().CustomError("", "vendorMessageService/handlePost/insertVendorInquiryMessage", "The object Vendor Inquiry Message is not found");
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
            throw ErrorLib.getErrors().CustomError("", "vendorMessageService/handlePost/insertVendorInquiryMessage", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "vendorMessageService/handlePost/insertVendorInquiryMessage", JSON.stringify(errors));
        }
    }
    return isValid;
}

function validateInsertVendorRequestMessage(objVendorRequest, userId) {
    if (!userId){
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "vendorMessageService/handlePut/insertVendorRequestMessage", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'VENDOR_REQUEST_ID',
        'MESSAGE_CONTENT',
        'PREVIOUS_STATUS_ID'
    ];

    if (!objVendorRequest) {
        throw ErrorLib.getErrors().CustomError("", "vendorMessageService/handlePost/insertVendorRequest", "The object Vendor Request is not found");
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
            throw ErrorLib.getErrors().CustomError("", "vendorMessageService/handlePost/insertVendorRequest", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "vendorMessageService/handlePost/insertVendorRequest", JSON.stringify(errors));
        }
    }
    return isValid;
}
/** ***********END VALIDATE INSERT*************** */

//Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'EXTEND_VENDOR_REQUEST_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'CHANGE_VENDOR_REQUEST_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'VENDOR_INQUIRY_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'VENDOR_REQUEST_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'PREVIOUS_STATUS_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'MESSAGE_CONTENT':
            valid = value.length > 0 && value.length <= 1000;
            break;
    }
    return valid;
}