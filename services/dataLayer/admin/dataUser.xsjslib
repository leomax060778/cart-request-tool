/** *************Import Library****************** */
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ********************************************** */

var spGetAll = "GET_ALL_USER";
var spGetAllForFilters = "GET_ALL_USER_FOR_FILTERS";
var spGetAllUserName = "GET_ALL_USER_NAME";
var spGetUserById = "GET_USER_BY_ID";
var spGetUserByUserName = "GET_USER_BY_USERNAME";
var spInseruser = "INS_USER";
var spUpdateUser = "UPD_USER";
var spDeleteUser = "DEL_USER";
var spUpdatePass = "UPD_USER_PASSWORD";
var spGetUsersByHl2Id = "GET_USERS_BY_HL2_ID";
var spGetUsersByHl3Id = "GET_USERS_BY_HL3_ID";
var spGetHash = "GET_HASH_SHA256";
var spGetUserByRoleId = "GET_USER_BY_ROLE_ID";

/** *************************************************** */

function getAllUser() {

	var rdo = db.executeProcedure(spGetAll, {});
	return db.extractArray(rdo.out_result);
}

function getAllUserForFilters(user_id) {
	var param = {};
	param.in_user_id = user_id;
	param.OUT_RESULT = '?';
	var rdo = db.executeProcedure(spGetAllForFilters, param);
	return db.extractArray(rdo.OUT_RESULT);
}

function getAllUserName() {

	var rdo = db.executeProcedure(spGetAllUserName, {});
	return db.extractArray(rdo.out_result);
}

function getUserById(id) {
	if (id != "") {
		var rdo = db.executeProcedure(spGetUserById, {
			'in_user_id' : id
		});
		return db.extractArray(rdo.USER);
	}
	return null;
}


function getUserByRoleId(id) {
	if (id != "") {
		var rdo = db.executeProcedure(spGetUserByRoleId, {
			'in_role_id' : id
		});
		return db.extractArray(rdo.USER_ROLE);
	}
	return null;
}

function getUserByUserName(userName){
	if (userName != "") {
		var rdo = db.executeProcedure(spGetUserByUserName, {
			'in_user_name' : userName
		});
		if(rdo['OUT_RESULT']){
			return rdo['OUT_RESULT'][0];
		}
	}
	return null;
}

function getUserByHl2Id(hl2Id) {
	var res = {};
	if (hl2Id > 0) {
		var rdo = db.executeProcedure(spGetUsersByHl2Id, {
			'in_hl2_id' : hl2Id
		});
		res.users_in = db.extractArray(rdo.users_in);
		res.users_out = db.extractArray(rdo.users_out);
	}
	return res;
}

function getUserByHl3Id(hl3Id) {
	var res = {};
	if (hl3Id > 0) {
		var rdo = db.executeProcedure(spGetUsersByHl3Id, {
			'in_hl3_id' : hl3Id
		});
		res.users_in = db.extractArray(rdo.users_in);
		res.users_out = db.extractArray(rdo.users_out);
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

	return db.executeScalarManual(spInseruser, param, "out_user_id");
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

function deleteUser(user, modUser) {
	var param = {};
	param.in_user_id = user.USER_ID;
	param.in_modified_user_id = modUser // User that insert.
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
	if(pass !== ""){	
		var result = db.executeProcedure(spGetHash, {
			'in_message' : pass
		});
		return db.extractArray(result['out_result']);
	}
	return null;	
}