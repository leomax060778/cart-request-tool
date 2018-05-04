/****** libs ************/
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var user = mapper.getUser();
/******************************************/

var getAll = "ALL";
var getAllByUserName = "ALL_BY_USER_NAME";
var getAllForFilters = "ALL_FOR_FILTERS";
var getAllUserName = "ALL_USERNAME";
var getUserbyId = "USERBYID";
var updatePassword = "UPDPASS";
var updateUser = "UPDUSER";
var method = "method";
var id = "id";
var getUsersByHl2Id = "USERSBYHL2ID";
var getUsersByHl3Id = "USERSBYHL3ID";

var service_name = "userService";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

function handleGet(parameters, userId) {
    var res = "";
    if (parameters.length > 0) {
        var aCmd = parameters.get('method');
        switch (aCmd) {
            case getAll: //get all users
                res = user.getAll();
                break;
            case getAllByUserName:
                res = user.getAllUserByUserName(parameters[1].value, userId);
                break;
            case getAllForFilters: //get all users
                res = user.getAllForFilters(userId);
                break;
            case getAllUserName: //get all user names
                res = user.getAllUserName();
                break;
            case getUserbyId: // get one user by id
                res = user.getUserById(parameters[1].value);
                break;
            case getUsersByHl2Id:
                res = user.getUserByHl2Id(parameters[1].value);
                break;
            case getUsersByHl3Id:
                res = user.getUserByHl3Id(parameters[1].value);
                break;
            default:
                throw ErrorLib.getErrors().BadRequest("", "", "insufficient parameters");
        }
        return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
    }
    //if not match with any request supported, then return a bad request error
    throw ErrorLib.getErrors().BadRequest("", "", parameters);
}

//Implementation of PUT call -- Update User
function handlePut(reqBody, userId) {
    var parameters = httpUtil.getUrlParameters();
    var res = "";
    if (parameters.length > 0) {
        var aCmd = parameters.get('method');
        switch (aCmd) {
            case "updateUser":
                res = user.updateUser(reqBody, userId);
                break;
            case "updatePassword":
                res = user.updateUserPassword(reqBody, userId);
                break;
            case "reset":
                res = user.resetPassword(reqBody, userId);
                break;
            case "RESTORE_USER":
                res = user.restoreUser(reqBody, userId);
                break;
            default:
                throw ErrorLib.getErrors().BadRequest("", "", parameters);

        }
        return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
    }
    //if not match with any request supported, then return a bad request error
    throw ErrorLib.getErrors().BadRequest("", "", parameters);
}

//Implementation of DELETE call -- Delete User
function handleDelete(reqBody, userId) {
    var res = user.deleteUser(reqBody, userId);
    return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

//Implementation of POST call -- Insert User
function handlePost(reqBody, userId) {
    var res = user.insertUser(reqBody, userId);
    return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

// Call request processing  
processRequest();