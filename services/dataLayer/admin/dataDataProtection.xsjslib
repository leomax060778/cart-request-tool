$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

/** STORED PROCEDURES **/

var GET_ALL_USER_DATA_PROTECTION = "GET_ALL_USER_DATA_PROTECTION";
var GET_ALL_DATA_PROTECTION_REQUEST_STATUS = "GET_ALL_DATA_PROTECTION_REQUEST_STATUS";
var GET_USER_DATA_PROTECTION_BY_ID = "GET_USER_DATA_PROTECTION_BY_ID";
var INS_USER_DATA_PROTECTION = "INS_USER_DATA_PROTECTION";
var UPD_USER_DATA_PROTECTION_STATUS = "UPD_USER_DATA_PROTECTION_STATUS";

/** GET **/

function getAllUserDataProtection() {
    var res = db.executeProcedureManual(GET_ALL_USER_DATA_PROTECTION, {});
    return db.extractArray(res.out_result);
}

function getAllDataProtectionStatus() {
    var res = db.executeProcedureManual(GET_ALL_DATA_PROTECTION_REQUEST_STATUS, {});
    return db.extractArray(res.out_result);
}

function getUserDataProtectionById(userDataProtectionId) {
    var parameters = {};
    parameters.IN_USER_DATA_PROTECTION_ID = userDataProtectionId;
    var res = db.executeProcedureManual(GET_USER_DATA_PROTECTION_BY_ID, parameters);
    var arrayResult = db.extractArray(res.out_result);
    if (arrayResult.length) {
        return arrayResult[0];
    }
    return {};
}

/** INSERT **/

function insertUserDataProtection(userId, userSessionId) {
    var params = {};
    params.IN_USER_ID = userId;
    params.IN_CREATED_USER_ID = userSessionId;
    return db.executeScalar(INS_USER_DATA_PROTECTION, params, 'out_result');
}

/** UPDATE **/

function updateUserDataProtectionStatus(objUser, userId) {
    var params = {};
    params.IN_STATUS_ID = objUser.STATUS_ID;
    params.IN_USER_DATA_PROTECTION_ID = objUser.USER_DATA_PROTECTION_ID;
    params.IN_MODIFIED_USER_ID = userId;

    return db.executeScalar(UPD_USER_DATA_PROTECTION_STATUS, params, 'out_result');
}