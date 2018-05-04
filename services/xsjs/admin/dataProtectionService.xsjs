/****** libs ************/
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var dataProtectionLib = mapper.getUserDataProtection();
var config = mapper.getDataConfig();

var GET_ALL_USER_DATA_PROTECTION = "GET_ALL_USER_DATA_PROTECTION";
var GET_ALL_DATA_PROTECTION_REQUEST_STATUS = "GET_ALL_DATA_PROTECTION_REQUEST_STATUS";

var serviceName = "userDataProtectionService";

/******************************************/

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, serviceName);
}

function handleGet(parameters, userId) {
    var result = [];
    if (parameters.length > 0) {
        switch (parameters[0].name) {
            case GET_ALL_USER_DATA_PROTECTION:
                result = dataProtectionLib.getAllUserDataProtection(userId);
                break;
            case GET_ALL_DATA_PROTECTION_REQUEST_STATUS:
                result = dataProtectionLib.getAllDataProtectionStatus(userId);
                break;
            default:
                throw ErrorLib.getErrors().BadRequest("", "", "invalid parameter value (should be GET_ALL_USER_DATA_PROTECTION)");
        }
    } else {
        throw ErrorLib.getErrors().BadRequest("", "",
            "invalid parameter name " + parameters[0].name + " (it can be: GET_ALL_USER_DATA_PROTECTION)"
        );
    }

    return httpUtil.handleResponse(result, httpUtil.OK, httpUtil.AppJson);
}

function handlePost() {
    return httpUtil.notImplementedMethod();
}

function handlePut(reqBody, userSessionID) {
    var result = dataProtectionLib.updateDataProtectionStatus(reqBody, userSessionID);
    return httpUtil.handleResponse(result, httpUtil.OK, httpUtil.AppJson);
}

function handleDelete() {
    return httpUtil.notImplementedMethod();
}

//Call request processing  
processRequest();