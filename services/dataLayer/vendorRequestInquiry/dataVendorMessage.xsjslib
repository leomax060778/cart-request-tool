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
var GET_VENDOR_INQUIRY_MESSAGE = "GET_VENDOR_INQUIRY_MESSAGE_BY_VENDOR_INQUIRY_ID";
var GET_VENDOR_REQUEST_MESSAGE = "GET_VENDOR_REQUEST_MESSAGE_BY_VENDOR_REQUEST_ID";
var GET_EXTEND_VENDOR_REQUEST_MESSAGE = "GET_EXTEND_VENDOR_REQUEST_MESSAGE_BY_EXTEND_VENDOR_ID";
var GET_CHANGE_VENDOR_REQUEST_MESSAGE = "GET_CHANGE_VENDOR_REQUEST_MESSAGE_BY_CHANGE_VENDOR_ID";
var UPD_VENDOR_INQUIRY_MESSAGE_READ = "UPD_VENDOR_INQUIRY_MESSAGE_READ";
var UPD_VENDOR_REQUEST_MESSAGE_READ = "UPD_VENDOR_REQUEST_MESSAGE_READ";
var UPD_EXTEND_VENDOR_REQUEST_MESSAGE_READ = "UPD_EXTEND_VENDOR_REQUEST_MESSAGE_READ";
var UPD_CHANGE_VENDOR_REQUEST_MESSAGE_READ = "UPD_CHANGE_VENDOR_REQUEST_MESSAGE_READ";


/** ***********INSERT*************** */
//Insert message in Vendor inquiry
function insertVendorInquiryMessage(objVendorInquiry, userId) {
    var parameters = {};
    parameters.in_vendor_inquiry_id = objVendorInquiry.VENDOR_INQUIRY_ID;
    parameters.in_message_content = objVendorInquiry.MESSAGE_CONTENT;
    parameters.in_return_type_id = 0;
    parameters.in_issue_type_id = 0;
    parameters.in_message_read = 0;
    parameters.in_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalar(INS_VENDOR_INQUIRY_MESSAGE, parameters, 'out_result');
}

//Insert vendor Request message
function insertVendorRequestMessage(objVendorRequest, userId) {
    var parameters = {};
    parameters.in_vendor_request_id = objVendorRequest.VENDOR_REQUEST_ID;
    parameters.in_message_content = objVendorRequest.MESSAGE_CONTENT;
    parameters.in_return_type_id = 0;
    parameters.in_issue_type_id = 0;
    parameters.in_message_read = 0;
    parameters.in_created_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalar(INS_VENDOR_REQUEST_MESSAGE, parameters, 'out_result');
}

//Insert message to extend vendor request
function insertExtendVendorRequestMessage(objExtendVendorRequest, userId) {
    var parameters = {};
    parameters.in_extend_vendor_request_id = objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID;
    parameters.in_message_content = objExtendVendorRequest.MESSAGE_CONTENT;
    parameters.in_return_type_id = 0;
    parameters.in_issue_type_id = 0;
    parameters.in_created_user_id = userId;
    parameters.in_message_read = 0;
    parameters.out_result = '?';
    return db.executeScalar(INS_EXTEND_VENDOR_REQUEST_MESSAGE, parameters, 'out_result');
}

//Insert message in change vendor request
function insertChangeVendorRequestMessage(objChangeVendorRequest, userId) {
    var parameters = {};
    parameters.in_change_vendor_request_id = objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID;
    parameters.in_message_content = objChangeVendorRequest.MESSAGE_CONTENT;
    parameters.in_return_type_id = 0;
    parameters.in_issue_type_id = 0;
    parameters.in_created_user_id = userId;
    parameters.in_message_read = 0;
    parameters.out_result = '?';
    return db.executeScalar(INS_CHANGE_VENDOR_REQUEST_MESSAGE, parameters, 'out_result');
}
/** ***********END INSERT*************** */

/** ***********INSERT MANUAL*************** */
//Insert message in Vendor inquiry manual
function insertVendorInquiryMessageManual(objVendorInquiry, userId) {
  var parameters = {};
  parameters.in_vendor_inquiry_id = objVendorInquiry.VENDOR_INQUIRY_ID;
  parameters.in_message_content = objVendorInquiry.MESSAGE_CONTENT;
  parameters.in_return_type_id = 0;
  parameters.in_issue_type_id = 0;
  parameters.in_message_read = 0;
  parameters.in_user_id = userId;
  parameters.out_result = '?';
  return db.executeScalarManual(INS_VENDOR_INQUIRY_MESSAGE, parameters, 'out_result');
}

//Insert vendor Request message manual
function insertVendorRequestMessageManual(objVendorRequest, userId) {
  var parameters = {};
  parameters.in_vendor_request_id = objVendorRequest.VENDOR_REQUEST_ID;
  parameters.in_message_content = objVendorRequest.MESSAGE_CONTENT;
  parameters.in_return_type_id = 0;
  parameters.in_issue_type_id = 0;
  parameters.in_message_read = 0;
  parameters.in_created_user_id = userId;
  parameters.out_result = '?';
  return db.executeScalarManual(INS_VENDOR_REQUEST_MESSAGE, parameters, 'out_result');
}

//Insert message to extend vendor request manual
function insertExtendVendorRequestMessageManual(objExtendVendorRequest, userId) {
  var parameters = {};
  parameters.in_extend_vendor_request_id = objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID;
  parameters.in_message_content = objExtendVendorRequest.MESSAGE_CONTENT;
  parameters.in_return_type_id = 0;
  parameters.in_issue_type_id = 0;
  parameters.in_created_user_id = userId;
  parameters.in_message_read = 0;
  parameters.out_result = '?';
  return db.executeScalarManual(INS_EXTEND_VENDOR_REQUEST_MESSAGE, parameters, 'out_result');
}

//Insert message in change vendor request manual
function insertChangeVendorRequestMessageManual(objChangeVendorRequest, userId) {
  var parameters = {};
  parameters.in_change_vendor_request_id = objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID;
  parameters.in_message_content = objChangeVendorRequest.MESSAGE_CONTENT;
  parameters.in_return_type_id = 0;
  parameters.in_issue_type_id = 0;
  parameters.in_created_user_id = userId;
  parameters.in_message_read = 0;
  parameters.out_result = '?';
  return db.executeScalarManual(INS_CHANGE_VENDOR_REQUEST_MESSAGE, parameters, 'out_result');
}
/** ***********END INSERT MANUAL*************** */

/** ***********GET*************** */
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
/** ***********END GET*************** */

/** ***********MANUAL GET*************** */
//Get message of Vendor inquiry manual
function getVendorInquiryMessageManual(vendorInquiryId) {
  var parameters = {'in_vendor_inquiry_id': vendorInquiryId};
  var result = db.executeProcedureManual(GET_VENDOR_INQUIRY_MESSAGE, parameters);
  return db.extractArray(result.out_result);
}

//Get messages of vendor request manual
function getVendorRequestMessageManual(vendorRequestId) {
  var parameters = {'in_vendor_request_id': vendorRequestId};
  var result = db.executeProcedureManual(GET_VENDOR_REQUEST_MESSAGE, parameters);
  return db.extractArray(result.out_result);
}

//Get message of Extend Vendor Request manual
function getExtendVendorRequestMessageManual(extendVendorRequestId) {
  var parameters = {'in_extend_vendor_request_id': extendVendorRequestId};
  var result = db.executeProcedureManual(GET_EXTEND_VENDOR_REQUEST_MESSAGE, parameters);
  return db.extractArray(result.out_result);
}

//Get message of Change Vendor Request manual
function getChangeVendorRequestMessageManual(changeVendorRequestId) {
  var parameters = {'in_change_vendor_request_id': changeVendorRequestId};
  var result = db.executeProcedureManual(GET_CHANGE_VENDOR_REQUEST_MESSAGE, parameters);
  return db.extractArray(result.out_result);
}
/** ***********END MANUAL GET*************** */

/** ***********UPDATE*************** */
//Change message flag
function updateVendorRequestMessageRead(objRequest, userId){
	var parameters = {};
	parameters.in_user_id_read = userId;
	parameters.in_message_read = objRequest.MESSAGE_READ;
	parameters.out_result = '?';
	return db.executeScalar(UPD_VENDOR_REQUEST_MESSAGE_READ, parameters, 'out_result');
}

//Change message flag
function updateExtendVendorRequestMessageRead(objRequest, userId){
	var parameters = {};
	parameters.in_user_id_read = userId;
	parameters.in_message_read = objRequest.MESSAGE_READ;
	parameters.out_result = '?';
	return db.executeScalar(UPD_EXTEND_VENDOR_REQUEST_MESSAGE_READ, parameters, 'out_result');
}

//Change message flag
function updateChangeVendorRequestMessageRead(objRequest, userId){
	var parameters = {};
	parameters.in_user_id_read = userId;
	parameters.in_message_read = objRequest.MESSAGE_READ;
	parameters.out_result = '?';
	return db.executeScalar(UPD_CHANGE_VENDOR_REQUEST_MESSAGE_READ, parameters, 'out_result');
}

//Change message flag
function updateVendorInquiryMessageRead(objRequest, userId){
	var parameters = {};
	parameters.in_user_id_read = userId;
	parameters.in_message_read = objRequest.MESSAGE_READ;
	parameters.out_result = '?';
	return db.executeScalar(UPD_VENDOR_INQUIRY_MESSAGE_READ, parameters, 'out_result');
}
/** ***********END UPDATE*************** */

/** ***********MANUAL UPDATE*************** */
//Change message flag manual
function updateVendorRequestMessageReadManual(objRequest, userId){
	var parameters = {};
	parameters.in_user_id_read = userId;
	parameters.in_message_read = objRequest.MESSAGE_READ;
	parameters.out_result = '?';
	return db.executeScalarManual(UPD_VENDOR_REQUEST_MESSAGE_READ, parameters, 'out_result');
}

//Change message flag manual
function updateExtendVendorRequestMessageReadManual(objRequest, userId){
	var parameters = {};
	parameters.in_user_id_read = userId;
	parameters.in_message_read = objRequest.MESSAGE_READ;
	parameters.out_result = '?';
	return db.executeScalarManual(UPD_EXTEND_VENDOR_REQUEST_MESSAGE_READ, parameters, 'out_result');
}

//Change message flag manual
function updateChangeVendorRequestMessageReadManual(objRequest, userId){
	var parameters = {};
	parameters.in_user_id_read = userId;
	parameters.in_message_read = objRequest.MESSAGE_READ;
	parameters.out_result = '?';
	return db.executeScalarManual(UPD_CHANGE_VENDOR_REQUEST_MESSAGE_READ, parameters, 'out_result');
}

//Change message flag manual
function updateVendorInquiryMessageReadManual(objRequest, userId){
	var parameters = {};
	parameters.in_user_id_read = userId;
	parameters.in_message_read = objRequest.MESSAGE_READ;
	parameters.out_result = '?';
	return db.executeScalarManual(UPD_VENDOR_INQUIRY_MESSAGE_READ, parameters, 'out_result');
}
/** ***********END MANUAL UPDATE*************** */