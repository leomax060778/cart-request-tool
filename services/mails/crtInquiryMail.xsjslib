$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var utilLib = mapper.getUtil();
/** ***********END INCLUDE LIBRARIES*************** */

function parseReturnToRequest(inquiryObj, basicData, userName) {
    var mailObj = {};
    var completePath = basicData.URL_BASE + basicData.PATH + '/' + inquiryObj.INQUIRY_ID;
    completePath = (basicData.ADDITIONAL_PARAM) ? completePath + basicData.ADDITIONAL_PARAM : completePath;

    var inquiryId = 'CI' + inquiryObj.INQUIRY_ID;
    mailObj.body = 'Dear ' + userName + ',<br /><br />Your <b>CRT Inquiry</b> has been returned to you with an ' +
        '<b>Action and/or Response that is required</b> in order to process your request.<br /><br />' +
        'A message has been added to the Message History for your request <b>CI' + inquiryObj.INQUIRY_ID + '</b> in the <b>Cart ' +
        'Request Tool.</b><br /><br />Log in to CRT, then click the following ' +
        'link to process this specific request: ' +
        '<a href="' + completePath + '" style="font-weight: bold">' + inquiryId + '</a><br /><br />';
    mailObj.subject = basicData.ENVIRONMENT + 'CRT Request ID: CI' + inquiryObj.INQUIRY_ID + ' - Action/Response Required Message - ' + utilLib.getCurrentFormattedDate();
    return mailObj;
}

function parseSubmit(inquiryObj, basicData, userName) {
    var mailObj = {};
    var completePath = basicData.URL_BASE + basicData.PATH + '/' + inquiryObj.INQUIRY_ID;
    var inquiryId = 'CI' + inquiryObj.INQUIRY_ID;
    mailObj.body = '<b>Dear ' + userName + ',</b><br /><br /> You have new activity within the <b>Cart Request Tool.</b>' +
        '<br /><br /> <b>' + inquiryObj.CURRENT_USER_ROLE + ' ' + inquiryObj.CURRENT_USER_NAME + ' has created a CI' + inquiryObj.INQUIRY_ID + '</b><br /><br /> Log in to CRT' +
        ', then click the following link to process this specific request: ' +
        '<a href="' + completePath + '" style="font-weight: bold">' + inquiryId + '</a><br /><br />';
    mailObj.subject = basicData.ENVIRONMENT + 'CRT Request ID: CI' + inquiryObj.INQUIRY_ID + ' - CRT Inquiry Created - ' + utilLib.getCurrentFormattedDate();
    return mailObj;
}

function parseCancelled(inquiryObj, basicData, userName) {
    var mailObj = {};
    var completePath = basicData.URL_BASE + basicData.PATH + '/' + inquiryObj.INQUIRY_ID;
    completePath = (basicData.ADDITIONAL_PARAM) ? completePath + basicData.ADDITIONAL_PARAM : completePath;

    var inquiryId = 'CI' + inquiryObj.INQUIRY_ID;
    mailObj.body = 'Dear ' + userName + ',<br /><br />Your <b>CI' + inquiryObj.INQUIRY_ID + '</b> has been <b>Cancelled.</b><br /><br />' +
        'The reason for cancellation has been recorded in the Message History as FYI Only, requiring no response.' +
        '<br /><br />Log in to CRT, then click the following link to process this specific request: ' +
        '<a href="' + completePath + '" style="font-weight: bold">' + inquiryId + '</a><br /><br />';
    mailObj.subject = basicData.ENVIRONMENT + 'CRT Request ID: CI' + inquiryObj.INQUIRY_ID + ' - CRT Inquiry has been Cancelled - ' + utilLib.getCurrentFormattedDate();
    return mailObj;
}

function parseResubmitted(inquiryObj, basicData, userName) {
    var mailObj = {};
    var completePath = basicData.URL_BASE + basicData.PATH + '/' + inquiryObj.INQUIRY_ID;
    var inquiryId = 'CI' + inquiryObj.INQUIRY_ID;
    mailObj.body = '<b>Dear ' + userName + ',</b><br /><br /> You have new activity within the <b>Cart Request Tool.' +
        '</b><br /><br /> <b>' + inquiryObj.CURRENT_USER_ROLE + ' ' + inquiryObj.CURRENT_USER_NAME + '</b> has re-submitted a <b>CI' + inquiryObj.INQUIRY_ID + '</b><br /><br />' +
        ' Log in to CRT, then click the following link to process this specific request: ' +
        '<a href="' + completePath + '" style="font-weight: bold">' + inquiryId + '</a><br /><br />';
    mailObj.subject = basicData.ENVIRONMENT + 'CRT Request ID: CI' + inquiryObj.INQUIRY_ID + ' - CRT Inquiry Re-Submitted - ' + utilLib.getCurrentFormattedDate();
    return mailObj;
}

function parseCompleted(inquiryObj, basicData, userName) {
    var mailObj = {};
    var completePath = basicData.URL_BASE + basicData.PATH + '/' + inquiryObj.INQUIRY_ID;
    completePath = (basicData.ADDITIONAL_PARAM) ? completePath + basicData.ADDITIONAL_PARAM : completePath;

    var inquiryId = 'CI' + inquiryObj.INQUIRY_ID;
    mailObj.body = 'Dear ' + userName + '<br /><br />Your <b>CI' + inquiryObj.INQUIRY_ID + '</b> has been <b>Completed.</b><br /><br />' +
        'You may review the response in the Message History of your inquiry.<br /><br />Log in to CRT' +
        ', then click the following link to process this specific request: ' +
        '<a href="' + completePath + '" style="font-weight: bold">' + inquiryId + '</a><br /><br />';
    mailObj.subject = basicData.ENVIRONMENT + 'CRT Request ID: CI' + inquiryObj.INQUIRY_ID + ' - CRT Inquiry Completed - ' + utilLib.getCurrentFormattedDate();
    return mailObj;
}

function parseFYI(inquiryObj, basicData, userName) {
    var mailObj = {};
    var completePath = basicData.URL_BASE + basicData.PATH + '/' + inquiryObj.INQUIRY_ID;
    completePath = (basicData.ADDITIONAL_PARAM) ? completePath + basicData.ADDITIONAL_PARAM : completePath;

    var inquiryId = 'CI' + inquiryObj.INQUIRY_ID;
    mailObj.body = '<b>Dear ' + userName + ',</b><br /><br />A message has been added to the Message History ' +
        'tab for your request <b>CI' + inquiryObj.INQUIRY_ID + '</b> in the <b>Cart Request Tool.</b><br /><br />' +
        'The message is <b>FYI Only, requiring no response.</b><br /><br />Log in to CRT' +
        ', then click the following link to process this specific request: ' +
        '<a href="' + completePath + '" style="font-weight: bold">' + inquiryId + '</a><br /><br />';
    mailObj.subject = basicData.ENVIRONMENT + 'CRT Request ID: CI' + inquiryObj.INQUIRY_ID + ' - FYI Only Message - ' + utilLib.getCurrentFormattedDate();
    return mailObj;
}

function parseMessage(inquiryObj, basicData, userName) {
    var mailObj = {};
    var completePath = basicData.URL_BASE + basicData.PATH + '/' + inquiryObj.INQUIRY_ID;
    completePath = (basicData.ADDITIONAL_PARAM) ? completePath + basicData.ADDITIONAL_PARAM : completePath;

    var inquiryId = 'CI' + inquiryObj.INQUIRY_ID;
    mailObj.body = '<b>Dear ' + userName + ',</b><br /><br />A message has been added to the Message History ' +
        'tab for <b>CI' + inquiryObj.INQUIRY_ID + '</b> in the <b>Cart Request Tool.</b><br /><br />' +
        'Log in to CRT, then click the following link to process this specific request: ' +
        '<a href="' + completePath + '" style="font-weight: bold">' + inquiryId + '</a><br /><br />';
    mailObj.subject = basicData.ENVIRONMENT + 'CRT Request ID: CI' + inquiryObj.INQUIRY_ID + ' - FYI Only Message - ' + utilLib.getCurrentFormattedDate();
    return mailObj;
}