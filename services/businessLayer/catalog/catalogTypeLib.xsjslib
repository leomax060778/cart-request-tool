$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataCatalogType = mapper.getDataCatalogType();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

// Insert Catalog
function insertCatalogType(objCatalog, userId) {
	if (validateInsertCatalogType(objCatalog, userId)) {
		return dataCatalogType.insertCatalogType(objCatalog, userId);
	}
}

// Get Catalog by ID
function getCatalogTypeById(catalogTypeId, userId) {
	validateCatalogTypeParams(catalogTypeId, userId);
	return dataCatalogType.getCatalogTypeById(catalogTypeId);
}

function getManualCatalogTypeById(catalogTypeId) {
	return dataCatalogType.getCatalogTypeManual(catalogTypeId);
}

// Get all Catalog
function getAllCatalogType() {
	return dataCatalogType.getAllCatalogType();
}

// Update Catalog
function updateCatalogType(objCatalog, userId) {
	validateCatalogTypeParams(objCatalog.CATALOG_TYPE_ID, userId);
	if (validateUpdateCatalogType(objCatalog, userId)) {
		if (!existCatalogType(objCatalog.CATALOG_TYPE_ID)) {
			throw ErrorLib.getErrors().CustomError("",
					"catalogTypeService/handlePut/updateCatalogType",
					"The object Catalog Type doesn't exists");
		}
		return dataCatalogType.updateCatalogType(objCatalog, userId);
	}
}

// Delete Catalog
function deleteCatalogType(objCatalog, userId) {
	validateCatalogTypeParams(objCatalog.CATALOG_TYPE_ID, userId);
	if (!existCatalogType(objCatalog.CATALOG_TYPE_ID)) {
		throw ErrorLib.getErrors().CustomError("",
				"catalogTypeService/handlePost/insertCatalogType",
				"The object Catalog Type doesn't exists");
	}
	return dataCatalogType.deleteCatalogType(objCatalog, userId);
}

// Check if the request exists
function existCatalogType(catalogTypeId) {
	return getManualCatalogTypeById(catalogTypeId).length > 0;
}

function validateInsertCatalogType(objCatalog, userId) {
	if (!userId) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter userId is not found",
				"catalogTypeService/handlePut/insertCatalogType", userId);
	}
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ 'NAME' ];

	if (!objCatalog) {
		throw ErrorLib.getErrors().CustomError("",
				"catalogTypeService/handlePost/insertCatalogType",
				"The object Catalog is not found");
	}

	try {
		keys.forEach(function(key) {
			if (objCatalog[key] === null || objCatalog[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objCatalog[key]);
				if (!isValid) {
					errors[key] = objCatalog[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException) {
			throw ErrorLib.getErrors().CustomError("",
					"catalogTypeService/handlePost/insertCatalogType",
					e.toString());
		} else {
			throw ErrorLib.getErrors().CustomError("",
					"catalogTypeService/handlePost/insertCatalogType",
					JSON.stringify(errors));
		}
	}
	return isValid;
}

function validateUpdateCatalogType(objCatalog, userId) {
	if (!userId) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter userId is not found",
				"catalogTypeService/handlePut/updateCatalogType", userId);
	}
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ 'CATALOG_TYPE_ID', 'NAME' ];

	if (!objCatalog) {
		throw ErrorLib.getErrors().CustomError("",
				"catalogTypeService/handlePut/updateCatalogType",
				"The object Catalog is not found");
	}

	try {
		keys.forEach(function(key) {
			if (objCatalog[key] === null || objCatalog[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objCatalog[key]);
				if (!isValid) {
					errors[key] = objCatalog[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException) {
			throw ErrorLib.getErrors().CustomError("",
					"catalogTypeService/handlePut/updateCatalogType",
					e.toString());
		} else {
			throw ErrorLib.getErrors().CustomError("",
					"catalogTypeService/handlePut/updateCatalogType",
					JSON.stringify(errors));
		}
	}
	return isValid;
}

// Check data types
function validateType(key, value) {
	var valid = true;
	switch (key) {
	case 'CATALOG_TYPE_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'NAME':
		valid = (value.length >= 0 && value.length <= 1000) || (!value);
		break;
	}
	return valid;
}

function validateCatalogTypeParams(catalogTypeId, userId) {
	if (!catalogTypeId) {
		throw ErrorLib.getErrors().CustomError("",
				"catalogTypeService/handleUpdate/updateCatalogType",
				"The catalogTypeId is not found");
	}
	if (!userId) {
		throw ErrorLib.getErrors().CustomError("",
				"catalogTypeService/handleUpdate/updateCatalogType",
				"The userId is not found");
	}
}