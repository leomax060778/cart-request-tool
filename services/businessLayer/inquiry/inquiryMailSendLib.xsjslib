$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;

var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();

var userLib = mapper.getUser();
var businessInquiry = mapper.getInquiry();

var mail = mapper.getMail();
var crtInquiryMail = mapper.getCrtInquiryMail();

/** ***************************************************** **/

var pathName = "CRT_INQUIRY";

var mailTypeMap = {
    RESUBMIT: "resubmit",
    SUBMIT: "submit",
    NEW_MESSAGE: "newMessage",
    FYI_MESSAGE: "fyiMessage",
    RETURN_TO_REQUESTER_MESSAGE: "returnToRequesterMessage",
    STATUS_COMPLETED: "statusCompleted",
    STATUS_CANCELLED: "statusCancelled"
};

var statusMap = {'TO_BE_CHECKED': 1, 'RETURN_TO_REQUESTER': 2, 'COMPLETED': 3, 'CANCELLED': 4};

/** ************************ OBTAIN BASIC INFORMATION ************************ **/

function getUserInfoById(requesterId){
    var userData = userLib.getUserById(requesterId);
    return (userData.length > 0)? userData[0]: null;
}

function getRequesterByCRTInquiryId(crtInquiryId, currentUserId){
    var inquiry = businessInquiry.getInquiryById(crtInquiryId, currentUserId);
    if(inquiry){
        return getUserInfoById(inquiry.CREATED_USER_ID);
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

function sendMailToRequester(crtInquiryMailObj, mailType){
    var mailObj;
    var requester = getRequesterByCRTInquiryId(crtInquiryMailObj.INQUIRY_ID, crtInquiryMailObj.CURRENT_USER_ID);

    if (!requester.USER_DATA_PROTECTION_STATUS_ID) {
        var requesterFullName = requester.FIRST_NAME + " " + requester.LAST_NAME + ", " + requester.USER_NAME;

        var currentUser = getCurrentUserInformationByUserId(crtInquiryMailObj.CURRENT_USER_ID);
        crtInquiryMailObj.CURRENT_USER_ROLE = currentUser.CURRENT_USER_ROLE;
        crtInquiryMailObj.CURRENT_USER_NAME = currentUser.CURRENT_USER_NAME;

        switch (mailType) {
            case mailTypeMap.SUBMIT:
                mailObj = crtInquiryMail.parseSubmit(crtInquiryMailObj, getBasicData(pathName, {}, true), requesterFullName);
                break;
            case mailTypeMap.RESUBMIT:
                mailObj = crtInquiryMail.parseResubmitted(crtInquiryMailObj, getBasicData(pathName, {}, true), requesterFullName);
                break;
            case mailTypeMap.NEW_MESSAGE:
                mailObj = crtInquiryMail.parseMessage(crtInquiryMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, true), requesterFullName);
                break;
            case mailTypeMap.FYI_MESSAGE:
                mailObj = crtInquiryMail.parseFYI(crtInquiryMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, true), requesterFullName);
                break;
            case mailTypeMap.RETURN_TO_REQUESTER_MESSAGE:
                mailObj = crtInquiryMail.parseReturnToRequest(crtInquiryMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, true), requesterFullName);
                break;
            case mailTypeMap.STATUS_COMPLETED:
                mailObj = crtInquiryMail.parseCompleted(crtInquiryMailObj, getBasicData(pathName, {}, true), requesterFullName);
                break;
            case mailTypeMap.STATUS_CANCELLED:
                mailObj = crtInquiryMail.parseCancelled(crtInquiryMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, true), requesterFullName);
                break;
        }

        var emailObj = mail.getJson([{address: requester.EMAIL}], mailObj.subject, mailObj.body, null, null);

        mail.sendMail(emailObj, true, null);
    }
}

function sendMailToAdmin(crtInquiryMailObj, mailType){
    var defaultUserName = "CRT Admin";
    var mailObj;

    var currentUser = getCurrentUserInformationByUserId(crtInquiryMailObj.CURRENT_USER_ID);
    crtInquiryMailObj.CURRENT_USER_ROLE = currentUser.CURRENT_USER_ROLE;
    crtInquiryMailObj.CURRENT_USER_NAME = currentUser.CURRENT_USER_NAME;
    var toProcessingReport = true;
    switch(mailType){
        case mailTypeMap.RESUBMIT:
            mailObj = crtInquiryMail.parseResubmitted(crtInquiryMailObj, getBasicData(pathName, {}, false, true), defaultUserName);
            break;
        case mailTypeMap.SUBMIT:
            mailObj = crtInquiryMail.parseSubmit(crtInquiryMailObj, getBasicData(pathName, {}, false, true), defaultUserName);
            break;
        case mailTypeMap.NEW_MESSAGE:
        	toProcessingReport = !((Number(crtInquiryMailObj.STATUS_ID) === statusMap.COMPLETED) || (Number(crtInquiryMailObj.STATUS_ID) === statusMap.CANCELLED));
            mailObj = crtInquiryMail.parseMessage(crtInquiryMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, false, toProcessingReport), defaultUserName);
            break;
        case mailTypeMap.FYI_MESSAGE:
        	toProcessingReport = !((Number(crtInquiryMailObj.STATUS_ID) === statusMap.COMPLETED) || (Number(crtInquiryMailObj.STATUS_ID) === statusMap.CANCELLED));
            mailObj = crtInquiryMail.parseFYI(crtInquiryMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, false, toProcessingReport), defaultUserName);
            break;
        case mailTypeMap.RETURN_TO_REQUESTER_MESSAGE:
            mailObj = crtInquiryMail.parseReturnToRequest(crtInquiryMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, false, true), defaultUserName);
            break;
        case mailTypeMap.STATUS_COMPLETED:
            mailObj = crtInquiryMail.parseCompleted(crtInquiryMailObj, getBasicData(pathName), defaultUserName);
            break;
        case mailTypeMap.STATUS_CANCELLED:
            mailObj = crtInquiryMail.parseCancelled(crtInquiryMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}), defaultUserName);
            break;
    }

    var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);

    mail.sendMail(emailObj, true, null);
}

/** ************************ SEND EMAIL FUNCTIONS ************************ **/
//Send Submit Mail
function sendSubmitMail(newCartRequestId, userId){
    var newCartRequestObj = {};
    newCartRequestObj.INQUIRY_ID = newCartRequestId;
    newCartRequestObj.CURRENT_USER_ID = userId;

    sendMailToAdmin(newCartRequestObj, "submit");
}

//Send Resubmit Mail
function sendResubmitMail(crtInquiryId, userId) {
    var crtInquiryMailObj = {};
    crtInquiryMailObj.INQUIRY_ID = crtInquiryId;
    crtInquiryMailObj.CURRENT_USER_ID = userId;

    sendMailToAdmin(crtInquiryMailObj, "resubmit");
}

function sendNewMessageMail(crtInquiry, userId, fromProcessingReport){
    var crtInquiryMailObj = {};
    crtInquiryMailObj.INQUIRY_ID = crtInquiry.INQUIRY_ID;
    crtInquiryMailObj.CURRENT_USER_ID = userId;
    crtInquiryMailObj.STATUS_ID = crtInquiry.PREVIOUS_STATUS_ID;

    if (fromProcessingReport) {
    	sendMailToRequester(crtInquiryMailObj, "newMessage");
    } else {
    	sendMailToAdmin(crtInquiryMailObj, "newMessage");
    }
}

function sendFYIMail(crtInquiry, userId, fromProcessingReport){
    var crtInquiryMailObj = {};
    crtInquiryMailObj.INQUIRY_ID = crtInquiry.INQUIRY_ID;
    crtInquiryMailObj.CURRENT_USER_ID = userId;
    crtInquiryMailObj.STATUS_ID = crtInquiry.PREVIOUS_STATUS_ID;

    if (fromProcessingReport) {
    	sendMailToRequester(crtInquiryMailObj, "fyiMessage");
    } else {
    	sendMailToAdmin(crtInquiryMailObj, "fyiMessage");
    }
}

function sendReturnToRequestMail(crtInquiryId, userId, fromProcessingReport){
    var crtInquiryMailObj = {};
    crtInquiryMailObj.INQUIRY_ID = crtInquiryId;
    crtInquiryMailObj.CURRENT_USER_ID = userId;

    if (fromProcessingReport) {
    	sendMailToRequester(crtInquiryMailObj, "returnToRequesterMessage");
    } else {
    	sendMailToAdmin(crtInquiryMailObj, "returnToRequesterMessage");
    }
}

function sendCompletedMail(crtInquiryObj, userId){
    crtInquiryObj.CURRENT_USER_ID = userId;

    sendMailToRequester(crtInquiryObj, "statusCompleted");
}

function sendCancelledMail(crtInquiryObj, userId){
    crtInquiryObj.CURRENT_USER_ID = userId;

    sendMailToRequester(crtInquiryObj, "statusCancelled");
}