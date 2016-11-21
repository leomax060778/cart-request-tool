/** *************Import Library****************** */
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var data = mapper.getDataRole();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
/** ********************************************** */

function getAllRole() {
	return data.getAllRole();
}

function getRoleById(id) {
	if (!id)
		throw ErrorLib.getErrors().BadRequest("The parameter ID is not found",
				"roleServices/handleGet/getRoleById", id);
	return data.getRoleById(id);

}

function insertRole(role, createRole) {
	if (validateRole(role)) {
		return data.insertRole(role, createRole);
	}
}

function updateRole(role, updateRole) {
	if (!role.ROLE_ID)
		throw ErrorLib.getErrors().CustomError("",
				"roleServices/handlePost/insertRole",
				"The ROLE_ID is not found");

	if (!util.validateIsNumber(role.ROLE_ID))
		throw ErrorLib.getErrors().CustomError("",
				"roleServices/handlePost/insertRole", "The ROLE_ID is invalid");

	if (validateRole(role)) {
		return data.updateRole(role, updateRole);
	}
}

function deleteRole(role, deleteRole) {
	if (!role.ROLE_ID)
		throw ErrorLib.getErrors().CustomError("",
				"roleServices/handlePost/insertRole",
				"The ROLE_ID is not found");

	if (!util.validateIsNumber(role.ROLE_ID))
		throw ErrorLib.getErrors().CustomError("",
				"roleServices/handlePost/insertRole", "The ROLE_ID is invalid");

	return data.deleteRole(role, deleteRole);
}

function validateRole(role) {
	if (!role)
		throw ErrorLib.getErrors().CustomError("",
				"roleServices/handlePost/insertRole", "Role is not found");

	if (!role.NAME)
		throw ErrorLib.getErrors().CustomError("",
				"roleServices/handlePost/insertRole", "The NAME is not found");

	if (!util.validateLength(role.NAME, 255, 1)
			|| !util.validateIsString(role.NAME))
		throw ErrorLib.getErrors().CustomError("",
				"roleServices/handlePost/insertRole", "The NAME is invalid");

	return true;
}