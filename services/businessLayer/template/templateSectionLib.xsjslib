$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataSection = mapper.getDataTemplateSection();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

// Insert template section
function insertTemplateSection(objTemplateSection, userId) {
	if (validateInsertTemplateSection(objTemplateSection, userId)) {
		return dataSection.insertTemplateSection(objTemplateSection, userId);
	}
}

// Get template section by ID
function getTemplateSectionById(templateSectionId, userId) {
	validateSectionParameters(templateSectionId, userId);
	return dataSection.getTemplateSectionById(templateSectionId);
}

function getManualTemplateSectionById(templateSectionId, userId) {
	validateSectionParameters(templateSectionId, userId);
	return dataSection.getManualTemplateSectionById(templateSectionId);
}

// Get all template section
function getAllTemplateSection() {
	return dataSection.getAllTemplateSection();
}

// Update template section
function updateTemplateSection(objTemplateSection, userId) {
	validateSectionParameters(objTemplateSection.SECTION_ID, userId);
	if (validateUpdateTemplateSection(objTemplateSection, userId)) {
		if (!existTemplateSection(objTemplateSection.SECTION_ID, userId)) {
			throw ErrorLib.getErrors().CustomError("",
					"templateSectionService/handlePut/updateTemplateSection",
					"The object TemplateSection doesn't exist");
		}
		return dataSection.updateTemplateSection(objTemplateSection, userId);
	}
}

// Delete template section
function deleteTemplateSection(objTemplateSection, userId) {
	validateSectionParameters(objTemplateSection.SECTION_ID, userId);
	if (!existTemplateSection(objTemplateSection.SECTION_ID, userId)) {
		throw ErrorLib.getErrors().CustomError("",
				"templateSectionService/handlePut/updateTemplateSection",
				"The object TemplateSection doesn't exist");
	}
	return dataSection.deleteTemplateSection(objTemplateSection, userId);
}

// Check if the request exists
function existTemplateSection(templateSectionId, userId) {
	return getManualTemplateSectionById(templateSectionId, userId).length > 0;
}

function validateSectionParameters(templateSectionId, userId) {
	var servicePath = "templateSectionService/handleGet/getTemplateSectionById";
	if (!templateSectionId) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter templateSectionId is not found",
				servicePath,
				"The Parameter templateSectionId is not found");
	}
	if (!userId) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter userId is not found",
				servicePath,
				"The Parameter userId is not found");
	}
}

function validateInsertTemplateSection(objTemplateSection, userId) {
	if (!userId) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter userId is not found",
				"templateSectionService/handlePut/insertTemplateSection",
				userId);
	}
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ 'NAME'];

	if (!objTemplateSection) {
		throw ErrorLib.getErrors().CustomError("",
				"templateSectionService/handlePost/insertTemplateSection",
				"The object TemplateSection is not found");
	}

	try {
		keys.forEach(function(key) {
			if (objTemplateSection[key] === null
					|| objTemplateSection[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objTemplateSection[key]);
				if (!isValid) {
					errors[key] = objTemplateSection[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException) {
			throw ErrorLib.getErrors().CustomError("",
					"templateSectionService/handlePost/insertTemplateSection",
					e.toString());
		} else {
			throw ErrorLib.getErrors().CustomError("",
					"templateSectionService/handlePost/insertTemplateSection",
					JSON.stringify(errors));
		}
	}
	return isValid;
}

function validateUpdateTemplateSection(objTemplateSection, userId) {
	if (!userId) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter userId is not found",
				"templateSectionService/handlePut/updateTemplateSection",
				userId);
	}
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ 'SECTION_ID', 'NAME' ];

	if (!objTemplateSection) {
		throw ErrorLib.getErrors().CustomError("",
				"templateSectionService/handlePut/updateTemplateSection",
				"The object TemplateSection is not found");
	}

	try {
		keys.forEach(function(key) {
			if (objTemplateSection[key] === null
					|| objTemplateSection[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objTemplateSection[key]);
				if (!isValid) {
					errors[key] = objTemplateSection[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException) {
			throw ErrorLib.getErrors().CustomError("",
					"templateSectionService/handlePut/updateTemplateSection",
					e.toString());
		} else {
			throw ErrorLib.getErrors().CustomError("",
					"templateSectionService/handlePut/updateTemplateSection",
					JSON.stringify(errors));
		}
	}
	return isValid;
}

// Check data types
function validateType(key, value) {
	var valid = true;
	switch (key) {
	case 'NAME':
		valid = value.length > 0 && value.length <= 2048;
		break;
	case 'CREATED_USER_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'SECTION_ID':
		valid = !isNaN(value) && value > 0;
		break;
	}
	return valid;
}