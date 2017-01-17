$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var data = mapper.getDataPopUp();
var ErrorLib = mapper.getErrors();
var dbHelper = mapper.getdbHelper();

function getAllPopUp(user_id) {
	if (!user_id){
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"popUpService/handleGet/getAllPopUp", user_id);
	}
	var return_object = data.getAllPopUp();
	var map = {};
	return_object = JSON.parse(JSON.stringify(return_object));
	return_object.forEach(function(elem){
         map[elem.CODE] = elem.CONTENT;
	});
	return map;
}

function getAllPopUpAdministration(user_id) {
	if (!user_id){
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"popUpService/handleGet/getAllPopUp", user_id);
	}
	return data.getAllPopUp();
	
}

function getPopUpById(pop_up_id, user_id) {
	if (!user_id){
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"popUpService/handleGet/getPopUpById", user_id);
	}
	if (!pop_up_id){
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter pop_up_id is not found",
				"popUpService/handleGet/getPopUpById", pop_up_id);
	}
	return data.getPopUpById(pop_up_id);
}
function updatePopUp(objPopUp, user_id) {
	if (validateUpdatePopUp(objPopUp, user_id)) {
		try{
		if (!existPopUp(objPopUp.POP_UP_ID, user_id)) {
			throw ErrorLib.getErrors().CustomError("",
					"popUpService/handlePut/updatePopUp",
					"The object Pop Up doesn't exist");
		} else {
			var result = data.updatePopUp(objPopUp, user_id);
		}
		dbHelper.commit();
		}
		catch(e){
			dbHelper.rollback();
			throw ErrorLib.getErrors().CustomError("", e.toString(),"updatePopUp");
		}
		finally{
			dbHelper.closeConnection();
		}
		return result;

	}
}
 
function deletePopUp(pop_up_id, user_id) {
	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"popUpService/handleDelete/deletePopUp", user_id);
	if (!pop_up_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter pop_up_id is not found",
				"popUpService/handleDelete/deletePopUp", pop_up_id);
	try{
		if (!existPopUp(pop_up_id, user_id)) {
			throw ErrorLib.getErrors().CustomError("",
					"popUpService/handleDelete/deletePopUp",
					"The object Pop Up doesn't exist");
		}else{
			var result = data.deletePopUp(pop_up_id, user_id);
		}
		dbHelper.commit();
	}
	catch(e){
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(),"deletePopUp");
	}
	finally{
		dbHelper.closeConnection();
	}
	return result;
}

function validateUpdatePopUp(objPopUp, user_id) {

	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"popUpService/handlePut/updatePopUp", user_id);

	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ "POP_UP_ID", 
	             "POP_UP_NAME", 
	             "CONTENT"];

	if (!objPopUp)
		throw ErrorLib.getErrors().CustomError("",
				"popUpService/handlePut/updatePopUp",
				"The object PopUp is not found");

	try {
		keys.forEach(function(key) {
			if (objPopUp[key] === null || objPopUp[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objPopUp[key])
				if (!isValid) {
					errors[key] = objPopUp[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("",
					"popUpService/handlePut/updatePopUp", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("",
					"popUpService/handlePut/updatePopUp",
					JSON.stringify(errors));
	}
	return isValid;
}

// Check data types
function validateType(key, value) {
	var valid = true;
	switch (key) {
	case 'POP_UP_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'POP_UP_NAME':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'CONTENT':
		valid = value.length > 0 && value.length <= 1000;
		break;
	}
	return valid;
}

function existPopUp(pop_up_id, userId) {
	return getManualPopUpById(pop_up_id, userId).length > 0;
}

function getManualPopUpById(pop_up_id, user_id){
	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"popUpService/handleGet/getPopUpById", user_id);
	if (!pop_up_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter pop_up_id is not found",
				"popUpService/handleGet/getManualPopUpById", pop_up_id);

	return data.getManualPopUpById(pop_up_id);
}