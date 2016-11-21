/***************Import Library*******************/
$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dbRolePermission = mapper.getRolePermission();
var ErrorLib = mapper.getErrors();
/*************************************************/

function getAll(){
	return dbRolePermission.getAllPermissionByRole();
}

