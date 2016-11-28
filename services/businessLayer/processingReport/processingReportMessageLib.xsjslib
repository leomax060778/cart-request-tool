$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataMessage = mapper.getDataProcessingReportMessage();
var dataVendorReadMessage = mapper.getDataVendorMessage();
var dataRequestReadMessage = mapper.getDataRequestMessage();
var dataInquiryReadMessage = mapper.getDataInquiryMessage();
var vendorRequest = mapper.getDataVendorRequest();
var change = mapper.getDataChangeVendorRequest();
var extend = mapper.getDataExtendVendorRequest();
var vendorInquiry = mapper.getDataVendorInquiry();
var inquiry = mapper.getDataInquiry();
var getRequest = mapper.getDataRequest();
var returnType = mapper.getReturnType();
var issueType = mapper.getDataIssueType();
var ErrorLib = mapper.getErrors();
var statusRequest = mapper.getCartRequest();
var statusVendor = mapper.getVendorRequestInquiryStatus();
var statusInquiry = mapper.getInquiryStatus();
var dbHelper = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

var issueTypeMap = {'STATUS_CHECK': 1, 'SRM_SYSTEM_ISSUE': 2, 'GPO_PROCESS_ISSUE': 3, 'DELAYED_DPO_APPROVAL': 4, 'OTHERS': 5, 'YVC_SYSTEM_ISSUE': 6, 'INCORRECT_INFORMATION': 7, 'MISSING_INFORMATION': 8};
var statusMap = {'TO_BE_CHECKED': 1, 'CHECKED': 2, 'IN_PROCESS': 3, 'RETURN_TO_REQUESTER': 4, 'APPROVED': 5, 'CANCELLED': 6};
var statusInquiryMap = {'TO_BE_CHECKED': 1, 'RETURN_TO_REQUESTER': 2, 'COMPLETED': 3, 'CANCELLED': 4};
var returnTypeMap = {'FYI_ONLY': 1, 'BM_EYES_ONLY': 2, 'REQUEST_RESPONSE': 3};

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
	    if (Number(objChangeVendorRequest.RETURN_TYPE_ID) === returnTypeMap.REQUEST_RESPONSE){
	    	objChangeVendorRequest.STATUS_ID = statusInquiryMap.RETURN_TO_REQUESTER;
			statusVendor.updateChangeVendorRequestStatusManual(objChangeVendorRequest, userId);
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
	    if (Number(objExtendVendorRequest.RETURN_TYPE_ID) === returnTypeMap.REQUEST_RESPONSE){
	    	objExtendVendorRequest.STATUS_ID = statusInquiryMap.RETURN_TO_REQUESTER;
			statusVendor.updateExtendVendorRequestStatusManual(objExtendVendorRequest, userId);
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
	    if (Number(objVendorRequest.RETURN_TYPE_ID) === returnTypeMap.REQUEST_RESPONSE){
	    	objVendorRequest.STATUS_ID = statusInquiryMap.RETURN_TO_REQUESTER;
			statusVendor.updateVendorRequestStatusManual(objVendorRequest, userId);
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
	    if (Number(objVendorInquiry.RETURN_TYPE_ID) === returnTypeMap.REQUEST_RESPONSE){
	    	objVendorInquiry.STATUS_ID = statusInquiryMap.RETURN_TO_REQUESTER;
			statusVendor.updateVendorInquiryStatusManual(objVendorInquiry, userId);
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
	    if (Number(objInquiry.RETURN_TYPE_ID) === returnTypeMap.REQUEST_RESPONSE){
	    	objInquiry.STATUS_ID = statusInquiryMap.RETURN_TO_REQUESTER;
			statusInquiry.updateInquiryStatusManual(objInquiry, userId);
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
	    if (Number(objRequest.RETURN_TYPE_ID) === returnTypeMap.REQUEST_RESPONSE){
	    	objRequest.STATUS_ID = statusMap.RETURN_TO_REQUESTER;
			statusRequest.updateRequestStatusManual(objRequest, userId);
		}
        return dataMessage.insertRequestMessage(objRequest, userId);
    }
}
/** ***********END INSERT*************** */

/** ***********GET*************** */
//Get inquiry message
function getInquiryMessage(inquiryId, userId) {
    if (!inquiryId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter inquiryId is not found", "inquiryService/handleGet/getMessage", inquiryId);
    }
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "inquiryService/handleGet/getMessage", userId);
    }
    var result = [];
    var objInquiry = {};
    try{
	    result = dataMessage.getInquiryMessageManual(inquiryId);
	    result.forEach(function (elem) {
		    if(elem.MESSAGE_READ === 0) {
		    	objInquiry.MESSAGE_READ = 1;
		    	dataInquiryReadMessage.updateInquiryMessageReadManual(objInquiry, userId);
		    }
	    });
    }
	catch(e){
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", "inquiryService/handleGet/getMessage", e.toString());
	}
	finally{
		dbHelper.commit();
		dbHelper.closeConnection();
	}
    return result;
}

//Get messages for vendor request
function getVendorRequestMessage(vendorRequestId, userId) {
    if (!vendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter vendorRequestId is not found", "vendorRequestInquiryMessageService/handleGet/getVendorRequestMessage", vendorRequestId);
    }
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "vendorRequestInquiryMessageService/handleGet/getVendorRequestMessage", userId);
    }
    var result = [];
    var objVendorRequest = {};
    try{
	    result = dataMessage.getVendorRequestMessageManual(vendorRequestId);
	    result.forEach(function (elem) {
		    if(elem.MESSAGE_READ === 0) {
		    	objVendorRequest.MESSAGE_READ = 1;
		    	dataVendorReadMessage.updateVendorRequestMessageReadManual(objVendorRequest, userId);
		    }
	    });
    }
	catch(e){
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", "vendorRequestInquiryMessageService/handleGet/getVendorRequestMessage", e.toString());
	}
	finally{
		dbHelper.commit();
		dbHelper.closeConnection();
	}
    return result;
}

//Get messages of change vendor request
function getChangeVendorRequestMessage(changeVendorRequestId, userId) {
    if (!changeVendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter changeVendorRequestId is not found", "vendorRequestInquiryMessageService/handleGet/getChangeVendorRequestMessage", changeVendorRequestId);
    }
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "vendorRequestInquiryMessageService/handleGet/getChangeVendorRequestMessage", userId);
    }
    var result = [];
    var objChangeVendorRequest = {};
    try{
	    result = dataMessage.getChangeVendorRequestMessageManual(changeVendorRequestId);
	    result.forEach(function (elem) {
		    if(elem.MESSAGE_READ === 0) {
		    	objChangeVendorRequest.MESSAGE_READ = 1;
		    	dataVendorReadMessage.updateChangeVendorRequestMessageReadManual(objChangeVendorRequest, userId);
		    }
	    });
    }
	catch(e){
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", "vendorRequestInquiryMessageService/handleGet/getChangeVendorRequestMessage", e.toString());
	}
	finally{
		dbHelper.commit();
		dbHelper.closeConnection();
	}
    return result;
}

//Get messages of extend vendor inquiry
function getExtendVendorRequestMessage(extendVendorRequestId, userId) {
    if (!extendVendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter extendVendorRequestId is not found", "vendorRequestInquiryMessageService/handleGet/getExtendVendorRequestMessage", extendVendorRequestId);
    }
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "vendorRequestInquiryMessageService/handleGet/getExtendVendorRequestMessage", userId);
    }
    var result = [];
    var objExtendVendorRequest = {};
    try{
	    result = dataMessage.getExtendVendorRequestMessageManual(extendVendorRequestId);
	    result.forEach(function (elem) {
		    if(elem.MESSAGE_READ === 0) {
		    	objExtendVendorRequest.MESSAGE_READ = 1;
		    	dataVendorReadMessage.updateExtendVendorRequestMessageReadManual(objExtendVendorRequest, userId);
		    }
	    });
    }
	catch(e){
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", "vendorRequestInquiryMessageService/handleGet/getExtendVendorRequestMessage", e.toString());
	}
	finally{
		dbHelper.commit();
		dbHelper.closeConnection();
	}
    return result;
}

//Get messages of request
function getRequestMessage(requestId, userId) {
    if (!requestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter requestId is not found", "requestMessageService/handleGet/getRequestMessage", requestId);
    }
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "vendorMessageService/handleGet/getVendorRequestMessage", userId);
    }
    var result = [];
    var objRequest = {};
    try{
	    result = dataMessage.getRequestMessageManual(requestId);
	    result.forEach(function (elem) {
		    if(elem.MESSAGE_READ === 0) {
		    	objRequest.MESSAGE_READ = 1;
		    	dataRequestReadMessage.updateRequestMessageReadManual(objRequest, userId);
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
        throw ErrorLib.getErrors().BadRequest("The Parameter vendorInquiryId is not found", "vendorRequestInquiryMessageService/handleGet/getVendorInquiryMessage", vendorInquiryId);
    }
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "vendorRequestInquiryMessageService/handleGet/getVendorInquiryMessage", userId);
    }
    var result = [];
    var objVendorInquiry = {};
    try{
	    result = dataMessage.getVendorInquiryMessageManual(vendorInquiryId);
	    result.forEach(function (elem) {
		    if(elem.MESSAGE_READ === 0) {
		    	objVendorInquiry.MESSAGE_READ = 1;
		    	dataVendorReadMessage.updateVendorInquiryMessageReadManual(objVendorInquiry, userId);
		    }
	    });
    }
	catch(e){
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", "vendorRequestInquiryMessageService/handleGet/getVendorInquiryMessage", e.toString());
	}
	finally{
		dbHelper.commit();
		dbHelper.closeConnection();
	}
    return result;
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
    if (objRequest.ISSUE_TYPE_ID === issueTypeMap.OTHERS) {
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