$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var data = mapper.getDataNonSapVendor();
var ErrorLib = mapper.getErrors();
var dbHelper = mapper.getdbHelper();

function getAllNonSapVendor() {
	return data.getAllNonSapVendor();
}

function getAllNonSapVendorByRequestId(request_id, userId) {
	if (!userId){
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter userId is not found",
				"nonSapVendorService/handleGet/getAllVendorByEntity", userId);
	}
	if (!request_id){
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter request_id is not found",
				"nonSapnonSapVendorService/handleGet/getAllNonSapVendorByRequestId", request_id);
	}
	return data.getAllNonSapVendorByRequestId(request_id);
}

function insertManualNonSapVendor(objVendor, userId) {
	if(validateInsertNonSapVendor(objVendor, userId)){
		return data.insertManualNonSapVendor(objVendor, userId);
	}
}

function insertNonSapVendor(objVendor, user_id) {
	objVendor.CREATED_USER_ID = user_id;
	var result = {};
	if (validateInsertNonSapVendor(objVendor, user_id)) {
		try{
			var result_id = data.insertManualNonSapVendor(objVendor, user_id);
			dbHelper.commit();
		}
		catch(e){
			dbHelper.rollback();
			throw ErrorLib.getErrors().CustomError("", e.toString(),"insertNonSapVendor");
		}
		finally{
			dbHelper.closeConnection();
		}
	}
	return result_id;
}

function getNonSapVendorById(non_sap_vendor_id, user_id) {
	validateNonSapVendorParameters(non_sap_vendor_id, user_id);
	return data.getNonSapVendorById(non_sap_vendor_id);

}

function getManualNonSapVendorById(vendor_id, user_id) {
	validateNonSapVendorParameters(vendor_id, user_id);	
	var result = data.getManualNonSapVendorById(vendor_id);
	return result;
}

function validateNonSapVendorParameters(non_sap_vendor_id, user_id){
	if (!user_id){
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"nonSapVendorService/handleGet/getNonSapVendorById", user_id);
	}
	if (!non_sap_vendor_id){
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter non_sap_vendor_id is not found",
				"nonSapVendorService/handleGet/getNonSapVendorById", non_sap_vendor_id);
	}
}

function updateNonSapVendor(objVendor, user_id) {
	objVendor.MODIFIED_USER_ID = user_id;
	if (validateUpdateNonSapVendor(objVendor, user_id)) {
		var vendor = existNonSapVendor(objVendor.NON_SAP_VENDOR_ID, user_id);
		if (!(vendor)) {
			throw ErrorLib.getErrors().CustomError("",
					"nonSapVendorService/handlePut/updateNonSapVendor",
					"The object vendor doesn't exist", objVendor);
		}
		try{
			var result = data.updateManualNonSapVendor(objVendor, user_id);
			dbHelper.commit();
			return result;
		} catch (e) {
			dbHelper.rollback();
			throw ErrorLib.getErrors().CustomError("", e.toString(),
					"updateNonSapVendor");
		} finally {
			dbHelper.closeConnection();
		}
	}
}

function updateManualNonSapVendor(objVendor, user_id) {
	objVendor.MODIFIED_USER_ID = user_id;
	if (validateUpdateNonSapVendor(objVendor, user_id)) {
		return data.updateManualNonSapVendor(objVendor, user_id);
	}
}

function deleteNonSapVendor(objVendor, user_id) {
	validateNonSapVendorParameters(objVendor.NON_SAP_VENDOR_ID, user_id);
	if (!existNonSapVendor(objVendor.NON_SAP_VENDOR_ID, user_id)) {
		throw ErrorLib.getErrors().CustomError("",
				"nonSapVendorService/handlePut/insertNonSapVendor",
				"The object vendor doesn't exist", objVendor);
	}
	return data.deleteNonSapVendor(objVendor.NON_SAP_VENDOR_ID, user_id);
}

function deleteManualNonSapVendor(non_sap_vendor_id, user_id) {
	validateNonSapVendorParameters(non_sap_vendor_id, user_id);
	if (!existNonSapVendor(non_sap_vendor_id, user_id)) {
		throw ErrorLib.getErrors().CustomError("",
				"nonSapVendorService/handlePut/insertNonSapVendor",
				"The parameter non_sap_vendor_id doesn't exist", objVendor);
	}
	return data.deleteManualNonSapVendor(non_sap_vendor_id, user_id);
}

function validateInsertNonSapVendor(objVendor, user_id) {

	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"nonSapVendorService/handlePost/insertNonSapVendor", user_id);

	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = ['ENTITY_ID', 'CONTACT_NAME', 'CONTACT_EMAIL', 'CONTACT_PHONE'];

	if (!objVendor)
		throw ErrorLib.getErrors().CustomError("",
				"nonSapVendorService/handlePost/insertNonSapVendor",
				"The object vendor is not found");

	try {
		keys.forEach(function(key) {
			if (objVendor[key] === null || objVendor[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objVendor[key])
				if (!isValid) {
					errors[key] = objVendor[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("",
					"nonSapVendorService/handlePost/insertNonSapVendor", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("",
					"nonSapVendorService/handlePost/insertNonSapVendor",
					JSON.stringify(errors));
	}
	
	return isValid;
}

function validateUpdateNonSapVendor(objVendor, user_id) {

	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"nonSapVendorService/handlePut/updateNonSapVendor", user_id);

	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ 'NON_SAP_VENDOR_ID', 'ENTITY_ID', 'CONTACT_NAME', 'CONTACT_EMAIL', 'CONTACT_PHONE' ];

	if (!objVendor)
		throw ErrorLib.getErrors().CustomError("",
				"nonSapVendorService/handlePut/updateNonSapVendor",
				"The object vendor is not found");

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
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("",
					"nonSapVendorService/handlePut/updateNonSapVendor", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("",
					"nonSapVendorService/handlePut/updateNonSapVendor",
					JSON.stringify(errors));
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

function existNonSapVendor(non_sap_vendor_id, user_id){
	return getManualNonSapVendorById(non_sap_vendor_id, user_id).length > 0;
}
