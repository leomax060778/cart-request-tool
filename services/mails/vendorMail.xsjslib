
function parseSubmit(vendorObj,basicData, userName){
	var mailObj = {};
	var completePath = basicData.URL_BASE + basicData.PATH + '/' + vendorObj.REQUEST_ID;
	var vendorRequestId = 'NV' + vendorObj.REQUEST_ID;
	mailObj.body =  '<b>Dear CRT Admin,</b><br /><br />You have new activity within the <b>Cart Request Tool.</b><br />'+
	'<br /><b>Requester '
	+ userName +
	' has created a NV'
	+ vendorObj.REQUEST_ID +
	'</b><br /><br />Log in to CRT, then click the following link to process this specific request: '+
	'<a href="' + completePath +'">NV' + vendorRequestId + '</a><br /><br />';
	mailObj.subject = basicData.ENVIRONMENT+'CRT Request ID: NV'+ vendorObj.REQUEST_ID +' - New Vendor Created - '+getDateNow()+'';
	return mailObj;
}

function parseCancelled(vendorObj,basicData, userName){
	var mailObj = {};
	var completePath = basicData.URL_BASE + basicData.PATH + '/' + vendorObj.VENDOR_REQUEST_ID;
	var vendorRequestId = 'NV' + vendorObj.REQUEST_ID;
	mailObj.body =  'Dear '
	+ userName +
	',<br /><br />Your <b>NV'
	+ vendorObj.VENDOR_REQUEST_ID +
	'</b> has been <b>Cancelled.</b><br /><br />The reason for cancellation has been recorded in the Message History as FYI Only, requiring no response.<br />'+
	'<br />Log in to CRT, then click the following link to process this specific request: '+
	'<a href="' + completePath +'">' + vendorObj.VENDOR_REQUEST_ID + '</a><br /><br />';
	mailObj.subject = basicData.ENVIRONMENT+'CRT Request ID: NV'+ vendorObj.VENDOR_REQUEST_ID +' - New Vendor - has been Cancelled - '+getDateNow()+'';
	return mailObj;
}

function parseResubmitted(vendorObj, basicData, userName){
	var mailObj = {};
	var completePath = basicData.URL_BASE + basicData.PATH + '/' + vendorObj.REQUEST_ID;
	var vendorRequestId = 'NV' + vendorObj.REQUEST_ID;
	mailObj.body =  '<b>Dear CRT Admin,</b><br /><br /> You have new activity within the <b>Cart Request Tool.'+
	'</b><br /><br /> <b>Requester '+userName+'</b> has re-submitted a <b>NV'+vendorObj.REQUEST_ID+'</b><br /><br /> '+
	'Log in to CRT, then click the following link to process this specific request: '+
	'<a href="' + completePath +'">' + vendorRequestId + '</a><br /><br />';
	mailObj.subject = basicData.ENVIRONMENT+'CRT Request ID: NV'+ vendorObj.REQUEST_ID +' - New Vendor Re-Submitted - '+getDateNow()+'';
	return mailObj;
}

function parseApproved(vendorObj, basicData, userName){
	var mailObj = {};
	var completePath = basicData.URL_BASE + basicData.PATH + '/' + vendorObj.REQUEST_ID;
	var vendorRequestId = 'NV' + vendorObj.REQUEST_ID;
	mailObj.body =  '<b>Dear CRT Admin,</b><br /><br />Your <b>NV</b> is now <b>Approved.</b><br /><br />'+
	'<b>Vendor ID # '+vendorObj.VENDOR_ID+'</b> has been issued on <b>'+getDateNow()+'</b><br /><br />The message '+
	'is FYI Only, requiring no response.<br /><br />Log in to CRT, then click the following link to process this specific request: '+
	'<a href="' + completePath +'">' + vendorRequestId + '</a><br /><br />';
	mailObj.subject = basicData.ENVIRONMENT+'CRT Request ID: NV'+ vendorObj.VENDOR_REQUEST_ID +' - New Vendor Approved - '+getDateNow()+'';
	return mailObj;
}

function parseInProcess(vendorObj, basicData, userName){
	var mailObj = {};
	var completePath = basicData.URL_BASE + basicData.PATH + '/' + vendorObj.REQUEST_ID;
	var vendorRequestId = 'NV' + vendorObj.REQUEST_ID;
	mailObj.body =  '<b>Dear CRT Admin,</b><br /><br />Your <b>NV</b> is now <b>In Process.</b><br /><br />'+
	'<b>YVC Request #: '+vendorObj.RECEIVER_YVC_REQUEST+'</b> has been submitted.<br /><br />The message is FYI Only, '+
	'requiring no response.<br /><br /> Log in to CRT, then click the '+
	'following link to process this specific request: '+
	'<a href="' + completePath +'">' + vendorRequestId + '</a><br /><br />';
	mailObj.subject = basicData.ENVIRONMENT+'CRT Request ID: NV'+ vendorObj.VENDOR_REQUEST_ID +' - New Vendor is In Process - '+getDateNow()+'';
	return mailObj;
}

function parseFYI(vendorObj, basicData, userName){
	var mailObj = {};
	var completePath = basicData.URL_BASE + basicData.PATH + '/' + vendorObj.REQUEST_ID;
	completePath = (basicData.ADDITIONAL_PARAM)? completePath+basicData.ADDITIONAL_PARAM : completePath;
	
	var vendorRequestId = 'NV' + vendorObj.REQUEST_ID;
	mailObj.body =  '<b>Dear CRT Admin,</b><br /><br />A message has been added to the Message '+
	'History tab for your request <b>NV'+vendorObj.REQUEST_ID+'</b> in the <b>Cart Request Tool.</b><br />'+
	'<br />The message is <b>FYI Only, requiring no response.</b><br /><br /> Log in to CRT'+
	', then click the following link to process this specific request: '+
	'<a href="' + completePath +'">' + vendorRequestId + '</a><br /><br />';
	mailObj.subject = basicData.ENVIRONMENT+'CRT Request ID: NV'+ vendorObj.REQUEST_ID +' - FYI Only Messagge - '+getDateNow()+'';
	return mailObj;
}

function parseReturnToRequest(vendorObj, basicData, userName){
	var mailObj = {};
	var completePath = basicData.URL_BASE + basicData.PATH + '/' + vendorObj.REQUEST_ID;
	var vendorRequestId = 'NV' + vendorObj.REQUEST_ID;
	mailObj.body =  'Dear CRT Admin,<br /><br />Your <b>New Vendor</b> has been returned to you with '+
	'an <b>Action and/or Response that is required</b> in order to process your request.<br />'+
	'<br /><br />A message has been added to the Message History for your request <b>NV'+vendorObj.REQUEST_ID+'</b>'+
	' in the <b>Cart Request Tool.</b><br /><br />Log in to CRT, and click the following link to process this specific request: '+
	'<a href="' + completePath +'">' + vendorRequestId + '</a><br /><br />';
	mailObj.subject = basicData.ENVIRONMENT+'CRT Request ID: NV'+ vendorObj.REQUEST_ID +' - Action/Response Required Message - '+getDateNow()+'';
	return mailObj;
}

function parseMessage(vendorObj, basicData,  userName){
	var mailObj = {};
	var completePath = basicData.URL_BASE + basicData.PATH + '/' + vendorObj.REQUEST_ID;
	completePath = (basicData.ADDITIONAL_PARAM)? completePath+basicData.ADDITIONAL_PARAM : completePath;
	
	var vendorRequestId = 'NV' + vendorObj.REQUEST_ID;
	mailObj.body = '<b>Dear CRT Admin,</b><br /><br />A message has been '+
	'added to the Message History tab for <b>VI'+vendorObj.REQUEST_ID+'</b> in the <b>Cart Request Tool.</b>'+
	'<br /><br /> Log in to CRT, then click the'+
	'following link to process this specific request: '+
	'<a href="' + completePath + '">' + vendorRequestId + '</a><br/><br />';
	mailObj.subject = basicData.ENVIRONMENT+'CRT Request ID: NV'+vendorObj.REQUEST_ID+' - New Message - '+getDateNow()+'';
	return mailObj;
}

function getDateNow(){
	var d = new Date();

	var dateString = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
	d.getHours() + ":" + d.getMinutes();
	return dateString;
}