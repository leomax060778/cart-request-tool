/****** libs ************/
$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var blRolePermission = mapper.getRolePermission();
/******************************************/

var GET_PERMISSION_BY_ROLE_ID = "ROLE_ID";
var GET_ALL_PERMISSIONS = "ALL";
var permissionLevelMethod = "SPECIAL_PERMISSION";

var service_name = "rolePermission";

function processRequest(){
	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete, false, service_name);
}

//Implementation of GET call -- Get Role Permission
function handleGet(parameters, userSessionID){
	var res;
	if(parameters.length > 0){
		if(parameters[0].name === GET_ALL_PERMISSIONS){	
			res = blRolePermission.getAllPermissionByRole();
		}else if (parameters[0].name === GET_PERMISSION_BY_ROLE_ID) {
			var roleId = parameters[0].value;
			res = blRolePermission.getPermissionByRole(roleId);
		}else{
			throw ErrorLib.getErrors().BadRequest("","rolePermissionServices/handleGet","invalid parameter name (can be: ROLE_ID)");
		}
		return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
	}
	//if not match with any request supported, then return a bad request error
	throw ErrorLib.getErrors().BadRequest("","rolePermissionServices/handleGet", parameters);
}

//Implementation of POST call -- Insert Role Permission
function handlePost() {	
	return httpUtil.notImplementedMethod();
}

//Implementation of UPDATE call -- Update Role Permission
function handlePut(reqBody,userSessionID){
	var res;
	var method = httpUtil.getUrlParameters();
	
	if(method.length > 0){
		if(method.get("METHOD") === permissionLevelMethod){
			var rolePermissionLevel = blRolePermission.updateRolePermissionLevel(reqBody, userSessionID);
			if (reqBody.MESSAGE_TYPE_PERMISSION.length > 0) {
				var messageTypePermission = blRolePermission.updateMessageTypePermission(reqBody.MESSAGE_TYPE_PERMISSION[0], reqBody.ROLE_ID, userSessionID);
				res = {"ROLE_PERMISSION_LEVEL": rolePermissionLevel, "MESSAGE_TYPE_PERMISSION": messageTypePermission};
			} else {
				res = rolePermissionLevel;
			}
		}else{
			throw ErrorLib.getErrors().BadRequest("","rolePermissionServices/handlePut","invalid parameter name (can be: SPECIAL_PERMISSION)");
		}
	}else{
		res =  blRolePermission.updateRolePermission(reqBody,userSessionID);
	}
	
	return httpUtil.handleResponse(res,httpUtil.OK,httpUtil.AppJson);
}

//Implementation of DELETE call -- Delete Role Permission
function handleDelete(){
	return httpUtil.notImplementedMethod();
}

//Call request processing  
processRequest();