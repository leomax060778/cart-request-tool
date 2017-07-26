/** *************Import Library****************** */
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataRole = mapper.getDataRole();
var dataPermissions = mapper.getDataPermission();
var dataRolePermission = mapper.getDataRolePermission();
var dataResource = mapper.getDataResource();
var ErrorLib = mapper.getErrors();
var db = mapper.getdbHelper();
/** ********************************************** */

var RoleEnum = {
		SuperAdmin: 1,
		Requester: 2,
		BusinessMgt: 3,
		BusinessOwner: 4
	};

var permissionLevel = {
	"level1": 1,
	"level2": 2
};

/* Return all permissions for roles */
function getAllPermissionByRole() {
	// get the roles
	var roles = dataRole.getAllRole();

	// get the resources
	var sysResources = dataResource.getAllResource();

	// get the permissions
	var sysPermissions = dataPermissions.getAllPermission();

	// permissions by role
	var rolePermissions = [];

	// get the permissions by role
	var jsonData = [];

	// loop for roles
	for (var i = 0; i < roles.length; i++) {

		// loop for resources
		for (var r = 0; r < sysResources.length; r++) {
			var permissionsResource = [];

			// loop for permissions by role and resource
			for (var p = 0; p < sysPermissions.length; p++) {
				// look for the permission setting for role-resource
				var currentPermission = dataRolePermission
						.getPermissionByRoleAndResourceAndPermission(
								roles[i].ROLE_ID, sysResources[r].RESOURCE_ID,
								sysPermissions[p].PERMISSION_ID);

				var permissionEnabled = currentPermission.length > 0
						&& currentPermission[0].ENABLED == 1 ? true : false;

				var permissionSetting = {};
				permissionSetting["PERMISSION"] = sysPermissions[p].NAME;
				permissionSetting["PERMISSION_ID"] = sysPermissions[p].PERMISSION_ID;
				permissionSetting["ENABLED"] = permissionEnabled;
				permissionsResource.push(permissionSetting);
			} // end loop for permissions by role and resource

			var resource = {
				"RESOURCE" : sysResources[r].NAME,
				"RESOURCE_ID" : sysResources[r].RESOURCE_ID,
				"CONFIGURATION" : permissionsResource
			};

			rolePermissions.push(resource);
		} // end loop for resources

		// add the permissions configured for the current role
		var rolePermissionsConfiguration = {
			"ROLE" : roles[i].NAME,
			"ROLE_ID" : roles[i].ROLE_ID,
			"PERMISSIONS" : rolePermissions
		}

		jsonData.push(rolePermissionsConfiguration);
	}

	// end loop for roles
	return jsonData;
}

/* Return permissions for the role supplied as parameter */
function getPermissionByRole(roleId) {

	// get the roles
	var roles = dataRole.getRoleById(roleId);

	// get the resources
	var sysResources = dataResource.getAllResource();

	// get the permissions
	var sysPermissions = dataPermissions.getAllPermission();

	// permissions by role
	var rolePermissions = [];

	// get the permissions by role
	var jsonData = [];

	// loop for roles
	for (var i = 0; i < roles.length; i++) {

		// loop for resources
		for (var r = 0; r < sysResources.length; r++) {
			var permissionsResource = [];
			// loop for permissions by role and resource
			for (var p = 0; p < sysPermissions.length; p++) {
				// look for the permission setting for role-resource
				var currentPermission = dataRolePermission
						.getPermissionByRoleAndResourceAndPermission(
								roles[i].ROLE_ID, sysResources[r].RESOURCE_ID,
								sysPermissions[p].PERMISSION_ID);

				var permissionEnabled = currentPermission.length > 0 && currentPermission[0].ENABLED == 1 ? true : false;
				//Special Permissions
				var permissionLevel = (currentPermission.length > 0 && currentPermission[0].PERMISSION_LEVEL)? currentPermission[0].PERMISSION_LEVEL : false;

				var permissionSetting = {};
				permissionSetting["PERMISSION"] = sysPermissions[p].NAME;
				permissionSetting["PERMISSION_ID"] = sysPermissions[p].PERMISSION_ID;
				permissionSetting["ENABLED"] = permissionEnabled;
				permissionSetting["PERMISSION_LEVEL"] = permissionLevel;
				permissionsResource.push(permissionSetting);
			} // end loop for permissions by role and resource

			var resource = {
				"RESOURCE" : sysResources[r].NAME,
				"RESOURCE_ID" : sysResources[r].RESOURCE_ID,
				"CONFIGURATION" : permissionsResource
			};

			rolePermissions.push(resource);
		} // end loop for resources

		// add the permissions configured for the current role
		var rolePermissionsConfiguration = {
			"ROLE" : roles[i].NAME,
			"ROLE_ID" : roles[i].ROLE_ID,
			"PERMISSIONS" : rolePermissions,
			"READONLY": roles[i].ROLE_ID == RoleEnum.SuperAdmin
		}

		jsonData.push(rolePermissionsConfiguration);
	}

	// end loop for roles
	return jsonData;
}

/* Update role permissions */
function updateRolePermission(rolePermissions, modifiedUser) {

	if (!rolePermissions)
		throw ErrorLib.getErrors().CustomError("",
				"rolePermissionServices/handlePost/updateRolePermission",
				"The ROLE PERMISSION is not found");

	if (rolePermissions.length <= 0)
		throw ErrorLib.getErrors().CustomError("",
				"rolePermissionServices/handlePost/updateRolePermission",
				"The ROLE PERMISSION is empty");

	// update the role permissions
	try {
		var roleId = null;
		var resourceId = null;
		var permissionId = null;
		var enabled = false;
		var resultTransaction = null;
		var permissionEnabled = null;
		if (validateRolePermission(rolePermissions)) {
			for (var i = 0; i < rolePermissions.length; i++) {
				roleId = rolePermissions[i].ROLE_ID;

				// validate permissions by role
				for (var j = 0; j < rolePermissions[i].PERMISSIONS.length; j++) {
					resourceId = rolePermissions[i].PERMISSIONS[j].RESOURCE_ID;

					// validate the configuration for the resource
					for (var r = 0; r < rolePermissions[i].PERMISSIONS[j].CONFIGURATION.length; r++) {
						permissionId = rolePermissions[i].PERMISSIONS[j].CONFIGURATION[r].PERMISSION_ID;
						enabled = rolePermissions[i].PERMISSIONS[j].CONFIGURATION[r].ENABLED;
						permissionEnabled = typeof (enabled) != 'undefined'
								&& enabled == true ? 1 : 0;

						// Check if exists the configuration for the combination
						// of
						// role & resource & permission
						if (existsRolePermission(roleId, resourceId,
								permissionId)) {
							// update the role permission
							resultTransaction = dataRolePermission
									.updateRolePermission(roleId, resourceId,
											permissionId, permissionEnabled,
											modifiedUser);
							if(!permissionEnabled && (rolePermissions[i].PERMISSIONS[j].CONFIGURATION[r].PERMISSION_LEVEL !== permissionLevel.level1)){
								var payload = rolePermissions[i].PERMISSIONS[j];
								payload.SPECIAL_PERMISSION = false;
								payload.ROLE_ID = Number(roleId);
								
								updateRolePermissionLevel(payload, modifiedUser);
							}
						} else {
							// insert the configuration for the role permission
							// (role, resource and permission)
							resultTransaction = dataRolePermission
									.insertRolePermission(roleId, resourceId,
											permissionId, permissionEnabled,
											modifiedUser);
						}

					} // end loop for permissions for role and resource

				} // end loop for permissions for resource

			} // end loop for roles

			if (!!resultTransaction) {
				db.commit();
			} else {
				db.rollback();
			}
			
		}
		return resultTransaction;
	} catch (e) {
		db.rollback();
		throw e;
	} finally {
		db.closeConnection();
	}
}

//Update Permission Level from Role Permission
function updateRolePermissionLevel(objRolePermission, userId){
	var result;
	
	if(validateUpdateRolePermissionLevel(objRolePermission, objRolePermission.CONFIGURATION)){
		if(!userId){
			throw ErrorLib.getErrors().CustomError("",
					"rolePermissionServices/handlePut/updateRolePermissionLevel",
					"The User ID is not found");
		}
		
		objRolePermission.PERMISSION_LEVEL = (objRolePermission.SPECIAL_PERMISSION)? permissionLevel.level2 : permissionLevel.level1;
		objRolePermission.PERMISSION_ID = Number(objRolePermission.CONFIGURATION[0].PERMISSION_ID);
		
		result = dataRolePermission.updateRolePermissionLevel(objRolePermission, userId);
	}
	return result;
}

/* Validate role permissions object */
function validateRolePermission(rolePermissions) {

	for (var i = 0; i < rolePermissions.length; i++) {
		if (!rolePermissions[i]) {
			throw ErrorLib.getErrors().CustomError("",
					"userServices/handlePost/updateRolePermission",
					"The ROLE PERMISSION is not found");
		}

		if (!rolePermissions[i].ROLE_ID) {
			throw ErrorLib.getErrors().CustomError("",
					"userServices/handlePost/updateRolePermission",
					"The ROLE ID in ROLE PERMISSION is not found");
		}
		
		if(rolePermissions[i].ROLE_ID == RoleEnum.SuperAdmin)
			return false;

		if (!rolePermissions[i].PERMISSIONS) {
			throw ErrorLib.getErrors().CustomError("",
					"userServices/handlePost/updateRolePermission",
					"The ROLE PERMISSIONS in ROLE PERMISSION is not found");
		}

		if (rolePermissions[i].PERMISSIONS.length <= 0) {
			throw ErrorLib.getErrors().CustomError("",
					"userServices/handlePost/updateRolePermission",
					"The ROLE PERMISSIONS in ROLE PERMISSION is not found");
		}

		// validate permissions by role
		for (var j = 0; j < rolePermissions[i].PERMISSIONS.length; j++) {
			if (!rolePermissions[i].PERMISSIONS[j]) {
				throw ErrorLib.getErrors().CustomError("",
						"userServices/handlePost/updateRolePermission",
						"The PERMISSIONS in ROLE PERMISSION is not found");
			}

			if (!rolePermissions[i].PERMISSIONS[j].RESOURCE) {
				throw ErrorLib.getErrors().CustomError("",
						"userServices/handlePost/updateRolePermission",
						"The RESOURCE in ROLE PERMISSION is not found");
			}

			if (!rolePermissions[i].PERMISSIONS[j].CONFIGURATION) {
				throw ErrorLib
						.getErrors()
						.CustomError("",
								"userServices/handlePost/updateRolePermission",
								"The RESOURCE CONFIGURATION in ROLE PERMISSION is not found");
			}

			if (!rolePermissions[i].PERMISSIONS[j].CONFIGURATION) {
				throw ErrorLib
						.getErrors()
						.CustomError("",
								"userServices/handlePost/updateRolePermission",
								"The RESOURCE CONFIGURATION in ROLE PERMISSION is not found");
			}

			// validate the configuration for the resource
			for (var r = 0; r < rolePermissions[i].PERMISSIONS[j].CONFIGURATION.length; r++) {
				if (!rolePermissions[i].PERMISSIONS[j].CONFIGURATION[r]) {
					throw ErrorLib.getErrors().CustomError("",
							"userServices/handlePost/updateRolePermission",
							"The CONFIGURATION FOR RESOURCE is not found");
				}

				if (!rolePermissions[i].PERMISSIONS[j].CONFIGURATION[r].PERMISSION_ID) {
					throw ErrorLib
							.getErrors()
							.CustomError(
									"",
									"userServices/handlePost/updateRolePermission",
									"The PERMISSION ID in CONFIGURATION FOR RESOURCE is not found");
				}

				if (typeof (rolePermissions[i].PERMISSIONS[j].CONFIGURATION[r].ENABLED) == 'undefined') {
					throw ErrorLib
							.getErrors()
							.CustomError(
									"",
									"userServices/handlePost/updateRolePermission",
									"The ENABLED in CONFIGURATION FOR RESOURCE is not found");
				}

			}
		}
	}

	return true;
}

function validateUpdateRolePermissionLevel(objRolePermission, configuration){
	var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['ROLE_ID',
                'RESOURCE_ID'];

    if (!objRolePermission) {
        throw ErrorLib.getErrors().CustomError("", "rolePermissionServices/handlePut/updateRolePermissionLevel", "The object Role Permission is not found");
    }
    
    if(!configuration[0].ENABLED && objRolePermission.SPECIAL_PERMISSION){
    	throw ErrorLib.getErrors().CustomError("", "rolePermissionServices/handlePut/updateRolePermissionLevel", "The resource is not available for Special Permissions");
    }

    try {
        keys.forEach(function (key) {
            if (objRolePermission[key] === null || objRolePermission[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objRolePermission[key]);
                if (!isValid) {
                    errors[key] = objRolePermission[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "rolePermissionServices/handlePut/updateRolePermissionLevel", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "rolePermissionServices/handlePut/updateRolePermissionLevel", JSON.stringify(errors));
        }
    }
    return isValid;
}

//Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'ROLE_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'RESOURCE_ID':
        	valid = !isNaN(value) && value > 0;
            break;
    }
    return valid;
}

/* Validate if exists the role permissions in the database */
function existsRolePermission(roleId, resourceId, permissionId) {
	return dataRolePermission.existsRolePermission(roleId, resourceId,
			permissionId);
}
