$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var data = mapper.getDataEntity();
var ErrorLib = mapper.getErrors();

function getEntity() {
	return data.getAllEntity();
}

function insertEntity(objEntity, user_id) {
	if (validateInsertEntity(objEntity, user_id)) {
		return data.insertEntity(objEntity, user_id);
	}
}
function getEntityById(entity_id, user_id) {
	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"entityService/handleGet/getEntityById", user_id);
	if (!entity_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter entity_id is not found",
				"entityService/handleGet/getEntityById", entity_id);

	return data.getEntityById(entity_id);
}

function updateEntity(objEntity, user_id) {
	if (validateUpdateEntity(objEntity, user_id)) {
		if (!existEntity(objEntity.ENTITY_ID, user_id)) {
			throw ErrorLib.getErrors().CustomError("",
					"entityService/handlePut/updateEntity",
					"The object Entity doesn't exist");
		} else {
			return data.updateEntity(objEntity, user_id);
		}
	}
}

function deleteEntity(entity_id, user_id) {
	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"entityService/handleDelete/deleteEntity", user_id);
	if (!entity_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter entity_id is not found",
				"entityService/handleDelete/deleteEntity", entity_id);
	if (!existEntity(entity_id, user_id)) {
		throw ErrorLib.getErrors().CustomError("",
				"entityService/handleDelete/deleteEntity",
				"The object Entity doesn't exist");
	}

	return data.deleteEntity(entity_id, user_id);
}

function validateInsertEntity(objEntity, user_id) {

	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"entityService/handlePost/insertEntity", user_id);

	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ 'ENTITY_NAME', 'SALES_ORG', 'COST_CENTER', 'ENTITY_POSITION' ];

	if (!objEntity)
		throw ErrorLib.getErrors().CustomError("",
				"entityService/handlePost/insertEntity",
				"The object Request is not found");

	try {
		keys.forEach(function(key) {
			if (objEntity[key] === null || objEntity[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objEntity[key])
				if (!isValid) {
					errors[key] = objEntity[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("",
					"entityService/handlePost/insertEntity", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("",
					"entityService/handlePost/insertEntity",
					JSON.stringify(errors));
	}
	return isValid;
}

function validateUpdateEntity(objEntity, user_id) {

	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"entityService/handlePut/updateEntity", user_id);

	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ 'ENTITY_ID', 'ENTITY_NAME', 'SALES_ORG', 'COST_CENTER',
			'ENTITY_POSITION' ];

	if (!objEntity)
		throw ErrorLib.getErrors().CustomError("",
				"entityService/handlePut/updateEntity",
				"The object Request is not found");

	try {
		keys.forEach(function(key) {
			if (objEntity[key] === null || objEntity[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objEntity[key])
				if (!isValid) {
					errors[key] = objEntity[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("",
					"entityService/handlePut/updateEntity", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("",
					"entityService/handlePut/updateEntity",
					JSON.stringify(errors));
	}
	return isValid;
}

// Check data types
function validateType(key, value) {
	var valid = true;
	switch (key) {
	case 'ENTITY_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'ENTITY_NAME':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'SALES_ORG':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'COST_CENTER':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'ENTITY_POSITION':
		valid = !isNaN(value);
		break;
	case 'CREATED_USER_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'MODIFIED_USER_ID':
		valid = !isNaN(value) && value > 0;
		break;
	}
	return valid;
}

function existEntity(entityId, userId) {
	return getEntityById(entityId, userId).length > 0;
}
