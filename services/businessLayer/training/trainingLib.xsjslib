$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataTraining = mapper.getDataTraining();
var dataTrainingType = mapper.getDataTrainingType();
var dbHelper = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

function getAllTrainingByParent(parentId, userId){
	if (!parentId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter parentId is not found", "trainingService/handleGet/getAllTrainingByParent", parentId);
    }
	return dataTraining.getAllTrainingByParent(parentId);
}

//Insert training
function insertTraining(objTraining, userId) {
    if (validateInsertTraining(objTraining, userId)) {
        if (!existTrainingType(objTraining.TRAINING_TYPE_ID)) {
            throw ErrorLib.getErrors().CustomError("", "trainingService/handlePost/insertTraining", "The object Training Type doesn't exist");
        } else {
            return dataTraining.insertTraining(objTraining, userId);
        }
    }
}

function existTrainingType(trainingTypeId){
	return (dataTrainingType.getManualTrainingTypeById(trainingTypeId).length > 0);
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
    if (!objTraining.TRAINING_ID) {
        throw ErrorLib.getErrors().CustomError("", "trainingService/handlePost/deleteTraining", "The TRAINING_ID is not found");
    }
    return dataTraining.deleteTraining(objTraining, userId);
}

function deleteManualTraining(objTraining, userId) {
    if (!objTraining.TRAINING_ID) {
        throw ErrorLib.getErrors().CustomError("", "trainingService/handlePost/deleteTraining", "The TRAINING_ID is not found");
    }
    return dataTraining.deleteManualTraining(objTraining, userId);
}

function deleteSelectedTraining(objTraining, userId){
	try{
		if(objTraining.TRAINING_LIST && objTraining.TRAINING_LIST.length > 0){
			(objTraining.TRAINING_LIST).forEach(function(training){
				deleteManualTraining(training, userId);
			});
		}
		dbHelper.commit();
	} catch(e){
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(),"deleteTraining");
	}
	finally{
		dbHelper.closeConnection();
	}
	return {};
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
        'TRAINING_TYPE_ID',
        'PARENT_ID',
        'NAME',
        'DESCRIPTION',
        'TRAINING_ORDER'
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
        'TRAINING_ID',
        'TRAINING_TYPE_ID'
        ];
    var optionalKeys = ['PARENT_ID',
                        'LINK',
                        'NAME',
                        'DESCRIPTION',
                        'TRAINING_ORDER'
                        ];
    
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
        optionalKeys.forEach(function (key) {
        	// validate attribute type
            isValid = validateType(key, objTraining[key]);
            if (!isValid) {
            	errors[key] = objTraining[key];
                throw BreakException;
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
        case 'TRAINING_TYPE_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'PARENT_TYPE_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'LINK':
        	valid = (!value) || (value.length >= 0 && value.length <= 1000);
            break;
        case 'NAME':
            valid = (!value) || (value.length >= 0 && value.length <= 1000);
            break;
        case 'DESCRIPTION':
            valid = (!value) || (value.length >= 0 && value.length <= 1000);
            break;
        case 'TRAINING_ORDER':
            valid = !isNaN(value) && value > 0;
            break;
        case 'TRAINING_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'PARENT_ID':
            valid = (!value) || (!isNaN(value) && value >= 0);
            break;
    }
    return valid;
}