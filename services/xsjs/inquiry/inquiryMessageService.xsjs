$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var inquiry = mapper.getInquiryMessage();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_INQUIRY_MESSAGE = "GET_INQUIRY_MESSAGE";

var service_name = "inquiryMessageService"; 

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}
/**
 *
 * @param {object} parameters
 * @param {string} parameters.GET_INQUIRY_MESSAGE - get messages of the inquiry by id
 * @returns {InquiryMessage} InquiryMessage - Array with the messages
 */
function handleGet(parameters, userId) {
    var res = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_INQUIRY_MESSAGE) {
            if (parameters[0].value <= 0 || isNaN(parameters[0].value)){
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "inquiryMessageService/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (must be a valid id)"
                );
            } else {
                res = inquiry.getInquiryMessage(parameters[0].value, userId);
            }
        } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "inquiryMessageServices/handleGet",
                "invalid parameter name " + parameters[0].name + " (must be: GET_INQUIRY_MESSAGE)"
            );
        }
    } else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "inquiryMessageServices/handleGet",
            "invalid parameter (must be: GET_INQUIRY_MESSAGE)"
        );
    }
    return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

function handlePut(reqBody, userId) {
    var res = inquiry.updateMessageRead(reqBody, userId);
    return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

//Not Implemented Method
function handleDelete(){
    return httpUtil.notImplementedMethod();
}

/**
 *
 * @param {InquiryMessage} reqBody
 * @param {string} reqBody.INQUIRY_ID - id of the inquiry
 * @param {string} reqBody.MESSAGE_CONTENT - the content of the inquiry message
 * @param userId
 * @returns {string} id - Id of the new inquiry message
 */
function handlePost(reqBody, userId) {
	var req;
    req = inquiry.insertInquiryMessage(reqBody, userId);

    inquiry.sendMessageMail(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

processRequest();

/**
 * @typedef {object} InquiryMessage
 * @property {string} USER_ID - id of the user
 * @property {string} INQUIRY_ID - id of the inquiry
 * @property {string} MESSAGE_CONTENT - the content of the inquiry message
 * @property {string} RETURN_NAME - name of the return type
 * @property {string} ROLE_NAME - name of the user role
 * @property {string} USER_NAME - username
 * @property {string} FIRST_NAME - first name of the user
 * @property {string} LAST_NAME - last name of the user
 * @property {string} CREATED_DATE - date of creation of the inquiry (YYYY-MM-DD hh:mm)
 */