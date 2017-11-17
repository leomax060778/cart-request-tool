$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;

var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();

var userLib = mapper.getUser();
var dataVendorInquiry = mapper.getDataVendorInquiry();

var mail = mapper.getMail();
var vendorInquiryMail = mapper.getVendorInquiryMail();

/** ***************************************************** **/

var pathName = "VENDOR_INQUIRY";

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

function getRequesterByVendorInquiryId(vendorInquiryId){
    var inquiry = dataVendorInquiry.getVendorInquiryById(vendorInquiryId);
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

function sendMailToRequester(vendorInquiryMailObj, mailType){
    var mailObj;
    var requester = getRequesterByVendorInquiryId(vendorInquiryMailObj.VENDOR_INQUIRY_ID, vendorInquiryMailObj.CURRENT_USER_ID);
    var requesterFullName = requester.FIRST_NAME + " " + requester.LAST_NAME + ", " + requester.USER_NAME;

    var currentUser = getCurrentUserInformationByUserId(vendorInquiryMailObj.CURRENT_USER_ID);
    vendorInquiryMailObj.CURRENT_USER_ROLE = currentUser.CURRENT_USER_ROLE;
    vendorInquiryMailObj.CURRENT_USER_NAME = currentUser.CURRENT_USER_NAME;

    switch(mailType){
        case mailTypeMap.SUBMIT:
            mailObj = vendorInquiryMail.parseSubmit(vendorInquiryMailObj, getBasicData(pathName, {}, true), requesterFullName);
            break;
        case mailTypeMap.RESUBMIT:
            mailObj = vendorInquiryMail.parseResubmitted(vendorInquiryMailObj, getBasicData(pathName,{}, true), requesterFullName);
            break;
        case mailTypeMap.NEW_MESSAGE:
            mailObj = vendorInquiryMail.parseMessage(vendorInquiryMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, true), requesterFullName);
            break;
        case mailTypeMap.FYI_MESSAGE:
            mailObj = vendorInquiryMail.parseFYI(vendorInquiryMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, true), requesterFullName);
            break;
        case mailTypeMap.RETURN_TO_REQUESTER_MESSAGE:
            mailObj = vendorInquiryMail.parseReturnToRequest(vendorInquiryMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, true), requesterFullName);
            break;
        case mailTypeMap.STATUS_COMPLETED:
            mailObj = vendorInquiryMail.parseCompleted(vendorInquiryMailObj, getBasicData(pathName,{}, true), requesterFullName);
            break;
        case mailTypeMap.STATUS_CANCELLED:
            mailObj = vendorInquiryMail.parseCancelled(vendorInquiryMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, true), requesterFullName);
            break;
    }

    var emailObj = mail.getJson([{address: requester.EMAIL}], mailObj.subject, mailObj.body, null, null);

    mail.sendMail(emailObj, true, null);
}

function sendMailToAdmin(vendorInquiryMailObj, mailType){
    var defaultUserName = "CRT Admin";
    var mailObj;

    var currentUser = getCurrentUserInformationByUserId(vendorInquiryMailObj.CURRENT_USER_ID);
    vendorInquiryMailObj.CURRENT_USER_ROLE = currentUser.CURRENT_USER_ROLE;
    vendorInquiryMailObj.CURRENT_USER_NAME = currentUser.CURRENT_USER_NAME;
    var toProcessingReport = true;
    switch(mailType){
        case mailTypeMap.RESUBMIT:
            mailObj = vendorInquiryMail.parseResubmitted(vendorInquiryMailObj, getBasicData(pathName, {}, false, true), defaultUserName);
            break;
        case mailTypeMap.SUBMIT:
            mailObj = vendorInquiryMail.parseSubmit(vendorInquiryMailObj, getBasicData(pathName, {}, false, true), defaultUserName);
            break;
        case mailTypeMap.NEW_MESSAGE:
        	toProcessingReport = !((Number(vendorInquiryMailObj.STATUS_ID) === statusMap.COMPLETED) || (Number(vendorInquiryMailObj.STATUS_ID) === statusMap.CANCELLED));
            mailObj = vendorInquiryMail.parseMessage(vendorInquiryMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, false, toProcessingReport), defaultUserName);
            break;
        case mailTypeMap.FYI_MESSAGE:
        	toProcessingReport = !((Number(vendorInquiryMailObj.STATUS_ID) === statusMap.COMPLETED) || (Number(vendorInquiryMailObj.STATUS_ID) === statusMap.CANCELLED));
            mailObj = vendorInquiryMail.parseFYI(vendorInquiryMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, false, toProcessingReport), defaultUserName);
            break;
        case mailTypeMap.RETURN_TO_REQUESTER_MESSAGE:
            mailObj = vendorInquiryMail.parseReturnToRequest(vendorInquiryMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}, false, true), defaultUserName);
            break;
        case mailTypeMap.STATUS_COMPLETED:
            mailObj = vendorInquiryMail.parseCompleted(vendorInquiryMailObj, getBasicData(pathName), defaultUserName);
            break;
        case mailTypeMap.STATUS_CANCELLED:
            mailObj = vendorInquiryMail.parseCancelled(vendorInquiryMailObj, getBasicData(pathName, {"PARAM": "MESSAGE"}), defaultUserName);
            break;
    }

    var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);

    mail.sendMail(emailObj, true, null);
}

/** ************************ SEND EMAIL FUNCTIONS ************************ **/
//Send Submit Mail
function sendSubmitMail(vendorInquiryId, userId){
    var vendorInquiryObj = {};
    vendorInquiryObj.VENDOR_INQUIRY_ID = vendorInquiryId;
    vendorInquiryObj.CURRENT_USER_ID = userId;

    sendMailToAdmin(vendorInquiryObj, "submit");
}

//Send Resubmit Mail
function sendResubmitMail(vendorInquiryId, userId) {
    var vendorInquiryMailObj = {};
    vendorInquiryMailObj.VENDOR_INQUIRY_ID = vendorInquiryId;
    vendorInquiryMailObj.CURRENT_USER_ID = userId;

    sendMailToAdmin(vendorInquiryMailObj, "resubmit");
}

function sendMessageMail(vendorInquiry, userId, fromProcessingReport){
    var vendorInquiryMailObj = {};
    vendorInquiryMailObj.VENDOR_INQUIRY_ID = vendorInquiry.VENDOR_INQUIRY_ID;
    vendorInquiryMailObj.CURRENT_USER_ID = userId;
    vendorInquiryMailObj.STATUS_ID = vendorInquiry.PREVIOUS_STATUS_ID;

    if (fromProcessingReport) {
    	sendMailToRequester(vendorInquiryMailObj, "newMessage");
    } else {
    	sendMailToAdmin(vendorInquiryMailObj, "newMessage");
    }
}

function sendFYIMail(vendorInquiry, userId, fromProcessingReport){
    var vendorInquiryMailObj = {};
    vendorInquiryMailObj.VENDOR_INQUIRY_ID = vendorInquiry.VENDOR_INQUIRY_ID;
    vendorInquiryMailObj.CURRENT_USER_ID = userId;
    vendorInquiryMailObj.STATUS_ID = vendorInquiry.PREVIOUS_STATUS_ID;

    if (fromProcessingReport) {
    	sendMailToRequester(vendorInquiryMailObj, "fyiMessage");
    } else {
    	sendMailToAdmin(vendorInquiryMailObj, "fyiMessage");
    }
}

function sendReturnToRequestMail(vendorInquiryId, userId, fromProcessingReport){
    var vendorInquiryMailObj = {};
    vendorInquiryMailObj.VENDOR_INQUIRY_ID = vendorInquiryId;
    vendorInquiryMailObj.CURRENT_USER_ID = userId;

    if (fromProcessingReport) {
    	sendMailToRequester(vendorInquiryMailObj, "returnToRequesterMessage");
    } else {
    	sendMailToAdmin(vendorInquiryMailObj, "returnToRequesterMessage");
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