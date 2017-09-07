$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

/** ***********STORE PROCEDURE LIST NAME*************** **/
// Request Changed Column
var GET_REQUEST_CHANGED_COLUMNS_BY_REQUEST_ID = "GET_REQUEST_CHANGED_COLUMNS_BY_REQUEST_ID";
var INS_REQUEST_CHANGED_COLUMN = "INS_REQUEST_CHANGED_COLUMN";
var DEL_REQUEST_CHANGED_COLUMN = "DEL_REQUEST_CHANGED_COLUMN";
//Service Changed Column
var GET_SERVICE_CHANGED_COLUMN_BY_REQUEST_ID = "GET_SERVICE_CHANGED_COLUMN_BY_REQUEST_ID";
var INS_SERVICE_CHANGED_COLUMN = "INS_SERVICE_CHANGED_COLUMN";
var DEL_SERVICE_CHANGED_COLUMN = "DEL_SERVICE_CHANGED_COLUMN";
//Special Request Changed Column
var GET_SPECIAL_REQUEST_CHANGED_COLUMN_BY_REQUEST_ID = "GET_SPECIAL_REQUEST_CHANGED_COLUMN_BY_REQUEST_ID";
var INS_SPECIAL_REQUEST_CHANGED_COLUMN = "INS_SPECIAL_REQUEST_CHANGED_COLUMN";
var DEL_SPECIAL_REQUEST_CHANGED_COLUMN = "DEL_SPECIAL_REQUEST_CHANGED_COLUMN";
/** ***********END PROCEDURE LIST NAME*************** */

/** ***********REQUEST CHANGED COLUMN*************** */
//Get Request Changed Columns
function getRequestChangedColumn(requestId){
    var param = {};
    param.in_request_id = requestId;
    param.out_result = '?';
    var result = db.executeProcedureManual(GET_REQUEST_CHANGED_COLUMNS_BY_REQUEST_ID, param);
    return db.extractArray(result.out_result);
}

//Insert Request Changed Columns
function insertRequestChangedColumn(objRequestChangedColumn, userId){
	var param = {};
	param.in_request_id = objRequestChangedColumn.REQUEST_ID;
	param.in_column_name = objRequestChangedColumn.COLUMN_NAME;
	param.in_column_changed = objRequestChangedColumn.COLUMN_CHANGED;
	param.in_display_name = objRequestChangedColumn.DISPLAY_NAME;
	param.in_created_user_id = userId;
	param.out_result = '?';
	
	return db.executeScalarManual(INS_REQUEST_CHANGED_COLUMN, param, 'out_result');
}

//Delete Request Changed Columns
function deleteRequestChangedColumn(requestId, userId){
	var param = {};
    param.in_request_id = requestId;
    param.in_modified_user_id = userId;
    param.out_result = '?';
    var result = db.executeProcedureManual(DEL_REQUEST_CHANGED_COLUMN, param);
    return db.extractArray(result.out_result);
}
/** ***********END REQUEST CHANGED COLUMN*************** */

/** ***********SERVICE CHANGED COLUMN*************** */
//Get Service Changed Columns
function getServiceChangedColumn(requestId){
    var param = {};
    param.in_request_id = requestId;
    param.out_result = '?';
    var result = db.executeProcedureManual(GET_SERVICE_CHANGED_COLUMN_BY_REQUEST_ID, param);
    return db.extractArray(result.out_result);
}

//Insert Service Changed Columns
function insertServiceChangedColumn(objServiceChangedColumn, userId){
    var param = {};
    param.in_request_id = objServiceChangedColumn.REQUEST_ID;
    param.in_service_id = objServiceChangedColumn.SERVICE_ID;
    param.in_column_name = objServiceChangedColumn.COLUMN_NAME;
    param.in_column_changed = objServiceChangedColumn.COLUMN_CHANGED;
    param.in_display_name = objServiceChangedColumn.DISPLAY_NAME;
    param.in_created_user_id = userId;
    param.out_result = '?';

    return db.executeScalarManual(INS_SERVICE_CHANGED_COLUMN, param, 'out_result');
}

//Delete Service Changed Columns
function deleteServiceChangedColumn(requestId, userId){
    var param = {};
    param.in_request_id = requestId;
    param.in_modified_user_id = userId;
    param.out_result = '?';
    var result = db.executeProcedureManual(DEL_SERVICE_CHANGED_COLUMN, param);
    return db.extractArray(result.out_result);
}
/** ***********END SERVICE CHANGED COLUMN*************** */

/** ***********SPECIAL REQUEST CHANGED COLUMN*************** */
//Get Special Request Changed Columns
function getSpecialRequestChangedColumn(requestId){
    var param = {};
    param.in_request_id = requestId;
    param.out_result = '?';
    var result = db.executeProcedureManual(GET_SPECIAL_REQUEST_CHANGED_COLUMN_BY_REQUEST_ID, param);
    return db.extractArray(result.out_result);
}

//Insert Special Request Changed Columns
function insertSpecialRequestChangedColumn(objSpecialRequestChangedColumn, userId){
    var param = {};
    param.in_request_id = objSpecialRequestChangedColumn.REQUEST_ID;
    param.in_special_request_id = objSpecialRequestChangedColumn.SPECIAL_REQUEST_ID;
    param.in_column_name = objSpecialRequestChangedColumn.COLUMN_NAME;
    param.in_column_changed = objSpecialRequestChangedColumn.COLUMN_CHANGED;
    param.in_display_name = objSpecialRequestChangedColumn.DISPLAY_NAME;
    param.in_created_user_id = userId;
    param.out_result = '?';
    return db.executeScalarManual(INS_SPECIAL_REQUEST_CHANGED_COLUMN, param, 'out_result');
}

//Delete Special Request Changed Columns
function deleteSpecialRequestChangedColumn(requestId, userId){
    var param = {};
    param.in_request_id = requestId;
    param.in_modified_user_id = userId;
    param.out_result = '?';
    var result = db.executeProcedureManual(DEL_SPECIAL_REQUEST_CHANGED_COLUMN, param);
    return db.extractArray(result.out_result);
}
/** ***********END SPECIAL REQUEST CHANGED COLUMN*************** */