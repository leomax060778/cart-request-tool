$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;

var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();

var userLib = mapper.getUser();
var businessExtendVendor = mapper.getExtendVendorRequest();

var mail = mapper.getMail();
var extendVendorMail = mapper.getExtendVendorMail();

/** ***************************************************** **/

var pathName = "EXTEND_VENDOR_REQUEST";

var mailTypeMap = {
    RESUBMIT: "resubmit",
    SUBMIT: "submit",
    NEW_MESSAGE: "newMessage",
    FYI_MESSAGE: "fyiMessage",
    RETURN_TO_REQUESTER_MESSAGE: "returnToRequesterMessage",
    STATUS_APPROVED: "statusApproved",
    STATUS_IN_PROCESS: "statusInProcess",
    STATUS_CANCELLED: "statusCancelled"
};

var statusMap = {'TO_BE_CHECKED': 1, 'CHECKED': 2, 'IN_PROCESS': 3, 'RETURN_TO_REQUESTER': 4, 'APPROVED': 5, 'CANCELLED': 6};

/** ************************ OBTAIN BASIC INFORMATION ************************ **/

function getUserInfoById(requesterId){
    var userData = userLib.getUserById(requesterId);
    return (userData.length > 0)? userData[0]: null;
}

function getRequesterByExtendVendorRequestId(extendVendorRequestId, currentUserId){
    var extendVendor = businessExtendVendor.getExtendVendorRequestById(extendVendorRequestId, currentUserId);
    if(extendVendor){
        return getUserInfoById(extendVendor.CREATED_USER_ID);
    }

    return null;
}

function getCurrentUserInformationByUserId(currentUserId){
    var result = {};
    var currentUser = getUserInfoById(currentUserId);

    result.CURRENT_USER_ROLE = currentUser.ROLENAME;
    result.CURRENT_USER_NAME = currentUser.FIRST_NAME + ' ' + currentUser.LAST_NAME;

    return result;
}

function getBasicData(stringPathName, additionalParam, isRequester, toProcessingReport) {
	return isRequester ? config.getRequesterBasicData(stringPathName, additionalParam) : config.getBasicData(stringPathName, additionalParam, toProcessingReport);
}

function getUrlBase() {
    return config.getUrlBase();
}

function getEmailList() {
    return config.getEmailList();
}

function getPath(stringName) {
    return config.getPath(stringName);
}

/** ************************ END OBTAIN BASIC INFORMATION ************************ **/

function sendMailToRequester(extendVendorMailObj, mailType){
    var mailObj;
    var requester = getRequesterByExtendVendorRequestId(extendVendorMailObj.EXTEND_VENDOR_REQUEST_ID, extendVendorMailObj.CURRENT_USER_ID);
    var requesterFullName = requester.FIRST_NAME + " " + requester.LAST_NAME + ", " + requester.USER_NAME;

    var currentUser = getCurrentUserInformationByUserId(extendVendorMailObj.CURRENT_USER_ID);
    extendVendorMailObj.CURRENT_USER_ROLE = currentUser.CURRENT_USER_ROLE;
    extendVendorMailObj.CURRENT_USER_NAME = currentUser.CURRENT_USER_NAME;

    switch(mailType){
        case mailTypeMap.SUBMIT:
            mailObj = extendVendorMail.parseSubmit(extendVendorMailObj, getBasicData(pathName, {}, true), requesterFullName);
            break;
        case mailTypeMap.RESUBMIT:
            mailObj = extendVendorMail.parseResubmitted(extendVendorMailObj, getBasicData(pathName,{}, true), requesterFullName);
            break;
        case mailTypeMap.NEW_MESSAGE:
            mailObj = extendVendorMail.parseMessage(extendVendorMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, true), requesterFullName);
            break;
        case mailTypeMap.FYI_MESSAGE:
            mailObj = extendVendorMail.parseFYI(extendVendorMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, true), requesterFullName);
            break;
        case mailTypeMap.RETURN_TO_REQUESTER_MESSAGE:
            mailObj = extendVendorMail.parseReturnToRequest(extendVendorMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, true), requesterFullName);
            break;
        case mailTypeMap.STATUS_APPROVED:
            mailObj = extendVendorMail.parseApproved(extendVendorMailObj, getBasicData(pathName,{}, true), requesterFullName);
            break;
        case mailTypeMap.STATUS_IN_PROCESS:
            mailObj = extendVendorMail.parseInProcess(extendVendorMailObj, getBasicData(pathName,{}, true), requesterFullName);
            break;
        case mailTypeMap.STATUS_CANCELLED:
            mailObj = extendVendorMail.parseCancelled(extendVendorMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, true), requesterFullName);
            break;
    }

    var emailObj = mail.getJson([{address: requester.EMAIL}], mailObj.subject, mailObj.body, null, null);

    mail.sendMail(emailObj, true, null);
}

function sendMailToAdmin(extendVendorMailObj, mailType){
    var defaultUserName = "CRT Admin";
    var mailObj;

    var currentUser = getCurrentUserInformationByUserId(extendVendorMailObj.CURRENT_USER_ID);
    extendVendorMailObj.CURRENT_USER_ROLE = currentUser.CURRENT_USER_ROLE;
    extendVendorMailObj.CURRENT_USER_NAME = currentUser.CURRENT_USER_NAME;
    var toProcessingReport = true;
    switch(mailType){
        case mailTypeMap.RESUBMIT:
            mailObj = extendVendorMail.parseResubmitted(extendVendorMailObj, getBasicData(pathName, {}, false, true), defaultUserName);
            break;
        case mailTypeMap.SUBMIT:
            mailObj = extendVendorMail.parseSubmit(extendVendorMailObj, getBasicData(pathName, {}, false, true), defaultUserName);
            break;
        case mailTypeMap.NEW_MESSAGE:
        	toProcessingReport = !((Number(extendVendorMailObj.STATUS_ID) === statusMap.APPROVED) || (Number(extendVendorMailObj.STATUS_ID) === statusMap.CANCELLED));
            mailObj = extendVendorMail.parseMessage(extendVendorMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, false, toProcessingReport), defaultUserName);
            break;
        case mailTypeMap.FYI_MESSAGE:
        	toProcessingReport = !((Number(extendVendorMailObj.STATUS_ID) === statusMap.APPROVED) || (Number(extendVendorMailObj.STATUS_ID) === statusMap.CANCELLED));
            mailObj = extendVendorMail.parseFYI(extendVendorMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, false, toProcessingReport), defaultUserName);
            break;
        case mailTypeMap.RETURN_TO_REQUESTER_MESSAGE:
            mailObj = extendVendorMail.parseReturnToRequest(extendVendorMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, false, true), defaultUserName);
            break;
        case mailTypeMap.STATUS_APPROVED:
            mailObj = extendVendorMail.parseApproved(extendVendorMailObj, getBasicData(pathName), defaultUserName);
            break;
        case mailTypeMap.STATUS_IN_PROCESS:
            mailObj = extendVendorMail.parseInProcess(extendVendorMailObj, getBasicData(pathName, {}, false, true), defaultUserName);
            break;
        case mailTypeMap.STATUS_CANCELLED:
            mailObj = extendVendorMail.parseCancelled(extendVendorMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}), defaultUserName);
            break;
    }

    var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);

    mail.sendMail(emailObj, true, null);
}

/** ************************ SEND EMAIL FUNCTIONS ************************ **/
//Send Submit Mail
function sendSubmitMail(extendVendorRequestId, userId){
    var extendVendorRequestObj = {};
    extendVendorRequestObj.EXTEND_VENDOR_REQUEST_ID = extendVendorRequestId;
    extendVendorRequestObj.CURRENT_USER_ID = userId;

    sendMailToAdmin(extendVendorRequestObj, "submit");
}

//Send Resubmit Mail
function sendResubmitMail(extendVendorRequestId, userId) {
    var extendVendorRequestObj = {};
    extendVendorRequestObj.EXTEND_VENDOR_REQUEST_ID = extendVendorRequestId;
    extendVendorRequestObj.CURRENT_USER_ID = userId;

    sendMailToAdmin(extendVendorRequestObj, "resubmit");
}

function sendMessageMail(extendVendorRequest, userId, fromProcessingReport){
    var extendVendorRequestObj = {};
    extendVendorRequestObj.EXTEND_VENDOR_REQUEST_ID = extendVendorRequest.EXTEND_VENDOR_REQUEST_ID;
    extendVendorRequestObj.CURRENT_USER_ID = userId;
    extendVendorRequestObj.STATUS_ID = extendVendorRequest.PREVIOUS_STATUS_ID;

    if (fromProcessingReport) {
    	sendMailToRequester(extendVendorRequestObj, "newMessage");
    } else {
    	sendMailToAdmin(extendVendorRequestObj, "newMessage");
    }
}

function sendFYIMail(extendVendorRequest, userId, fromProcessingReport){
    var extendVendorRequestObj = {};
    extendVendorRequestObj.EXTEND_VENDOR_REQUEST_ID = extendVendorRequest.EXTEND_VENDOR_REQUEST_ID;
    extendVendorRequestObj.CURRENT_USER_ID = userId;
    extendVendorRequestObj.STATUS_ID = extendVendorRequest.PREVIOUS_STATUS_ID;

    if (fromProcessingReport) {
    	sendMailToRequester(extendVendorRequestObj, "fyiMessage");
    } else {
    	sendMailToAdmin(extendVendorRequestObj, "fyiMessage");
    }
}

function sendReturnToRequestMail(extendVendorRequestId, userId, fromProcessingReport){
    var extendVendorRequestObj = {};
    extendVendorRequestObj.EXTEND_VENDOR_REQUEST_ID = extendVendorRequestId;
    extendVendorRequestObj.CURRENT_USER_ID = userId;

    if (fromProcessingReport) {
    	sendMailToRequester(extendVendorRequestObj, "returnToRequesterMessage");
    } else {
    	sendMailToAdmin(extendVendorRequestObj, "returnToRequesterMessage");
    }
}

function sendInProcessMail(extendVendorRequestObj, userId){
    extendVendorRequestObj.CURRENT_USER_ID = userId;

    sendMailToRequester(extendVendorRequestObj, "statusInProcess");
}

function sendApprovedMail(extendVendorRequestObj, userId){
    extendVendorRequestObj.CURRENT_USER_ID = userId;

    sendMailToRequester(extendVendorRequestObj, "statusApproved");
}

function sendCancelledMail(extendVendorRequestObj, userId){
    extendVendorRequestObj.CURRENT_USER_ID = userId;

    sendMailToRequester(extendVendorRequestObj, "statusCancelled");
}