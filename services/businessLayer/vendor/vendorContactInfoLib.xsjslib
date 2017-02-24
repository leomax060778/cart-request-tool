$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var data = mapper.getDataVendorContactInformation();
var ErrorLib = mapper.getErrors();
var dbHelper = mapper.getdbHelper();

function getAllVendorContactInformation(user_id) {
	if (!user_id){
		throw ErrorLib.getErrors().BadRequest(
				"",
				"vendorContactInformationService/handleGet/getAllVendorContactInformation", "The Parameter user_id is not found");
	}
	
	return data.getAllVendorContactInformation();
}

function getVendorContactInformationById(vendor_contact_information_id, user_id){
	if (!vendor_contact_information_id){
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter vendor_contact_information_id is not found",
				"vendorContactInformationService/handleGet/getVendorContactInformationById", vendor_contact_information_id);
	}
	
	if (!user_id){
		throw ErrorLib.getErrors().BadRequest(
				"",
				"vendorContactInformationService/handleGet/getAllVendorContactInformation", "The Parameter user_id is not found");
	}
	
	return data.getVendorContactInformationById(vendor_contact_information_id);
}

function getVendorContactInformationByVendorId(vendor_id, user_id){
	if (!vendor_id){
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter vendor_id is not found",
				"vendorContactInformationService/handleGet/getVendorContactInformationByVendorId", vendor_id);
	}
	
	if (!user_id){
		throw ErrorLib.getErrors().BadRequest(
				"",
				"vendorContactInformationService/handleGet/getAllVendorContactInformation", "The Parameter user_id is not found");
	}
	
	return data.getVendorContactInformationByVendorId(vendor_id);
}

function getAllVendorContactInformationManual(user_id) {
	if (!user_id){
		throw ErrorLib.getErrors().BadRequest(
				"",
				"vendorContactInformationService/handleGet/getAllVendorContactInformation", "The Parameter user_id is not found");
	}
	
	return data.getAllVendorContactInformationManual();
}

function getVendorContactInformationByIdManual(vendor_contact_information_id, user_id){
	if (!vendor_contact_information_id){
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter vendor_contact_information_id is not found",
				"vendorContactInformationService/handleGet/getVendorContactInformationById", vendor_contact_information_id);
	}
	
	if (!user_id){
		throw ErrorLib.getErrors().BadRequest(
				"",
				"vendorContactInformationService/handleGet/getAllVendorContactInformation", "The Parameter user_id is not found");
	}
	
	return data.getVendorContactInformationByIdManual(vendor_contact_information_id);
}

function getVendorContactInformationByVendorIdManual(vendor_id, user_id){
	if (!vendor_id){
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter vendor_id is not found",
				"vendorContactInformationService/handleGet/getVendorContactInformationByVendorId", vendor_id);
	}
	
	if (!user_id){
		throw ErrorLib.getErrors().BadRequest(
				"",
				"vendorContactInformationService/handleGet/getAllVendorContactInformation", "The Parameter user_id is not found");
	}
	
	return data.getVendorContactInformationByVendorIdManual(vendor_id);
}

function insertVendorContactInformation(vendorContactInfoObj, user_id) {
	var result;
	if(validateInsertVendorContactInformation(vendorContactInfoObj, user_id)){
		result = data.insertVendorContactInformation(vendorContactInfoObj, user_id);
			if(result && vendorContactInfoObj.DEFAULT_CONTACT_INFORMATION === 1){
				vendorContactInfoObj.VENDOR_CONTACT_INFORMATION_ID = result;
				updateDefaultVendorContactInformation(vendorContactInfoObj, user_id);
			}
		return result;
	}
	
}

function insertVendorContactInformationManual(vendorContactInfoObj, user_id) {
	var result;
	if(validateInsertVendorContactInformation(vendorContactInfoObj, user_id)){
		result = data.insertVendorContactInformationManual(vendorContactInfoObj, user_id);
			if(result && vendorContactInfoObj.DEFAULT_CONTACT_INFORMATION === 1){
				vendorContactInfoObj.VENDOR_CONTACT_INFORMATION_ID = result;
				updateDefaultVendorContactInformationManual(vendorContactInfoObj, user_id);
			}
		return result;
	}
}

function updateVendorContactInformation(vendorContactInfoObj, user_id) {
	if (validateUpdateVendorContactInformation(vendorContactInfoObj, user_id)) {
		if(!existVendorContactInfo(vendorContactInfoObj.VENDOR_CONTACT_INFORMATION_ID)){
			throw ErrorLib.getErrors().CustomError("",
					"vendorContactInformationService/handlePut/updateVendorContactInformation",
					"The Contact Information does not exist", vendorContactInfoObj);
		}
		if(vendorContactInfoObj.DEFAULT_CONTACT_INFORMATION === 1){
			updateDefaultVendorContactInformation(vendorContactInfoObj, user_id);
		}
		
		return data.updateVendorContactInformation(vendorContactInfoObj, user_id);
	}
}

function updateVendorContactInformationManual(vendorContactInfoObj, user_id) {
	if (validateUpdateVendorContactInformation(vendorContactInfoObj, user_id)) {
		if(!existVendorContactInfo(vendorContactInfoObj.VENDOR_CONTACT_INFORMATION_ID)){
			throw ErrorLib.getErrors().CustomError("",
					"vendorContactInformationService/handlePut/updateVendorContactInformationManual",
					"The Contact Information does not exist", vendorContactInfoObj);
		}
		if(vendorContactInfoObj.DEFAULT_CONTACT_INFORMATION === 1){
			updateDefaultVendorContactInformationManual(vendorContactInfoObj, user_id);
		}
		return data.updateVendorContactInformationManual(vendorContactInfoObj, user_id);
	}
}

function updateDefaultVendorContactInformation(vendorContactInfoObj, user_id) {
	if (validateUpdateDefaultVendorContactInformation(vendorContactInfoObj, user_id)) {
		return data.updateDefaultVendorContactInformation(vendorContactInfoObj, user_id);
	}
}

function updateDefaultVendorContactInformationManual(vendorContactInfoObj, user_id) {
	if (validateUpdateDefaultVendorContactInformation(vendorContactInfoObj, user_id)) {
		return data.updateDefaultVendorContactInformationManual(vendorContactInfoObj, user_id);
	}
}

function deleteVendorContactInformation(vendorContactInfoObj, user_id) {
	if (!vendorContactInfoObj.VENDOR_CONTACT_INFORMATION_ID){
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter VENDOR_CONTACT_INFORMATION_ID is not found",
				"vendorContactInformationService/handleDelete/deleteVendorContactInformation", vendorContactInfoObj);
	}
	
	if (!user_id){
		throw ErrorLib.getErrors().BadRequest(
				"",
				"vendorContactInformationService/handleDelete/deleteVendorContactInformation", "The Parameter user_id is not found");
	}
	
	if(!existVendorContactInfo(vendorContactInfoObj.VENDOR_CONTACT_INFORMATION_ID)){
		throw ErrorLib.getErrors().CustomError("",
				"vendorContactInformationService/handleDelete/deleteVendorContactInformation",
				"The Contact Information does not exist", vendorContactInfoObj);
	}
	
	return data.deleteVendorContactInformation(vendorContactInfoObj.VENDOR_CONTACT_INFORMATION_ID, user_id);
}

function deleteVendorContactInformationManual(vendorContactInfoObj, user_id) {
	if (!vendorContactInfoObj.VENDOR_CONTACT_INFORMATION_ID){
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter VENDOR_CONTACT_INFORMATION_ID is not found",
				"vendorContactInformationService/handleDelete/deleteVendorContactInformation", vendorContactInfoObj);
	}
	
	if (!user_id){
		throw ErrorLib.getErrors().BadRequest(
				"",
				"vendorContactInformationService/handleDelete/deleteVendorContactInformation", "The Parameter user_id is not found");
	}
	
	if(!existVendorContactInfo(vendorContactInfoObj.VENDOR_CONTACT_INFORMATION_ID)){
		throw ErrorLib.getErrors().CustomError("",
				"vendorContactInformationService/handleDelete/deleteVendorContactInformation",
				"The Contact Information does not exist", vendorContactInfoObj);
	}
	
	return data.deleteVendorContactInformationManual(vendorContactInfoObj.VENDOR_CONTACT_INFORMATION_ID, user_id);
}

function validateUpdateVendorContactInformation(vendorContactInfoObj, userId){
	if (!userId) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter userId is not found",
				"vendorContactInformationService/handlePut/updateVendorContactInformation", userId);
	}
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ 'VENDOR_CONTACT_INFORMATION_ID', 'NAME', 'EMAIL'];
	var optionalKeys = ['PHONE'];
	
	if (!vendorContactInfoObj) {
		throw ErrorLib.getErrors().CustomError("",
				"vendorContactInformationService/handlePut/updateVendorContactInformation",
				"The object vendor contact information is not found");
	}

	try {
		keys.forEach(function(key) {
			if (vendorContactInfoObj[key] === null || vendorContactInfoObj[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, vendorContactInfoObj[key]);
				if (!isValid) {
					errors[key] = vendorContactInfoObj[key];
					throw BreakException;
				}
			}
		});
		
		optionalKeys.forEach(function(key) {
			// validate attribute type
			isValid = validateType(key, vendorContactInfoObj[key]);
			if (!isValid) {
				errors[key] = vendorContactInfoObj[key];
				throw BreakException;
			}
		});
		
		isValid = true;
	} catch (e) {
		if (e !== BreakException){
			throw ErrorLib.getErrors().CustomError("",
					"vendorContactInformationService/handlePut/updateVendorContactInformation", e.toString());
		} else {
			throw ErrorLib.getErrors().CustomError("",
					"vendorContactInformationService/handlePut/updateVendorContactInformation",
					JSON.stringify(errors));
		}
	}
	return isValid;
}

function validateUpdateDefaultVendorContactInformation(vendorContactInfoObj, userId){
	if (!userId) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter userId is not found",
				"vendorContactInformationService/handlePut/updateVendorContactInformation", userId);
	}
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ 'VENDOR_CONTACT_INFORMATION_ID', 'VENDOR_ID', 'DEFAULT_CONTACT_INFORMATION'];
	
	if (!vendorContactInfoObj) {
		throw ErrorLib.getErrors().CustomError("",
				"vendorContactInformationService/handlePut/updateVendorContactInformation",
				"The object vendor contact information is not found");
	}

	try {
		keys.forEach(function(key) {
			if (vendorContactInfoObj[key] === null || vendorContactInfoObj[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, vendorContactInfoObj[key]);
				if (!isValid) {
					errors[key] = vendorContactInfoObj[key];
					throw BreakException;
				}
			}
		});
		
		isValid = true;
	} catch (e) {
		if (e !== BreakException){
			throw ErrorLib.getErrors().CustomError("",
					"vendorContactInformationService/handlePut/updateVendorContactInformation", e.toString());
		} else {
			throw ErrorLib.getErrors().CustomError("",
					"vendorContactInformationService/handlePut/updateVendorContactInformation",
					JSON.stringify(errors));
		}
	}
	return isValid;
}


function validateInsertVendorContactInformation(vendorContactInfoObj, userId){
	if (!userId) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter userId is not found",
				"vendorContactInformationService/handlePost/insertVendorContactInformation", userId);
	}
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = ['NAME', 'EMAIL'];
	var optionalKeys = ['PHONE'];
	
	if (!vendorContactInfoObj) {
		throw ErrorLib.getErrors().CustomError("",
				"vendorContactInformationService/handlePost/insertVendorContactInformation",
				"The object vendor contact information is not found");
	}

	try {
		keys.forEach(function(key) {
			if (vendorContactInfoObj[key] === null || vendorContactInfoObj[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, vendorContactInfoObj[key]);
				if (!isValid) {
					errors[key] = vendorContactInfoObj[key];
					throw BreakException;
				}
			}
		});
		
		optionalKeys.forEach(function(key) {
			// validate attribute type
			isValid = validateType(key, vendorContactInfoObj[key]);
			if (!isValid) {
				errors[key] = vendorContactInfoObj[key];
				throw BreakException;
			}
		});
		
		isValid = true;
	} catch (e) {
		if (e !== BreakException){
			throw ErrorLib.getErrors().CustomError("",
					"vendorContactInformationService/handlePost/insertVendorContactInformation", e.toString());
		} else {
			throw ErrorLib.getErrors().CustomError("",
					"vendorContactInformationService/handlePost/insertVendorContactInformation",
					JSON.stringify(errors));
		}
	}
	return isValid;
}

// Check data types
function validateType(key, value) {
	var valid = true;
	switch (key) {
	case 'VENDOR_CONTACT_INFORMATION_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'VENDOR_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'DEFAULT_CONTACT_INFORMATION_ID':
		valid = !isNaN(value);
		break;
	case 'NAME':
		valid = (value.length > 0 && value.length <= 255);
		break;
	case 'EMAIL':
		valid = (value.length > 0 && value.length <= 255);
		break;
	case 'PHONE':
		valid = (!value) || (value.length > 0 && value.length <= 255);
		break;
	}
	return valid;
}

function existVendorContactInfo(vendorContactInfoId){
	return data.getVendorContactInformationByIdManual(vendorContactInfoId).length > 0;
}

