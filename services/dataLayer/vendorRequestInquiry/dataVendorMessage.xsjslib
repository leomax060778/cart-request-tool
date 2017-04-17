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
var GET_VENDOR_INQUIRY_MESSAGE_CONTENT = "GET_VENDOR_INQUIRY_MESSAGE_CONTENT";
var GET_VENDOR_REQUEST_MESSAGE = "GET_VENDOR_REQUEST_MESSAGE_BY_VENDOR_REQUEST_ID";
var GET_VENDOR_REQUEST_MESSAGE_CONTENT = "GET_VENDOR_REQUEST_MESSAGE_CONTENT";
var GET_EXTEND_VENDOR_REQUEST_MESSAGE = "GET_EXTEND_VENDOR_REQUEST_MESSAGE_BY_EXTEND_VENDOR_ID";
var GET_EXTEND_MESSAGE_CONTENT = "GET_EXTEND_VENDOR_REQUEST_MESSAGE_CONTENT";
var GET_CHANGE_VENDOR_REQUEST_MESSAGE = "GET_CHANGE_VENDOR_REQUEST_MESSAGE_BY_CHANGE_VENDOR_ID";
var GET_CHANGE_MESSAGE_CONTENT = "GET_CHANGE_VENDOR_REQUEST_MESSAGE_CONTENT";
var UPD_VENDOR_INQUIRY_MESSAGE_READ = "UPD_VENDOR_INQUIRY_MESSAGE_READ";
var UPD_VENDOR_REQUEST_MESSAGE_READ = "UPD_VENDOR_REQUEST_MESSAGE_READ";
var UPD_EXTEND_VENDOR_REQUEST_MESSAGE_READ = "UPD_EXTEND_VENDOR_REQUEST_MESSAGE_READ";
var UPD_CHANGE_VENDOR_REQUEST_MESSAGE_READ = "UPD_CHANGE_VENDOR_REQUEST_MESSAGE_READ";
var UPD_VENDOR_INQUIRY_MESSAGE_READ_BY_MESSAGE_ID = "UPD_VENDOR_INQUIRY_MESSAGE_READ_BY_MESSAGE_ID";
var UPD_VENDOR_REQUEST_MESSAGE_READ_BY_MESSAGE_ID = "UPD_VENDOR_REQUEST_MESSAGE_READ_BY_MESSAGE_ID";
var UPD_EXTEND_VENDOR_REQUEST_MESSAGE_READ_BY_MESSAGE_ID = "UPD_EXTEND_VENDOR_REQUEST_MESSAGE_READ_BY_MESSAGE_ID";
var UPD_CHANGE_VENDOR_REQUEST_MESSAGE_READ_BY_MESSAGE_ID = "UPD_CHANGE_VENDOR_REQUEST_MESSAGE_READ_BY_MESSAGE_ID";


/** ***********INSERT*************** */
//Insert message in Vendor inquiry
function insertVendorInquiryMessage(objVendorInquiry, userId) {
    var parameters = {};
    parameters.in_vendor_inquiry_id = objVendorInquiry.VENDOR_INQUIRY_ID;
    parameters.in_message_content = objVendorInquiry.MESSAGE_CONTENT;
    parameters.in_message_type_id = objVendorInquiry.MESSAGE_TYPE_ID || 0;
    parameters.in_subject_id = objVendorInquiry.SUBJECT_ID || 0;
    parameters.in_additional_message_type_information = objVendorInquiry.ADDITIONAL_MESSAGE_TYPE_INFORMATION || null;
    parameters.in_additional_subject_information = objVendorInquiry.ADDITIONAL_SUBJECT_INFORMATION || null;
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
    parameters.in_message_type_id = objVendorRequest.MESSAGE_TYPE_ID || 0;
    parameters.in_subject_id = objVendorRequest.SUBJECT_ID || 0;
    parameters.in_additional_message_type_information = objVendorRequest.ADDITIONAL_MESSAGE_TYPE_INFORMATION || null;
    parameters.in_additional_subject_information = objVendorRequest.ADDITIONAL_SUBJECT_INFORMATION || null;
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
    parameters.in_message_type_id = objExtendVendorRequest.MESSAGE_TYPE_ID || 0;
    parameters.in_subject_id = objExtendVendorRequest.SUBJECT_ID || 0;
    parameters.in_additional_message_type_information = objExtendVendorRequest.ADDITIONAL_MESSAGE_TYPE_INFORMATION || null;
    parameters.in_additional_subject_information = objExtendVendorRequest.ADDITIONAL_SUBJECT_INFORMATION || null;
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
    parameters.in_message_type_id = objChangeVendorRequest.MESSAGE_TYPE_ID || 0;
    parameters.in_subject_id = objChangeVendorRequest.SUBJECT_ID || 0;
    parameters.in_additional_message_type_information = objChangeVendorRequest.ADDITIONAL_MESSAGE_TYPE_INFORMATION || null;
    parameters.in_additional_subject_information = objChangeVendorRequest.ADDITIONAL_SUBJECT_INFORMATION || null;
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
  parameters.in_message_type_id = objVendorInquiry.MESSAGE_TYPE_ID || 0;
  parameters.in_subject_id = objVendorInquiry.SUBJECT_ID || 0;
  parameters.in_additional_message_type_information = objVendorInquiry.ADDITIONAL_MESSAGE_TYPE_INFORMATION || null;
  parameters.in_additional_subject_information = objVendorInquiry.ADDITIONAL_SUBJECT_INFORMATION || null;
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
  parameters.in_message_type_id = objVendorRequest.MESSAGE_TYPE_ID || 0;
  parameters.in_subject_id = objVendorRequest.SUBJECT_ID || 0;
  parameters.in_additional_message_type_information = objVendorRequest.ADDITIONAL_MESSAGE_TYPE_INFORMATION || null;
  parameters.in_additional_subject_information = objVendorRequest.ADDITIONAL_SUBJECT_INFORMATION || null;
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
  parameters.in_message_type_id = objExtendVendorRequest.MESSAGE_TYPE_ID || 0;
  parameters.in_subject_id = objExtendVendorRequest.SUBJECT_ID || 0;
  parameters.in_additional_message_type_information = objExtendVendorRequest.ADDITIONAL_MESSAGE_TYPE_INFORMATION || null;
  parameters.in_additional_subject_information = objExtendVendorRequest.ADDITIONAL_SUBJECT_INFORMATION || null;
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
  parameters.in_message_type_id = objChangeVendorRequest.MESSAGE_TYPE_ID || 0;
  parameters.in_subject_id = objChangeVendorRequest.SUBJECT_ID || 0;
  parameters.in_additional_message_type_information = objChangeVendorRequest.ADDITIONAL_MESSAGE_TYPE_INFORMATION || null;
  parameters.in_additional_subject_information = objChangeVendorRequest.ADDITIONAL_SUBJECT_INFORMATION || null;
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

//Get Vendor Inquiry message content manual
function getVendorInquiryMessageContentManual(vendorInquiryId, vendorInquiryMessageId, startPosition, stringLength) {
	var parameters = {};
	parameters.in_vendor_inquiry_id = vendorInquiryId;
	parameters.in_vendor_inquiry_message_id = vendorInquiryMessageId;
	parameters.in_start_position = startPosition;
	parameters.in_string_length = stringLength;
	var result = db.executeProcedureManual(GET_VENDOR_INQUIRY_MESSAGE_CONTENT, parameters);
	var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

//Get messages of vendor request manual
function getVendorRequestMessageManual(vendorRequestId) {
  var parameters = {'in_vendor_request_id': vendorRequestId};
  var result = db.executeProcedureManual(GET_VENDOR_REQUEST_MESSAGE, parameters);
  return db.extractArray(result.out_result);
}

//Get Vendor Request message content manual
function getVendorRequestMessageContentManual(vendorRequestId, vendorRequestMessageId, startPosition, stringLength) {
	var parameters = {};
	parameters.in_vendor_request_id = vendorRequestId;
	parameters.in_vendor_request_message_id = vendorRequestMessageId;
	parameters.in_start_position = startPosition;
	parameters.in_string_length = stringLength;
	var result = db.executeProcedureManual(GET_VENDOR_REQUEST_MESSAGE_CONTENT, parameters);
	var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

//Get message of Extend Vendor Request manual
function getExtendVendorRequestMessageManual(extendVendorRequestId) {
  var parameters = {'in_extend_vendor_request_id': extendVendorRequestId};
  var result = db.executeProcedureManual(GET_EXTEND_VENDOR_REQUEST_MESSAGE, parameters);
  return db.extractArray(result.out_result);
}

//Get Extend Vendor Request message content manual
function getExtendVendorRequestMessageContentManual(extendVendorRequestId, extendVendorRequestMessageId, startPosition, stringLength) {
	var parameters = {};
	parameters.in_extend_vendor_request_id = extendVendorRequestId;
	parameters.in_extend_vendor_request_message_id = extendVendorRequestMessageId;
	parameters.in_start_position = startPosition;
	parameters.in_string_length = stringLength;
	var result = db.executeProcedureManual(GET_EXTEND_MESSAGE_CONTENT, parameters);
	var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

//Get message of Change Vendor Request manual
function getChangeVendorRequestMessageManual(changeVendorRequestId) {
  var parameters = {'in_change_vendor_request_id': changeVendorRequestId};
  var result = db.executeProcedureManual(GET_CHANGE_VENDOR_REQUEST_MESSAGE, parameters);
  return db.extractArray(result.out_result);
}

//Get Change Vendor Request message content manual
function getChangeVendorRequestMessageContentManual(changeVendorRequestId, changeVendorRequestMessageId, startPosition, stringLength) {
	var parameters = {};
	parameters.in_change_vendor_request_id = changeVendorRequestId;
	parameters.in_change_vendor_request_message_id = changeVendorRequestMessageId;
	parameters.in_start_position = startPosition;
	parameters.in_string_length = stringLength;
	var result = db.executeProcedureManual(GET_CHANGE_MESSAGE_CONTENT, parameters);
	var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
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
function updateVendorRequestMessageReadByMessageIdManual(objRequest, userId){
	var parameters = {};
	parameters.in_user_id_read = userId;
	parameters.in_message_read = objRequest.MESSAGE_READ;
	parameters.in_message_id = objRequest.VENDOR_REQUEST_MESSAGE_ID;
	parameters.out_result = '?';
	return db.executeScalarManual(UPD_VENDOR_REQUEST_MESSAGE_READ_BY_MESSAGE_ID, parameters, 'out_result');
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
function updateExtendVendorRequestMessageReadByMessageIdManual(objRequest, userId){
	var parameters = {};
	parameters.in_user_id_read = userId;
	parameters.in_message_read = objRequest.MESSAGE_READ;
	parameters.in_message_id = objRequest.EXTEND_VENDOR_REQUEST_MESSAGE_ID;
	parameters.out_result = '?';
	return db.executeScalarManual(UPD_EXTEND_VENDOR_REQUEST_MESSAGE_READ_BY_MESSAGE_ID, parameters, 'out_result');
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
function updateChangeVendorRequestMessageReadByMessageIdManual(objRequest, userId){
	var parameters = {};
	parameters.in_user_id_read = userId;
	parameters.in_message_read = objRequest.MESSAGE_READ;
	parameters.in_message_id = objRequest.CHANGE_VENDOR_REQUEST_MESSAGE_ID;
	parameters.out_result = '?';
	return db.executeScalarManual(UPD_CHANGE_VENDOR_REQUEST_MESSAGE_READ_BY_MESSAGE_ID, parameters, 'out_result');
}

//Change message flag manual
function updateVendorInquiryMessageReadManual(objRequest, userId){
	var parameters = {};
	parameters.in_user_id_read = userId;
	parameters.in_message_read = objRequest.MESSAGE_READ;
	parameters.out_result = '?';
	return db.executeScalarManual(UPD_VENDOR_INQUIRY_MESSAGE_READ, parameters, 'out_result');
}

//Change message flag manual
function updateVendorInquiryMessageReadByMessageIdManual(objRequest, userId){
	var parameters = {};
	parameters.in_user_id_read = userId;
	parameters.in_message_read = objRequest.MESSAGE_READ;
	parameters.in_message_id = objRequest.VENDOR_INQUIRY_MESSAGE_ID;
	parameters.out_result = '?';
	return db.executeScalarManual(UPD_VENDOR_INQUIRY_MESSAGE_READ_BY_MESSAGE_ID, parameters, 'out_result');
}
/** ***********END MANUAL UPDATE*************** */