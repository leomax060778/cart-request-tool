$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var utilLib = mapper.getUtil();
/** ***********END INCLUDE LIBRARIES*************** */

function parseReturnToRequest(vendorInquiryObj, basicData, userName) {
    var mailObj = {};
    var completePath = basicData.URL_BASE + basicData.PATH + '/' + vendorInquiryObj.VENDOR_INQUIRY_ID;
    completePath = (basicData.ADDITIONAL_PARAM) ? completePath + basicData.ADDITIONAL_PARAM : completePath;

    var vendorInquiryId = 'VI' + vendorInquiryObj.VENDOR_INQUIRY_ID;
    mailObj.body = 'Dear ' + userName + ',<br /><br />Your <b>Vendor Inquiry</b> has been returned ' +
        'to you with an <b>Action and/or Response that is required</b> in order to ' +
        'process your request.<br /><br /><br />A message has been added to the Message ' +
        'History for your request <b> VI' + vendorInquiryObj.VENDOR_INQUIRY_ID + '</b> in the <b>Cart Request Tool.</b><br />' +
        '<br />Log in to CRT, then click the following link ' +
        'to process this specific request: ' +
        '<a href="' + completePath + '" style="font-weight: bold">' + vendorInquiryId + '</a><br /><br />';
    mailObj.subject = basicData.ENVIRONMENT + 'CRT Request ID: VI' + vendorInquiryObj.VENDOR_INQUIRY_ID + ' - Action/Response Required Message - ' + utilLib.getCurrentFormattedDate();
    return mailObj;
}

function parseCompleted(vendorInquiryObj, basicData, userName) {
    var mailObj = {};
    var completePath = basicData.URL_BASE + basicData.PATH + '/' + vendorInquiryObj.VENDOR_INQUIRY_ID;
    completePath = (basicData.ADDITIONAL_PARAM) ? completePath + basicData.ADDITIONAL_PARAM : completePath;

    var vendorInquiryId = 'VI' + vendorInquiryObj.VENDOR_INQUIRY_ID;
    mailObj.body = '<b>Dear ' + userName + ',</b><br /><br />Your <b>VI' + vendorInquiryObj.VENDOR_INQUIRY_ID + '</b> has been ' +
        '<b>Completed.</b><br /><br />You may review the response in the ' +
        'Message History of your inquiry.<br /><br />Log in to CRT' +
        ', then click the following link to process this specific request: ' +
        '<a href="' + completePath + '" style="font-weight: bold">' + vendorInquiryId + '</a><br /><br />';
    mailObj.subject = basicData.ENVIRONMENT + 'CRT Request ID: VI' + vendorInquiryObj.VENDOR_INQUIRY_ID + ' -Vendor Inquiry - has been Completed - ' + utilLib.getCurrentFormattedDate();
    return mailObj;
}

function parseCancelled(vendorInquiryObj, basicData, userName) {
    var mailObj = {};
    var completePath = basicData.URL_BASE + basicData.PATH + '/' + vendorInquiryObj.VENDOR_INQUIRY_ID;
    completePath = (basicData.ADDITIONAL_PARAM) ? completePath + basicData.ADDITIONAL_PARAM : completePath;

    var vendorInquiryId = 'VI' + vendorInquiryObj.VENDOR_INQUIRY_ID;
    mailObj.body = 'Dear ' + userName + ',<br /><br />Your <b>VI' + vendorInquiryObj.VENDOR_INQUIRY_ID + '</b> has been ' +
        '<b>Cancelled.</b><br /><br />The reason for cancellation has been ' +
        'recorded in the Message History as FYI Only, requiring no response.' +
        '<br /><br />Log in to CRT, then click the ' +
        'following link to process this specific request: ' +
        '<a href="' + completePath + '" style="font-weight: bold">' + vendorInquiryId + '</a><br /><br />';
    mailObj.subject = basicData.ENVIRONMENT + 'CRT Request ID: VI' + vendorInquiryObj.VENDOR_INQUIRY_ID + ' - Vendor Inquiry - has been Cancelled - ' + utilLib.getCurrentFormattedDate();
    return mailObj;
}

function parseSubmit(vendorInquiryObj, basicData, userName) {
    var mailObj = {};
    var completePath = basicData.URL_BASE + basicData.PATH + '/' + vendorInquiryObj.VENDOR_INQUIRY_ID;
    var vendorInquiryId = 'VI' + vendorInquiryObj.VENDOR_INQUIRY_ID;
    mailObj.body = '<b>Dear ' + userName + ',</b><br /><br /> You have new activity within ' +
        'the <b>Cart Request Tool.</b><br /><br /> <b>' + vendorInquiryObj.CURRENT_USER_ROLE + ' ' + vendorInquiryObj.CURRENT_USER_NAME + ' has ' +
        'created a VI' + vendorInquiryObj.VENDOR_INQUIRY_ID + '</b><br /><br /> Log in to CRT, ' +
        'then click the following link to process this specific request: ' +
        '<a href="' + completePath + '" style="font-weight: bold">' + vendorInquiryId + '</a><br /><br />';
    mailObj.subject = basicData.ENVIRONMENT + 'CRT Request ID: VI' + vendorInquiryObj.VENDOR_INQUIRY_ID + ' - Vendor Inquiry Created - ' + utilLib.getCurrentFormattedDate();
    return mailObj;
}

function parseResubmitted(vendorInquiryObj, basicData, userName) {
    var mailObj = {};
    var completePath = basicData.URL_BASE + basicData.PATH + '/' + vendorInquiryObj.VENDOR_INQUIRY_ID;
    var vendorInquiryId = 'VI' + vendorInquiryObj.VENDOR_INQUIRY_ID;
    mailObj.body = '<b>Dear ' + userName + ',</b><br /><br /> You have new activity within ' +
        'the <b>Cart Request Tool.</b><br /><br /> <b>' + vendorInquiryObj.CURRENT_USER_ROLE + ' ' + vendorInquiryObj.CURRENT_USER_NAME + '</b> ' +
        'has re-submitted a <b>VI' + vendorInquiryObj.VENDOR_INQUIRY_ID + '</b><br /><br /> Log in to CRT, ' +
        'then click the following link to process this specific request:' +
        '<a href="' + completePath + '" style="font-weight: bold">' + vendorInquiryId + '</a><br /><br />';
    mailObj.subject = basicData.ENVIRONMENT + 'CRT Request ID: VI' + vendorInquiryObj.VENDOR_INQUIRY_ID + ' - Vendor Inquiry Re-Submitted - ' + utilLib.getCurrentFormattedDate();
    return mailObj;
}

function parseFYI(vendorInquiryObj, basicData, userName) {
    var mailObj = {};
    var completePath = basicData.URL_BASE + basicData.PATH + '/' + vendorInquiryObj.VENDOR_INQUIRY_ID;
    completePath = (basicData.ADDITIONAL_PARAM) ? completePath + basicData.ADDITIONAL_PARAM : completePath;

    var vendorInquiryId = 'VI' + vendorInquiryObj.VENDOR_INQUIRY_ID;
    mailObj.body = '<b>Dear ' + userName + ',</b><br /><br />A message has been added to the ' +
        'Message History tab for your request <b>VI' + vendorInquiryObj.VENDOR_INQUIRY_ID + '</b> in the <b>Cart Request Tool.' +
        '</b><br /><br />The message is <b>FYI Only, requiring no response.</b><br />' +
        '<br /> Log in to CRT, then click the following link to process this specific request: ' +
        '<a href="' + completePath + '" style="font-weight: bold">' + vendorInquiryId + '</a><br /><br />';
    mailObj.subject = basicData.ENVIRONMENT + 'CRT Request ID: VI' + vendorInquiryObj.VENDOR_INQUIRY_ID + ' - FYI Only Message - ' + utilLib.getCurrentFormattedDate();
    return mailObj;
}

function parseMessage(vendorInquiryObj, basicData, userName) {
    var mailObj = {};
    var completePath = basicData.URL_BASE + basicData.PATH + '/' + vendorInquiryObj.VENDOR_INQUIRY_ID;
    completePath = (basicData.ADDITIONAL_PARAM) ? completePath + basicData.ADDITIONAL_PARAM : completePath;

    var vendorInquiryId = 'VI' + vendorInquiryObj.VENDOR_INQUIRY_ID;
    mailObj.body = '<b>Dear ' + userName + ',</b><br /><br />A message has been ' +
        'added to the Message History tab for <b>VI' + vendorInquiryObj.VENDOR_INQUIRY_ID + '</b> in the <b>Cart Request Tool.</b>' +
        '<br /><br /> Log in to CRT, then click the ' +
        'following link to process this specific request: ' +
        '<a href="' + completePath + '" style="font-weight: bold">' + vendorInquiryId + '</a><br/><br />';
    mailObj.subject = basicData.ENVIRONMENT + 'CRT Request ID: VI' + vendorInquiryObj.VENDOR_INQUIRY_ID + ' - New Message - ' + utilLib.getCurrentFormattedDate();
    return mailObj;
}