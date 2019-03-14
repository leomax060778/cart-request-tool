/** **** libs *********** */
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var http = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var vendorCI = mapper.getVendorContactInformation();

/** ***GET PARAMETERS *** */

var GET_VENDOR_CONTACT_INFORMATION_BY_VENDOR_ID = "GET_VENDOR_CONTACT_INFORMATION_BY_VENDOR_ID";
var GET_ALL_VENDOR_CONTACT_INFORMATION = "GET_ALL_VENDOR_CONTACT_INFORMATION";
var GET_ALL_VENDOR_FOR_ALTERNATIVE_CONTACT = "GET_ALL_VENDOR_FOR_ALTERNATIVE_CONTACT";
var GET_ALL_VENDOR_FOR_EXTEND_VENDOR_REQUEST = "GET_ALL_VENDOR_FOR_EXTEND_VENDOR_REQUEST";
var GET_ALL_VENDOR_FOR_CHANGE_VENDOR_REQUEST = "GET_ALL_VENDOR_FOR_CHANGE_VENDOR_REQUEST";
var GET_VENDOR_CONTACT_INFORMATION_BY_ID = "GET_VENDOR_CONTACT_INFORMATION_BY_ID";
var GET_ALTERNATIVE_VENDOR_CONTACT_BY_VENDOR_ID = "GET_ALTERNATIVE_VENDOR_CONTACT_BY_VENDOR_ID";
var GET_EXTEND_CONTACT_INFO_BY_LEGAL_NAME_ACCOUNT = "GET_EXTEND_CONTACT_INFO_BY_LEGAL_NAME_ACCOUNT";
var GET_CHANGE_CONTACT_INFO_BY_NAME_ACCOUNT = "GET_CHANGE_CONTACT_INFO_BY_NAME_ACCOUNT";
var UPDATE_DEFAULT_VENDOR_CONTACT_INFORMATION = "UPDATE_DEFAULT_VENDOR_CONTACT_INFORMATION";
var UPD_VENDOR_CONTACT_INFORMATION_MASK = "UPD_VENDOR_CONTACT_INFORMATION_MASK";
var UPD_ALTERNATIVE_VENDOR_MASK = "UPD_ALTERNATIVE_VENDOR_MASK";
var UPD_EXTEND_VENDOR_CONTACT_MASK = "UPD_EXTEND_VENDOR_CONTACT_MASK";
var UPD_CHANGE_VENDOR_CONTACT_MASK = "UPD_CHANGE_VENDOR_CONTACT_MASK";

var service_name = "vendorContactInformationService";

/** *************************************** */

function processRequest() {
    http.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

function handleGet(parameters, userId) {
    var res = {};
    if (parameters.length > 0) {
        switch (parameters[0].name) {
            case GET_VENDOR_CONTACT_INFORMATION_BY_ID:
                if (parameters[0].value <= 0 || isNaN(parameters[0].value)) {
                    throw ErrorLib.getErrors().BadRequest("", "", "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (must be a valid id)"
                    );
                } else {
                    res = vendorCI.getVendorContactInformationById(parameters[0].value, userId);
                }
                break;
            case GET_VENDOR_CONTACT_INFORMATION_BY_VENDOR_ID:
                if (parameters[0].value <= 0 || isNaN(parameters[0].value)) {
                    throw ErrorLib.getErrors().BadRequest("", "", "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (must be a valid id)"
                    );
                } else {
                    res = vendorCI.getVendorContactInformationByVendorId(parameters[0].value, userId);
                }
                break;
            case GET_ALTERNATIVE_VENDOR_CONTACT_BY_VENDOR_ID:
                if (parameters[0].value <= 0 || isNaN(parameters[0].value)) {
                    throw ErrorLib.getErrors().BadRequest("", "", "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (must be a valid id)"
                    );
                } else {
                    res = vendorCI.getAlternativeVendorContactByVendorId(parameters[0].value, userId);
                }
                break;
            case GET_EXTEND_CONTACT_INFO_BY_LEGAL_NAME_ACCOUNT:
                if (parameters.length === 3) {
                    res = vendorCI.getExtendVendorContactByVendor(parameters[1].value, parameters[2].value, userId);
                } else {
                    throw ErrorLib.getErrors().BadRequest("", "", "invalid number of parameters. Must be GET_EXTEND_CONTACT_INFO_BY_LEGAL_NAME_ACCOUNT, vendorLegalName and vendorAccount");
                }
                break;
            case GET_CHANGE_CONTACT_INFO_BY_NAME_ACCOUNT:
                if (parameters.length === 3) {
                    res = vendorCI.getChangeVendorContactByVendor(parameters[1].value, parameters[2].value, userId);
                } else {
                    throw ErrorLib.getErrors().BadRequest("", "", "invalid number of parameters. Must be GET_CHANGE_CONTACT_INFO_BY_LEGAL_NAME_ACCOUNT, vendorName and vendorAccount");
                }
                break;
            case GET_ALL_VENDOR_FOR_ALTERNATIVE_CONTACT:
                res = vendorCI.getAllVendorForAlternativeContact(userId);
                break;
            case GET_ALL_VENDOR_FOR_EXTEND_VENDOR_REQUEST:
                res = vendorCI.getAllVendorForExtendVendorRequest(userId);
                break;
            case GET_ALL_VENDOR_FOR_CHANGE_VENDOR_REQUEST:
                res = vendorCI.getAllVendorForChangeVendorRequest(userId);
                break;
            case GET_ALL_VENDOR_CONTACT_INFORMATION:
                res = vendorCI.getAllVendorContactInformation(userId);
                break;
            default:
                throw ErrorLib.getErrors().BadRequest("", "", "invalid parameter (can be: GET_VENDOR_CONTACT_INFORMATION_BY_ID, GET_VENDOR_CONTACT_INFORMATION_BY_VENDOR_ID, GET_ALTERNATIVE_VENDOR_CONTACT_BY_VENDOR_ID, GET_ALL_VENDOR_FOR_ALTERNATIVE_CONTACT, GET_ALL_VENDOR_CONTACT_INFORMATION)");
        }
    } else {
        throw ErrorLib.getErrors().BadRequest("", "", "invalid parameter (can be: GET_VENDOR_CONTACT_INFORMATION_BY_ID, GET_VENDOR_CONTACT_INFORMATION_BY_VENDOR_ID, GET_ALTERNATIVE_VENDOR_CONTACT_BY_VENDOR_ID, GET_ALL_VENDOR_FOR_ALTERNATIVE_CONTACT, GET_ALL_VENDOR_CONTACT_INFORMATION)");
    }
    return http.handleResponse(res, http.OK, http.AppJson);
}

function handlePost(reqBody, userId) {
    var req = vendorCI.insertVendorContactInformation(reqBody, userId);
    return http.handleResponse(req, http.OK, http.AppJson);
}

function handlePut(reqBody, userId) {
    var req;
    switch (reqBody.METHOD) {
        case UPDATE_DEFAULT_VENDOR_CONTACT_INFORMATION:
            req = vendorCI.updateDefaultVendorContactInformation(reqBody, userId);
            break;
        case UPD_VENDOR_CONTACT_INFORMATION_MASK:
            req = vendorCI.updateVendorContactInformationMask(reqBody, userId);
            break;
        case UPD_ALTERNATIVE_VENDOR_MASK:
            req = vendorCI.updateAlternativeVendorMask(reqBody, userId);
            break;
        case UPD_EXTEND_VENDOR_CONTACT_MASK:
            req = vendorCI.updateExtendVendorContactMask(reqBody, userId);
            break;
        case UPD_CHANGE_VENDOR_CONTACT_MASK:
            req = vendorCI.updateChangeVendorContactMask(reqBody, userId);
            break;
        default:
            req = vendorCI.updateVendorContactInformation(reqBody, userId);
    }
    return http.handleResponse(req, http.OK, http.AppJson);

}

function handleDelete(reqBody, userId) {
    var req = vendorCI.deleteVendorContactInformation(reqBody, userId);
    return http.handleResponse(req, http.OK, http.AppJson);
}

processRequest();