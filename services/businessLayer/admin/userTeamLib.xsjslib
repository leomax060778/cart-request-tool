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
		var teams = dataUserTeam.getManualTeamsByUserIdAndBudgetYearId(objUserTeam.USER_ID, objUserTeam.BUDGET_YEAR_ID);
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
//
////Check if the request exists
//function existModal(modalId) {
//    return getModalByIdManual(modalId).length > 0;
//}
//
//function validateInsertModal(objModal, userId) {
//    if (!userId) {
//        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "modalService/handlePut/insertModal", userId);
//    }
//    var isValid = false;
//    var errors = {};
//    var BreakException = {};
//    var keys = [
//        'DESCRIPTION',
//        'CONTENT',
//        'LINK'
//    ];
//
//    if (!objModal) {
//        throw ErrorLib.getErrors().CustomError("", "modalService/handlePost/insertModal", "The object Modal is not found");
//    }
//
//    try {
//        keys.forEach(function (key) {
//            if (objModal[key] === null || objModal[key] === undefined) {
//                errors[key] = null;
//                throw BreakException;
//            } else {
//                // validate attribute type
//                isValid = validateType(key, objModal[key]);
//                if (!isValid) {
//                    errors[key] = objModal[key];
//                    throw BreakException;
//                }
//            }
//        });
//        isValid = true;
//    } catch (e) {
//        if (e !== BreakException) {
//            throw ErrorLib.getErrors().CustomError("", "modalService/handlePost/insertModal", e.toString());
//        }
//        else {
//            throw ErrorLib.getErrors().CustomError("", "modalService/handlePost/insertModal", JSON.stringify(errors));
//        }
//    }
//    return isValid;
//}
//
//function validateUpdateModal(objModal, userId) {
//    if (!userId) {
//        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "modalService/handlePut/updateModal", userId);
//    }
//    var isValid = false;
//    var errors = {};
//    var BreakException = {};
//    var keys = [
//        'MODAL_ID',
//        'DESCRIPTION',
//        'CONTENT',
//        'LINK'];
//
//    if (!objModal) {
//        throw ErrorLib.getErrors().CustomError("", "modalService/handlePut/updateModal", "The object Modal is not found");
//    }
//
//    try {
//        keys.forEach(function (key) {
//            if (objModal[key] === null || objModal[key] === undefined) {
//                errors[key] = null;
//                throw BreakException;
//            } else {
//                // validate attribute type
//                isValid = validateType(key, objModal[key]);
//                if (!isValid) {
//                    errors[key] = objModal[key];
//                    throw BreakException;
//                }
//            }
//        });
//        isValid = true;
//    } catch (e) {
//        if (e !== BreakException) {
//            throw ErrorLib.getErrors().CustomError("", "modalService/handlePut/updateModal", e.toString());
//        }
//        else {
//            throw ErrorLib.getErrors().CustomError("", "modalService/handlePut/updateModal", JSON.stringify(errors));
//        }
//    }
//    return isValid;
//}
//
////Check data types
//function validateType(key, value) {
//    var valid = true;
//    switch (key) {
//        case 'DESCRIPTION':
//            valid = value.length > 0 && value.length <= 255;
//            break;
//        case 'CONTENT':
//            valid = value.length > 0 && value.length <= 1000;
//            break;
//        case 'MODAL_ID':
//            valid = !isNaN(value) && value > 0;
//            break;
//        case 'LINK':
//            valid = value.length > 0 && value.length <= 511;
//            break;
//    }
//    return valid;
//}