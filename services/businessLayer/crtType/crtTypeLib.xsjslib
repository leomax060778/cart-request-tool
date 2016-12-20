$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataCrtType = mapper.getDataCrtType();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//Insert crt type
function insertCrtType(objCrtType, userId) {
    if (validateInsertCrtType(objCrtType, userId)) {
        return dataCrtType.insertCrtType(objCrtType, userId);
    }
}

//Get crt type by ID
function getCrtTypeById(crtTypeId) {
    if (!crtTypeId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter crtTypeId is not found", "crtTypeService/handleGet/getCrtTypeById", crtTypeId);
    }
    return dataCrtType.getCrtTypeById(crtTypeId);
}

//Get crt type by ID manually
function getCrtTypeByIdManual(crtTypeId) {
    if (!crtTypeId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter crtTypeId is not found", "crtTypeService/handleGet/getCrtTypeById", crtTypeId);
    }
    return dataCrtType.getCrtTypeByIdManual(crtTypeId);
}

//Get all crt type
function getAllCrtType() {
    return dataCrtType.getAllCrtType();
}

//Get crt type with data protection
function getCrtTypeWithDataProtection() {
    return dataCrtType.getCrtTypeWithDataProtection();
}

//Get crt type with data protection manual
function getCrtTypeWithDataProtection() {
    return dataCrtType.getCrtTypeWithDataProtectionManual();
}


//Update crt type
function updateCrtType(objCrtType, userId) {
    if (validateUpdateCrtType(objCrtType, userId)) {
        if (!existCrtType(objCrtType.CRT_TYPE_ID)) {
            throw ErrorLib.getErrors().CustomError("", "crtTypeService/handleDelete/updateCrtType", "The object CRT_TYPE_ID " + objCrtType.CRT_TYPE_ID + " does not exist");
        }
        return dataCrtType.updateCrtType(objCrtType, userId);
    }
}

//Delete crt type
function deleteCrtType(objCrtType, userId) {
    if (!objCrtType.CRT_TYPE_ID) {
        throw ErrorLib.getErrors().CustomError("", "crtTypeService/handlePost/deleteCrtType", "The CRT_TYPE_ID is not found");
    }
    if (!existCrtType(objCrtType.CRT_TYPE_ID)) {
        throw ErrorLib.getErrors().CustomError("", "crtTypeService/handleDelete/updateCrtType", "The object CRT_TYPE_ID " + objCrtType.CRT_TYPE_ID + " does not exist");
    }
    return dataCrtType.deleteCrtType(objCrtType, userId);
}

//Check if the request exists
function existCrtType(crtTypeId) {
    return getCrtTypeByIdManual(crtTypeId).length > 0;
}

function validateInsertCrtType(objCrtType, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "crtTypeService/handlePut/insertCrtType", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'NAME'
    ];

    if (!objCrtType) {
        throw ErrorLib.getErrors().CustomError("", "crtTypeService/handlePost/insertCrtType", "The object crtType is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objCrtType[key] === null || objCrtType[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objCrtType[key]);
                if (!isValid) {
                    errors[key] = objCrtType[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "crtTypeService/handlePost/insertCrtType", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "crtTypeService/handlePost/insertCrtType", JSON.stringify(errors));
        }
    }
    return isValid;
}

function validateUpdateCrtType(objCrtType, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "crtTypeService/handlePut/updateCrtType", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'CRT_TYPE_ID',
        'NAME'
    ];

    if (!objCrtType) {
        throw ErrorLib.getErrors().CustomError("", "crtTypeService/handlePut/updateCrtType", "The object crtType is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objCrtType[key] === null || objCrtType[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objCrtType[key]);
                if (!isValid) {
                    errors[key] = objCrtType[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "crtTypeService/handlePut/updateCrtType", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "crtTypeService/handlePut/updateCrtType", JSON.stringify(errors));
        }
    }
    return isValid;
}

//Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'NAME':
            valid = value.length > 0 && value.length <= 255;
            break;
        case 'CRT_TYPE_ID':
            valid = !isNaN(value) && value > 0;
            break;
    }
    return valid;
}