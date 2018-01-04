$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataMessage = mapper.getDataVendorMessage();
var request = mapper.getVendorRequest();
var change = mapper.getChangeVendorRequest();
var extend = mapper.getExtendVendorRequest();
var inquiry = mapper.getVendorInquiry();
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
    	if (existChangeVendorRequest(objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID, userId)) {
            if (Number(objChangeVendorRequest.PREVIOUS_STATUS_ID) !== statusMap.TO_BE_CHECKED && Number(objChangeVendorRequest.PREVIOUS_STATUS_ID) !== statusMap.CHECKED) {
                objChangeVendorRequest.STATUS_ID = statusInquiryMap.TO_BE_CHECKED;
                status.updateChangeVendorRequestStatus(objChangeVendorRequest, userId);
                change.sendResubmitMail(objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID, userId);
            }
    		return dataMessage.insertChangeVendorRequestMessage(objChangeVendorRequest, userId);
    	} else {
            throw ErrorLib.getErrors().CustomError("", "", "The Change Vendor Request with the id: " + objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID + " does not exist");
        }
    } else {
        throw ErrorLib.getErrors().CustomError("", "", "The Change Vendor Request with the id: " + objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID + " does not exist");
    }
}

//Insert new extend vendor request message
function insertExtendVendorRequestMessage(objExtendVendorRequest, userId) {
    if (validateInsertExtendVendorRequestMessage(objExtendVendorRequest, userId)) {
    	if (existExtendVendorRequest(objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID, userId)) {
            if (Number(objExtendVendorRequest.PREVIOUS_STATUS_ID) !== statusMap.TO_BE_CHECKED && Number(objExtendVendorRequest.PREVIOUS_STATUS_ID) !== statusMap.CHECKED) {
                objExtendVendorRequest.STATUS_ID = statusInquiryMap.TO_BE_CHECKED;
                status.updateExtendVendorRequestStatus(objExtendVendorRequest, userId);
                extend.sendResubmitMail(objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID, userId);
            }
    		return dataMessage.insertExtendVendorRequestMessage(objExtendVendorRequest, userId);
    	} else {
            throw ErrorLib.getErrors().CustomError("", "", "The Extend Vendor Request with the id: " + objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID + " does not exist");
        }
    }
}

//Insert new extend vendor request message manual
function insertExtendVendorRequestMessageManual(objExtendVendorRequest, userId) {
    if (validateInsertExtendVendorRequestMessage(objExtendVendorRequest, userId)) {
    	if (existExtendVendorRequest(objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID, userId)) {
            if (Number(objExtendVendorRequest.PREVIOUS_STATUS_ID) !== statusMap.TO_BE_CHECKED && Number(objExtendVendorRequest.PREVIOUS_STATUS_ID) !== statusMap.CHECKED) {
                objExtendVendorRequest.STATUS_ID = statusInquiryMap.TO_BE_CHECKED;
                status.updateExtendVendorRequestStatusManual(objExtendVendorRequest, userId);
                extend.sendResubmitMail(objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID, userId);
            }
    		return dataMessage.insertExtendVendorRequestMessageManual(objExtendVendorRequest, userId);
    	} else {
            throw ErrorLib.getErrors().CustomError("", "", "The Extend Vendor Request with the id: " + objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID + " does not exist");
        }
    }
}


//Insert new vendor request message
function insertVendorRequestMessage(objVendorRequest, userId) {
    if (validateInsertVendorRequestMessage(objVendorRequest, userId)) {
        if (existVendorRequest(objVendorRequest.VENDOR_REQUEST_ID, userId)) {
            if (Number(objVendorRequest.PREVIOUS_STATUS_ID) !== statusMap.TO_BE_CHECKED && Number(objVendorRequest.PREVIOUS_STATUS_ID) !== statusMap.CHECKED) {
                objVendorRequest.STATUS_ID = statusInquiryMap.TO_BE_CHECKED;
                status.updateVendorRequestStatus(objVendorRequest, userId);
                request.sendResubmitMail(objVendorRequest.VENDOR_REQUEST_ID, userId);
            }
            return dataMessage.insertVendorRequestMessage(objVendorRequest, userId);
        } else {
            throw ErrorLib.getErrors().CustomError("", "", "The Vendor Request with the id: " + objVendorRequest.VENDOR_REQUEST_ID + " does not exist");
        }
    }
}

//Insert new vendor inquiry message
function insertVendorInquiryMessage(objVendorInquiry, userId) {
    if (validateInsertVendorInquiryMessage(objVendorInquiry, userId)) {
    	if (existVendorInquiry(objVendorInquiry.VENDOR_INQUIRY_ID, userId)) {
    		if (Number(objVendorInquiry.PREVIOUS_STATUS_ID) !== statusInquiryMap.TO_BE_CHECKED) {
    			objVendorInquiry.STATUS_ID = statusInquiryMap.TO_BE_CHECKED;
    			status.updateVendorInquiryStatus(objVendorInquiry, userId);
                inquiry.sendResubmitMail(objVendorInquiry.VENDOR_INQUIRY_ID, userId);
			}
    		return dataMessage.insertVendorInquiryMessage(objVendorInquiry, userId);
    	} else {
            throw ErrorLib.getErrors().CustomError("", "", "The Vendor inquiry with the id: " + objVendorInquiry.VENDOR_INQUIRY_ID + " does not exist");
        }
    }
}
/** ***********END INSERT*************** */

/** ***********GET*************** */
//Get messages for vendor request
function getVendorRequestMessage(vendorRequestId, userId) {
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
	    		messageContent = messageContent.concat(dataMessage.getVendorRequestMessageContentManual(elem.VENDOR_REQUEST_ID, elem.VENDOR_REQUEST_MESSAGE_ID, startPosition, vendorRequestMessageLength).MESSAGE_CONTENT);
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

//Get messages of vendor inquiry
function getVendorInquiryMessage(vendorInquiryId, userId) {
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
	    		messageContent = messageContent.concat(dataMessage.getVendorInquiryMessageContentManual(elem.VENDOR_INQUIRY_ID, elem.VENDOR_INQUIRY_MESSAGE_ID, startPosition, vendorInquiryMessageLength).MESSAGE_CONTENT);
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

//Get messages for change vendor request
function getChangeVendorRequestMessage(changeVendorRequestId, userId) {
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
	    		messageContent = messageContent.concat(dataMessage.getChangeVendorRequestMessageContentManual(elem.CHANGE_VENDOR_REQUEST_ID, elem.CHANGE_VENDOR_REQUEST_MESSAGE_ID, startPosition, changeMessageLength).MESSAGE_CONTENT);
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

//Get messages for extend vendor request
function getExtendVendorRequestMessage(extendVendorRequestId, userId) {
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
	    		messageContent = messageContent.concat(dataMessage.getExtendVendorRequestMessageContentManual(elem.EXTEND_VENDOR_REQUEST_ID, elem.EXTEND_VENDOR_REQUEST_MESSAGE_ID, startPosition, extendMessageLength).MESSAGE_CONTENT);
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
/** ***********END GET*************** */

/** ***********UPDATE*************** */
//Update vendor request messages read
function updateVendorRequestMessage(objVendorRequest, userId) {
	if (!userId) {
	    throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
	}
	var result = [];
	try{
		if(objVendorRequest.METHOD && objVendorRequest.METHOD === 'AllRead'){
    		if (objVendorRequest.MESSAGES && objVendorRequest.MESSAGES.length > 0) {
    			objVendorRequest.MESSAGES.forEach(function(elem){
    		    	if(Number(elem.CREATED_USER_ID) !== Number(userId)){
    		    			elem.MESSAGE_READ = 1;
    	    		    	result.push(dataMessage.updateVendorRequestMessageReadByMessageIdManual(elem, userId));    
    	        	}
    		    });
        	}
    		        	
    	}else{
    		if (objVendorRequest.MESSAGES.length > 0) {
				objVendorRequest.MESSAGES.forEach(function(elem){
			    	result.push(dataMessage.updateVendorRequestMessageReadByMessageIdManual(elem, userId));
			    });
    		}
    	}
	}
		catch(e){
			dbHelper.rollback();
			throw ErrorLib.getErrors().CustomError("", "", e.toString());
		}
		finally{
			if(result.length > 0){
				dbHelper.commit();
				dbHelper.closeConnection();
			}
		}
	return result;
}

//Update vendor inquiry messages read
function updateVendorInquiryMessage(objVendorInquiry, userId) {
	if (!userId) {
	    throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
	}
	var result = [];
	try{
		if(objVendorInquiry.METHOD && objVendorInquiry.METHOD === 'AllRead'){
    		if (objVendorInquiry.MESSAGES && objVendorInquiry.MESSAGES.length > 0) {
    			objVendorInquiry.MESSAGES.forEach(function(elem){
    		    	if(Number(elem.CREATED_USER_ID) !== Number(userId)){
    		    			elem.MESSAGE_READ = 1;
    	    		    	result.push(dataMessage.updateVendorInquiryMessageReadByMessageIdManual(elem, userId));    
    	        	}
    		    });
        	}
    		        	
    	}else{
    		if (objVendorInquiry.MESSAGES.length > 0) {
				objVendorInquiry.MESSAGES.forEach(function(elem){
					result.push(dataMessage.updateVendorInquiryMessageReadByMessageIdManual(elem, userId));
			    });
    		}
    	}
	}
		catch(e){
			dbHelper.rollback();
			throw ErrorLib.getErrors().CustomError("", "", e.toString());
		}
		finally{
			if(result.length > 0){
				dbHelper.commit();
				dbHelper.closeConnection();
			}
		}
	return result;
}

//Update change vendor request messages read
function updateChangeVendorRequestMessage(objChangeVendorRequest, userId) {
	if (!userId) {
	    throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
	}
	var result = [];
	try{
		if(objChangeVendorRequest.METHOD && objChangeVendorRequest.METHOD === 'AllRead'){
    		if (objChangeVendorRequest.MESSAGES && objChangeVendorRequest.MESSAGES.length > 0) {
    			objChangeVendorRequest.MESSAGES.forEach(function(elem){
    		    	if(Number(elem.CREATED_USER_ID) !== Number(userId)){
    		    			elem.MESSAGE_READ = 1;
    	    		    	result.push(dataMessage.updateChangeVendorRequestMessageReadByMessageIdManual(elem, userId));    
    	        	}
    		    });
        	}
    		        	
    	}else{
    		if (objChangeVendorRequest.MESSAGES.length > 0) {
				objChangeVendorRequest.MESSAGES.forEach(function(elem){
					result.push(dataMessage.updateChangeVendorRequestMessageReadByMessageIdManual(elem, userId));
			    });
			}
    	}
	}
		catch(e){
			dbHelper.rollback();
			throw ErrorLib.getErrors().CustomError("", "", e.toString());
		}
		finally{
			if(result.length > 0){
				dbHelper.commit();
				dbHelper.closeConnection();
			}
		}
	return result;
}

//Update extend vendor request messages read
function updateExtendVendorRequestMessage(objExtendVendorRequest, userId) {
	if (!userId) {
	    throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
	}

	var result = [];
	try{
		if(objExtendVendorRequest.METHOD && objExtendVendorRequest.METHOD === 'AllRead'){
    		if (objExtendVendorRequest.MESSAGES && objExtendVendorRequest.MESSAGES.length > 0) {
    			objExtendVendorRequest.MESSAGES.forEach(function(elem){
    		    	if(Number(elem.CREATED_USER_ID) !== Number(userId)){
    		    			elem.MESSAGE_READ = 1;
    	    		    	result.push(dataMessage.updateExtendVendorRequestMessageReadByMessageIdManual(elem, userId));    
    	        	}
    		    });
        	}
    		        	
    	}else{
    		if (objExtendVendorRequest.MESSAGES.length > 0) {
				objExtendVendorRequest.MESSAGES.forEach(function(elem){
					result.push(dataMessage.updateExtendVendorRequestMessageReadByMessageIdManual(elem, userId));
			    });
			}
    	}
	}
		catch(e){
			dbHelper.rollback();
			throw ErrorLib.getErrors().CustomError("", "", e.toString());
		}
		finally{
			if(result.length > 0){
				dbHelper.commit();
				dbHelper.closeConnection();
			}
		}
	return result;
}
/** ***********END UPDATE*************** */

/** ***********CHECK IF EXIST*************** */
//Check if the request exists
function existVendorRequest(vendorRequestId, userId) {
  return Object.keys(request.getVendorRequestByIdManual(vendorRequestId, userId)).length > 0;
}

//Check if the inquiry exists
function existVendorInquiry(vendorInquiryId, userId) {
	 return Object.keys(inquiry.getVendorInquiryByIdManual(vendorInquiryId, userId)).length > 0;
}

//Check if the extend vendor request exists
function existExtendVendorRequest(extendVendorRequestId, userId) {
  return Object.keys(extend.getExtendVendorRequestByIdManual(extendVendorRequestId, userId)).length > 0;
}

//Check if the change vendor request exists
function existChangeVendorRequest(changeVendorRequestId, userId) {
  return Object.keys(change.getChangeVendorRequestByIdManual(changeVendorRequestId, userId)).length > 0;
}
/** ***********END CHECK IF EXIST*************** */

/** ***********VALIDATE INSERT*************** */
function validateInsertExtendVendorRequestMessage(objExtendVendorRequest, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
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

function validateInsertChangeVendorRequestMessage(objChangeVendorRequest, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
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

function validateInsertVendorInquiryMessage(objVendorInquiry, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['VENDOR_INQUIRY_ID',
        'MESSAGE_CONTENT',
        'PREVIOUS_STATUS_ID'];

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

function validateInsertVendorRequestMessage(objVendorRequest, userId) {
    if (!userId){
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
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
            valid = value.length > 0;
            break;
    }
    return valid;
}