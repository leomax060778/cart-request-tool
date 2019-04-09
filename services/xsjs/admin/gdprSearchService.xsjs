/****** libs ************/
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var searchLib = mapper.getGDPRSearch();
var user = mapper.getUser();
/******************* ***********************/

var serviceName = "searchService";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, serviceName);
}

function handleGet(parameters) {
    var result = searchLib.searchPersonalData(parameters);
    return httpUtil.handleResponse(result, httpUtil.OK, httpUtil.AppJson);
}

function handlePut(reqBody, userId) {
    var parameters = httpUtil.getUrlParameters();
    var result = [];
    var protect = parameters.get('PROTECT');
    switch (protect) {
        case "USER_ID":
            reqBody.USER_ID = reqBody.USER_ID[0];
            result = user.updateUser(reqBody, userId);
            break;
        case "VENDOR_CONTACT_INFORMATION_ID":
            result = searchLib.updateVendorContactInformationMask(reqBody, userId);
            break;
        case "CHANGE_VENDOR_REQUEST_ID":
            result = searchLib.updateChangeVendorContactMask(reqBody, userId);
            break;
        case "EXTEND_VENDOR_REQUEST_ID":
            result = searchLib.updateExtendVendorContactMask(reqBody, userId);
            break;
        case "NON_SAP_VENDOR":
        case "VENDOR_CONTACT":
        case "ALTERNATIVE_CONTACT":
            result = searchLib.updateRequestVendorMask(reqBody, userId);
            break;
        default:
            throw ErrorLib.getErrors().BadRequest("", "",
                "invalid parameter PROTECT (it should be: USER_ID, VENDOR_CONTACT_INFORMATION_ID, CHANGE_VENDOR_REQUEST_ID, EXTEND_VENDOR_REQUEST_ID, NON_SAP_VENDOR, VENDOR_CONTACT or ALTERNATIVE_CONTACT)"
            );
    }
    return httpUtil.handleResponse(result, httpUtil.OK, httpUtil.AppJson);
}

function handleDelete() {
    return httpUtil.notImplementedMethod();
}

function handlePost() {
    return httpUtil.notImplementedMethod();
}

processRequest();