$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURES LIST NAME
var INS_INQUIRY_MESSAGE = "INS_INQUIRY_MESSAGE";
var GET_INQUIRY_MESSAGE = "GET_INQUIRY_MESSAGE_BY_INQUIRY_ID";
var UPD_INQUIRY_MESSAGE_READ = "UPD_INQUIRY_MESSAGE_READ";

//Insert message in Inquiry
function insertInquiryMessage(objInquiry, userId) {
	var parameters = {};
    parameters.in_user_id = userId;
    parameters.in_inquiry_id = objInquiry.INQUIRY_ID;
    parameters.in_message_content = objInquiry.MESSAGE_CONTENT;
    parameters.in_return_type_id = 0;
    parameters.in_message_read = 0;
    parameters.in_created_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalar(INS_INQUIRY_MESSAGE, parameters, 'out_result');
}

//Get message of Inquiry
function getInquiryMessage(inquiryId) {
    var parameters = {'in_inquiry_id': inquiryId};
    var result = db.executeProcedure(GET_INQUIRY_MESSAGE, parameters);
    return db.extractArray(result.out_result);
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

//Change message flag
function updateInquiryMessageRead(objInquiry, userId){
	var parameters = {};
	parameters.in_user_id_read = userId;
	parameters.in_message_read = objInquiry.MESSAGE_READ;
	parameters.out_result = '?';
	return db.executeScalar(UPD_INQUIRY_MESSAGE_READ, parameters, 'out_result');
}