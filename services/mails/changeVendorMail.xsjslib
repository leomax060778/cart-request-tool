$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var utilLib = mapper.getUtil();
/** ***********END INCLUDE LIBRARIES*************** */

function parseReturnToRequest(changeVendorObj, basicData, userName) {
    var mailObj = {};
    var completePath = basicData.URL_BASE + basicData.PATH + '/' + changeVendorObj.CHANGE_VENDOR_REQUEST_ID;
    completePath = (basicData.ADDITIONAL_PARAM) ? completePath + basicData.ADDITIONAL_PARAM : completePath;

    var changeId = 'CV' + changeVendorObj.CHANGE_VENDOR_REQUEST_ID;
    mailObj.body = 'Dear ' + userName + ',<br /><br />Your <b>Change Vendor</b> has been returned' +
        ' to you with an <b>Action and/or Response that is required</b> in order to process' +
        ' your request.<br /><br /><br />A message has been added to the Message History ' +
        'for your request <b>CV' + changeVendorObj.CHANGE_VENDOR_REQUEST_ID + '</b> in the <b>Cart Request Tool.</b><br /><br />' +
        'Log in to CRT, then click the following link ' +
        'to process this specific request: ' +
        '<a href="' + completePath + '" style="font-weight: bold">' + changeId + '</a><br /><br />';
    mailObj.subject = basicData.ENVIRONMENT + 'CRT Request ID: CV' + changeVendorObj.CHANGE_VENDOR_REQUEST_ID + ' - Action/Response Required Message - ' + utilLib.getCurrentFormattedDate();
    return mailObj;
}

function parseCancelled(changeVendorObj, basicData, userName) {
    var mailObj = {};
    var completePath = basicData.URL_BASE + basicData.PATH + '/' + changeVendorObj.CHANGE_VENDOR_REQUEST_ID;
    completePath = (basicData.ADDITIONAL_PARAM) ? completePath + basicData.ADDITIONAL_PARAM : completePath;

    var changeId = 'CV' + changeVendorObj.CHANGE_VENDOR_REQUEST_ID;
    mailObj.body = 'Dear ' + userName + ',<br /><br />Your <b>CV' + changeVendorObj.CHANGE_VENDOR_REQUEST_ID + '</b> has been <b>Cancelled.</b><br />' +
        '<br />The reason for cancellation has been recorded in the Message History as FYI Only, ' +
        'requiring no response.<br /><br />Log in to CRT, then click ' +
        'the following link to process this specific request: ' +
        '<a href="' + completePath + '" style="font-weight: bold">' + changeId + '</a><br /><br />';
    mailObj.subject = basicData.ENVIRONMENT + 'CRT Request ID: CV' + changeVendorObj.CHANGE_VENDOR_REQUEST_ID + ' - Change Vendor - has been Cancelled - ' + utilLib.getCurrentFormattedDate();
    return mailObj;
}

function parseSubmit(changeVendorObj, basicData, userName) {
    var mailObj = {};
    var completePath = basicData.URL_BASE + basicData.PATH + '/' + changeVendorObj.CHANGE_VENDOR_REQUEST_ID;
    var changeId = 'CV' + changeVendorObj.CHANGE_VENDOR_REQUEST_ID;
    mailObj.body = '<b>Dear ' + userName + ',</b> <br /> <br /> You have new activity within the ' +
        '<b>Cart Request Tool.</b> <br /> <br /> <b>' + changeVendorObj.CURRENT_USER_ROLE + ' ' + changeVendorObj.CURRENT_USER_NAME + ' has created a ' +
        'CV' + changeVendorObj.CHANGE_VENDOR_REQUEST_ID + '</b> <br /> <br /> Log in to CRT, then click the following link to process this specific request: ' +
        '<a href="' + completePath + '" style="font-weight: bold">' + changeId + '</a><br /><br />';
    mailObj.subject = basicData.ENVIRONMENT + 'CRT Request ID: CV' + changeVendorObj.CHANGE_VENDOR_REQUEST_ID + ' - Change Vendor Created - ' + utilLib.getCurrentFormattedDate();
    return mailObj;
}

function parseResubmitted(changeVendorObj, basicData, userName) {
    var mailObj = {};
    var completePath = basicData.URL_BASE + basicData.PATH + '/' + changeVendorObj.CHANGE_VENDOR_REQUEST_ID;
    var changeId = 'CV' + changeVendorObj.CHANGE_VENDOR_REQUEST_ID;
    mailObj.body = '<b>Dear ' + userName + ',</b> <br /> <br /> You have new activity within the ' +
        '<b>Cart Request Tool.</b> <br /> <br /> <b>' + changeVendorObj.CURRENT_USER_ROLE + ' ' + changeVendorObj.CURRENT_USER_NAME + '</b>  ' +
        'has re-submitted a  <b>CV' + changeVendorObj.CHANGE_VENDOR_REQUEST_ID + '</b> <br /> <br /> Log in to CRT' +
        ', then click the following link to process this specific request: ' +
        '<a href="' + completePath + '" style="font-weight: bold">' + changeId + '</a><br /><br />';
    mailObj.subject = basicData.ENVIRONMENT + 'CRT Request ID: CV' + changeVendorObj.CHANGE_VENDOR_REQUEST_ID + ' - Change Vendor Re-Submitted - ' + utilLib.getCurrentFormattedDate();
    return mailObj;
}

function parseApproved(changeVendorObj, basicData, userName) {
    var mailObj = {};
    var completePath = basicData.URL_BASE + basicData.PATH + '/' + changeVendorObj.CHANGE_VENDOR_REQUEST_ID;
    var changeId = 'CV' + changeVendorObj.CHANGE_VENDOR_REQUEST_ID;
    mailObj.body = '<b>Dear ' + userName + ',</b><br /><br />Your <b>CV' + changeVendorObj.CHANGE_VENDOR_REQUEST_ID + '</b> is now <b>Approved.</b>' +
        '<br /><br /><b>Vendor ID #: ' + changeVendorObj.VENDOR_ID + ' </b> has been issued on <b>' + changeVendorObj.CHANGE_VENDOR_REQUEST_ID + '</b>' +
        '<br /><br />The message is FYI Only, requiring no response.<br /><br />Log in to CRT' +
        ', then click the following link to process this specific request: ' +
        '<a href="' + completePath + '" style="font-weight: bold">' + changeId + '</a><br /><br />';
    mailObj.subject = basicData.ENVIRONMENT + 'CRT Request ID: CV' + changeVendorObj.CHANGE_VENDOR_REQUEST_ID + ' - Change Vendor Approved - ' + utilLib.getCurrentFormattedDate();
    return mailObj;
}

function parseFYI(changeVendorObj, basicData, userName) {
    var mailObj = {};
    var completePath = basicData.URL_BASE + basicData.PATH + '/' + changeVendorObj.CHANGE_VENDOR_REQUEST_ID;
    completePath = (basicData.ADDITIONAL_PARAM) ? completePath + basicData.ADDITIONAL_PARAM : completePath;

    var changeId = 'CV' + changeVendorObj.CHANGE_VENDOR_REQUEST_ID;
    mailObj.body = '<b>Dear ' + userName + ',</b><br /><br /> A message has been added to the ' +
        'Message History tab for your request <b>CV' + changeVendorObj.CHANGE_VENDOR_REQUEST_ID + '</b> in the <b>Cart ' +
        'Request Tool.</b><br /><br /> The message is <b>FYI Only, requiring no ' +
        'response.</b><br /><br />  Log in to CRT, then click the following link to process this specific request: ' +
        '<a href="' + completePath + '" style="font-weight: bold">' + changeId + '</a><br /><br />';
    mailObj.subject = basicData.ENVIRONMENT + 'CRT Request ID: CV' + changeVendorObj.CHANGE_VENDOR_REQUEST_ID + ' - FYI Only Message - ' + utilLib.getCurrentFormattedDate();
    return mailObj;
}

function parseInProcess(changeVendorObj, basicData, userName) {
    var mailObj = {};
    var completePath = basicData.URL_BASE + basicData.PATH + '/' + changeVendorObj.CHANGE_VENDOR_REQUEST_ID;
    var changeId = 'CV' + changeVendorObj.CHANGE_VENDOR_REQUEST_ID;
    mailObj.body = '<b>Dear ' + userName + ',</b><br /><br />Your <b>CV' + changeVendorObj.CHANGE_VENDOR_REQUEST_ID + '</b> ' +
        'is now <b>In Process.</b><br /><br /><b>YVC Request #: #YVC_SYSTEM# ' +
        '</b> has been submitted.<br /><br />The message is FYI Only, ' +
        'requiring no response. <br /><br /> Log in to CRT, ' +
        'then click the following link to process this specific request: ' +
        '<a href="' + completePath + '" style="font-weight: bold">' + changeId + '</a><br /><br />';
    mailObj.subject = basicData.ENVIRONMENT + 'CRT Request ID: CV' + changeVendorObj.CHANGE_VENDOR_REQUEST_ID + ' - Change Vendor is In Process - ' + utilLib.getCurrentFormattedDate();
    return mailObj;
}

function parseMessage(changeVendorObj, basicData, userName) {
    var mailObj = {};
    var completePath = basicData.URL_BASE + basicData.PATH + '/' + changeVendorObj.CHANGE_VENDOR_REQUEST_ID;
    completePath = (basicData.ADDITIONAL_PARAM) ? completePath + basicData.ADDITIONAL_PARAM : completePath;

    var changeId = 'CV' + changeVendorObj.CHANGE_VENDOR_REQUEST_ID;
    mailObj.body = '<b>Dear ' + userName + ',</b><br /><br />A message has been ' +
        'added to the Message History tab for <b>CV' + changeVendorObj.CHANGE_VENDOR_REQUEST_ID + '</b> in the <b>Cart Request Tool.</b>' +
        '<br /><br /> Log in to CRT, then click the ' +
        'following link to process this specific request: ' +
        '<a href="' + completePath + '" style="font-weight: bold">' + changeId + '</a><br/><br />';
    mailObj.subject = basicData.ENVIRONMENT + 'CRT Request ID: CV' + changeVendorObj.CHANGE_VENDOR_REQUEST_ID + ' - New Message - ' + utilLib.getCurrentFormattedDate();
    return mailObj;
}