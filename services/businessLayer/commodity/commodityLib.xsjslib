$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataCommodity = mapper.getDataCommodity();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//Insert commodity
function insertCommodity(objCommodity, userId) {
    if (validateInsertCommodity(objCommodity, userId)) {
        return dataCommodity.insertCommodity(objCommodity, userId);
    }
}

//Get commodity by id
function getCommodityById(commodityId) {
    return dataCommodity.getCommodityById(commodityId);
}

//Get commodity by id manually
function getCommodityByIdManual(commodityId) {
    return dataCommodity.getCommodityByIdManual(commodityId);
}

//Get all inquiries
function getAllCommodity() {
    return dataCommodity.getAllCommodity();
}

//Update commodity
function updateCommodity(objCommodity, userId) {
    if (validateUpdateCommodity(objCommodity, userId)) {
        if (!existCommodity(objCommodity.COMMODITY_ID)) {
            throw ErrorLib.getErrors().CustomError("", "commodityService/handleDelete/updateCommodity", "The commodity with the id " + objCommodity.COMMODITY_ID + " does not exist");
        } else {
            return dataCommodity.updateCommodity(objCommodity, userId);
        }
    }
}

//Delete commodity
function deleteCommodity(objCommodity, userId) {
    if (!objCommodity.COMMODITY_ID) {
        throw ErrorLib.getErrors().CustomError("", "commodityService/handleDelete/deleteCommodity", "The COMMODITY_ID is not found");
    }
    if (!existCommodity(objCommodity.COMMODITY_ID)) {
        throw ErrorLib.getErrors().CustomError("", "commodityService/handleDelete/updateCommodity", "The commodity with the id " + objCommodity.COMMODITY_ID + " does not exist");
    }
    return dataCommodity.deleteCommodity(objCommodity, userId);
}

//Check if the commodity exists
function existCommodity(commodityId) {
    return getCommodityByIdManual(commodityId).length > 0;
}

//Validate insert commodity
function validateInsertCommodity(objCommodity, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "commodityService/handlePut/insertCommodity", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['DESCRIPTION'];

    if (!objCommodity) {
        throw ErrorLib.getErrors().CustomError("", "commodityService/handlePost/insertCommodity", "The object  Commodity is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objCommodity[key] === null || objCommodity[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objCommodity[key]);
                if (!isValid) {
                    errors[key] = objCommodity[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "commodityService/handlePost/insertCommodity", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "commodityService/handlePost/insertCommodity", JSON.stringify(errors));
        }
    }
    return isValid;
}

function validateUpdateCommodity(objCommodity, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "commodityService/handlePut/updateCommodity", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'COMMODITY_ID',
        'DESCRIPTION'];

    if (!objCommodity) {
        throw ErrorLib.getErrors().CustomError("", "commodityService/handlePut/updateCommodity", "The object Vendor Commodity is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objCommodity[key] === null || objCommodity[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objCommodity[key]);
                if (!isValid) {
                    errors[key] = objCommodity[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "commodityService/handlePut/updateCommodity", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "commodityService/handlePut/updateCommodity", JSON.stringify(errors));
        }
    }
    return isValid;
}

//Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'COMMODITY_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'DESCRIPTION':
            valid = value.length > 0 && value.length <= 255;
            break;
    }
    return valid;
}