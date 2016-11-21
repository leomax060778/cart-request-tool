$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var message = mapper.getDataRequestMessage();
var request = mapper.getDataRequest();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//Insert new request message
function insertRequestMessage(objRequest, userId) {
    if (!existRequest(objRequest.REQUEST_ID)) {
        throw ErrorLib.getErrors().CustomError("", "requestMessageService/handlePost/insertRequestMessage", "The request with the id " + objRequest.REQUEST_ID + " does not exist");
    }
    if (validateInsertRequestMessage(objRequest, userId)) {
        return message.insertRequestMessage(objRequest, userId);
    }
}

//Get messages of request
function getRequestMessage(requestId) {
    if (!requestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter requestId is not found", "requestMessageService/handleGet/getRequestMessage", requestId);
    }
    return message.getRequestMessage(requestId);
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
        'MESSAGE_CONTENT'
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
        case 'MESSAGE_CONTENT':
            valid = value.length > 0 && value.length <= 1000;
            break;
    }
    return valid;
}