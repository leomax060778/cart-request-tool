$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var data = mapper.getDataLocationOfWork();
var ErrorLib = mapper.getErrors();
var dbHelper = mapper.getdbHelper();

function getAllLocation(user_id) {
	return data.getAllLocation();
}

function insertLocation(objLocation, user_id) {
	if (validateInsertLocation(objLocation, user_id)) {
		return data.insertLocation(objLocation, user_id);
	}
}
function getLocationById(location_id, user_id) {
	if (!user_id){
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"locOfWorkService/handleGet/getLocationById", user_id);
	}
	if (!location_id){
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter location_id is not found",
				"locOfWorkService/handleGet/getLocationById", location_id);
	}
	return data.getLocationById(location_id);
}
function updateLocation(objLocation, user_id) {
	if (validateUpdateLocation(objLocation, user_id)) {
		try{
		if (!existLocation(objLocation.LOCATION_ID, user_id)) {
			throw ErrorLib.getErrors().CustomError("",
					"locOfWorkService/handlePut/updateLocation",
					"The object Location doesn't exist");
		} else {
			var result = data.updateLocation(objLocation, user_id);
		}
		dbHelper.commit();
		}
		catch(e){
			dbHelper.rollback();
			throw ErrorLib.getErrors().CustomError("", e.toString(),"updateLocation");
		}
		finally{
			dbHelper.closeConnection();
		}
		return result;

	}
}
 
function deleteLocation(location_id, user_id) {
	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"locOfWorkService/handleDelete/deleteLocation", user_id);
	if (!location_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter location_id is not found",
				"locOfWorkService/handleDelete/deleteLocation", location_id);
	try{
		if (!existLocation(location_id, user_id)) {
			throw ErrorLib.getErrors().CustomError("",
					"locOfWorkService/handleDelete/deleteLocation",
					"The object Location doesn't exist");
		}else{
			var result = data.deleteLocation(location_id, user_id);
		}
		dbHelper.commit();
	}
	catch(e){
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(),"deleteLocation");
	}
	finally{
		dbHelper.closeConnection();
	}
	return result;
}

function validateInsertLocation(objLocation, user_id) {

	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"locOfWorkService/handlePost/insertLocation", user_id);

	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = ["LOCATION_NAME"];

	if (!objLocation)
		throw ErrorLib.getErrors().CustomError("",
				"locOfWorkService/handlePost/insertLocation",
				"The object Location is not found");

	try {
		keys.forEach(function(key) {
			if (objLocation[key] === null || objLocation[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objLocation[key])
				if (!isValid) {
					errors[key] = objLocation[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("",
					"locOfWorkService/handlePost/insertLocation", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("",
					"locOfWorkService/handlePost/insertLocation",
					JSON.stringify(errors));
	}
	return isValid;
}

function validateUpdateLocation(objLocation, user_id) {

	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"locOfWorkService/handlePut/updateLocation", user_id);

	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = ["LOCATION_ID",
	            "LOCATION_NAME"];

	if (!objLocation)
		throw ErrorLib.getErrors().CustomError("",
				"locOfWorkService/handlePut/updateLocation",
				"The object Location is not found");

	try {
		keys.forEach(function(key) {
			if (objLocation[key] === null || objLocation[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objLocation[key])
				if (!isValid) {
					errors[key] = objLocation[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("",
					"locOfWorkService/handlePut/updateLocation", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("",
					"locOfWorkService/handlePut/updateLocation",
					JSON.stringify(errors));
	}
	return isValid;
}

// Check data types
function validateType(key, value) {
	var valid = true;
	switch (key) {
	case 'LOCATION_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'LOCATION_NAME':
		valid = value.length > 0 && value.length <= 255;
		break;

	}
	return valid;
}

function existLocation(location_id, userId) {
	return getManualLocationById(location_id, userId).length > 0;
}

function getManualLocationById(location_id, userId){
	if (!userId)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"locOfWorkService/handleGet/getLocationById", user_id);
	if (!location_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter location_id is not found",
				"locOfWorkService/handleGet/getManualLocationById", location_id);

	return data.getManualLocationById(location_id);
}