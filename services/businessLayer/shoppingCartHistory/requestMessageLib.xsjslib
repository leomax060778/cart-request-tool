$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var message = mapper.getDataRequestMessage();
var request = mapper.getDataRequest();
var user = mapper.getUser();

var status = mapper.getCartRequest();
var ErrorLib = mapper.getErrors();
var dbHelper = mapper.getdbHelper();
var mail = mapper.getMail();
var mailSend = mapper.getCartRequestMailSend();

var config = mapper.getDataConfig();

/** ***********END INCLUDE LIBRARIES*************** */

var statusMap = {
    'TO_BE_CHECKED': 1,
    'CHECKED': 2,
    'IN_PROCESS': 3,
    'RETURN_TO_REQUESTER': 4,
    'APPROVED': 5,
    'CANCELLED': 6
};
var messageTypeMap = {'FYI_ONLY': 1, 'BM_EYES_ONLY': 2, 'REQUEST_RESPONSE': 3};

var pathName = "CART_REQUEST";

//Insert new request message
function insertRequestMessage(objRequest, userId, alreadyNotified) {
    if (validateInsertRequestMessage(objRequest, userId)) {
        if (!existRequest(objRequest.REQUEST_ID, userId)) {
            throw ErrorLib.getErrors().CustomError("", "", "The request with the id " + objRequest.REQUEST_ID + " does not exist");
        }
        if (Number(objRequest.PREVIOUS_STATUS_ID) === statusMap.APPROVED || Number(objRequest.PREVIOUS_STATUS_ID) === statusMap.CANCELLED) {
            objRequest.STATUS_ID = statusMap.TO_BE_CHECKED;
            status.updateRequestStatusManual(objRequest, userId, true);
        }
        var result = message.insertRequestMessage(objRequest, userId);

        //Only send an email if the user was not notified by another previous action
        if (!alreadyNotified) {
            var messageType = Number(objRequest.MESSAGE_TYPE_ID);
            switch (messageType) {
                case messageTypeMap.FYI_ONLY:
                    mailSend.sendFYIMail(objRequest.REQUEST_ID, userId);
                    break;
                case messageTypeMap.BM_EYES_ONLY:
                    break;
                default:
                    mailSend.sendNewMessageMail(objRequest.REQUEST_ID, userId);
                    break;
            }
        }
        return result;
    }
}

//Get messages of request
function getRequestMessage(requestId, userId) {
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
    try {
        result = message.getRequestMessageManual(requestId);
        result = JSON.parse(JSON.stringify(result));
        result.forEach(function (elem) {
            messageContent = "";
            startPosition = 1;
            requestMessageLength = 5000;
            i = 0;
            splitNumber = 0;

            //Join message content
            splitNumber = elem.CONTENT_LENGTH / requestMessageLength;
            for (i = 0; i < splitNumber; i++) {
                messageContent = messageContent.concat(message.getRequestMessageContentManual(elem.REQUEST_ID, elem.MESSAGE_ID, startPosition, requestMessageLength).MESSAGE_CONTENT);
                startPosition = startPosition + requestMessageLength;
            }
            elem.MESSAGE_CONTENT = messageContent;
        });
    } catch (e) {
        dbHelper.rollback();
        throw ErrorLib.getErrors().CustomError("", "", e.toString());
    }
    finally {
        dbHelper.commit();
        dbHelper.closeConnection();
    }
    return result;
}

//Update message read
function updateRequestMessage(objRequestMessage, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var result = [];

    try {
        if (objRequestMessage.METHOD && objRequestMessage.METHOD === 'AllRead') {
            if (objRequestMessage.MESSAGES && objRequestMessage.MESSAGES.length > 0) {
                objRequestMessage.MESSAGES.forEach(function (elem) {
                    if (Number(elem.CREATED_USER_ID) !== Number(userId)) {
                        elem.MESSAGE_READ = 1;
                        result.push(message.updateRequestMessageReadByMessageIdManual(elem, userId));
                    }
                });
            }

        } else {
            //Mark message as read
            if (objRequestMessage.length > 0) {
                objRequestMessage.forEach(function (elem) {
                    result.push(message.updateRequestMessageReadByMessageIdManual(elem, userId));
                });
            }
        }

    } catch (e) {
        dbHelper.rollback();
        throw ErrorLib.getErrors().CustomError("", "", e.toString());
    }
    finally {
        if (result.length > 0) {
            dbHelper.commit();
            dbHelper.closeConnection();
        }
    }
    return result;

}

//Check if the request exists
function existRequest(requestId, userId) {
    return request.getRequestByIdManual(requestId, userId).length > 0;
}

//Validate insert request message
function validateInsertRequestMessage(objRequest, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['REQUEST_ID',
        'MESSAGE_CONTENT',
        'PREVIOUS_STATUS_ID'
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
            valid = value.length > 0;
            break;
    }
    return valid;
}

function getUrlBase() {
    return config.getUrlBase();
}

function getEmailList() {
    return config.getEmailList();
}

function getPath(stringName) {
    return config.getPath(stringName);
}

function getBasicData(stringPathName, additionalParam) {
    return config.getBasicData(stringPathName, additionalParam);
}