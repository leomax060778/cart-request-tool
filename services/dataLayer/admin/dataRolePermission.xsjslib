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
