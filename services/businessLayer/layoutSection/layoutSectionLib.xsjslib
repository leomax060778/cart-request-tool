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
        throw ErrorLib.getErrors().BadRequest("The Parameter layoutSectionId is not found", "", layoutSectionId);
    }
    return dataSection.getLayoutSectionById(layoutSectionId);
}

//Get layout section by ID manually
function getLayoutSectionByIdManual(layoutSectionId) {
  if (!layoutSectionId) {
      throw ErrorLib.getErrors().BadRequest("The Parameter layoutSectionId is not found", "", layoutSectionId);
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
            throw ErrorLib.getErrors().CustomError("", "", "The object LAYOUT_SECTION_ID " + objLayoutSection.LAYOUT_SECTION_ID + " does not exist");
        } else {
            return dataSection.updateLayoutSection(objLayoutSection, userId);
        }
    }
}

//Check if the inquiry exists
function existLayoutSection(layoutSectionId) {
    return getLayoutSectionByIdManual(layoutSectionId).length > 0;
}

function validateInsertLayoutSection(objLayoutSection, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'NAME',
        'CONTENT'
    ];

    if (!objLayoutSection) {
        throw ErrorLib.getErrors().CustomError("", "", "The object LayoutSection is not found");
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
            throw ErrorLib.getErrors().CustomError("", "", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "", JSON.stringify(errors));
        }
    }
    return isValid;
}

function validateUpdateLayoutSection(objLayoutSection, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'LAYOUT_SECTION_ID',
        'CONTENT'
    ];

    if (!objLayoutSection) {
        throw ErrorLib.getErrors().CustomError("", "", "The object LayoutSection is not found");
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
            throw ErrorLib.getErrors().CustomError("", "", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "", JSON.stringify(errors));
        }
    }
    return isValid;
}

//Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'NAME':
            valid = value.length > 0 && value.length <= 255;
            break;
        case 'CONTENT':
            valid = value.length > 0 && value.length <= 1000;
            break;
        case 'LAYOUT_SECTION_ID':
            valid = !isNaN(value) && value > 0;
            break;
    }
    return valid;
}
