/** *************Import Library****************** */
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ********************************************** */

var spGetRolePermissionByRole = "GET_ALL_ROLE_PERMISSION_BY_ROLE";
var spGetRolePermissionByRoleAndResource = "GET_ROLE_PERMISSION_BY_ROLE_RESOURCE_PERMISSION";
var spInsertRolePermission = "INS_ROLE_PERMISSION";
var spUpdateRolePermission = "UPD_ROLE_PERMISSION";
var spUpdateRolePermissionLevel = "UPD_ROLE_PERMISSION_LEVEL";

/** *********************Message Type Permission Sp************************* */
var GET_MESSAGE_TYPE_PERMISSION_BY_ROLE_RESOURCE = "GET_MESSAGE_TYPE_PERMISSION_BY_ROLE_RESOURCE";
var GET_MESSAGE_TYPE_PERMISSION_BY_USER_ROLE_ID = "GET_MESSAGE_TYPE_PERMISSION_BY_USER_ROLE_ID";
var GET_MESSAGE_TYPE_PERMISSION_BY_ROLE_ID = "GET_MESSAGE_TYPE_PERMISSION_BY_ROLE_ID";
var INS_MESSAGE_TYPE_PERMISSION = "INS_MESSAGE_TYPE_PERMISSION";
var UPD_MESSAGE_TYPE_PERMISSION = "UPD_MESSAGE_TYPE_PERMISSION";
/** ********************* END ************************* */

function getPermissionByRole(roleId) {
	if (!!roleId) {
		var rdo = db.executeProcedure(spGetRolePermissionByRole, {
			'in_role_id' : roleId
		});

		return db.extractArray(rdo.result);
	}
	return null;
}

function getPermissionByRoleAndResourceAndPermission(roleId, resourceId,
		permissionId) {
	var result = {};
	if (!!roleId && !!resourceId && !!permissionId) {
		var params = {
			'in_role_id' : roleId,
			'in_resource_id' : resourceId,
			'in_permission_id' : permissionId
		};

		var rdo = db.executeProcedure(spGetRolePermissionByRoleAndResource,
				params);
		result = db.extractArray(rdo.out_result);
		return result;
	}

	return result;
}

function existsRolePermission(roleId, resourceId, permissionId) {
	var exists = false;
	var parameters = {
		'in_role_id' : roleId,
		'in_resource_id' : resourceId,
		'in_permission_id' : permissionId
	};

	var result = db.executeProcedure(
			spGetRolePermissionByRoleAndResource, parameters);
	var list = db.extractArray(result.out_result);
	exists = list.length > 0;
	return exists;
}

function insertRolePermission(roleId, resourceId, permissionId, enabled,
		createUser) {
	var parameters = {};
	parameters.in_role_id = roleId;
	parameters.in_resource_id = resourceId;
	parameters.in_permission_id = permissionId;
	parameters.in_enabled = enabled;
	parameters.in_created_user_id = createUser;

	return db.executeScalarManual(spInsertRolePermission, parameters,
			"out_role_permission_id");
}

function updateRolePermission(roleId, resourceId, permissionId, enabled,
		modUser) {
	var parameters = {};
	parameters.in_role_id = roleId;
	parameters.in_resource_id = resourceId;
	parameters.in_permission_id = permissionId;
	parameters.in_enabled = enabled;
	parameters.in_user_id = modUser;

	return db.executeScalarManual(spUpdateRolePermission, parameters,
			"out_result");
}

function updateRolePermissionLevel(objRolePermission, userId){
	var parameters = {};
	parameters.in_role_id = objRolePermission.ROLE_ID;
	parameters.in_resource_id = objRolePermission.RESOURCE_ID;
	parameters.in_permission_id = objRolePermission.PERMISSION_ID;
	parameters.in_permission_level = objRolePermission.PERMISSION_LEVEL;
	parameters.in_modified_user_id = userId;

	return db.executeScalar(spUpdateRolePermissionLevel, parameters, "out_result");
}

/** *********************Message Type Permission************************* */

function getMessageTypePermissionByRoleResource(roleId, resourceId) {
	var parameters = {};
	parameters.in_role_id = roleId;
	parameters.in_resource_id = resourceId; 
	var result = db.executeProcedure(GET_MESSAGE_TYPE_PERMISSION_BY_ROLE_RESOURCE, parameters);
	return db.extractArray(result.out_result);
}

function getMessageTypePermissionByUserRole(userId) {
	var parameters = {};
	parameters.in_user_id = userId; 
	var result = db.executeProcedure(GET_MESSAGE_TYPE_PERMISSION_BY_USER_ROLE_ID, parameters);
	return db.extractArray(result.out_result);
}

function getMessageTypePermissionByRoleId(roleId) {
	var parameters = {};
	parameters.in_role_id = roleId; 
	var result = db.executeProcedure(GET_MESSAGE_TYPE_PERMISSION_BY_ROLE_ID, parameters);
	return db.extractArray(result.out_result);
}

function insertMessageTypePermission(objMessageTypePermission, userId) {
	var parameters = {};
	parameters.in_role_id = objMessageTypePermission.ROLE_ID;
	parameters.in_resource_id = objMessageTypePermission.RESOURCE_ID;
	parameters.in_permission_id = objMessageTypePermission.PERMISSION_ID;
	parameters.in_enabled = objMessageTypePermission.ENABLED;
	parameters.in_created_user_id = userId;

	return db.executeScalar(INS_MESSAGE_TYPE_PERMISSION, parameters, "out_result");
}

function updateMessageTypePermission(objMessageTypePermission, userId){
	var parameters = {};
	parameters.in_role_id = objMessageTypePermission.ROLE_ID;
	parameters.in_resource_id = objMessageTypePermission.RESOURCE_ID;
	parameters.in_enabled = objMessageTypePermission.ENABLED;
	parameters.in_modified_user_id = userId;

	return db.executeScalar(UPD_MESSAGE_TYPE_PERMISSION, parameters, "out_result");
}