$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();

var requestInquiry = mapper.getVendorRequestInquiry();
var attachmentVendor = mapper.getAttachmentVendor();

var request = mapper.getVendorRequest();
var inquiry = mapper.getVendorInquiry();
var extend = mapper.getExtendVendorRequest();
var change = mapper.getChangeVendorRequest();

var selection = mapper.getChangeVendorSelection();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_VENDOR_REQUEST_INQUIRY = "GET_ALL_VENDOR_REQUEST_INQUIRY";
var GET_VENDOR_INQUIRY_BY_ID = "GET_VENDOR_INQUIRY_BY_ID";
var GET_VENDOR_REQUEST_BY_ID = "GET_VENDOR_REQUEST_BY_ID";
var GET_EXTEND_VENDOR_REQUEST_BY_ID = "GET_EXTEND_VENDOR_REQUEST_BY_ID";
var GET_CHANGE_VENDOR_REQUEST_BY_ID = "GET_CHANGE_VENDOR_REQUEST_BY_ID";
var GET_LAST_ID = "GET_LAST_ID";
var EDITION_MODE = "EDITION_MODE";
var deleteAttachment = "DELETE_ATTACHMENT";

var service_name = "vendorRequestInquiryService";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}


function handleGet(parameters, userId) {
    var res = {};
    var resSelection;
    var resChange;
    if (parameters.length > 0) {
        if (parameters[0].name === GET_ALL_VENDOR_REQUEST_INQUIRY) {
            res = requestInquiry.getAllVendorRequestInquiry(userId);
        } else if (parameters[0].name === GET_LAST_ID) {
            if (!parameters[0].value) {
                throw ErrorLib.getErrors().CustomError("", "", "Invalid parameter " + parameters[0].value + " for vendorRequestInquiryId. It can be EXTEND, CHANGE, REQUEST or INQUIRY");
            }
            res = requestInquiry.getLastId(parameters[0].value);
        } else if (parameters[0].name === GET_VENDOR_INQUIRY_BY_ID) {
            if (parameters[0].value <= 0 || isNaN(parameters[0].value)) {
                throw ErrorLib.getErrors().BadRequest("", "",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (should be a valid id)"
                );
            } else {
                if (parameters[1] && parameters[1].name === EDITION_MODE) {
                    res = inquiry.getVendorInquiryById(parameters[0].value, userId, parameters[1].value);
                } else {
                    res = inquiry.getVendorInquiryById(parameters[0].value, userId);
                }
            }
        } else if (parameters[0].name === GET_VENDOR_REQUEST_BY_ID) {
            if (parameters[0].value <= 0 || isNaN(parameters[0].value)) {
                throw ErrorLib.getErrors().BadRequest("", "",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (should be a valid id)"
                );
            } else {
                if (parameters[1] && parameters[1].name === EDITION_MODE) {
                    res = request.getVendorRequestById(parameters[0].value, userId, parameters[1].value);
                } else {
                    res = request.getVendorRequestById(parameters[0].value, userId);
                }
            }
        } else if (parameters[0].name === GET_EXTEND_VENDOR_REQUEST_BY_ID) {
            if (parameters[0].value <= 0 || isNaN(parameters[0].value)) {
                throw ErrorLib.getErrors().BadRequest("", "",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (should be a valid id)"
                );
            } else {
                if (parameters[1] && parameters[1].name === EDITION_MODE) {
                    res = extend.getExtendVendorRequestById(parameters[0].value, userId, parameters[1].value);
                } else {
                    res = extend.getExtendVendorRequestById(parameters[0].value, userId);
                }
            }
        } else if (parameters[0].name === GET_CHANGE_VENDOR_REQUEST_BY_ID) {
            if (parameters[0].value <= 0 || isNaN(parameters[0].value)) {
                throw ErrorLib.getErrors().BadRequest("", "",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (should be a valid id)"
                );
            } else {
                if (parameters[1] && parameters[1].name === EDITION_MODE) {
                    resSelection = selection.getChangeSelectionByIdManual(parameters[0].value);
                    resChange = change.getChangeVendorRequestById(parameters[0].value, userId, parameters[1].value);
                } else {
                    resSelection = selection.getChangeSelectionByIdManual(parameters[0].value);
                    resChange = change.getChangeVendorRequestById(parameters[0].value, userId);
                }
                res = {'changeVendor': resChange, 'selection': resSelection};
            }
        } else {
            throw ErrorLib.getErrors().BadRequest("", "",
                "invalid parameter name " + parameters[0].name + " (can be: GET_ALL_VENDOR_REQUEST_INQUIRY, GET_VENDOR_INQUIRY_BY_ID, GET_VENDOR_REQUEST_BY_ID, GET_EXTEND_VENDOR_REQUEST_BY_ID, GET_CHANGE_VENDOR_REQUEST_BY_ID or GET_LAST_ID)"
            );
        }
    } else {
        throw ErrorLib.getErrors().BadRequest("", "",
            "invalid parameter (can be: GET_ALL_VENDOR_REQUEST_INQUIRY, GET_VENDOR_INQUIRY_BY_ID, GET_VENDOR_REQUEST_BY_ID, GET_EXTEND_VENDOR_REQUEST_BY_ID, GET_CHANGE_VENDOR_REQUEST_BY_ID or GET_LAST_ID)"
        );
    }
    return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

function handlePut(reqBody, userId) {
    var res;
    var method = httpUtil.getUrlParameters();
    if (method.length > 0) {
        if (method.get("METHOD") === deleteAttachment) {
            res = attachmentVendor.deleteAttachment(reqBody, userId);
        } else {
            throw ErrorLib.getErrors().BadRequest("", "", "invalid parameter name (can be: DELETE_ATTACHMENT)");
        }
    } else {
        if (reqBody.VENDOR_INQUIRY_ID) {
            res = inquiry.updateVendorInquiry(reqBody, userId);
            inquiry.sendResubmitMail(reqBody.VENDOR_INQUIRY_ID, userId);
        } else if (reqBody.VENDOR_REQUEST_ID) {
            res = request.updateVendorRequest(reqBody, userId);
            request.sendResubmitMail(reqBody.VENDOR_REQUEST_ID, userId);
        } else if (reqBody.EXTEND_VENDOR_REQUEST_ID) {
            res = extend.updateExtendVendorRequest(reqBody, userId);
            extend.sendResubmitMail(reqBody.EXTEND_VENDOR_REQUEST_ID, userId);
        } else if (reqBody.CHANGE_VENDOR_REQUEST_ID) {
            selection.updateChangeSelectionManual(reqBody, userId);
            res = change.updateChangeVendorRequest(reqBody, userId);
            change.sendResubmitMail(reqBody.CHANGE_VENDOR_REQUEST_ID, userId);
        } else {
            throw ErrorLib.getErrors().CustomError("", "",
                "The object reqBody is invalid. Must be included one of the following id: VENDOR_INQUIRY_ID, VENDOR_REQUEST_ID, EXTEND_VENDOR_REQUEST_ID or CHANGE_VENDOR_REQUEST_ID");
        }
    }
    return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
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