
function parseReturnToRequest(extendVendorObj, basicData, userName){
	var mailObj = {};
	var completePath = basicData.URL_BASE + basicData.PATH + '/' + extendVendorObj.EXTEND_VENDOR_REQUEST_ID;
	var extendId = 'EV' + extendVendorObj.EXTEND_VENDOR_REQUEST_ID;
	mailObj.body =  'Dear CRT Admin,<br /><br />Your <b>Extend Vendor</b> '+
	'has been returned to you with an <b>Action and/or Response that is '+
	'required</b> in order to process your request.<br /><br /><br />'+
	'A message has been added to the Message History for your request '+
	'<b> EV'+extendVendorObj.EXTEND_VENDOR_REQUEST_ID+'</b> in the <b>Cart Request Tool.</b><br /><br />'+
	'Log in to CRT, then click the following '+
	'link to process this specific request: '+
	'<a href="'+completePath+'">' + extendId + '</a><br /><br />';
	mailObj.subject = basicData.ENVIRONMENT+'CRT Request ID: EV'+extendVendorObj.EXTEND_VENDOR_REQUEST_ID+' - Action/Response Required Message - '+getDateNow()+'';
	return mailObj;
}

function parseCancelled(extendVendorObj,basicData, userName){
	var mailObj = {};
	var completePath = basicData.URL_BASE + basicData.PATH + '/' + extendVendorObj.EXTEND_VENDOR_REQUEST_ID;
	var extendId = 'EV' + extendVendorObj.EXTEND_VENDOR_REQUEST_ID;
	mailObj.body =  'Dear CRT Admin,<br /><br />Your <b>EV'+extendVendorObj.EXTEND_VENDOR_REQUEST_ID+'</b> has been <b>Cancelled.</b>'+
	'<br /><br />The reason for cancellation has been recorded in the Message History as '+
	'FYI Only, requiring no response.<br /><br />Log in to CRT, '+
	'then click the following link to process this specific request: '+
	'<a href="'+completePath+'">' + extendId + '</a><br /><br />';
	mailObj.subject = basicData.ENVIRONMENT+'CRT Request ID: EV'+extendVendorObj.EXTEND_VENDOR_REQUEST_ID+' - Extend Vendor - has been Cancelled - '+getDateNow()+'';
	return mailObj;
}

function parseSubmit(extendVendorObj,basicData, userName){
	var mailObj = {};
	var completePath = basicData.URL_BASE + basicData.PATH + '/' + extendVendorObj.EXTEND_VENDOR_REQUEST_ID;
	var extendId = 'EV' + extendVendorObj.EXTEND_VENDOR_REQUEST_ID;
	mailObj.body =  '<b>Dear CRT Admin,</b><br /><br /> You have new activity within the '+
	'<b>Cart Request Tool.</b><br /><br /> <b>Requester '+userName+' has created a  EV'+extendVendorObj.EXTEND_VENDOR_REQUEST_ID+'</b>'+
	'<br /><br /> Log in to CRT, then click the following '+
	'link to process this specific request: '+
	'<a href="'+completePath+'">' + extendId + '</a><br /><br />';
	mailObj.subject = basicData.ENVIRONMENT+'CRT Request ID: EV'+extendVendorObj.EXTEND_VENDOR_REQUEST_ID+' - Extend Vendor Created - '+getDateNow()+'';
	return mailObj;
}

function parseResubmitted(extendVendorObj, basicData, userName){
	var mailObj = {};
	var completePath = basicData.URL_BASE + basicData.PATH + '/' + extendVendorObj.EXTEND_VENDOR_REQUEST_ID;
	var extendId = 'EV' + extendVendorObj.EXTEND_VENDOR_REQUEST_ID;
	mailObj.body = '<b>Dear CRT Admin,</b><br /><br /> You have new activity within the '+
	'<b>Cart Request Tool.</b><br /><br /> <b>Requester '+userName+'</b> has re-submitted a '+
	'<b> EV'+extendVendorObj.EXTEND_VENDOR_REQUEST_ID+'</b><br /><br /> Log in to CRT, then click '+
	'the following link to process this specific request: '+
	'<a href="'+completePath+'">' + extendId + '</a><br /><br />';
	mailObj.subject = basicData.ENVIRONMENT+'CRT Request ID: EV'+extendVendorObj.EXTEND_VENDOR_REQUEST_ID+' - Extend Vendor Re-Submitted - '+getDateNow()+'';
	return mailObj;
}

function parseApproved(extendVendorObj, basicData, userName){
	var mailObj = {};
	var completePath = basicData.URL_BASE + basicData.PATH + '/' + extendVendorObj.EXTEND_VENDOR_REQUEST_ID;
	var extendId = 'EV' + extendVendorObj.EXTEND_VENDOR_REQUEST_ID;
	mailObj.body = '<b>Dear CRT Admin,</b><br /><br />Your <b>EV</b> is now <b>Approved.'+
	'</b><br /><br /><b>Vendor ID # '+extendVendorObj.VENDOR_ID+'</b> has been issued on '+
	'<b>'+getDateNow()+'</b><br /><br />The message is FYI Only, requiring no response.: '+
	'<br /><br />Log in to CRT, then click the following '+
	'link to process this specific request: '+
	'<a href="'+completePath+'">' + extendId + '</a><br /><br />';
	mailObj.subject = basicData.ENVIRONMENT+'CRT Request ID: EV'+extendVendorObj.EXTEND_VENDOR_REQUEST_ID+' - Extend Vendor Approved - '+getDateNow()+'';
	return mailObj;
}

function parseInProcess(extendVendorObj, basicData, userName){
	var mailObj = {};
	var completePath = basicData.URL_BASE + basicData.PATH + '/' + extendVendorObj.EXTEND_VENDOR_REQUEST_ID;
	var extendId = 'EV' + extendVendorObj.EXTEND_VENDOR_REQUEST_ID;
	mailObj.body =  '<b>Dear CRT Admin,</b><br /><br />Your <b>EV'+extendVendorObj.EXTEND_VENDOR_REQUEST_ID+'</b> is now '+
	'<b>In Process.</b><br /><br /><b>Cart # / YVC #: '+extendVendorObj.RECEIVER_YVC_REQUEST+'</b> '+
	'has been submitted.<br /><br />The message is FYI Only, requiring no '+
	'response.<br /><br />Log in to CRT, then click the following link to process this specific request: '+
	'<a href="'+completePath+'">' + extendId + '</a><br /><br />';
	mailObj.subject = basicData.ENVIRONMENT+'CRT Request ID: EV'+extendVendorObj.EXTEND_VENDOR_REQUEST_ID+' - Extend Vendor is In Process - '+getDateNow()+'';
	return mailObj;
}

function parseFYI(extendVendorObj, basicData, userName){
	var mailObj = {};
	var completePath = basicData.URL_BASE + basicData.PATH + '/' + extendVendorObj.EXTEND_VENDOR_REQUEST_ID;
	var extendId = 'EV' + extendVendorObj.EXTEND_VENDOR_REQUEST_ID;
	mailObj.body =  '<b>Dear CRT Admin,</b><br /><br />A message has been added to the '+
	'Message History tab for your request <b>EV'+extendVendorObj.EXTEND_VENDOR_REQUEST_ID+'</b> in the <b>Cart Request Tool.'+
	'</b><br /><br />The message is <b>FYI Only, requiring no response.</b><br /><br /> '+
	'Log in to CRT, then click the following link to process this specific request: '+
	'<a href="'+completePath+'">' + extendId + '</a><br /><br />';
	mailObj.subject = basicData.ENVIRONMENT+'CRT Request ID: EV'+extendVendorObj.EXTEND_VENDOR_REQUEST_ID+' - FYI Only Messagge - '+getDateNow()+'';
	return mailObj;
}

function parseMessage(extendVendorObj, basicData,  userName){
	var mailObj = {};
	var completePath = basicData.URL_BASE + basicData.PATH + '/' + extendVendorObj.EXTEND_VENDOR_REQUEST_ID;
	var extendId = 'EV' + extendVendorObj.EXTEND_VENDOR_REQUEST_ID;
	mailObj.body = '<b>Dear CRT Admin,</b><br /><br />A message has been '+
	'added to the Message History tab for <b>VI'+extendVendorObj.EXTEND_VENDOR_REQUEST_ID+'</b> in the <b>Cart Request Tool.</b>'+
	'<br /><br /> Log in to CRT, then click the'+
	'following link to process this specific request: '+
	'<a href="' + completePath + '">' + extendId + '</a><br/><br />';
	mailObj.subject = basicData.ENVIRONMENT+'CRT Request ID: EV'+extendVendorObj.EXTEND_VENDOR_REQUEST_ID+' - New Message - '+getDateNow()+'';
	return mailObj;
}

function getDateNow(){
	var d = new Date();

	var dateString = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
	d.getHours() + ":" + d.getMinutes();
	return dateString;
}