/** *************Import Library****************** */
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dbUser = mapper.getDataUser();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
var mail = mapper.getMail();
var db = mapper.getdbHelper();
var dbUserRole = mapper.getDataUserRole();
var config = mapper.getDataConfig();
/** ********************************************** */

var defaultPassword = config.getDefaultPassword();

function getAll() {
	return dbUser.getAllUser();
}

function getUserById(id) {
	if (!id)
		throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found",
				"userServices/handleGet/getUserById", id);
	return dbUser.getUserById(id);

}

function getUserByUserName(userName) {
	if (!userName)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter userName is not found",
				"userServices/handleGet/getUserByUserName", userName);
	return dbUser.getUserByUserName(userName);
}

function getUserByHl2Id(hl2Id) {
	if (!hl2Id)
		throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found",
				"userServices/handleGet/getUserByHl2Id", hl2Id);
	return dbUser.getUserByHl2Id(hl2Id);

}

function getUserByHl3Id(hl3Id) {
	if (!hl3Id)
		throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found",
				"userServices/handleGet/getUserByHl3Id", hl3Id);
	return dbUser.getUserByHl3Id(hl3Id);

}

function insertUser(user, createUser) {
	if (!user.PASSWORD && !user.USE_DEFAULT_PASSWORD)
		throw ErrorLib.getErrors().CustomError("",
				"userServices/handlePost/insertUser",
				"The PASSWORD is not found");

	if (!user.CONFIRM_PASSWORD && !user.USE_DEFAULT_PASSWORD)
		throw ErrorLib.getErrors().CustomError("",
				"userServices/handlePost/insertUser",
				"The CONFIRM_PASSWORD is not found");

	if (!user.ROLE_ID)
		throw ErrorLib.getErrors().CustomError("",
				"userServices/handlePost/insertUser",
				"The ROLE_ID is not found");

	try {
		var outUserId = null;
		var transactionDone = false;
		var userPassHashed = null;
		var userPassword = null;

		// validate user
		if (validateUser(user)) {
			if(getUserByUserName(user.USER_NAME)){
				throw ErrorLib.getErrors().CustomError("",
						"userServices/handlePost/insertUser", "The User Name already exists"); 
			}
			// Hash password
			userPassword = !user.USE_DEFAULT_PASSWORD
					&& validatePassword(user.PASSWORD) ? user.PASSWORD
					: defaultPassword;
			userPassHashed = dbUser.getPasswordHash(userPassword);

			if (userPassHashed.length > 0) {
				// insert user
				var outUserId = dbUser.insertUser(user, createUser);

				if (outUserId) {
					// set user password
					var resultUpdPass = dbUser.updatePass(outUserId,
							userPassHashed[0].HASH, "", createUser);

					// Insert user role
					var resultInsUserRole = dbUserRole.insertUserRole(
							outUserId, user.ROLE_ID, createUser);

					// check if transaction was completed
					transactionDone = !!outUserId && !!resultUpdPass
							&& !!resultInsUserRole;
				}

				if (transactionDone) {
					db.commit();
					try{
						notifyInsertByEmail(user.EMAIL,user.USER_NAME,userPassword);
					}catch(e){
						throw ErrorLib.getErrors().MailError("",e,"The user was created, but the notification email failed to be sent.");
					}
					
				} else {
					db.rollback();
				}
				return outUserId;
			}
		}
	} catch (e) {
		db.rollback();
		throw e;
	} finally {
		db.closeConnection();
	}
}

function updateUser(user, updateUser) {

	if (!user.USER_ID)
		throw ErrorLib.getErrors().CustomError("",
				"userServices/handlePost/updateUser",
				"The USER_ID is not found");

	if (!util.validateIsNumber(user.USER_ID))
		throw ErrorLib.getErrors().CustomError("",
				"userServices/handlePost/updateUser", "The USER_ID is invalid");

	try {
		var updUserId = null;
		var transactionDone = false;

		// insert user
		updUserId = dbUser.updateUser(user, updateUser);

		if (updUserId) {
			// Update user role
			var resultUserRole = dbUserRole.updateUserRoleByUserId(
					user.USER_ID, user.ROLE_ID, updateUser);

			// check if transaction was completed
			transactionDone = !!updUserId && !!resultUserRole;
		}

		// check transaction status
		if (transactionDone) {
			db.commit();
		} else {
			db.rollback();
		}
		return updUserId;
	} catch (e) {
		db.rollback();
		throw e;
	} finally {
		db.closeConnection();
	}
}

function deleteUser(user, deleteUser) {
	if (!user.USER_ID)
		throw ErrorLib.getErrors().CustomError("",
				"userServices/handlePost/insertUser",
				"The USER_ID is not found");

	if (!util.validateIsNumber(user.USER_ID))
		throw ErrorLib.getErrors().CustomError("",
				"userServices/handlePost/insertUser", "The USER_ID is invalid");

	return dbUser.deleteUser(user, deleteUser);

}

function updateUserPassword(value, modUser) {
	if (!value)
		throw ErrorLib.getErrors().CustomError("",
				"userServices/handlePost/insertUser", "The USER is not found");
	if (!value.USER_ID)
		throw ErrorLib.getErrors().CustomError("",
				"userServices/handlePost/insertUser",
				"The USER_ID is not found");
	if (!value.PASSWORD)
		throw ErrorLib.getErrors().CustomError("",
				"userServices/handlePost/insertUser",
				"The PASSWORD is not found");

	if (validatePassword(value.PASSWORD)) {
		var userPassHashed = dbUser.getPasswordHash(value.PASSWORD);
		return dbUser.updatePass(value.USER_ID, userPassHashed.HASH,
				value.PASSWORD_SALT, modUser);
	}
}

function updateUserPasswordHashed(value, modUser) {
	if (!value)
		throw ErrorLib.getErrors().CustomError("",
				"userServices/handlePost/insertUser", "The USER is not found");
	if (!value.USER_ID)
		throw ErrorLib.getErrors().CustomError("",
				"userServices/handlePost/insertUser",
				"The USER_ID is not found");
	if (!value.PASSWORD)
		throw ErrorLib.getErrors().CustomError("",
				"userServices/handlePost/insertUser",
				"The PASSWORD is not found");		
		var resultUpdPass = dbUser.updatePass(value.USER_ID, value.PASSWORD,
				value.PASSWORD_SALT, modUser);
		
		// check if transaction was completed
		if (!!resultUpdPass) {
			db.commit();

			// TODO: notify user via email with a link to set the password
			// again
		} else {
			db.rollback();
		}
		return resultUpdPass;
	
}

function resetPassword(user, modUser) {

	if (!user)
		throw ErrorLib.getErrors().CustomError("",
				"userServices/handlePost/insertUser", "The USER is not found");
	if (!user.USER_ID)
		throw ErrorLib.getErrors().CustomError("",
				"userServices/handlePost/insertUser",
				"The USER_ID is not found");

	// Password is reset to default password
	try {
		var userPassHashed = null;
		var resultUpdPass = null;

		// Hash password
		userPassHashed = dbUser.getPasswordHash(defaultPassword);

		if (userPassHashed.length > 0) {
			// set user password
			resultUpdPass = dbUser.updatePass(user.USER_ID,
					userPassHashed[0].HASH, "", modUser);

			// check if transaction was completed
			if (!!resultUpdPass) {
				db.commit();

				// TODO: notify user via email with a link to set the password
				// again
			} else {
				db.rollback();
			}
			return resultUpdPass;
		}

	} catch (e) {
		db.rollback();
		throw e;
	} finally {
		db.closeConnection();
	}
}

function getUserByRoleId(id) {
	return dbUser.getUserByRoleId(id);
}

function validatePassword(pass) {
	// TODO: set regex to validate pass
	// Business rules: SAP wants to set the default password and it might be 6
	// letters
	// New passwords must be 6 letters (and/or numbers and/or most special
	// characters) in length
	if (!util.validateLength(pass, 15, 6) || !util.validateIsPassword(pass))
		throw ErrorLib.getErrors()
				.CustomError("", "userServices/handlePost/insertUser",
						"The PASSWORD is invalid");

	return true;
}

function validateUser(user) {
	if (!user)
		throw ErrorLib.getErrors().CustomError("",
				"userServices/handlePost/insertUser", "User is not found");

	if (!user.USER_NAME)
		throw ErrorLib.getErrors().CustomError("",
				"userServices/handlePost/insertUser", "USER_NAME is not found");

	if (!user.FIRST_NAME)
		throw ErrorLib.getErrors().CustomError("",
				"userServices/handlePost/insertUser",
				"The FIRST_NAME is not found");

	if (!user.LAST_NAME)
		throw ErrorLib.getErrors().CustomError("",
				"userServices/handlePost/insertUser",
				"The LAST_NAME is not found");

	if (!user.EMAIL)
		throw ErrorLib.getErrors().CustomError("",
				"userServices/handlePost/insertUser", "The EMAIL is not found");

	if (!util.validateLength(user.USER_NAME, 255, 1, "User Name")
			|| !util.validateIsString(user.USER_NAME))
		throw ErrorLib.getErrors().CustomError("",
				"userServices/handlePost/insertUser",
				"The USER_NAME is invalid");

	if (!util.validateLength(user.FIRST_NAME, 255, 1, "First Name")
			|| !util.validateIsString(user.FIRST_NAME))
		throw ErrorLib.getErrors().CustomError("",
				"userServices/handlePost/insertUser",
				"The FIRST_NAME is invalid");

	if (!util.validateLength(user.LAST_NAME, 255, 1, "Last Name")
			|| !util.validateIsString(user.LAST_NAME))
		throw ErrorLib.getErrors().CustomError("",
				"userServices/handlePost/insertUser",
				"The LAST_NAME is invalid");

	if (!util.validateIsEmail(user.EMAIL))
		throw ErrorLib.getErrors().CustomError("",
				"userServices/handlePost/insertUser", "The EMAIL is invalid");
	
	if(user.PHONE){
		if (!util.validateLength(user.PHONE, 255, 1, "Phone"))
			throw ErrorLib.getErrors().CustomError("",
					"userServices/handlePost/insertUser", "The PHONE is invalid");
	}

	return true;
}

function getAllForFilters(user_id) {
	return dbUser.getAllUserForFilters(user_id);
}

function notifyInsertByEmail(TO, username, password) {
	var appUrl = config.getLoginUrl();
	var siteAdminAccount = config.getSiteAdminAccount();

	var body = ' <p> Dear Colleague </p>  <p>You have been granted user rights to the Cart Request Tool. Your login information is as follows:</p>  <p>User ID: <span>'
			+ username
			+ '</span></p>  <p>Password: <span>'
			+ password
			+ '</span></p> <p>You may change your password after you logon to the Cart Request Tool. To logon to the Cart Request Tool use the following link '
			+ appUrl
			+ '.</p> <p>If you have any questions please contact the Site Administrator '
			+ siteAdminAccount + '.</p> <p> Thank you</p>';
	var mailObject = mail.getJson([ {
		"address" : TO
	} ], "Cart Request Tool - Account Created", body);

	mail.sendMail(mailObject, true);
}