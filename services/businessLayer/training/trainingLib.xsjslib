$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataTraining = mapper.getTraining();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//Insert training
function insertTraining(objTraining, userId) {
    if (validateInsertTraining(objTraining, userId)) {
        if (existTraining(objTraining.IN_TRAINING_ID)) {
            throw ErrorLib.getErrors().CustomError("", "trainingService/handlePost/insertTraining", "The object Training already exists");
        } else {
            return dataTraining.insertTraining(objTraining, userId);
        }
    }
}

//Get training by ID
function getTrainingById(trainingId) {
    if (!trainingId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter trainingId is not found", "trainingService/handleGet/getTrainingById", trainingId);
    }
    return dataTraining.getTraining(trainingId);
}

//Get all training
function getAllTraining() {
    return dataTraining.getTraining();
}

//Update training
function updateTraining(objTraining, userId) {
    if (validateUpdateTraining(objTraining, userId)) {
        return dataTraining.updateTraining(objTraining, userId);
    }
}

//Delete training
function deleteTraining(objTraining, userId) {
    if (!objTraining.IN_TRAINING_ID) {
        throw ErrorLib.getErrors().CustomError("", "trainingService/handlePost/deleteTraining", "The TRAINING_ID is not found");
    }
    return dataTraining.deleteTraining(objTraining, userId);
}

//Check if the request exists
function existTraining(trainingId) {
    return getTrainingById(trainingId).length > 0;
}

function validateInsertTraining(objTraining, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "trainingService/handlePut/insertTraining", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'IN_TRAINING_TYPE_ID',
        'IN_PARENT_TYPE_ID',
        'IN_LINK',
        'IN_NAME',
        'IN_TRAINING_ORDER'
    ];

    if (!objTraining) {
        throw ErrorLib.getErrors().CustomError("", "trainingService/handlePost/insertTraining", "The object Training is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objTraining[key] === null || objTraining[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objTraining[key]);
                if (!isValid) {
                    errors[key] = objTraining[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "trainingService/handlePost/insertTraining", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "trainingService/handlePost/insertTraining", JSON.stringify(errors));
        }
    }
    return isValid;
}

function validateUpdateTraining(objTraining, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "trainingService/handlePut/updateTraining", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'IN_TRAINING_ID',
        'IN_TRAINING_TYPE_ID',
        'IN_PARENT_ID',
        'IN_LINK',
        'IN_NAME',
        'IN_TRAINING_ORDER'];

    if (!objTraining) {
        throw ErrorLib.getErrors().CustomError("", "trainingService/handlePut/updateTraining", "The object Training is not found");    
    }

    try {
        keys.forEach(function (key) {
            if (objTraining[key] === null || objTraining[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objTraining[key]);
                if (!isValid) {
                    errors[key] = objTraining[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "trainingService/handlePut/updateTraining", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "trainingService/handlePut/updateTraining", JSON.stringify(errors));
        }
    }
    return isValid;
}

//Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'IN_TRAINING_TYPE_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'IN_PARENT_TYPE_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'IN_LINK':
            valid = !isNaN(value) && value > 0;
            break;
        case 'IN_NAME':
            valid = (value.length >= 0 && value.length <= 1000) || (!value);
            break;
        case 'IN_TRAINING_ORDER':
            valid = value.length > 0 && value.length <= 1000;
            break;
        case 'IN_TRAINING_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'IN_PARENT_ID':
            valid = (!isNaN(value) && value >= 0) || (!value);
            break;
    }
    return valid;
}