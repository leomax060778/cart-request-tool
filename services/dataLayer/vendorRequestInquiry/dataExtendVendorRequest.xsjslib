$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var INS_EXTEND_VENDOR_REQUEST = "INS_EXTEND_VENDOR_REQUEST";
var GET_ALL_EXTEND_VENDOR_REQUEST = "GET_ALL_EXTEND_VENDOR_REQUEST";
var GET_EXTEND_VENDOR_REQUEST_BY_ID = "GET_EXTEND_VENDOR_REQUEST_BY_ID";
var DEL_EXTEND_VENDOR_REQUEST = "DEL_EXTEND_VENDOR_REQUEST";
var UPD_EXTEND_VENDOR_REQUEST = "UPD_EXTEND_VENDOR_REQUEST";

//Insert extend vendor request
function insertExtendVendorRequest(objExtendVendorRequest, userId) {
    var parameters = {};
    parameters.in_user_id = userId;
    parameters.in_entity_id = objExtendVendorRequest.ENTITY_ID;
    parameters.in_commodity_id = objExtendVendorRequest.COMMODITY_ID;
    parameters.in_service_supplier = objExtendVendorRequest.SERVICE_SUPPLIER;
    parameters.in_vendor_type_id = objExtendVendorRequest.VENDOR_TYPE_ID;
    parameters.in_purchase_amount = objExtendVendorRequest.PURCHASE_AMOUNT;
    parameters.in_expected_amount = objExtendVendorRequest.EXPECTED_AMOUNT || null;
    parameters.in_purchase_currency_id = objExtendVendorRequest.PURCHASE_CURRENCY_ID;
    parameters.in_expected_currency_id = objExtendVendorRequest.EXPECTED_CURRENCY_ID || null;
    parameters.in_additional_information = objExtendVendorRequest.ADDITIONAL_INFORMATION || null;
    parameters.in_created_user_id = userId;
    parameters.in_vendor_id = objExtendVendorRequest.VENDOR_ID;
    parameters.out_result = '?';
    return db.executeScalar(INS_EXTEND_VENDOR_REQUEST, parameters, 'out_result');
}

//Insert extend vendor request manually
function insertExtendVendorRequestManual(objExtendVendorRequest, userId) {
    var parameters = {};
    parameters.in_user_id = userId;
    parameters.in_entity_id = objExtendVendorRequest.ENTITY_ID;
    parameters.in_commodity_id = objExtendVendorRequest.COMMODITY_ID;
    parameters.in_service_supplier = objExtendVendorRequest.SERVICE_SUPPLIER;
    parameters.in_vendor_type_id = objExtendVendorRequest.VENDOR_TYPE_ID;
    parameters.in_purchase_amount = objExtendVendorRequest.PURCHASE_AMOUNT;
    parameters.in_expected_amount = objExtendVendorRequest.EXPECTED_AMOUNT || null;
    parameters.in_purchase_currency_id = objExtendVendorRequest.PURCHASE_CURRENCY_ID;
    parameters.in_expected_currency_id = objExtendVendorRequest.EXPECTED_CURRENCY_ID || null;
    parameters.in_additional_information = objExtendVendorRequest.ADDITIONAL_INFORMATION || null;
    parameters.in_created_user_id = userId;
    parameters.in_vendor_id = objExtendVendorRequest.VENDOR_ID;
    parameters.out_result = '?';
    return db.executeScalarManual(INS_EXTEND_VENDOR_REQUEST, parameters, 'out_result');
}

//Get extend vendor request
function getAllExtendVendorRequest() {
    var parameters = {};
    var result = db.executeProcedure(GET_ALL_EXTEND_VENDOR_REQUEST, parameters);
    return db.extractArray(result.out_result);
}

//Get by ID
function getExtendVendorRequestById(extendVendorRequestId) {
    var parameters = {'in_extend_vendor_request_id': extendVendorRequestId};
    var result = db.executeProcedure(GET_EXTEND_VENDOR_REQUEST_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
    	   return list[0];
    } else {
    	   return {};
    }
}

//Get extend vendor request by ID manually
function getExtendVendorRequestByIdManual(extendVendorRequestId) {
    var parameters = {'in_extend_vendor_request_id': extendVendorRequestId};
    var result = db.executeProcedureManual(GET_EXTEND_VENDOR_REQUEST_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
    	   return list[0];
    } else {
    	   return {};
    }
}

//Delete Extend Vendor Request
function deleteExtendVendorRequest(objExtendVendorRequest, userId) {
    var parameters = {};
    parameters.in_extend_vendor_request_id = objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID;
    parameters.in_modified_user_id = userId;//objExtendVendorRequest.MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(DEL_EXTEND_VENDOR_REQUEST, parameters, 'out_result');
}

//Update
function updateExtendVendorRequest(objExtendVendorRequest, userId) {
    var parameters = {};
    parameters.in_extend_vendor_request_id = objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID;
    parameters.in_user_id = userId;
    parameters.in_entity_id = objExtendVendorRequest.ENTITY_ID;
    parameters.in_commodity_id = objExtendVendorRequest.COMMODITY_ID;
    parameters.in_service_supplier = objExtendVendorRequest.SERVICE_SUPPLIER;
    parameters.in_purchase_amount = objExtendVendorRequest.PURCHASE_AMOUNT;
    parameters.in_expected_amount = objExtendVendorRequest.EXPECTED_AMOUNT || null;
    parameters.in_purchase_currency_id = objExtendVendorRequest.PURCHASE_CURRENCY_ID;
    parameters.in_expected_currency_id = objExtendVendorRequest.EXPECTED_CURRENCY_ID || null;
    parameters.in_additional_information = objExtendVendorRequest.ADDITIONAL_INFORMATION || null;
    parameters.in_modified_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalar(UPD_EXTEND_VENDOR_REQUEST, parameters, 'out_result');
}