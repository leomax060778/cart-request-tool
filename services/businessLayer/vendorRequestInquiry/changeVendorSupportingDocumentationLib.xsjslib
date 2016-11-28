$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var supDoc = mapper.getDataChangeVendorSupportingDocumentation();
var utilLib = mapper.getUtil();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//Insert new change vendor supporting documentation option
function insertChangeSupporting(objChangeSupporting, userId) {
    if (validateInsertChangeSupporting(objChangeSupporting, userId)) {
        return supDoc.insertChangeSupporting(objChangeSupporting, userId);
    }
}

//Get all change vendor supporting documentation
function getAllChangeSupporting(){
	return supDoc.getAllChangeSupporting();
}

//Get all change vendor supporting documentation manual
function getAllChangeSupportingManual(){
	return supDoc.getAllChangeSupportingManual();
} 

//Get change vendor supporting documentation by id
function getChangeVendorSupportingById(changeSupportingId){
	if (!changeSupportingId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter changeSupportingId is not found", "changeVendorSupportingDocumentationService/handleGet/getChangeVendorSupportingDocumentationById", changeSupportingId);
    }
    return supDoc.getChangeVendorSupportingById(changeSupportingId);
}

//Get change vendor supporting documentation by id manually
function getChangeVendorSupportingByIdManual(changeSupportingId){
	if (!changeSupportingId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter changeSupportingId is not found", "changeVendorSupportingDocumentationService/handleGet/getChangeVendorSupportingDocumentationById", changeSupportingId);
    }
    return supDoc.getChangeVendorSupportingByIdManual(changeSupportingId);
}

//Update change vendor supporting documentation
function updateChangeSupporting(objChangeSupporting, userId) {
	if (!existChangeSupportingDocumentation(objChangeSupporting.SUPPORTING_DOCUMENTATION_ID)) {
        throw ErrorLib.getErrors().CustomError("", "changeVendorSupportingDocumentationService/handlePut/updateChangeSupporting", "The object Change Vendor Supporting Documentation " + objChangeSupporting.SUPPORTING_DOCUMENTATION_ID + " does not exist");
    }
    validateParams(objChangeSupporting.SUPPORTING_DOCUMENTATION_ID, userId);
    var keys = ['SUPPORTING_DOCUMENTATION_ID', 'NAME', 'DESCRIPTION'];
    var changeSupportingUrl = "changeVendorSupportingDocumentationService/handlePut/updateChangeSupporting";
    utilLib.validateObjectAttributes(objChangeSupporting, userId, keys, changeSupportingUrl, validateType);
    return supDoc.updateChangeSupporting(objChangeSupporting, userId);
}

//Delete Change Vendor supporting documentation
function deleteChangeSupporting(objChangeSupporting, userId) {
	if (!objChangeSupporting.SUPPORTING_DOCUMENTATION_ID) {
        throw ErrorLib.getErrors().CustomError("", "changeVendorSupportingDocumentationService/handlePut/updateChangeSupporting", "The SUPPORTING_DOCUMENTATION_ID is not found");
    }
    if (!existChangeSupportingDocumentation(objChangeSupporting.SUPPORTING_DOCUMENTATION_ID)) {
        throw ErrorLib.getErrors().CustomError("", "changeVendorSupportingDocumentationService/handlePut/updateChangeSupporting", "The object Change Vendor Supporting Documentation " + objChangeSupporting.SUPPORTING_DOCUMENTATION_ID + " does not exist");
    }
    return supDoc.deleteChangeSupporting(objChangeSupporting, userId);
}

//Check if the request exists
function existChangeSupportingDocumentation(changeSupportingId) {
    return getChangeVendorSupportingByIdManual(changeSupportingId).length > 0;
}

function validateInsertChangeSupporting(objChangeSupporting, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "changeVendorSupportingDocumentationService/handlePostt/updateChangeSupporting", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['NAME', 'DESCRIPTION'];

    if (!objChangeSupporting)
        throw ErrorLib.getErrors().CustomError("", "changeVendorSupportingDocumentationService/handlePut/updateChangeSupporting", "The object Change Vendor Supporting Documentation is not found");

    try {
        keys.forEach(function (key) {
            if (objChangeSupporting[key] === null || objChangeSupporting[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objChangeSupporting[key]);
                if (!isValid) {
                    errors[key] = objChangeSupporting[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "changeVendorSupportingDocumentationService/handlePut/updateChangeSupporting", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "changeVendorSupportingDocumentationService/handlePut/updateChangeSupporting", JSON.stringify(errors));
        }
    }
     return isValid;
}

function validateParams(changeSupportingId, userId) {
	if (!changeSupportingId) {
		throw ErrorLib.getErrors().CustomError("", "changeVendorSupportingDocumentationService",
				"The changeSupportingId is not found");
	}
	if (!userId) {
		throw ErrorLib.getErrors().CustomError("", "changeVendorSupportingDocumentationService",
				"The userId is not found");
	}
}

//Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'SUPPORTING_DOCUMENTATION_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'NAME':
        	valid = value.length > 0 && value.length <= 255;
            break;
        case 'DESCRIPTION':
        	valid = value.length > 0 && value.length <= 1000;
            break;
        }
    return valid;
}