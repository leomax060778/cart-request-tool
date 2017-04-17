$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var attachment = mapper.getAttachmentInquiry();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ATTACHMENT_INQUIRY = "GET_ATTACHMENT_INQUIRY_BY_ID";

var service_name = "attachmentInquiryService";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

/**
 * @typedef {object} AttachmentInquiry
 * @property {string} attachment_id
 */


/**
 *
 * @param {object} parameters
 * @param {string} parameters.GET_ATTACHMENT_INQUIRY_BY_ID - get attachment of the inquiry by inquiry id
 * @returns {AttachmentInquiry} AttachmentInquiry - Array with the id of the attachments inquiries related with the inquiry id
 */
function handleGet(parameters) {
    var rdo = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_ATTACHMENT_INQUIRY) {
            if (parameters[0].value <= 0){
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "attachmentInquiryService/handleGet",
                    "invalid parameter value " + parameters[0].name + " (must be a valid id)"
                );
            } else {
                rdo = attachment.getAttachmentInquiryById(parameters[0].value);
            }
        } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "attachmentInquiryService/handleGet",
                "invalid parameter name " + parameters[0].name + " (must be: GET_ATTACHMENT_INQUIRY_BY_ID)"
            );
        }
    } else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "attachmentInquiryService/handleGet",
            "invalid parameter (must be: GET_ATTACHMENT_INQUIRY_BY_ID)"
        );
    }
    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

//Not Implemented Method
function handlePut(){
    return httpUtil.notImplementedMethod();
}

/**
 *
 * @param {object} reqBody
 * @param {string} reqBody.ATTACHMENT_ID - Id of the attachment to delete
 * @param userId
 * @returns {int} count - Modified rows count
 */
function handleDelete(reqBody, userId) {
    var req = attachment.deleteAttachmentInquiry(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

/**
 *
 * @param {object} reqBody
 * @param {string} reqBody.INQUIRY_ID - Id of the inquiry
 * @param {string} reqBody.ATTACHMENT_ID - Id of the attachment uploaded to the inquiry
 * @param userId
 * @returns {int} count - Modified rows count
 */
function handlePost(reqBody, userId) {
    var req = attachment.insertAttachmentInquiry(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

processRequest();