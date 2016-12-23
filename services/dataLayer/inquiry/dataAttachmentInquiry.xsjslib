$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var INS_ATTACHMENT_INQUIRY = "INS_ATTACHMENT_INQUIRY";
var GET_ATTACHMENT_INQUIRY = "GET_ATTACHMENT_INQUIRY_BY_INQUIRY_ID";
var DEL_ATTACHMENT_INQUIRY = "DEL_ATTACHMENT_INQUIRY";

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