/** *************Import Library****************** */
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dbLogin = mapper.getDataLogin();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
var userLib = mapper.getUser();
var userRoleLib = mapper.getUserRole();
var rolePermissionLib = mapper.getRolePermission();
var mail = mapper.getMail();
var config = mapper.getDataConfig();
/** ************************************************/

function validateUser(userToken) {
	// get Token and user session from DB
	var result = dbLogin.getToken(userToken);

	if (result != null && result.length > 0) {
		// get current token date
		var tokentz = result[0].TOKEN_VALID_UNTIL_DATE_TZ;

		// get current user
		var userSession = result[0].USER_ID;

		// compare current token with current date

		if (new Date(tokentz) >= new Date())
			return userSession;
	}
	// if token is expired return null;
	return null;
}

function getNewToken(){
	return dbLogin.getNewToken();
}
function confirmToken(token,userId){
	
	if(token){
		//throw ErrorLib.getErrors().NotImplemented("","",token);
		//get token sended for this user
		var userRecovery = dbLogin.getTokenRecovery(token);
		if(!userRecovery){
			throw ErrorLib.getErrors().CustomError("",
					"LoginLib/confirmToken", "Invalid credentials. The Token doesn't exists"); 
		}
		
		var passwordRecovery = userRecovery['PASSWORD'];
		var userId = userRecovery['USER_ID'];
					
			var userUDP = {
					'USER_ID': userId,
					'PASSWORD':passwordRecovery,
					'PASSWORD_SALT':''
			};
			  dbLogin.disableToken(userId);//disable the token.
			  userLib.updateUserPasswordHashed(userUDP,userId);//update password and return
			  return true;
		}
	else{
		throw ErrorLib.getErrors().CustomError("",
				"LoginLib/confirmToken", "Invalid credentials. User doesn't exists"); 
	}
}

function recoveryPassword(username,password, userId){
	if(userLib.validatePassword(password)){//if password is valid, insert the new password with the token asociated
		
		var currentUser = userLib.getUserByUserName(username);
		var email = currentUser['EMAIL'];
		var user = currentUser['USER_ID'];
		
		var token = getNewToken(); //Get a New Token
		
		var userPassHashed = dbLogin.getPasswordHash(password);
		
		dbLogin.saveRecovery(user, userPassHashed, token, userId); //save token, waiting for activation
		
		notifyInsertByEmail(email, username, token); //notify with a new token.
		return token;
	}
}

function validateCurrentPassword(username, password){
	var currentUser = userLib.getUserByUserName(username);
	if(!currentUser){
		throw ErrorLib.getErrors().LoginError("",
				"LoginLib/validateCurrentPassword", "Invalid User Name.");	
	}
	
	var currentUserId = currentUser['USER_ID'];
	// Validate user password
	if(!password){
		throw ErrorLib.getErrors().LoginError("",
				"LoginLib/login", "Invalid Current Password.");	
	}
	
	var userHashedPassword = dbLogin.getPasswordHash(password);
	var currentUserPassword = currentUser['PASSWORD'];
	
	if(userHashedPassword && currentUserPassword && userHashedPassword != currentUserPassword){
		throw ErrorLib.getErrors().LoginError("",
				"LoginLib/login", "Invalid Current Password.");	
	}
	
	return true;
}

function login(username,password){
	
	var currentUser = userLib.getUserByUserName(username);
	if(!currentUser){
		throw ErrorLib.getErrors().LoginError("",
				"LoginLib/login", "Invalid credentials. Please log in again");	
	}
	var currentUserId = currentUser['USER_ID'];
	var currentUserToken = null;
	if (currentUser) {
		currentUserToken = dbLogin.getUserToken(currentUserId);
	}

	// Validate user password
	var userHashedPassword = dbLogin.getPasswordHash(password);
	var currentUserPassword = currentUser['PASSWORD'];
	
	if(userHashedPassword && currentUserPassword && userHashedPassword != currentUserPassword){
		throw ErrorLib.getErrors().LoginError("",
				"LoginLib/login", "Invalid credentials. Please log in again");	
	}
	
	// Check user token session
	if(!currentUserToken){
		// Delete any existing token for this user
		deleteUserToken(currentUserId);

		currentUserToken = dbLogin.createUserToken(currentUserId);	
	}else{
		// Update current user token
		dbLogin.updateToken(currentUserId, currentUserToken);	
	}
	
	var username = currentUser['USER_NAME'] !== "undefined" ? currentUser['USER_NAME'] : "";
	var firstName = currentUser['FIRST_NAME'] !== "undefined" ? currentUser['FIRST_NAME'] : "";
	var lastName = currentUser['LAST_NAME'] !== "undefined" ? currentUser['LAST_NAME'] : "";
	var email = currentUser['EMAIL'] !== "undefined" ? currentUser['EMAIL'] : "";
	
	var rdo =  {
			"USER_ID" : currentUserId,
			"USER_NAME" : username,
			"FIRST_NAME" : firstName,
			"LAST_NAME" : lastName,
			"EMAIL": email,
			"TOKEN" : encodeURIComponent(currentUserToken)
		};
	
	rdo.Rol = userRoleLib.getUserRoleByUserId(currentUserId);
	
	if(rdo.Rol){
		var rolId = rdo.Rol[0]['ROLE_ID'];
		rdo.Permissions = rolePermissionLib.getPermissionByRole(rolId);
	}
	
	
	return rdo;
}

function deleteUserToken(userId){
	return dbLogin.deleteUserToken(userId);
}

function notifyInsertByEmail(TO,username,token){
	var appUrl = config.getAppUrl();
	var body = ' <p> Dear Colleague </p>  <p>Here is your username and token for your Marketing Planning Tool password recovery</p>  <p>Username: <span>'+username+'</span></p>  <p>Token: <span>'+token+'</span></p>  <p>To accept your new Password for Marketing Planning Tool, visit the homepage ('+appUrl+') and enter your token in the login area.</p>';
	var mailObject = mail.getJson([ {
		"address" : TO
	} ], "Marketing Planning Tool - Password recovery", body);
	
	mail.sendMail(mailObject,true);
}