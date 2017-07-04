$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var inquiry = mapper.getInquiryStatus();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_INQUIRY_BY_STATUS = 'GET_INQUIRY_BY_STATUS';
var GET_INQUIRY_PROCESSING_REPORT_BY_ID = "GET_INQUIRY_PROCESSING_REPORT_BY_ID";
var GET_INQUIRY_BY_STATUS_ADMINISTRABLE = "GET_INQUIRY_BY_STATUS_ADMINISTRABLE";

var service_name = "processingReportInquiryService";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

function handleGet(parameters, userId) {
    var res = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_INQUIRY_BY_STATUS) {
        	if (parameters[0].value <= 0 || isNaN(parameters[0].value)){
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "inquiryServices/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (should be a valid id)"
                );
            } else {
            	res = inquiry.getInquiryByStatus(parameters[0].value);
            }
        } else if (parameters[0].name === GET_INQUIRY_BY_STATUS_ADMINISTRABLE) {
        	if (isNaN(parameters[0].value) || parameters[0].value < 0 || !parameters[0].value){
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "inquiryServices/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (should be 1 or 0)"
                );
            } else {
            	res = inquiry.getInquiryByStatusAdministrable(parameters[0].value, userId);
            }
        } else if (parameters[0].name === GET_INQUIRY_PROCESSING_REPORT_BY_ID) {
        	if (parameters[0].value <= 0 || isNaN(parameters[0].value)){
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "inquiryServices/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (should be a valid id)"
                );
            } else {
            	res = inquiry.getInquiryById(parameters[0].value, userId);
            }
        } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "inquiryServices/handleGet",
                "invalid parameter name "+ parameters[0].name + " (can be: GET_INQUIRY_BY_STATUS, GET_INQUIRY_BY_STATUS_ADMINISTRABLE or GET_INQUIRY_PROCESSING_REPORT_BY_ID)"
                );
        }
    } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "inquiryServices/handleGet",
                "invalid parameter name (can be: GET_INQUIRY_BY_STATUS, GET_INQUIRY_BY_STATUS_ADMINISTRABLE or GET_INQUIRY_PROCESSING_REPORT_BY_ID)"
                );
        }
    return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

function handlePut(reqBody, userId) {
	var req = {};
    req = inquiry.updateInquiryStatus(reqBody, userId);
    inquiry.sendMailByStatus(reqBody.INQUIRY_ID, reqBody.STATUS_ID, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

//Not Implemented Method
function handleDelete() {
    return httpUtil.notImplementedMethod();
}

//Not Implemented Method
function handlePost() {
    return httpUtil.notImplementedMethod();
}

processRequest();