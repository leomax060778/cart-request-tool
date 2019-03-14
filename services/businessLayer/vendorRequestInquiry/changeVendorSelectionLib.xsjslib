$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var changeSelection = mapper.getDataChangeVendorSelection();
var supDoc = mapper.getDataChangeVendorSupportingDocumentation();
var utilLib = mapper.getUtil();
var ErrorLib = mapper.getErrors();

/** ***********END INCLUDE LIBRARIES*************** */

//Insert new change vendor selection
function insertChangeSelection(objChangeSelection, userId) {
    if (validateChangeSelection(objChangeSelection, userId)) {
        var changeArray = objChangeSelection.CHECKBOX;
        changeArray.forEach(function (elem) {
            changeSelection.insertChangeSelection(elem, objChangeSelection.CHANGE_VENDOR_REQUEST_ID, userId);
        });
        return changeArray.length;
    }
}

//Insert new change vendor selection
function insertChangeSelectionManual(objChangeSelection, userId) {
    var arrSelection = [];
    for (var i = 0; i < objChangeSelection.CHECKBOX.length; i++) {
        arrSelection.push({
            IN_CHANGE_VENDOR_REQUEST_ID: objChangeSelection.CHANGE_VENDOR_REQUEST_ID,
            IN_SUPPORTING_DOCUMENTATION_ID: objChangeSelection.CHECKBOX[i].SUPPORTING_DOCUMENTATION_ID,
            IN_SELECTION: objChangeSelection.CHECKBOX[i].SELECTION,
            IN_CREATED_USER_ID: userId
        });
    }
    if (validateChangeSelection(objChangeSelection, userId)) {
        var change = supDoc.getAllChangeSupportingManual();
        if (change.length === objChangeSelection.CHECKBOX.length) {
            changeSelection.insertChangeSelectionManual(arrSelection);
        } else {
            throw ErrorLib.getErrors().CustomError("", "",
                "Invalid array length. objChangeSelection.CHECKBOX should have " + change.length + " elements and it has " + objChangeSelection.CHECKBOX.length);
        }
        return arrSelection.length;
    }
}

//Get change vendor selection by change vendor request id
function getChangeSelectionById(changeVendorRequestId) {
    if (!changeVendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter changeVendorRequestId is not found", "", changeVendorRequestId);
    }
    return changeSelection.getChangeSelectionById(changeVendorRequestId);
}

//Get change vendor selection by change vendor request id manually
function getChangeSelectionByIdManual(changeVendorRequestId) {
    if (!changeVendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter changeVendorRequestId is not found", "", changeVendorRequestId);
    }
    return changeSelection.getChangeSelectionByIdManual(changeVendorRequestId);
}

//Update change vendor selection
function updateChangeSelection(objChangeSelection, userId) {
    if (validateChangeSelection(objChangeSelection, userId)) {
        var changeArray = objChangeSelection.CHECKBOX;
        var optionToInsert = [];
        var optionToUpdate = [];
        for (var i = 0; i < changeArray.length; i++) {
            if (changeArray[i].NEW_OPTION) {
                optionToInsert.push({
                    IN_CHANGE_VENDOR_REQUEST_ID: objChangeSelection.CHANGE_VENDOR_REQUEST_ID,
                    IN_SUPPORTING_DOCUMENTATION_ID: objChangeSelection.CHECKBOX[i].SUPPORTING_DOCUMENTATION_ID,
                    IN_SELECTION: objChangeSelection.CHECKBOX[i].SELECTION,
                    IN_MODIFIED_USER_ID: userId
                });
            } else {
                optionToUpdate.push({
                    IN_CHANGE_VENDOR_REQUEST_ID: objChangeSelection.CHANGE_VENDOR_REQUEST_ID,
                    IN_SUPPORTING_DOCUMENTATION_ID: objChangeSelection.CHECKBOX[i].SUPPORTING_DOCUMENTATION_ID,
                    IN_SELECTION: objChangeSelection.CHECKBOX[i].SELECTION,
                    IN_MODIFIED_USER_ID: userId
                });
            }
        }
        if (optionToInsert.length) {
            changeSelection.insertChangeSelectionManual(optionToInsert);
        }
        if (optionToUpdate.length) {
            changeSelection.updateChangeSelectionManual(optionToUpdate);
        }

        return {INSERTED: optionToInsert.length, UPDATED: optionToUpdate.length};
    }
}

//Update change vendor selection manually
function updateChangeSelectionManual(objChangeSelection, userId) {
    if (validateChangeSelection(objChangeSelection, userId)) {
        var changeArray = objChangeSelection.CHECKBOX;
        var optionToInsert = [];
        var optionToUpdate = [];
        for (var i = 0; i < changeArray.length; i++) {
            if (changeArray[i].NEW_OPTION) {
                optionToInsert.push({
                    IN_CHANGE_VENDOR_REQUEST_ID: objChangeSelection.CHANGE_VENDOR_REQUEST_ID,
                    IN_SUPPORTING_DOCUMENTATION_ID: objChangeSelection.CHECKBOX[i].SUPPORTING_DOCUMENTATION_ID,
                    IN_SELECTION: objChangeSelection.CHECKBOX[i].SELECTION,
                    IN_CREATED_USER_ID: userId
                });
            } else {
                optionToUpdate.push({
                    IN_CHANGE_VENDOR_REQUEST_ID: objChangeSelection.CHANGE_VENDOR_REQUEST_ID,
                    IN_SUPPORTING_DOCUMENTATION_ID: objChangeSelection.CHECKBOX[i].SUPPORTING_DOCUMENTATION_ID,
                    IN_SELECTION: objChangeSelection.CHECKBOX[i].SELECTION,
                    IN_MODIFIED_USER_ID: userId
                });
            }
        }
        if (optionToInsert.length) {
            changeSelection.insertChangeSelectionManual(optionToInsert);
        }
        if (optionToUpdate.length) {
            changeSelection.updateChangeSelectionManual(optionToUpdate);
        }

        return {INSERTED: optionToInsert.length, UPDATED: optionToUpdate.length};
    }
}

//Delete change vendor request
function deleteChangeVendorRequestManual(objChangeVendorRequest, userId) {
    if (!objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID) {
        throw ErrorLib.getErrors().CustomError("", "", "The CHANGE_VENDOR_REQUEST_ID is not found");
    }
    if (!existChangeVendorRequest(objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID)) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Change Vendor Request " + objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID + " does not exist");
    }
    return changeSelection.deleteChangeSelectionManual(objChangeVendorRequest, userId);
}

//Check if the request exists
function existChangeSelection(changeVendorRequestId) {
    return getChangeSelectionByIdManual(changeVendorRequestId).length > 0;
}

function validateChangeSelection(objChangeSelection, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['CHANGE_VENDOR_REQUEST_ID', 'CHECKBOX'];
    var checkboxKeys = ['SUPPORTING_DOCUMENTATION_ID', 'SELECTION'];
    var validateCheckbox = objChangeSelection.CHECKBOX;

    if (!objChangeSelection) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Change Vendor Selection is not found");
    }
    try {
        keys.forEach(function (key) {
            if (objChangeSelection[key] === null || objChangeSelection[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objChangeSelection[key]);
                if (!isValid) {
                    errors[key] = objChangeSelection[key];
                    throw BreakException;
                }
            }
        });
        validateCheckbox.forEach(function (elem) {
            checkboxKeys.forEach(function (key) {
                if (elem[key] === null || elem[key] === undefined) {
                    errors[key] = null;
                    throw BreakException;
                } else {
                    // validate attribute type
                    isValid = validateType(key, elem[key]);
                    if (!isValid) {
                        errors[key] = elem[key];
                        throw BreakException;
                    }
                }
            });
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

function validateParams(changeVendorRequestId, userId) {
    if (!changeVendorRequestId) {
        throw ErrorLib.getErrors().CustomError("", "", "The changeVendorRequestId is not found");
    }
    if (!userId) {
        throw ErrorLib.getErrors().CustomError("", "", "The userId is not found");
    }
}

function validateUpdateChangeSelection(objChangeSelection, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['CHANGE_VENDOR_REQUEST_ID', 'CHECKBOX'];
    var checkboxKeys = ['SUPPORTING_DOCUMENTATION_ID', 'SELECTION'];
    var validateCheckbox = objChangeSelection.CHECKBOX;

    if (!objChangeSelection) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Change Vendor Selection is not found");
    }
    try {
        keys.forEach(function (key) {
            if (objChangeSelection[key] === null || objChangeSelection[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objChangeSelection[key]);
                if (!isValid) {
                    errors[key] = objChangeSelection[key];
                    throw BreakException;
                }
            }
        });
        validateCheckbox.forEach(function (elem) {
            checkboxKeys.forEach(function (key) {
                if (elem[key] === null || elem[key] === undefined) {
                    errors[key] = null;
                    throw BreakException;
                } else {
                    // validate attribute type
                    isValid = validateType(key, elem[key]);
                    if (!isValid) {
                        errors[key] = elem[key];
                        throw BreakException;
                    }
                }
            });
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
        case 'CHANGE_VENDOR_REQUEST_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'CHECKBOX':
            valid = (value.length > 0);
            break;
        case 'SUPPORTING_DOCUMENTATION_ID':
            valid = (value > 0) && (!isNaN(value));
            break;
        case 'SECTION':
            valid = (value >= 0) && (!isNaN(value));
            break;
    }
    return valid;
}