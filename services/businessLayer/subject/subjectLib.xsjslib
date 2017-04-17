$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataSubject = mapper.getDataSubject();
var dataCrtSubject = mapper.getDataCrtSubject();
var dataCRTType = mapper.getDataCrtType();

var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//Insert subject
function insertSubject(objSubject, userId) {
    if (validateInsertSubject(objSubject, userId)) {
        var result = dataSubject.insertSubject(objSubject, userId);
        var newCrtType = objSubject.CRT_TYPE;
        var oSubject = {};
        if (newCrtType.length > 0) {
            newCrtType.forEach(function (newElem) {
                oSubject = {
                    "CRT_TYPE_ID": newElem.CRT_TYPE_ID,
                    "SUBJECT_ID": result
                };
                if (newElem.SELECTED) {
                    dataCrtSubject.insertCrtSubject(oSubject, userId);
                }
            });
        }
        return result;
    }
}

//Get subject by ID
function getSubjectById(subjectId) {
    if (!subjectId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter subjectId is not found", "subjectService/handleGet/getSubjectById", subjectId);
    }

    var subject;
    subject = dataSubject.getSubjectById(subjectId);

    if (subject) {
        subject = JSON.parse(JSON.stringify(subject));
        subject.CRT_TYPE = dataCRTType.getCrtTypeBySubject(subject.SUBJECT_ID);
    }
    return subject;
}

//Get subject by ID manually
function getSubjectByIdManual(subjectId) {
    if (!subjectId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter subjectId is not found", "subjectService/handleGet/getSubjectById", subjectId);
    }
    var subject = dataSubject.getSubjectByIdManual(subjectId);

    if (subject) {
        subject = JSON.parse(JSON.stringify(subject));
        subject.CRT_TYPE = dataCRTType.getCrtTypeBySubject(subject.SUBJECT_ID);
    }
    return subject;
}

//Get subject by crt id manually
function getSubjectByCrtIdManual(crtTypeId) {
    if (!crtTypeId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter crtTypeId is not found", "subjectService/handleGet/getSubjectByCrtId", crtTypeId);
    }
    return dataCrtSubject.getSubjectByCrtIdManual(crtTypeId);
}

//Get all subject
function getAllSubject() {
    return dataSubject.getAllSubject();
}

//Update subject
function updateSubject(objSubject, userId) {
    var oSubject;
    var dbCrtType = [];
    var insertCrtSubject = [];
    var deleteCrtSubject = [];
    var result = {};
    var comparisonResult;
    if (validateUpdateSubject(objSubject, userId)) {
        if (!existSubject(objSubject.SUBJECT_ID)) {
            throw ErrorLib.getErrors().CustomError("", "subjectService/handlePut/updateSubject", "The object SUBJECT_ID " + objSubject.SUBJECT_ID + " does not exist");
        }
        var newCrtType = objSubject.CRT_TYPE;
        if (validateUpdateSubject(objSubject, userId)) {
            if (!existSubject(objSubject.SUBJECT_ID)) {
                throw ErrorLib.getErrors().CustomError("", "subjectService/handlePut/updateSubject", "The object SUBJECT_ID " + objSubject.SUBJECT_ID + " does not exist");
            }
            if (newCrtType.length > 0) {
                dbCrtType = dataCRTType.getCrtTypeBySubject(objSubject.SUBJECT_ID);

                newCrtType.forEach(function (newElem) {
                    comparisonResult = false;
                    oSubject = {
                        "CRT_TYPE_ID": newElem.CRT_TYPE_ID,
                        "SUBJECT_ID": objSubject.SUBJECT_ID
                    };
                    dbCrtType.forEach(function (dbElem) {
                        if (Number(newElem.CRT_TYPE_ID) === Number(dbElem.CRT_TYPE_ID)) {
                            comparisonResult = true;
                        }
                    });
                    if (comparisonResult) {
                        if (!newElem.SELECTED) {
                            deleteCrtSubject.push(oSubject);
                        }
                    } else {
                        if (newElem.SELECTED) {
                            insertCrtSubject.push(oSubject);
                        }
                    }
                });
                if (deleteCrtSubject.length > 0) {
                    deleteCrtSubject.forEach(function (deleteElem) {
                        dataCrtSubject.deleteCrtSubject(deleteElem, userId);
                    });
                }
                if (insertCrtSubject.length > 0) {
                    insertCrtSubject.forEach(function (insertElem) {
                        dataCrtSubject.insertCrtSubject(insertElem, userId);
                    });
                }
            }
        }
    }
    return dataSubject.updateSubject(objSubject, userId);
}

//Delete subject
function deleteSubject(objSubject, userId) {
    if (!objSubject.SUBJECT_ID) {
        throw ErrorLib.getErrors().CustomError("", "subjectService/handlePost/deleteSubject", "The SUBJECT_ID is not found");
    }
    if (!existSubject(objSubject.SUBJECT_ID)) {
        throw ErrorLib.getErrors().CustomError("", "subjectService/handleDelete/updateSubject", "The object SUBJECT_ID " + objSubject.SUBJECT_ID + " does not exist");
    }
    return dataSubject.deleteSubject(objSubject, userId);
}

//Check if the request exists
function existSubject(subjectId) {
    return Object.keys(getSubjectByIdManual(subjectId)).length > 0;
}

function validateInsertSubject(objSubject, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "subjectService/handlePut/insertSubject", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'NAME',
        'POSITION'
    ];
    var optionalKeys = ['ADDITIONAL_SUBJECT_INFORMATION'];

    if (!objSubject) {
        throw ErrorLib.getErrors().CustomError("", "subjectService/handlePost/insertSubject", "The object subject is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objSubject[key] === null || objSubject[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objSubject[key]);
                if (!isValid) {
                    errors[key] = objSubject[key];
                    throw BreakException;
                }
            }
        });
        optionalKeys.forEach(function (key) {
            // validate attribute type
            isValid = validateType(key, objSubject[key]);
            if (!isValid) {
                errors[key] = objSubject[key];
                throw BreakException;
            }
        });

        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "subjectService/handlePost/insertSubject", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "subjectService/handlePost/insertSubject", JSON.stringify(errors));
        }
    }
    return isValid;
}

function validateUpdateSubject(objSubject, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "subjectService/handlePut/updateSubject", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'SUBJECT_ID',
        'NAME',
        'POSITION'
    ];
    var optionalKeys = ['ADDITIONAL_SUBJECT_INFORMATION'];

    if (!objSubject) {
        throw ErrorLib.getErrors().CustomError("", "subjectService/handlePut/updateSubject", "The object subject is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objSubject[key] === null || objSubject[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objSubject[key]);
                if (!isValid) {
                    errors[key] = objSubject[key];
                    throw BreakException;
                }
            }
        });
        optionalKeys.forEach(function (key) {
            // validate attribute type
            isValid = validateType(key, objSubject[key]);
            if (!isValid) {
                errors[key] = objSubject[key];
                throw BreakException;
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "subjectService/handlePut/updateSubject", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "subjectService/handlePut/updateSubject", JSON.stringify(errors));
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
        case 'SUBJECT_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'POSITION':
            valid = !isNaN(value) && value > 0;
            break;
        case 'ADDITIONAL_SUBJECT_INFORMATION':
            valid = (!value) || (!isNaN(value) && value >= 0 && value < 2);
            break;
    }
    return valid;
}