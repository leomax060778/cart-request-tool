$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataTrainingType = mapper.getDataTrainingType();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

// Insert training
function insertTrainingType(objTraining, userId) {
	if (validateInsertTrainingType(objTraining, userId)) {
		return dataTrainingType.insertTrainingType(objTraining, userId);
	}
}

// Get training by ID
function getTrainingTypeById(trainingTypeId, userId) {
	validateTrainingTypeParams(trainingTypeId, userId);
	return dataTrainingType.getTrainingTypeById(trainingTypeId);
}

function getManualTrainingTypeById(trainingTypeId) {
	return dataTrainingType.getTrainingTypeManual(trainingTypeId);
}

// Get all training
function getAllTrainingType() {
	return dataTrainingType.getAllTrainingType();
}

// Update training
function updateTrainingType(objTraining, userId) {
	validateTrainingTypeParams(objTraining.TRAINING_TYPE_ID, userId);
	if (validateUpdateTrainingType(objTraining, userId)) {
		if (!existTrainingType(objTraining.TRAINING_TYPE_ID)) {
			throw ErrorLib.getErrors().CustomError("",
					"trainingTypeService/handlePut/updateTrainingType",
					"The object Training Type doesn't exists");
		}
		return dataTrainingType.updateTrainingType(objTraining, userId);
	}
}

// Delete training
function deleteTrainingType(objTraining, userId) {
	validateTrainingTypeParams(objTraining.TRAINING_TYPE_ID, userId);
	if (!existTrainingType(objTraining.TRAINING_TYPE_ID)) {
		throw ErrorLib.getErrors().CustomError("",
				"trainingTypeService/handlePost/insertTrainingType",
				"The object Training Type doesn't exists");
	}
	return dataTrainingType.deleteTrainingType(objTraining, userId);
}

// Check if the request exists
function existTrainingType(trainingTypeId) {
	return getManualTrainingTypeById(trainingTypeId).length > 0;
}

function validateInsertTrainingType(objTraining, userId) {
	if (!userId) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter userId is not found",
				"trainingTypeService/handlePut/insertTrainingType", userId);
	}
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ 'NAME' ];

	if (!objTraining) {
		throw ErrorLib.getErrors().CustomError("",
				"trainingTypeService/handlePost/insertTrainingType",
				"The object Training is not found");
	}

	try {
		keys.forEach(function(key) {
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
			throw ErrorLib.getErrors().CustomError("",
					"trainingTypeService/handlePost/insertTrainingType",
					e.toString());
		} else {
			throw ErrorLib.getErrors().CustomError("",
					"trainingTypeService/handlePost/insertTrainingType",
					JSON.stringify(errors));
		}
	}
	return isValid;
}

function validateUpdateTrainingType(objTraining, userId) {
	if (!userId) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter userId is not found",
				"trainingTypeService/handlePut/updateTrainingType", userId);
	}
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ 'TRAINING_TYPE_ID', 'NAME' ];

	if (!objTraining) {
		throw ErrorLib.getErrors().CustomError("",
				"trainingTypeService/handlePut/updateTrainingType",
				"The object Training is not found");
	}

	try {
		keys.forEach(function(key) {
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
			throw ErrorLib.getErrors().CustomError("",
					"trainingTypeService/handlePut/updateTrainingType",
					e.toString());
		} else {
			throw ErrorLib.getErrors().CustomError("",
					"trainingTypeService/handlePut/updateTrainingType",
					JSON.stringify(errors));
		}
	}
	return isValid;
}

// Check data types
function validateType(key, value) {
	var valid = true;
	switch (key) {
	case 'TRAINING_TYPE_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'NAME':
		valid = (value.length >= 0 && value.length <= 1000) || (!value);
		break;
	}
	return valid;
}

function validateTrainingTypeParams(trainingTypeId, userId) {
	if (!trainingTypeId) {
		throw ErrorLib.getErrors().CustomError("",
				"trainingTypeService/handleUpdate/updateTrainingType",
				"The trainingTypeId is not found");
	}
	if (!userId) {
		throw ErrorLib.getErrors().CustomError("",
				"trainingTypeService/handleUpdate/updateTrainingType",
				"The userId is not found");
	}
}