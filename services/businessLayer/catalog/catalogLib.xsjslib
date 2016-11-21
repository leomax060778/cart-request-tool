$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataCatalog = mapper.getDataCatalog();
var dataMaterial = mapper.getDataMaterial();
var dbHelper = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//Insert catalog
function insertCatalog(objCatalog, userId) {
    if (validateInsertCatalog(objCatalog, userId)) {
        return dataCatalog.insertCatalog(objCatalog, userId);
    }
}

//Get catalog by ID
function getCatalogById(catalogId) {
    if (!catalogId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter catalogId is not found", "catalogService/handleGet/getCatalogById", catalogId);
    }
    return dataCatalog.getCatalogById(catalogId);
}

//Get catalog by Parent ID
function getCatalogByParentId(catalogId) {
    if (!catalogId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter catalogId is not found", "catalogService/handleGet/getCatalogByParentId", catalogId);
    }
    return dataCatalog.getCatalogByParentId(catalogId);
}

//Get catalog by ID manually
function getCatalogByIdManual(catalogId) {
    if (!catalogId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter catalogId is not found", "catalogService/handleGet/getCatalogById", catalogId);
    }
    return dataCatalog.getCatalogByIdManual(catalogId);
}

//Get all catalog
function getAllCatalog() {
    return dataCatalog.getAllCatalog();
}

//Update catalog
function updateCatalog(objCatalog, userId) {
    if (validateUpdateCatalog(objCatalog, userId)) {
        if (!existCatalog(objCatalog.CATALOG_ID)) {
            throw ErrorLib.getErrors().CustomError("", "layoutSectionService/handleDelete/updateCatalog", "The object CATALOG_ID " + objCatalog.CATALOG_ID + " does not exist");
        }
        return dataCatalog.updateCatalog(objCatalog, userId);
    }
}

//Delete catalog
function deleteCatalog(objCatalog, userId) {
    if (!objCatalog.CATALOG_ID) {
        throw ErrorLib.getErrors().CustomError("", "catalogService/handlePost/deleteCatalog", "The CATALOG_ID is not found");
    }
    if (!existCatalog(objCatalog.CATALOG_ID)) {
        throw ErrorLib.getErrors().CustomError("", "layoutSectionService/handleDelete/updateCatalog", "The object CATALOG_ID " + objCatalog.CATALOG_ID + " does not exist");
    }
    try {
	    var catalogs = dataCatalog.getAllCatalogByParentId(objCatalog.CATALOG_ID, userId);
	    var materials = dataMaterial.getManualMaterialByCatalogId(objCatalog.CATALOG_ID);
		if(catalogs.length > 0){
			(catalogs).forEach(function(catalog){
				deleteCatalog(catalog, userId);
			});
		}
		if(materials.length > 0){
			(materials).forEach(function(material){
				dataMaterial.deleteMaterial(material.MATERIAL_ID, userId);
			});
		}
	    var result = dataCatalog.deleteCatalogManual(objCatalog, userId);
	    dbHelper.commit();
	    return result;
	} catch(e){
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(),"getAllRequest");
	} finally{
		dbHelper.closeConnection();
	}
}

//Check if the request exists
function existCatalog(catalogId) {
    return getCatalogByIdManual(catalogId).length > 0;
}

function validateInsertCatalog(objCatalog, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "catalogService/handlePut/insertCatalog", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'NAME',
        'CATALOG_TYPE_ID',
        'CATALOG_PARENT_ID'
    ];

    if (!objCatalog) {
        throw ErrorLib.getErrors().CustomError("", "catalogService/handlePost/insertCatalog", "The object Catalog is not found");
    }

    try {
        keys.forEach(function (key) {
            if ((objCatalog[key] === null || objCatalog[key] === undefined) && key !== 'CATALOG_PARENT_ID') {
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
            throw ErrorLib.getErrors().CustomError("", "catalogService/handlePost/insertCatalog", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "catalogService/handlePost/insertCatalog", JSON.stringify(errors));
        }
    }
    return isValid;
}

function validateUpdateCatalog(objCatalog, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "catalogService/handlePut/updateCatalog", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'CATALOG_ID',
        'NAME',
        'CATALOG_TYPE_ID',
        'CATALOG_PARENT_ID'];

    if (!objCatalog) {
        throw ErrorLib.getErrors().CustomError("", "catalogService/handlePut/updateCatalog", "The object Catalog is not found");
    }

    try {
        keys.forEach(function (key) {
            if ((objCatalog[key] === null || objCatalog[key] === undefined) && key !== 'CATALOG_PARENT_ID') {
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
            throw ErrorLib.getErrors().CustomError("", "catalogService/handlePut/updateCatalog", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "catalogService/handlePut/updateCatalog", JSON.stringify(errors));
        }
    }
    return isValid;
}

//Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'CATALOG_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'NAME':
            valid = value.length > 0 && value.length <= 255;
            break;
        case 'CATALOG_TYPE_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'CATALOG_PARENT_ID':
            valid = (!isNaN(value) && value > 0) || (!value);
            break;
    }
    return valid;
}