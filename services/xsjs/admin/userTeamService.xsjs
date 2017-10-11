$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var userTeam = mapper.getUserTeam();
var config = mapper.getDataConfig();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_TEAM_BY_USER_ID_BUDGET_YEAR = "GET_TEAM_BY_USER_ID_BUDGET_YEAR";
var GET_ALL_SELECTED_TEAMS_BY_USER_ID = "GET_ALL_SELECTED_TEAMS_BY_USER_ID";

var service_name = "userTeamService";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

function handleGet(parameters,userId) {
    var res = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_TEAM_BY_USER_ID_BUDGET_YEAR) {
            var objRequest = paramsToObj(parameters,["BUDGET_YEAR_ID","USER_ID"]);
            res = userTeam.getSelectedTeamsByUserBudgetYear(objRequest,userId);
        } else if (parameters[0].name === GET_ALL_SELECTED_TEAMS_BY_USER_ID) {
            if(!parameters[0].value || isNaN(parameters[0].value)){
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "userTeamService/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (must be a valid id)"
                );
            } else {
                res = userTeam.getAllSelectedTeamsByUserId(parameters[0].value);
            }
        } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "userTeamService/handleGet",
                "invalid parameter name " + parameters[0].name + " (can be: GET_TEAM_BY_USER_ID_BUDGET_YEAR or GET_ALL_SELECTED_TEAMS_BY_USER_ID)"
            );
        }
    } else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "userTeamService/handleGet",
            "invalid parameter (can be: GET_TEAM_BY_USER_ID_BUDGET_YEAR or GET_ALL_SELECTED_TEAMS_BY_USER_ID)"
        );
    }
    return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

function handlePut(reqBody, userId) {
    var req = userTeam.updateUserTeam(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

//Not Implemented Method
function handleDelete() {
    return httpUtil.notImplementedMethod();
}

//Not Implemented Method
function handlePost() {
    return httpUtil.notImplementedMethod();
}

function paramsToObj(params,paramsArray){
    var elements = {};
    Object.keys(params).forEach(function(key) {
        var value = params[key];
        if(paramsArray.indexOf(value.name) > -1){
            elements[value.name] = value.value;
        }
    });
    return elements;
}

processRequest();