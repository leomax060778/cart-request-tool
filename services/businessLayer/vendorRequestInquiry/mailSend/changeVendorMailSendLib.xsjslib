$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;

var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();

var userLib = mapper.getUser();
var dataChangeVendor = mapper.getDataChangeVendorRequest();

var mail = mapper.getMail();
var changeVendorMail = mapper.getChangeVendorMail();

/** ***************************************************** **/

var pathName = "CHANGE_VENDOR_REQUEST";

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

function getRequesterByChangeVendorRequestId(changeVendorRequestId){
    var changeVendor = dataChangeVendor.getChangeVendorRequestById(changeVendorRequestId);
    if(changeVendor){
        return getUserInfoById(changeVendor.CREATED_USER_ID);
    }

    return null;
}

function getCurrentUserInformationByUserId(currentUserId){
    var result = {};
    var currentUser = getUserInfoById(currentUserId);

    result.CURRENT_USER_ROLE = currentUser.ROLENAME;
    result.CURRENT_USER_NAME = currentUser.FIRST_NAME + ' '+currentUser.LAST_NAME;

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

function sendMailToRequester(changeVendorMailObj, mailType){
    var mailObj;
    var requester = getRequesterByChangeVendorRequestId(changeVendorMailObj.CHANGE_VENDOR_REQUEST_ID, changeVendorMailObj.CURRENT_USER_ID);
    var requesterFullName = requester.FIRST_NAME + " " + requester.LAST_NAME + ", " + requester.USER_NAME;

    var currentUser = getCurrentUserInformationByUserId(changeVendorMailObj.CURRENT_USER_ID);
    changeVendorMailObj.CURRENT_USER_ROLE = currentUser.CURRENT_USER_ROLE;
    changeVendorMailObj.CURRENT_USER_NAME = currentUser.CURRENT_USER_NAME;
    
    switch(mailType){
        case mailTypeMap.SUBMIT:
            mailObj = changeVendorMail.parseSubmit(changeVendorMailObj, getBasicData(pathName, {}, true), requesterFullName);
            break;
        case mailTypeMap.RESUBMIT:
            mailObj = changeVendorMail.parseResubmitted(changeVendorMailObj, getBasicData(pathName,{}, true), requesterFullName);
            break;
        case mailTypeMap.NEW_MESSAGE:
            mailObj = changeVendorMail.parseMessage(changeVendorMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, true), requesterFullName);
            break;
        case mailTypeMap.FYI_MESSAGE:
            mailObj = changeVendorMail.parseFYI(changeVendorMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, true), requesterFullName);
            break;
        case mailTypeMap.RETURN_TO_REQUESTER_MESSAGE:
            mailObj = changeVendorMail.parseReturnToRequest(changeVendorMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, true), requesterFullName);
            break;
        case mailTypeMap.STATUS_APPROVED:
            mailObj = changeVendorMail.parseApproved(changeVendorMailObj, getBasicData(pathName,{}, true), requesterFullName);
            break;
        case mailTypeMap.STATUS_IN_PROCESS:
            mailObj = changeVendorMail.parseInProcess(changeVendorMailObj, getBasicData(pathName,{}, true), requesterFullName);
            break;
        case mailTypeMap.STATUS_CANCELLED:
            mailObj = changeVendorMail.parseCancelled(changeVendorMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, true), requesterFullName);
            break;
    }

    var emailObj = mail.getJson([{address: requester.EMAIL}], mailObj.subject, mailObj.body, null, null);

    mail.sendMail(emailObj, true, null);
}

function sendMailToAdmin(changeVendorMailObj, mailType){
    var defaultUserName = "CRT Admin";
    var mailObj;
    var currentUser = getCurrentUserInformationByUserId(changeVendorMailObj.CURRENT_USER_ID);
    changeVendorMailObj.CURRENT_USER_ROLE = currentUser.CURRENT_USER_ROLE;
    changeVendorMailObj.CURRENT_USER_NAME = currentUser.CURRENT_USER_NAME;
    var toProcessingReport = true;
    switch(mailType){
        case mailTypeMap.RESUBMIT:
            mailObj = changeVendorMail.parseResubmitted(changeVendorMailObj, getBasicData(pathName, {}, false, true), defaultUserName);
            break;
        case mailTypeMap.SUBMIT:
            mailObj = changeVendorMail.parseSubmit(changeVendorMailObj, getBasicData(pathName, {}, false, true), defaultUserName);
            break;
        case mailTypeMap.NEW_MESSAGE:
        	toProcessingReport = !((Number(changeVendorMailObj.STATUS_ID) === statusMap.APPROVED) || (Number(changeVendorMailObj.STATUS_ID) === statusMap.CANCELLED));
        	mailObj = changeVendorMail.parseMessage(changeVendorMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, false, toProcessingReport), defaultUserName);
            break;
        case mailTypeMap.FYI_MESSAGE:
        	toProcessingReport = !((Number(changeVendorMailObj.STATUS_ID) === statusMap.APPROVED) || (Number(changeVendorMailObj.STATUS_ID) === statusMap.CANCELLED));
        	mailObj = changeVendorMail.parseFYI(changeVendorMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, false, toProcessingReport), defaultUserName);
            break;
        case mailTypeMap.RETURN_TO_REQUESTER_MESSAGE:
            mailObj = changeVendorMail.parseReturnToRequest(changeVendorMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, false, true), defaultUserName);
            break;
        case mailTypeMap.STATUS_APPROVED:
            mailObj = changeVendorMail.parseApproved(changeVendorMailObj, getBasicData(pathName), defaultUserName);
            break;
        case mailTypeMap.STATUS_IN_PROCESS:
            mailObj = changeVendorMail.parseInProcess(changeVendorMailObj, getBasicData(pathName, {}, false, true), defaultUserName);
            break;
        case mailTypeMap.STATUS_CANCELLED:
            mailObj = changeVendorMail.parseCancelled(changeVendorMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}), defaultUserName);
            break;
    }

    var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);

    mail.sendMail(emailObj, true, null);
}

/** ************************ SEND EMAIL FUNCTIONS ************************ **/
//Send Submit Mail
function sendSubmitMail(changeVendorRequestId, userId){
    var changeVendorRequestObj = {};
    changeVendorRequestObj.CHANGE_VENDOR_REQUEST_ID = changeVendorRequestId;
    changeVendorRequestObj.CURRENT_USER_ID = userId;

    sendMailToAdmin(changeVendorRequestObj, "submit");
}

//Send Resubmit Mail
function sendResubmitMail(changeVendorRequestId, userId) {
    var changeVendorRequestObj = {};
    changeVendorRequestObj.CHANGE_VENDOR_REQUEST_ID = changeVendorRequestId;
    changeVendorRequestObj.CURRENT_USER_ID = userId;

    sendMailToAdmin(changeVendorRequestObj, "resubmit");
}

function sendMessageMail(changeVendorRequest, userId, fromProcessingReport){
    var changeVendorRequestObj = {};
    changeVendorRequestObj.CHANGE_VENDOR_REQUEST_ID = changeVendorRequest.CHANGE_VENDOR_REQUEST_ID;
    changeVendorRequestObj.CURRENT_USER_ID = userId;
    changeVendorRequestObj.STATUS_ID = changeVendorRequest.PREVIOUS_STATUS_ID;

    if (fromProcessingReport) {
    	sendMailToRequester(changeVendorRequestObj, "newMessage");
    } else {
    	sendMailToAdmin(changeVendorRequestObj, "newMessage");
    }
}

function sendFYIMail(changeVendorRequest, userId, fromProcessingReport){
    var changeVendorRequestObj = {};
    changeVendorRequestObj.CHANGE_VENDOR_REQUEST_ID = changeVendorRequest.CHANGE_VENDOR_REQUEST_ID;
    changeVendorRequestObj.CURRENT_USER_ID = userId;
    changeVendorRequestObj.STATUS_ID = changeVendorRequest.PREVIOUS_STATUS_ID;

    if (fromProcessingReport) {
    	sendMailToRequester(changeVendorRequestObj, "fyiMessage");
    } else {
    	sendMailToAdmin(changeVendorRequestObj, "fyiMessage");
    }
}

function sendReturnToRequestMail(changeVendorRequestId, userId, fromProcessingReport){
    var changeVendorRequestObj = {};
    changeVendorRequestObj.CHANGE_VENDOR_REQUEST_ID = changeVendorRequestId;
    changeVendorRequestObj.CURRENT_USER_ID = userId;

    if (fromProcessingReport) {
    	sendMailToRequester(changeVendorRequestObj, "returnToRequesterMessage");
    } else {
    	sendMailToAdmin(changeVendorRequestObj, "returnToRequesterMessage");
    }
}

function sendInProcessMail(changeVendorRequestId, userId){
    changeVendorRequestId.CURRENT_USER_ID = userId;

    sendMailToRequester(changeVendorRequestId, "statusInProcess");
}

function sendApprovedMail(changeVendorRequestId, userId){
    changeVendorRequestId.CURRENT_USER_ID = userId;

    sendMailToRequester(changeVendorRequestId, "statusApproved");
}

function sendCancelledMail(changeVendorRequestObj, userId){
    changeVendorRequestObj.CURRENT_USER_ID = userId;

    sendMailToRequester(changeVendorRequestObj, "statusCancelled");
}