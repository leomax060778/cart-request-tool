$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var errors = mapper.getErrors();

/************************ CONSTANTS ***********************************/
var DB_NAME = "CART_REQUEST_TOOL";
var DB_SP_PATH = "xscartrequesttool.db.procedures::";
var DB_CONNECTION =  null;
var HDB_CONNECTION = null;


/************************ METHODS ***********************************/

function extractArray(list){
	 var spResult = [];
	 Object.keys(list).forEach(function(key) {
	  spResult.push(list[key]);
	 });
	 return spResult;
}

/*
 * spName = "mySP"
 * parameters = [{param1: valueparam1, ... , paramN: valueparamN}, ... , {param1: valueparam1, ... , paramN: valueparamN}]
 * 
 * return --> $.hdb.ResultSet
 * */
function executeProcedure(spName, parameters){
	setConnection();
	var result = {};
	var spPath = DB_SP_PATH + spName;
	try{				
		var fn = HDB_CONNECTION.loadProcedure(DB_NAME,spPath);
		result = fn(parameters);
		HDB_CONNECTION.commit();
	}
	catch(e){
		HDB_CONNECTION.rollback();		
		throw errors.getErrors().InternalServerError("Internal Server Error - SQL ",spName + e.toString(),"dbHelper.executeProcedure");
	}
	finally{
		if (!HDB_CONNECTION.isClosed())
			HDB_CONNECTION.close();
	}
	
	return result;
} 

function executeProcedureManual(spName, parameters){
	setConnection();
	var result = {};
	var spPath = DB_SP_PATH + spName;
	try{				
		var fn = HDB_CONNECTION.loadProcedure(DB_NAME,spPath);
		result = fn(parameters);
	}
	catch(e){	
		throw errors.getErrors().InternalServerError("Internal Server Error - SQL ",spName + e.toString(),"dbHelper.executeProcedureManual");
	}
	return result;
}


/*
 * Execute the procedure and return a scalar by name of output parameter
 * out_result: is the name of the output parameter
 * */
function executeScalar(spName, parameters, out_result){
	setConnection();
	var value = undefined;
	var result = {};
	var spPath = DB_SP_PATH + spName;
	try{				
		
		var fn = HDB_CONNECTION.loadProcedure(DB_NAME,spPath);
		result = fn(parameters);	
		 value = Number(ctypes.Int64(result[out_result]));
		HDB_CONNECTION.commit();
	}
	catch(e){
		HDB_CONNECTION.rollback();		
		throw errors.getErrors().InternalServerError("Internal Server Error - SQL ",spName + e.toString(),"dbHelper.executeScalar");	
}
	finally{
		
		if (!HDB_CONNECTION.isClosed())
			HDB_CONNECTION.close();
	}
	
	return value;
}

function executeDecimalManual(spName, parameters, out_result){
	setConnection();
	var value = undefined;
	var result = {};
	var spPath = DB_SP_PATH + spName;
	try{				
		
		var fn = HDB_CONNECTION.loadProcedure(DB_NAME,spPath);
		result = fn(parameters);	
		 value = Number(result[out_result]);		
	}
	catch(e){		
		throw errors.getErrors().InternalServerError("Internal Server Error - SQL ",spName + e.toString(),"dbHelper.executeScalarManual");	
    }
		
	return value;
}

function executeScalarManual(spName, parameters, out_result){
	setConnection();
	var value = undefined;
	var result = {};
	var spPath = DB_SP_PATH + spName;
	try{				
		
		var fn = HDB_CONNECTION.loadProcedure(DB_NAME,spPath);
		result = fn(parameters);	
		 value = Number(ctypes.Int64(result[out_result]));		
	}
	catch(e){		
		throw errors.getErrors().InternalServerError("Internal Server Error - SQL ",spName + e.toString(),"dbHelper.executeScalarManual");	
    }
		
	return value;
}

function setConnection() {
	if (HDB_CONNECTION == null || HDB_CONNECTION.isClosed()) {
		HDB_CONNECTION = $.hdb.getConnection();
	} else if (DB_CONNECTION == null || DB_CONNECTION.isClosed()) {
		DB_CONNECTION =  $.db.getConnection();
	}	
}

function commit(){
	HDB_CONNECTION.commit();
}

function rollback(){
	if (HDB_CONNECTION == null && !HDB_CONNECTION.isClosed())
		HDB_CONNECTION.rollback();
}

function closeConnection(){
	if (!HDB_CONNECTION.isClosed())
		HDB_CONNECTION.close();
}




/********************* whitout testing ***************************/
/* INSERT MASIVE DATA
 * tableName = "my_table"
 * parameters = [[param1, param2,....,paramN],...,[param1,param2,...,paramN]]
 * */
function executeInsert(tableName, parameters){
	var result = 0;
	
	try{
		HDB_CONNECTION.AutoCommit(0);		
		var query = getInsert(tableName, parameters);
		result = HDB_CONNECTION.executeUpdate(query,parameters);				
		HDB_CONNECTION.commit();
	}
	catch(e){
		HDB_CONNECTION.rollback();
		result = 0;
	}
	finally{
		if (!HDB_CONNECTION.isClosed())
			HDB_CONNECTION.close();
	}
	
	return result;
}

/* UPDATE DATA
 * tableName = "my_table"
 * parameters = [[param1, param2,....,paramN],...,[param1,param2,...,paramN]]
 * */
function executeUpdate(tableName, parameters){
	var result = true;
	
	try{
		HDB_CONNECTION.AutoCommit(0);		
		var fn = HDB_CONNECTION.executeUpdate(query,parameters);				
		HDB_CONNECTION.commit();
	}
	catch(e){
		HDB_CONNECTION.rollback();
		result = false;
	}
	finally{
		if (!HDB_CONNECTION.isClosed())
			HDB_CONNECTION.close();
	}
	
	return result;
}

function getUpdate(tableName){
	var param = "(";
	for(var a=0; a<parameters; a++){
		if(a != 0) param = param + ",";
		param = param + "?";
	}
	param = param + ")";
	
	
	
	return 'UPDATE INTO "'+DB_NAME+'"."'+tableName+'" VALUES '+param;
}

function getInsert(tableName){
	var param = '(';
	for(var a=0; a<parameters; a++){
		if(a != 0) param = param + ',';
		param = param + '?';
	}
	param = param + ')';
	
	var query = 'INSERT INTO "'+DB_NAME+'"."'+tableName+'" VALUES '+param;
	
	return "'"+query+"'";
}

function getCaller(name, parameters){
	var param = "(";
	for(var a=0; a<parameters; a++){
		if(a != 0) param = param + ",";
		param = param + "?";
	}
	param = param + ")";
	return 'CALL '+DB_NAME+'."'+DB_SP_PATH+'::'+name+'"'+param;
}