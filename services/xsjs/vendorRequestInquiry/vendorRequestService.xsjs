$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var request = mapper.getVendorRequest();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_VENDOR_REQUEST = "GET_ALL_VENDOR_REQUEST";

var service_name = "vendorRequestService";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

function handleGet(parameters) {
    var res = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_ALL_VENDOR_REQUEST) {
            res = request.getAllVendorRequest(parameters[0].value);
        } else {
            throw ErrorLib.getErrors().BadRequest("", "", "invalid parameter name " + parameters[0].name + " (must be: GET_ALL_VENDOR_REQUEST)");
        }
    } else {
        throw ErrorLib.getErrors().BadRequest("", "", "invalid parameter (must be: GET_ALL_VENDOR_REQUEST)");
    }
    return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

function handlePut(reqBody, userId) {
    var res = request.updateVendorRequest(reqBody, userId);
    return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

//Not Implemented Method
function handleDelete() {
    return httpUtil.notImplementedMethod();
}

function handlePost(reqBody, userId) {
    var res = request.insertVendorRequestManual(reqBody, userId);
    return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

processRequest();