$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var INS_ATTACHMENT_INQUIRY = "INS_ATTACHMENT_INQUIRY";
var GET_ATTACHMENT_INQUIRY = "GET_ATTACHMENT_INQUIRY_BY_INQUIRY_ID";
var DEL_ATTACHMENT_INQUIRY = "DEL_ATTACHMENT_INQUIRY";
var DEL_ATTACHMENT_INQUIRY_CONECTION = "DEL_ATTACHMENT_INQUIRY_CONECTION";

//Insert Attachment Inquiry
function insertAttachmentInquiry(objAttachment, userId) {
        var parameters = {};
        parameters.in_inquiry_id = objAttachment.INQUIRY_ID;
        parameters.in_attachment_id = objAttachment.ATTACHMENT_ID;
        parameters.in_created_user_id = userId;//objAttachment.CREATED_USER_ID;
        parameters.out_result = '?';
        return db.executeScalar(INS_ATTACHMENT_INQUIRY, parameters, 'out_result');
}

//Insert Attachment Inquiry Manually
function insertAttachmentInquiryManual(objAttachment, userId) {
        var parameters = {};
        parameters.in_inquiry_id = objAttachment.INQUIRY_ID;
        parameters.in_attachment_id = objAttachment.ATTACHMENT_ID;
        parameters.in_created_user_id = userId;//objAttachment.CREATED_USER_ID;
        parameters.out_result = '?';
        return db.executeScalarManual(INS_ATTACHMENT_INQUIRY, parameters, 'out_result');
}

//Get attachment inquiry by ID
function getAttachmentInquiryById(inquiryId) {
        var parameters = {};
        parameters.in_inquiry_id = inquiryId;
        var result = db.executeProcedure(GET_ATTACHMENT_INQUIRY, parameters);
        return db.extractArray(result.out_result);

}

//Get attachment inquiry by ID manually
function getAttachmentInquiryByIdManual(inquiryId) {
		var parameters = {};
		parameters.in_inquiry_id = inquiryId;
		var result = db.executeProcedureManual(GET_ATTACHMENT_INQUIRY, parameters);
		return db.extractArray(result.out_result);

}


//Delete Attachment Inquiry
function deleteAttachmentInquiry(objAttachment, userId) {
        var parameters = {};
        parameters.in_attachment_id = objAttachment.ATTACHMENT_ID;
        parameters.in_modified_user_id = userId;//objAttachment.MODIFIED_USER_ID;
        parameters.out_result = '?';
       
        return db.executeScalar(DEL_ATTACHMENT_INQUIRY, parameters, 'out_result');
}


//Delete Attachment Inquiry Manual
function deleteAttachmentInquiryManual(objAttachment, userId) {
      var parameters = {};
      parameters.in_attachment_id = objAttachment.ATTACHMENT_ID;
      parameters.in_modified_user_id = userId;//objAttachment.MODIFIED_USER_ID;
      parameters.out_result = '?';
     
      return db.executeScalarManual(DEL_ATTACHMENT_INQUIRY, parameters, 'out_result');
}

function deleteAttachmentInquiryConectionManual(attachment_id, inquiry_id, user_id){
    var parameters = {};
    parameters.in_attachment_id = attachment_id;
    parameters.in_inquiry_id = inquiry_id;
    parameters.in_modified_user_id = user_id;
    parameters.out_result = '?';

    return db.executeScalarManual(DEL_ATTACHMENT_INQUIRY_CONECTION, parameters, 'out_result');
}