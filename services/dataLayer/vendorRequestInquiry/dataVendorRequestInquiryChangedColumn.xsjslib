$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
//NEW VENDOR REQUEST
var GET_NV_CHANGED_COLUMN_BY_NV_ID = "GET_VENDOR_REQUEST_CHANGED_COLUMNS_BY_VENDOR_REQUEST_ID";
var DEL_VENDOR_REQUEST_CHANGED_COLUMN = "DEL_VENDOR_REQUEST_CHANGED_COLUMN";
var INS_VENDOR_REQUEST_CHANGED_COLUMN = "INS_VENDOR_REQUEST_CHANGED_COLUMN";
//VENDOR INQUIRY
var GET_VI_CHANGED_COLUMN_BY_VI_ID = "GET_VENDOR_INQUIRY_CHANGED_COLUMNS_BY_VENDOR_INQUIRY_ID";
var DEL_VENDOR_INQUIRY_CHANGED_COLUMN = "DEL_VENDOR_INQUIRY_CHANGED_COLUMN";
var INS_VENDOR_INQUIRY_CHANGED_COLUMN = "INS_VENDOR_INQUIRY_CHANGED_COLUMN";
//CHANGE VENDOR REQUEST
var GET_CV_CHANGED_COLUMN_BY_CV_ID = "GET_CHANGE_VENDOR_REQUEST_CHANGED_COLUMNS_BY_CHANGE_VENDOR_REQUEST_ID";
var DEL_CHANGE_VENDOR_REQUEST_CHANGED_COLUMN = "DEL_CHANGE_VENDOR_REQUEST_CHANGED_COLUMN";
var INS_CHANGE_VENDOR_REQUEST_CHANGED_COLUMN = "INS_CHANGE_VENDOR_REQUEST_CHANGED_COLUMN";
//EXTEND VENDOR REQUEST
var GET_EV_CHANGED_COLUMN_BY_EV_ID = "GET_EXTEND_VENDOR_REQUEST_CHANGED_COLUMNS_BY_EXTEND_VENDOR_REQUEST_ID";
var DEL_EXTEND_VENDOR_REQUEST_CHANGED_COLUMN = "DEL_EXTEND_VENDOR_REQUEST_CHANGED_COLUMN";
var INS_EXTEND_VENDOR_REQUEST_CHANGED_COLUMN = "INS_EXTEND_VENDOR_REQUEST_CHANGED_COLUMN";

/** NEW VENDOR REQUEST */

function getVendorRequestChangedColumnsByVendorRequestId(vendorRequestId) {
    var parameters = {};
    parameters.in_vendor_request_id = vendorRequestId;
    var result = db.executeProcedure(GET_NV_CHANGED_COLUMN_BY_NV_ID, parameters);
    return db.extractArray(result.out_result);
}

function insertVendorRequestChangedColumn(colVendorRequest, vendorRequestId, userId) {
    var parameters = {};
    parameters.in_vendor_request_id = vendorRequestId;
    parameters.in_field_collection = colVendorRequest;
    parameters.in_created_user_id = userId;
    return db.executeScalarManual(INS_VENDOR_REQUEST_CHANGED_COLUMN, parameters, "out_result");
}

function deleteVendorRequestChangedColumn(vendorRequestId) {
    var parameters = {};
    parameters.in_vendor_request_id = vendorRequestId;
    return db.executeScalarManual(DEL_VENDOR_REQUEST_CHANGED_COLUMN, parameters, "out_result");
}

/** VENDOR INQUIRY */

function getVendorInquiryChangedColumnsByVendorInquiryId(vendorInquiryId) {
    var parameters = {};
    parameters.in_vendor_inquiry_id = vendorInquiryId;
    var result = db.executeProcedure(GET_VI_CHANGED_COLUMN_BY_VI_ID, parameters);
    return db.extractArray(result.out_result);
}

function insertVendorInquiryChangedColumn(colVendorInquiry, vendorInquiryId, userId) {
    var parameters = {};
    parameters.in_vendor_inquiry_id = vendorInquiryId;
    parameters.in_field_collection = colVendorInquiry;
    parameters.in_created_user_id = userId;
    return db.executeScalarManual(INS_VENDOR_INQUIRY_CHANGED_COLUMN, parameters, "out_result");
}

function deleteVendorInquiryChangedColumn(vendorInquiryId) {
    var parameters = {};
    parameters.in_vendor_inquiry_id = vendorInquiryId;
    return db.executeScalarManual(DEL_VENDOR_INQUIRY_CHANGED_COLUMN, parameters, "out_result");
}

/** CHANGE VENDOR REQUEST */

function getChangeVendorRequestChangedColumnsByChangeVendorRequestId(changeVendorRequestId) {
    var parameters = {};
    parameters.in_change_vendor_request_id = changeVendorRequestId;
    var result = db.executeProcedure(GET_CV_CHANGED_COLUMN_BY_CV_ID, parameters);
    return db.extractArray(result.out_result);
}

function insertChangeVendorRequestChangedColumn(colChangeVendorRequest, changeVendorRequestId, userId) {
    var parameters = {};
    parameters.in_change_vendor_request_id = changeVendorRequestId;
    parameters.in_field_collection = colChangeVendorRequest;
    parameters.in_created_user_id = userId;
    return db.executeScalarManual(INS_CHANGE_VENDOR_REQUEST_CHANGED_COLUMN, parameters, "out_result");
}

function deleteChangeVendorRequestChangedColumn(changeVendorRequestId) {
    var parameters = {};
    parameters.in_change_vendor_request_id = changeVendorRequestId;
    return db.executeScalarManual(DEL_CHANGE_VENDOR_REQUEST_CHANGED_COLUMN, parameters, "out_result");
}

/** EXTEND VENDOR REQUEST */

function getExtendVendorRequestChangedColumnsByExtendVendorRequestId(extendVendorRequestId) {
    var parameters = {};
    parameters.in_extend_vendor_request_id = extendVendorRequestId;
    var result = db.executeProcedure(GET_EV_CHANGED_COLUMN_BY_EV_ID, parameters);
    return db.extractArray(result.out_result);
}

function insertExtendVendorRequestChangedColumn(colExtendVendorRequest, extendVendorRequestId, userId) {
    var parameters = {};
    parameters.in_extend_vendor_request_id = extendVendorRequestId;
    parameters.in_field_collection = colExtendVendorRequest;
    parameters.in_created_user_id = userId;
    return db.executeScalarManual(INS_EXTEND_VENDOR_REQUEST_CHANGED_COLUMN, parameters, "out_result");
}

function deleteExtendVendorRequestChangedColumn(extendVendorRequestId) {
    var parameters = {};
    parameters.in_extend_vendor_request_id = extendVendorRequestId;
    return db.executeScalarManual(DEL_EXTEND_VENDOR_REQUEST_CHANGED_COLUMN, parameters, "out_result");
}