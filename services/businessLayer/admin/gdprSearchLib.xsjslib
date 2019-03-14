/** *************Import Library****************** */
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataSearch = mapper.getDataGDPRSearch();
var ErrorLib = mapper.getErrors();
var vendorContact = mapper.getVendorContactInformation();
var changeVendorLib = mapper.getChangeVendorRequest();
var extendVendorLib = mapper.getExtendVendorRequest();
var requestLib = mapper.getRequest();
var nonSapVendor = mapper.getNonSapVendor();

/** ********************************************** */

function searchPersonalData(parameters) {
    var personalData = {
        SEARCH_CRITERIA: ""
    };
    var objParam = {};
    var parameterIndex = Object.keys(parameters);
    parameterIndex.forEach(function (index) {
        objParam[parameters[index].name] = parameters[index].value;
    });
    // Validation to avoid code injection
    objParam.SEARCH_CRITERIA = objParam.SEARCH_CRITERIA.toLowerCase();
    objParam.SEARCH_CRITERIA = replaceAll(objParam.SEARCH_CRITERIA, "*", "");
    objParam.SEARCH_CRITERIA = replaceAll(objParam.SEARCH_CRITERIA, "-", "");
    objParam.SEARCH_CRITERIA = replaceAll(objParam.SEARCH_CRITERIA, " ", " OR ");
    personalData.SEARCH_CRITERIA = objParam.SEARCH_CRITERIA || "";
    return dataSearch.searchPersonalData(personalData);
}

function replaceAll(string, search, replacement) {
    return string.split(search).join(replacement);
}

function updateVendorContactInformationMask(reqBody, userId) {
    return vendorContact.updateVendorContactInformationMask(reqBody, userId);
}

function updateChangeVendorContactMask(reqBody, userId) {
    var changeVendorRequest = changeVendorLib.getChangeVendorRequestById(reqBody.CHANGE_VENDOR_REQUEST_ID, userId);
    var personalData = {};
    personalData.CHANGE_VENDOR_REQUEST_ID = reqBody.CHANGE_VENDOR_REQUEST_ID;
    personalData.VENDOR_NAME = changeVendorRequest.VENDOR_NAME;
    personalData.VENDOR_ACCOUNT = changeVendorRequest.VENDOR_ACCOUNT;
    personalData.VENDOR_CONTACT_EMAIL = changeVendorRequest.VENDOR_CONTACT_EMAIL;
    personalData.VENDOR_CONTACT_NAME = changeVendorRequest.VENDOR_CONTACT_NAME;

    return vendorContact.updateChangeVendorContactMask(personalData, userId);
}

function updateExtendVendorContactMask(reqBody, userId) {
    var extendVendorRequest = extendVendorLib.getExtendVendorRequestById(reqBody.EXTEND_VENDOR_REQUEST_ID, userId);
    var personalData = {};
    personalData.EXTEND_VENDOR_REQUEST_ID = reqBody.EXTEND_VENDOR_REQUEST_ID;
    personalData.VENDOR_LEGAL_NAME = extendVendorRequest.VENDOR_LEGAL_NAME;
    personalData.CONTACT_EMAIL = extendVendorRequest.VENDOR_CONTACT_EMAIL;
    personalData.CONTACT_NAME = extendVendorRequest.VENDOR_CONTACT_NAME;

    return vendorContact.updateExtendVendorContactMask(personalData, userId);
}

function updateRequestVendorMask(reqBody, userId) {
    var result = 0;
    var subjectType = reqBody.SUBJECT_TYPE;
    var request = requestLib.getRequestById(reqBody[subjectType], userId);
    var personalData = {};
    switch (subjectType) {
        case "ALTERNATIVE_CONTACT":
            personalData.VENDOR_ID = request.VENDOR_ID;
            personalData.CONTACT_NAME = request.ALTERNATIVE_VENDOR_NAME;
            result = vendorContact.updateAlternativeVendorMask(personalData, userId);
            break;
        case "VENDOR_CONTACT":
            personalData.VENDOR_CONTACT_INFORMATION_ID = request.VENDOR_CONTACT_INFORMATION_ID;
            result = vendorContact.updateVendorContactInformationMask(personalData, userId);
            break;
        case "NON_SAP_VENDOR":
            personalData.NON_SAP_VENDOR_ID = request.NON_SAP_VENDOR_ID;
            result = nonSapVendor.updateNonSapVendorMask(personalData, userId);
            break;
        default:
            throw ErrorLib.getErrors().BadRequest("", "",
                "invalid subject type (it should be: ALTERNATIVE_CONTACT, VENDOR_CONTACT or NON_SAP_VENDOR)"
            );
    }
    return result;
}