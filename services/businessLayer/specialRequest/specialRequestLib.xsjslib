$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var data = mapper.getDataSpecialRequest();
var ErrorLib = mapper.getErrors();
var dbHelper = mapper.getdbHelper();

function getAllSpecialRequest() {
	return data.getAllSpecialRequest();
}

function insertSpecialRequest(objSpecialRequest, user_id) {
	if (validateInsertSpecialRequest(objSpecialRequest, user_id)) {
		return data.insertSpecialRequest(objSpecialRequest, user_id);
	}
}
function getSpecialRequestById(special_request_id, user_id) {
	if (!user_id){
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"specialRequestService/handleGet/getSpecialRequestById", user_id);
	}
	if (!special_request_id){
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter special_request_id is not found",
				"specialRequestService/handleGet/getSpecialRequestById", special_request_id);
	}
	return data.getSpecialRequestById(special_request_id);
}
function updateSpecialRequest(objSpecialRequest, user_id) {
	if (validateUpdateSpecialRequest(objSpecialRequest, user_id)) {
		try{
		if (!existSpecialRequest(objSpecialRequest.SPECIAL_REQUEST_ID, user_id)) {
			throw ErrorLib.getErrors().CustomError("",
					"specialRequestService/handlePut/updateSpecialRequest",
					"The object SpecialRequest doesn't exist");
		} else {
			var result = data.updateSpecialRequest(objSpecialRequest, user_id);
		}
		dbHelper.commit();
		}
		catch(e){
			dbHelper.rollback();
			throw ErrorLib.getErrors().CustomError("", e.toString(),"updateSpecialRequest");
		}
		finally{
			dbHelper.closeConnection();
		}
		return result;

	}
}
 
function deleteSpecialRequest(special_request_id, user_id) {
	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"specialRequestService/handleDelete/deleteSpecialRequest", user_id);
	if (!special_request_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter special_request_id is not found",
				"specialRequestService/handleDelete/deleteSpecialRequest", special_request_id);
	try{
		if (!existSpecialRequest(special_request_id, user_id)) {
			throw ErrorLib.getErrors().CustomError("",
					"specialRequestService/handleDelete/deleteSpecialRequest",
					"The object SpecialRequest doesn't exist");
		}else{
			var result = data.deleteSpecialRequest(special_request_id, user_id);
		}
		dbHelper.commit();
	}
	catch(e){
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(),"deleteSpecialRequest");
	}
	finally{
		dbHelper.closeConnection();
	}
	return result;
}

function validateInsertSpecialRequest(objSpecialRequest, user_id) {

	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"specialRequestService/handlePost/insertSpecialRequest", user_id);

	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = ["REQUEST_ID",
	            "MATERIAL_DESCRIPTION", 
	            "MATERIAL_CODE",
				"ITEM",
				"UNIT_PRICE",
				"QUANTITY",
				"CURRENCY_ID",
				"VENDOR_TEXT",
				"UNIT",
				"AMOUNT",
				"BUDGET"];

	if (!objSpecialRequest)
		throw ErrorLib.getErrors().CustomError("",
				"specialRequestService/handlePost/insertSpecialRequest",
				"The object SpecialRequest is not found");

	try {
		keys.forEach(function(key) {
			if (objSpecialRequest[key] === null || objSpecialRequest[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objSpecialRequest[key]);
				if (!isValid) {
					errors[key] = objSpecialRequest[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("",
					"specialRequestService/handlePost/insertSpecialRequest", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("",
					"specialRequestService/handlePost/insertSpecialRequest",
					JSON.stringify(errors));
	}
	return isValid;
}

function validateUpdateSpecialRequest(objSpecialRequest, user_id) {

	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"specialRequestService/handlePut/updateSpecialRequest", user_id);

	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = ["SPECIAL_REQUEST_ID", 
				"MATERIAL_DESCRIPTION", 
	            "MATERIAL_CODE",
				"ITEM",
				"UNIT_PRICE",
				"QUANTITY",
				"CURRENCY_ID",
				"VENDOR_TEXT",
				"UNIT",
				"AMOUNT",
				"BUDGET"];

	if (!objSpecialRequest)
		throw ErrorLib.getErrors().CustomError("",
				"specialRequestService/handlePut/updateSpecialRequest",
				"The object SpecialRequest is not found");

	try {
		keys.forEach(function(key) {
			if (objSpecialRequest[key] === null || objSpecialRequest[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objSpecialRequest[key]);
				if (!isValid) {
					errors[key] = objSpecialRequest[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("",
					"specialRequestService/handlePut/updateSpecialRequest", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("",
					"specialRequestService/handlePut/updateSpecialRequest",
					JSON.stringify(errors));
	}
	return isValid;
}

// Check data types
function validateType(key, value) {
	var valid = true;
	switch (key) {
	case 'REQUEST_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'SPECIAL_REQUEST_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'MATERIAL_DESCRIPTION':
		valid = value.length > 0 && value.length <= 40;
		break;
	case 'MATERIAL_CODE':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'ITEM':
		valid = !isNaN(value) && value > 0;
		break;
	case 'UNIT_PRICE':
		valid = !isNaN(value) && value >= 0;
		break;
	case 'QUANTITY':
		valid = !isNaN(value) && value >= 0;
		break;
	case 'CURRENCY_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'VENDOR_TEXT':
		valid = value.length > 0 && value.length <= 1000;
		break;
	case 'UNIT':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'AMOUNT':
		valid = !isNaN(value) && value >= 0;
		break;
	case 'BUDGET':
		valid = !isNaN(value) && value >= 0;
		break;
	}
	return valid;
}

function existSpecialRequest(special_request_id, user_id) {
	return getManualSpecialRequestById(special_request_id, user_id).length > 0;
}

function getManualSpecialRequestById(special_request_id, user_id){
	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"specialRequestService/handleGet/getSpecialRequestById", user_id);
	if (!special_request_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter special_request_id is not found",
				"specialRequestService/handleGet/getManualSpecialRequestById", special_request_id);

	return data.getManualSpecialRequestById(special_request_id);
}