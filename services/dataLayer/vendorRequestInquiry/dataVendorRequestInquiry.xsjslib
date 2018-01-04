$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_ALL_VENDOR_REQUEST_INQUIRY = "GET_ALL_VENDOR_REQUEST_INQUIRY";
var GET_EXTEND_VENDOR_REQUEST_LAST_ID = "GET_EXTEND_VENDOR_REQUEST_LAST_ID";
var GET_CHANGE_VENDOR_REQUEST_LAST_ID = "GET_CHANGE_VENDOR_REQUEST_LAST_ID";
var GET_VENDOR_REQUEST_LAST_ID = "GET_VENDOR_REQUEST_LAST_ID";
var GET_VENDOR_INQUIRY_LAST_ID = "GET_VENDOR_INQUIRY_LAST_ID";

//Get all vendor request and vendor request inquiry
function getAllVendorRequestInquiry(permissionData, userId) {
    var parameters = {'in_user_id': userId};
    parameters.in_permission_id = permissionData.PERMISSION_ID;
    parameters.in_resource_id = permissionData.RESOURCE_ID;
    var result = db.executeProcedure(GET_ALL_VENDOR_REQUEST_INQUIRY, parameters);
    return db.extractArray(result.out_result);
}

//Get last extend vendor request id
function getExtendVendorRequestLastId() {
    var parameters = {};
    var result = db.executeProcedure(GET_EXTEND_VENDOR_REQUEST_LAST_ID, parameters);
    return db.extractArray(result.out_result)[0];
}

//Get last change vendor request id
function getChangeVendorRequestLastId() {
    var parameters = {};
    var result = db.executeProcedure(GET_CHANGE_VENDOR_REQUEST_LAST_ID, parameters);
    return db.extractArray(result.out_result)[0];
}

//Get last vendor request id
function getVendorRequestLastId() {
    var parameters = {};
    var result = db.executeProcedure(GET_VENDOR_REQUEST_LAST_ID, parameters);
    return db.extractArray(result.out_result)[0];
}

//Get last  vendor inquiry id
function getVendorInquiryLastId() {
    var parameters = {};
    var result = db.executeProcedure(GET_VENDOR_INQUIRY_LAST_ID, parameters);
    return db.extractArray(result.out_result)[0];
}