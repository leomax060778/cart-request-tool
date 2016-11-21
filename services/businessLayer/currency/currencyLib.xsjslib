$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var data = mapper.getDataCurrency();
var ErrorLib = mapper.getErrors();
var dbHelper = mapper.getdbHelper();

function getAllCurrency() {
	return data.getAllCurrency();
}

function insertCurrency(objCurrency, user_id) {
	if (validateInsertCurrency(objCurrency, user_id)) {
		return data.insertCurrency(objCurrency, user_id);
	}
}
function getCurrencyById(currency_id, user_id) {
	if (!user_id){
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"currencyService/handleGet/getCurrencyById", user_id);
	}
	if (!currency_id){
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter currency_id is not found",
				"currencyService/handleGet/getCurrencyById", currency_id);
	}
	return data.getCurrencyById(currency_id);
}
function updateCurrency(objCurrency, user_id) {
	if (validateUpdateCurrency(objCurrency, user_id)) {
		try{
		if (!existCurrency(objCurrency.CURRENCY_ID, user_id)) {
			throw ErrorLib.getErrors().CustomError("",
					"currencyService/handlePut/updateCurrency",
					"The object Currency doesn't exist");
		} else {
			var result = data.updateCurrency(objCurrency, user_id);
		}
		dbHelper.commit();
		}
		catch(e){
			dbHelper.rollback();
			throw ErrorLib.getErrors().CustomError("", e.toString(),"updateCurrency");
		}
		finally{
			dbHelper.closeConnection();
		}
		return result;

	}
}
 
function deleteCurrency(currency_id, user_id) {
	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"currencyService/handleDelete/deleteCurrency", user_id);
	if (!currency_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter currency_id is not found",
				"currencyService/handleDelete/deleteCurrency", currency_id);
	try{
		if (!existCurrency(currency_id, user_id)) {
			throw ErrorLib.getErrors().CustomError("",
					"currencyService/handleDelete/deleteCurrency",
					"The object Currency doesn't exist");
		}else{
			var result = data.deleteCurrency(currency_id, user_id);
		}
		dbHelper.commit();
	}
	catch(e){
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(),"updateCurrency");
	}
	finally{
		dbHelper.closeConnection();
	}
	return result;
}

function validateInsertCurrency(objCurrency, user_id) {

	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"currencyService/handlePost/insertCurrency", user_id);

	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = ["COUNTRY",
	            "NAME",
	            "ABBREVIATION",
	            "CONVERSION_RATE",
	            "CURRENCY_YEAR"];

	if (!objCurrency)
		throw ErrorLib.getErrors().CustomError("",
				"currencyService/handlePost/insertCurrency",
				"The object Currency is not found");

	try {
		keys.forEach(function(key) {
			if (objCurrency[key] === null || objCurrency[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objCurrency[key])
				if (!isValid) {
					errors[key] = objCurrency[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("",
					"currencyService/handlePost/insertCurrency", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("",
					"currencyService/handlePost/insertCurrency",
					JSON.stringify(errors));
	}
	return isValid;
}

function validateUpdateCurrency(objCurrency, user_id) {

	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"currencyService/handlePut/updateCurrency", user_id);

	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = ["CURRENCY_ID",
	            "COUNTRY",
	            "NAME",
	            "ABBREVIATION",
	            "CONVERSION_RATE",
	            "CURRENCY_YEAR"];

	if (!objCurrency)
		throw ErrorLib.getErrors().CustomError("",
				"currencyService/handlePut/updateCurrency",
				"The object Currency is not found");

	try {
		keys.forEach(function(key) {
			if (objCurrency[key] === null || objCurrency[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objCurrency[key])
				if (!isValid) {
					errors[key] = objCurrency[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("",
					"currencyService/handlePut/updateCurrency", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("",
					"currencyService/handlePut/updateCurrency",
					JSON.stringify(errors));
	}
	return isValid;
}

// Check data types
function validateType(key, value) {
	var valid = true;
	switch (key) {
	case 'CURRENCY_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'COUNTRY':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'NAME':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'ABBREVIATION':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'CONVERSION_RATE':
		valid = !isNaN(value);
		break;
	case 'CURRENCY_YEAR':
		valid = !isNaN(value);
		break;
	}
	return valid;
}

function existCurrency(currency_id, userId) {
	return getManualCurrencyById(currency_id, userId).length > 0;
}

function getManualCurrencyById(currency_id, userId){
	if (!userId)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"currencyService/handleGet/getCurrencyById", user_id);
	if (!currency_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter currency_id is not found",
				"currencyService/handleGet/getManualCurrencyById", currency_id);

	return data.getManualCurrencyById(currency_id);
}