/***************Import Library*******************/
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dbUserRole = mapper.getDataUserRole();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
var db = mapper.getdbHelper();

/*************************************************/

function getUserRoleByUserId(userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("",
            "", "The parameter ID is not found");
    }
    return dbUserRole.getUserRoleByUserId(userId);

}

function insertUserRole(userRole, createUserRole) {
    if (validateUserRole(userRole)) {
        return dbUserRole.insertUserRole(userRole, createUserRole);
    }
}

function updateUserRole(userRole, updateUserRole) {
    if (!util.validateIsNumber(userRole.ROLE_ID)) {
        throw ErrorLib.getErrors().CustomError("",
            "userRoleServices/handlePost/updateUserRole", "The ROLE_ID is invalid");
    }
    if (!util.validateIsNumber(userRole.USER_ID)) {
        throw ErrorLib.getErrors().CustomError("",
            "userRoleServices/handlePost/updateUserRole", "The USER_ID is invalid");
    }
    if (validateUserRole(userRole)) {
        return dbUserRole.updateUserRole(userRole, updateUserRole);
    }
}

function deleteUserRole(userRole, deleteUserRole) {
    if (!userRole.USER_ROLE_ID) {
        throw ErrorLib.getErrors().CustomError("",
            "userRoleServices/handleDelete/deleteUserRole",
            "The USER_ROLE_ID is not found");
    }

    if (!util.validateIsNumber(userRole.USER_ROLE_ID)) {
        throw ErrorLib.getErrors().CustomError("",
            "userRoleServices/handleDelete/deleteUserRole", "The USER_ROLE_ID is invalid");
    }

    return dbUserRole.deleteUserRole(userRole, deleteUserRole);
}

function validateUserRole(userRole) {
    if (!userRole) {
        throw ErrorLib.getErrors().CustomError("",
            "roleServices", "User role is not found");
    }

    if (!userRole.ROLE_ID) {
        throw ErrorLib.getErrors().CustomError("",
            "userRoleServices",
            "The ROLE_ID is not found");
    }

    if (!userRole.USER_ID) {
        throw ErrorLib.getErrors().CustomError("",
            "userRoleServices",
            "The USER_ID is not found");
    }
    return true;
}