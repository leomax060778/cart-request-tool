$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURES LIST NAME
var INS_VENDOR_INQUIRY_MESSAGE = "INS_VENDOR_INQUIRY_MESSAGE";
var INS_VENDOR_REQUEST_MESSAGE = "INS_VENDOR_REQUEST_MESSAGE";
var INS_EXTEND_VENDOR_REQUEST_MESSAGE = "INS_EXTEND_VENDOR_REQUEST_MESSAGE";
var INS_CHANGE_VENDOR_REQUEST_MESSAGE = "INS_CHANGE_VENDOR_REQUEST_MESSAGE";
var INS_INQUIRY_MESSAGE = "INS_INQUIRY_MESSAGE";
var INS_REQUEST_MESSAGE = "INS_REQUEST_MESSAGE";
var GET_VENDOR_INQUIRY_MESSAGE = "GET_VENDOR_INQUIRY_MESSAGE_BY_VENDOR_INQUIRY_ID";
var GET_VENDOR_REQUEST_MESSAGE = "GET_VENDOR_REQUEST_MESSAGE_BY_VENDOR_REQUEST_ID";
var GET_EXTEND_VENDOR_REQUEST_MESSAGE = "GET_EXTEND_VENDOR_REQUEST_MESSAGE_BY_EXTEND_VENDOR_ID";
var GET_CHANGE_VENDOR_REQUEST_MESSAGE = "GET_CHANGE_VENDOR_REQUEST_MESSAGE_BY_CHANGE_VENDOR_ID";
var GET_INQUIRY_MESSAGE = "GET_INQUIRY_MESSAGE_BY_INQUIRY_ID";
var GET_REQUEST_MESSAGE_BY_REQUEST_ID = "GET_REQUEST_MESSAGE_BY_REQUEST_ID";

//Insert Vendor inquiry message
function insertVendorInquiryMessage(objVendorInquiry, userId) {
    var parameters = {};
    parameters.in_vendor_inquiry_id = objVendorInquiry.VENDOR_INQUIRY_ID;
    parameters.in_message_content = objVendorInquiry.MESSAGE_CONTENT;
    parameters.in_return_type_id = objVendorInquiry.RETURN_TYPE_ID;
    parameters.in_issue_type_id = objVendorInquiry.ISSUE_TYPE_ID;
    parameters.in_user_id = userId;//objVendorInquiry.USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(INS_VENDOR_INQUIRY_MESSAGE, parameters, 'out_result');
}

//Insert vendor Request message
function insertVendorRequestMessage(objVendorRequest, userId) {
    var parameters = {};
    parameters.in_vendor_request_id = objVendorRequest.VENDOR_REQUEST_ID;
    parameters.in_message_content = objVendorRequest.MESSAGE_CONTENT;
    parameters.in_return_type_id = objVendorRequest.RETURN_TYPE_ID;
    parameters.in_issue_type_id = objVendorRequest.ISSUE_TYPE_ID;
    parameters.in_created_user_id = userId;//objVendorRequest.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(INS_VENDOR_REQUEST_MESSAGE, parameters, 'out_result');
}

//Insert extend vendor request message
function insertExtendVendorRequestMessage(objExtendVendorRequest, userId) {
    var parameters = {};
    parameters.in_extend_vendor_request_id = objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID;
    parameters.in_message_content = objExtendVendorRequest.MESSAGE_CONTENT;
    parameters.in_return_type_id = objExtendVendorRequest.RETURN_TYPE_ID;
    parameters.in_issue_type_id = objExtendVendorRequest.ISSUE_TYPE_ID;
    parameters.in_created_user_id = userId;//objExtendVendorRequest.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(INS_EXTEND_VENDOR_REQUEST_MESSAGE, parameters, 'out_result');
}

//Insert change vendor request message
function insertChangeVendorRequestMessage(objChangeVendorRequest, userId) {
    var parameters = {};
    parameters.in_change_vendor_request_id = objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID;
    parameters.in_message_content = objChangeVendorRequest.MESSAGE_CONTENT;
    parameters.in_return_type_id = objChangeVendorRequest.RETURN_TYPE_ID;
    parameters.in_issue_type_id = objChangeVendorRequest.ISSUE_TYPE_ID;
    parameters.in_created_user_id = userId;//objChangeVendorRequest.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(INS_CHANGE_VENDOR_REQUEST_MESSAGE, parameters, 'out_result');
}

//Insert Inquiry message
function insertInquiryMessage(objInquiry, userId) {
    var parameters = {};
    parameters.in_user_id = userId;//objInquiry.USER_ID;
    parameters.in_inquiry_id = objInquiry.INQUIRY_ID;
    parameters.in_message_content = objInquiry.MESSAGE_CONTENT;
    parameters.in_return_type_id = objInquiry.RETURN_TYPE_ID;
    parameters.in_created_user_id = userId;//objInquiry.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(INS_INQUIRY_MESSAGE, parameters, 'out_result');
}

//Insert Request message
function insertRequestMessage(objRequest, userId) {
    var parameters = {};
    parameters.in_user_id = userId;//objRequest.USER_ID;
    parameters.in_request_id = objRequest.REQUEST_ID;
    parameters.in_message_content = objRequest.MESSAGE_CONTENT;
    parameters.in_return_type_id = objRequest.RETURN_TYPE_ID;
    parameters.in_issue_type_id = objRequest.ISSUE_TYPE_ID;
    parameters.in_other_issue_type = objRequest.OTHER_ISSUE_TYPE || null;
    parameters.in_created_user_id = userId;//objRequest.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(INS_REQUEST_MESSAGE, parameters, 'out_result');
}

//Get message of Vendor inquiry
function getVendorInquiryMessage(vendorInquiryId) {
    var parameters = {'in_vendor_inquiry_id': vendorInquiryId};
    var result = db.executeProcedure(GET_VENDOR_INQUIRY_MESSAGE, parameters);
    return db.extractArray(result.out_result);
}

//Get messages of vendor request
function getVendorRequestMessage(vendorRequestId) {
    var parameters = {'in_vendor_request_id': vendorRequestId};
    var result = db.executeProcedure(GET_VENDOR_REQUEST_MESSAGE, parameters);
    return db.extractArray(result.out_result);
}

//Get message of Extend Vendor Request
function getExtendVendorRequestMessage(extendVendorRequestId) {
    var parameters = {'in_extend_vendor_request_id': extendVendorRequestId};
    var result = db.executeProcedure(GET_EXTEND_VENDOR_REQUEST_MESSAGE, parameters);
    return db.extractArray(result.out_result);
}

//Get message of Change Vendor Request
function getChangeVendorRequestMessage(changeVendorRequestId) {
    var parameters = {'in_change_vendor_request_id': changeVendorRequestId};
    var result = db.executeProcedure(GET_CHANGE_VENDOR_REQUEST_MESSAGE, parameters);
    return db.extractArray(result.out_result);
}

//Get message of Inquiry
function getInquiryMessage(inquiryId) {
    var parameters = {'in_inquiry_id': inquiryId};
    var result = db.executeProcedure(GET_INQUIRY_MESSAGE, parameters);
    return db.extractArray(result.out_result);
}

//Get message of Request
function getRequestMessage(requestId) {
    var parameters = {'in_request_id': requestId};
    var result = db.executeProcedure(GET_REQUEST_MESSAGE_BY_REQUEST_ID, parameters);
    return db.extractArray(result.out_result);
}