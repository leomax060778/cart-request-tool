$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataMessage = mapper.getDataVendorMessage();
var request = mapper.getDataVendorRequest();
var change = mapper.getDataChangeVendorRequest();
var extend = mapper.getDataExtendVendorRequest();
var inquiry = mapper.getDataVendorInquiry();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//Insert new change vendor request message
function insertChangeVendorRequestMessage(objChangeVendorRequest, userId) {
    if (validateInsertChangeVendorRequestMessage(objChangeVendorRequest, userId)) {
    	if (existChangeVendorRequest(objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID)) {
        return dataMessage.insertChangeVendorRequestMessage(objChangeVendorRequest, userId);
    	} else {
            throw ErrorLib.getErrors().CustomError("", "vendorMessageService/handlePost/insertChangeVendorRequesMessage", "The Change Vendor Request with the id: " + objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID + " does not exist");
        }
    } else throw objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID;
}

//Insert new extend vendor request message
function insertExtendVendorRequestMessage(objExtendVendorRequest, userId) {
    if (validateInsertExtendVendorRequestMessage(objExtendVendorRequest, userId)) {
    	if (existExtendVendorRequest(objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID)) {
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
        return dataMessage.insertVendorInquiryMessage(objVendorInquiry, userId);
    	} else {
            throw ErrorLib.getErrors().CustomError("", "vendorMessageService/handlePost/insertVendorRequestMessage", "The Vendor inquiry with the id: " + objVendorInquiry.VENDOR_INQUIRY_ID + " does not exist");
        }
    }
}

//Get messages for vendor request
function getVendorRequestMessage(vendorRequestId) {
    if (!vendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter vendorRequestId is not found", "vendorMessageService/handleGet/getVendorMessage", vendorRequestId);
    }
    return dataMessage.getVendorRequestMessage(vendorRequestId);
}

//Get messages of vendor inquiry
function getVendorInquiryMessage(vendorInquiryId) {
    if (!vendorInquiryId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter vendorInquiryId is not found", "vendorMessageService/handleGet/getVendorMessage", vendorInquiryId);
    }
    return dataMessage.getVendorInquiryMessage(vendorInquiryId);
}

//Get messages for change vendor request
function getChangeVendorRequestMessage(changeVendorRequestId) {
    if (!changeVendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter changeVendorRequestId is not found", "vendorMessageService/handleGet/getChangeVendorMessage", changeVendorRequestId);
    }
    return dataMessage.getChangeVendorRequestMessage(changeVendorRequestId);
}

//Get messages for extend vendor request
function getExtendVendorRequestMessage(extendVendorRequestId) {
    if (!extendVendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter extendVendorRequestId is not found", "vendorMessageService/handleGet/getExtendVendorMessage", extendVendorRequestId);
    }
    return dataMessage.getExtendVendorRequestMessage(extendVendorRequestId);
}

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

function validateInsertExtendVendorRequestMessage(objExtendVendorRequest, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "vendorMessageService/handlePut/insertExtendVendorRequestMessage", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'EXTEND_VENDOR_REQUEST_ID',
        'MESSAGE_CONTENT'
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
        'MESSAGE_CONTENT'
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
        'MESSAGE_CONTENT'];

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
        'MESSAGE_CONTENT'
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
        case 'MESSAGE_CONTENT':
            valid = value.length > 0 && value.length <= 1000;
            break;
    }
    return valid;
}