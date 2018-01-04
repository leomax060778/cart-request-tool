$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;

var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();

var userLib = mapper.getUser();
var businessVendorRequest = mapper.getVendorRequest();

var mail = mapper.getMail();
var vendorRequestMail = mapper.getVendorMail();

/** ***************************************************** **/

var pathName = "VENDOR_REQUEST";

var mailTypeMap = {
    RESUBMIT: "resubmit",
    SUBMIT: "submit",
    NEW_MESSAGE: "newMessage",
    FYI_MESSAGE: "fyiMessage",
    RETURN_TO_REQUESTER_MESSAGE: "returnToRequesterMessage",
    STATUS_IN_PROCESS: "statusInProcess",
    STATUS_APPROVED: "statusApproved",
    STATUS_CANCELLED: "statusCancelled"
};

var statusMap = {'TO_BE_CHECKED': 1, 'CHECKED': 2, 'IN_PROCESS': 3, 'RETURN_TO_REQUESTER': 4, 'APPROVED': 5, 'CANCELLED': 6};

/** ************************ OBTAIN BASIC INFORMATION ************************ **/

function getUserInfoById(requesterId){
    var userData = userLib.getUserById(requesterId);
    return (userData.length > 0)? userData[0]: null;
}

function getRequesterByVendorRequestId(vendorRequestId, currentUserId){
    var request = businessVendorRequest.getVendorRequestById(vendorRequestId, currentUserId);
    if(request){
        return getUserInfoById(request.CREATED_USER_ID);
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

function sendMailToRequester(vendorRequestMailObj, mailType){
    var mailObj;
    var requester = getRequesterByVendorRequestId(vendorRequestMailObj.VENDOR_REQUEST_ID, vendorRequestMailObj.CURRENT_USER_ID);
    var requesterFullName = requester.FIRST_NAME + " " + requester.LAST_NAME + ", " + requester.USER_NAME;

    var currentUser = getCurrentUserInformationByUserId(vendorRequestMailObj.CURRENT_USER_ID);
    vendorRequestMailObj.CURRENT_USER_ROLE = currentUser.CURRENT_USER_ROLE;
    vendorRequestMailObj.CURRENT_USER_NAME = currentUser.CURRENT_USER_NAME;

    switch(mailType){
        case mailTypeMap.SUBMIT:
            mailObj = vendorRequestMail.parseSubmit(vendorRequestMailObj, getBasicData(pathName, {}, true), requesterFullName);
            break;
        case mailTypeMap.RESUBMIT:
            mailObj = vendorRequestMail.parseResubmitted(vendorRequestMailObj, getBasicData(pathName,{}, true), requesterFullName);
            break;
        case mailTypeMap.NEW_MESSAGE:
            mailObj = vendorRequestMail.parseMessage(vendorRequestMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, true), requesterFullName);
            break;
        case mailTypeMap.FYI_MESSAGE:
            mailObj = vendorRequestMail.parseFYI(vendorRequestMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, true), requesterFullName);
            break;
        case mailTypeMap.RETURN_TO_REQUESTER_MESSAGE:
            mailObj = vendorRequestMail.parseReturnToRequest(vendorRequestMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, true), requesterFullName);
            break;
        case mailTypeMap.STATUS_IN_PROCESS:
            mailObj = vendorRequestMail.parseInProcess(vendorRequestMailObj, getBasicData(pathName,{}, true), requesterFullName);
            break;
        case mailTypeMap.STATUS_APPROVED:
            mailObj = vendorRequestMail.parseApproved(vendorRequestMailObj, getBasicData(pathName,{}, true), requesterFullName);
            break;
        case mailTypeMap.STATUS_CANCELLED:
            mailObj = vendorRequestMail.parseCancelled(vendorRequestMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, true), requesterFullName);
            break;
    }

    var emailObj = mail.getJson([{address: requester.EMAIL}], mailObj.subject, mailObj.body, null, null);

    mail.sendMail(emailObj, true, null);
}

function sendMailToAdmin(vendorRequestMailObj, mailType){
    var defaultUserName = "CRT Admin";
    var mailObj;

    var currentUser = getCurrentUserInformationByUserId(vendorRequestMailObj.CURRENT_USER_ID);
    vendorRequestMailObj.CURRENT_USER_ROLE = currentUser.CURRENT_USER_ROLE;
    vendorRequestMailObj.CURRENT_USER_NAME = currentUser.CURRENT_USER_NAME;
    var toProcessingReport = true;
    switch(mailType){
        case mailTypeMap.RESUBMIT:
            mailObj = vendorRequestMail.parseResubmitted(vendorRequestMailObj, getBasicData(pathName, {}, false, true), defaultUserName);
            break;
        case mailTypeMap.SUBMIT:
            mailObj = vendorRequestMail.parseSubmit(vendorRequestMailObj, getBasicData(pathName, {}, false, true), defaultUserName);
            break;
        case mailTypeMap.NEW_MESSAGE:
        	toProcessingReport = !((Number(vendorRequestMailObj.STATUS_ID) === statusMap.APPROVED) || (Number(vendorRequestMailObj.STATUS_ID) === statusMap.CANCELLED));
            mailObj = vendorRequestMail.parseMessage(vendorRequestMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, false, toProcessingReport), defaultUserName);
            break;
        case mailTypeMap.FYI_MESSAGE:
        	toProcessingReport = !((Number(vendorRequestMailObj.STATUS_ID) === statusMap.APPROVED) || (Number(vendorRequestMailObj.STATUS_ID) === statusMap.CANCELLED));
            mailObj = vendorRequestMail.parseFYI(vendorRequestMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, false, toProcessingReport), defaultUserName);
            break;
        case mailTypeMap.RETURN_TO_REQUESTER_MESSAGE:
            mailObj = vendorRequestMail.parseReturnToRequest(vendorRequestMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, false, true), defaultUserName);
            break;
        case mailTypeMap.STATUS_IN_PROCESS:
            mailObj = vendorRequestMail.parseInProcess(vendorRequestMailObj, getBasicData(pathName, {}, false, true), defaultUserName);
            break;
        case mailTypeMap.STATUS_APPROVED:
            mailObj = vendorRequestMail.parseApproved(vendorRequestMailObj, getBasicData(pathName), defaultUserName);
            break;
        case mailTypeMap.STATUS_CANCELLED:
            mailObj = vendorRequestMail.parseCancelled(vendorRequestMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}), defaultUserName);
            break;
    }

    var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);

    mail.sendMail(emailObj, true, null);
}

/** ************************ SEND EMAIL FUNCTIONS ************************ **/
//Send Submit Mail
function sendSubmitMail(vendorRequestId, userId){
    var vendorRequestObj = {};
    vendorRequestObj.VENDOR_REQUEST_ID = vendorRequestId;
    vendorRequestObj.CURRENT_USER_ID = userId;

    sendMailToAdmin(vendorRequestObj, "submit");
}

//Send Resubmit Mail
function sendResubmitMail(vendorRequestId, userId) {
    var vendorRequestMailObj = {};
    vendorRequestMailObj.VENDOR_REQUEST_ID = vendorRequestId;
    vendorRequestMailObj.CURRENT_USER_ID = userId;

    sendMailToAdmin(vendorRequestMailObj, "resubmit");
}

function sendMessageMail(vendorRequest, userId, fromProcessingReport){
    var vendorRequestMailObj = {};
    vendorRequestMailObj.VENDOR_REQUEST_ID = vendorRequest.VENDOR_REQUEST_ID;
    vendorRequestMailObj.CURRENT_USER_ID = userId;
    vendorRequestMailObj.STATUS_ID = vendorRequest.PREVIOUS_STATUS_ID;

    if (fromProcessingReport) {
    	sendMailToRequester(vendorRequestMailObj, "newMessage");
    } else {
    	sendMailToAdmin(vendorRequestMailObj, "newMessage");
    }
}

function sendFYIMail(vendorRequest, userId, fromProcessingReport){
    var vendorRequestMailObj = {};
    vendorRequestMailObj.VENDOR_REQUEST_ID = vendorRequest.VENDOR_REQUEST_ID;
    vendorRequestMailObj.CURRENT_USER_ID = userId;
    vendorRequestMailObj.STATUS_ID = vendorRequest.PREVIOUS_STATUS_ID;

    if (fromProcessingReport) {
    	sendMailToRequester(vendorRequestMailObj, "fyiMessage");
    } else {
    	sendMailToAdmin(vendorRequestMailObj, "fyiMessage");
    }
}

function sendReturnToRequestMail(vendorRequestId, userId, fromProcessingReport){
    var vendorRequestMailObj = {};
    vendorRequestMailObj.VENDOR_REQUEST_ID = vendorRequestId;
    vendorRequestMailObj.CURRENT_USER_ID = userId;

    if (fromProcessingReport) {
    	sendMailToRequester(vendorRequestMailObj, "returnToRequesterMessage");
    } else {
    	sendMailToAdmin(vendorRequestMailObj, "returnToRequesterMessage");
    }
}

function sendInProcessMail(vendorRequestObj, userId){
    vendorRequestObj.CURRENT_USER_ID = userId;

    sendMailToRequester(vendorRequestObj, "statusInProcess");
}

function sendApprovedMail(vendorRequestObj, userId){
    vendorRequestObj.CURRENT_USER_ID = userId;

    sendMailToRequester(vendorRequestObj, "statusApproved");
}

function sendCancelledMail(vendorRequestObj, userId){
    vendorRequestObj.CURRENT_USER_ID = userId;

    sendMailToRequester(vendorRequestObj, "statusCancelled");
}