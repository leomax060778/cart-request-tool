$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var inquiry = mapper.getInquiry();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_INQUIRY = "GET_ALL_INQUIRY";
var GET_INQUIRY_BY_ID = "GET_INQUIRY_BY_ID";
var GET_INQUIRY_LAST_ID = "GET_INQUIRY_LAST_ID";
var EDITION_MODE = "EDITION_MODE";

var service_name = "inquiryService";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

/**
 *
 * @param {object} parameters
 * @param {void} [parameters.GET_ALL_INQUIRY_TYPE] - get all
 * @param {string} [parameters.GET_INQUIRY_BY_ID] - get by id
 * @returns {Inquiry|InquiryId} Inquiry - one or more Inquiry
 */

function handleGet(parameters, userId) {
    var rdo = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_ALL_INQUIRY) {
            rdo = inquiry.getAllInquiry(userId);
        } else if (parameters[0].name === GET_INQUIRY_BY_ID) {
            if (parameters[0].value <= 0 || isNaN(parameters[0].value)){
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "inquiryService/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (must be a valid id)"
                );
            } else {
            	if (parameters[1] && parameters[1].name === EDITION_MODE) {
            		rdo = inquiry.getInquiryById(parameters[0].value, userId, parameters[1].value);
            	}else{
            		rdo = inquiry.getInquiryById(parameters[0].value, userId);
            	}
                
            }
        }  else if (parameters[0].name === GET_INQUIRY_LAST_ID) {
        	rdo = inquiry.getInquiryLastId();
        } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "inquiryServices/handleGet",
                "invalid parameter name " + parameters[0].name + " (can be: GET_ALL_INQUIRY, GET_INQUIRY_LAST_ID or GET_INQUIRY_BY_ID)"
            );
        }
    } else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "inquiryServices/handleGet",
            "invalid parameter (can be: GET_ALL_INQUIRY, GET_INQUIRY_LAST_ID or GET_INQUIRY_BY_ID)"
        );
    }
    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

/**
 *
 * @param {object} reqBody
 * @param {string} reqBody.INQUIRY_ID - id of the inquiry to update
 * @param {string} reqBody.TOPIC_ID - new id of the topic
 * @param userId
 * @returns {int} count - Modified rows count
 */
function handlePut(reqBody, userId) {
	var req;
    req = inquiry.updateInquiry(reqBody, userId);
    inquiry.sendResubmitMail(reqBody.INQUIRY_ID, userId);
    
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

//Not Implemented Method
function handleDelete() {
   return httpUtil.notImplementedMethod();
}

/**
 *
 * @param {object} reqBody
 * @param {string} reqBody.TOPIC_ID - id of the topic
 * @param {string} reqBody.INQUIRY_TEXT - text of the inquiry
 * @param userId
 * @returns {string} id - Id of the new inquiry
 */
function handlePost(reqBody, userId) {
	var req;
    req = inquiry.insertInquiry(reqBody, userId);
    inquiry.sendSubmitMail(req, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

processRequest();

/**
 * @typedef {object} Inquiry
 * @property {string} inquiry_id - id of the inquiry
 * @property {string} created_date_tz - date of the submit
 * @property {string} completed_date_tz - date on which the request was completed
 * @property {string} description - description of the topic
 * @property {string} name - name of the status
 */

/**
 * @typedef {object} InquiryId
 * @property {string} user_name - username of the user that creates the inquiry
 * @property {string} first_name - first name of the user
 * @property {string} last_name - last name of the user
 * @property {string} topic_id - id of the topic
 * @property {string} inquiry_text - text of the inquiry
 */