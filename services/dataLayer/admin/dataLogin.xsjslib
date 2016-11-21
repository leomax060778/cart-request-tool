/** *************Import Library****************** */
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
/** ********************************************** */

var spGetToken = "GET_USER_SESSION_TOKEN_BY_TOKEN";
var spGetNewToken = "GET_SYSUUID";
var spSaveRecovery = "INS_USER_RECOVERY";
var spGetUserSessionTokenByUserId = "GET_USER_SESSION_TOKEN_BY_USER_ID";
var spGetHashSha256 = "GET_HASH_SHA256";
var spInsUserSessionToken = "INS_USER_SESSION_TOKEN";
var spDelUserSessionToken = "DEL_USER_SESSION_TOKEN";
var spGetTokenRecoveryByUserId = "GET_USER_RECOVERY_TOKEN_BY_USER";
var spGetTokenRecoveryByToken = "GET_USER_RECOVERY_TOKEN_BY_TOKEN";
var spDisableRecoveryToken = "UPD_DISABLE_RECOVERY_TOKEN";
var spUPDUserSessionToken = "UPD_USER_SESSION_TOKEN";

/** *************************************************** */

function getToken(token) {
	if (token != "") {
		var rdo = db.executeProcedureManual(spGetToken, {
			'in_token' : token
		});
		return db.extractArray(rdo.out_result);
	}
	return null;
}

function getNewToken() {
	var rdo = db.executeProcedure(spGetNewToken, {});
	if (rdo['OUT_RESULT']) {
		return rdo['OUT_RESULT'][0]['SYS_UNIQUE_NUMBER'];
	}
}
function getTokenRecovery(token) {
	if (token != "") {
		var userToken = db.executeProcedure(spGetTokenRecoveryByToken, {
			'in_token' : token
		});
		userToken = db.extractArray(userToken.out_result);
		if (userToken.length > 0) {
			// Validate token is still valid
			var currentUserToken = userToken[0]['TOKEN_VALID_UNTIL_DATE_TZ'];

			if (new Date(currentUserToken) >= new Date())
				return userToken[0];
		}
	}
	return null;
}

function disableToken(userId) {
	return db.executeProcedure(spDisableRecoveryToken, {
		'in_user_id' : userId
	});
}

function saveRecovery(user, password, token) {

	return db.executeScalar(spSaveRecovery, {
		'in_user_id' : user,
		'in_password' : password,
		'in_token' : token,
		'in_token_duration' : config.getTokenLifeTimeSeconds(),
		'in_created_user_id' : user
	}, "out_user_recovery_token_id");
}

function updateToken(userId, token) {
	var param = {};
	param.in_token = token;
	param.in_token_duration = config.getTokenLifeTimeSeconds();
	param.in_modified_user_id = userId;
	param.out_result = '?';

	return db.executeScalar(spUPDUserSessionToken, param, "out_result");
}

function getUserToken(userId) {

	// Look for user token
	var userToken = db.executeProcedure(spGetUserSessionTokenByUserId, {
		'in_user_id' : userId
	});

	userToken = db.extractArray(userToken.out_result);
	// If user exists, then check if there is a token
	if (userToken.length > 0) {
		// Validate token is still valid
		var currentUserToken = userToken[0]['TOKEN_VALID_UNTIL_DATE_TZ'];
		
		var userSessionInfo = userToken[0];
		var currentExpirationToken = userSessionInfo['TOKEN_VALID_UNTIL_DATE_TZ'];
		if (new Date(currentExpirationToken) >= new Date())
			return userToken[0]['TOKEN'];
	}
	return null;
}

function getPasswordHash(userPassword) {

	var userPassHashed = db.executeProcedure(spGetHashSha256, {
		'in_message' : userPassword
	});

	userPassHashed = db.extractArray(userPassHashed.out_result);

	if (userPassHashed.length > 0) {
		var passHashed = userPassHashed[0];

		return passHashed['HASH'];
	}

	return null
}

function createUserToken(userId) {

	// Generate user token based on
	var currentDate = new Date();
	var userToken = getNewToken();// ['SYS_UNIQUE_NUMBER'];

	if (userToken == null || typeof userToken == undefined) {
		throw ErrorLib.getErrors().InternalServerError("",
				"dataLogin/CreateUserToken", "Token can not be null");
	}

	var spResultId = db.executeScalar(spInsUserSessionToken, {
		'in_user_id' : userId,
		'in_token' : userToken,
		'in_token_duration' : config.getTokenLifeTimeSeconds(),
		'in_created_user_id' : userId
	}, "out_user_session_token_id");

	if (spResultId > 0) {
		return userToken;
	}
	return null;
}

function deleteUserToken(userId) {

	// Delete any existing token for this user
	var spResultId = db.executeProcedure(spDelUserSessionToken, {
		'in_user_id' : userId
	});

	if (spResultId > 0) {
		return true;
	}
	return false;
}