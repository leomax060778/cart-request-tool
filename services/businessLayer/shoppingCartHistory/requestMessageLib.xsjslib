$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var message = mapper.getDataRequestMessage();
var request = mapper.getDataRequest();
var status = mapper.getCartRequest();
var ErrorLib = mapper.getErrors();
var dbHelper = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

var statusMap = {'TO_BE_CHECKED': 1, 'CHECKED': 2, 'IN_PROCESS': 3, 'RETURN_TO_REQUESTER': 4, 'APPROVED': 5, 'CANCELLED': 6};

//Insert new request message
function insertRequestMessage(objRequest, userId) {
	if (validateInsertRequestMessage(objRequest, userId)) {
		if (!existRequest(objRequest.REQUEST_ID)) {
	        throw ErrorLib.getErrors().CustomError("", "requestMessageService/handlePost/insertRequestMessage", "The request with the id " + objRequest.REQUEST_ID + " does not exist");
	    }
		if(Number(objRequest.PREVIOUS_STATUS_ID) === statusMap.RETURN_TO_REQUESTER || Number(objRequest.PREVIOUS_STATUS_ID) === statusMap.CHECKED || Number(objRequest.PREVIOUS_STATUS_ID) === statusMap.IN_PROCESS || Number(objRequest.PREVIOUS_STATUS_ID) === statusMap.CANCELLED){
			objRequest.STATUS_ID = statusMap.TO_BE_CHECKED;
			status.updateRequestStatusManual(objRequest, userId);
		}
        return message.insertRequestMessage(objRequest, userId);
    }
}

//Get messages of request
function getRequestMessage(requestId, userId) {
    if (!requestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter requestId is not found", "requestMessageService/handleGet/getRequestMessage", requestId);
    }
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "requestService/handleGet/getRequestMessage", userId);
    }
    var result = [];
    var objRequest = {};
    try{
	    result = message.getRequestMessageManual(requestId);
	    result.forEach(function (elem) {
		    if(elem.MESSAGE_READ === 0) {
		    	objRequest.MESSAGE_READ = 1;
		    	message.updateRequestMessageReadManual(objRequest, userId);
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

//Check if the request exists
function existRequest(requestId) {
    return request.getRequestByIdManual(requestId).length > 0;
}

//Validate insert request message
function validateInsertRequestMessage(objRequest, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "requestService/handlePut/insertRequestMessage", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['REQUEST_ID',
        'MESSAGE_CONTENT',
        'PREVIOUS_STATUS_ID'
    ];
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

//Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'REQUEST_ID':
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