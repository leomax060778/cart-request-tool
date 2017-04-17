$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataReturnType = mapper.getDataReturnType();
var dataCrtReturnType = mapper.getDataCrtReturnType();
var dataCRTType = mapper.getDataCrtType();

var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//Insert return type
function insertReturnType(objReturnType, userId) {
    if (validateInsertReturnType(objReturnType, userId)) {
        return dataReturnType.insertReturnType(objReturnType, userId);
    }
}

//Get return type by ID
function getReturnTypeById(returnTypeId) {
    if (!returnTypeId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter returnTypeId is not found", "returnTypeService/handleGet/getReturnTypeById", returnTypeId);
    }
    var return_type;
    return_type = dataReturnType.getReturnTypeById(returnTypeId);
    if(return_type){
    	return_type = JSON.parse(JSON.stringify(return_type));
    	return_type.CRT_TYPE = dataCRTType.getCrtTypeByReturnType(return_type.RETURN_TYPE_ID);
    }
    return return_type;
}

//Get return type by ID manually
function getReturnTypeByIdManual(returnTypeId) {
    if (!returnTypeId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter returnTypeId is not found", "returnTypeService/handleGet/getReturnTypeById", returnTypeId);
    }
    
    var return_type;
    return_type = dataReturnType.getReturnTypeByIdManual(returnTypeId);;
    if(return_type){
    	return_type = JSON.parse(JSON.stringify(return_type));
    	return_type.CRT_TYPE = dataCRTType.getCrtTypeByReturnType(return_type.RETURN_TYPE_ID);
    }
    return return_type;
}

//Get return type by crt id manually
function getReturnTypeByCrtIdManual(crtTypeId) {
    if (!crtTypeId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter crtTypeId is not found", "returnTypeService/handleGet/getReturnTypeByCrtId", crtTypeId);
    }
    return dataCrtReturnType.getReturnTypeByCrtIdManual(crtTypeId);
}

//Get all return type
function getAllReturnType() {
    return dataReturnType.getAllReturnType();
}

//Update return type
function updateReturnType(objReturnType, userId) {
    if (validateUpdateReturnType(objReturnType, userId)) {
        if (!existReturnType(objReturnType.RETURN_TYPE_ID)) {
            throw ErrorLib.getErrors().CustomError("", "issueTypeService/handleDelete/updateReturnType", "The object RETURN_TYPE_ID " + objReturnType.RETURN_TYPE_ID + " does not exist");
        }
        return dataReturnType.updateReturnType(objReturnType, userId);
    }
}

//Delete return type
function deleteReturnType(objReturnType, userId) {
    if (!objReturnType.RETURN_TYPE_ID) {
        throw ErrorLib.getErrors().CustomError("", "returnTypeService/handlePost/deleteReturnType", "The RETURN_TYPE_ID is not found");
    }
    if (!existReturnType(objReturnType.RETURN_TYPE_ID)) {
        throw ErrorLib.getErrors().CustomError("", "issueTypeService/handleDelete/updateReturnType", "The object RETURN_TYPE_ID " + objReturnType.RETURN_TYPE_ID + " does not exist");
    }
    return dataReturnType.deleteReturnType(objReturnType, userId);
}

//Check if the request exists
function existReturnType(returnTypeId) {
    return getReturnTypeByIdManual(returnTypeId).length > 0;
}

function validateInsertReturnType(objReturnType, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "returnTypeService/handlePut/insertReturnType", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'NAME'
    ];
    
    var optionalKeys = ['ADDITIONAL_RETURN_TYPE_INFORMATION'];

    if (!objReturnType) {
        throw ErrorLib.getErrors().CustomError("", "returnTypeService/handlePost/insertReturnType", "The object returnType is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objReturnType[key] === null || objReturnType[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objReturnType[key]);
                if (!isValid) {
                    errors[key] = objReturnType[key];
                    throw BreakException;
                }
            }
        });
        optionalKeys.forEach(function (key) {
            // validate attribute type
	    	isValid = validateType(key, objReturnType[key]);
		        if (!isValid) {
		        	errors[key] = objReturnType[key];
		            throw BreakException;
		            
		        }
	        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "returnTypeService/handlePost/insertReturnType", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "returnTypeService/handlePost/insertReturnType", JSON.stringify(errors));
        }
    }
    return isValid;
}

function validateUpdateReturnType(objReturnType, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "returnTypeService/handlePut/updateReturnType", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'RETURN_TYPE_ID',
        'NAME'
    ];
    
    var optionalKeys = ['ADDITIONAL_RETURN_TYPE_INFORMATION'];

    if (!objReturnType) {
        throw ErrorLib.getErrors().CustomError("", "returnTypeService/handlePut/updateReturnType", "The object returnType is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objReturnType[key] === null || objReturnType[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objReturnType[key]);
                if (!isValid) {
                    errors[key] = objReturnType[key];
                    throw BreakException;
                }
            }
        });
        optionalKeys.forEach(function (key) {
                // validate attribute type
        	isValid = validateType(key, objReturnType[key]);
            if (!isValid) {
            	errors[key] = objReturnType[key];
                throw BreakException;
                
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "returnTypeService/handlePut/updateReturnType", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "returnTypeService/handlePut/updateReturnType", JSON.stringify(errors));
        }
    }
    return isValid;
}

//Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'NAME':
            valid = value.length > 0 && value.length <= 2048;
            break;
        case 'RETURN_TYPE_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'ADDITIONAL_RETURN_TYPE_INFORMATION':
            valid = (!value) || !isNaN(value) && value >= 0 && value < 2;
            break;
    }
    return valid;
}