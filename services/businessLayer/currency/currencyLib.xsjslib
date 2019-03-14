$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var data = mapper.getDataCurrency();
var ErrorLib = mapper.getErrors();
var dbHelper = mapper.getdbHelper();
var budgetYear = mapper.getBudgetYear();

function getAllCurrency() {
    return data.getAllCurrency();
}

function getAllCurrencyByDefaultYear() {
    var defaultBudgetYear = budgetYear.getDefaultBudgetYear();

    return getCurrencyByYear(defaultBudgetYear[0].BUDGET_YEAR);
}

function getCurrencyByYear(currencyYear) {
    if (!currencyYear) {
        throw ErrorLib.getErrors().BadRequest(
            "The Parameter currencyYear is not found",
            "", currencyYear);
    }
    return data.getCurrencyByYear(currencyYear);
}

function getCurrencyByYearFilter(curBody) {
    var currency = [];
    var result = [];
    var auxArray = curBody.CURRENCY;
    auxArray.forEach(function (elem) {
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
    currency.forEach(function (elem) {
        if (existCurrencyBudgetYear(elem)) {
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
    try {
        currency.forEach(function (elem) {
            if (existCurrencyBudgetYear(elem)) {
                updateCount++;
                if (!elem.CURRENCY) {
                    elem.CURRENCY = "Not Applicable";
                }
                var existingCurrency = data.getCurrencyByAbbreviationYear(elem);
                elem.CURRENCY_ID = existingCurrency.CURRENCY_ID;
                data.updateCurrency(elem, userId);
            } else {
                if (validateInsertCurrency(elem, userId)) {
                    createCount++;
                    if (!elem.CURRENCY) {
                        elem.CURRENCY = "Not Applicable";
                    }
                    data.insertCurrencyManual(elem, userId);
                }
            }
        });
        if (updateCount) {
            var budgetYearId = curBody.BUDGET_YEAR_ID ? curBody.BUDGET_YEAR_ID : budgetYear.getDefaultBudgetYear()[0].BUDGET_YEAR_ID;
            data.updateRequestBudget(budgetYearId);
        }
        dbHelper.commit();
    } catch (e) {
        dbHelper.rollback();
        throw ErrorLib.getErrors().CustomError("", "", e.toString());
    } finally {
        dbHelper.closeConnection();
    }
    result = {"updateCount": updateCount, "createdCount": createCount};
    return result;
}

function getCurrencyById(currencyId, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    if (!currencyId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter currencyId is not found", "", currencyId);
    }
    return data.getCurrencyById(currencyId);
}

function updateCurrency(objCurrency, userId) {
    if (validateUpdateCurrency(objCurrency, userId)) {
        try {
            if (!existCurrency(objCurrency.CURRENCY_ID, userId)) {
                throw ErrorLib.getErrors().CustomError("", "", "The object Currency does not exist");
            } else {
                var result = data.updateCurrency(objCurrency, userId);
            }
            dbHelper.commit();
        }
        catch (e) {
            dbHelper.rollback();
            throw ErrorLib.getErrors().CustomError("", "", e.toString());
        }
        finally {
            dbHelper.closeConnection();
        }
        return result;

    }
}

function deleteCurrency(currencyId, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    if (!currencyId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter currencyId is not found", "", currencyId);
    }
    try {
        if (!existCurrency(currencyId, userId)) {
            throw ErrorLib.getErrors().CustomError("", "", "The object Currency does not exist");
        } else {
            var result = data.deleteCurrency(currencyId, userId);
        }
        dbHelper.commit();
    }
    catch (e) {
        dbHelper.rollback();
        throw ErrorLib.getErrors().CustomError("", "", e.toString());
    }
    finally {
        dbHelper.closeConnection();
    }
    return result;
}

function validateInsertCurrency(objCurrency, userId) {

    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }

    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        "ABBREVIATION",
        "CONVERSION_RATE",
        "CURRENCY_YEAR"];

    if (objCurrency.COUNTRY) {
        keys.push("COUNTRY");
    }

    if (!objCurrency) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Currency is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objCurrency[key] === null || objCurrency[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objCurrency[key]);
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
                "", e.toString());
        else
            throw ErrorLib.getErrors().CustomError("",
                "",
                JSON.stringify(errors));
    }
    return isValid;
}

function validateUpdateCurrency(objCurrency, userId) {

    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }

    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ["CURRENCY_ID",
        "ABBREVIATION",
        "CONVERSION_RATE",
        "CURRENCY_YEAR"];
    if (objCurrency.COUNTRY) {
        keys.push("COUNTRY");
    }

    if (!objCurrency) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Currency is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objCurrency[key] === null || objCurrency[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objCurrency[key]);
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
                "", e.toString());
        else
            throw ErrorLib.getErrors().CustomError("",
                "",
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

function existCurrency(currencyId, userId) {
    return getManualCurrencyById(currencyId, userId).length > 0;
}

function existCurrencyBudgetYear(objCurrency) {
    return Object.keys(data.getCurrencyByAbbreviationYear(objCurrency)).length > 0;
}

function getManualCurrencyById(currencyId, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    if (!currencyId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter currencyId is not found", "", currencyId);
    }

    return data.getManualCurrencyById(currencyId);
}