$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_ALL_LOCATION_OF_WORK = "GET_ALL_LOCATION_OF_WORK";
var GET_LOCATION_BY_ID = "GET_LOCATION_OF_WORK_BY_ID";
var INS_LOCATION = "INS_LOCATION_OF_WORK";
var UPD_LOCATION = "UPD_LOCATION_OF_WORK";
var DEL_LOCATION = "DEL_LOCATION_OF_WORK";

//Get all Location of work
function getAllLocation() {
    var parameters = {};
    var result = db.executeProcedure(GET_ALL_LOCATION_OF_WORK, parameters);
    return db.extractArray(result.out_result);
}

function getLocationById(location_id){
	
	var param = {};
	param.in_location_id = location_id;
	param.out_result = '?';
	
	var result = db.executeProcedure(GET_LOCATION_BY_ID, param);
	return db.extractArray(result.out_result);
}

function getManualLocationById(location_id){
	
	var param = {};
	param.in_location_id = location_id;
	param.out_result = '?';
	
	var result = db.executeProcedureManual(GET_LOCATION_BY_ID, param);
	return db.extractArray(result.out_result);
}

function insertLocation(objLocation, user_id){
	var param = {};
	param.in_location_name = objLocation.LOCATION_NAME;
	param.in_created_user_id = user_id;
	param.out_result = '?';
	
	return db.executeScalar(INS_LOCATION, param, 'out_result');
}

function updateLocation(objLocation, user_id){
	var param = {};
	param.in_location_id = objLocation.LOCATION_ID;
	param.in_location_name = objLocation.LOCATION_NAME;
	param.in_modified_user_id = user_id;
	param.out_result = '?';
	
	return db.executeScalarManual(UPD_LOCATION, param, 'out_result');
	 
}

function deleteLocation(location_id, user_id){
	var param = {};
	param.in_location_id = location_id;
	param.in_modified_user_id = user_id;
	param.out_result = '?';
	
	return db.executeScalarManual(DEL_LOCATION, param, 'out_result');
}