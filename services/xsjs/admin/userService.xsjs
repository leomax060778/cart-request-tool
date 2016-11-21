/****** libs ************/
$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var user = mapper.getUser();
/******************************************/

var getAll = "ALL";
var getAllForFilters = "ALL_FOR_FILTERS";
var getUserbyId = "USERBYID";
var updatePassword = "UPDPASS";
var updateUser = "UPDUSER";
var method = "method";
var id = "id";
var getUsersByHl2Id = "USERSBYHL2ID";
var getUsersByHl3Id = "USERSBYHL3ID";
var hl2Id = "hl2Id";

function processRequest(){
	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete);
}

function handleGet(parameters, userId){
	var parameters = httpUtil.getUrlParameters();
	if(parameters.length > 0){
		var aCmd = parameters.get('method');
		switch (aCmd) {
		    case getAll: //get all users
		    	var rdo = user.getAll();
				return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
		        break;
		    case getAllForFilters: //get all users
		    	var rdo = user.getAllForFilters();
				return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
		        break;
		    case getUserbyId: // get one user by id
		    	var rdo = user.getUserById(parameters[1].value);
				return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson); 
		        break;
		    case getUsersByHl2Id:
		    	var rdo = user.getUserByHl2Id(parameters[1].value);
				return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
		        break;
		    case getUsersByHl3Id:
		    	var rdo = user.getUserByHl3Id(parameters[1].value);
				return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
		        break;
		    default:
		    	throw ErrorLib.getErrors().BadRequest("","userServices/handleGet","insufficient parameters");
		}	
	}
	//if not match with any request supported, then return a bad request error
	throw ErrorLib.getErrors().BadRequest("","userServices/handleGet",parameters);
};

//Implementation of PUT call -- Update User
function handlePut(reqBody, userId){
	var parameters = httpUtil.getUrlParameters();
	if(parameters.length > 0){
		var aCmd = parameters.get('method');
		switch (aCmd) {
		    case "updateUser":
				var rdo =  user.updateUser(reqBody,userId);
				return httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
		        break;
		    case "updatePassword":
		    	var rdo =  user.updateUserPassword(reqBody,userId);
				return httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
		        break;
		    case "reset":
				var rdo =  user.resetPassword(reqBody,userId);
				return httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
		        break;
		    default:
		    	throw ErrorLib.getErrors().BadRequest("","userServices/handlePut",parameters);
		    	
		}	
	}
	//if not match with any request supported, then return a bad request error
	throw ErrorLib.getErrors().BadRequest("","userServices/handlePut",parameters);
};

//Implementation of DELETE call -- Delete User
function handleDelete(reqBody,userId){
	var rdo =  user.deleteUser(reqBody,userId);
	return httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
};

//Implementation of POST call -- Insert User
function handlePost(reqBody,userId) {	
	var rdo =  user.insertUser(reqBody,userId);
	return httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
}

// Call request processing  
processRequest();