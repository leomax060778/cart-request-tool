$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var message = mapper.getDataInquiryMessage();
var inquiry = mapper.getInquiry();
var inquiryStatus = mapper.getInquiryStatus();
var mail = mapper.getMail();
var businessUser = mapper.getUser();
var ErrorLib = mapper.getErrors();
var dbHelper = mapper.getdbHelper();
var config = mapper.getDataConfig();

//CRT Inquiry email sending
var inquiryMailSend = mapper.getCrtInquiryMailSend();

/** ***********END INCLUDE LIBRARIES*************** */

var statusMap = {'TO_BE_CHECKED': 1, 'RETURN_TO_REQUESTER': 2, 'COMPLETED': 3, 'CANCELLED': 4};
var messageTypeMap = {'FYI_ONLY': 1, 'BM_EYES_ONLY': 2, 'REQUEST_RESPONSE': 3};

var pathName = "CRT_INQUIRY";

//Insert message
function insertInquiryMessage(objInquiry, userId) {
    if (validateInsertInquiryMessage(objInquiry, userId)) {
        if (!existInquiry(objInquiry.INQUIRY_ID, userId)) {
            throw ErrorLib.getErrors().CustomError("", "", "The inquiry with the id " + objInquiry.INQUIRY_ID + " does not exist");
        }
        if (objInquiry.PREVIOUS_STATUS_ID && (Number(objInquiry.PREVIOUS_STATUS_ID) !== statusMap.TO_BE_CHECKED)) {
            objInquiry.STATUS_ID = statusMap.TO_BE_CHECKED;
	        inquiryStatus.updateInquiryStatus(objInquiry, userId);
            inquiry.sendResubmitMail(objInquiry.INQUIRY_ID, userId);
        }
        return message.insertInquiryMessage(objInquiry, userId);
    }
}

//Get message
function getInquiryMessage(inquiryId, userId) {
    if (!inquiryId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter inquiryId is not found", "", inquiryId);
    }
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var result = {};
    var inquiryText;
    var inquiryMessage;
    var messageContent;
    var startPosition;
    var inquiryMessageLength;
    var i;
    var splitNumber;
    try {
        inquiryText = inquiry.getInquiryByIdManual(inquiryId, userId).INQUIRY_TEXT;
        inquiryMessage = message.getInquiryMessageManual(inquiryId);
        inquiryMessage = JSON.parse(JSON.stringify(inquiryMessage));
        inquiryMessage.forEach(function (elem) {
            messageContent = "";
            startPosition = 1;
            inquiryMessageLength = 5000;
            i = 0;
            splitNumber = 0;
            //Join message content
            splitNumber = elem.CONTENT_LENGTH / inquiryMessageLength;
            for (i = 0; i < splitNumber; i++) {
                messageContent = messageContent.concat(message.getInquiryMessageContentManual(elem.INQUIRY_ID, elem.MESSAGE_ID, startPosition, inquiryMessageLength).MESSAGE_CONTENT);
                startPosition = startPosition + inquiryMessageLength;
            }
            elem.MESSAGE_CONTENT = messageContent;
        });
        result.INQUIRY_TEXT = inquiryText;
        result.INQUIRY_MESSAGES = inquiryMessage;
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

//Message read
function updateMessageRead(objInquiryMessage, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var result = [];

    try {
        if (objInquiryMessage.METHOD && objInquiryMessage.METHOD === 'AllRead') {
            if (objInquiryMessage.MESSAGES && objInquiryMessage.MESSAGES.length > 0) {
                objInquiryMessage.MESSAGES.forEach(function (elem) {
                    if (Number(elem.CREATED_USER_ID) !== Number(userId)) {
                        elem.MESSAGE_READ = 1;
                        result.push(message.updateInquiryMessageReadByMessageIdManual(elem, userId));
                    }
                });
            }

        } else {
            if (objInquiryMessage.MESSAGES.length > 0) {
                objInquiryMessage.MESSAGES.forEach(function (elem) {
                    result.push(message.updateInquiryMessageReadByMessageIdManual(elem, userId));
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

//Check if the inquiry exists
function existInquiry(inquiryId, userId) {
    return Object.keys(inquiry.getInquiryByIdManual(inquiryId, userId)).length > 0;
}

//Validate insert inquiry message
function validateInsertInquiryMessage(objInquiry, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['INQUIRY_ID',
        'MESSAGE_CONTENT'];

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
        case 'INQUIRY_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'MESSAGE_CONTENT':
            valid = value.length > 0;
            break;
    }
    return valid;
}

function sendMessageMail(objInquiry, userId) {
    var messageType = Number(objInquiry.MESSAGE_TYPE_ID);

    switch (messageType) {
        case messageTypeMap.FYI_ONLY:
            inquiryMailSend.sendFYIMail(objInquiry, userId);
            break;
        case messageTypeMap.BM_EYES_ONLY:
            break;
        default:
            inquiryMailSend.sendNewMessageMail(objInquiry, userId);
            break;
    }
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

function getBasicData(stringPathName, aditionalParam) {
    return config.getBasicData(stringPathName, aditionalParam);
}