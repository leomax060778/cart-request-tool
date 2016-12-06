$.import("xscartrequesttool.services.commonLib", "mapper");
$.import("xscartrequesttool.services.commonLib", "httpLib");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpLib = $.xscartrequesttool.services.commonLib.httpLib;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var INS_ATTACHMENT = "INS_ATTACHMENT";
var GET_ATTACHMENT = "GET_ATTACHMENT_BY_ID";
var UPD_ATTACHMENT = "UPD_ATTACHMENT";
var DEL_ATTACHMENT = "DEL_ATTACHMENT";
var DEL_ATTACHMENT_REQUEST_CONECTION = "DEL_ATTACHMENT_REQUEST_CONECTION";

//Insert Attachments
function insertAttachment(objAttachment, userId) {
    var parameters = {};
    parameters.in_user_id = userId;//objAttachment.USER_ID;
    parameters.in_original_name = objAttachment.ORIGINAL_NAME;
    parameters.in_saved_name = objAttachment.SAVED_NAME;
    parameters.in_attachment_size = objAttachment.ATTACHMENT_SIZE;
    parameters.in_attachment_type = objAttachment.ATTACHMENT_TYPE;
    parameters.in_created_user_id = userId;//objAttachment.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalarManual(INS_ATTACHMENT, parameters, 'out_result');
}

//Get attachment by ID
function getAttachment(attachmentId) {
    var parameters = {};
    parameters.in_attachment_id = attachmentId;
    var result = db.executeProcedure(GET_ATTACHMENT, parameters);
    return db.extractArray(result.out_result);
}

function getManualAttachment(attachmentId) {
    var parameters = {};
    parameters.in_attachment_id = attachmentId;
    var result = db.executeProcedureManual(GET_ATTACHMENT, parameters);
    return db.extractArray(result.out_result);
}

//Update Attachment
function updateAttachment(objAttachment, userId) {
    var parameters = {};
    parameters.in_modified_user_id = userId;//objAttachment.USER_ID;
    parameters.in_attachment_id = objAttachment.ATTACHMENT_ID;
    parameters.in_original_name = objAttachment.ORIGINAL_NAME;
    parameters.in_saved_name = objAttachment.SAVED_NAME;
    parameters.in_attachment_size = objAttachment.ATTACHMENT_SIZE;
    parameters.out_result = '?';
    return db.executeScalarManual(UPD_ATTACHMENT, parameters, 'out_result');
}

//Delete Attachment
function deleteAttachment(objAttachment, userId) {
    var parameters = {};
    parameters.in_attachment_id = objAttachment.ATTACHMENT_ID;
    parameters.in_modified_user_id = userId;//objAttachment.MODIFIED_USER_ID;
    parameters.out_result = '?';

    return db.executeScalarManual(DEL_ATTACHMENT, parameters, 'out_result');
}

function deleteManualAttachmentRequestConection(attachment_id, request_id, user_id){
    var parameters = {};
    parameters.in_attachment_id = attachment_id;
    parameters.in_request_id = request_id;
    parameters.in_modified_user_id = user_id;
    parameters.out_result = '?';

    return db.executeScalarManual(DEL_ATTACHMENT_REQUEST_CONECTION, parameters, 'out_result');
}
