$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURES LIST NAME
var INS_INQUIRY_MESSAGE = "INS_INQUIRY_MESSAGE";
var GET_INQUIRY_MESSAGE = "GET_INQUIRY_MESSAGE_BY_INQUIRY_ID";
var GET_INQUIRY_MESSAGE_CONTENT = "GET_INQUIRY_MESSAGE_CONTENT";
var UPD_INQUIRY_MESSAGE_READ = "UPD_INQUIRY_MESSAGE_READ";
var UPD_INQUIRY_MESSAGE_READ_BY_MESSAGE_ID = "UPD_INQUIRY_MESSAGE_READ_BY_MESSAGE_ID";

//Insert message in Inquiry
function insertInquiryMessage(objInquiry, userId) {
	var parameters = {};
    parameters.in_user_id = userId;
    parameters.in_inquiry_id = objInquiry.INQUIRY_ID;
    parameters.in_message_content = objInquiry.MESSAGE_CONTENT;
    parameters.in_message_type_id = objInquiry.MESSAGE_TYPE_ID || 0;
    parameters.in_subject_id = objInquiry.SUBJECT_ID || 0;
    parameters.in_additional_message_type_information = null;
    parameters.in_additional_subject_information = null;
    parameters.in_message_read = 0;
    parameters.in_created_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalar(INS_INQUIRY_MESSAGE, parameters, 'out_result');
}

//Get Inquiry message 
function getInquiryMessage(inquiryId) {
    var parameters = {'in_inquiry_id': inquiryId};
    var result = db.executeProcedure(GET_INQUIRY_MESSAGE, parameters);
    return db.extractArray(result.out_result);
}

//Get Inquiry message content
function getInquiryMessageContentManual(inquiryId, messageId, startPosition, stringLength) {
    var parameters = {};
    parameters.in_inquiry_id = inquiryId;
    parameters.in_message_id = messageId;
    parameters.in_start_position = startPosition;
    parameters.in_string_length = stringLength;
    var result = db.executeProcedureManual(GET_INQUIRY_MESSAGE_CONTENT, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

//Get message of Request manual
function getInquiryMessageManual(inquiryId) {
    var parameters = {'in_inquiry_id': inquiryId};
    var result = db.executeProcedureManual(GET_INQUIRY_MESSAGE, parameters);
    return db.extractArray(result.out_result);
}

//Change message flag manual
function updateInquiryMessageReadManual(objInquiry, userId){
	var parameters = {};
	parameters.in_user_id_read = userId;
	parameters.in_message_read = objInquiry.MESSAGE_READ;
	parameters.out_result = '?';
	return db.executeScalarManual(UPD_INQUIRY_MESSAGE_READ, parameters, 'out_result');
}

//Change message flag manual
function updateInquiryMessageReadByMessageIdManual(objInquiry, userId){
	var parameters = {};
	parameters.in_user_id_read = userId;
	parameters.in_message_id = objInquiry.MESSAGE_ID;
	parameters.in_message_read = objInquiry.MESSAGE_READ;
	parameters.out_result = '?';
	return db.executeScalarManual(UPD_INQUIRY_MESSAGE_READ_BY_MESSAGE_ID, parameters, 'out_result');
}

//Change message flag
function updateInquiryMessageRead(objInquiry, userId){
	var parameters = {};
	parameters.in_user_id_read = userId;
	parameters.in_message_read = objInquiry.MESSAGE_READ;
	parameters.out_result = '?';
	return db.executeScalar(UPD_INQUIRY_MESSAGE_READ, parameters, 'out_result');
}