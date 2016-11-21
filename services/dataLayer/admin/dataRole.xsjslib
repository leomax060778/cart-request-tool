$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

// STORE PROCEDURE LIST NAME
var GET_ALL_ROLE = "GET_ALL_ROLE";
var GET_ROLE_BY_ID = "GET_ROLE_BY_ROLE_ID";

function getAllRole() {

	var parameters = {};
	var result = db.executeProcedure(GET_ALL_ROLE, {});
	return db.extractArray(result.out_result);
}

function getRoleById(roleId) {
	var param = {};
	param.in_role_id = roleId;

	var rdo = db.executeProcedure(GET_ROLE_BY_ID, param);
	return db.extractArray(rdo.out_result);
}
