$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataTemplate = mapper.getDataTemplateType();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

// Insert template
function insertTemplateType(objTemplate, userId) {
	if (validateInsertTemplateType(objTemplate, userId)) {
		return dataTemplate.insertTemplateType(objTemplate, userId);
	}
}

// Get template by ID
function getTemplateTypeById(templateTypeId, userId) {
	validateTemplateTypeParameters(templateTypeId, userId);
	return dataTemplate.getTemplateTypeById(templateTypeId);
}

function getManualTemplateTypeById(templateTypeId, userId) {
	validateTemplateTypeParameters(templateTypeId, userId);
	return dataTemplate.getManualTemplateTypeById(templateTypeId);
}

function validateTemplateTypeParameters(templateTypeId, userId) {
	if (!templateTypeId) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter templateId is not found",
				"templateTypeService/handleGet/getTemplateTypeById",
				templateTypeId);
	}
	if (!userId) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter userId is not found",
				"templateTypeService/handleGet/getTemplateTypeById", userId);
	}
}

// Get all template
function getAllTemplateType() {
	return dataTemplate.getAllTemplateType();
}

// Update template
function updateTemplateType(objTemplate, userId) {
	var servicePath = "templateTypeService/handleUpdate/updateTemplateType";
	if (validateUpdateTemplate(objTemplate, userId)) {
		if (!existTemplateType(objTemplate.TEMPLATE_TYPE_ID, userId)) {
			throw ErrorLib.getErrors().CustomError("", servicePath,
					"The object TemplateType doesn't exist");
		}
		return dataTemplate.updateTemplateType(objTemplate, userId);
	}
}

// Delete template
function deleteTemplateType(objTemplate, userId) {
	var servicePath = "templateTypeService/handleDelete/deleteTemplateType";
	validateTemplateTypeParameters(templateTypeId, userId);
	if (!existTemplateType(objTemplate.TEMPLATE_TYPE_ID, userId)) {
		throw ErrorLib.getErrors().CustomError("", servicePath,
				"The object TemplateType doesn't exist");
	}

	return dataTemplate.deleteTemplateType(objTemplate, userId);
}

// Check if the request exists
function existTemplateType(templateId, userId) {
	return getManualTemplateTypeById(templateId, userId).length > 0;
}

function validateInsertTemplateType(objTemplate, userId) {
	var servicePath = "templateTypeService/handlePost/insertTemplateType";
	if (!userId) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter userId is not found", servicePath, userId);
	}
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ 'NAME', ];

	if (!objTemplate) {
		throw ErrorLib.getErrors().CustomError("", servicePath,
				"The object TemplateType is not found");
	}

	try {
		keys.forEach(function(key) {
			if (objTemplate[key] === null || objTemplate[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objTemplate[key]);
				if (!isValid) {
					errors[key] = objTemplate[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException) {
			throw ErrorLib.getErrors().CustomError("", servicePath,
					e.toString());
		} else {
			throw ErrorLib.getErrors().CustomError("", servicePath,
					JSON.stringify(errors));
		}
	}
	return isValid;
}

function validateUpdateTemplate(objTemplate, userId) {
	var servicePath = "templateTypeService/handlePut/updateTemplateType";
	if (!userId) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter userId is not found", servicePath, userId);
	}
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ 'TEMPLATE_TYPE_ID', 'NAME' ];

	if (!objTemplate) {
		throw ErrorLib.getErrors().CustomError("", servicePath,
				"The object Template is not found");
	}

	try {
		keys.forEach(function(key) {
			if (objTemplate[key] === null || objTemplate[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objTemplate[key]);
				if (!isValid) {
					errors[key] = objTemplate[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException) {
			throw ErrorLib.getErrors().CustomError("", servicePath,
					e.toString());
		} else {
			throw ErrorLib.getErrors().CustomError("", servicePath,
					JSON.stringify(errors));
		}
	}
	return isValid;
}

// Check data types
function validateType(key, value) {
	var valid = true;
	switch (key) {
	case 'TEMPLATE_TYPE_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'NAME':
		valid = value.length > 0 && value.length <= 255;
		break;
	}
	return valid;
}