$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

var INS_ATTACHMENT_REQUEST = "INS_ATTACHMENT_REQUEST";
var DEL_ATTACHMENT_REQUEST = "DEL_ATTACHMENT_REQUEST";
//Insert Attachment Request
function insertAttachmentRequest(objAttachment, userId) {

        var parameters = {};
        parameters.in_request_id = objAttachment.REQUEST_ID;
        parameters.in_attachment_id = objAttachment.ATTACHMENT_ID;
        parameters.in_created_user_id = userId;//objAttachment.IN_CREATED_USER_ID;
        return db.executeProcedureManual(INS_ATTACHMENT_REQUEST, parameters);
  
}

//Insert and commit
function insertAttachmentRequestAuto(objAttachment, userId) {

    var parameters = {};
    parameters.in_request_id = objAttachment.REQUEST_ID;
    parameters.in_attachment_id = objAttachment.ATTACHMENT_ID;
    parameters.in_created_user_id = userId;
    return db.executeProcedure(INS_ATTACHMENT_REQUEST, parameters);

}

//Delete Attachment request
function deleteAttachmentRequest(objAttachment, userId) {
        var parameters = {};
        parameters.in_attachment_id = objAttachment.ATTACHMENT_ID;
        parameters.in_modified_user_id = userId;//objAttachment.IN_MODIFIED_USER_ID;
        parameters.out_result = '?';
        
        return db.executeScalarManual(DEL_ATTACHMENT_REQUEST, parameters, 'out_result');
}