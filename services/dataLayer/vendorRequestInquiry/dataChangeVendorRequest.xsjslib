$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var INS_CHANGE_VENDOR_REQUEST = "INS_CHANGE_VENDOR_REQUEST";
var GET_ALL_CHANGE_VENDOR_REQUEST = "GET_ALL_CHANGE_VENDOR_REQUEST";
var GET_CHANGE_VENDOR_REQUEST_BY_ID = "GET_CHANGE_VENDOR_REQUEST_BY_ID";
var DEL_CHANGE_VENDOR_REQUEST = "DEL_CHANGE_VENDOR_REQUEST";
var UPD_CHANGE_VENDOR_REQUEST = "UPD_CHANGE_VENDOR_REQUEST";

//Insert change vendor request
function insertChangeVendorRequest(objChangeVendorRequest, userId) {
    var parameters = {};
    parameters.in_user_id = userId;
    parameters.in_entity_id = objChangeVendorRequest.ENTITY_ID;
    parameters.in_commodity_id = objChangeVendorRequest.COMMODITY_ID;
    parameters.in_vendor_type_id = objChangeVendorRequest.VENDOR_TYPE_ID;
    parameters.in_vendor_id = objChangeVendorRequest.VENDOR_ID;
    parameters.in_created_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalar(INS_CHANGE_VENDOR_REQUEST, parameters, 'out_result'); 
}

//Insert change vendor request manually
function insertChangeRequestManual(objChangeVendorRequest, userId) {
    var parameters = {};
    parameters.in_user_id = userId;
    parameters.in_entity_id = objChangeVendorRequest.ENTITY_ID;
    parameters.in_commodity_id = objChangeVendorRequest.COMMODITY_ID;
    parameters.in_vendor_type_id = objChangeVendorRequest.VENDOR_TYPE_ID;
    parameters.in_vendor_id = objChangeVendorRequest.VENDOR_ID;
    parameters.in_created_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalarManual(INS_CHANGE_VENDOR_REQUEST, parameters, 'out_result');
}

//Get all change vendor request
function getAllChangeVendorRequest() {
    var parameters = {};
    var result = db.executeProcedure(GET_ALL_CHANGE_VENDOR_REQUEST, parameters);
    return db.extractArray(result.out_result);
}

//Get by id
function getChangeVendorRequestById(changeVendorRequestId) {
    var parameters = {'in_change_vendor_request_id': changeVendorRequestId};
    var result = db.executeProcedure(GET_CHANGE_VENDOR_REQUEST_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
    	   return list[0];
    } else {
    	   return {};
    }
}

//Get change vendor request by id manually
function getChangeVendorRequestByIdManual(changeVendorRequestId) {
    var parameters = {'in_change_vendor_request_id': changeVendorRequestId};
    var result = db.executeProcedureManual(GET_CHANGE_VENDOR_REQUEST_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
    	   return list[0];
    } else {
    	   return {};
    }
}

//Delete Change Vendor Request
function deleteChangeVendorRequest(objChangeVendorRequest, userId) {
    var parameters = {};
    parameters.in_change_vendor_request_id = objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID;
    parameters.in_modified_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalar(DEL_CHANGE_VENDOR_REQUEST, parameters, 'out_result');
}

//Delete Change Vendor Request
function deleteChangeVendorRequest(objChangeVendorRequest, userId) {
    var parameters = {};
    parameters.in_change_vendor_request_id = objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID;
    parameters.in_modified_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalar(DEL_CHANGE_VENDOR_REQUEST, parameters, 'out_result');
}

//Update
function updateChangeVendorRequest(objChangeVendorRequest, userId) {
    var parameters = {};
    parameters.in_change_vendor_request_id = objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID;
    parameters.in_user_id = userId;
    parameters.in_entity_id = objChangeVendorRequest.ENTITY_ID;
    parameters.in_commodity_id = objChangeVendorRequest.COMMODITY_ID;
    parameters.in_vendor_id = objChangeVendorRequest.VENDOR_ID;
    parameters.in_modified_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalar(UPD_CHANGE_VENDOR_REQUEST, parameters, 'out_result');
}