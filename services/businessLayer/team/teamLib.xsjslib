$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var data = mapper.getDataTeam();
var ErrorLib = mapper.getErrors();
var dbHelper = mapper.getdbHelper();

function getAllTeam() {
	return data.getAllTeam();
}

function getAllTeamForFilters(user_id){
	if (!user_id){
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"teamService/handleGet/getAllTeamForFilters", user_id);
	}
	return data.getAllTeamForFilters();
}

function insertTeam(objTeam, user_id) {
	if (validateInsertTeam(objTeam, user_id)) {
		return data.insertTeam(objTeam, user_id);
	}
}
function getTeamById(team_id, user_id) {
	if (!user_id){
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"teamService/handleGet/getTeamById", user_id);
	}
	if (!team_id){
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter Team_id is not found",
				"teamService/handleGet/getTeamById", team_id);
	}
	return data.getTeamById(Team_id);
}
function updateTeam(objTeam, user_id) {
	if (validateUpdateTeam(objTeam, user_id)) {
		try{
		if (!existTeam(objTeam.TEAM_ID, user_id)) {
			throw ErrorLib.getErrors().CustomError("",
					"teamService/handlePut/updateTeam",
					"The object Team doesn't exist");
		} else {
			var result = data.updateTeam(objTeam, user_id);
		}
		dbHelper.commit();
		}
		catch(e){
			dbHelper.rollback();
			throw ErrorLib.getErrors().CustomError("", e.toString(),"updateTeam");
		}
		finally{
			dbHelper.closeConnection();
		}
		return result;

	}
}
 
function deleteTeam(team_id, user_id) {
	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"teamService/handleDelete/deleteTeam", user_id);
	if (!team_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter team_id is not found",
				"teamService/handleDelete/deleteTeam", team_id);
	try{
		if (!existTeam(team_id, user_id)) {
			throw ErrorLib.getErrors().CustomError("",
					"teamService/handleDelete/deleteTeam",
					"The object Team doesn't exist");
		}else{
			var result = data.deleteTeam(team_id, user_id);
		}
		dbHelper.commit();
	}
	catch(e){
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(),"deleteTeam");
	}
	finally{
		dbHelper.closeConnection();
	}
	return result;
}

function validateInsertTeam(objTeam, user_id) {

	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"teamService/handlePost/insertTeam", user_id);

	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = ["ISO", 
	            "NAME", 
	            "TEAM_YEAR", 
	            "OPT_TEAM_ID"];

	if (!objTeam)
		throw ErrorLib.getErrors().CustomError("",
				"teamService/handlePost/insertTeam",
				"The object Team is not found");

	try {
		keys.forEach(function(key) {
			if (objTeam[key] === null || objTeam[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objTeam[key])
				if (!isValid) {
					errors[key] = objTeam[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("",
					"teamService/handlePost/insertTeam", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("",
					"teamService/handlePost/insertTeam",
					JSON.stringify(errors));
	}
	return isValid;
}

function validateUpdateTeam(objTeam, user_id) {

	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"teamService/handlePut/updateTeam", user_id);

	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ "TEAM_ID", 
	             "ISO", 
	             "NAME", 
	             "TEAM_YEAR", 
	             "OPT_TEAM_ID" ];

	if (!objTeam)
		throw ErrorLib.getErrors().CustomError("",
				"teamService/handlePut/updateTeam",
				"The object Team is not found");

	try {
		keys.forEach(function(key) {
			if (objTeam[key] === null || objTeam[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objTeam[key])
				if (!isValid) {
					errors[key] = objTeam[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("",
					"teamService/handlePut/updateTeam", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("",
					"teamService/handlePut/updateTeam",
					JSON.stringify(errors));
	}
	return isValid;
}

// Check data types
function validateType(key, value) {
	var valid = true;
	switch (key) {
	case 'TEAM_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'ISO':
		valid = value.length > 0 && value.length <= 32;
		break;
	case 'NAME':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'TEAM_YEAR':
		valid = !isNaN(value);
		break;
	case 'OPT_TEAM_ID':
		valid = !isNaN(value) || (!value);
		break;
	}
	return valid;
}

function getTeamsByBudgetYearIdAndUserId(budgetYearId,userId){
	return data.getTeamsByBudgeYearIdAndUserId(budgetYearId, userId);
}

function existTeam(team_id, userId) {
	return getManualTeamById(team_id, userId).length > 0;
}

function getManualTeamById(team_id, userId){
	if (!userId)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"teamService/handleGet/getTeamById", user_id);
	if (!team_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter team_id is not found",
				"teamService/handleGet/getManualTeamById", team_id);

	return data.getManualTeamById(team_id);
}