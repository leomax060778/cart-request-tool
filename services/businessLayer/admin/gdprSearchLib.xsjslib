/** *************Import Library****************** */
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataSearch = mapper.getDataGDPRSearch();
var ErrorLib = mapper.getErrors();
var vendorContact = mapper.getVendorContactInformation();
var changeVendorLib = mapper.getChangeVendorRequest();
var extendVendorLib = mapper.getExtendVendorRequest();
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
    personalData.SEARCH_CRITERIA = validateSearchCriteria(objParam);
    var searchData = dataSearch.searchPersonalData(personalData);
    return parseSearchData(searchData);
}

function validateSearchCriteria(objParam) {
    objParam.SEARCH_CRITERIA = objParam.SEARCH_CRITERIA.toLowerCase();
    objParam.SEARCH_CRITERIA = replaceAll(objParam.SEARCH_CRITERIA, "*", "");
    objParam.SEARCH_CRITERIA = replaceAll(objParam.SEARCH_CRITERIA, "-", "");
    objParam.SEARCH_CRITERIA = replaceAll(objParam.SEARCH_CRITERIA, " ", " OR ");
    return objParam.SEARCH_CRITERIA || "";
}

function parseSearchData(searchData) {
    var searchObject = {};
    searchData.forEach(function (elem, index) {
        var userKeyAux = elem.USERNAME.toUpperCase() + index;
        var contactName = elem.CONTACT_NAME.length > 0 ? elem.CONTACT_NAME.toUpperCase() : userKeyAux;
        searchObject[contactName] = searchObject[contactName] || {};
        searchObject[contactName][elem.KEY_ID] = searchObject[contactName][elem.KEY_ID] || {};
        if (elem.USERNAME.length > 0) {
            searchObject[contactName][elem.KEY_ID].USER_KEY_AUX = userKeyAux;
        }
        searchObject[contactName][elem.KEY_ID].USERNAME = elem.USERNAME;
        searchObject[contactName][elem.KEY_ID].FIRST_NAME = elem.FIRST_NAME;
        searchObject[contactName][elem.KEY_ID].LAST_NAME = elem.LAST_NAME;
        searchObject[contactName][elem.KEY_ID].CONTACT_NAME = elem.CONTACT_NAME;
        searchObject[contactName][elem.KEY_ID].SUBJECT_TYPE = elem.SUBJECT_TYPE;
        searchObject[contactName][elem.KEY_ID].KEY_ID = elem.KEY_ID;
        searchObject[contactName][elem.KEY_ID].ID = searchObject[contactName][elem.KEY_ID].ID || [];
        searchObject[contactName][elem.KEY_ID].ID.push(elem.DATA_SUBJECT_ID);

    });
    return searchObject;
}

function replaceAll(string, search, replacement) {
    return string.split(search).join(replacement);
}

function updateVendorContactInformationMask(reqBody, userId) {
    return vendorContact.updateVendorContactInformationMask(reqBody, userId);
}

function updateChangeVendorContactMask(reqBody, userId) {
    return vendorContact.updateChangeVendorContactMask(reqBody, userId);
}

function updateExtendVendorContactMask(reqBody, userId) {
    return vendorContact.updateExtendVendorContactMask(reqBody, userId);
}

function updateRequestVendorMask(reqBody, userId) {
    var result = 0;
    var personalData = {};
    personalData.SEARCH_CRITERIA = validateSearchCriteria(reqBody);
    var searchData = dataSearch.searchPersonalData(personalData);
    var parsedData = parseSearchData(searchData);
    var subjectType = reqBody.SUBJECT_TYPE;
    var differentId = false;
    reqBody[subjectType].forEach(function (elem) {
        if (parsedData[reqBody.CONTACT_NAME][reqBody.SUBJECT_TYPE].ID.indexOf(elem) === -1) {
            differentId = true;
        }
    });
    if (differentId) {
        throw ErrorLib.getErrors().BadRequest("", "",
            "The list of data to protect does not match with the data in the data base"
        );
    } else {
        switch (subjectType) {
            case "ALTERNATIVE_CONTACT":
                result = vendorContact.updateAlternativeVendorMask(reqBody, userId);
                break;
            case "NON_SAP_VENDOR":
                result = nonSapVendor.updateNonSapVendorMask(reqBody, userId);
                break;
            default:
                throw ErrorLib.getErrors().BadRequest("", "",
                    "invalid subject type (it should be: ALTERNATIVE_CONTACT, VENDOR_CONTACT or NON_SAP_VENDOR)"
                );
        }
    }
    return result;
}