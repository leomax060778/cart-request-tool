//**** Example for basic REQUEST RESPONSE handling
var paramName;
var paramValue;
var headerName;
var headerValue;
var contentType;
//TODO: move this to configuration
var tokenLifeTimeSeconds = 43200;

// Implementation of GET call
function handleGet() {
    // Retrieve data here and return results in JSON/other format
    $.response.status = $.net.http.OK;
    return {
        "myResult" : " GET success"
    };
}
// Implementation of POST call
function handlePost(reqBody) {
    var conn = $.hdb.getConnection();
    try {
        // Extract body insert data to DB and return results in JSON/other
        // format
        var username = reqBody.username;
        var password = reqBody.password;

        // Look for user in the db
        var fnUser = conn.loadProcedure('CART_REQUEST_TOOL',
            'xscartrequesttool.db.procedures::GET_USER_BY_USERNAME');
        var result = fnUser(username);

		var spResult = result['out_result'];
		var user = [];
		Object.keys(spResult).forEach(function(key) {
			user.push(spResult[key]);
		});
	
		// If user exists, then check if there is a token
		var currentUser = Array.isArray(user) ? user[0] : null;
		var currentUserToken = null;
		var currentUserId = currentUser['USER_ID'];
			
		if (currentUser) {
			currentUserToken = getUserToken(currentUserId);
		}
		
		// Validate user password
		var userHashedPassword = getPasswordHash(password);
		var currentUserPassword = currentUser['PASSWORD'];
		
	if(userHashedPassword && currentUserPassword && userHashedPassword != currentUserPassword){
		throw new Error($.net.http.INTERNAL_SERVER_ERROR + " " + 'Invalid credentials. Please log in again');
	}
	// If not, proceeds to create the token
	if (!currentUserToken) {
		// Delete any existing token for this user
		deleteUserToken(currentUserId);

		currentUserToken = createUserToken(currentUserId);
	}
        // Return user token
        conn.close();
        $.response.status = $.net.http.CREATED;

	var username = currentUser['USER_NAME'] !== "undefined" ? currentUser['USER_NAME'] : "";
	var firstName = currentUser['FIRST_NAME'] !== "undefined" ? currentUser['FIRST_NAME'] : "";
	var lastName = currentUser['LAST_NAME'] !== "undefined" ? currentUser['LAST_NAME'] : "";
	var email = currentUser['EMAIL'] !== "undefined" ? currentUser['EMAIL'] : "";
		
	handleResponse({
		"code" : $.net.http.OK,
		"data" : {
			"results" : [ {
				"USER_ID" : currentUserId,
				"USER_NAME" : username,
				"FIRST_NAME" : firstName,
				"LAST_NAME" : lastName,
				"TOKEN" : encodeURIComponent(currentUserToken),
				"EMAIL": email
			} ]
		}
	}, $.net.http.OK);

    } catch (e) {
        conn.rollback();
        conn.close();
        handleResponse({
            "code" : $.net.http.INTERNAL_SERVER_ERROR,
            "errors" : {
                "INTERNAL_SERVER_ERROR" : e.toString()
            }
        }, $.net.http.INTERNAL_SERVER_ERROR);
    }
}
// Implementation of DELETE call
function handleDelete(reqBody) {
    try {
        // Extract body insert data to DB and return results in JSON/other
        // format
        var isUserTokenDeleted = false;
        var userId = reqBody.userId;

        if (userId !== null) {
            isUserTokenDeleted = deleteUserToken(userId);
        }

        handleResponse({
            "code" : $.net.http.OK,
            "data" : {
                "results" : []
            }
        }, $.net.http.OK);
    } catch (e) {
        handleResponse({
            "code" : $.net.http.INTERNAL_SERVER_ERROR,
            "errors" : {
                "INTERNAL_SERVER_ERROR" : e.toString()
            }
        }, $.net.http.INTERNAL_SERVER_ERROR);
    }
}
// Check Content type headers and parameters
function validateInput() {
    var i;
    var j;
    // Check content-type is application/json
    contentType = $.request.contentType;
    if (contentType === null
        || contentType.startsWith("application/json") === false) {
        $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.setBody("Wrong content type request use application/json");
        return false;
    }
    // Extract parameters and process them
    for (i = 0; i < $.request.parameters.length; ++i) {
        paramName = $.request.parameters[i].name;
        paramValue = $.request.parameters[i].value;
        // Add logic
    }
    // Extract headers and process them
    for (j = 0; j < $.request.headers.length; ++j) {
        headerName = $.request.headers[j].name;
        headerValue = $.request.headers[j].value;
        // Add logic
    }
    return true;
}
// Request process
function processRequest() {
    try {
        var reqBody = $.request.body ? JSON.parse($.request.body.asString())
            : undefined;
        if (!reqBody || validateInput(reqBody, $.request.method)) {
            switch ($.request.method) {
                case $.net.http.GET:
                    handleGet(reqBody);
                    break;
                case $.net.http.POST:
                    handlePost(reqBody);
                    break;
                case $.net.http.DEL:
                    handleDelete(reqBody);
                    break;
                default:
                    handleResponse({
                        "message" : $.request.method
                        + " HTTP method is not supported."
                    }, $.net.http.BAD_REQUEST);
                    break;
            }
        }
    } catch (e) {
        handleResponse({
            "code" : $.net.http.INTERNAL_SERVER_ERROR,
            "errors" : {
                "INTERNAL_SERVER_ERROR" : e.toString()
            }
        }, $.net.http.INTERNAL_SERVER_ERROR);
    }
}

function handleResponse(body, code) {
    $.response.contentType = "application/json";
    $.response.status = code;
    $.response.setBody(JSON.stringify(body));
};

function getUserToken(userId) {
    var conn2 = $.hdb.getConnection();

    try {
        // Look for user token
        var spUserToken = conn2
            .loadProcedure('CART_REQUEST_TOOL',
                'xscartrequesttool.db.procedures::GET_USER_SESSION_TOKEN_BY_USER_ID');

        var result = spUserToken(userId);
        
        var spResult = result['out_result'];
        var userToken = [];
        Object.keys(spResult).forEach(function(key) {
            userToken.push(spResult[key]);
        });
	// close connection
	conn2.close();

	// If user exists, then check if there is a token
	if (userToken.length > 0) {
		// Validate token is still valid
		var userSessionInfo = userToken[0];
		var currentUserToken = userSessionInfo['TOKEN_VALID_UNTIL_DATE_TZ'];
		if (new Date(currentUserToken) >= new Date())
			return userSessionInfo['TOKEN'];
	}


        return null;
    } catch (e) {
        conn2.close();
        throw new Error($.net.http.INTERNAL_SERVER_ERROR + " " + e.toString());
    }
}

function createUserToken(userId) {
    var connIns = $.db.getConnection();

    try {

        // Generate user token based on
        var currentDate = new Date();
        var userToken = getSYSUUID();
		
	if(userToken == null || typeof userToken == undefined){
		throw new Error($.net.http.INTERNAL_SERVER_ERROR + " " + "Token can not be null");
	}
        // Store the new user token
        var query = 'call "CART_REQUEST_TOOL"."xscartrequesttool.db.procedures::INS_USER_SESSION_TOKEN"(?,?,?,?,?)';

        var cst = connIns.prepareCall(query);
        cst.setBigInt(1, userId);
        cst.setString(2, userToken);
        cst.setInt(3, tokenLifeTimeSeconds);
        cst.setBigInt(4, userId);

        cst.execute();
        var spResultId = Number(ctypes.Int64(cst.getBigInt(5)));
	// commit and close the connection
        connIns.commit();
        connIns.close();

        if (spResultId > 0) {
            return userToken;
        }
        return null;

    } catch (e) {
        connIns.rollback();
        connIns.close();

        throw new Error($.net.http.INTERNAL_SERVER_ERROR + " " + e.toString());
    }
}

function deleteUserToken(userId) {
    var connDel = $.db.getConnection();

    try {
        // Delete any existing token for this user
        var queryDelUserToken = 'call "CART_REQUEST_TOOL"."xscartrequesttool.db.procedures::DEL_USER_SESSION_TOKEN"(?,?)';
        var cst = connDel.prepareCall(queryDelUserToken);

        cst.setBigInt(1, userId);
        cst.execute();
        var spResultId = cst.getInteger(2);
        connDel.commit();
        connDel.close();

        if (spResultId > 0) {
            return true;
        }
        return false;

    } catch (e) {
        connDel.rollback();
        connDel.close();
        throw new Error($.net.http.INTERNAL_SERVER_ERROR + " " + e.toString());
    }
}

function getSYSUUID(){
	var conn = $.hdb.getConnection();

	try {

		// Delete any existing token for this user
		var spUserToken = conn.loadProcedure('CART_REQUEST_TOOL', 'xscartrequesttool.db.procedures::GET_SYSUUID');
		var result = spUserToken();
		conn.close();
		
		var spResult = result['out_result'];
		if(spResult != null && spResult.length > 0){
			var rowResult = spResult[0];
			return rowResult['SYS_UNIQUE_NUMBER'];
		}

		return null;

	} catch (e) {
		conn.close();
		throw new Error($.net.http.INTERNAL_SERVER_ERROR + " " + e.toString());
	}
}

function getPasswordHash(userPassword) {
	var conn = $.hdb.getConnection();

	try {
		// Get password hash
		var spHash256 = conn.loadProcedure('CART_REQUEST_TOOL',
				'xscartrequesttool.db.procedures::GET_HASH_SHA256');
		var result = spHash256(userPassword);
		var spResult = result['out_result'];
		var userPassHashed = [];
		Object.keys(spResult).forEach(function(key) {
			userPassHashed.push(spResult[key]);
		});
		conn.close();

		if (userPassHashed.length > 0) {
			var passHashed = userPassHashed[0];
			return passHashed['HASH'];
		}

		return null

	} catch (e) {
		conn.rollback();
		conn.close();
		throw new Error($.net.http.INTERNAL_SERVER_ERROR + " " + e.toString());
	}
}

// Call request processing
processRequest();