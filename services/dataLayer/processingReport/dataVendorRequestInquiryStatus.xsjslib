$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_VENDOR_REQUEST_INQUIRY_BY_STATUS = "GET_VENDOR_REQUEST_INQUIRY_BY_STATUS";
var GET_VENDOR_REQUEST_INQUIRY_BY_STATUS_ADMINISTRABLE = "GET_VENDOR_REQUEST_INQUIRY_BY_STATUS_ADMINISTRABLE";
var GET_CHANGE_VENDOR_REQUEST_BY_STATUS = "GET_CHANGE_VENDOR_REQUEST_BY_STATUS";
var GET_CHANGE_VENDOR_REQUEST_PROCESSING_REPORT_BY_ID = "GET_CHANGE_VENDOR_REQUEST_PROCESSING_REPORT_BY_ID";
var GET_EXTEND_VENDOR_REQUEST_BY_STATUS = "GET_EXTEND_VENDOR_REQUEST_BY_STATUS";
var GET_EXTEND_VENDOR_REQUEST_PROCESSING_REPORT_BY_ID = "GET_EXTEND_VENDOR_REQUEST_PROCESSING_REPORT_BY_ID";
var GET_VENDOR_REQUEST_BY_STATUS = "GET_VENDOR_REQUEST_BY_STATUS";
var GET_VENDOR_REQUEST_PROCESSING_REPORT_BY_ID = "GET_VENDOR_REQUEST_PROCESSING_REPORT_BY_ID";
var GET_VENDOR_INQUIRY_BY_STATUS = "GET_VENDOR_INQUIRY_BY_STATUS";
var GET_VENDOR_INQUIRY_PROCESSING_REPORT_BY_ID = "GET_VENDOR_INQUIRY_PROCESSING_REPORT_BY_ID";
var UPD_VENDOR_INQUIRY_STATUS = "UPD_VENDOR_INQUIRY_STATUS";
var UPD_CHANGE_VENDOR_REQUEST_STATUS = "UPD_CHANGE_VENDOR_REQUEST_STATUS";
var UPD_EXTEND_VENDOR_REQUEST_STATUS = "UPD_EXTEND_VENDOR_REQUEST_STATUS";
var UPD_VENDOR_REQUEST_STATUS = "UPD_VENDOR_REQUEST_STATUS";
var UPD_CHANGE_VENDOR_REQUEST_STATUS_COMPLETED = "UPD_CHANGE_VENDOR_REQUEST_STATUS_COMPLETED";
var UPD_EXTEND_VENDOR_REQUEST_STATUS_COMPLETED = "UPD_EXTEND_VENDOR_REQUEST_STATUS_COMPLETED";
var UPD_VENDOR_REQUEST_STATUS_COMPLETED = "UPD_VENDOR_REQUEST_STATUS_COMPLETED";


/** ***********GET*************** */
//Get vendor request and vendor inquiries by status
function getVendorRequestInquiryByStatus(statusId) {
    var parameters = {};
    parameters.in_status_id = statusId;
    var result = db.executeProcedure(GET_VENDOR_REQUEST_INQUIRY_BY_STATUS, parameters);
    return db.extractArray(result.out_result);
}

//Get vendor request and vendor inquiries by status administrable
function getVendorRequestInquiryByStatusAdministrable(isAdministrable, userId) {
    var parameters = {};
    parameters.in_administrable = isAdministrable;
    parameters.in_user_id = userId;
    var result = db.executeProcedure(GET_VENDOR_REQUEST_INQUIRY_BY_STATUS_ADMINISTRABLE, parameters);
    return db.extractArray(result.out_result);
}

//Get vendor inquiry by status
function getVendorInquiryByStatus(statusId) {
    var parameters = {};
    parameters.in_status_id = statusId;
    var result = db.executeProcedure(GET_VENDOR_INQUIRY_BY_STATUS, parameters);
    return db.extractArray(result.out_result);
}

//Get vendor inquiry by id
function getVendorInquiryById(inquiryId) {
    var parameters = {};
    parameters.in_vendor_inquiry_id = inquiryId;
    var result = db.executeProcedure(GET_VENDOR_INQUIRY_PROCESSING_REPORT_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

function getVendorInquiryByIdManual(inquiryId) {
    var parameters = {};
    parameters.in_vendor_inquiry_id = inquiryId;
    var result = db.executeProcedureManual(GET_VENDOR_INQUIRY_PROCESSING_REPORT_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

//Get change vendor request by status
function getChangeVendorRequestByStatus(statusId) {
    var parameters = {};
    parameters.in_status_id = statusId;
    var result = db.executeProcedure(GET_CHANGE_VENDOR_REQUEST_BY_STATUS, parameters);
    return db.extractArray(result.out_result);
}

//Get change vendor request by id
function getChangeVendorRequestById(changeId) {
    var parameters = {};
    parameters.in_change_vendor_request_id = changeId;
    var result = db.executeProcedure(GET_CHANGE_VENDOR_REQUEST_PROCESSING_REPORT_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

//Get change vendor request by id Manually
function getChangeVendorRequestByIdManual(changeId) {
    var parameters = {};
    parameters.in_change_vendor_request_id = changeId;
    var result = db.executeProcedureManual(GET_CHANGE_VENDOR_REQUEST_PROCESSING_REPORT_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

//Get extend vendor request by status
function getExtendVendorRequestByStatus(statusId) {
    var parameters = {};
    parameters.in_status_id = statusId;
    var result = db.executeProcedure(GET_EXTEND_VENDOR_REQUEST_BY_STATUS, parameters);
    return db.extractArray(result.out_result);
}

//Get extend vendor request by id
function getExtendVendorRequestById(extendId) {
    var parameters = {};
    parameters.in_extend_vendor_request_id = extendId;
    var result = db.executeProcedure(GET_EXTEND_VENDOR_REQUEST_PROCESSING_REPORT_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

//Get vendor request by status
function getVendorRequestByStatus(statusId) {
    var parameters = {};
    parameters.in_status_id = statusId;
    var result = db.executeProcedure(GET_VENDOR_REQUEST_BY_STATUS, parameters);
    return db.extractArray(result.out_result);
}

//Get vendor request by id
function getVendorRequestById(requestId) {
    var parameters = {};
    parameters.in_vendor_request_id = requestId;
    var result = db.executeProcedure(GET_VENDOR_REQUEST_PROCESSING_REPORT_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

/** ***********UPDATE*************** */
//Update vendor inquiry status
function updateVendorInquiryStatus(objVendorInquiry, userId) {
    var parameters = {};
    parameters.in_vendor_inquiry_id = objVendorInquiry.VENDOR_INQUIRY_ID;
    parameters.in_status_id = objVendorInquiry.STATUS_ID;
    parameters.in_modified_user_id = userId;//objVendorInquiry.MODIFIED_USER_ID;
    parameters.in_previous_status_id = objVendorInquiry.PREVIOUS_STATUS_ID;
    parameters.in_user_id_status = userId;//objVendorInquiry.USER_ID_STATUS;
    parameters.out_result = '?';
    return db.executeScalar(UPD_VENDOR_INQUIRY_STATUS, parameters, 'out_result');
}

//Update change vendor request status
function updateChangeVendorRequestStatus(objChangeVendorRequest, userId) {
    var parameters = {};
    parameters.in_change_vendor_request_id = objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID;
    parameters.in_status_id = objChangeVendorRequest.STATUS_ID;
    parameters.in_receiver_user_id = userId;//objChangeVendorRequest.RECEIVER_USER_ID;
    parameters.in_receiver_yvc_request = objChangeVendorRequest.RECEIVER_YVC_REQUEST || null;
    parameters.in_vendor_account = objChangeVendorRequest.VENDOR_ACCOUNT;
    parameters.in_modified_user_id = userId;//objChangeVendorRequest.MODIFIED_USER_ID;
    parameters.in_previous_status_id = objChangeVendorRequest.PREVIOUS_STATUS_ID;
    parameters.in_user_id_status = userId;//objChangeVendorRequest.USER_ID_STATUS;
    parameters.out_result = '?';
    return db.executeScalar(UPD_CHANGE_VENDOR_REQUEST_STATUS, parameters, 'out_result');
}

//Update extend vendor request status
function updateExtendVendorRequestStatus(objExtendVendorRequest, userId) {
    var parameters = {};
    parameters.in_extend_vendor_request_id = objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID;
    parameters.in_status_id = objExtendVendorRequest.STATUS_ID;
    parameters.in_receiver_user_id = userId;//objExtendVendorRequest.RECEIVER_USER_ID;
    parameters.in_receiver_yvc_request = objExtendVendorRequest.RECEIVER_YVC_REQUEST || null;
    parameters.in_modified_user_id = userId;//objExtendVendorRequest.MODIFIED_USER_ID;
    parameters.in_previous_status_id = objExtendVendorRequest.PREVIOUS_STATUS_ID;
    parameters.in_user_id_status = userId;//objExtendVendorRequest.USER_ID_STATUS;
    parameters.out_result = '?';
    return db.executeScalar(UPD_EXTEND_VENDOR_REQUEST_STATUS, parameters, 'out_result');
}

//Update vendor request status
function updateVendorRequestStatus(objVendorRequest, userId) {
    var parameters = {};
    parameters.in_vendor_request_id = objVendorRequest.VENDOR_REQUEST_ID;
    parameters.in_status_id = objVendorRequest.STATUS_ID;
    parameters.in_receiver_user_id = userId;//objVendorRequest.RECEIVER_USER_ID;
    parameters.in_receiver_yvc_request = objVendorRequest.RECEIVER_YVC_REQUEST || null;
    parameters.in_modified_user_id = userId;//objVendorRequest.MODIFIED_USER_ID;
    parameters.in_previous_status_id = objVendorRequest.PREVIOUS_STATUS_ID;
    parameters.in_user_id_status = userId;//objVendorRequest.USER_ID_STATUS;
    parameters.out_result = '?';
    return db.executeScalar(UPD_VENDOR_REQUEST_STATUS, parameters, 'out_result');
}

//Update change vendor request status completed
function updateChangeVendorRequestStatusCompleted(objChangeVendorRequest, userId) {
    var parameters = {};
    parameters.in_change_vendor_request_id = objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID;
    parameters.in_status_id = objChangeVendorRequest.STATUS_ID;
    parameters.in_receiver_user_id = userId;//objChangeVendorRequest.RECEIVER_USER_ID;
    parameters.in_receiver_yvc_request = objChangeVendorRequest.RECEIVER_YVC_REQUEST || null;
    parameters.in_vendor_account = objChangeVendorRequest.VENDOR_ACCOUNT;
    parameters.in_modified_user_id = userId;//objChangeVendorRequest.MODIFIED_USER_ID;
    parameters.in_previous_status_id = objChangeVendorRequest.PREVIOUS_STATUS_ID;
    parameters.in_user_id_status = userId;//objChangeVendorRequest.USER_ID_STATUS;
    parameters.out_result = '?';
    return db.executeScalar(UPD_CHANGE_VENDOR_REQUEST_STATUS_COMPLETED, parameters, 'out_result');
}

//Update extend vendor request status completed
function updateExtendVendorRequestStatusCompleted(objExtendVendorRequest, userId) {
    var parameters = {};
    parameters.in_extend_vendor_request_id = objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID;
    parameters.in_status_id = objExtendVendorRequest.STATUS_ID;
    parameters.in_receiver_user_id = userId;//objExtendVendorRequest.RECEIVER_USER_ID;
    parameters.in_receiver_yvc_request = objExtendVendorRequest.RECEIVER_YVC_REQUEST || null;
    parameters.in_modified_user_id = userId;//objExtendVendorRequest.MODIFIED_USER_ID;
    parameters.in_previous_status_id = objExtendVendorRequest.PREVIOUS_STATUS_ID;
    parameters.in_user_id_status = userId;//objExtendVendorRequest.USER_ID_STATUS;
    parameters.out_result = '?';
    return db.executeScalar(UPD_EXTEND_VENDOR_REQUEST_STATUS_COMPLETED, parameters, 'out_result');
}

//Update vendor request status completed
function updateVendorRequestStatusCompleted(objVendorRequest, userId) {
    var parameters = {};
    parameters.in_vendor_request_id = objVendorRequest.VENDOR_REQUEST_ID;
    parameters.in_status_id = objVendorRequest.STATUS_ID;
    parameters.in_receiver_user_id = userId;//objVendorRequest.RECEIVER_USER_ID;
    parameters.in_receiver_yvc_request = objVendorRequest.RECEIVER_YVC_REQUEST || null;
    parameters.in_modified_user_id = userId;//objVendorRequest.MODIFIED_USER_ID;
    parameters.in_previous_status_id = objVendorRequest.PREVIOUS_STATUS_ID;
    parameters.in_user_id_status = userId;//objVendorRequest.USER_ID_STATUS;
    parameters.out_result = '?';
    return db.executeScalar(UPD_VENDOR_REQUEST_STATUS_COMPLETED, parameters, 'out_result');
}

/** ***********UPDATE MANUAL*************** */
//Update vendor inquiry status manual
function updateVendorInquiryStatusManual(objVendorInquiry, userId) {
  var parameters = {};
  parameters.in_vendor_inquiry_id = objVendorInquiry.VENDOR_INQUIRY_ID;
  parameters.in_status_id = objVendorInquiry.STATUS_ID;
  parameters.in_modified_user_id = userId;//objVendorInquiry.MODIFIED_USER_ID;
  parameters.in_previous_status_id = objVendorInquiry.PREVIOUS_STATUS_ID;
  parameters.in_user_id_status = userId;//objVendorInquiry.USER_ID_STATUS;
  parameters.out_result = '?';
  return db.executeScalarManual(UPD_VENDOR_INQUIRY_STATUS, parameters, 'out_result');
}

//Update change vendor request status manual
function updateChangeVendorRequestStatusManual(objChangeVendorRequest, userId) {
  var parameters = {};
  parameters.in_change_vendor_request_id = objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID;
  parameters.in_status_id = objChangeVendorRequest.STATUS_ID;
  parameters.in_receiver_user_id = userId;//objChangeVendorRequest.RECEIVER_USER_ID;
  parameters.in_receiver_yvc_request = objChangeVendorRequest.RECEIVER_YVC_REQUEST || null;
  parameters.in_vendor_account = objChangeVendorRequest.VENDOR_ACCOUNT;
  parameters.in_modified_user_id = userId;//objChangeVendorRequest.MODIFIED_USER_ID;
  parameters.in_previous_status_id = objChangeVendorRequest.PREVIOUS_STATUS_ID;
  parameters.in_user_id_status = userId;//objChangeVendorRequest.USER_ID_STATUS;
  parameters.out_result = '?';
  return db.executeScalarManual(UPD_CHANGE_VENDOR_REQUEST_STATUS, parameters, 'out_result');
}

//Update extend vendor request status manual
function updateExtendVendorRequestStatusManual(objExtendVendorRequest, userId) {
  var parameters = {};

  parameters.in_extend_vendor_request_id = objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID;
  parameters.in_status_id = objExtendVendorRequest.STATUS_ID;
  parameters.in_receiver_user_id = userId;//objExtendVendorRequest.RECEIVER_USER_ID;
  parameters.in_receiver_yvc_request = objExtendVendorRequest.RECEIVER_YVC_REQUEST || null;
  parameters.in_modified_user_id = userId;//objExtendVendorRequest.MODIFIED_USER_ID;
  parameters.in_previous_status_id = objExtendVendorRequest.PREVIOUS_STATUS_ID;
  parameters.in_user_id_status = userId;//objExtendVendorRequest.USER_ID_STATUS;
  parameters.out_result = '?';
  return db.executeScalarManual(UPD_EXTEND_VENDOR_REQUEST_STATUS, parameters, 'out_result');
}

//Update vendor request status manual
function updateVendorRequestStatusManual(objVendorRequest, userId) {
  var parameters = {};
  parameters.in_vendor_request_id = objVendorRequest.VENDOR_REQUEST_ID;
  parameters.in_status_id = objVendorRequest.STATUS_ID;
  parameters.in_receiver_user_id = userId;//objVendorRequest.RECEIVER_USER_ID;
  parameters.in_receiver_yvc_request = objVendorRequest.RECEIVER_YVC_REQUEST || null;
  parameters.in_modified_user_id = userId;//objVendorRequest.MODIFIED_USER_ID;
  parameters.in_previous_status_id = objVendorRequest.PREVIOUS_STATUS_ID;
  parameters.in_user_id_status = userId;//objVendorRequest.USER_ID_STATUS;
  parameters.out_result = '?';
  return db.executeScalarManual(UPD_VENDOR_REQUEST_STATUS, parameters, 'out_result');
}

//Update change vendor request status completed
function updateChangeVendorRequestStatusCompletedManual(objChangeVendorRequest, userId) {
  var parameters = {};
  parameters.in_change_vendor_request_id = objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID;
  parameters.in_status_id = objChangeVendorRequest.STATUS_ID;
  parameters.in_receiver_user_id = userId;//objChangeVendorRequest.RECEIVER_USER_ID;
  parameters.in_receiver_yvc_request = objChangeVendorRequest.RECEIVER_YVC_REQUEST || null;
  parameters.in_vendor_account = objChangeVendorRequest.VENDOR_ACCOUNT;
  parameters.in_modified_user_id = userId;//objChangeVendorRequest.MODIFIED_USER_ID;
  parameters.in_previous_status_id = objChangeVendorRequest.PREVIOUS_STATUS_ID;
  parameters.in_user_id_status = userId;//objChangeVendorRequest.USER_ID_STATUS;
  parameters.out_result = '?';
  return db.executeScalarManual(UPD_CHANGE_VENDOR_REQUEST_STATUS_COMPLETED, parameters, 'out_result');
}

//Update extend vendor request status completed manual
function updateExtendVendorRequestStatusCompletedManual(objExtendVendorRequest, userId) {
  var parameters = {};
  parameters.in_extend_vendor_request_id = objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID;
  parameters.in_status_id = objExtendVendorRequest.STATUS_ID;
  parameters.in_receiver_user_id = userId;//objExtendVendorRequest.RECEIVER_USER_ID;
  parameters.in_receiver_yvc_request = objExtendVendorRequest.RECEIVER_YVC_REQUEST || null;
  parameters.in_modified_user_id = userId;//objExtendVendorRequest.MODIFIED_USER_ID;
  parameters.in_previous_status_id = objExtendVendorRequest.PREVIOUS_STATUS_ID;
  parameters.in_user_id_status = userId;//objExtendVendorRequest.USER_ID_STATUS;
  parameters.out_result = '?';
  return db.executeScalar(UPD_EXTEND_VENDOR_REQUEST_STATUS_COMPLETED, parameters, 'out_result');
}

//Update vendor request status completed manual
function updateVendorRequestStatusCompletedManual(objVendorRequest, userId) {
  var parameters = {};
  parameters.in_vendor_request_id = objVendorRequest.VENDOR_REQUEST_ID;
  parameters.in_status_id = objVendorRequest.STATUS_ID;
  parameters.in_receiver_user_id = userId;//objVendorRequest.RECEIVER_USER_ID;
  parameters.in_receiver_yvc_request = objVendorRequest.RECEIVER_YVC_REQUEST || null;
  parameters.in_modified_user_id = userId;//objVendorRequest.MODIFIED_USER_ID;
  parameters.in_previous_status_id = objVendorRequest.PREVIOUS_STATUS_ID;
  parameters.in_user_id_status = userId;//objVendorRequest.USER_ID_STATUS;
  parameters.out_result = '?';
  return db.executeScalarManual(UPD_VENDOR_REQUEST_STATUS_COMPLETED, parameters, 'out_result');
}