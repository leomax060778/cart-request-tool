/** *************Import Library****************** */
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ********************************************** */

var GET_SELECTED_TEAMS_BY_USER_ID_BUDGET_YEAR_ID = "GET_SELECTED_TEAMS_BY_USER_ID_BUDGET_YEAR_ID";
var GET_ALL_SELECTED_TEAMS_BY_USER_ID = "GET_ALL_SELECTED_TEAMS_BY_USER_ID";
var GET_TEAM_BY_USER_ID_BUDGET_YEAR_ID = "GET_TEAM_BY_USER_ID_BUDGET_YEAR_ID";
var INS_USER_TEAM = "INS_USER_TEAM";
var DEL_USER_TEAM = "DEL_USER_TEAM";

/** *************************************************** */

function getSelectedTeamsByUserBudgetYear(objRequest) {
	var params = {};
	params.out_result = '?';
	params.in_budget_year_id = objRequest.BUDGET_YEAR_ID;
	params.in_user_id = objRequest.USER_ID;
	var rdo = db.executeProcedure(GET_SELECTED_TEAMS_BY_USER_ID_BUDGET_YEAR_ID, params);
	return db.extractArray(rdo.out_result);
}

function getAllSelectedTeamsByUserId(selectedUserId) {
	var params = {};
	params.out_result = '?';
	params.in_user_id = selectedUserId;
	var res = db.executeProcedure(GET_ALL_SELECTED_TEAMS_BY_USER_ID, params);
	return db.extractArray(res.out_result);
}

function getManualTeamsByUserIdAndBudgetYearId(userId,budgetYearId){
	var params = {};
	params.out_result = '?';
	params.in_user_id = userId;
	params.in_budget_year_id = budgetYearId;
	var rdo = db.executeProcedureManual(GET_TEAM_BY_USER_ID_BUDGET_YEAR_ID, params);
	return db.extractArray(rdo.out_result);
}

function insertUserTeamManual(userId, teamId, createUser) {
	var param = {};
	param.in_user_id = userId;
	param.in_team_id = teamId;
	param.in_created_user_id = createUser; // User that insert.

	db.executeProcedureManual(INS_USER_TEAM, param);
}

function deleteUserTeamManual(userId, teamId, createUser) {
	var param = {};
	param.out_result = '?';
	param.in_user_id = userId;
	param.in_team_id = teamId;
	param.in_modified_user_id = createUser; // User that insert.

	return db.executeScalarManual(DEL_USER_TEAM, param, "out_result");
}