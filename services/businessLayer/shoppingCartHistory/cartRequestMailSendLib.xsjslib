$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;

var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();

var userLib = mapper.getUser();
var dataRequest = mapper.getDataRequest();

var mail = mapper.getMail();
var requestMail = mapper.getCartRequestMail();

/** ***************************************************** **/

var pathName = "CART_REQUEST";

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

/** ************************ OBTAIN BASIC INFORMATION ************************ **/

function getUserInfoById(requesterId){
    var userData = userLib.getUserById(requesterId);
    return (userData.length > 0)? userData[0]: null;
}

function getRequesterByRequestId(requestId, currentUserId){
    var request = dataRequest.getRequestById(requestId, currentUserId);
    if(request){
        return getUserInfoById(request.REQUESTER_ID);
    }

    return null;
}

function getCurrentUserInformationByUserId(currentUserId){
    var result = {};
    var currentUser = getUserInfoById(currentUserId);

    result.CURRENT_USER_ROLE = currentUser.ROLENAME;
    result.CURRENT_USER_NAME = ''+currentUser.FIRST_NAME + ' '+currentUser.LAST_NAME;

    return result;
}

function getBasicData(stringPathName, additionalParam, isRequester) {
    if(additionalParam && Object.keys(additionalParam).length > 0){
        return (isRequester)? config.getRequesterBasicData(stringPathName, additionalParam): config.getBasicData(stringPathName, additionalParam);
    }

    return (isRequester)? config.getRequesterBasicData(stringPathName): config.getBasicData(stringPathName);
}

function getUrlBase() {
    return config.getUrlBase();
}

function getEmailList(requestMailObj) {
    return config.getEmailList();
}

function getPath(stringName) {
    return config.getPath(stringName);
}

/** ************************ END OBTAIN BASIC INFORMATION ************************ **/

function sendMailToRequester(requestMailObj, mailType){
    var mailObj;
    var requester = getRequesterByRequestId(requestMailObj.REQUEST_ID, requestMailObj.CURRENT_USER_ID);
    var requesterFullName = ""+requester.FIRST_NAME+" "+requester.LAST_NAME;

    var currentUser = getCurrentUserInformationByUserId(requestMailObj.CURRENT_USER_ID);
    requestMailObj.CURRENT_USER_ROLE = currentUser.CURRENT_USER_ROLE;
    requestMailObj.CURRENT_USER_NAME = currentUser.CURRENT_USER_NAME;

    switch(mailType){
        case mailTypeMap.SUBMIT:
            mailObj = requestMail.parseSubmit(requestMailObj, getBasicData(pathName, {}, true), requesterFullName);
            break;
        case mailTypeMap.RESUBMIT:
            mailObj = requestMail.parseResubmitted(requestMailObj, getBasicData(pathName,{}, true), requesterFullName);
            break;
        case mailTypeMap.NEW_MESSAGE:
            mailObj = requestMail.parseNewMessage(requestMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, true), requesterFullName);
            break;
        case mailTypeMap.FYI_MESSAGE:
            mailObj = requestMail.parseFYI(requestMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, true), requesterFullName);
            break;
        case mailTypeMap.RETURN_TO_REQUESTER_MESSAGE:
            mailObj = requestMail.parseReturnToRequest(requestMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, true), requesterFullName);
            break;
        case mailTypeMap.STATUS_IN_PROCESS:
            mailObj = requestMail.parseInProcess(requestMailObj, getBasicData(pathName,{}, true), requesterFullName);
            break;
        case mailTypeMap.STATUS_APPROVED:
            mailObj = requestMail.parseApproved(requestMailObj, getBasicData(pathName,{}, true), requesterFullName);
            break;
        case mailTypeMap.STATUS_CANCELLED:
            mailObj = requestMail.parseCancelled(requestMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, true), requesterFullName);
            break;
    }

    var emailObj = mail.getJson([{address: requester.EMAIL}], mailObj.subject, mailObj.body, null, null);

    mail.sendMail(emailObj, true, null);
}

function sendMailToAdmin(requestMailObj, mailType){
    var defaultUserName = "CRT Admin";
    var mailObj;

    var currentUser = getCurrentUserInformationByUserId(requestMailObj.CURRENT_USER_ID);
    requestMailObj.CURRENT_USER_ROLE = currentUser.CURRENT_USER_ROLE;
    requestMailObj.CURRENT_USER_NAME = currentUser.CURRENT_USER_NAME;

    switch(mailType){
        case mailTypeMap.RESUBMIT:
            mailObj = requestMail.parseResubmitted(requestMailObj, getBasicData(pathName), defaultUserName);
            break;
        case mailTypeMap.SUBMIT:
            mailObj = requestMail.parseSubmit(requestMailObj, getBasicData(pathName), defaultUserName);
            break;
        case mailTypeMap.NEW_MESSAGE:
            mailObj = requestMail.parseNewMessage(requestMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}), defaultUserName);
            break;
        case mailTypeMap.FYI_MESSAGE:
            mailObj = requestMail.parseFYI(requestMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}), defaultUserName);
            break;
        case mailTypeMap.RETURN_TO_REQUESTER_MESSAGE:
            mailObj = requestMail.parseReturnToRequest(requestMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}), defaultUserName);
            break;
        case mailTypeMap.STATUS_IN_PROCESS:
            mailObj = requestMail.parseInProcess(requestMailObj, getBasicData(pathName), defaultUserName);
            break;
        case mailTypeMap.STATUS_APPROVED:
            mailObj = requestMail.parseApproved(requestMailObj, getBasicData(pathName), defaultUserName);
            break;
        case mailTypeMap.STATUS_CANCELLED:
            mailObj = requestMail.parseCancelled(requestMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}), defaultUserName);
            break;
    }

    var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);

    mail.sendMail(emailObj, true, null);
}

/** ************************ SEND EMAIL FUNCTIONS ************************ **/
//Send Submit Mail
function sendSubmitMail(newCartRequestId, userId){
    var newCartRequestObj = {};
    newCartRequestObj.REQUEST_ID = newCartRequestId;
    newCartRequestObj.CURRENT_USER_ID = userId;

    sendMailToRequester(newCartRequestObj, "submit");
    sendMailToAdmin(newCartRequestObj, "submit");
}

//Send Resubmit Mail
function sendResubmitMail(requestId, userId) {
    var requestMailObj = {};
    requestMailObj.REQUEST_ID = requestId;
    requestMailObj.CURRENT_USER_ID = userId;

    sendMailToRequester(requestMailObj, "resubmit");
    sendMailToAdmin(requestMailObj, "resubmit");
}

function sendNewMessageMail(requestId, userId){
    var requestMailObj = {};
    requestMailObj.REQUEST_ID = requestId;
    requestMailObj.CURRENT_USER_ID = userId;

    sendMailToRequester(requestMailObj, "newMessage");
    sendMailToAdmin(requestMailObj, "newMessage");
}

function sendFYIMail(requestId, userId){
    var requestMailObj = {};
    requestMailObj.REQUEST_ID = requestId;
    requestMailObj.CURRENT_USER_ID = userId;

    sendMailToRequester(requestMailObj, "fyiMessage");
    sendMailToAdmin(requestMailObj, "fyiMessage");
}

function sendReturnToRequestMail(requestId, userId){
    var requestMailObj = {};
    requestMailObj.REQUEST_ID = requestId;
    requestMailObj.CURRENT_USER_ID = userId;

    sendMailToRequester(requestMailObj, "returnToRequesterMessage");
    sendMailToAdmin(requestMailObj, "returnToRequesterMessage");
}

function sendInProcessMail(requestObj, userId){
    requestObj.CURRENT_USER_ID = userId;

    sendMailToRequester(requestObj, "statusInProcess");
    sendMailToAdmin(requestObj, "statusInProcess");
}

function sendApprovedMail(requestObj, userId){
    requestObj.CURRENT_USER_ID = userId;

    sendMailToRequester(requestObj, "statusApproved");
    sendMailToAdmin(requestObj, "statusApproved");
}

function sendCancelledMail(requestObj, userId){
    requestObj.CURRENT_USER_ID = userId;

    sendMailToRequester(requestObj, "statusCancelled");
    sendMailToAdmin(requestObj, "statusCancelled");
}