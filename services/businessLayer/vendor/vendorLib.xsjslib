$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var data = mapper.getDataVendor();
var dataVE = mapper.getDataVendorEntity();
var business_contact = mapper.getVendorContactInformation();
var ErrorLib = mapper.getErrors();
var dbHelper = mapper.getdbHelper();

var statusMap = {
    'TO_BE_CHECKED': 1,
    'CHECKED': 2,
    'IN_PROCESS': 3,
    'RETURN_TO_REQUESTER': 4,
    'APPROVED': 5,
    'CANCELLED': 6
};

function getAllVendor() {
    var ven = {};
    try {
        var vendor_result = data.getManualAllVendor();
        if (vendor_result.length > 0) {
            ven = JSON.parse(JSON.stringify(vendor_result));
        }
        dbHelper.commit();
    }
    catch (e) {
        dbHelper.rollback();
        throw ErrorLib.getErrors().CustomError("", "", e.toString());
    }
    finally {
        dbHelper.closeConnection();
    }
    return ven;
}

function getAllVendorForFilters(user_id) {
    return data.getAllVendorForFilters(user_id);
}

function getAllVendorByEntity(entityId, vendorAdditionalInformationId) {
    if (!entityId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter entityId is not found", "", entityId);
    }
    var vendorCollection = dataVE.getAllVendorByEntityId(entityId);
    if (vendorAdditionalInformationId) {
        var oldVendor = data.getVendorByAdditionalInformationId(vendorAdditionalInformationId);
        var existVendorName = validateVendorName(oldVendor, vendorCollection);
        if (!existVendorName) {
            vendorCollection = JSON.parse(JSON.stringify(vendorCollection));
            oldVendor = JSON.parse(JSON.stringify(oldVendor));
            oldVendor.NAME = oldVendor.NAME + " (Old Name)";
            vendorCollection.push(oldVendor);
        }
    }
    return vendorCollection;
}

function validateVendorName(oldVendor, vendorCollection) {
    var result = false;
    vendorCollection.forEach(function (elem) {
        if (Number(elem.VENDOR_ADDITIONAL_INFORMATION_ID) === Number(oldVendor.VENDOR_ADDITIONAL_INFORMATION_ID)) {
            result = true;
        }
    });
    return result;
}

function getVendorByStatus(statusId) {
    if (!statusId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter statusId is not found", "", statusId);
    }
    return data.getVendorByStatus(statusId);
}

function getVendorByAccount(account) {
    if (!account) {
        throw ErrorLib.getErrors().BadRequest("The Parameter account is not found", "", account);
    }
    return data.getVendorByAccount(account);
}

function insertManualVendor(objVendor, userId) {
    var result = {};
    if (validateInsertVendor(objVendor, userId)) {
        result = data.insertManualVendor(objVendor, userId);
        if (objVendor.ENTITY_ID) {
            dataVE.insertManualVendorEntity(result, objVendor.ENTITY_ID, userId);
        }
        return result;
    }
}

function insertVendor(objVendor, userId) {
    objVendor.CREATED_USER_ID = userId;
    var result = {};
    try {
        result = insertManualVendor(objVendor, userId);
        var contactInformation = {};

        if (result) {
            objVendor.VENDOR_ID = result;
            contactInformation.VENDOR_ID = result;
            contactInformation.NAME = objVendor.CONTACT_NAME;
            contactInformation.PHONE = objVendor.CONTACT_PHONE;
            contactInformation.EMAIL = objVendor.CONTACT_EMAIL;
            contactInformation.DEFAULT_CONTACT_INFORMATION = 1; //The first contact is always the default.

            business_contact.insertVendorContactInformationManual(contactInformation, userId);
            insertVendorAdditionalInformation(objVendor, userId);
            if (objVendor.VENDOR_ENTITIES) {
                (objVendor.VENDOR_ENTITIES).forEach(function (entity) {
                    dataVE.insertManualVendorEntity(result, entity, userId);
                });
            }
        }

        dbHelper.commit();
    }
    catch (e) {
        dbHelper.rollback();
        throw ErrorLib.getErrors().CustomError("", "", e.toString());
    }
    finally {
        dbHelper.closeConnection();
    }

    return result;
}

function completeVendor(item) {
    item.ENTITIES = dataVE.getManualAllEntityByVendorId(item.VENDOR_ID);
}

function getVendorById(vendorId, userId) {
    validateVendorParameters(vendorId, userId);
    var ven = {};
    try {
        var vendorResult = data.getManualVendorById(vendorId);
        if (vendorResult.VENDOR_ID) {
            ven = JSON.parse(JSON.stringify(vendorResult));
            completeVendor(ven);
        }
        dbHelper.commit();
    }
    catch (e) {
        dbHelper.rollback();
        throw ErrorLib.getErrors().CustomError("", "", e.toString());
    }
    finally {
        dbHelper.closeConnection();
    }
    return ven;
}

function getManualVendorById(vendorId) {
    return data.getManualVendorById(vendorId);
}

function validateVendorParameters(vendor_id, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("", "", "The Parameter userId is not found");
    }
    if (!vendor_id) {
        throw ErrorLib.getErrors().BadRequest("", "", "The Parameter vendor_id is not found");
    }
}

function insertVendorAdditionalInformation(objVendor, userId) {
    if (validateInsertAdditionalInformation(objVendor, userId)) {
        return data.insertManualVendorAdditionalInformation(objVendor, userId);
    }
}

function updateVendor(objVendor, userId) {
    objVendor.MODIFIED_USER_ID = userId;
    if (validateUpdateVendor(objVendor, userId)) {
        var vendors = getManualVendorById(objVendor.VENDOR_ID, userId);
        if (vendors.VENDOR_REQUEST_ID && Number(vendors.STATUS_ID) !== Number(objVendor.STATUS_ID)) {
            throw ErrorLib.getErrors().CustomError("", "", "The vendor status cannot be edited in the administration tile");
        }
        try {
            updateVendorEntity(objVendor, userId);
            if (vendors.NAME !== objVendor.NAME) {
                data.deleteManualVendorAdditionalInformation(objVendor, userId);
                data.insertManualVendorAdditionalInformation(objVendor, userId);
            }
            var result = data.updateManualVendor(objVendor, userId);
            dbHelper.commit();
            return result;
        } catch (e) {
            dbHelper.rollback();
            throw ErrorLib.getErrors().CustomError("", "", e.toString());
        } finally {
            dbHelper.closeConnection();
        }
    }
}

function updateManualVendor(objVendor, userId) {
    objVendor.MODIFIED_USER_ID = userId;
    if (validateUpdateVendor(objVendor, userId)) {
        var vendors = getManualVendorById(objVendor.VENDOR_ID, userId);
        if (!(vendors.length > 0)) {
            throw ErrorLib.getErrors().CustomError("The object vendor does not exist", "", objVendor);
        }
        if (objVendor.VENDOR_ENTITIES) {
            try {
                updateVendorEntity(objVendor, userId);
                if (vendors[0].NAME !== objVendor.NAME) {
                    data.deleteManualVendorAdditionalInformation(objVendor, userId);
                    data.insertManualVendorAdditionalInformation(objVendor, userId);
                }
                return data.updateManualVendor(objVendor, userId);
            } catch (e) {
                dbHelper.rollback();
                throw ErrorLib.getErrors().CustomError("", "", e.toString());
            }
        } else {
            return data.updateManualVendor(objVendor, userId);
        }
    }
}

function updateManualVendorStatus(objVendor, userId) {
    return data.updateManualVendorStatus(objVendor, userId);
}

function updateVendorAccountManual(objVendor, userId) {
    if (validateUpdateVendorAccount(objVendor, userId)) {
        if (!existVendor(objVendor.VENDOR_ID)) {
            throw ErrorLib.getErrors().CustomError("", "", "The vendor with the id \'" + objVendor.VENDOR_ID + "\' does not exist");
        }
        return data.updateVendorAccountManual(objVendor, userId);
    }
}

function updateVendorEntity(objVendor, userId) {
    var entities = dataVE.getManualAllEntityByVendorId(objVendor.VENDOR_ID);
    var updateEntities = objVendor.VENDOR_ENTITIES;
    var insertEntities = [];
    var deleteEntities = [];
    entities.forEach(function (entity) {
        var result = true;
        var entityId = entity.ENTITY_ID;
        if (typeof entity.ENTITY_ID === 'string') {
            entityId = Number(entity.ENTITY_ID);
        }
        updateEntities.forEach(function (updateEntity) {
            if (entityId === updateEntity) {
                result = false;
            }
        });
        if (result) {
            deleteEntities.push(entityId);
        }
    });
    updateEntities.forEach(function (newEntity) {
        var result = true;
        entities.forEach(function (entity) {
            var entityId = entity.ENTITY_ID;
            if (typeof entityId === 'string') {
                entityId = Number(entity.ENTITY_ID);
            }
            if (newEntity === entityId) {
                result = false;
            }
        });
        if (result) {
            insertEntities.push(newEntity);
        }
    });
    insertEntities.forEach(function (insertEntity) {
        dataVE.insertManualVendorEntity(objVendor.VENDOR_ID, insertEntity, userId);
    });
    deleteEntities.forEach(function (deleteEntity) {
        dataVE.deleteManualVendorEntityByVendorIdEntityId(objVendor.VENDOR_ID, deleteEntity, userId);
    });
}

function deleteVendor(objVendor, userId) {
    validateVendorParameters(objVendor.VENDOR_ID, userId);
    if (!existVendorToDelete(objVendor, userId)) {
        throw ErrorLib.getErrors().CustomError("The object vendor is invalid", "", objVendor);
    } else {
        if (objVendor.VENDOR_REQUEST_ID && (Number(objVendor.STATUS_ID) !== statusMap.CANCELLED) && (Number(objVendor.STATUS_ID) !== statusMap.APPROVED)) {
            throw ErrorLib.getErrors().CustomError("", "", "The vendor cannot be deleted because is associated with a New Vendor Request");
        }
    }
    return data.deleteVendor(objVendor.VENDOR_ID, userId);
}

function deleteManualVendor(objVendor, userId) {
    validateVendorParameters(objVendor.VENDOR_ID, userId);
    if (!existVendor(objVendor.VENDOR_ID, userId)) {
        throw ErrorLib.getErrors().CustomError("The object vendor does not exist", "", objVendor);
    }
    return data.deleteManualVendor(objVendor.VENDOR_ID, userId);
}

function getAllVendorStatus() {
    return data.getAllVendorStatus();
}

function validateInsertVendor(objVendor, userId) {

    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['ADDRESS_1', 'ADDRESS_2', 'CITY', 'STATE', 'ZIP', 'PHONE',
        'FAX', 'LEGAL_NAME', 'INFORMAL_NAME', 'VENDOR_ACCOUNT', 'STATUS_ID'];

    if (objVendor.VENDOR_ENTITY) {
        keys.push('VENDOR_ENTITY');
    }
    if (objVendor.ENTITY_ID) {
        keys.push('ENTITY_ID');
    }

    if (!objVendor) {
        throw ErrorLib.getErrors().CustomError("", "", "The object vendor is not found");
    }
    try {
        keys.forEach(function (key) {
            // validate attribute type
            isValid = validateType(key, objVendor[key]);
            if (!isValid) {
                errors[key] = objVendor[key];
                throw BreakException;
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "", e.toString());
        } else {
            throw ErrorLib.getErrors().CustomError("", "", JSON.stringify(errors));
        }
    }

    return isValid;
}

function validateInsertAdditionalInformation(objVendor, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['VENDOR_ID', 'NAME'];

    if (!objVendor) {
        throw ErrorLib.getErrors().CustomError("", "", "The object vendor is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objVendor[key] === null || objVendor[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objVendor[key]);
                if (!isValid) {
                    errors[key] = objVendor[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "", e.toString());
        } else {
            throw ErrorLib.getErrors().CustomError("", "",
                JSON.stringify(errors));
        }
    }
    return isValid;
}

function validateUpdateVendor(objVendor, userId) {

    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['VENDOR_ID', 'ADDRESS_1', 'CITY', 'STATE', 'ZIP', 'PHONE',
        'FAX', 'LEGAL_NAME', 'ADDRESS_2', 'INFORMAL_NAME'];

    if (objVendor.VENDOR_ENTITY) {
        keys.push('VENDOR_ENTITY');
    }
    if (objVendor.ENTITY_ID) {
        keys.push('ENTITY_ID');
    }

    if (!objVendor) {
        throw ErrorLib.getErrors().CustomError("", "", "The object vendor is not found");
    }
    try {
        keys.forEach(function (key) {
            // validate attribute type
            isValid = validateType(key, objVendor[key]);
            if (!isValid) {
                errors[key] = objVendor[key];
                throw BreakException;
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "", e.toString());
        } else {
            throw ErrorLib.getErrors().CustomError("", "", JSON.stringify(errors));
        }
    }

    return isValid;
}

function validateUpdateVendorAccount(objVendor, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['VENDOR_ID',
        'VENDOR_ACCOUNT'];

    if (!objVendor) {
        throw ErrorLib.getErrors().CustomError("", "", "The object vendor is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objVendor[key] === null || objVendor[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objVendor[key]);
                if (!isValid) {
                    errors[key] = objVendor[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "", e.toString());
        } else {
            throw ErrorLib.getErrors().CustomError("", "", JSON.stringify(errors));
        }
    }
    return isValid;
}

// Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'VENDOR_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'ADDRESS_1':
            valid = (!value) || (value.length > 0 && value.length <= 255);
            break;
        case 'ADDRESS_2':
            valid = (!value) || (value.length > 0 && value.length <= 255);
            break;
        case 'CITY':
            valid = (!value) || (value.length > 0 && value.length <= 255);
            break;
        case 'STATE':
            valid = (!value) || (value.length > 0 && value.length <= 255);
            break;
        case 'ZIP':
            valid = (!value) || (value.length > 0 && value.length <= 255);
            break;
        case 'PHONE':
            valid = (!value) || (value.length > 0 && value.length <= 255);
            break;
        case 'FAX':
            valid = (!value) || (value.length > 0 && value.length <= 255);
            break;
        case 'LEGAL_NAME':
            valid = (!value) || (value.length > 0 && value.length <= 511);
            break;
        case 'INFORMAL_NAME':
            valid = (!value) || (value.length > 0 && value.length <= 511);
            break;
        case 'VENDOR_ENTITIES':
            valid = Array.isArray(value) && value.length > 0;
            break;
        case 'VENDOR_ACCOUNT':
            valid = (!value) || (value.length > 0 && value.length <= 255);
            break;
        case 'ENTITY_ID':
            valid = (!value) || (!isNaN(value) && value > 0);
            break;
        case 'STATUS_ID':
            valid = (!value) || (!isNaN(value) && value > 0);
            break;
        case 'NAME':
            valid = value.length > 0 && value.length <= 255;
            break;
    }
    return valid;
}

function existVendorToDelete(objVendor) {
    var vendor = getManualVendorById(objVendor.VENDOR_ID);
    var result = false;
    if (Object.keys(vendor).length > 0) {
        result = Number(vendor.VENDOR_REQUEST_ID) === Number(objVendor.VENDOR_REQUEST_ID);
    }
    return result;
}

function existVendor(vendorId) {
    return Object.keys(getManualVendorById(vendorId)).length > 0;
}
