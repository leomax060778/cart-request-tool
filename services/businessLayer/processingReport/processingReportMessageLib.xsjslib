$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataMessage = mapper.getDataProcessingReportMessage();
var vendorRequest = mapper.getDataVendorRequest();
var change = mapper.getDataChangeVendorRequest();
var extend = mapper.getDataExtendVendorRequest();
var vendorInquiry = mapper.getDataVendorInquiry();
var inquiry = mapper.getDataInquiry();
var getRequest = mapper.getDataRequest();
var returnType = mapper.getReturnType();
var issueType = mapper.getDataIssueType();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */


/** ***********INSERT*************** */
//Insert new change vendor request message
function insertChangeVendorRequestMessage(objChangeVendorRequest, userId) {
	if (validateInsertChangeVendorRequestMessage(objChangeVendorRequest, userId)) {
	    if (!existChangeVendorRequest(objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID)) {
	        throw ErrorLib.getErrors().CustomError("", "vendorRequestInquiryMessageService/handlePost/insertChangeVendorRequestMessage", "The Change Vendor Request with the id: " + objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID + " does not exist");
	    }
	    if (!returnType.existReturnType(objChangeVendorRequest.RETURN_TYPE_ID)) {
	        throw ErrorLib.getErrors().CustomError("", "vendorRequestInquiryMessageService/handlePost/insertChangeVendorRequestMessage", "The return type with the id " + objChangeVendorRequest.RETURN_TYPE_ID + " does not exist");
	    }
	    if (!existIssueType(objChangeVendorRequest.ISSUE_TYPE_ID)) {
	        throw ErrorLib.getErrors().CustomError("", "vendorRequestInquiryMessageService/handlePost/insertChangeVendorRequestMessage", "The issue type with the id " + objChangeVendorRequest.ISSUE_TYPE_ID + " does not exist");
	    }
	    return dataMessage.insertChangeVendorRequestMessage(objChangeVendorRequest, userId);
    }
}

//Insert new extend vendor request message
function insertExtendVendorRequestMessage(objExtendVendorRequest, userId) {
	if (validateInsertExtendVendorRequestMessage(objExtendVendorRequest, userId)) {
	    if (!existExtendVendorRequest(objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID)) {
	        throw ErrorLib.getErrors().CustomError("", "VendorMessageService/handlePost/insertExtendVendorRequestMessage", "The Extend Vendor Request with the id: " + objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID + " does not exist");
	    }
	    if (!returnType.existReturnType(objExtendVendorRequest.RETURN_TYPE_ID)) {
	        throw ErrorLib.getErrors().CustomError("", "VendorMessageService/handlePost/insertExtendVendorRequestMessage", "The return type with the id " + objExtendVendorRequest.RETURN_TYPE_ID + " does not exist");
	    }
	    if (!existIssueType(objExtendVendorRequest.ISSUE_TYPE_ID)) {
	        throw ErrorLib.getErrors().CustomError("", "VendorMessageService/handlePost/insertExtendVendorRequestMessage", "The issue type with the id " + objExtendVendorRequest.ISSUE_TYPE_ID + " does not exist");
	    }
        return dataMessage.insertExtendVendorRequestMessage(objExtendVendorRequest, userId);
    }
}

//Insert new vendor request message
function insertVendorRequestMessage(objVendorRequest, userId) {
	if (validateInsertVendorRequestMessage(objVendorRequest, userId)) {
	    if (!existVendorRequest(objVendorRequest.VENDOR_REQUEST_ID)) {
	        throw ErrorLib.getErrors().CustomError("", "VendorMessageService/handlePost/insertVendorRequestMessage", "The Vendor Request with the id: " + objVendorRequest.VENDOR_REQUEST_ID + " does not exist");
	    }
	    if (!returnType.existReturnType(objVendorRequest.RETURN_TYPE_ID)) {
	        throw ErrorLib.getErrors().CustomError("", "VendorMessageService/handlePost/insertVendorRequestMessage", "The return type with the id " + objVendorRequest.RETURN_TYPE_ID + " does not exist");
	    }
	    if (!existIssueType(objVendorRequest.ISSUE_TYPE_ID)) {
	        throw ErrorLib.getErrors().CustomError("", "VendorMessageService/handlePost/insertVendorRequestMessage", "The issue type with the id " + objVendorRequest.ISSUE_TYPE_ID + " does not exist");
	    }
        return dataMessage.insertVendorRequestMessage(objVendorRequest, userId);
    }
}

//Insert new vendor inquiry message
function insertVendorInquiryMessage(objVendorInquiry, userId) {
	if (validateInsertVendorInquiryMessage(objVendorInquiry, userId)) {
	    if (!existVendorInquiry(objVendorInquiry.VENDOR_INQUIRY_ID)) {
	        throw ErrorLib.getErrors().CustomError("", "VendorMessageService/handlePost/insertVendorRequestMessage", "The Vendor inquiry with the id: " + objVendorInquiry.VENDOR_INQUIRY_ID + " does not exist");
	    }
	    if (!returnType.existReturnType(objVendorInquiry.RETURN_TYPE_ID)) {
	        throw ErrorLib.getErrors().CustomError("", "VendorMessageService/handlePost/insertVendorRequestMessage", "The return type with the id " + objVendorInquiry.RETURN_TYPE_ID + " does not exist");
	    }
	    if (!existIssueType(objVendorInquiry.ISSUE_TYPE_ID)) {
	        throw ErrorLib.getErrors().CustomError("", "VendorMessageService/handlePost/insertVendorRequestMessage", "The issue type with the id " + objVendorInquiry.ISSUE_TYPE_ID + " does not exist");
	    }
        return dataMessage.insertVendorInquiryMessage(objVendorInquiry, userId);
    }
}

//Insert new inquiry message
function insertInquiryMessage(objInquiry, userId) {
	if (validateInsertInquiryMessage(objInquiry, userId)) {
		if (!existInquiry(objInquiry.INQUIRY_ID)) {
	        throw ErrorLib.getErrors().CustomError("", "inquiryMessageService/handlePost/insertInquiryMessage", "The inquiry with the id " + objInquiry.INQUIRY_ID + " does not exist");
	    }
	    if (!returnType.existReturnType(objInquiry.RETURN_TYPE_ID)) {
	        throw ErrorLib.getErrors().CustomError("", "inquiryMessageService/handlePost/insertInquiryMessage", "The return type with the id " + objInquiry.RETURN_TYPE_ID + " does not exist");
	    }
        return dataMessage.insertInquiryMessage(objInquiry, userId);
    }
}

//Insert new request message
function insertRequestMessage(objRequest, userId) {
	if (validateInsertRequestMessage(objRequest, userId)) {
	    if (!existRequest(objRequest.REQUEST_ID)) {
	        throw ErrorLib.getErrors().CustomError("", "requestMessageService/handlePost/insertRequestMessage", "The request with the id " + objRequest.REQUEST_ID + " does not exist");
	    }
	    if (!returnType.existReturnType(objRequest.RETURN_TYPE_ID)) {
	        throw ErrorLib.getErrors().CustomError("", "requestMessageService/handlePost/insertRequestMessage", "The return type with the id " + objRequest.RETURN_TYPE_ID + " does not exist");
	    }
	    if (!existIssueType(objRequest.ISSUE_TYPE_ID)) {
	        throw ErrorLib.getErrors().CustomError("", "requestMessageService/handlePost/insertRequestMessage", "The issue type with the id " + objRequest.ISSUE_TYPE_ID + " does not exist");
	    }
        return dataMessage.insertRequestMessage(objRequest, userId);
    }
}
/** ***********END INSERT*************** */

/** ***********GET*************** */
//Get inquiry message
function getInquiryMessage(inquiryId) {
    if (!inquiryId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter inquiryId is not found", "inquiryService/handleGet/getMessage", inquiryId);
    }
    return dataMessage.getInquiryMessage(inquiryId);
}

//Get messages for vendor request
function getVendorRequestMessage(vendorRequestId) {
    if (!vendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter vendorRequestId is not found", "vendorRequestInquiryMessageService/handleGet/getVendorRequestMessage", vendorRequestId);
    }
    return dataMessage.getVendorRequestMessage(vendorRequestId);
}

//Get messages of change vendor inquiry
function getChangeVendorRequestMessage(changeVendorInquiryId) {
    if (!changeVendorInquiryId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter changeVendorInquiryId is not found", "vendorRequestInquiryMessageService/handleGet/getChangeVendorRequestMessage", changeVendorInquiryId);
    }
    return dataMessage.getChangeVendorRequestMessage(changeVendorInquiryId);
}

//Get messages of extend vendor inquiry
function getExtendVendorRequestMessage(extendVendorInquiryId) {
    if (!extendVendorInquiryId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter extendVendorInquiryId is not found", "vendorRequestInquiryMessageService/handleGet/getExtendVendorRequestMessage", extendVendorInquiryId);
    }
    return dataMessage.getExtendVendorRequestMessage(extendVendorInquiryId);
}

//Get messages of request
function getRequestMessage(requestId) {
    if (!requestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter requestId is not found", "requestMessageService/handleGet/getRequestMessage", requestId);
    }
    return dataMessage.getRequestMessage(requestId);
}

//Get messages of vendor inquiry
function getVendorInquiryMessage(vendorInquiryId) {
    if (!vendorInquiryId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter vendorInquiryId is not found", "vendorRequestInquiryMessageService/handleGet/getVendorInquiryMessage", vendorInquiryId);
    }
    return dataMessage.getVendorInquiryMessage(vendorInquiryId);
}
/** ***********END GET*************** */

/** ***********CHECK IF EXISTS*************** */
//Check if the vendor request exists
function existVendorRequest(vendorRequestId) {
    return vendorRequest.getVendorRequestByIdManual(vendorRequestId).length > 0;
}

//Check if the vendor inquiry exists
function existVendorInquiry(vendorInquiryId) {
    return vendorInquiry.getVendorInquiryByIdManual(vendorInquiryId).length > 0;
}

//Check if the extend vendor request exists
function existExtendVendorRequest(extendVendorRequestId) {
    return extend.getExtendVendorRequestByIdManual(extendVendorRequestId).length > 0;
}

//Check if the change vendor request exists
function existChangeVendorRequest(changeVendorRequestId) {
    return change.getChangeVendorRequestByIdManual(changeVendorRequestId).length > 0;
}

//Check if the inquiry exists
function existInquiry(inquiryId) {
    return inquiry.getInquiryByIdManual(inquiryId).length > 0;
}

//Check if the request exists
function existRequest(requestId) {
    return getRequest.getRequestByIdManual(requestId).length > 0;
}

//Check if the issue type exists
function existIssueType(issueTypeId) {
    return issueType.getIssueTypeByIdManual(issueTypeId).length > 0;
}
/** ***********END CHECK*************** */

/** ***********VALIDATION*************** */
//Validate insert inquiry message
function validateInsertInquiryMessage(objInquiry, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "inquiryService/handlePut/insertInquiryMessage", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'INQUIRY_ID',
        'MESSAGE_CONTENT',
        'RETURN_TYPE_ID'];

    if (!objInquiry) {
        throw ErrorLib.getErrors().CustomError("", "inquiryService/handlePost/insertInquiryMessage", "The object  Inquiry Message is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objInquiry[key] === null || objInquiry[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objInquiry[key]);
                if (!isValid) {
                    errors[key] = objInquiry[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "inquiryService/handlePost/insertInquiryMessage", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "inquiryService/handlePost/insertInquiryMessage", JSON.stringify(errors));
        }
    }
    return isValid;
}

//Validate insert request message
function validateInsertRequestMessage(objRequest, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "requestService/handlePut/insertRequestMessage", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'REQUEST_ID',
        'MESSAGE_CONTENT',
        'RETURN_TYPE_ID',
        'ISSUE_TYPE_ID'
    ];
    if (objRequest.ISSUE_TYPE_ID === 5) {
    	keys.push('OTHER_ISSUE_TYPE');
    }
    if (!objRequest) {
        throw ErrorLib.getErrors().CustomError("", "requestService/handlePost/insertRequestMessage", "The object Request Message is not found");
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
            throw ErrorLib.getErrors().CustomError("", "requestService/handlePost/insertRequestMessage", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "requestService/handlePost/insertRequestMessage", JSON.stringify(errors));
        }
    }
    return isValid;
}

//Validate insert extend vendor request message
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
        'RETURN_TYPE_ID',
        'ISSUE_TYPE_ID'
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

//Validate Insert Change Vendor Request Message
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
        'RETURN_TYPE_ID',
        'ISSUE_TYPE_ID'
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

//Validate Insert Vendor Inquiry Message
function validateInsertVendorInquiryMessage(objVendorInquiry, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "vendorMessageService/handlePut/insertVendorInquiryMessage", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['VENDOR_INQUIRY_ID',
        'MESSAGE_CONTENT',
        'RETURN_TYPE_ID',
        'ISSUE_TYPE_ID'];

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

//Validate Insert Vendor Request Message
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
        'RETURN_TYPE_ID',
        'ISSUE_TYPE_ID'
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
/** ***********END VALIDATION*************** */

/** ***********CHECK DATA TYPES*************** */
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
        case 'RETURN_TYPE_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'ISSUE_TYPE_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'OTHER_ISSUE_TYPE':
            valid = (!value) || (value.length > 0 && value.length <= 255);
            break;
    }
    return valid;
}