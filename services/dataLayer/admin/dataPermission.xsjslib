$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

// STORE PROCEDURE LIST NAME
var GET_ALL_PERMISSION = "GET_ALL_PERMISSION";
var spGetAllRolePermissionByUserPermissionResource = "GET_ALL_ROLE_PERMISSION_BY_USER_PERMISSION_RESOURCE";
var spGetAllResourcesByServiceNamePermissionId = "GET_ALL_RESOURCE_BY_SERVICE_NAME_PERMISSION_ID";

function getAllPermission() {
	var parameters = {};
	var result = db.executeProcedure(GET_ALL_PERMISSION, {});
	return db.extractArray(result.out_result);
}

function checkAuthorization(UserId, objPermission, serviceName){
	
	if(!(UserId && objPermission) ){
		throw ErrorLib.getErrors().CustomError("","","Insufficient permissions."); 
	}
	
	var resources_param = {
			"in_service_name": serviceName,
			"in_permission_id": Number(objPermission)
	};
	
	var resources = db.executeProcedure(spGetAllResourcesByServiceNamePermissionId, resources_param);

	resources = db.extractArray(resources.out_result);
	
	if(resources.length){
		var result_procedure;
		var return_result = false;
		
		var params = {
				"in_user_id":UserId,
				"in_permission_id": objPermission
			};
		
		for (var i = 0; i < resources.length; i++) {
            var resource = resources[i];
            params.in_resource_id = resource.RESOURCE_ID;
            result_procedure = db.executeProcedure(spGetAllRolePermissionByUserPermissionResource, params);
			var partialRdo = db.extractArray(result_procedure.out_result);
			if(partialRdo.length){
				return_result = true;
				break;
			}
        }
		
		return return_result;
		
	} else{
		throw ErrorLib.getErrors().Forbidden("","","The service name provided doesn't exist.");
	}

}

function isAuthorized(UserId, objPermission, serviceName){
	
	if(!(UserId && objPermission) ){
		throw ErrorLib.getErrors().CustomError("","","Insufficient permissions."); 
	}
	
	var resources_param = {
			"in_service_name": serviceName,
			"in_permission_id": Number(objPermission)
	};
	
	var resources = db.executeProcedure(spGetAllResourcesByServiceNamePermissionId, resources_param);

	resources = db.extractArray(resources.out_result);
	
	if(resources.length){
		var result_procedure;
		var return_result = false;
		
		var params = {
				"in_user_id":UserId,
				"in_permission_id": objPermission
			};
		
		for (var i = 0; i < resources.length; i++) {
            var resource = resources[i];
            params.in_resource_id = resource.RESOURCE_ID;
            result_procedure = db.executeProcedure(spGetAllRolePermissionByUserPermissionResource, params);
			var partialRdo = db.extractArray(result_procedure.out_result);
			if(partialRdo.length){
				return_result = true;
				break;
			}
        }
		
		if(return_result){
			return return_result;
		}
		
		throw ErrorLib.getErrors().Forbidden("","","The user does not have permission for this resource.");
		
	} else{
		throw ErrorLib.getErrors().Forbidden("","","The service name provided doesn't exist.");
	}

}
