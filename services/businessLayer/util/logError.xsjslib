$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dbError = mapper.getDataLogError();
var businessMail = mapper.getMail();
var errors = mapper.getErrors();

/*
 *   Errors.BadRequest = function(message,stack, details){
        this.name = "Bad Request";
        this.message = message || "Bad Request";
        this.code = 400;
        this.stack = stack || (new Error).stack;
        this.details = details || "without details";
    }
 * */

function validate(error){
	if(error && error.name && error.message && error.code && error.stack && error.details){
		return true;	
	}	
	throw new errors.BadRequest("Bad format error", JSON.stringify(error));
}

function log(error, user, modUser){
	
	if(validate(error)){				
			dbError.log(error, user, modUser);	
			
			return true;
	}	
	
	return false;
	
}

function notifyMail(error){
	businessMail.sendMail(error);
}