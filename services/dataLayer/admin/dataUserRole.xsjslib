/** *************Import Library****************** */
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ********************************************** */

var spGetUserRoleByUserId = "GET_USER_ROLE_BY_USER_ID";
var spInsertUserRole = "INS_USER_ROLE";
var spUpdateUserRole = "UPD_USER_ROLE";
var spUpdateUserRoleByUserId = "UPD_USER_ROLE_BY_USER_ID";
var spDeleteUserRole = "DEL_USER_ROLE";
var spGetRoleNameByUserId = "GET_ROLE_NAME_BY_USER_ID";

/** *************************************************** */

function getUserRoleByUserId(userId) {
	var res = {};
	if (userId > 0) {
		var parameters = {
			'in_user_id' : userId
		};
		var result = db.executeProcedureManual(spGetUserRoleByUserId,
				parameters);
		return db.extractArray(result.USER_ROLE);
	}
	return [];
}

function getRoleNameByUserId(userId){
	var parameters = {};
	parameters.in_user_id = userId;
    parameters.out_result = '?';
    var result = db.executeProcedureManual(spGetRoleNameByUserId, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

function insertUserRole(userId, roleId, createUser) {
	var param = {};
	param.in_user_id = userId;
	param.in_role_id = roleId;
	param.in_created_user_id = createUser; // User that insert.
	
	return db.executeScalarManual(spInsertUserRole, param, "out_user_role_id");
}

function updateUserRole(userRoleId, userId, roleId, modUserRole) {
	var param = {};
	param.in_user_role_id = userRoleId;
	param.in_user_id = userId;
	param.in_role_id = roleId;
	param.in_modified_user_id = modUserRole; // User that updates

	return db.executeScalarManual(spUpdateUserRole, param, "out_result");
}

function updateUserRoleByUserId(userId, roleId, modUserRole) {
	var param = {};
	param.in_user_id = userId;
	param.in_role_id = roleId;
	param.in_modified_user_id = modUserRole; // User that updates

	return db.executeScalarManual(spUpdateUserRoleByUserId, param, "out_result");
}

function deleteUserRole(userRoleId, modUser) {
	var param = {};
	param.in_user_role_id = userRoleId;
	param.in_modified_user_id = modUser; // User that insert.

	return db.executeScalarManual(spDeleteUserRole, param, "out_result");
}