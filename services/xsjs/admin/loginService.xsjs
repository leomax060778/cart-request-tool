/** **** libs *********** */
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var loginLib = mapper.getLogin();
var userLib = mapper.getUser();
var config = mapper.getDataConfig();
/** *************************************** */

var recovery = "RECOVERY";
var confirmToken = "CONFIRM_TOKEN";

// use the last parameter set in true because we don't need to validate the
// token
function processRequest() {
	//httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete);
	httpUtil.processRequest3(handleGet, handlePost, handlePut, handleDelete, true, "", true);
}

function handleGet(parameters, userId) {
	throw ErrorLib.getErrors().NotImplemented("", "", "");
}

function handlePost(reqBody, userId) {
	var typeMethod = reqBody.method;
	var username = reqBody.username;
	var password = reqBody.password;
	var currentPassword = reqBody.currentPassword
	var token = reqBody.token;
	if(typeMethod && typeMethod === confirmToken){
		return httpUtil.handleResponse(loginLib.confirmToken(token,userId),httpUtil.OK,httpUtil.AppJson);
	}else{
		if(typeMethod && typeMethod === recovery){	
			//if(loginLib.validateCurrentPassword(username,currentPassword)){
				var token = loginLib.recoveryPassword(username,password, userId);
				return httpUtil.handleResponse(token,httpUtil.OK,httpUtil.AppJson);
			//}
		}else{		
			var login = loginLib.login(username,password);			
			return	httpUtil.handleResponse(login,httpUtil.OK,httpUtil.AppJson); 
		}
	}

}

function handlePut(parameters, userId) {
	throw ErrorLib.getErrors().NotImplemented("", "", "");
}

function handleDelete(parameters, userId) {
	var isUserTokenDeleted = false;
	var userId = reqBody.userId;

	if (userId !== null) {
		isUserTokenDeleted = loginLib.deleteUserToken(userId);
	}
	return httpUtil.handleResponse("", httpUtil.OK, httpUtil.AppJson);
}

// Call request processing
processRequest();