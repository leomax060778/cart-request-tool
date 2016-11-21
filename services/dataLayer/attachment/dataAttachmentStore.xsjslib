$.import("xscartrequesttool.services.commonLib", "mapper");
$.import("xscartrequesttool.services.commonLib", "httpLib");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpLib = $.xscartrequesttool.services.commonLib.httpLib;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var INS_ATTACHMENT_STORE = "INS_ATTACHMENT_STORE";
var GET_ATTACHMENT_STORE_BY_ID = "GET_ATTACHMENT_STORE_BY_ID";
var UPD_ATTACHMENT_STORE = "UPD_ATTACHMENT_STORE";
var DEL_ATTACHMENT_STORE = "DEL_ATTACHMENT_STORE";

//Insert Attachments
function insertAttachmentStore(objAttachment, userId) {
    var parameters = {};
    parameters.in_original_name = objAttachment.ORIGINAL_NAME;
    parameters.in_file_content = objAttachment.FILE_CONTENT;
    parameters.in_attachment_size = objAttachment.ATTACHMENT_SIZE;
    parameters.in_attachment_type = objAttachment.ATTACHMENT_TYPE;
    parameters.in_created_user_id = userId;//objAttachment.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalarManual(INS_ATTACHMENT_STORE, parameters, 'out_result');
}

//Get attachment by ID
function getAttachment(attachmentId) {
    var parameters = {};
    parameters.in_attachment_id = attachmentId;
    var result = db.executeProcedure(GET_ATTACHMENT_STORE_BY_ID, parameters);
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
