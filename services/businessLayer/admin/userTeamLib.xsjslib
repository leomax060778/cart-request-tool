$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataUserTeam = mapper.getDataUserTeam();
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

function getSelectedTeamsByUserBudgetYear(objRequest, userId) {
    return dataUserTeam.getSelectedTeamsByUserBudgetYear(objRequest, userId);
}

function getAllSelectedTeamsByUserId(selectedUserId) {
    var result = dataUserTeam.getAllSelectedTeamsByUserId(selectedUserId);
    var team = {};
    result.forEach(function (elem) {
    	if(!team[elem.BUDGET_YEAR_ID]) {
    		team[elem.BUDGET_YEAR_ID] = [];
    	}
    	team[elem.BUDGET_YEAR_ID].push(elem);
    });
    return [team];
}

function updateUserTeam(objUserTeam, userId){
	try{
		var teams = dataUserTeam.getManualTeamsByUserId(objUserTeam.USER_ID);	
		var updateTeams = objUserTeam.TEAMS;
		var insertTeams = [];
		var deleteTeams = [];
		teams.forEach(function(team) {
			var result = true;
			var teamId = team.TEAM_ID;
			if(typeof teamId === 'string'){
				teamId = Number(teamId);
			}
			updateTeams.forEach(function(updateTeam) {
				if (teamId === updateTeam) {
					result = false;
				}
			});
			if(result){
				deleteTeams.push(teamId);
			}
		});
		updateTeams.forEach(function(newTeam) {
			var result = true;
			teams.forEach(function(team) {
				var teamId = team.TEAM_ID;
				if(typeof teamId === 'string'){
					teamId = Number(teamId);
				}
				if (newTeam === teamId) {
					result = false;
				}
			});
			if(result){
				insertTeams.push(newTeam);
			}
		});
		
		insertTeams.forEach(function(insertTeam) {
			dataUserTeam.insertUserTeamManual(objUserTeam.USER_ID, insertTeam, userId);
		});		
		deleteTeams.forEach(function(deleteTeam) {
			dataUserTeam.deleteUserTeamManual(objUserTeam.USER_ID, deleteTeam, userId);
		});
		db.commit();
		return 1;
	} catch (e) {
		db.rollback();
		throw e;
	} finally {
		db.closeConnection();
	}
}