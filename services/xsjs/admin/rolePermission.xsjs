/****** libs ************/
$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var blRolePermission = mapper.getRolePermission();
/******************************************/

var GET_PERMISSION_BY_ROLE_ID = "ROLE_ID";
var GET_ALL_PERMISSIONS = "ALL";

var service_name = "rolePermission";

function processRequest(){
	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete, false, service_name);
}

//Implementation of GET call -- Get Role Permission
function handleGet(parameters, userSessionID){
	if(parameters.length > 0){
		if(parameters[0].name == GET_ALL_PERMISSIONS){	
			var rdo = blRolePermission.getAllPermissionByRole(roleId)
			return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		}else if (parameters[0].name === GET_PERMISSION_BY_ROLE_ID) {
			var roleId = parameters[0].value;
			var rdo = blRolePermission.getPermissionByRole(roleId)
			return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
		}else{
			throw ErrorLib.getErrors().BadRequest("","rolePermissionServices/handleGet","invalid parameter name (can be: ROLE_ID)");
		}
	}
	//if not match with any request supported, then return a bad request error
	throw ErrorLib.getErrors().BadRequest("","rolePermissionServices/handleGet", parameters);
};

//Implementation of POST call -- Insert Role Permission
function handlePost(reqBody,userSessionID) {	
	return httpUtil.notImplementedMethod();
}

//Implementation of UPDATE call -- Update Role Permission
function handlePut(reqBody,userSessionID){
	var rdo =  blRolePermission.updateRolePermission(reqBody,userSessionID);
	return httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
};

//Implementation of DELETE call -- Delete Role Permission
function handleDelete(reqBody,userSessionID){
	return httpUtil.notImplementedMethod();
};

//Call request processing  
processRequest();