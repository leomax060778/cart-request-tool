$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataChangedColumn = mapper.getDataRequestChangedColumn();

var ErrorLib = mapper.getErrors();

/** ***********END INCLUDE LIBRARIES*************** */

/** ***********REQUEST CHANGED COLUMN*************** */
//Get request changed column
function getRequestChangedColumn(requestId) {
    if (!requestId) {
        throw ErrorLib.getErrors().BadRequest(
            "The Parameter requestId is not found",
            "requestChangedColumnLib/getRequestChangedColumn", requestId);
    }
    var changedColumns = dataChangedColumn.getRequestChangedColumn(requestId);
    var result = {};
    var dataProtection = [];
    var objKey = "";
    var dataProtectionId = [];
    var noteId = [];
    var arrNote = [];
    var attachmentId = [];
    var arrAttachment = [];
    changedColumns.forEach(function (elem) {
        objKey = elem.COLUMN_NAME;
        //Check if the column name is an object
        if (objKey[0] === "{") {
            objKey = JSON.parse(objKey);
            if (objKey.QUESTION_ID) {
                if (dataProtectionId.indexOf(objKey.QUESTION_ID) === -1) {
                    dataProtectionId.push(objKey.QUESTION_ID);
                    dataProtection.push(objKey);
                }
                result.DATA_PROTECTION = dataProtection;
            } else if (objKey.NOTE_REQUEST_ID) {
                if (noteId.indexOf(objKey.NOTE_REQUEST_ID) === -1) {
                    noteId.push(objKey.NOTE_REQUEST_ID);
                    arrNote.push(objKey);
                }
                result.NOTES = arrNote;
            } else if (objKey.ATTACHMENT_ID) {
                if (attachmentId.indexOf(objKey.ATTACHMENT_ID) === -1) {
                    attachmentId.push(objKey.ATTACHMENT_ID);
                    arrAttachment.push(objKey);
                }
                result.ATTACHMENT = arrAttachment;
            }
        } else {
            result[objKey] = elem.COLUMN_CHANGED;
        }
    });
    return result;
}

//Insert request changed column
function insertRequestChangedColumn(objRequestChangedColumn, userId) {
    var result = 0;
    if (validateRequestChangedColumn(objRequestChangedColumn, userId)) {
        result = dataChangedColumn.insertRequestChangedColumn(objRequestChangedColumn, userId);
    }
    return result;
}

//Delete request changed column
function deleteRequestChangedColumn(requestId, userId) {
    if (!requestId) {
        throw ErrorLib.getErrors().BadRequest(
            "The Parameter requestId is not found",
            "requestChangedColumnLib/deleteRequestChangedColumn", requestId);
    }
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest(
            "The Parameter userId is not found",
            "requestChangedColumnLib/deleteRequestChangedColumn", userId);
    }
    return dataChangedColumn.deleteRequestChangedColumn(requestId, userId);
}

/** ***********END REQUEST CHANGED COLUMN*************** */

/** ***********SERVICE CHANGED COLUMN*************** */
//Get request changed column
function getServiceChangedColumn(requestId) {
    if (!requestId) {
        throw ErrorLib.getErrors().BadRequest(
            "The Parameter requestId is not found",
            "requestChangedColumnLib/getServiceChangedColumn", requestId);
    }
    var changedColumns = dataChangedColumn.getServiceChangedColumn(requestId);
    var result = [];
    var objServiceModified = {};
    var arrServiceId = [];
    changedColumns.forEach(function (elem) {
        if (arrServiceId.indexOf(elem.SERVICE_ID) === -1) {
            arrServiceId.push(elem.SERVICE_ID);
        }
    });
    arrServiceId.forEach(function (serviceElem) {
        objServiceModified = {};
        objServiceModified.SERVICE_ID = serviceElem;
        changedColumns.forEach(function (elem) {
            if (elem.SERVICE_ID === serviceElem) {
                objServiceModified[elem.COLUMN_NAME] = elem.COLUMN_CHANGED;
            }
        });
        result.push(objServiceModified);
    });
    return result;
}

//Insert request changed column
function insertServiceChangedColumn(objServiceChangedColumn, userId) {
    var result = 0;
    if (validateServiceChangedColumn(objServiceChangedColumn, userId)) {
        result = dataChangedColumn.insertServiceChangedColumn(objServiceChangedColumn, userId);
    }
    return result;
}

//Delete request changed column
function deleteServiceChangedColumn(requestId, userId) {
    if (!requestId) {
        throw ErrorLib.getErrors().BadRequest(
            "The Parameter requestId is not found",
            "requestChangedColumnLib/deleteServiceChangedColumn", requestId);
    }
    return dataChangedColumn.deleteServiceChangedColumn(requestId, userId);
}

/** ***********END SERVICE CHANGED COLUMN*************** */

/** ***********SERVICE CHANGED COLUMN*************** */
//Get request changed column
function getSpecialRequestChangedColumn(requestId) {
    if (!requestId) {
        throw ErrorLib.getErrors().BadRequest(
            "The Parameter requestId is not found",
            "requestChangedColumnLib/getSpecialRequestChangedColumn", requestId);
    }
    var changedColumns = dataChangedColumn.getSpecialRequestChangedColumn(requestId);
    var result = [];
    var objSpecialRequestModified = {};
    var arrSpecialRequestId = [];
    changedColumns.forEach(function (elem) {
        if (arrSpecialRequestId.indexOf(elem.SPECIAL_REQUEST_ID) === -1) {
            arrSpecialRequestId.push(elem.SPECIAL_REQUEST_ID);
        }
    });
    arrSpecialRequestId.forEach(function (specialRequestElem) {
        objSpecialRequestModified = {};
        objSpecialRequestModified.SPECIAL_REQUEST_ID = specialRequestElem;
        changedColumns.forEach(function (elem) {
            if (elem.SPECIAL_REQUEST_ID === specialRequestElem) {
                objSpecialRequestModified[elem.COLUMN_NAME] = elem.COLUMN_CHANGED;
            }
        });
        result.push(objSpecialRequestModified);
    });
    return result;
}

//Insert request changed column
function insertSpecialRequestChangedColumn(objSpecialRequestChangedColumn, userId) {
    var result = 0;
    if (validateSpecialRequestChangedColumn(objSpecialRequestChangedColumn, userId)) {
        result = dataChangedColumn.insertSpecialRequestChangedColumn(objSpecialRequestChangedColumn, userId);
    }
    return result;
}

//Delete request changed column
function deleteSpecialRequestChangedColumn(requestId, userId) {
    if (!requestId) {
        throw ErrorLib.getErrors().BadRequest(
            "The Parameter requestId is not found",
            "requestChangedColumnLib/deleteSpecialRequestChangedColumn", requestId);
    }
    return dataChangedColumn.deleteSpecialRequestChangedColumn(requestId, userId);
}

/** ***********END SERVICE CHANGED COLUMN*************** */

/** ***********VALIDATION*************** */
//Validate request changed column values
function validateRequestChangedColumn(objRequestChangedColumn, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest(
            "The Parameter userId is not found",
            "requestChangedColumnLib/insertRequestChangedColumn", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ["REQUEST_ID", "COLUMN_NAME", "COLUMN_CHANGED", "DISPLAY_NAME"];
    try {
        keys.forEach(function (key) {
            if (objRequestChangedColumn[key] === null || objRequestChangedColumn[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objRequestChangedColumn[key]);
                if (!isValid) {
                    errors[key] = objRequestChangedColumn[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("",
                "requestChangedColumnLib/insertRequestChangedColumn", e.toString());
        } else {
            throw ErrorLib.getErrors().CustomError("",
                "requestChangedColumnLib/insertRequestChangedColumn",
                JSON.stringify(errors));
        }
    }
    return isValid;
}

//Validate request changed column values
function validateServiceChangedColumn(objServiceChangedColumn, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest(
            "The Parameter userId is not found",
            "requestChangedColumnLib/insertServiceChangedColumn", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ["REQUEST_ID", "SERVICE_ID", "COLUMN_NAME", "COLUMN_CHANGED", "DISPLAY_NAME"];
    try {
        keys.forEach(function (key) {
            if (objServiceChangedColumn[key] === null || objServiceChangedColumn[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objServiceChangedColumn[key]);
                if (!isValid) {
                    errors[key] = objServiceChangedColumn[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("",
                "requestChangedColumnLib/insertServiceChangedColumn", e.toString());
        } else {
            throw ErrorLib.getErrors().CustomError("",
                "requestChangedColumnLib/insertServiceChangedColumn",
                JSON.stringify(errors));
        }
    }
    return isValid;
}

//Validate request changed column values
function validateSpecialRequestChangedColumn(objSpecialRequestChangedColumn, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest(
            "The Parameter userId is not found",
            "requestChangedColumnLib/insertSpecialRequestChangedColumn", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ["REQUEST_ID", "SPECIAL_REQUEST_ID", "COLUMN_NAME", "COLUMN_CHANGED", "DISPLAY_NAME"];
    try {
        keys.forEach(function (key) {
            if (objSpecialRequestChangedColumn[key] === null || objSpecialRequestChangedColumn[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objSpecialRequestChangedColumn[key]);
                if (!isValid) {
                    errors[key] = objSpecialRequestChangedColumn[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("",
                "requestChangedColumnLib/insertSpecialRequestChangedColumn", e.toString());
        } else {
            throw ErrorLib.getErrors().CustomError("",
                "requestChangedColumnLib/insertSpecialRequestChangedColumn",
                JSON.stringify(errors));
        }
    }
    return isValid;
}

//Validate type of value
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'REQUEST_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'SERVICE_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'SPECIAL_REQUEST_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'COLUMN_NAME':
            valid = value.length > 0 && value.length <= 255;
            break;
        case 'COLUMN_CHANGED':
            valid = !isNaN(value) && (value === 0 || value === 1);
            break;
        case 'DISPLAY_NAME':
            valid = value.length > 0 && value.length <= 255;
            break;
    }
    return valid;
}