/***************Import Library*******************/
$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/

var INSERT = "INS_LOG_ERROR";
/*
 * IN in_name_error nvarchar(255),
	IN in_message nvarchar(1000),
	IN in_stack nvarchar(5000),
	IN in_details nvarchar(5000),
	IN in_user_id bigint,	
	IN in_modified_user_id bigint,
	OUT out_error_id bigint
 * */


function log(error, user, modUser){		
		var parameters = {};
		parameters.IN_NAME_ERROR = error.name;
		parameters.IN_MESSAGE=error.message;
		parameters.in_stack=error.stack;
		parameters.in_details=error.details;
		parameters.in_user_id =user;
		parameters.in_modified_user_id=modUser;
		parameters.out_error_id='?';		                	 
	
		var rdo = db.executeScalar(INSERT,parameters,"out_error_id");			
		
		return rdo;
}