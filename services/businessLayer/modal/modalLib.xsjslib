$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataModal = mapper.getDataModal();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//Insert modal
function insertModal(objModal, userId) {
    if (validateInsertModal(objModal, userId)) {
        return dataModal.insertModal(objModal, userId);
    }
}

//Get modal by ID
function getModalById(modalId) {
    if (!modalId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter modalId is not found", "modalService/handleGet/getModalById", modalId);
    }
    return dataModal.getModalById(modalId);
}

//Get modal by ID manually
function getModalByIdManual(modalId) {
    if (!modalId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter modalId is not found", "modalService/handleGet/getModalById", modalId);
    }
    return dataModal.getModalByIdManual(modalId);
}

//Get all modal
function getAllModal() {
    return dataModal.getAllModal();
}

//Update modal
function updateModal(objModal, userId) {
    if (validateUpdateModal(objModal, userId)) {
        if (!existModal(objModal.MODAL_ID)) {
            throw ErrorLib.getErrors().CustomError("", "layoutSectionService/handleUpdate/updateModal", "The modal with the id " + objModal.MODAL_ID + " does not exist");
        }
        return dataModal.updateModal(objModal, userId);
    }
}

//Delete modal
function deleteModal(objModal, userId) {
    if (!objModal.MODAL_ID) {
        throw ErrorLib.getErrors().CustomError("", "modalService/handleDelete/deleteModal", "The MODAL_ID is not found");
    }
    if (!existModal(objModal.MODAL_ID)) {
        throw ErrorLib.getErrors().CustomError("", "modalService/handleDelete/updateModal", "The modal with the id " + objModal.MODAL_ID + " does not exist");
    }
    return dataModal.deleteModal(objModal, userId);
}

//Check if the request exists
function existModal(modalId) {
    return getModalByIdManual(modalId).length > 0;
}

function validateInsertModal(objModal, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "modalService/handlePut/insertModal", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'DESCRIPTION',
        'CONTENT',
        'LINK'
    ];

    if (!objModal) {
        throw ErrorLib.getErrors().CustomError("", "modalService/handlePost/insertModal", "The object Modal is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objModal[key] === null || objModal[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objModal[key]);
                if (!isValid) {
                    errors[key] = objModal[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "modalService/handlePost/insertModal", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "modalService/handlePost/insertModal", JSON.stringify(errors));
        }
    }
    return isValid;
}

function validateUpdateModal(objModal, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "modalService/handlePut/updateModal", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'MODAL_ID',
        'DESCRIPTION',
        'CONTENT',
        'LINK'];

    if (!objModal) {
        throw ErrorLib.getErrors().CustomError("", "modalService/handlePut/updateModal", "The object Modal is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objModal[key] === null || objModal[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objModal[key]);
                if (!isValid) {
                    errors[key] = objModal[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "modalService/handlePut/updateModal", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "modalService/handlePut/updateModal", JSON.stringify(errors));
        }
    }
    return isValid;
}

//Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'DESCRIPTION':
            valid = value.length > 0 && value.length <= 255;
            break;
        case 'CONTENT':
            valid = value.length > 0 && value.length <= 1000;
            break;
        case 'MODAL_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'LINK':
            valid = value.length > 0 && value.length <= 511;
            break;
    }
    return valid;
}