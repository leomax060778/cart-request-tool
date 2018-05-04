/** *************Import Library****************** */
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dbUser = mapper.getDataUser();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
var mail = mapper.getMail();
var db = mapper.getdbHelper();
var dbUserRole = mapper.getDataUserRole();
var dataProtectionLib = mapper.getUserDataProtection();
var config = mapper.getDataConfig();
/** ********************************************** */

var defaultPassword = config.getDefaultPassword();
var emailRegEx = /\w+[-+.]*@+(sap.com)/;
var usernameRegex = /^[IDC][0-9]{7}$/;

function getAll() {
    return dbUser.getAllUser();
}

function getUserById(id) {
    if (!id) {
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found", "", id);
    }
    return dbUser.getUserById(id);

}

function getAllUserName() {
    return dbUser.getAllUserName();
}

function getUserByUserName(userName) {
    if (!userName) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userName is not found", "", userName);
    }
    return dbUser.getUserByUserName(userName);
}

function getUserByEmail(email) {
    return dbUser.getUserByEmail(email);
}

function getUserByHl2Id(hl2Id) {
    if (!hl2Id) {
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found", "", hl2Id);
    }
    return dbUser.getUserByHl2Id(hl2Id);

}

function getUserByHl3Id(hl3Id) {
    if (!hl3Id) {
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found", "", hl3Id);
    }
    return dbUser.getUserByHl3Id(hl3Id);

}

function insertUser(objUser, userId) {
    if (!objUser.PASSWORD && !objUser.USE_DEFAULT_PASSWORD) {
        throw ErrorLib.getErrors().CustomError("", "", "The PASSWORD is not found");
    }

    if (!objUser.CONFIRM_PASSWORD && !objUser.USE_DEFAULT_PASSWORD) {
        throw ErrorLib.getErrors().CustomError("", "", "The CONFIRM_PASSWORD is not found");
    }

    if (!objUser.ROLE_ID) {
        throw ErrorLib.getErrors().CustomError("", "", "The ROLE_ID is not found");
    }
    if (!usernameRegex.test(objUser.USER_NAME)) {
        throw ErrorLib.getErrors().CustomError("", "", "{\"USER_ERROR\": \"usernameInvalid\"}");
    }

    try {
        var transactionDone = false;
        var userPassHashed = null;
        var userPassword = null;

        // validate user
        if (validateUser(objUser)) {
            if (getUserByUserName(objUser.USER_NAME)) {
                throw ErrorLib.getErrors().CustomError("", "", '{"USER_ERROR": "username"}');
            }

            var userByEmail = getUserByEmail(objUser.EMAIL);
            if (userByEmail && Number(userByEmail.USER_ID) !== Number(objUser.USER_ID)) {
                throw ErrorLib.getErrors().CustomError("", "", '{"USER_ERROR": "email"}');
            }
            // Hash password
            userPassword = !objUser.USE_DEFAULT_PASSWORD && validatePassword(objUser.PASSWORD) ? objUser.PASSWORD : defaultPassword;
            userPassHashed = dbUser.getPasswordHash(userPassword);

            if (userPassHashed.length > 0) {
                // insert user
                var outUserId = dbUser.insertUser(objUser, userId);

                if (outUserId) {
                    // set user password
                    var resultUpdPass = dbUser.updatePass(outUserId,
                        userPassHashed[0].HASH, "", userId);

                    // Insert user role
                    var resultInsUserRole = dbUserRole.insertUserRole(
                        outUserId, objUser.ROLE_ID, userId);

                    // check if transaction was completed
                    transactionDone = !!outUserId && !!resultUpdPass
                        && !!resultInsUserRole;
                }

                if (transactionDone) {
                    db.commit();
                    try {
                        notifyInsertByEmail(objUser.EMAIL, objUser.USER_NAME, userPassword);
                    } catch (e) {
                        throw ErrorLib.getErrors().MailError("The user was created, but the notification email failed to be sent.", "", e);
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

function updateUser(objUser, userId) {

    if (!objUser.USER_ID) {
        throw ErrorLib.getErrors().CustomError("", "", "The USER_ID is not found");
    }

    if (!util.validateIsNumber(objUser.USER_ID)) {
        throw ErrorLib.getErrors().CustomError("", "", "The USER_ID is invalid");
    }

    if (!objUser.DATA_PROTECTION_ENABLED) {
        var userByUserName = getUserByUserName(objUser.USER_NAME);
        if (userByUserName && Number(userByUserName.USER_ID) !== Number(objUser.USER_ID)) {
            throw ErrorLib.getErrors().CustomError("", "", '{"USER_ERROR": "username"}');
        }

        var userByEmail = getUserByEmail(objUser.EMAIL);
        if (userByEmail && Number(userByEmail.USER_ID) !== Number(objUser.USER_ID)) {
            throw ErrorLib.getErrors().CustomError("", "", '{"USER_ERROR": "email"}');
        }
        if (!usernameRegex.test(objUser.USER_NAME)) {
            throw ErrorLib.getErrors().CustomError("", "", "{\"USER_ERROR\": \"usernameInvalid\"}");
        }
        if (!emailRegEx.test(objUser.EMAIL)) {
            throw ErrorLib.getErrors().CustomError("", "", "{\"USER_ERROR\": \"nonSapEmail\"}");
        }
    }
    try {
        var updUserId = null;
        var transactionDone = false;

        // insert objUser

        if (objUser.DATA_PROTECTION_ENABLED) {
            updateUserDataProtection(objUser, userId);
        } else {
            updUserId = dbUser.updateUser(objUser, userId);
        }

        if (updUserId) {
            // Update objUser role
            var resultUserRole = dbUserRole.updateUserRoleByUserId(
                objUser.USER_ID, objUser.ROLE_ID, userId);

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
    }
    catch
        (e) {
        db.rollback();
        throw e;
    }
    finally {
        db.closeConnection();
    }
}

function deleteUser(objUser, userId) {
    if (!objUser.USER_ID) {
        throw ErrorLib.getErrors().CustomError("", "", "The USER_ID is not found");
    }

    if (!util.validateIsNumber(objUser.USER_ID)) {
        throw ErrorLib.getErrors().CustomError("", "", "The USER_ID is invalid");
    }

    return dbUser.deleteUser(objUser, userId);

}

function updateUserPassword(value, modUser) {
    if (!value) {
        throw ErrorLib.getErrors().CustomError("", "", "The USER is not found");
    }
    if (!value.USER_ID) {
        throw ErrorLib.getErrors().CustomError("", "", "The USER_ID is not found");
    }
    if (!value.PASSWORD) {
        throw ErrorLib.getErrors().CustomError("", "", "The PASSWORD is not found");
    }

    if (validatePassword(value.PASSWORD)) {
        var userPassHashed = dbUser.getPasswordHash(value.PASSWORD);
        return dbUser.updatePass(value.USER_ID, userPassHashed.HASH,
            value.PASSWORD_SALT, modUser);
    }
}

function updateUserPasswordHashed(value, modUser) {
    if (!value) {
        throw ErrorLib.getErrors().CustomError("", "", "The USER is not found");
    }
    if (!value.USER_ID) {
        throw ErrorLib.getErrors().CustomError("", "", "The USER_ID is not found");
    }
    if (!value.PASSWORD) {
        throw ErrorLib.getErrors().CustomError("", "", "The PASSWORD is not found");
    }
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

    if (!user) {
        throw ErrorLib.getErrors().CustomError("", "", "The USER is not found");
    }
    if (!user.USER_ID) {
        throw ErrorLib.getErrors().CustomError("", "", "The USER_ID is not found");
    }

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

function updateUserDataProtectionMask(objUser, userId) {
    return dbUser.updateUserDataProtectionMask(config.getDataProtectionMask(), objUser, userId);
}

function updateUserDataProtection(objUser, userId) {
    updateDataProtection(objUser, userId);
    return dataProtectionLib.insertUserDataProtection(objUser, userId);
}

function updateDataProtection(objUser, userId) {
    return dbUser.updateDataProtection(objUser, userId);
}

function restoreUser(reqBody, userId) {
    if (!reqBody.USER_ID || !userId) {
        throw ErrorLib.getErrors().CustomError("", "", "The USER is not found");
    }

    return dbUser.restoreUser(reqBody, userId);
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
    if (!util.validateLength(pass, 15, 6) || !util.validateIsPassword(pass)) {
        throw ErrorLib.getErrors().CustomError("", "", "The PASSWORD is invalid");
    }

    return true;
}

function validateUser(user) {
    if (!user) {
        throw ErrorLib.getErrors().CustomError("", "", "User is not found");
    }

    if (!user.USER_NAME) {
        throw ErrorLib.getErrors().CustomError("", "", "USER_NAME is not found");
    }

    if (!user.FIRST_NAME) {
        throw ErrorLib.getErrors().CustomError("", "", "The FIRST_NAME is not found");
    }

    if (!user.LAST_NAME) {
        throw ErrorLib.getErrors().CustomError("", "", "The LAST_NAME is not found");
    }

    if (!user.EMAIL) {
        throw ErrorLib.getErrors().CustomError("", "", "The EMAIL is not found");
    }

    if (!util.validateLength(user.USER_NAME, 255, 1, "User Name") || !util.validateIsString(user.USER_NAME)) {
        throw ErrorLib.getErrors().CustomError("", "", "The USER_NAME is invalid");
    }

    if (!util.validateLength(user.FIRST_NAME, 255, 1, "First Name") || !util.validateIsString(user.FIRST_NAME)) {
        throw ErrorLib.getErrors().CustomError("", "", "The FIRST_NAME is invalid");
    }

    if (!util.validateLength(user.LAST_NAME, 255, 1, "Last Name") || !util.validateIsString(user.LAST_NAME)) {
        throw ErrorLib.getErrors().CustomError("", "", "The LAST_NAME is invalid");
    }

    if (!util.validateIsEmail(user.EMAIL) || !emailRegEx.test(user.EMAIL)) {
        throw ErrorLib.getErrors().CustomError("", "", "The EMAIL is invalid");
    }

    if (user.PHONE) {
        if (!util.validateLength(user.PHONE, 255, 1, "Phone")) {
            throw ErrorLib.getErrors().CustomError("", "", "The PHONE is invalid");
        }
    }

    return true;
}

function getAllForFilters(user_id) {
    return dbUser.getAllUserForFilters(user_id);
}

function getAllUserByUserName(userName) {
    if (!userName) {
        throw ErrorLib.getErrors().BadRequest("The Parameter User Name is not found", "", userName);
    }

    return dbUser.getAllUserByUserName(userName);
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
    var mailObject = mail.getJson([{
        "address": TO
    }], "Cart Request Tool - Account Created", body);

    mail.sendMail(mailObject, true);
}