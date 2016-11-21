/****** libs ************/
 $.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var http = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var team = mapper.getTeam();

var GET_TEAM_BY_ID = "GET_TEAM_BY_ID";
var GET_ALL_TEAM = "GET_ALL_TEAM";

var INS_TEAM = "INS_TEAM";
var UPD_TEAM = "UPD_TEAM";
var DEL_TEAM = "DEL_TEAM";
var GET_ALL_TEAM_FOR_FILTERS = "GET_ALL_TEAM_FOR_FILTERS";

/******************************************/
function processRequest(){
	http.processRequest(handleGet,handlePost,handlePut,handleDelete);
	}

function handleGet(parameters, user_id) {
    var rdo = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_TEAM_BY_ID) {
            rdo = team.getTeamById(parameters[0].value, user_id);
            
        	} 
        else if (parameters[0].name === GET_ALL_TEAM) {
            rdo = team.getAllTeam(user_id);
          
        	}
        else if (parameters[0].name === GET_ALL_TEAM_FOR_FILTERS) {
            rdo = team.getAllTeamForFilters(user_id);
          
        	}
        }
    else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "teamService/handleGet",
                "invalid parameter name (can be: GET_TEAM_BY_ID or GET_ALL_TEAM)"
                + parameters[0].name);
        }

    return http.handleResponse(rdo, http.OK, http.AppJson);
}

function handlePost(teamBody, user_id) {
	var res = team.insertTeam(teamBody, user_id);
	return http.handleResponse(res, http.OK, http.AppJson);
}

function handlePut(teamBody, user_id) {
    var rdo = {};
        rdo = team.updateTeam(teamBody, user_id);
    return http.handleResponse(rdo, http.OK, http.AppJson);
}

function handleDelete(teamBody, user_id) {
	var rdo =  team.deleteTeam(teamBody.TEAM_ID, user_id);
	return http.handleResponse(rdo,http.OK,http.AppJson);
	
}

processRequest();