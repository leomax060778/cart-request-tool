$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var data = mapper.getDataCurrency();
var ErrorLib = mapper.getErrors();
var dbHelper = mapper.getdbHelper();

function getAllCurrency() {
	return data.getAllCurrency();
}

function getAllCurrencyByDefaultYear(){
	return data.getAllCurrencyByDefaultYear();
}

function getCurrencyByYear(currencyYear){
	if (!currencyYear){
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter currencyYear is not found",
				"currencyService/handleGet/getCurrencyByYear", currencyYear);
	}
	return data.getCurrencyByYear(currencyYear);
}

function getCurrencyByYearFilter(curBody){
	var currency = [];
	var result = [];
	var auxArray = curBody.CURRENCY;
	auxArray.forEach(function(elem){
		currency = data.getCurrencyByYear(Number(elem));
		result = result.concat(currency);
	});
	return result;
}

function checkCurrency(curBody) {
    var currency = curBody.currencyList;
    var result;
    var updateCount = 0;
    var createCount = 0;
    currency.forEach(function (elem){
        if (existCurrencyBudgetYear(elem)){
            updateCount++;
        } else {
            createCount++;
        }
    });
    result = {"updateCount": updateCount, "createdCount": createCount, "budgetYear": currency[0]};
    return result;
}

function insertCurrency(curBody, userId) {
	var currency = curBody.currencyList;
	var result;
    var updateCount = 0;
    var createCount = 0;
    try{
	currency.forEach(function (elem){
        if (existCurrencyBudgetYear(elem)){
            updateCount++;
            if(!elem.CURRENCY){
            	elem.CURRENCY = "Not Applicable";
            }
            var existingCurrency = data.getCurrencyByAbbreviationYear(elem);
            elem.CURRENCY_ID = existingCurrency.CURRENCY_ID;
            data.updateCurrency(elem, userId);
        } else {
            if (validateInsertCurrency(elem, userId)) {
                createCount++;
                if(!elem.CURRENCY){
                	elem.CURRENCY = "Not Applicable";
                }
                data.insertCurrencyManual(elem, userId);
            }
        }
        dbHelper.commit();
	});
    } catch (e) {
        dbHelper.rollback();
        throw ErrorLib.getErrors().CustomError("", e.toString(),"insertCurrency");
    } finally {
        dbHelper.closeConnection();
    }
    result = {"updateCount": updateCount, "createdCount": createCount};
	return result;
}

function getCurrencyById(currency_id, userId) {
	if (!userId){
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter userId is not found",
				"currencyService/handleGet/getCurrencyById", userId);
	}
	if (!currency_id){
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter currency_id is not found",
				"currencyService/handleGet/getCurrencyById", currency_id);
	}
	return data.getCurrencyById(currency_id);
}
function updateCurrency(objCurrency, userId) {
	if (validateUpdateCurrency(objCurrency, userId)) {
		try{
		if (!existCurrency(objCurrency.CURRENCY_ID, userId)) {
			throw ErrorLib.getErrors().CustomError("",
					"currencyService/handlePut/updateCurrency",
					"The object Currency does not exist");
		} else {
			var result = data.updateCurrency(objCurrency, userId);
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
 
function deleteCurrency(currency_id, userId) {
	if (!userId)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter userId is not found",
				"currencyService/handleDelete/deleteCurrency", userId);
	if (!currency_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter currency_id is not found",
				"currencyService/handleDelete/deleteCurrency", currency_id);
	try{
		if (!existCurrency(currency_id, userId)) {
			throw ErrorLib.getErrors().CustomError("",
					"currencyService/handleDelete/deleteCurrency",
					"The object Currency does not exist");
		}else{
			var result = data.deleteCurrency(currency_id, userId);
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

function validateInsertCurrency(objCurrency, userId) {

	if (!userId)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter userId is not found",
				"currencyService/handlePost/insertCurrency", userId);

	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [
	            "ABBREVIATION",
	            "CONVERSION_RATE",
	            "CURRENCY_YEAR"];
	
	if (objCurrency.COUNTRY){
		keys.push("COUNTRY");
	}

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

function validateUpdateCurrency(objCurrency, userId) {

	if (!userId)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter userId is not found",
				"currencyService/handlePut/updateCurrency", userId);

	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = ["CURRENCY_ID",
	            "ABBREVIATION",
	            "CONVERSION_RATE",
	            "CURRENCY_YEAR"];
	if (objCurrency.COUNTRY){
		keys.push("COUNTRY");
	}

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

function existCurrencyBudgetYear(objCurrency){
    return Object.keys(data.getCurrencyByAbbreviationYear(objCurrency)).length > 0;
}

function getManualCurrencyById(currency_id, userId){
	if (!userId)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter userId is not found",
				"currencyService/handleGet/getCurrencyById", userId);
	if (!currency_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter currency_id is not found",
				"currencyService/handleGet/getManualCurrencyById", currency_id);

	return data.getManualCurrencyById(currency_id);
}