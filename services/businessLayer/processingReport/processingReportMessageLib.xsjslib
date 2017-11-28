$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataMessage = mapper.getDataProcessingReportMessage();
var dataVendorReadMessage = mapper.getDataVendorMessage();
var dataRequestReadMessage = mapper.getDataRequestMessage();
var dataInquiryReadMessage = mapper.getDataInquiryMessage();
var vendorRequest = mapper.getVendorRequest();
var change = mapper.getChangeVendorRequest();
var extend = mapper.getExtendVendorRequest();
var vendorInquiry = mapper.getVendorInquiry();
var businessUser = mapper.getUser();
var inquiry = mapper.getInquiry();
var getRequest = mapper.getDataRequest();
var messageType = mapper.getMessageType();
var subject = mapper.getDataSubject();
var ErrorLib = mapper.getErrors();
var statusRequest = mapper.getCartRequest();
var statusVendor = mapper.getVendorRequestInquiryStatus();
var statusInquiry = mapper.getInquiryStatus();
var dbHelper = mapper.getdbHelper();
var config = mapper.getDataConfig();

var changeVendorMail = mapper.getChangeVendorMail();
var extendVendorMail = mapper.getExtendVendorMail();
var vendorInquiryMail = mapper.getVendorInquiryMail();
var vendorMail = mapper.getVendorMail();

var mail = mapper.getMail();

//Cart Request email sending
var requestMailSend = mapper.getCartRequestMailSend();
//CRT Inquiry email sending
var inquiryMailSend = mapper.getCrtInquiryMailSend();
//CRT Vendor Request email sending
var vendorRequestMailSend = mapper.getVendorRequestMailSend();
//CRT Extend Vendor email sending
var extendVendorMailSend = mapper.getExtendVendorMailSend();
//CRT Change Vendor email sending
var changeVendorMailSend = mapper.getChangeVendorMailSend();
//CRT Vendor Inquiry email sending
var vendorInquiryMailSend = mapper.getVendorInquiryMailSend();

/** ***********END INCLUDE LIBRARIES*************** */

var subjectMap = {'STATUS_CHECK': 1, 'SRM_SYSTEM_ISSUE': 2, 'GPO_PROCESS_ISSUE': 3, 'DELAYED_DPO_APPROVAL': 4, 'OTHERS': 5, 'YVC_SYSTEM_ISSUE': 6, 'INCORRECT_INFORMATION': 7, 'MISSING_INFORMATION': 8};
var statusMap = {'TO_BE_CHECKED': 1, 'CHECKED': 2, 'IN_PROCESS': 3, 'RETURN_TO_REQUESTER': 4, 'APPROVED': 5, 'CANCELLED': 6};
var statusInquiryMap = {'TO_BE_CHECKED': 1, 'RETURN_TO_REQUESTER': 2, 'COMPLETED': 3, 'CANCELLED': 4};
var messageTypeMap = {'FYI_ONLY': 1, 'BM_EYES_ONLY': 2, 'REQUEST_RESPONSE': 3};
var pathName = {
		"CHANGE_VENDOR_MAIL" : "CHANGE_VENDOR_REQUEST",
		"EXTEND_VENDOR_MAIL" : "EXTEND_VENDOR_REQUEST",
		"VENDOR_INQUIRY_MAIL" : "VENDOR_INQUIRY",
		"VENDOR_REQUEST_MAIL" : "VENDOR_REQUEST",
		"CRT_INQUIRY_MAIL": "CRT_INQUIRY",
		"CART_REQUEST_MAIL": "CART_REQUEST"
};

/** ***********INSERT*************** */
//Insert new change vendor request message
function insertChangeVendorRequestMessage(objChangeVendorRequest, userId) {
	if (validateInsertChangeVendorRequestMessage(objChangeVendorRequest, userId)) {
	    if (!existChangeVendorRequest(objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID, userId)) {
	        throw ErrorLib.getErrors().CustomError("", "", "The Change Vendor Request with the id: " + objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID + " does not exist");
	    }
	    if (objChangeVendorRequest.MESSAGE_TYPE_ID && !messageType.existMessageType(objChangeVendorRequest.MESSAGE_TYPE_ID)) {
	        throw ErrorLib.getErrors().CustomError("", "", "The return type with the id " + objChangeVendorRequest.MESSAGE_TYPE_ID + " does not exist");
	    }
	    if (objChangeVendorRequest.SUBJECT_ID && !existSubject(objChangeVendorRequest.SUBJECT_ID)) {
	        throw ErrorLib.getErrors().CustomError("", "", "The issue type with the id " + objChangeVendorRequest.SUBJECT_ID + " does not exist");
	    }
	    if (Number(objChangeVendorRequest.STATUS_ID) > 0){
			statusVendor.updateChangeVendorRequestStatusManual(objChangeVendorRequest, userId);
		}
	    
	    var result = dataMessage.insertChangeVendorRequestMessage(objChangeVendorRequest, userId);
	    sendMessageMail(objChangeVendorRequest, pathName.CHANGE_VENDOR_MAIL, userId);
	    
	    return result;
    }
}

//Insert new extend vendor request message
function insertExtendVendorRequestMessage(objExtendVendorRequest, userId) {
	if (validateInsertExtendVendorRequestMessage(objExtendVendorRequest, userId)) {
	    if (!existExtendVendorRequest(objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID, userId)) {
	        throw ErrorLib.getErrors().CustomError("", "", "The Extend Vendor Request with the id: " + objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID + " does not exist");
	    }
	    if (objExtendVendorRequest.MESSAGE_TYPE_ID && !messageType.existMessageType(objExtendVendorRequest.MESSAGE_TYPE_ID)) {
	        throw ErrorLib.getErrors().CustomError("", "", "The return type with the id " + objExtendVendorRequest.MESSAGE_TYPE_ID + " does not exist");
	    }
	    if (objExtendVendorRequest.SUBJECT_ID && !existSubject(objExtendVendorRequest.SUBJECT_ID)) {
	        throw ErrorLib.getErrors().CustomError("", "", "The issue type with the id " + objExtendVendorRequest.SUBJECT_ID + " does not exist");
	    }
	    if (Number(objExtendVendorRequest.STATUS_ID) > 0){
			statusVendor.updateExtendVendorRequestStatusManual(objExtendVendorRequest, userId);
		}
	    
	    var result = dataMessage.insertExtendVendorRequestMessage(objExtendVendorRequest, userId);
        sendMessageMail(objExtendVendorRequest, pathName.EXTEND_VENDOR_MAIL, userId);
        
        return result;
    }
}

//Insert new vendor request message
function insertVendorRequestMessage(objVendorRequest, userId) {
	if (validateInsertVendorRequestMessage(objVendorRequest, userId)) {
	    if (!existVendorRequest(objVendorRequest.VENDOR_REQUEST_ID, userId)) {
	        throw ErrorLib.getErrors().CustomError("", "", "The Vendor Request with the id: " + objVendorRequest.VENDOR_REQUEST_ID + " does not exist");
	    }
	    if (objVendorRequest.MESSAGE_TYPE_ID && !messageType.existMessageType(objVendorRequest.MESSAGE_TYPE_ID)) {
	        throw ErrorLib.getErrors().CustomError("", "", "The return type with the id " + objVendorRequest.MESSAGE_TYPE_ID + " does not exist");
	    }
	    if (objVendorRequest.SUBJECT_ID && !existSubject(objVendorRequest.SUBJECT_ID)) {
	        throw ErrorLib.getErrors().CustomError("", "", "The issue type with the id " + objVendorRequest.SUBJECT_ID + " does not exist");
	    }
	    if (Number(objVendorRequest.STATUS_ID) > 0){
			statusVendor.updateVendorRequestStatusManual(objVendorRequest, userId);
		}
	    
	    var result = dataMessage.insertVendorRequestMessage(objVendorRequest, userId);
	    sendMessageMail(objVendorRequest, pathName.VENDOR_REQUEST_MAIL, userId);
        
        return result;
    }
}

//Insert new vendor inquiry message
function insertVendorInquiryMessage(objVendorInquiry, userId) {
	if (validateInsertVendorInquiryMessage(objVendorInquiry, userId)) {
	    if (!existVendorInquiry(objVendorInquiry.VENDOR_INQUIRY_ID, userId)) {
	        throw ErrorLib.getErrors().CustomError("", "", "The Vendor inquiry with the id: " + objVendorInquiry.VENDOR_INQUIRY_ID + " does not exist");
	    }
	    if (objVendorInquiry.MESSAGE_TYPE_ID && !messageType.existMessageType(objVendorInquiry.MESSAGE_TYPE_ID)) {
	        throw ErrorLib.getErrors().CustomError("", "", "The return type with the id " + objVendorInquiry.MESSAGE_TYPE_ID + " does not exist");
	    }
	    if (objVendorInquiry.SUBJECT_ID && !existSubject(objVendorInquiry.SUBJECT_ID)) {
	        throw ErrorLib.getErrors().CustomError("", "VendorMessageService/handlePost/insertVendorRequestMessage", "The issue type with the id " + objVendorInquiry.SUBJECT_ID + " does not exist");
	    }
	    if (Number(objVendorInquiry.STATUS_ID) > 0){
			statusVendor.updateVendorInquiryStatusManual(objVendorInquiry, userId);
		}
	    
	    var result = dataMessage.insertVendorInquiryMessage(objVendorInquiry, userId);
        sendMessageMail(objVendorInquiry, pathName.VENDOR_INQUIRY_MAIL, userId);
        
        return result;
    }
}

//Insert new inquiry message
function insertInquiryMessage(objInquiry, userId) {
	if (validateInsertInquiryMessage(objInquiry, userId)) {
		if (!existInquiry(objInquiry.INQUIRY_ID, userId)) {
	        throw ErrorLib.getErrors().CustomError("", "", "The inquiry with the id " + objInquiry.INQUIRY_ID + " does not exist");
	    }
	    if (objInquiry.MESSAGE_TYPE_ID && !messageType.existMessageType(objInquiry.MESSAGE_TYPE_ID)) {
	        throw ErrorLib.getErrors().CustomError("", "", "The Message type with the id " + objInquiry.MESSAGE_TYPE_ID + " does not exist");
	    }
	    if (objInquiry.SUBJECT_ID && !messageType.existMessageType(objInquiry.SUBJECT_ID)) {
	        throw ErrorLib.getErrors().CustomError("", "", "The Subject with the id " + objInquiry.MESSAGE_TYPE_ID + " does not exist");
	    }
	    
	    if (Number(objInquiry.STATUS_ID) > 0){
			statusInquiry.updateInquiryStatusManual(objInquiry, userId);
		}
	    
	    var result = dataMessage.insertInquiryMessage(objInquiry, userId);
	    sendMessageMail(objInquiry, pathName.CRT_INQUIRY_MAIL, userId);
        return result;
    }
}

//Insert new request message
function insertRequestMessage(objRequest, userId) {
	if (validateInsertRequestMessage(objRequest, userId)) {
	    if (!existRequest(objRequest.REQUEST_ID, userId)) {
	        throw ErrorLib.getErrors().CustomError("", "", "The request with the id " + objRequest.REQUEST_ID + " does not exist");
	    }
	    if (objRequest.MESSAGE_TYPE_ID && !messageType.existMessageType(objRequest.MESSAGE_TYPE_ID)) {
	        throw ErrorLib.getErrors().CustomError("", "", "The return type with the id " + objRequest.MESSAGE_TYPE_ID + " does not exist");
	    }
	    if (objRequest.SUBJECT_ID && !existSubject(objRequest.SUBJECT_ID)) {
	        throw ErrorLib.getErrors().CustomError("", "", "The issue type with the id " + objRequest.SUBJECT_ID + " does not exist");
	    }
	    if (Number(objRequest.STATUS_ID) > 0 && !objRequest.CANCEL_MESSAGE){
			statusRequest.updateRequestStatusManual(objRequest, userId);
		}
	    
	    var result = dataMessage.insertRequestMessage(objRequest, userId);
	    
	    var requestObj = getRequest.getRequestById(objRequest.REQUEST_ID, userId);
		var createdUser = businessUser.getUserById(requestObj.REQUESTER_ID);
		if(createdUser){
			objRequest.CREATED_USER_EMAIL = createdUser[0].EMAIL;	
		}
		
	    sendMessageMail(objRequest, pathName.CART_REQUEST_MAIL, userId);
        
        return result;
    }
}
/** ***********END INSERT*************** */

/** ***********GET*************** */
//Get inquiry message
function getInquiryMessage(inquiryId, userId) {
    if (!inquiryId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter inquiryId is not found", "", inquiryId);
    }
	if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var result = [];
    var messageContent;
	var startPosition;
	var inquiryMessageLength;
	var i;
	var splitNumber; 
    try{
	    result = dataMessage.getInquiryMessageManual(inquiryId);
	    result = JSON.parse(JSON.stringify(result));
	    result.forEach(function (elem) {
	    	messageContent = "";
    		startPosition = 1;
    		inquiryMessageLength = 5000;
    		i = 0;
    		splitNumber = 0; 
	    	//Join message content
	    	splitNumber = elem.CONTENT_LENGTH / inquiryMessageLength;
	    	for (i = 0; i < splitNumber; i++){
	    		messageContent = messageContent.concat(dataInquiryReadMessage.getInquiryMessageContentManual(elem.INQUIRY_ID, elem.MESSAGE_ID, startPosition, inquiryMessageLength).MESSAGE_CONTENT);
	    		startPosition = startPosition + inquiryMessageLength;	
	    	}
	    	elem.MESSAGE_CONTENT = messageContent;
	    });
    }
	catch(e){
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", "", e.toString());
	}
	finally{
		dbHelper.commit();
		dbHelper.closeConnection();
	}
	return result;
}

//Get messages for vendor request
function getVendorRequestMessage(vendorRequestId, userId){
	if (!vendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter vendorRequestId is not found", "", vendorRequestId);
    }
	if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var result = [];
    var messageContent;
	var startPosition;
	var vendorRequestMessageLength;
	var i;
	var splitNumber; 
    try{
	    result = dataMessage.getVendorRequestMessageManual(vendorRequestId);
	    result = JSON.parse(JSON.stringify(result));
	    result.forEach(function (elem) {
	    	messageContent = "";
	    	startPosition = 1;
	    	vendorRequestMessageLength = 5000;
	    	i = 0;
	    	splitNumber = 0;
	    	//Join message content
	    	splitNumber = elem.CONTENT_LENGTH / vendorRequestMessageLength;
	    	for (i = 0; i < splitNumber; i++){
	    		messageContent = messageContent.concat(dataVendorReadMessage.getVendorRequestMessageContentManual(elem.VENDOR_REQUEST_ID, elem.VENDOR_REQUEST_MESSAGE_ID, startPosition, vendorRequestMessageLength).MESSAGE_CONTENT);
	    		startPosition = startPosition + vendorRequestMessageLength;	
	    	}
	    	elem.MESSAGE_CONTENT = messageContent;
	    });
    }
	catch(e){
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", "", e.toString());
	}
	finally{
		dbHelper.commit();
		dbHelper.closeConnection();
	}
	return result;
}

//Get messages of change vendor request
function getChangeVendorRequestMessage(changeVendorRequestId, userId){
	if (!changeVendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter changeVendorRequestId is not found", "", changeVendorRequestId);
    }
	if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var result = [];
    var messageContent;
	var startPosition;
	var changeMessageLength;
	var i;
	var splitNumber;
    try{
	    result = dataMessage.getChangeVendorRequestMessageManual(changeVendorRequestId);
	    result = JSON.parse(JSON.stringify(result));
	    result.forEach(function (elem) {
	    	messageContent = "";
	    	startPosition = 1;
	    	changeMessageLength = 5000;
	    	i = 0;
	    	splitNumber = 0;
	    	//Join message content
	    	splitNumber = elem.CONTENT_LENGTH / changeMessageLength;
	    	for (i = 0; i < splitNumber; i++){
	    		messageContent = messageContent.concat(dataVendorReadMessage.getChangeVendorRequestMessageContentManual(elem.CHANGE_VENDOR_REQUEST_ID, elem.CHANGE_VENDOR_REQUEST_MESSAGE_ID, startPosition, changeMessageLength).MESSAGE_CONTENT);
	    		startPosition = startPosition + changeMessageLength;	
	    	}
	    	elem.MESSAGE_CONTENT = messageContent;
	    });
    }
	catch(e){
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", "", e.toString());
	}
	finally{
		dbHelper.commit();
		dbHelper.closeConnection();
	}
	return result;
}

//Get messages of extend vendor inquiry
function getExtendVendorRequestMessage(extendVendorRequestId, userId){
	if (!extendVendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter extendVendorRequestId is not found", "", extendVendorRequestId);
    }
	if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var result = [];
    var messageContent;
	var startPosition;
	var extendMessageLength;
	var i;
	var splitNumber; 
    try{
	    result = dataMessage.getExtendVendorRequestMessageManual(extendVendorRequestId);
	    result = JSON.parse(JSON.stringify(result));
	    result.forEach(function (elem) {
	    	messageContent = "";
	    	startPosition = 1;
	    	extendMessageLength = 5000;
	    	i = 0;
	    	splitNumber = 0;
	    	//Join message content
	    	splitNumber = elem.CONTENT_LENGTH / extendMessageLength;
	    	for (i = 0; i < splitNumber; i++){
	    		messageContent = messageContent.concat(dataVendorReadMessage.getExtendVendorRequestMessageContentManual(elem.EXTEND_VENDOR_REQUEST_ID, elem.EXTEND_VENDOR_REQUEST_MESSAGE_ID, startPosition, extendMessageLength).MESSAGE_CONTENT);
	    		startPosition = startPosition + extendMessageLength;	
	    	}
	    	elem.MESSAGE_CONTENT = messageContent;
	    });
    }
	catch(e){
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", "", e.toString());
	}
	finally{
		dbHelper.commit();
		dbHelper.closeConnection();
	}
	return result;
}

//Get messages of request
function getRequestMessage(requestId, userId){
	if (!requestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter requestId is not found", "", requestId);
    }
	if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var result = [];
    var messageContent;
	var startPosition;
	var requestMessageLength;
	var i;
	var splitNumber; 
    try{
	    result = dataMessage.getRequestMessageManual(requestId);
	    result = JSON.parse(JSON.stringify(result));
	    result.forEach(function (elem) {
	    	messageContent = "";
    		startPosition = 1;
    		requestMessageLength = 5000;
    		i = 0;
    		splitNumber = 0;
	    	//Join message content
	    	splitNumber = elem.CONTENT_LENGTH / requestMessageLength;
	    	for (i = 0; i < splitNumber; i++){
	    		messageContent = messageContent.concat(dataRequestReadMessage.getRequestMessageContentManual(elem.REQUEST_ID, elem.MESSAGE_ID, startPosition, requestMessageLength).MESSAGE_CONTENT);
	    		startPosition = startPosition + requestMessageLength;	
	    	}
	    	elem.MESSAGE_CONTENT = messageContent;
	    });
    }
	catch(e){
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", "", e.toString());
	}
	finally{
		dbHelper.commit();
		dbHelper.closeConnection();
	}
	return result;
}

//Get messages of vendor inquiry
function getVendorInquiryMessage(vendorInquiryId, userId){
	if (!vendorInquiryId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter vendorInquiryId is not found", "", vendorInquiryId);
    }
	if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var result = [];
    var messageContent = "";
	var startPosition = 1;
	var vendorInquiryMessageLength = 5000;
	var i = 0;
	var splitNumber = 0; 
    try{
	    result = dataMessage.getVendorInquiryMessageManual(vendorInquiryId);
	    result = JSON.parse(JSON.stringify(result));
	    result.forEach(function (elem) {
	    	messageContent = "";
	    	startPosition = 1;
	    	vendorInquiryMessageLength = 5000;
	    	i = 0;
	    	splitNumber = 0;
	    	//Join message content
	    	splitNumber = elem.CONTENT_LENGTH / vendorInquiryMessageLength;
	    	for (i = 0; i < splitNumber; i++){
	    		messageContent = messageContent.concat(dataVendorReadMessage.getVendorInquiryMessageContentManual(elem.VENDOR_INQUIRY_ID, elem.VENDOR_INQUIRY_MESSAGE_ID, startPosition, vendorInquiryMessageLength).MESSAGE_CONTENT);
	    		startPosition = startPosition + vendorInquiryMessageLength;	
	    	}
	    	elem.MESSAGE_CONTENT = messageContent;
	    });
    }
	catch(e){
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", "", e.toString());
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
function existVendorRequest(vendorRequestId, userId) {
    return Object.keys(vendorRequest.getVendorRequestByIdManual(vendorRequestId, userId)).length > 0;
}

//Check if the vendor inquiry exists
function existVendorInquiry(vendorInquiryId, userId) {
    return Object.keys(vendorInquiry.getVendorInquiryByIdManual(vendorInquiryId, userId)).length > 0;
}
 
//Check if the extend vendor request exists
function existExtendVendorRequest(extendVendorRequestId, userId) {
    return Object.keys(extend.getExtendVendorRequestByIdManual(extendVendorRequestId, userId)).length > 0;
}

//Check if the change vendor request exists
function existChangeVendorRequest(changeVendorRequestId, userId) {
    return Object.keys(change.getChangeVendorRequestByIdManual(changeVendorRequestId, userId)).length > 0;
}

//Check if the inquiry exists
function existInquiry(inquiryId, userId) {
    return Object.keys(inquiry.getInquiryByIdManual(inquiryId, userId)).length > 0;
}

//Check if the request exists
function existRequest(requestId, userId) {
    return getRequest.getRequestByIdManual(requestId, userId).length > 0;
}

//Check if the issue type exists
function existSubject(subjectId) {
    return subject.getSubjectByIdManual(subjectId).length > 0;
}
/** ***********END CHECK*************** */

/** ***********VALIDATION*************** */
//Validate insert inquiry message
function validateInsertInquiryMessage(objInquiry, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'INQUIRY_ID',
        'MESSAGE_CONTENT'
        ];
    
    var optionalKeys = [
                        'ADDITIONAL_MESSAGE_TYPE_INFORMATION',
                        'ADDITIONAL_SUBJECT_INFORMATION',
                        'MESSAGE_TYPE_ID',
                        'SUBJECT_ID'
                        ];

    if (!objInquiry) {
        throw ErrorLib.getErrors().CustomError("", "", "The object  Inquiry Message is not found");
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
        
        optionalKeys.forEach(function (key) {
        	// validate attribute type
            isValid = validateType(key, objInquiry[key]);
            if (!isValid) {
            	errors[key] = objInquiry[key];
                throw BreakException;
            }   
        });
        
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "", JSON.stringify(errors));
        }
    }
    return isValid;
}

//Validate insert request message
function validateInsertRequestMessage(objRequest, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'REQUEST_ID',
        'MESSAGE_CONTENT'
    ];
    
    var optionalKeys = [
                        'ADDITIONAL_MESSAGE_TYPE_INFORMATION',
                        'ADDITIONAL_SUBJECT_INFORMATION',
                        'MESSAGE_TYPE_ID',
                        'SUBJECT_ID'
                        ];
    
    if (!objRequest) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Request Message is not found");
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
        
        optionalKeys.forEach(function (key) {
        	// validate attribute type
            isValid = validateType(key, objRequest[key]);
            if (!isValid) {
            	errors[key] = objRequest[key];
                throw BreakException;
            }   
        });
        
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "", JSON.stringify(errors));
        }
    }
    return isValid;
}

//Validate insert extend vendor request message
function validateInsertExtendVendorRequestMessage(objExtendVendorRequest, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'EXTEND_VENDOR_REQUEST_ID',
        'MESSAGE_CONTENT'
    ];
    
    var optionalKeys = [
                        'ADDITIONAL_MESSAGE_TYPE_INFORMATION',
                        'ADDITIONAL_SUBJECT_INFORMATION',
                        'MESSAGE_TYPE_ID',
                        'SUBJECT_ID'
                        ];

    if (!objExtendVendorRequest) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Extend Vendor Request is not found");
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
        
        optionalKeys.forEach(function (key) {
        	// validate attribute type
            isValid = validateType(key, objExtendVendorRequest[key]);
            if (!isValid) {
            	errors[key] = objExtendVendorRequest[key];
                throw BreakException;
            }   
        });
        
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "", JSON.stringify(errors));
        }
    }
    return isValid;
}

//Validate Insert Change Vendor Request Message
function validateInsertChangeVendorRequestMessage(objChangeVendorRequest, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'CHANGE_VENDOR_REQUEST_ID',
        'MESSAGE_CONTENT'
    ];
    
    var optionalKeys = [
                        'ADDITIONAL_MESSAGE_TYPE_INFORMATION',
                        'ADDITIONAL_SUBJECT_INFORMATION',
                        'MESSAGE_TYPE_ID',
                        'SUBJECT_ID'
                        ];

    if (!objChangeVendorRequest) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Change Vendor Request is not found");
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
        
        optionalKeys.forEach(function (key) {
        	// validate attribute type
            isValid = validateType(key, objChangeVendorRequest[key]);
            if (!isValid) {
            	errors[key] = objChangeVendorRequest[key];
                throw BreakException;
            }   
        });
        
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "", JSON.stringify(errors));
        }
    }
    return isValid;
}

//Validate Insert Vendor Inquiry Message
function validateInsertVendorInquiryMessage(objVendorInquiry, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
                'VENDOR_INQUIRY_ID',
                'MESSAGE_CONTENT'
                ];
    
    var optionalKeys = [
                        'ADDITIONAL_MESSAGE_TYPE_INFORMATION',
                        'ADDITIONAL_SUBJECT_INFORMATION',
                        'MESSAGE_TYPE_ID',
                        'SUBJECT_ID'
                        ];

    if (!objVendorInquiry) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Vendor Inquiry Message is not found");
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
        
        optionalKeys.forEach(function (key) {
        	// validate attribute type
            isValid = validateType(key, objVendorInquiry[key]);
            if (!isValid) {
            	errors[key] = objVendorInquiry[key];
                throw BreakException;
            }   
        });
        
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "", JSON.stringify(errors));
        }
    }
    return isValid;
}

//Validate Insert Vendor Request Message
function validateInsertVendorRequestMessage(objVendorRequest, userId) {
    if (!userId){
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'VENDOR_REQUEST_ID',
        'MESSAGE_CONTENT'
    ];
    
    var optionalKeys = [
                        'ADDITIONAL_MESSAGE_TYPE_INFORMATION',
                        'ADDITIONAL_SUBJECT_INFORMATION',
                        'MESSAGE_TYPE_ID',
                        'SUBJECT_ID'
                        ];

    if (!objVendorRequest) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Vendor Request is not found");
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
        
        optionalKeys.forEach(function (key) {
        	// validate attribute type
            isValid = validateType(key, objVendorRequest[key]);
            if (!isValid) {
            	errors[key] = objVendorRequest[key];
                throw BreakException;
            }   
        });
        
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "", JSON.stringify(errors));
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
            valid = value.length > 0;
            break;
        case 'MESSAGE_TYPE_ID':
            valid = !value || (!isNaN(value) && (value > 0));
            break;
        case 'SUBJECT_ID':
            valid = !value || (!isNaN(value) && (value > 0));
            break;
        case 'ADDITIONAL_MESSAGE_TYPE_INFORMATION':
            valid = (!value) || (value.length > 0 && value.length <= 255);
            break;
        case 'ADDITIONAL_SUBJECT_INFORMATION':
            valid = (!value) || (value.length > 0 && value.length <= 255);
            break;
    }
    return valid;
}

/** EMAIL **/

function sendMessageMail(reqBody, vendor_type, userId){
	switch(vendor_type) {
	    case "CHANGE_VENDOR_REQUEST":
	    	if (Number(reqBody.MESSAGE_TYPE_ID) === messageTypeMap.FYI_ONLY){
                changeVendorMailSend.sendFYIMail(reqBody, userId, true);
	    	} else if (Number(reqBody.MESSAGE_TYPE_ID) === messageTypeMap.REQUEST_RESPONSE){
                changeVendorMailSend.sendReturnToRequestMail(reqBody.CHANGE_VENDOR_REQUEST_ID, userId, true);
	    	} else if (Number(reqBody.MESSAGE_TYPE_ID) !== messageTypeMap.BM_EYES_ONLY) {
                changeVendorMailSend.sendMessageMail(reqBody, userId, true);
	    	}
	        break;
	    case "EXTEND_VENDOR_REQUEST":
	    	if (Number(reqBody.MESSAGE_TYPE_ID) === messageTypeMap.FYI_ONLY){
	    		extendVendorMailSend.sendFYIMail(reqBody, userId, true);
	    	} else if (Number(reqBody.MESSAGE_TYPE_ID) === messageTypeMap.REQUEST_RESPONSE){
                extendVendorMailSend.sendReturnToRequestMail(reqBody.EXTEND_VENDOR_REQUEST_ID, userId, true);
	    	} else if (Number(reqBody.MESSAGE_TYPE_ID) !== messageTypeMap.BM_EYES_ONLY) {
                extendVendorMailSend.sendMessageMail(reqBody, userId, true);
	    	}
	        break;
	    case "VENDOR_INQUIRY":
	    	if (Number(reqBody.MESSAGE_TYPE_ID) === messageTypeMap.FYI_ONLY){
                vendorInquiryMailSend.sendFYIMail(reqBody, userId, true);
	    	} else if (Number(reqBody.MESSAGE_TYPE_ID) === messageTypeMap.REQUEST_RESPONSE){
                vendorInquiryMailSend.sendReturnToRequestMail(reqBody.VENDOR_INQUIRY_ID, userId, true);
	    	} else if (Number(reqBody.MESSAGE_TYPE_ID) !== messageTypeMap.BM_EYES_ONLY) {
                vendorInquiryMailSend.sendMessageMail(reqBody, userId, true);
	    	}
	        break;
	    case "VENDOR_REQUEST":
	    	if (Number(reqBody.MESSAGE_TYPE_ID) === messageTypeMap.FYI_ONLY){
	    		vendorRequestMailSend.sendFYIMail(reqBody, userId, true);
	    	} else if (Number(reqBody.MESSAGE_TYPE_ID) === messageTypeMap.REQUEST_RESPONSE){
                vendorRequestMailSend.sendReturnToRequestMail(reqBody.VENDOR_REQUEST_ID, userId, true);
	    	} else if (Number(reqBody.MESSAGE_TYPE_ID) !== messageTypeMap.BM_EYES_ONLY) {
                vendorRequestMailSend.sendMessageMail(reqBody, userId, true);
	    	}
	        break;
	    case "CRT_INQUIRY":
	    	if (Number(reqBody.MESSAGE_TYPE_ID) === messageTypeMap.FYI_ONLY){
	    		inquiryMailSend.sendFYIMail(reqBody, userId, true);
	    	} else if (Number(reqBody.MESSAGE_TYPE_ID) === messageTypeMap.REQUEST_RESPONSE){
	    		inquiryMailSend.sendReturnToRequestMail(reqBody.INQUIRY_ID, userId, true);
	    	} else if (Number(reqBody.MESSAGE_TYPE_ID) !== messageTypeMap.BM_EYES_ONLY) {
	    		inquiryMailSend.sendNewMessageMail(reqBody, userId, true);
	    	}
			break;
	    case "CART_REQUEST":
	    	if (Number(reqBody.MESSAGE_TYPE_ID) === messageTypeMap.FYI_ONLY){
				requestMailSend.sendFYIMail(reqBody.REQUEST_ID, userId, true);
	    	} else if (Number(reqBody.MESSAGE_TYPE_ID) === messageTypeMap.REQUEST_RESPONSE){
                requestMailSend.sendReturnToRequestMail(reqBody.REQUEST_ID, userId, true);
	    	} else if (Number(reqBody.MESSAGE_TYPE_ID) !== messageTypeMap.BM_EYES_ONLY) {
	    		if (reqBody.CANCEL_MESSAGE) {
	    			requestMailSend.sendCancelMessageMail(reqBody.REQUEST_ID, userId);
	    		} else {
	    			requestMailSend.sendNewMessageMail(reqBody.REQUEST_ID, userId, true);
	    		}
	    	}
	    	break;
	}
}