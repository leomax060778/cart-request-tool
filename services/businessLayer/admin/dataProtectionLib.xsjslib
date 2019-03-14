/***************Import Library*******************/
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dataDataProtection = mapper.getDataUserDataProtection();
var userLib = mapper.getUser();

/** MESSAGES **/

var USER_NOT_FOUND = "The User cannot be found.";
var OBJECT_NOT_FOUND = "The object User Data Protection cannot be found.";
var INVALID_DATA_PROTECTION_STATUS = "Invalid User Data Protection Status.";
var CAN_NOT_UPDATE = "The Data Protection Request cannot be updated.";

/** STATUS LIST **/

var USER_DATA_PROTECTION_STATUS = {
    PENDING: 1,
    APPROVED: 2,
    REJECTED: 3
};

/** GET **/

function getAllDataProtectionStatus(userId) {
    return dataDataProtection.getAllDataProtectionStatus(userId);
}

function getAllUserDataProtection(userId) {
    return dataDataProtection.getAllUserDataProtection(userId);
}

function getUserDataProtectionById(dataProtectionId) {
    return dataDataProtection.getUserDataProtectionById(dataProtectionId);
}


/** INSERT **/

function insertUserDataProtection(objUser, userId) {
    if (!objUser.USER_ID || !userId) {
        throw ErrorLib.getErrors().CustomError("", "", USER_NOT_FOUND);
    }

    return dataDataProtection.insertUserDataProtection(objUser.USER_ID, userId);
}

/** UPDATE **/

function updateUserDataProtectionStatus(reqBody, userId) {
    return dataDataProtection.updateUserDataProtectionStatus(reqBody, userId);
}

function updateDataProtectionStatus(objUser, userId) {
    //Validations
    validateDataProtection(objUser, userId);

    //Update the Status assigned for the User Data Protection
    var result = updateUserDataProtectionStatus(objUser, userId);

    //If succeed, then we proceed editing the User, based on the Status selected.
    if (result) {
        switch (Number(objUser.STATUS_ID)) {
            case USER_DATA_PROTECTION_STATUS.REJECTED:
                objUser.DATA_PROTECTION_ENABLED = 0;
                //Remove Data Protection Enabled from User
                userLib.updateDataProtection(objUser, userId);
                break;
            case USER_DATA_PROTECTION_STATUS.APPROVED:
                //Replace all information by the default Mask
                userLib.updateUserDataProtectionMask(objUser, userId);
                break;
            default:
                throw ErrorLib.getErrors().CustomError("", "", INVALID_DATA_PROTECTION_STATUS);
        }
    }

    return result;
}

/** VALIDATIONS **/

function validateDataProtection(reqBody, userId) {
    if (!reqBody || !reqBody.STATUS_ID) {
        throw ErrorLib.getErrors().CustomError("", "", INVALID_DATA_PROTECTION_STATUS);
    }

    if (!reqBody.USER_ID || !userId) {
        throw ErrorLib.getErrors().CustomError("", "", USER_NOT_FOUND);
    }

    if (!reqBody.USER_DATA_PROTECTION_ID) {
        throw ErrorLib.getErrors().CustomError("", "", OBJECT_NOT_FOUND);
    }

    var originalObject = getUserDataProtectionById(reqBody.USER_DATA_PROTECTION_ID);

    if (Number(originalObject.USER_DATA_PROTECTION_STATUS_ID) !== USER_DATA_PROTECTION_STATUS.PENDING) {
        throw ErrorLib.getErrors().CustomError("", "", CAN_NOT_UPDATE);
    }
}