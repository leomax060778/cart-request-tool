$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var data = mapper.getDataNewCartRequest();
var dataRService = mapper.getDataNewCartRequestService();
var dataService = mapper.getDataService();
var dataSpecialRequest = mapper.getDataSpecialRequest();
var dataCurrency = mapper.getDataCurrency();
var requestMessage = mapper.getRequestMessage();

var businessSpecialRequest = mapper.getSpecialRequest();
var businessNonSap = mapper.getNonSapVendor();
var mailSend = mapper.getCartRequestMailSend();

var dataRCostObject = mapper.getDataRequestCostObject();
var dataRRiskFunded = mapper.getDataNewCartRequestRiskFunded();
var dataRDataProtection = mapper.getDataRequestDataProtection();
var dataMaterial = mapper.getDataMaterial();
var dataAttachmentR = mapper.getDataAttachmentRequest();
var dataAttachment = mapper.getDataAttachment();
var businessAttachment = mapper.getAttachment();
var dataNoteReq = mapper.getDataNoteRequest();
var mail = mapper.getMail();
var businessUser = mapper.getUser();
var config = mapper.getDataConfig();
var dbHelper = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();

var pathName = "CART_REQUEST";
var noteTypeMap = {
    "VENDOR_TEXT": 1,
    "INTERNAL_NOTE": 2,
    "APPROVER_NOTE": 3,
    "MESSAGE_TO_BUSINESS": 5
};

//Delete Attachment from New Cart Request section
function deleteAttachment(reqBody, userId) {
    return businessAttachment.deleteAttachment(reqBody, userId);
}

function insertRequestService(reqBody, requestId, userId) {
    reqBody.REQUEST_ID = requestId;
    if (validateInsertRequestService(reqBody, userId)) {
        return dataRService.insertRequestService(reqBody, userId);
    }
}

function insertSpecialRequest(reqBody, requestId, userId) {
    reqBody.REQUEST_ID = requestId;

    if (businessSpecialRequest.validateInsertSpecialRequest(reqBody, userId)) {
        return dataSpecialRequest.insertSpecialRequest(reqBody, userId);
    }
}

function insertService(reqBody, user_id) {
    if (validateInsertService(reqBody, user_id)) {
        return dataService.insertService(reqBody, user_id);
    }
}

//Return the total amount of Services to be used in Request Service
function insertServices(services, requestId, conversionRate, userId) {
    var amount = 0;
    services.forEach(function (itemService) {
        itemService.REQUEST_ID = requestId;
        amount += Number(itemService.AMOUNT);
        itemService.BUDGET = (itemService.AMOUNT / conversionRate) / 1000;
        itemService.BUDGET = (itemService.BUDGET).toFixed(2);
        insertService(itemService, userId);
    });

    return amount;
}

//Return the total amount of Special Requests to be used in Request Service
function insertSpecialRequests(specialRequests, requestId, conversionRate, userId) {
    var amount = 0;
    specialRequests.forEach(function (elem) {
        amount += (Number(elem.UNIT_PRICE) * elem.QUANTITY);
        elem.BUDGET = (elem.AMOUNT / conversionRate) / 1000;
        elem.BUDGET = (elem.BUDGET).toFixed(2);
        insertSpecialRequest(elem, requestId, userId);
    });

    return amount;
}

function insertCostObject(reqBody, userId) {
    if (validateInsertCostObject(reqBody, userId)) {
        return dataRCostObject.insertCostObject(reqBody, userId);
    }
}

function insertRiskFunded(reqBody, userId) {
    if (validateInsertRiskFunded(reqBody, userId)) {
        return dataRRiskFunded.insertRiskFunded(reqBody, userId);
    }
}

function insertDataProtectionAnswer(reqBody, in_request_id, userId) {
    reqBody.REQUEST_ID = in_request_id;
    if (validateInsertDataProtectionAnswer(reqBody, userId)) {
        return dataRDataProtection.insertDataProtectionAnswer(reqBody, userId);
    }
}


function insertMaterial(reqBody, userId) {
    if (validateInsertMaterial(reqBody, userId)) {
        return dataMaterial.insertMaterial(reqBody, userId);
    }
}

function insertAttachmentRequest(objAttachment, in_request_id, userId) {
    objAttachment.REQUEST_ID = in_request_id;
    if (validateInsertAttachmentRequest) {
        return dataAttachmentR.insertAttachmentRequest(objAttachment, userId);
    }
}

function insertAttachmentRequestAuto(objAttachment, in_request_id, userId) {
    objAttachment.REQUEST_ID = in_request_id;
    if (validateInsertAttachmentRequest) {
        return dataAttachmentR.insertAttachmentRequestAuto(objAttachment, userId);
    }
}

function insertNoteRequest(objNoteReq, in_request_id, userId) {
    objNoteReq.REQUEST_ID = in_request_id;
    if (validateInsertNoteRequest(objNoteReq, userId)) {
        dataNoteReq.insertNoteRequest(objNoteReq, userId);
    }
}

function insertNoteType(ObjNoteType, userId) {
    if (validateInsertNoteType(ObjNoteType, userId)) {
        dataNoteReq.insertNoteType(ObjNoteType, userId);
    }
}

function insertManualNonSapVendor(objVendor, userId) {
    return businessNonSap.insertManualNonSapVendor(objVendor, userId);
}

function insertRequest(reqBody, userId) {
    var requestMessageObj = {};
    var request = 0;
    try {
        //Infrastructure & Location logic
        if (!reqBody.INFRASTRUCTURE_OF_WORK_ID || !reqBody.LOCATION_OF_WORK_ID) {
            reqBody.INFRASTRUCTURE_OF_WORK_ID = null;
            reqBody.LOCATION_OF_WORK_ID = null;
        }
        //NON-SAP Vendor logic
        if (reqBody.NON_SAP_VENDOR !== null) {
            reqBody.NON_SAP_VENDOR_ID = insertManualNonSapVendor(reqBody.NON_SAP_VENDOR, userId);
        } else {
            reqBody.NON_SAP_VENDOR_ID = null;
        }
        if (validateInsertRequest(reqBody, userId)) {
            request = data.insertRequest(reqBody, userId);
        }

        if (request) {
            reqBody.COST_OBJECT.REQUEST_ID = request;
            if (reqBody.REQUEST_SERVICE !== undefined) {
                var conversionRateTable = dataCurrency.getManualCurrencyConversionRate(reqBody.REQUEST_SERVICE.CURRENCY_ID);
                var conversionRate = parseFloat(conversionRateTable[0].CONVERSION_RATE);
                var cartAmount;
                if (reqBody.SERVICES && reqBody.SERVICES.length > 0) {
                    cartAmount = insertServices(reqBody.SERVICES, request, conversionRate, userId);
                } else if (reqBody.SPECIAL_REQUEST && reqBody.SPECIAL_REQUEST.length > 0) {
                    cartAmount = insertSpecialRequests(reqBody.SPECIAL_REQUEST, request, conversionRate, userId);
                    reqBody.MATERIAL_ID = 0;
                }
                reqBody.CART_AMOUNT = cartAmount;
                reqBody.TOTAL_BUDGET = (cartAmount / conversionRate) / 1000;
                insertRequestService(reqBody.REQUEST_SERVICE, request, userId);
            }

            insertCostObject(reqBody.COST_OBJECT, userId);
            if (Object.keys(reqBody.RISK_FUNDED).length > 0) {
                var riskConversionRateTable = dataCurrency.getManualCurrencyConversionRate(reqBody.RISK_FUNDED.CURRENCY_ID);
                var riskConversionRate = parseFloat(riskConversionRateTable[0].CONVERSION_RATE);
                reqBody.RISK_FUNDED.REQUEST_ID = request;
                reqBody.RISK_FUNDED.AMOUNT = Number(reqBody.RISK_FUNDED.AMOUNT);
                reqBody.RISK_FUNDED.AMOUNT_KEUR = (Number(reqBody.RISK_FUNDED.AMOUNT) / riskConversionRate) / 1000;
                insertRiskFunded(reqBody.RISK_FUNDED, userId);
            }
            (reqBody.DATA_PROTECTION_ANSWERS).forEach(function (item) {
                insertDataProtectionAnswer(item, request, userId);
            });
            (reqBody.ATTACHMENTS).forEach(function (attachment) {
                insertAttachmentRequest(attachment, request, userId);
            });

            if (reqBody.NOTES !== null && reqBody.NOTES !== undefined && Object.keys(reqBody.NOTES).length > 0) {
                reqBody.NOTES.forEach(function (noteRequest) {
                    //TODO: review this, note types are dynamics and the note type with id 4 is deleted
                    if (Number(noteRequest.NOTE_TYPE_ID) === noteTypeMap.MESSAGE_TO_BUSINESS) {
                        requestMessageObj.REQUEST_ID = request;
                        requestMessageObj.PREVIOUS_STATUS_ID = 1;
                        requestMessageObj.MESSAGE_CONTENT = "<p>" + noteRequest.NOTE_TEXT + "</p>";
                        requestMessage.insertRequestMessage(requestMessageObj, userId, true);
                    }

                    insertNoteRequest(noteRequest, request, userId);
                });
            }
        }
        dbHelper.commit();
    }
    catch (e) {
        dbHelper.rollback();
        throw ErrorLib.getErrors().CustomError("", "", e.toString());
    }
    finally {
        dbHelper.closeConnection();
    }
    return request;
}

function validateInsertAttachmentRequest(objReq, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'REQUEST_ID',
        'ATTACHMENT_ID'];

    if (!objReq) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Request is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objReq[key] === null || objReq[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objReq[key]);
                if (!isValid) {
                    errors[key] = objReq[key];
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

function validateInsertRequest(objRequest, userId) {

    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }

    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['TEAM_ID',
        'ENTITY_ID',
        'STAGE_ID',
        'GOODS_RECIPIENT_USERNAME',
        'BUDGET_YEAR_ID',
        'DATA_PROTECTION_ANSWERS'
    ];
    var optionalKeys = ['ALTERNATIVE_VENDOR_NAME',
        'ALTERNATIVE_VENDOR_PHONE',
        'ALTERNATIVE_VENDOR_EMAIL'
    ];

    if (objRequest.DATA_PROTECTION_ENABLED) {
        keys.push('DATA_PROTECTION_ENABLED');
    }

    if (objRequest.INFRASTRUCTURE_OF_WORK_ID) {
        keys.push('INFRASTRUCTURE_OF_WORK_ID');
    }
    if (objRequest.LOCATION_OF_WORK_ID) {
        keys.push('LOCATION_OF_WORK_ID');
    }

    if (!objRequest) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Request is not found");
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

function validateInsertRequestService(reqBody, userId) {

    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }

    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['REQUEST_ID',
        'CURRENCY_ID',
        'CART_AMOUNT',
        'TOTAL_BUDGET'];
    var optionalKeys = ['PURCHASE_ORDER_TO_UPLIFT',
        'LINE_TO_UPLIFT',
        'PURCHASE_ORDER_AMOUNT',
        'SAP_BUYER_NAME'];

    if (!reqBody) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Request Service is not found");
    }

    try {
        keys.forEach(function (key) {
            if (reqBody[key] === null || reqBody[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, reqBody[key]);
                if (!isValid) {
                    errors[key] = reqBody[key];
                    throw BreakException;
                }
            }
        });
        optionalKeys.forEach(function (key) {
            // validate attribute type
            isValid = validateType(key, reqBody[key]);
            if (!isValid) {
                errors[key] = reqBody[key];
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

function validateInsertService(reqBody, userId) {

    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }

    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['REQUEST_ID',
        'START_DATE',
        'END_DATE',
        'DESCRIPTION',
        'BUDGET',
        'ITEM'];
    var specialKeys = ['AMOUNT',
        'CURRENCY_ID'];

    try {
        keys.forEach(function (key) {
            if (reqBody[key] === null || reqBody[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, reqBody[key]);
                if (!isValid) {
                    errors[key] = reqBody[key];
                    throw BreakException;
                }
            }
        });
        specialKeys.forEach(function (key) {
            if (reqBody[key] === null || reqBody[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateServiceType(key, reqBody[key]);
                if (!isValid) {
                    errors[key] = reqBody[key];
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


function validateInsertCostObject(reqBody, userId) {

    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }

    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['REQUEST_ID',
        'ENTITY_ID',
        'COST_OBJECT_TYPE_ID',
        'COST_VALUE'];

    if (!reqBody) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Cost Object is not found");
    }

    try {
        keys.forEach(function (key) {
            if (reqBody[key] === null || reqBody[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, reqBody[key]);
                if (!isValid) {
                    errors[key] = reqBody[key];
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


function validateInsertDataProtectionAnswer(reqBody, userId) {

    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }

    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['REQUEST_ID',
        'QUESTION_ID',
        'OPTION_ID'];

    if (!reqBody) {
        throw ErrorLib.getErrors().CustomError("", "", "The object DataProtection is not found");
    }

    try {
        keys.forEach(function (key) {
            if (reqBody[key] === null || reqBody[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, reqBody[key]);
                if (!isValid) {
                    errors[key] = reqBody[key];
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

function validateInsertNoteRequest(objReq, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'REQUEST_ID',
        'NOTE_TYPE_ID'];

    if (!objReq) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Note Request is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objReq[key] === null || objReq[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objReq[key]);
                if (!isValid) {
                    errors[key] = objReq[key];
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

function validateInsertRiskFunded(reqBody, userId) {

    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }

    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['REQUEST_ID',
        'AMOUNT',
        'CURRENCY_ID',
        'AMOUNT_KEUR'];

    if (!reqBody) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Risk Funded is not found");
    }

    try {
        keys.forEach(function (key) {
            if (reqBody[key] === null || reqBody[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, reqBody[key]);
                if (!isValid) {
                    errors[key] = reqBody[key];
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

function validateInsertMaterial(reqBody, userId) {

    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }

    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['PARENT_MATERIAL_ID',
        'MATERIAL_DESCRIPTION',
        'POPUP',
        'CODE'];

    if (!reqBody) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Material is not found");
    }

    try {
        keys.forEach(function (key) {
            if (reqBody[key] === null || reqBody[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, reqBody[key]);
                if (!isValid) {
                    errors[key] = reqBody[key];
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
        case 'REQUEST_SERVICE_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'REQUEST_RISK_FUNDED_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'REQUEST_COST_OBJECT_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'REQUEST_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'ENTITY_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'VENDOR_ID':
            valid = (!value) || (!isNaN(value) && value > 0);
            break;
        case 'NON_SAP_VENDOR_ID':
            valid = (!value) || (!isNaN(value) && value > 0);
            break;
        case 'STAGE_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'TEAM_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'STATUS_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'GOODS_RECIPIENT_USERNAME':
            valid = value.length > 0 && value.length <= 127;
            break;
        case 'INFRASTRUCTURE_OF_WORK_ID':
            valid = (!value) || (!isNaN(value) && value > 0);
            break;
        case 'LOCATION_OF_WORK_ID':
            valid = (!value) || (!isNaN(value) && value > 0);
            break;
        case 'DATA_PROTECTION_ENABLED':
            valid = (!value) || (!isNaN(value));
            break;
        case 'CREATED_USER_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'ATTACHMENT_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'COST_OBJECT_TYPE_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'COST_VALUE':
            valid = value.length > 0 && value.length <= 255;
            break;
        case 'PURCHASE_ORDER_TO_UPLIFT':
            valid = (!value) || (value.length > 0 && value.length <= 255);
            break;
        case 'LINE_TO_UPLIFT':
            valid = (!value) || (value.length > 0 && value.length <= 255);
            break;
        case 'PURCHASE_ORDER_AMOUNT':
            valid = (!value) || (!isNaN(value));
            break;
        case 'SAP_BUYER_NAME':
            valid = (!value) || (value.length > 0 && value.length <= 511);
            break;
        case 'CART_AMOUNT':
            valid = !isNaN(value) || !value;
            break;
        case 'TOTAL_BUDGET':
            valid = !isNaN(value);
            break;
        case 'QUESTION_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'OPTION_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'AMOUNT':
            valid = !isNaN(value) || (!value);
            break;
        case 'CURRENCY_ID':
            valid = (!isNaN(value) && value > 0) || (!value);
            break;
        case 'AMOUNT_KEUR':
            valid = !isNaN(value) || (!value);
            break;
        case 'USER_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'MATERIAL_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'PARENT_MATERIAL_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'MATERIAL_DESCRIPTION':
            valid = value.length > 0 && value.length <= 255;
            break;
        case 'POPUP':
            valid = value.length > 0 && value.length <= 255;
            break;
        case 'POP_UP':
            valid = value.length > 0 && value.length <= 255;
            break;
        case 'CODE':
            valid = value.length > 0 && value.length <= 255;
            break;
        case 'MATERIAL_CODE':
            valid = value.length > 0 && value.length <= 255;
            break;
        case 'NOTE_TYPE_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'DATA_PROTECTION_ANSWERS':
            valid = Array.isArray(value) && value.length > 0;
            break;
        case 'ATTACHMENTS':
            valid = Array.isArray(value) && value.length > 0;
            break;
        case 'START_DATE':
            valid = value.length > 0;
            break;
        case 'END_DATE':
            valid = value.length > 0;
            break;
        case 'DESCRIPTION':
            valid = value.length > 0 && value.length <= 255;
            break;
        case 'BUDGET':
            valid = !isNaN(value);
            break;
        case 'ITEM':
            valid = !isNaN(value);
            break;
        case 'BUDGET_YEAR_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'ALTERNATIVE_VENDOR_NAME':
            valid = (!value) || (value.length > 0 && value.length <= 255);
            break;
        case 'ALTERNATIVE_VENDOR_PHONE':
            valid = (!value) || (value.length > 0 && value.length <= 255);
            break;
        case 'ALTERNATIVE_VENDOR_EMAIL':
            valid = (!value) || (value.length > 0 && value.length <= 255);
            break;
    }

    return valid;
}

//Check data types
function validateServiceType(key, value) {
    var valid = true;
    switch (key) {
        case 'AMOUNT':
            valid = !isNaN(value) && value >= 0;
            break;
        case 'CURRENCY_ID':
            valid = (!isNaN(value) && value > 0);
            break;
    }

    return valid;
}

function sendSubmitMail(newCartRequestId, userId) {
    mailSend.sendSubmitMail(newCartRequestId, userId);
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

function getBasicData(stringPathName) {
    return config.getBasicData(stringPathName);
}