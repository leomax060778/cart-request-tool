/** ***********INCLUDE LIBRARIES*************** */
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var data = mapper.getDataVendorContactInformation();
var config = mapper.getDataConfig();
var ErrorLib = mapper.getErrors();
var dbHelper = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

/** ***********GET*************** */
// Get all vendor contact information
function getAllVendorContactInformation(userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("", "", "The Parameter userId is not found");
    }

    return data.getAllVendorContactInformation();
}

//Get all vendors with alternative contact information
function getAllVendorForAlternativeContact() {
    return data.getAllVendorForAlternativeContact();
}

//Get all vendors used in Extend Vendor Request with Vendor Legal Name as Vendor Name
function getAllVendorForExtendVendorRequest() {
    return data.getAllVendorForExtendVendorRequest();
}

//Get all vendors used in Change Vendor Request
function getAllVendorForChangeVendorRequest() {
    return data.getAllVendorForChangeVendorRequest();
}

//Get all Vendor Contact Information manual
function getAllVendorContactInformationManual(userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("", "", "The Parameter userId is not found");
    }

    return data.getAllVendorContactInformationManual();
}

//Get Vendor Contact Information by Vendor Contact Information Id
function getVendorContactInformationById(vendorContactInformationId, userId) {
    if (!vendorContactInformationId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter vendorContactInformationId is not found", "", vendorContactInformationId);
    }

    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("", "", "The Parameter userId is not found");
    }

    return data.getVendorContactInformationById(vendorContactInformationId);
}

//Get Alternative Vendor Contact Information by Vendor Id
function getAlternativeVendorContactByVendorId(vendorId) {
    if (!vendorId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter vendorId is not found", "", vendorId);
    }
    var objResult = {};
    var result = data.getAlternativeVendorContactByVendorId(vendorId);
    result = JSON.parse(JSON.stringify(result));
    result.forEach(function (elem) {
        objResult[elem.ALTERNATIVE_VENDOR_NAME] = elem;
    });
    return objResult;
}

//Get Vendor Contact Information by Vendor Id
function getVendorContactInformationByVendorId(vendorId, userId) {
    if (!vendorId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter vendorId is not found", "", vendorId);
    }

    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("", "", "The Parameter userId is not found");
    }

    return data.getVendorContactInformationByVendorId(vendorId);
}

//Get Vendor Contact Information from Extend Vendor Request by Vendor Legal Name and Vendor Account
function getExtendVendorContactByVendor(vendorLegalName, vendorAccount) {
    if (!vendorLegalName) {
        throw ErrorLib.getErrors().BadRequest("The Parameter vendorLegalName is not found", "", vendorLegalName);
    }

    if (!vendorAccount) {
        throw ErrorLib.getErrors().BadRequest("The Parameter vendorAccount is not found", "", vendorAccount);
    }

    return data.getExtendVendorContactByVendor(vendorLegalName, vendorAccount);
}

//Get Vendor Contact Information from Change Vendor Request by Vendor Name and Vendor Account
function getChangeVendorContactByVendor(vendorName, vendorAccount) {
    if (!vendorName) {
        throw ErrorLib.getErrors().BadRequest("The Parameter vendorName is not found", "", vendorName);
    }

    if (!vendorAccount) {
        throw ErrorLib.getErrors().BadRequest("The Parameter vendorAccount is not found", "", vendorAccount);
    }

    return data.getChangeVendorContactByVendor(vendorName, vendorAccount);
}

//Get Vendor Contact Information by Id manual
function getVendorContactInformationByIdManual(vendor_contact_information_id, userId) {
    if (!vendor_contact_information_id) {
        throw ErrorLib.getErrors().BadRequest("The Parameter vendor_contact_information_id is not found", "", vendor_contact_information_id);
    }

    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("", "", "The Parameter userId is not found");
    }

    return data.getVendorContactInformationByIdManual(vendor_contact_information_id);
}

//Get Vendor Contact Information by Vendor Id manual
function getVendorContactInformationByVendorIdManual(vendor_id, userId) {
    if (!vendor_id) {
        throw ErrorLib.getErrors().BadRequest("The Parameter vendor_id is not found", "", vendor_id);
    }

    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("", "", "The Parameter userId is not found");
    }

    return data.getVendorContactInformationByVendorIdManual(vendor_id);
}
/** ***********END GET*************** */

/** ***********INSERT*************** */
//Insert new Vendor Contact Information
function insertVendorContactInformation(vendorContactInfoObj, userId) {
    var result;
    if (validateInsertVendorContactInformation(vendorContactInfoObj, userId)) {
        result = data.insertVendorContactInformation(vendorContactInfoObj, userId);
        if (result && vendorContactInfoObj.DEFAULT_CONTACT_INFORMATION === 1) {
            vendorContactInfoObj.VENDOR_CONTACT_INFORMATION_ID = result;
            updateDefaultVendorContactInformation(vendorContactInfoObj, userId);
        }
        return result;
    }

}

//Insert new Vendor Contact Information
function insertVendorContactInformationManual(vendorContactInfoObj, userId) {
    var result;
    if (validateInsertVendorContactInformation(vendorContactInfoObj, userId)) {
        result = data.insertVendorContactInformationManual(vendorContactInfoObj, userId);
        if (result && vendorContactInfoObj.DEFAULT_CONTACT_INFORMATION === 1) {
            vendorContactInfoObj.VENDOR_CONTACT_INFORMATION_ID = result;
            updateDefaultVendorContactInformationManual(vendorContactInfoObj, userId);
        }
        return result;
    }
}
/** ***********END INSERT*************** */

/** ***********UPDATE*************** */
//Update Vendor Contact Information
function updateVendorContactInformation(vendorContactInfoObj, userId) {
    if (validateUpdateVendorContactInformation(vendorContactInfoObj, userId)) {
        if (!existVendorContactInfo(vendorContactInfoObj.VENDOR_CONTACT_INFORMATION_ID)) {
            throw ErrorLib.getErrors().CustomError("The Contact Information does not exist", "", vendorContactInfoObj);
        }
        if (vendorContactInfoObj.DEFAULT_CONTACT_INFORMATION === 1) {
            updateDefaultVendorContactInformation(vendorContactInfoObj, userId);
        }
        if (vendorContactInfoObj.MASKED_VENDOR && vendorContactInfoObj.NAME !== config.getDataProtectionMask() && vendorContactInfoObj.EMAIL !== config.getDataProtectionMask()) {
            vendorContactInfoObj.MASKED_VENDOR = 0;
        }
        return data.updateVendorContactInformation(vendorContactInfoObj, userId);
    }
}

//Update Vendor Contact Information manual
function updateVendorContactInformationManual(vendorContactInfoObj, userId) {
    if (validateUpdateVendorContactInformation(vendorContactInfoObj, userId)) {
        if (!existVendorContactInfo(vendorContactInfoObj.VENDOR_CONTACT_INFORMATION_ID)) {
            throw ErrorLib.getErrors().CustomError("The Contact Information does not exist", "", vendorContactInfoObj);
        }
        if (vendorContactInfoObj.DEFAULT_CONTACT_INFORMATION === 1) {
            updateDefaultVendorContactInformationManual(vendorContactInfoObj, userId);
        }
        if (vendorContactInfoObj.MASKED_VENDOR && vendorContactInfoObj.NAME !== config.getDataProtectionMask() && vendorContactInfoObj.EMAIL !== config.getDataProtectionMask()) {
            vendorContactInfoObj.MASKED_VENDOR = 0;
        }
        return data.updateVendorContactInformationManual(vendorContactInfoObj, userId);
    }
}

//Update Default Vendor Contact Information
function updateDefaultVendorContactInformation(vendorContactInfoObj, userId) {
    if (validateUpdateDefaultVendorContactInformation(vendorContactInfoObj, userId)) {
        return data.updateDefaultVendorContactInformation(vendorContactInfoObj, userId);
    }
}

//Update Default Vendor Contact Information manual
function updateDefaultVendorContactInformationManual(vendorContactInfoObj, userId) {
    if (validateUpdateDefaultVendorContactInformation(vendorContactInfoObj, userId)) {
        return data.updateDefaultVendorContactInformationManual(vendorContactInfoObj, userId);
    }
}

//Update Vendor Contact Information mask flag to protect the selected contact data
function updateVendorContactInformationMask(vendorContactInfoObj, userId) {
    vendorContactInfoObj.CONTACT = [];
    vendorContactInfoObj.VENDOR_CONTACT_INFORMATION_ID.forEach(function (elem) {
        vendorContactInfoObj.CONTACT.push({VENDOR_CONTACT_INFORMATION_ID: elem});
    });
    return data.updateVendorContactInformationMask(vendorContactInfoObj, userId);
}

//Update Extend Vendor Request Contact Information mask flag to protect the selected contact data
function updateExtendVendorContactMask(objExtendVendorRequest, userId) {
    objExtendVendorRequest.CONTACT = [];
    objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID.forEach(function (elem) {
        objExtendVendorRequest.CONTACT.push({EXTEND_VENDOR_REQUEST_ID: elem});
    });
    return data.updateExtendVendorContactMask(objExtendVendorRequest, userId);
}

//Update Change Vendor Request Contact Information mask flag to protect the selected contact data
function updateChangeVendorContactMask(objChangeVendorRequest, userId) {
    objChangeVendorRequest.CONTACT = [];
    objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID.forEach(function (elem) {
        objChangeVendorRequest.CONTACT.push({CHANGE_VENDOR_REQUEST_ID: elem});
    });
    return data.updateChangeVendorContactMask(objChangeVendorRequest, userId);
}

//Update Alternative Vendor Contact Information mask flag to protect the selected contact data
function updateAlternativeVendorMask(alternativeVendorObj, userId) {
    alternativeVendorObj.CONTACT = [];
    alternativeVendorObj.ALTERNATIVE_CONTACT.forEach(function (elem) {
        alternativeVendorObj.CONTACT.push({REQUEST_ID: elem});
    });
    return data.updateAlternativeVendorMask(alternativeVendorObj, userId);
}
/** ***********END UPDATE*************** */

/** ************DELETE************** */
//Soft delete of the selected Vendor Contact Information
function deleteVendorContactInformation(vendorContactInfoObj, userId) {
    if (!vendorContactInfoObj.VENDOR_CONTACT_INFORMATION_ID) {
        throw ErrorLib.getErrors().BadRequest("The Parameter VENDOR_CONTACT_INFORMATION_ID is not found", "", vendorContactInfoObj);
    }

    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("", "", "The Parameter userId is not found");
    }

    if (!existVendorContactInfo(vendorContactInfoObj.VENDOR_CONTACT_INFORMATION_ID)) {
        throw ErrorLib.getErrors().CustomError("The Contact Information does not exist", "", vendorContactInfoObj);
    }

    return data.deleteVendorContactInformation(vendorContactInfoObj.VENDOR_CONTACT_INFORMATION_ID, userId);
}

//Soft delete of the selected Vendor Contact Information manual
function deleteVendorContactInformationManual(vendorContactInfoObj, userId) {
    if (!vendorContactInfoObj.VENDOR_CONTACT_INFORMATION_ID) {
        throw ErrorLib.getErrors().BadRequest("The Parameter VENDOR_CONTACT_INFORMATION_ID is not found", "", vendorContactInfoObj);
    }

    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("", "", "The Parameter userId is not found");
    }

    if (!existVendorContactInfo(vendorContactInfoObj.VENDOR_CONTACT_INFORMATION_ID)) {
        throw ErrorLib.getErrors().CustomError("The Contact Information does not exist", "", vendorContactInfoObj);
    }

    return data.deleteVendorContactInformationManual(vendorContactInfoObj.VENDOR_CONTACT_INFORMATION_ID, userId);
}
/** ***********END DELETE*************** */

/** ************VALIDATION************** */
//Validate data to update the Vendor Contact Information
function validateUpdateVendorContactInformation(vendorContactInfoObj, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['VENDOR_CONTACT_INFORMATION_ID', 'NAME', 'EMAIL'];
    var optionalKeys = ['PHONE'];

    if (!vendorContactInfoObj) {
        throw ErrorLib.getErrors().CustomError("", "", "The object vendor contact information is not found");
    }

    try {
        keys.forEach(function (key) {
            if (vendorContactInfoObj[key] === null || vendorContactInfoObj[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, vendorContactInfoObj[key]);
                if (!isValid) {
                    errors[key] = vendorContactInfoObj[key];
                    throw BreakException;
                }
            }
        });

        optionalKeys.forEach(function (key) {
            // validate attribute type
            isValid = validateType(key, vendorContactInfoObj[key]);
            if (!isValid) {
                errors[key] = vendorContactInfoObj[key];
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

//Validate data to update the Default Vendor Contact Information
function validateUpdateDefaultVendorContactInformation(vendorContactInfoObj, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['VENDOR_CONTACT_INFORMATION_ID', 'VENDOR_ID', 'DEFAULT_CONTACT_INFORMATION'];

    if (!vendorContactInfoObj) {
        throw ErrorLib.getErrors().CustomError("", "", "The object vendor contact information is not found");
    }

    try {
        keys.forEach(function (key) {
            if (vendorContactInfoObj[key] === null || vendorContactInfoObj[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, vendorContactInfoObj[key]);
                if (!isValid) {
                    errors[key] = vendorContactInfoObj[key];
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

//Validate data to insert a new Vendor Contact
function validateInsertVendorContactInformation(vendorContactInfoObj, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['NAME', 'EMAIL'];
    var optionalKeys = ['PHONE'];

    if (!vendorContactInfoObj) {
        throw ErrorLib.getErrors().CustomError("", "", "The object vendor contact information is not found");
    }

    try {
        keys.forEach(function (key) {
            if (vendorContactInfoObj[key] === null || vendorContactInfoObj[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, vendorContactInfoObj[key]);
                if (!isValid) {
                    errors[key] = vendorContactInfoObj[key];
                    throw BreakException;
                }
            }
        });

        optionalKeys.forEach(function (key) {
            // validate attribute type
            isValid = validateType(key, vendorContactInfoObj[key]);
            if (!isValid) {
                errors[key] = vendorContactInfoObj[key];
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

// Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'VENDOR_CONTACT_INFORMATION_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'VENDOR_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'DEFAULT_CONTACT_INFORMATION_ID':
            valid = !isNaN(value);
            break;
        case 'NAME':
            valid = (value.length > 0 && value.length <= 255);
            break;
        case 'EMAIL':
            valid = (value.length > 0 && value.length <= 255);
            break;
        case 'PHONE':
            valid = !value || (value.length > 0 && value.length <= 255);
            break;
    }
    return valid;
}

//Check if the Vendor Contact Information exists and is enabled
function existVendorContactInfo(vendorContactInfoId) {
    return data.getVendorContactInformationByIdManual(vendorContactInfoId).length > 0;
}
/** ************END VALIDATION************** */