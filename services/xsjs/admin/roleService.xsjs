/** **** libs *********** */
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var businessRole = mapper.getRole();
/** *************************************** */

var getAll = "ALL";
var getRoleById = "ROLEBYID";
var method = "method";
var id = "id";

var service_name = "roleService";

function processRequest() {
	httpUtil.processRequest3(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

// Not Implemented Method
function handleGet(param) {
	var rdo = businessRole.getAllRole();
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
	/*
	if (param.length > 0) {
		if (param[0].name == method) {
			if (param[0].value == "ALL") { // get all roles
				var rdo = businessRole.getAllRole();
				httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
			}

			if (param.length > 1) {
				if (param[0].value == getRoleById) {
					if (param[1].name == id) {// get role by id

						var rdo = role.getUserById(param[1].value);
						return httpUtil.handleResponse(rdo, httpUtil.OK,
								httpUtil.AppJson);
					}
				}
			} else {
				throw ErrorLib.getErrors().BadRequest("",
						"roleServices/handleGet", "insufficient parameters");
			}
		}
	}

	// if not match with any business call, then return a bad request error
	throw ErrorLib.getErrors().BadRequest("", "roleServices/handleGet",
			parameters);
			*/
};

// Implementation of PUT call -- Update Role
function handlePut(reqBody, roleId) {
	var rdo = role.updateRole(reqBody, roleId);
	return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);

	// if not match with any business call, then return a bad request error
	throw ErrorLib.getErrors().BadRequest("", "roleServices/handlePut",
			parameters);
};

// Implementation of DELETE call -- Delete Role
function handleDelete(reqBody, roleId) {
	var rdo = role.deleteRole(reqBody, roleId);
	return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

// Implementation of POST call -- Insert Role
function handlePost(reqBody, roleId) {
	var rdo = role.insertRole(reqBody, roleId);
	return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

// Call request processing
processRequest();