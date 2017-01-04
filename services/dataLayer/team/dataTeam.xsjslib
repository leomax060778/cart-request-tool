$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_TEAM = 'GET_ALL_TEAM';
var GET_TEAM_BY_ID = 'GET_TEAM_BY_ID';
var INS_TEAM = 'INS_TEAM';
var UPD_TEAM = 'UPD_TEAM';
var DEL_TEAM = 'DEL_TEAM';
var GET_ALL_TEAM_FOR_FILTERS = "GET_ALL_TEAM_FOR_FILTERS";
var GET_TEAMS_BY_USER_ID_BUDGET_YEAR_ID = "GET_TEAMS_BY_USER_ID_BUDGET_YEAR_ID";

function getTeamsByBudgeYearIdAndUserId(budgetYearId, userId){
	var param = {};
	param.out_result = '?';
	param.in_user_id = userId;
	param.in_budget_year_id = budgetYearId;
	var result = db.executeProcedure(GET_TEAMS_BY_USER_ID_BUDGET_YEAR_ID, param);
	return db.extractArray(result.out_result);
}

function getAllTeam(){
	var param = {};
	param.out_result = '?';
	var result = db.executeProcedure(GET_ALL_TEAM, param);
	return db.extractArray(result.out_result);
}

function getAllTeamForFilters(user_id){
	var param = {};
	param.out_result = '?';
	param.in_user_id = user_id;
	var result = db.executeProcedure(GET_ALL_TEAM_FOR_FILTERS, param);
	return db.extractArray(result.out_result);
}


function getTeamById(team_id){
	
	var param = {};
	param.in_team_id = team_id;
	param.out_result = '?';
	
	var result = db.executeProcedure(GET_TEAM_BY_ID, param);
	return db.extractArray(result.out_result);
}

function getManualTeamById(team_id){
	
	var param = {}; 
	param.in_team_id = team_id;
	param.out_result = '?';
	
	var result = db.executeProcedureManual(GET_TEAM_BY_ID, param);
	return db.extractArray(result.out_result);
}

function insertTeam(objTeam, user_id){
	var param = {};
	param.in_iso = objTeam.ISO;
	param.in_name = objTeam.NAME;
	param.in_team_year = objTeam.TEAM_YEAR;
	param.in_opt_team_id = objTeam.OPT_TEAM_ID;
	param.in_created_user_id = user_id;
	param.out_result = '?';
	
	return db.executeScalar(INS_TEAM, param, 'out_result');
}

function updateTeam(objTeam, user_id){
	var param = {};
	param.in_team_id = objTeam.TEAM_ID;
	param.in_iso = objTeam.ISO;
	param.in_name = objTeam.NAME;
	param.in_team_year = objTeam.TEAM_YEAR;
	param.in_opt_team_id = objTeam.OPT_TEAM_ID;
	param.in_modified_user_id = user_id;
	param.out_result = '?';
	
	return db.executeScalarManual(UPD_TEAM, param, 'out_result');

}

function deleteTeam(team_id, user_id){
	var param = {};
	param.in_team_id = team_id;
	param.in_modified_user_id = user_id;
	param.out_result = '?';
	
	return db.executeScalarManual(DEL_TEAM, param, 'out_result');
}