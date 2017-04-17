$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataMessageType = mapper.getDataMessageType();
var dataCrtMessageType = mapper.getDataCrtMessageType();
var dataCRTType = mapper.getDataCrtType();
var dataStatus = mapper.getDataStatus();

var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

var keyMapCRTType = {"CRT_INQUIRY": 1, "NEW_CART_REQUEST": 2, "VENDOR_INQUIRY": 3, "NEW_VENDOR_REQUEST": 4, "EXTEND_VENDOR_REQUEST": 5, "CHANGE_VENDOR_REQUEST": 6};
    
var statusMap = {'TO_BE_CHECKED': 1, 'CHECKED': 2, 'IN_PROCESS': 3, 'RETURN_TO_REQUESTER': 4, 'APPROVED': 5, 'CANCELLED': 6};

var statusInquiryMap = {'TO_BE_CHECKED': 1, 'RETURN_TO_REQUESTER': 2, 'COMPLETED': 3, 'CANCELLED': 4};

//Insert message type
function insertMessageType(objMessageType, userId) {
	var result = dataMessageType.insertMessageType(objMessageType, userId);
	var newCrtType = objMessageType.CRT_TYPE;
	var oMessage = {};
    if (validateInsertMessageType(objMessageType, userId)) {
    	if (newCrtType.length > 0) {
    		newCrtType.forEach(function (newElem) {
    			oMessage = {
        				"CRT_TYPE_ID": newElem.CRT_TYPE_ID,
        				"MESSAGE_TYPE_ID": result,
        				"STATUS_ID": newElem.STATUS_ID
        				};
				if (newElem.SELECTED) {
					dataCrtMessageType.insertCrtMessageType(oMessage, userId);
        		}
    		});
		}
    	return result;
    }
}

//Get message type by ID
function getMessageTypeById(messageTypeId) {
    if (!messageTypeId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter messageTypeId is not found", "messageTypeService/handleGet/getMessageTypeById", messageTypeId);
    }
    var message_type;
    var statusCollection = {};
    var crtTypeId;
    message_type = dataMessageType.getMessageTypeById(messageTypeId);
    if(message_type){
    	message_type = JSON.parse(JSON.stringify(message_type));
    	message_type.CRT_TYPE = dataCRTType.getCrtTypeByMessageType(message_type.MESSAGE_TYPE_ID);
    	message_type.CRT_TYPE.forEach(function (elem) {
    		crtTypeId = elem.CRT_TYPE_ID;
    		switch (Number(crtTypeId)) {
    			case keyMapCRTType.CRT_INQUIRY:
    				statusCollection.INQUIRY_STATUS = dataStatus.getAllInquiryStatus();
    				break;
    			case keyMapCRTType.NEW_CART_REQUEST:
    				statusCollection.REQUEST_STATUS = dataStatus.getAllRequestStatus();
    				break;
    			case keyMapCRTType.VENDOR_INQUIRY:
    				statusCollection.VENDOR_INQUIRY_STATUS = dataStatus.getAllVendorInquiryStatus();
    				break;
    			case keyMapCRTType.NEW_VENDOR_REQUEST:
    				statusCollection.VENDOR_REQUEST_STATUS = dataStatus.getAllVendorRequestStatus();
    				break;
    			case keyMapCRTType.EXTEND_VENDOR_REQUEST:
    				statusCollection.EXTEND_VENDOR_REQUEST_STATUS = dataStatus.getAllExtendVendorRequestStatus();
    				break;
    			case keyMapCRTType.CHANGE_VENDOR_REQUEST:
    				statusCollection.CHANGE_VENDOR_REQUEST_STATUS = dataStatus.getAllChangeVendorRequestStatus();
    				break;
    		}
    	});
    }
    message_type.STATUS_COLLECTION = statusCollection;
    return message_type;
}

//Get message type by ID manually
function getMessageTypeByIdManual(messageTypeId) {
    if (!messageTypeId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter messageTypeId is not found", "messageTypeService/handleGet/getMessageTypeById", messageTypeId);
    }
    var message_type;
    message_type = dataMessageType.getMessageTypeByIdManual(messageTypeId);
    if(message_type){
    	message_type = JSON.parse(JSON.stringify(message_type));
    	message_type.CRT_TYPE = dataCRTType.getCrtTypeByMessageType(message_type.MESSAGE_TYPE_ID);
    }
    return message_type;
}

//Get message type by crt id manually
function getMessageTypeByCrtIdManual(crtTypeId) {
    if (!crtTypeId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter crtTypeId is not found", "messageTypeService/handleGet/getMessageTypeByCrtId", crtTypeId);
    }
    return dataCrtMessageType.getMessageTypeByCrtIdManual(crtTypeId);
}

//Get all message type
function getAllMessageType() {
    return dataMessageType.getAllMessageType();
}

//Update message type
function updateMessageType(objMessageType, userId) {
	var oMessage;
	var newCrtType = objMessageType.CRT_TYPE;
	var dbCrtType = [];
	var updateCrtMessageType = [];
	var insertCrtMessageType = [];
	var deleteCrtMessageType = [];
	var comparisonResult;
	if (validateUpdateMessageType(objMessageType, userId)) {
        if (!existMessageType(objMessageType.MESSAGE_TYPE_ID)) {
            throw ErrorLib.getErrors().CustomError("", "messageTypeService/handlePut/updateMessageType", "The object MESSAGE_TYPE_ID " + objMessageType.MESSAGE_TYPE_ID + " does not exist");
        }
		if (newCrtType.length > 0) {
			dbCrtType = dataCRTType.getCrtTypeByMessageType(objMessageType.MESSAGE_TYPE_ID);
			
    		newCrtType.forEach(function (newElem) {
	    		comparisonResult = false;
	    		oMessage = {
        				"CRT_TYPE_ID": newElem.CRT_TYPE_ID,
        				"MESSAGE_TYPE_ID": objMessageType.MESSAGE_TYPE_ID,
        				"STATUS_ID": newElem.STATUS_ID
        				};
	    		dbCrtType.forEach(function (dbElem) {
	    			if (newElem.CRT_TYPE_ID === dbElem.CRT_TYPE_ID) {
	    				comparisonResult = true;
	    			}
	    		});
	    		if (comparisonResult) {
    				if (newElem.SELECTED) {
    					updateCrtMessageType.push(oMessage);
            		} else {
            			deleteCrtMessageType.push(oMessage);
            		}
    			} else {
    				if (newElem.SELECTED) {
    					insertCrtMessageType.push(oMessage);
            		}
    			}
	    	});
    		if (updateCrtMessageType.length > 0) {
    			updateCrtMessageType.forEach(function (updateElem) {
    				dataCrtMessageType.updateCrtMessageType(updateElem, userId);
    			}); 			
    		}
    		if (deleteCrtMessageType.length > 0) {
    			deleteCrtMessageType.forEach(function (deleteElem) {
    				dataCrtMessageType.deleteCrtMessageType(deleteElem, userId);
    			});
    		}
    		if (insertCrtMessageType.length > 0) {
    			insertCrtMessageType.forEach(function (insertElem) {
    			dataCrtMessageType.insertCrtMessageType(insertElem, userId);
    			});
    		}
	    }
    return dataMessageType.updateMessageType(objMessageType, userId);
    }
}

//Delete message type
function deleteMessageType(objMessageType, userId) {
    if (!objMessageType.MESSAGE_TYPE_ID) {
        throw ErrorLib.getErrors().CustomError("", "messageTypeService/handlePost/deleteMessageType", "The MESSAGE_TYPE_ID is not found");
    }
    if (!existMessageType(objMessageType.MESSAGE_TYPE_ID)) {
        throw ErrorLib.getErrors().CustomError("", "messageTypeService/handleDelete/updateMessageType", "The object MESSAGE_TYPE_ID " + objMessageType.MESSAGE_TYPE_ID + " does not exist");
    }
    return dataMessageType.deleteMessageType(objMessageType, userId);
}

//Check if the message type exists
function existMessageType(messageTypeId) {
	 return Object.keys(getMessageTypeByIdManual(messageTypeId)).length > 0;
}

function validateInsertMessageType(objMessageType, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "messageTypeService/handlePut/insertMessageType", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'NAME',
        'POSITION'
    ];
    
    var optionalKeys = ['ADDITIONAL_MESSAGE_TYPE_INFORMATION'];

    if (!objMessageType) {
        throw ErrorLib.getErrors().CustomError("", "messageTypeService/handlePost/insertMessageType", "The object messageType is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objMessageType[key] === null || objMessageType[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objMessageType[key]);
                if (!isValid) {
                    errors[key] = objMessageType[key];
                    throw BreakException;
                }
            }
        });
        optionalKeys.forEach(function (key) {
            // validate attribute type
	    	isValid = validateType(key, objMessageType[key]);
		        if (!isValid) {
		        	errors[key] = objMessageType[key];
		            throw BreakException;
		            
		        }
	        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "messageTypeService/handlePost/insertMessageType", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "messageTypeService/handlePost/insertMessageType", JSON.stringify(errors));
        }
    }
    return isValid;
}

function validateUpdateMessageType(objMessageType, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "messageTypeService/handlePut/updateMessageType", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'MESSAGE_TYPE_ID',
        'POSITION',
        'NAME'
    ];
    
    var optionalKeys = ['ADDITIONAL_MESSAGE_TYPE_INFORMATION'];

    if (!objMessageType) {
        throw ErrorLib.getErrors().CustomError("", "messageTypeService/handlePut/updateMessageType", "The object messageType is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objMessageType[key] === null || objMessageType[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objMessageType[key]);
                if (!isValid) {
                    errors[key] = objMessageType[key];
                    throw BreakException;
                }
            }
        });
        optionalKeys.forEach(function (key) {
                // validate attribute type
        	isValid = validateType(key, objMessageType[key]);
            if (!isValid) {
            	errors[key] = objMessageType[key];
                throw BreakException;
                
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "messageTypeService/handlePut/updateMessageType", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "messageTypeService/handlePut/updateMessageType", JSON.stringify(errors));
        }
    }
    return isValid;
}

//Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'NAME':
            valid = value.length > 0 && value.length <= 2048;
            break;
        case 'POSITION':
            valid = !isNaN(value) && value > 0;
            break;    
        case 'MESSAGE_TYPE_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'ADDITIONAL_MESSAGE_TYPE_INFORMATION':
            valid = (!value) || (!isNaN(value) && value >= 0 && value < 2);
            break;
    }
    return valid;
}