$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataTemplate = mapper.getDataTemplate();
var dataTemplateType = mapper.getDataTemplateType();
var dataTemplateSection = mapper.getDataTemplateSection(); 
var dbHelper = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

// Insert template
function insertTemplate(objTemplate, userId) {
	if (validateInsertTemplate(objTemplate, userId)) {
		if (!existTemplateType(objTemplate.TEMPLATE_TYPE_ID)) {
			throw ErrorLib.getErrors().CustomError("",
					"templateService/handlePost/insertTemplate",
					"The object TemplateType doesn't exist");
		}
		if (!existTemplateSection(objTemplate.SECTION_ID)) {
			throw ErrorLib.getErrors().CustomError("",
					"templateService/handlePost/insertTemplate",
					"The object TemplateSection doesn't exist");
		}
		return dataTemplate.insertTemplate(objTemplate, userId);
	}
}

// Get template by ID
function getTemplateById(templateId, userId) {
	validateTemplateParameters(templateId, userId);
	return dataTemplate.getTemplateById(templateId);
}

function getManualTemplateById(templateId) {
	return dataTemplate.getManualTemplateById(templateId);
}

// Get all template
function getAllTemplate() {
	return dataTemplate.getTemplate();
}

function getAllTemplateByParentAndSection(objRequest, userId) {
	return dataTemplate.getAllTemplateByParentAndSection(objRequest);
}

// Get template by Type ID
function getTemplateByTypeId(typeId) {
	return dataTemplate.getTemplateByTypeId(typeId);
}

// Update template
function updateTemplate(objTemplate, userId) {
	validateTemplateParameters(objTemplate.TEMPLATE_ID, userId);
	if (validateUpdateTemplate(objTemplate, userId)) {
		if (!existTemplate(objTemplate.TEMPLATE_ID)) {
			throw ErrorLib.getErrors().CustomError("",
					"templateService/handlePut/updateTemplate",
					"The object Template doesn't exist");
		}
		if (!existTemplateType(objTemplate.TEMPLATE_TYPE_ID)) {
			throw ErrorLib.getErrors().CustomError("",
					"templateService/handlePut/updateTemplate",
					"The object TemplateType doesn't exist");
		}
		if (!existTemplateSection(objTemplate.SECTION_ID)) {
			throw ErrorLib.getErrors().CustomError("",
					"templateService/handlePut/updateTemplate",
					"The object TemplateSection doesn't exist");
		}
		return dataTemplate.updateTemplate(objTemplate, userId);
	}
}

// Delete template
function deleteTemplate(objTemplate, userId) {
	validateTemplateParameters(objTemplate.TEMPLATE_ID, userId);
	if (!existTemplate(objTemplate.TEMPLATE_ID)) {
		throw ErrorLib.getErrors().CustomError("",
				"templateService/handleDelete/deleteTemplate",
				"The object Template doesn't exist");
	}
	return dataTemplate.deleteTemplate(objTemplate, userId);
}

function deleteSelectedTemplate(reqObj, userId){
	try{
		if(reqObj.TEMPLATE_LIST && reqObj.TEMPLATE_LIST.length >0){
			reqObj.TEMPLATE_LIST.forEach(function(template){
				deleteManualTemplate(template,userId);
			});
		}
		dbHelper.commit();
	} catch(e){
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(),"deleteTemplate");
	}
	finally{
		dbHelper.closeConnection();
	}
	return {};
}

function deleteManualTemplate(objTemplate, userId) {
	validateTemplateParameters(objTemplate.TEMPLATE_ID, userId);
	if (!existTemplate(objTemplate.TEMPLATE_ID)) {
		throw ErrorLib.getErrors().CustomError("",
				"templateService/handleDelete/deleteTemplate",
				"The object Template doesn't exist");
	}
	return dataTemplate.deleteManualTemplate(objTemplate, userId);
}

function validateTemplateParameters(templateId, userId) {
	if (!templateId) {
		throw ErrorLib.getErrors().CustomError("", "templateService",
				"The TEMPLATE_ID is not found");
	}
	if (!userId) {
		throw ErrorLib.getErrors().CustomError("", "templateService",
				"The userId is not found");
	}
}

// Check if the request exists
function existTemplate(templateId) {
	return getManualTemplateById(templateId).length > 0;
}

function existTemplateType(typeId) {
	return dataTemplateType.getManualTemplateTypeById(typeId).length > 0;
}

function existTemplateSection(sectionId) {
	return dataTemplateSection.getManualTemplateSectionById(sectionId).length > 0;
}

function validateInsertTemplate(objTemplate, userId) {
	if (!userId) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter userId is not found",
				"templateService/handlePut/insertTemplate", userId);
	}
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ 'TEMPLATE_PARENT_ID', 'NAME', 'TEMPLATE_ORDER', 'DESCRIPTION',
			'SECTION_ID' ];

	if (!objTemplate) {
		throw ErrorLib.getErrors().CustomError("",
				"templateService/handlePost/insertTemplate",
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
			throw ErrorLib.getErrors().CustomError("",
					"templateService/handlePost/insertTemplate", e.toString());
		} else {
			throw ErrorLib.getErrors().CustomError("",
					"templateService/handlePost/insertTemplate",
					JSON.stringify(errors));
		}
	}
	return isValid;
}

function validateUpdateTemplate(objTemplate, userId) {
	if (!userId) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter userId is not found",
				"templateService/handlePut/updateTemplate", userId);
	}
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ 'TEMPLATE_ID', 'TEMPLATE_TYPE_ID',
			'TEMPLATE_PARENT_ID', 'NAME', 'TEMPLATE_ORDER',
			'DESCRIPTION', 'SECTION_ID' ];

	if (!objTemplate) {
		throw ErrorLib.getErrors().CustomError("",
				"templateService/handlePut/updateTemplate",
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
			throw ErrorLib.getErrors().CustomError("",
					"templateService/handlePut/updateTemplate", e.toString());
		} else {
			throw ErrorLib.getErrors().CustomError("",
					"templateService/handlePut/updateTemplate",
					JSON.stringify(errors));
		}
	}
	return isValid;
}

// Check data types
function validateType(key, value) {
	var valid = true;
	switch (key) {
	case 'TEMPLATE_PARENT_ID':
		valid = !isNaN(value) && value > -1;
		break;
	case 'NAME':
		valid = value.length > 0 && value.length <= 2048;
		break;
	case 'LINK':
		valid = value.length > 0 && value.length <= 2048;
		break;
	case 'TEMPLATE_ORDER':
		valid = !isNaN(value) && value > 0;
		break;
	case 'CREATED_USER_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'DESCRIPTION':
		valid = value.length > 0 && value.length <= 1000;
		break;
	case 'TEMPLATE_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'TEMPLATE_TYPE_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'SECTION_ID':
		valid = !isNaN(value) && value > 0;
		break;
	}
	return valid;
}