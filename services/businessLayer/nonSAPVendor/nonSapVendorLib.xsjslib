$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var data = mapper.getDataNonSapVendor();
var ErrorLib = mapper.getErrors();
var dbHelper = mapper.getdbHelper();

function getAllNonSapVendor() {
	return data.getAllNonSapVendor();
}

function getAllNonSapVendorByRequestId(requestId, userId) {
	if (!userId){
		throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
	}
	if (!requestId){
		throw ErrorLib.getErrors().BadRequest("The Parameter requestId is not found", "", requestId);
	}
	return data.getAllNonSapVendorByRequestId(requestId);
}

function insertManualNonSapVendor(objVendor, userId) {
	if(validateInsertNonSapVendor(objVendor, userId)){
		return data.insertManualNonSapVendor(objVendor, userId);
	}
}

function insertNonSapVendor(objVendor, userId) {
    objVendor.CREATED_USER_ID = userId;
    if (validateInsertNonSapVendor(objVendor, userId)) {
        try {
            var resultId = data.insertManualNonSapVendor(objVendor, userId);
            dbHelper.commit();
            return resultId;
        }
        catch (e) {
            dbHelper.rollback();
            throw ErrorLib.getErrors().CustomError("", "", e.toString());
        }
        finally {
            dbHelper.closeConnection();
        }
    }
}

function getNonSapVendorById(nonSapVendorId, userId) {
	validateNonSapVendorParameters(nonSapVendorId, userId);
	return data.getNonSapVendorById(nonSapVendorId);
}

function getNonSapVendorByVendorId(vendorId) {
	return data.getNonSapVendorByVendorId(vendorId);
}

function getManualNonSapVendorById(vendorId, userId) {
	validateNonSapVendorParameters(vendorId, userId);
    return data.getManualNonSapVendorById(vendorId);
}

function validateNonSapVendorParameters(nonSapVendorId, userId){
	if (!userId){
		throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
	}
	if (!nonSapVendorId){
		throw ErrorLib.getErrors().BadRequest("The Parameter nonSapVendorId is not found", "", nonSapVendorId);
	}
}

function updateNonSapVendor(objVendor, userId) {
	objVendor.MODIFIED_USER_ID = userId;
	if (validateUpdateNonSapVendor(objVendor, userId)) {
		var vendor = existNonSapVendor(objVendor.NON_SAP_VENDOR_ID, userId);
		if (!vendor) {
			throw ErrorLib.getErrors().CustomError("", "", "The object vendor doesn't exist", objVendor);
		}
		try{
			var result = data.updateManualNonSapVendor(objVendor, userId);
			dbHelper.commit();
			return result;
		} catch (e) {
			dbHelper.rollback();
			throw ErrorLib.getErrors().CustomError("", "", e.toString());
		} finally {
			dbHelper.closeConnection();
		}
	}
}

function updateManualNonSapVendor(objVendor, userId) {
	objVendor.MODIFIED_USER_ID = userId;
	if (validateUpdateNonSapVendor(objVendor, userId)) {
		return data.updateManualNonSapVendor(objVendor, userId);
	}
}

function updateNonSapVendorMask(objNonSapVendor, userId) {
	objNonSapVendor.CONTACT = [];
	objNonSapVendor.NON_SAP_VENDOR.forEach(function (elem) {
		objNonSapVendor.CONTACT.push({REQUEST_ID: elem});
	});
    return data.updateNonSapVendorMask(objNonSapVendor, userId);
}

function deleteNonSapVendor(objVendor, userId) {
	validateNonSapVendorParameters(objVendor.NON_SAP_VENDOR_ID, userId);
	if (!existNonSapVendor(objVendor.NON_SAP_VENDOR_ID, userId)) {
		throw ErrorLib.getErrors().CustomError("The object vendor doesn't exist", "", objVendor);
	}
	return data.deleteNonSapVendor(objVendor.NON_SAP_VENDOR_ID, userId);
}

function deleteManualNonSapVendor(nonSapVendorId, userId) {
	validateNonSapVendorParameters(nonSapVendorId, userId);
	if (!existNonSapVendor(nonSapVendorId, userId)) {
		throw ErrorLib.getErrors().CustomError("", "", "The parameter nonSapVendorId doesn't exist");
	}
	return data.deleteManualNonSapVendor(nonSapVendorId, userId);
}

function validateInsertNonSapVendor(objVendor, userId) {

	if (!userId) {
		throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }

	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = ['ENTITY_ID', 'CONTACT_NAME', 'CONTACT_EMAIL', 'CONTACT_PHONE'];

	if (!objVendor) {
		throw ErrorLib.getErrors().CustomError("", "", "The object vendor is not found");
    }

	try {
		keys.forEach(function(key) {
			if (objVendor[key] === null || objVendor[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objVendor[key]);
				if (!isValid) {
					errors[key] = objVendor[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException) {
			throw ErrorLib.getErrors().CustomError("", "", e.toString());
        }
		else {
			throw ErrorLib.getErrors().CustomError("", "", JSON.stringify(errors));
        }
	}
	
	return isValid;
}

function validateUpdateNonSapVendor(objVendor, userId) {

	if (!userId) {
		throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }

	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ 'NON_SAP_VENDOR_ID', 'ENTITY_ID', 'CONTACT_NAME', 'CONTACT_EMAIL', 'CONTACT_PHONE' ];

	if (!objVendor) {
		throw ErrorLib.getErrors().CustomError("", "", "The object vendor is not found");
    }

	try {
		keys.forEach(function(key) {
			if (objVendor[key] === null || objVendor[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objVendor[key]);
				if (!isValid) {
					errors[key] = objVendor[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException) {
			throw ErrorLib.getErrors().CustomError("", "", e.toString());
        }
		else {
			throw ErrorLib.getErrors().CustomError("", "", JSON.stringify(errors));
        }
	}
	
	return isValid;
}

// Check data types
function validateType(key, value) {
	var valid = true;
    switch (key) {
        case 'NON_SAP_VENDOR_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'ENTITY_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'CONTACT_NAME':
            valid = value.length > 0 && value.length <= 255;
            break;
        case 'CONTACT_EMAIL':
            valid = value.length > 0 && value.length <= 255;
            break;
        case 'CONTACT_PHONE':
            valid = value.length > 0 && value.length <= 255;
            break;
    }
    return valid;
}

function existNonSapVendor(nonSapVendorId, userId){
	return Object.keys(getManualNonSapVendorById(nonSapVendorId, userId)).length > 0;
}