function performAdd() {
    var body = '';
    var num1 = $.request.parameters.get('num1');
    var num2 = $.request.parameters.get('num2');
    
    var answer;
    answer = parseInt(num1,10) + parseInt(num2,10);

    body = answer.toString();

    $.response.setBody(body);
    $.response.status = $.net.http.OK;
}


/****************************************************************************************************************/

function getTokenSession(reqBody){
	var conn = $.hdb.getConnection();
	try {
		// Extract body insert data to DB and return results in JSON/other
		// format
		var username = reqBody.username;
		var password = reqBody.password;

		// Look for user in the db
		// KNOWN ISSUE: password is not being validated!!!
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
		
		var testUserToken = "token found";
		
		if (!currentUserToken) {
			testUserToken = "no token found";
		}

		// Return user token
		conn.close();
		$.response.status = $.net.http.CREATED;

		var username = currentUser['USER_NAME'] !== "undefined" ? currentUser['USER_NAME'] : "";
		var firstName = currentUser['FIRST_NAME'] !== "undefined" ? currentUser['FIRST_NAME'] : "";
		var lastName = currentUser['LAST_NAME'] !== "undefined" ? currentUser['LAST_NAME'] : "";
		
		handleResponse({
			"code" : $.net.http.OK,
			"data" : {
				"results" : [ {
					"USER_ID" : currentUserId,
					"USER_NAME" : username,
					"FIRST_NAME" : firstName,
					"LAST_NAME" : lastName,
					"TOKEN" : encodeURIComponent(currentUserToken),
					"EXIST TOKEN": testUserToken
				} ]
			}
		}, $.net.http.OK);
	} catch (e) {
		conn.rollback();
		handleResponse({
			"code" : $.net.http.INTERNAL_SERVER_ERROR,
			"errors" : {
				"INTERNAL_SERVER_ERROR" : e.toString()
			}
		}, $.net.http.INTERNAL_SERVER_ERROR);
	}
}

function getUserToken(userId) {
	var conn2 = $.hdb.getConnection();

	try {
		// Look for user token
		var spUserToken = conn2
				.loadProcedure('CART_REQUEST_TOOL',
						'xscartrequesttool.db.procedures::GET_USER_SESSION_TOKEN_BY_USER_ID');

		var result = spUserToken(userId);
		conn2.close();

		var spResult = result['out_result'];
		var userToken = [];
		Object.keys(spResult).forEach(function(key) {
			userToken.push(spResult[key]);
		});

		// If user exists, then check if there is a token
		if (userToken.length > 0) {
			// Validate token is still valid
			var userSessionInfo = userToken[0];
			var currentUserToken = userSessionInfo['TOKEN_VALID_UNTIL_DATE_TZ'];
			throw new Error($.net.http.INTERNAL_SERVER_ERROR + " " + JSON.stringify(userSessionInfo));
			if (new Date(currentUserToken) >= new Date())
				return userSessionInfo['TOKEN'];
		}
		
		return null;
	} catch (e) {
		conn2.close();
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

function handleResponse(body, code) {
	$.response.contentType = "application/json";
	$.response.status = code;
	$.response.setBody(JSON.stringify(body));
};

/****************************************************************************************************************/

function hashPassword(reqBody){
	var conn = $.hdb.getConnection();
	try {
		// Extract body insert data to DB and return results in JSON/other
		// format
		var username = reqBody.username;
		var password = reqBody.password;
		var use_default = reqBody.use_default_password;
		var defaultPassword = "123456";
		var pasoPass = null;
		var userPassword = null;
		
		userPassword = !use_default ? password : defaultPassword;
		pasoPass = !use_default ? "Used user pass" : "Used default pass";
			
		// Look for user in the db
		var spHash256 = conn.loadProcedure('CART_REQUEST_TOOL',
				'xscartrequesttool.db.procedures::GET_HASH_SHA256');
		var result = spHash256(userPassword);
		var spResult = result['out_result'];
		var userPassHashed = [];
		Object.keys(spResult).forEach(function(key) {
			userPassHashed.push(spResult[key]);
		});
		
		if (userPassHashed.length > 0) {
			var passHashed = userPassHashed[0];
		}

		// If user exists, then check if there is a token
		//var currentPassHash = Array.isArray(userPassHashed) ? userPassHashed[0] : null;

		// Return user pass hashed
		conn.close();
		$.response.status = $.net.http.CREATED;
			
		handleResponse({
			"code" : $.net.http.OK,
			"data" : {
				"results" : [ {
					"USER_NAME" : username,
					"USED PASSWORD" : pasoPass,
					"USE DEFAULT" : JSON.parse(use_default),
					"PASSWORD HASHED" : passHashed['HASH']
				} ]
			}
		}, $.net.http.OK);
	} catch (e) {
		//conn.rollback();
		handleResponse({
			"code" : $.net.http.INTERNAL_SERVER_ERROR,
			"errors" : {
				"INTERNAL_SERVER_ERROR" : e.toString()
			}
		}, $.net.http.INTERNAL_SERVER_ERROR);
	}
}

/****************************************************************************************************************/

/********************************************* INSERT USER ROLE *************************************************/

function insertUserRole(){
	var value = undefined;
	var result = {};
	var conn = $.hdb.getConnection();

	try {

		var fn = conn.loadProcedure('CART_REQUEST_TOOL',
				'xscartrequesttool.db.procedures::INS_USER_ROLE');
		
		var paramsUserRole = {
				"in_user_id": 36,
				"in_role_id": 1,
				"in_created_user_id": 1
		};
			
		result = fn(paramsUserRole);
		value = Number(ctypes.Int64(result.out_user_role_id));
		conn.commit();
		
		handleResponse({
			"code" : $.net.http.OK,
			"data" : {
				"results" : [ {
					"RESULT" : JSON.stringify(value)
				} ]
			}
		}, $.net.http.OK);
		
	} catch (e) {
		conn.rollback();
		handleResponse({
			"code" : $.net.http.INTERNAL_SERVER_ERROR,
			"errors" : {
				"INTERNAL_SERVER_ERROR" : e.toString()
			}
		}, $.net.http.INTERNAL_SERVER_ERROR);
	} finally {

		if (!conn.isClosed()){
		    conn.close();
		}
	}
}

/********************************************* POST EMAIL DATA *************************************************/
function postEmailData() {

   	var body = JSON.stringify({"addressTo": "lhildt@folderit.net",
  							  "addressBcc": "leonardohildt@gmail.com",
 							  "subject": "sent from HCP",
  							  "message": "test from Postman via servlet" });

   
     $.ajax({
        type: "POST",
        url: "https://mailsendwebappp1942151816trial.hanatrial.ondemand.com/EmailSendingWebApp",
        data: JSON.stringify({"addressTo": "lhildt@folderit.net",
  							  "addressBcc": "leonardohildt@gmail.com",
 							  "subject": "sent from HCP",
  							  "message": "test from Postman via servlet" }),
        success: function () {
        	alert("Thanks!"); 
        },
        dataType: "json",
        contentType : "application/json"
    });
    
        $.response.setBody(body);
    $.response.status = $.net.http.OK;
    
}

/********************************************* UPDATE USER ROLE *************************************************/

function updateUserRole(){
	var value = undefined;
	var result = {};
	var conn = $.hdb.getConnection();

	try {

		var fn = conn.loadProcedure('CART_REQUEST_TOOL',
				'xscartrequesttool.db.procedures::UPD_USER_ROLE_BY_USER_ID');
		
		var paramsUpdateUserRole = {
				"in_user_id": 38,
				"in_role_id": 1,
				"in_modified_user_id": 1
		};
			
		result = fn(paramsUpdateUserRole);
		value = Number(ctypes.Int64(result.out_result));
		conn.commit();
		
		handleResponse({
			"code" : $.net.http.OK,
			"data" : {
				"results" : [ {
					"RESULT" : JSON.stringify(value)
				} ]
			}
		}, $.net.http.OK);
		
	} catch (e) {
		conn.rollback();
		handleResponse({
			"code" : $.net.http.INTERNAL_SERVER_ERROR,
			"errors" : {
				"INTERNAL_SERVER_ERROR" : e.toString()
			}
		}, $.net.http.INTERNAL_SERVER_ERROR);
	} finally {

		if (!conn.isClosed()){
		    conn.close();
		}
	}
}

/****************************************************************************************************************/
function getRequestDetails() {
	var queryParameterDetails = 'QUERY PARAMETER DETAILS:' +" <br><br>";
	var noOfParams = $.request.parameters.length; 
	queryParameterDetails = queryParameterDetails + 'NO OF QUERY PARAMTERS ARE:' + noOfParams + " <br>";
	queryParameterDetails = queryParameterDetails + 'QUERY PARAMTERS AND THEIR VALUES ARE: ' + " <br>";
	
	var i;
	for (i = 0; i < $.request.parameters.length; ++i) {
		queryParameterDetails = queryParameterDetails + $.request.parameters[i].name + ': ' + $.request.parameters[i].value + '<br>';
	}
	
	var requestHeaderDetails = '<br>' + 'REQUEST HEADER DETAILS:' + '<br><br>';
	requestHeaderDetails = requestHeaderDetails + 'HOST NAME IS: ' + $.request.headers.get('host')+ " <br>";
	requestHeaderDetails = requestHeaderDetails + 'REQUEST METHOD IS: ' + $.request.headers.get('~request_method')+ " <br>";
	requestHeaderDetails = requestHeaderDetails + 'SERVER PORT IS: ' + $.request.headers.get('~server_port')+ " <br>";
	requestHeaderDetails = requestHeaderDetails + 'REQUEST AUTHORIZATION IS: ' + $.request.headers.get('~authorization')+ " <br>";
	requestHeaderDetails = requestHeaderDetails + 'REQUEST X-CSRF-TOKEN IS: ' + $.request.headers.get('~x-csrf-token')+ " <br>";
	requestHeaderDetails = requestHeaderDetails + 'CONTENT TYPE IS: ' + $.request.contentType + " <br>";
	requestHeaderDetails = requestHeaderDetails + 'CLIENT PROTOCOL IS: ' + $.request.headers.get('clientprotocol')+ "<br>";
	requestHeaderDetails = requestHeaderDetails + 'URL PATH: ' + $.request.headers.get('~path')+ " <br>";
	requestHeaderDetails = requestHeaderDetails + 'QUERY STRING: ' + $.request.headers.get('~query_string')+ " <br><br>";
	
	var i;
	if($.request.headers.length > 0){
		requestHeaderDetails = requestHeaderDetails + 'LIST HEADER NAMES' + " <br>";
	}
	for (i = 0; i < $.request.headers.length; ++i) {
	    var name = $.request.headers[i].name;
	    requestHeaderDetails = requestHeaderDetails + name +  " => " + $.request.headers[i].value +" <br>";
	}	
	
	var httpMethodName = 'HTTP METHOD IS: ';
	switch ($.request.method) {
	case $.net.http.GET:
		httpMethodName = httpMethodName + 'GET';
		break;
	case $.net.http.POST:
		httpMethodName = httpMethodName + 'POST';
		break;
	case $.net.http.PUT:
		httpMethodName = httpMethodName + 'PUT';
		break;
	default:
		break;
	}	
	$.response.contentType = "text/html";
	$.response.status = $.net.http.OK;
	$.response.setBody(queryParameterDetails + requestHeaderDetails + httpMethodName);
}

var aCmd = $.request.parameters.get('cmd');
switch (aCmd) {
    case "add":
        performAdd();
        break;
    case "metadata":
        getRequestDetails();
        break;
    case "session":
		var reqBody = $.request.body ? JSON.parse($.request.body.asString())
				: undefined;
    	getTokenSession(reqBody);
        break;
    case "hash":
		var reqBody = $.request.body ? JSON.parse($.request.body.asString())
				: undefined;
    	hashPassword(reqBody);
    	 break;
    case "insertUserRole":
    	insertUserRole();
    	break;
    case "updateUserRole":
    	updateUserRole();
    	break;
    case "sendEmail":
    	postEmailData();
    	break;
    default:
    	$.response.status = $.net.http.BAD_REQUEST;
    	$.response.setBody('Invalid Command ' + aCmd);
    	
}
