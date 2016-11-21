

function getErrors(){
	
	var Errors = {};
	
	
    /******************* 400 **********************************************/
	Errors.BadRequest = function(message,stack, details){
		var e = {};
        e.name = "Bad Request";
        e.message = message || "Bad Request";
        e.code = 400;
        e.stack = stack || "";
        e.details = details || "without details";
        e.toString = function (){return "name:"+e.name+" -message:"+e.message+" -code:"+
        	e.code+" -stack:"+e.stack+" -details:"+e.details};
        return e;
    }
	
	Errors.Unauthorized = function(message,stack, details){
		var e = {};
        e.name = "Unauthorized";
        e.message = message || "Unauthorized";
        e.code = 401;
        e.stack = stack || "";
        e.details = details || "without details";
        e.toString = function (){return "name:"+e.name+" -message:"+e.message+" -code:"+e.code+" -stack:"+e.stack+" -details:"+e.details};
        return e;
    }
	
    Errors.Forbidden  = function(message,stack, details){
    	var e = {};
        e.name = "Forbidden";
        e.message = message || "Forbidden";
        e.code = 403;
        e.stack = stack || "";
        e.details = details || "without details";
        e.toString = function (){return "name:"+e.name+" -message:"+e.message+" -code:"+
        	e.code+" -stack:"+e.stack+" -details:"+e.details};
        return e;
    }
    

    Errors.NotFound  = function(message,stack, details){
    	var e={};
        e.name = "Not Found";
        e.message = message || "Not Found";
        e.code = 404;
        e.stack = stack || "";
        e.details = details || "without details";
        e.toString = function (){return "name:"+e.name+" -message:"+e.message+" -code:"+
        	e.code+" -stack:"+e.stack+" -details:"+e.details};
        return e;
    }
    

    Errors.RequestTimeout  = function(message,stack, details){
    	var e={};
        e.name = "Request Timeout";
        e.message = message || "Request Timeout";
        e.code = 408;
        e.stack = stack || "";
        e.details = details || "without details";
        e.toString = function (){return "name:"+e.name+" -message:"+e.message+" -code:"+
        	e.code+" -stack:"+e.stack+" -details:"+e.details};
        return e;
    }
   

    Errors.RequestURITooLong  = function(message,stack, details){
    	var e={};
        e.name = "Request-URI Too Long";
        e.message = message || "Request-URI Too Long";
        e.code = 414;
        e.stack = stack || "";
        e.details = details || "without details";
        e.toString = function (){return "name:"+e.name+" -message:"+e.message+" -code:"+
        	e.code+" -stack:"+e.stack+" -details:"+e.details};
        return e;
    }
    
    
    Errors.CustomError  = function(message,stack, details){
    	var e={};
        e.name = "Custom Error";
        e.message = message || "Custom Error";
        e.code = 450;
        e.stack = stack || "";
        e.details = details || "without details";
        e.toString = function (){return "name:"+e.name+" -message:"+e.message+" -code:"+
        	e.code+" -stack:"+e.stack+" -details:"+e.details};
        return e;
    }

    /******************* 500 **********************************************/
    Errors.InternalServerError  = function(message,stack, details){
    	var e={};
        e.name = "Internal Server Error";
        e.message = message || "Internal Server Error";
        e.code = 500;
        e.stack = stack || "";
        e.details = details || "without details";
        e.toString = function (){return "name:"+e.name+" -message:"+e.message+" -code:"+
        	e.code+" -stack:"+e.stack+" -details:"+e.details};
        return e;
    }
      
     

    Errors.NotImplemented  = function(message,stack, details){
    	var e={};
        e.name = "Not Implemented";
        e.message = message || "Not Implemented";
        e.code = 501;
        e.stack = stack || "";
        e.details = details || "without details";
        e.toString = function (){return "name:"+e.name+" -message:"+e.message+" -code:"+
        	e.code+" -stack:"+e.stack+" -details:"+e.details};
        return e;
    }
    

    Errors.ServiceUnavailable  = function(message,stack, details){
    	var e={};
        e.name = "Service Unavailable";
        e.message = message || "Service Unavailable";
        e.code = 503;
        e.stack = stack || "";
        e.details = details || "without details";
        e.toString = function (){return "name:"+e.name+" -message:"+e.message+" -code:"+
        	e.code+" -stack:"+e.stack+" -details:"+e.details};
        return e;
    }
    

    Errors.NetworkAuthenticationRequired  = function(message,stack, details){
    	var e={};
        e.name = "Network Authentication Required";
        e.message = message || "Network Authentication Required";
        e.code = 511;
        e.stack = stack || "";
        e.details = details || "without details";
        e.toString = function (){return "name:"+e.name+" -message:"+e.message+" -code:"+
        	e.code+" -stack:"+e.stack+" -details:"+e.details};
        return e;
    }
    

    Errors.list = {
        '400':  Errors.BadRequest(),
        '401':  Errors.Unauthorized(),
        '403':  Errors.Forbidden(),
        '404':  Errors.NotFound(),
        '408':  Errors.RequestTimeout(),
        '414':  Errors.RequestURITooLong(),
        '450':  Errors.CustomError(),
        '500':  Errors.InternalServerError(),
        '501':  Errors.NotImplemented(),
        '503':  Errors.ServiceUnavailable(),
        '511':  Errors.NetworkAuthenticationRequired()
    };

    Errors.getError = function (code){
        var errorSelected =  Errors.list[code];
        if(errorSelected) return errorSelected;
        return Errors.list[500];
    }
   

    return Errors;
}