$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var data = mapper.getDataVendor();
var dataVE = mapper.getDataVendorEntity();
var business_contact = mapper.getVendorContactInformation();
var ErrorLib = mapper.getErrors();
var dbHelper = mapper.getdbHelper();

function getAllVendor() {
	var ven = {};
	try{
		var vendor_result = data.getManualAllVendor();
		if (vendor_result.length > 0) {
			ven = JSON.parse(JSON.stringify(vendor_result));
		}
		dbHelper.commit();
	}
	catch(e){
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(),"getAllVendor");
	}
	finally{
		dbHelper.closeConnection();
	}
	return ven;
}

function getAllVendorForFilters(user_id) {
	return data.getAllVendorForFilters(user_id);
}

function getAllVendorByEntity(entityId, vendorAdditionalInformationId) {
	if (!entityId){
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter entityId is not found",
				"vendorService/handleGet/getAllVendorByEntity", entityId);
	}
	var vendorCollection = dataVE.getAllVendorByEntityId(entityId);
	if (vendorAdditionalInformationId) {
		var oldVendor = data.getVendorByAdditionalInformationId(vendorAdditionalInformationId);
		var existVendorName = validateVendorName(oldVendor, vendorCollection);
		if (!existVendorName) {
			vendorCollection = JSON.parse(JSON.stringify(vendorCollection));
			oldVendor = JSON.parse(JSON.stringify(oldVendor));
			oldVendor.NAME = oldVendor.NAME + " (Old Name)";
			vendorCollection.push(oldVendor);
		}
	}
	return vendorCollection;
}

function validateVendorName(oldVendor, vendorCollection){
	var result = false;
	vendorCollection.forEach(function(elem){
		if(Number(elem.VENDOR_ADDITIONAL_INFORMATION_ID) === Number(oldVendor.VENDOR_ADDITIONAL_INFORMATION_ID)) {
			result = true;
		}
	});
	return result;
}

function getVendorByStatus(statusId){
	if (!statusId){
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter statusId is not found",
				"vendorService/handleGet/getVendorByStatus", statusId);
	}
	return data.getVendorByStatus(statusId);
}

function getVendorByAccount(account) {
	if (!account) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter account is not found",
				"vendorService/handleGet/getVendorByAccount", account);
	}
	return data.getVendorByAccount(account);
}

function insertManualVendor(objVendor, userId) {
	var result = {};
	if(validateInsertVendor(objVendor, userId)){
		result = data.insertManualVendor(objVendor, userId); 
		if (objVendor.ENTITY_ID) {
			dataVE.insertManualVendorEntity(result, objVendor.ENTITY_ID, userId);	
		}
		return result;
	}
}

function insertVendor(objVendor, user_id) {
	objVendor.CREATED_USER_ID = user_id;
	var result = {};
		try{
			result = insertManualVendor(objVendor, user_id);			
			var contact_information = {};
			
			if(result){
				objVendor.VENDOR_ID = result;
				contact_information.VENDOR_ID = result;
				contact_information.NAME = objVendor.CONTACT_NAME;
				contact_information.PHONE = objVendor.CONTACT_PHONE;
				contact_information.EMAIL = objVendor.CONTACT_EMAIL;
				contact_information.DEFAULT_CONTACT_INFORMATION = 1; //The first contact is always the default.
				
				business_contact.insertVendorContactInformationManual(contact_information, user_id);
				insertVendorAdditionalInformation(objVendor, user_id);
				if(objVendor.VENDOR_ENTITIES){
					(objVendor.VENDOR_ENTITIES).forEach(function(entity){
						dataVE.insertManualVendorEntity(result, entity, user_id);				
					});
				} else {
					throw ErrorLib.getErrors().CustomError("", "vendorService/handlePost/inserVendor", "Vendor Entity not found");
				}
			}			

			dbHelper.commit();
		}
		catch(e){
			dbHelper.rollback();
			throw ErrorLib.getErrors().CustomError("", e.toString(),"insertVendor");
		}
		finally{
			dbHelper.closeConnection();
		}
	
	return result;
}

function completeVendor(item){ 
	item.ENTITIES = dataVE.getManualAllEntityByVendorId(item.VENDOR_ID);
}

function getVendorById(vendor_id, user_id) {
	validateVendorParameters(vendor_id, user_id);
	var ven = {};
	try{
		var vendor_result = data.getManualVendorById(vendor_id);
		if (vendor_result.VENDOR_ID) {
			ven = JSON.parse(JSON.stringify(vendor_result));
			completeVendor(ven);
		}
		dbHelper.commit();
	}
	catch(e){
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(),"insertVendor");
	}
	finally{
		dbHelper.closeConnection();
	}
	return ven;
}

function getManualVendorById(vendor_id) {
	return data.getManualVendorById(vendor_id);
}

function validateVendorParameters(vendor_id, user_id){
	if (!user_id){
		throw ErrorLib.getErrors().BadRequest(
				"",
				"vendorService/handleGet/getVendorById", "The Parameter user_id is not found");
	}
	if (!vendor_id){
		throw ErrorLib.getErrors().BadRequest(
				"",
				"vendorService/handleGet/getVendorById", "The Parameter vendor_id is not found");
	}
}
		
function insertVendorAdditionalInformation(objVendor, userId){
	if(validateInsertAdditionalInformation(objVendor, userId)){
		return data.insertManualVendorAdditionalInformation(objVendor, userId);
	}
}

function updateVendor(objVendor, user_id) {
	objVendor.MODIFIED_USER_ID = user_id;
	if (validateUpdateVendor(objVendor, user_id)) {
		var vendors = getManualVendorById(objVendor.VENDOR_ID, user_id);
		try{
			updateVendorEntity(objVendor, user_id);
			if(vendors.NAME !== objVendor.NAME){
				data.deleteManualVendorAdditionalInformation(objVendor, user_id);
				data.insertManualVendorAdditionalInformation(objVendor, user_id);
			}			
			var result = data.updateManualVendor(objVendor, user_id);
			dbHelper.commit();
			return result;
		} catch (e) {
			dbHelper.rollback();
			throw ErrorLib.getErrors().CustomError("", e.toString(),
					"updateVendor");
		} finally {
			dbHelper.closeConnection();
		}
	}
}

function updateManualVendor(objVendor, user_id) {
	objVendor.MODIFIED_USER_ID = user_id;
	if (validateUpdateVendor(objVendor, user_id)) {
		var vendors = getManualVendorById(objVendor.VENDOR_ID, user_id);
		if (!(vendors.length > 0)) {
			throw ErrorLib.getErrors().CustomError("",
					"vendorService/handlePut/updateManualVendor",
					"The object vendor does not exist", objVendor);
		}
		if (objVendor.VENDOR_ENTITIES){
			try{
				updateVendorEntity(objVendor, user_id);
				if(vendors[0].NAME !== objVendor.NAME){
					data.deleteManualVendorAdditionalInformation(objVendor, user_id);
					data.insertManualVendorAdditionalInformation(objVendor, user_id);
				}			
				return data.updateManualVendor(objVendor, user_id);
			} catch (e) {
				dbHelper.rollback();
				throw ErrorLib.getErrors().CustomError("", e.toString(),
					"updateManualVendor");
			}
		} else {
			return data.updateManualVendor(objVendor, user_id);
		}
	}
}

function updateVendorAccountManual(objVendor, userId){
	if(validateUpdateVendorAccount(objVendor, userId)){
		if(!existVendor(objVendor.VENDOR_ID)){
			throw ErrorLib.getErrors().CustomError("",
					"vendorService/handlePut/updateVendorAccount",
					"The vendor with the id \'" + objVendor.VENDOR_ID + "\' does not exist");
		}
		return data.updateVendorAccountManual(objVendor, userId);
	}
}

function updateVendorEntity(objVendor, userId){
	var entities = dataVE.getManualAllEntityByVendorId(objVendor.VENDOR_ID);	
	var updateEntities = objVendor.VENDOR_ENTITIES;
	var insertEntities = [];
	var deleteEntities = [];
	entities.forEach(function(entity) {
		var result = true;
		var entityId = entity.ENTITY_ID;
		if(typeof entity.ENTITY_ID === 'string'){
			entityId = Number(entity.ENTITY_ID);
		}
		updateEntities.forEach(function(updateEntity) {
			if (entityId === updateEntity) {
				result = false;
			}
		});
		if(result){
			deleteEntities.push(entityId);
		}
	});
	updateEntities.forEach(function(newEntity) {
		var result = true;
		entities.forEach(function(entity) {
			var entityId = entity.ENTITY_ID;
			if(typeof entityId === 'string'){
				entityId = Number(entity.ENTITY_ID);
			}
			if (newEntity === entityId) {
				result = false;
			}
		});
		if(result){
			insertEntities.push(newEntity);
		}
	});
	insertEntities.forEach(function(insertEntity) {
		dataVE.insertManualVendorEntity(objVendor.VENDOR_ID, insertEntity, userId);
	});
	deleteEntities.forEach(function(deleteEntity) {
		dataVE.deleteManualVendorEntityByVendorIdEntityId(objVendor.VENDOR_ID, deleteEntity, userId);
	});
}

function deleteVendor(objVendor, user_id) {
	validateVendorParameters(objVendor.VENDOR_ID, user_id);
	if (!existVendor(objVendor.VENDOR_ID, user_id)) {
		throw ErrorLib.getErrors().CustomError("",
				"vendorService/handlePut/insertVendor",
				"The object vendor does not exist", objVendor);
	}
	return data.deleteVendor(objVendor.VENDOR_ID, user_id);
}

function deleteManualVendor(objVendor, user_id) {
	validateVendorParameters(objVendor.VENDOR_ID, user_id);
	if (!existVendor(objVendor.VENDOR_ID, user_id)) {
		throw ErrorLib.getErrors().CustomError("",
				"vendorService/handlePut/insertVendor",
				"The object vendor does not exist", objVendor);
	}
	return data.deleteManualVendor(objVendor.VENDOR_ID, user_id);
}

function getAllVendorStatus(){
	return data.getAllVendorStatus();
}

function validateInsertVendor(objVendor, user_id) {

	if (!user_id){
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"vendorService/handlePost/insertVendor", user_id);
	}
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = ['ADDRESS_1', 'ADDRESS_2', 'CITY', 'STATE', 'ZIP', 'PHONE',
	            'FAX', 'LEGAL_NAME', 'INFORMAL_NAME', 'VENDOR_ACCOUNT', 'STATUS_ID' ];
	
	if(objVendor.VENDOR_ENTITY){
		keys.push('VENDOR_ENTITY');
	}
	if(objVendor.ENTITY_ID) {
		keys.push('ENTITY_ID');
	}

	if (!objVendor){
		throw ErrorLib.getErrors().CustomError("",
				"vendorService/handlePost/insertVendor",
				"The object vendor is not found");
	}
	try {
		keys.forEach(function(key) {
				// validate attribute type
				isValid = validateType(key, objVendor[key]);
				if (!isValid) {
					errors[key] = objVendor[key];
					throw BreakException;
				}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException){
			throw ErrorLib.getErrors().CustomError("",
					"vendorService/handlePost/insertVendor", e.toString());
		} else {
			throw ErrorLib.getErrors().CustomError("",
					"vendorService/handlePost/insertVendor",
					JSON.stringify(errors));
		}
	}
	
	return isValid;
}

function validateInsertAdditionalInformation(objVendor, userId){
	if (!userId) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter userId is not found",
				"vendorService/handlePost/insertVendorAdditionalInformation", userId);
	}
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ 'VENDOR_ID', 'NAME'];
	
	if (!objVendor) {
		throw ErrorLib.getErrors().CustomError("",
				"vendorService/handlePost/insertVendorAdditionalInformation",
				"The object vendor is not found");
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
		if (e !== BreakException){
			throw ErrorLib.getErrors().CustomError("",
					"vendorService/handlePost/insertVendorAdditionalInformation", e.toString());
		} else {
			throw ErrorLib.getErrors().CustomError("",
					"vendorService/handlePost/insertVendorAdditionalInformation",
					JSON.stringify(errors));
		}
	}
	return isValid;
}

function validateUpdateVendor(objVendor, user_id) {

	if (!user_id){
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"vendorService/handlePut/updateVendor", user_id);
	}
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ 'VENDOR_ID', 'ADDRESS_1', 'CITY', 'STATE', 'ZIP', 'PHONE',
			'FAX', 'LEGAL_NAME', 'ADDRESS_2', 'INFORMAL_NAME'];
	
	if(objVendor.VENDOR_ENTITY){
		keys.push('VENDOR_ENTITY');
	}
	if(objVendor.ENTITY_ID) {
		keys.push('ENTITY_ID');
	}

	if (!objVendor){
		throw ErrorLib.getErrors().CustomError("",
				"vendorService/handlePut/updateVendor",
				"The object vendor is not found");
	}
	try {
		keys.forEach(function(key) {
				// validate attribute type
				isValid = validateType(key, objVendor[key]);
				if (!isValid) {
					errors[key] = objVendor[key];
					throw BreakException;
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException){
			throw ErrorLib.getErrors().CustomError("",
					"vendorService/handlePut/updateVendor", e.toString());
		} else {
			throw ErrorLib.getErrors().CustomError("",
					"vendorService/handlePut/updateVendor",
					JSON.stringify(errors));
		}
	}
	
	return isValid;
}

function validateUpdateVendorAccount(objVendor, userId) {
	if (!userId) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter userId is not found",
				"vendorService/handlePut/updateVendorAccount", userId);
	}
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ 'VENDOR_ID', 
			'VENDOR_ACCOUNT' ];
	
	if (!objVendor) {
		throw ErrorLib.getErrors().CustomError("",
				"vendorService/handlePut/updateVendorAccount",
				"The object vendor is not found");
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
		if (e !== BreakException){
			throw ErrorLib.getErrors().CustomError("",
					"vendorService/handlePut/updateVendorAccount", e.toString());
		} else {
			throw ErrorLib.getErrors().CustomError("",
					"vendorService/handlePut/updateVendorAccount",
					JSON.stringify(errors));
		}
	}
	return isValid;
}

// Check data types
function validateType(key, value) {
	var valid = true;
	switch (key) {
	case 'VENDOR_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'ADDRESS_1':
		valid = (!value) || (value.length > 0 && value.length <= 255);
		break;
	case 'ADDRESS_2':
		valid = (!value) || (value.length > 0 && value.length <= 255);
		break;
	case 'CITY':
		valid = (!value) || (value.length > 0 && value.length <= 255);
		break;
	case 'STATE':
		valid = (!value) || (value.length > 0 && value.length <= 255);
		break;
	case 'ZIP':
		valid = (!value) || (value.length > 0 && value.length <= 255);
		break;
	case 'PHONE':
		valid = (!value) || (value.length > 0 && value.length <= 255);
		break;
	case 'FAX':
		valid = (!value) || (value.length > 0 && value.length <= 255);
		break;
	case 'LEGAL_NAME':
		valid = (!value) || (value.length > 0 && value.length <= 511);
		break;
	case 'INFORMAL_NAME':
		valid = (!value) || (value.length > 0 && value.length <= 511);
		break;
	case 'VENDOR_ENTITIES':
		valid = Array.isArray(value) && value.length > 0;
		break;
	case 'VENDOR_ACCOUNT':
		valid = (!value) || (value.length > 0 && value.length <= 255);
		break;
	case 'ENTITY_ID':
		valid = (!value) || (!isNaN(value) && value > 0);
		break;
	case 'STATUS_ID':
		valid = (!value) || (!isNaN(value) && value > 0);
		break;
	case 'NAME':
		valid = value.length > 0 && value.length <= 255;
		break;
	}
	return valid;
}

function existVendor(vendorId){
	return getManualVendorById(vendorId).length > 0;
}
