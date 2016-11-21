/****** libs ************/
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var attachment = mapper.getAttachmentVendor();
/** ***********END INCLUDE LIBRARIES*************** */

var GET = "GET";
var VENDOR_ID = "VENDOR_ID";
var VENDOR_TYPE_ID = "VENDOR_TYPE_ID";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete);
}

/**
 *
 * @param {object} parameters
 * @param {string} parameters.GET - get by id
 * @param {string} parameters.VENDOR_ID - vendor id to get the attachment
 * @param {string} parameters.VENDOR_TYPE_ID - vendor type id to get the attachment
 * @returns {AttachmentVendor} AttachmentVendor
 */
function handleGet(parameters) {
    var rdo = {};
    var objAttachment = {};
    if (!parameters[0] || !parameters[1] || !parameters[2]){
    	throw ErrorLib.getErrors().BadRequest(
                "",
                "attachmentService/handleGet",
                "parameters not found (must be: GET, VENDOR_ID and VENDOR_TYPE_ID)"
            );
    }
    if (parameters.length > 0) {
        if (parameters[0].name === GET && parameters[1].name === VENDOR_ID && parameters[2].name === VENDOR_TYPE_ID) {
            if (parameters[1].value <= 0) {
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "attachmentVendorServices/handleGet",
                    "invalid parameter value " + parameters[1].name + " (must be a valid id)"
                );
            } else if (parameters[2].value <= 0) {
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "attachmentVendorServices/handleGet",
                    "invalid parameter value " + parameters[2].name + " (must be a valid id)"
                );
            } else {
                objAttachment.VENDOR_ID = parameters[1].value;
                objAttachment.VENDOR_TYPE_ID = parameters[2].value;
                rdo = attachment.getAttachmentVendorById(objAttachment);
            }
        } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "attachmentService/handleGet",
                "invalid parameter name " + parameters[0].name + " (must be: GET, VENDOR_ID and VENDOR_TYPE_ID)"
            );
        }
    } else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "attachmentService/handleGet",
            "invalid parameter name (must be: GET, VENDOR_ID and VENDOR_TYPE_ID)"
        );
    }
    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

/**
 *
 * @param {AttachmentVendor} reqBody
 * @param userId
 * @returns {int} count - Modified rows count
 */
function handlePost(reqBody, userId) {
    var res = attachment.insertAttachmentVendor(reqBody, userId);
    return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

//Not Implemented Method
function handlePut() {
    return httpUtil.notImplementedMethod();
}

/**
 *
 * @param {object} reqBody
 * @param {string} reqBody.ATTACHMENT_ID - id of the attachment to delete
 * @param userId
 * @returns {int} count - Modified rows count
 */
function handleDelete(reqBody, userId) {
    var rdo = attachment.deleteAttachmentVendor(reqBody, userId);
    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

processRequest();

/**
 * @typedef {object} AttachmentVendor
 * @property {string} VENDOR_ID - id of the vendor
 * @property {string} VENDOR_TYPE_ID - id of the vendor type
 * @property {string} ATTACHMENT_ID - id of the attachment
 */