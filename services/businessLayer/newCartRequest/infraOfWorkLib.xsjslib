$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var data = mapper.getDataInfrastructureOfWork();
var ErrorLib = mapper.getErrors();
var dbHelper = mapper.getdbHelper();

function getAllInfrastructure() {
	return data.getAllInfrastructure();
}

function insertInfrastructure(objInfrastructure, user_id) {
	if (validateInsertInfrastructure(objInfrastructure, user_id)) {
		return data.insertInfrastructure(objInfrastructure, user_id);
	}
}
function getInfrastructureById(infrastructure_id, user_id) {
	if (!user_id){
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"infraOfWorkService/handleGet/getInfrastructureById", user_id);
	}
	if (!infrastructure_id){
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter infrastructure_id is not found",
				"infraOfWorkService/handleGet/getInfrastructureById", infrastructure_id);
	}
	return data.getInfrastructureById(infrastructure_id);
}
function updateInfrastructure(objInfrastructure, user_id) {
	if (validateUpdateInfrastructure(objInfrastructure, user_id)) {
		try{
		if (!existInfrastructure(objInfrastructure.INFRASTRUCTURE_ID, user_id)) {
			throw ErrorLib.getErrors().CustomError("",
					"infraOfWorkService/handlePut/updateInfrastructure",
					"The object Infrastructure doesn't exist");
		} else {
			var result = data.updateInfrastructure(objInfrastructure, user_id);
		}
		dbHelper.commit();
		}
		catch(e){
			dbHelper.rollback();
			throw ErrorLib.getErrors().CustomError("", e.toString(),"updateInfrastructure");
		}
		finally{
			dbHelper.closeConnection();
		}
		return result;

	}
}
 
function deleteInfrastructure(infrastructure_id, user_id) {
	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"infraOfWorkService/handleDelete/deleteInfrastructure", user_id);
	if (!infrastructure_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter infrastructure_id is not found",
				"infraOfWorkService/handleDelete/deleteInfrastructure", infrastructure_id);
	try{
		if (!existInfrastructure(infrastructure_id, user_id)) {
			throw ErrorLib.getErrors().CustomError("",
					"infraOfWorkService/handleDelete/deleteInfrastructure",
					"The object Infrastructure doesn't exist");
		}else{
			var result = data.deleteInfrastructure(infrastructure_id, user_id);
		}
		dbHelper.commit();
	}
	catch(e){
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(),"updateInfrastructure");
	}
	finally{
		dbHelper.closeConnection();
	}
	return result;
}

function validateInsertInfrastructure(objInfrastructure, user_id) {

	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"infraOfWorkService/handlePost/insertInfrastructure", user_id);

	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = ["INFRASTRUCTURE_NAME"];

	if (!objInfrastructure)
		throw ErrorLib.getErrors().CustomError("",
				"infraOfWorkService/handlePost/insertInfrastructure",
				"The object Infrastructure is not found");

	try {
		keys.forEach(function(key) {
			if (objInfrastructure[key] === null || objInfrastructure[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objInfrastructure[key])
				if (!isValid) {
					errors[key] = objInfrastructure[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("",
					"infraOfWorkService/handlePost/insertInfrastructure", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("",
					"infraOfWorkService/handlePost/insertInfrastructure",
					JSON.stringify(errors));
	}
	return isValid;
}

function validateUpdateInfrastructure(objInfrastructure, user_id) {

	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"infraOfWorkService/handlePut/updateInfrastructure", user_id);

	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = ["INFRASTRUCTURE_ID",
	            "INFRASTRUCTURE_NAME"];

	if (!objInfrastructure)
		throw ErrorLib.getErrors().CustomError("",
				"infraOfWorkService/handlePut/updateInfrastructure",
				"The object Infrastructure is not found");

	try {
		keys.forEach(function(key) {
			if (objInfrastructure[key] === null || objInfrastructure[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objInfrastructure[key])
				if (!isValid) {
					errors[key] = objInfrastructure[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("",
					"infraOfWorkService/handlePut/updateInfrastructure", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("",
					"infraOfWorkService/handlePut/updateInfrastructure",
					JSON.stringify(errors));
	}
	return isValid;
}

// Check data types
function validateType(key, value) {
	var valid = true;
	switch (key) {
	case 'INFRASTRUCTURE_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'INFRASTRUCTURE_NAME':
		valid = value.length > 0 && value.length <= 255;
		break;
	}
	return valid;
}

function existInfrastructure(infrastructure_id, userId) {
	return getManualInfrastructureById(infrastructure_id, userId).length > 0;
}

function getManualInfrastructureById(infrastructure_id, userId){
	if (!userId)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"infraOfWorkService/handleGet/getInfrastructureById", user_id);
	if (!infrastructure_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter infrastructure_id is not found",
				"infraOfWorkService/handleGet/getManualInfrastructureById", infrastructure_id);

	return data.getManualInfrastructureById(infrastructure_id);
}