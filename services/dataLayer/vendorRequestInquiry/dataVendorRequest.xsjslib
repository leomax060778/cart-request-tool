$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var INS_VENDOR_REQUEST = "INS_VENDOR_REQUEST";
var DEL_VENDOR_REQUEST = "DEL_VENDOR_REQUEST";
var GET_ALL_VENDOR_REQUEST = "GET_ALL_VENDOR_REQUEST";
var GET_VENDOR_REQUEST_BY_ID = "GET_VENDOR_REQUEST_BY_ID";
var UPD_VENDOR_REQUEST = "UPD_VENDOR_REQUEST";

//Insert vendor request
function insertVendorRequest(objVendorRequest, userId) {
    var parameters = {};
    parameters.in_user_id = userId;
    parameters.in_country_id = objVendorRequest.COUNTRY_ID;
    parameters.in_entity_id = objVendorRequest.ENTITY_ID;
    parameters.in_commodity_id = objVendorRequest.COMMODITY_ID;
    parameters.in_not_used_sap_supplier = objVendorRequest.NOT_USED_SAP_SUPPLIER || null;
    parameters.in_service_supplier = objVendorRequest.SERVICE_SUPPLIER;
    parameters.in_vendor_type_id = objVendorRequest.VENDOR_TYPE_ID;
    parameters.in_purchase_amount = objVendorRequest.PURCHASE_AMOUNT;
    parameters.in_expected_amount = objVendorRequest.EXPECTED_AMOUNT || null;
    parameters.in_purchase_currency_id = objVendorRequest.PURCHASE_CURRENCY_ID;
    parameters.in_expected_currency_id = objVendorRequest.EXPECTED_CURRENCY_ID || null;
    parameters.in_accept_american_express = objVendorRequest.ACCEPT_AMERICAN_EXPRESS;
    parameters.in_cost_center_owner = objVendorRequest.COST_CENTER_OWNER;
    parameters.in_additional_information = objVendorRequest.ADDITIONAL_INFORMATION || null;
    parameters.in_created_user_id = userId;
    parameters.in_vendor_id = objVendorRequest.VENDOR_ID;
    parameters.out_result = '?';
    return db.executeScalar(INS_VENDOR_REQUEST, parameters, 'out_result');
}

//Insert vendor request manually
function insertVendorRequestManual(objVendorRequest, userId) {
    var parameters = {};
    parameters.in_user_id = userId;
    parameters.in_country_id = objVendorRequest.COUNTRY_ID;
    parameters.in_entity_id = objVendorRequest.ENTITY_ID;
    parameters.in_commodity_id = objVendorRequest.COMMODITY_ID;
    parameters.in_not_used_sap_supplier = objVendorRequest.NOT_USED_SAP_SUPPLIER || null;
    parameters.in_service_supplier = objVendorRequest.SERVICE_SUPPLIER;
    parameters.in_vendor_type_id = objVendorRequest.VENDOR_TYPE_ID;
    parameters.in_purchase_amount = objVendorRequest.PURCHASE_AMOUNT;
    parameters.in_expected_amount = objVendorRequest.EXPECTED_AMOUNT || null;
    parameters.in_purchase_currency_id = objVendorRequest.PURCHASE_CURRENCY_ID;
    parameters.in_expected_currency_id = objVendorRequest.EXPECTED_CURRENCY_ID || null;
    parameters.in_accept_american_express = objVendorRequest.ACCEPT_AMERICAN_EXPRESS;
    parameters.in_cost_center_owner = objVendorRequest.COST_CENTER_OWNER;
    parameters.in_additional_information = objVendorRequest.ADDITIONAL_INFORMATION || null;
    parameters.in_created_user_id = userId;
    parameters.in_vendor_id = objVendorRequest.VENDOR_ID;
    parameters.out_result = '?';
    return db.executeScalarManual(INS_VENDOR_REQUEST, parameters, 'out_result');
}

//Delete vendor request
function deleteVendorRequest(objVendorRequest, userId) {
    var parameters = {};
    parameters.in_vendor_request_id = objVendorRequest.VENDOR_REQUEST_ID;
    parameters.in_modified_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalar(DEL_VENDOR_REQUEST, parameters, 'out_result');
}

//Get all vendor request
function getAllVendorRequest() {
    var parameters = {};
    var result = db.executeProcedure(GET_ALL_VENDOR_REQUEST, parameters);
    return db.extractArray(result.out_result);
}

//Get by id
function getVendorRequestById(vendorRequestId) {
    var parameters = {'in_vendor_request_id': vendorRequestId};
    var result = db.executeProcedure(GET_VENDOR_REQUEST_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
    	   return list[0];
    } else {
    	   return {};
    }
}

//Get vendor request by id manually
function getVendorRequestByIdManual(vendorRequestId) {
    var parameters = {'in_vendor_request_id': vendorRequestId};
    var result = db.executeProcedureManual(GET_VENDOR_REQUEST_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
    	   return list[0];
    } else {
    	   return {};
    }
}

//Update
function updateVendorRequest(objVendorRequest, userId) {
    var parameters = {};
    parameters.in_vendor_request_id = objVendorRequest.VENDOR_REQUEST_ID;
    parameters.in_user_id = userId;
    parameters.in_country_id = objVendorRequest.COUNTRY_ID;
    parameters.in_entity_id = objVendorRequest.ENTITY_ID;
    parameters.in_commodity_id = objVendorRequest.COMMODITY_ID;
    parameters.in_not_used_sap_supplier = objVendorRequest.NOT_USED_SAP_SUPPLIER || null;
    parameters.in_service_supplier = objVendorRequest.SERVICE_SUPPLIER;
    parameters.in_purchase_amount = objVendorRequest.PURCHASE_AMOUNT;
    parameters.in_expected_amount = objVendorRequest.EXPECTED_AMOUNT || null;
    parameters.in_purchase_currency_id = objVendorRequest.PURCHASE_CURRENCY_ID;
    parameters.in_expected_currency_id = objVendorRequest.EXPECTED_CURRENCY_ID || null;
    parameters.in_accept_american_express = objVendorRequest.ACCEPT_AMERICAN_EXPRESS;
    parameters.in_cost_center_owner = objVendorRequest.COST_CENTER_OWNER;
    parameters.in_additional_information = objVendorRequest.ADDITIONAL_INFORMATION || null;
    parameters.in_modified_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalar(UPD_VENDOR_REQUEST, parameters, 'out_result');
}