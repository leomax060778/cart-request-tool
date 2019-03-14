/** *************Import Library****************** */
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ********************************************** */

var spGetAll = "GET_ALL_USER";
var spGetAllUserProcessor = "GET_ALL_USER_PROCESSOR";
var spGetAllForFilters = "GET_ALL_USER_FOR_FILTERS";
var spGetAllByUserName = "GET_ALL_USER_BY_USER_NAME";
var spGetAllUserName = "GET_ALL_USER_NAME";
var spGetUserById = "GET_USER_BY_ID";
var spGetUserByUserName = "GET_USER_BY_USERNAME";
var spGetUserByEmail = "GET_USER_BY_EMAIL";
var spInsertUser = "INS_USER";
var spRestoreUser = "UPD_USER_RESTORE";
var spUpdateUser = "UPD_USER";
var spUpdateUserDataProtection = "UPD_USER_DATA_PROTECTION";
var spUpdateUserApplyDataProtection = "UPD_USER_APPLY_DATA_PROTECTION";
var spDeleteUser = "DEL_USER";
var spUpdatePass = "UPD_USER_PASSWORD";
var spGetUsersByHl2Id = "GET_USERS_BY_HL2_ID";
var spGetUsersByHl3Id = "GET_USERS_BY_HL3_ID";
var spGetHash = "GET_HASH_SHA256";
var spGetUserByRoleId = "GET_USER_BY_ROLE_ID";

/** *************************************************** */

function getAllUser() {
    var res = db.executeProcedure(spGetAll, {});
    return db.extractArray(res.out_result);
}

function getAllUserProcessor() {
    var res = db.executeProcedure(spGetAllUserProcessor, {});
    return db.extractArray(res.out_result);
}

function getAllUserByUserName(userName){
    var params = {};
    params.IN_USER_NAME = userName;

    var res = db.executeProcedure(spGetAllByUserName, params);
    return db.extractArray(res.out_result);
}

function getAllUserForFilters(user_id) {
    var param = {};
    param.in_user_id = user_id;
    param.OUT_RESULT = '?';
    var res = db.executeProcedure(spGetAllForFilters, param);
    return db.extractArray(res.OUT_RESULT);
}

function getAllUserName() {
    var res = db.executeProcedure(spGetAllUserName, {});
    return db.extractArray(res.out_result);
}

function getUserById(id) {
    if (id !== "") {
        var res = db.executeProcedure(spGetUserById, {
            'in_user_id': id
        });
        return db.extractArray(res.USER);
    }
    return null;
}

function getUserByRoleId(id) {
    if (id !== "") {
        var res = db.executeProcedure(spGetUserByRoleId, {
            'in_role_id': id
        });
        return db.extractArray(res.USER_ROLE);
    }
    return null;
}

function getUserByUserName(userName) {
    if (userName !== "") {
        var res = db.executeProcedure(spGetUserByUserName, {
            'in_user_name': userName
        });
        if (res['OUT_RESULT']) {
            return res['OUT_RESULT'][0];
        }
    }
    return null;
}

function getUserByEmail(email) {
    var res = db.executeProcedureManual(spGetUserByEmail, {
        'in_email': email
    });
    return db.extractArray(res.out_result)[0];
}

function getUserByHl2Id(hl2Id) {
    var res = {};
    if (hl2Id > 0) {
        res = db.executeProcedure(spGetUsersByHl2Id, {
            'in_hl2_id': hl2Id
        });
        res.users_in = db.extractArray(res.users_in);
        res.users_out = db.extractArray(res.users_out);
    }
    return res;
}

function getUserByHl3Id(hl3Id) {
    var res = {};
    if (hl3Id > 0) {
        var result = db.executeProcedure(spGetUsersByHl3Id, {
            'in_hl3_id': hl3Id
        });
        res.users_in = db.extractArray(result.users_in);
        res.users_out = db.extractArray(result.users_out);
    }
    return res;
}

function insertUser(user, createUser) {
    var param = {};
    param.in_user_name = user.USER_NAME;
    param.in_first_name = user.FIRST_NAME;
    param.in_last_name = user.LAST_NAME;
    param.in_email = user.EMAIL;
    param.in_phone = user.PHONE;
    param.in_user_id = createUser; // User that insert.

    return db.executeScalarManual(spInsertUser, param, "out_user_id");
}

function updateUserDataProtectionMask(mask, objUser, userId) {
    var param = {};
    param.in_user_id = objUser.USER_ID;
    param.in_mask = mask;
    param.in_modified_user_id = userId;
    param.out_result = "?";
    
    return db.executeScalar(spUpdateUserApplyDataProtection, param, "out_result");
}

function updateDataProtection(objUser, userId) {
    var param = {};
    param.in_user_id = objUser.USER_ID;
    param.in_data_protection_enabled = objUser.DATA_PROTECTION_ENABLED ? 1 : 0;
    param.in_modified_user_id = userId;
    param.out_result = "?";
    
    return db.executeScalar(spUpdateUserDataProtection, param, "out_result");
}

function updateUser(user, modUser) {
    var param = {};
    param.in_user_id = user.USER_ID;
    param.in_user_name = user.USER_NAME;
    param.in_first_name = user.FIRST_NAME;
    param.in_last_name = user.LAST_NAME;
    param.in_email = user.EMAIL;
    param.in_phone = user.PHONE;
    param.in_modified_user_id = modUser; // User that insert.

    return db.executeScalar(spUpdateUser, param, "out_result");
}

function restoreUser(reqBody, userId){
    var params = {};
    params.IN_USER_ID = reqBody.USER_ID;
    params.IN_MODIFIED_USER_ID = userId;

    return db.executeScalar(spRestoreUser, params, "out_result");
}

function deleteUser(user, modUser) {
    var param = {};
    param.in_user_id = user.USER_ID;
    param.in_modified_user_id = modUser; // User that insert.
    //param.out_result = '?';

    return db.executeScalar(spDeleteUser, param, "out_result");
}

function updatePass(userId, pass, passSalt, modUser) {
    var param = {};
    param.in_user_id = userId;
    param.in_password = pass;
    param.in_salt = passSalt;
    param.in_modified_user_id = modUser;
    param.out_result = '?';

    return db.executeScalarManual(spUpdatePass, param, "out_result");
}

function getPasswordHash(pass) {
    if (pass !== "") {
        var result = db.executeProcedure(spGetHash, {
            'in_message': pass
        });
        return db.extractArray(result['out_result']);
    }
    return null;
}