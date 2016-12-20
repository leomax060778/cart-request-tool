$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var INS_ATTACHMENT_VENDOR = "INS_ATTACHMENT_VENDOR";
var GET_ATTACHMENT_VENDOR = "GET_ATTACHMENT_VENDOR_BY_ID";
var DEL_ATTACHMENT_VENDOR = "DEL_ATTACHMENT_VENDOR";

//Insert Attachment Vendor
function insertAttachmentVendor(objAttachment, userId) {
    var parameters = {};
    parameters.in_vendor_type_id = objAttachment.VENDOR_TYPE_ID;
    parameters.in_vendor_id = objAttachment.VENDOR_ID;
    parameters.in_attachment_id = objAttachment.ATTACHMENT_ID;
    parameters.in_created_user_id = userId;//objAttachment.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(INS_ATTACHMENT_VENDOR, parameters, 'out_result');
}

//Insert Attachment Vendor
function insertManualAttachmentVendor(objAttachment, userId) {
    var parameters = {};
    parameters.in_vendor_type_id = objAttachment.VENDOR_TYPE_ID;
    parameters.in_vendor_id = objAttachment.VENDOR_ID;
    parameters.in_attachment_id = objAttachment.ATTACHMENT_ID;
    parameters.in_created_user_id = userId;//objAttachment.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalarManual(INS_ATTACHMENT_VENDOR, parameters, 'out_result');
}

//Get attachment vendor by ID
function getAttachmentVendor(objAttachment) {
    var parameters = {};
    parameters.in_vendor_type_id = objAttachment.VENDOR_TYPE_ID;
    parameters.in_vendor_id = objAttachment.VENDOR_ID;
    var result = db.executeProcedure(GET_ATTACHMENT_VENDOR, parameters);
    return db.extractArray(result.out_result);
}

//Get attachment vendor by ID Manually
function getAttachmentVendorManual(objAttachment) {
    var parameters = {};
    parameters.in_vendor_type_id = objAttachment.VENDOR_TYPE_ID;
    parameters.in_vendor_id = objAttachment.VENDOR_ID;
    var result = db.executeProcedureManual(GET_ATTACHMENT_VENDOR, parameters);
    return db.extractArray(result.out_result);
}

//Delete Attachment vendor
function deleteAttachmentVendor(objAttachment, userId) {
    var parameters = {};
    parameters.in_attachment_id = objAttachment.ATTACHMENT_ID;
    parameters.in_modified_user_id = userId;//objAttachment.MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(DEL_ATTACHMENT_VENDOR, parameters, 'out_result');
}

//Delete Attachment vendor
function deleteAttachmentVendorManual(objAttachment, userId) {
    var parameters = {};
    parameters.in_attachment_id = objAttachment.ATTACHMENT_ID;
    parameters.in_modified_user_id = userId;//objAttachment.MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalarManual(DEL_ATTACHMENT_VENDOR, parameters, 'out_result');
}