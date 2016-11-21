$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataSection = mapper.getDataLayoutSection();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//Insert layout section
function insertLayoutSection(objLayoutSection, userId) {
    if (validateInsertLayoutSection(objLayoutSection, userId)) {
        return dataSection.insertLayoutSection(objLayoutSection, userId);
    }
}

//Get layout section by ID
function getLayoutSectionById(layoutSectionId) {
    if (!layoutSectionId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter layoutSectionId is not found", "layoutSectionService/handleGet/getLayoutSectionById", layoutSectionId);
    }
    return dataSection.getLayoutSectionById(layoutSectionId);
}

//Get layout section by ID manually
function getLayoutSectionByIdManual(layoutSectionId) {
  if (!layoutSectionId) {
      throw ErrorLib.getErrors().BadRequest("The Parameter layoutSectionId is not found", "layoutSectionService/handleGet/getLayoutSectionById", layoutSectionId);
  }
  return dataSection.getLayoutSectionByIdManual(layoutSectionId);
}

//Get all layout section
function getAllLayoutSection() {
    return dataSection.getAllLayoutSection();
}

//Update layout section
function updateLayoutSection(objLayoutSection, userId) {
    if (validateUpdateLayoutSection(objLayoutSection, userId)) {
        if (!existLayoutSection(objLayoutSection.LAYOUT_SECTION_ID)) {
            throw ErrorLib.getErrors().CustomError("", "layoutSectionService/handleDelete/updateLayoutSection", "The object LAYOUT_SECTION_ID " + objLayoutSection.LAYOUT_SECTION_ID + " does not exist");
        } else {
            return dataSection.updateLayoutSection(objLayoutSection, userId);
        }
    }
}

//Delete layout section
function deleteLayoutSection(objLayoutSection, userId) {
    if (!objLayoutSection.LAYOUT_SECTION_ID) {
        throw ErrorLib.getErrors().CustomError("", "layoutSectionService/handleDelete/deleteLayoutSection", "The LAYOUT_SECTION_ID is not found");
    }
    if (!existLayoutSection(objLayoutSection.LAYOUT_SECTION_ID)) {
        throw ErrorLib.getErrors().CustomError("", "layoutSectionService/handleDelete/updateLayoutSection", "The object LAYOUT_SECTION_ID " + objLayoutSection.LAYOUT_SECTION_ID + " does not exist");
    }
    return dataSection.deleteLayoutSection(objLayoutSection, userId);
}

//Check if the inquiry exists
function existLayoutSection(layoutSectionId) {
    return getLayoutSectionByIdManual(layoutSectionId).length > 0;
}

function validateInsertLayoutSection(objLayoutSection, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "layoutSectionService/handlePut/insertLayoutSection", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'BLOCK_TYPE',
        'BLOCK_CONTENT'
    ];

    if (!objLayoutSection) {
        throw ErrorLib.getErrors().CustomError("", "layoutSectionService/handlePost/insertLayoutSection", "The object LayoutSection is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objLayoutSection[key] === null || objLayoutSection[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objLayoutSection[key]);
                if (!isValid) {
                    errors[key] = objLayoutSection[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "layoutSectionService/handlePost/insertLayoutSection", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "layoutSectionService/handlePost/insertLayoutSection", JSON.stringify(errors));
        }
    }
    return isValid;
}

function validateUpdateLayoutSection(objLayoutSection, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "layoutSectionService/handlePut/updateLayoutSection", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'LAYOUT_SECTION_ID',
        'BLOCK_TYPE',
        'BLOCK_CONTENT'
    ];

    if (!objLayoutSection) {
        throw ErrorLib.getErrors().CustomError("", "layoutSectionService/handlePut/updateLayoutSection", "The object LayoutSection is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objLayoutSection[key] === null || objLayoutSection[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objLayoutSection[key]);
                if (!isValid) {
                    errors[key] = objLayoutSection[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "layoutSectionService/handlePut/updateLayoutSection", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "layoutSectionService/handlePut/updateLayoutSection", JSON.stringify(errors));
        }
    }
    return isValid;
}

//Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'BLOCK_TYPE':
            valid = value.length > 0 && value.length <= 255;
            break;
        case 'BLOCK_CONTENT':
            valid = value.length > 0 && value.length <= 1000;
            break;
        case 'LAYOUT_SECTION_ID':
            valid = !isNaN(value) && value > 0;
            break;
    }
    return valid;
}