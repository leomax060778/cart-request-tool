$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

// STORE PROCEDURE LIST NAME
var GET_ALL_PERMISSION = "GET_ALL_PERMISSION";
var spGetAllRolePermissionByUserPermissionResource = "GET_ALL_ROLE_PERMISSION_BY_USER_PERMISSION_RESOURCE";

function getAllPermission() {
	var parameters = {};
	var result = db.executeProcedure(GET_ALL_PERMISSION, {});
	return db.extractArray(result.out_result);
}

function isAuthorized(UserId, PermissionId, ResourceId){
	
	if(!(UserId && PermissionId && ResourceId) ){
		throw ErrorLib.getErrors().CustomError("","","Insufficient permissions."); 
	}
	var params = {
			"in_user_id":UserId,
			"in_permission_id":PermissionId,
			"in_resource_id":ResourceId
		};
	var result = db.executeProcedure(spGetAllRolePermissionByUserPermissionResource, params);
	var partialRdo = db.extractArray(result.OUT_RESULT);
	
	if(partialRdo.length){
		return true;
	}else{
		throw ErrorLib.getErrors().Forbidden("","","The user hasn't permission for this resource.");
	}
}
