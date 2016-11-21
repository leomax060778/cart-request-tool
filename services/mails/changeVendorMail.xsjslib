
function parseReturnToRequest(changeVendorObj, path, userName){
	var mailObj = {};
	mailObj.body = 'Dear '+userName+',<br /><br />Your <b>Change Vendor</b> has been returned'+
	' to you with an <b>Action and/or Response that is required</b> in order to process'+
	' your request.<br /><br /><br />A message has been added to the Message History '+
	'for your request <b>CV'+changeVendorObj.CHANGE_VENDOR_REQUEST_ID+'</b> in the <b>Cart Request Tool.</b><br /><br />'+
	'Log in to CRT using Google Chrome, then copy and paste the following link if '+
	'you would like to access this specific request: '+
	'<a href="'+path+'">Home Page</a><br /><br />';
	mailObj.subject = 'CRT Request ID: CV'+changeVendorObj.CHANGE_VENDOR_REQUEST_ID+' - Action/Response Required Message - '+getDateNow()+'';
	return mailObj;
}

function parseCanceled(changeVendorObj,path, userName){
	var mailObj = {};
	mailObj.body =  'Dear '+userName+',<br /><br />Your <b>CV'+changeVendorObj.CHANGE_VENDOR_REQUEST_ID+'</b> has been <b>Cancelled.</b><br />'+
	'<br />The reason for cancellation has been recorded in the Message History as FYI Only, '+
	'requiring no response.<br /><br />Log in to CRT using Google Chrome, then copy and paste '+
	'the following link if you would like to access this specific request: '+
	'<a href="'+path+'">Home Page</a><br /><br />';
	mailObj.subject = 'CRT Request ID: CV'+changeVendorObj.CHANGE_VENDOR_REQUEST_ID+' - Change Vendor - has been Cancelled - '+getDateNow()+'';
	return mailObj;
}

function parseSubmit(changeVendorObj,path, userName){
	var mailObj = {};
	mailObj.body =  '<b>Dear CRT Admin,</b> <br /> <br /> You have new activity within the '+
	'<b>Cart Request Tool.</b> <br /> <br /> <b>Requester '+userName+' has created a '+
	'CV'+changeVendorObj.CHANGE_VENDOR_REQUEST_ID+'</b> <br /> <br /> Log in to CRT using Google Chrome, then copy and '+
	'paste the following link if you would like to access this specific request: '+
	'<a href="'+path+'">Home Page</a><br /><br />';
	mailObj.subject = 'CRT Request ID: CV'+changeVendorObj.CHANGE_VENDOR_REQUEST_ID+' - Change Vendor Created - '+getDateNow()+'';
	return mailObj;
}

function parseResubmitted(changeVendorObj, path , userName){
	var mailObj = {};
	mailObj.body =  '<b>Dear CRT Admin,</b> <br /> <br /> You have new activity within the '+
	'<b>Cart Request Tool.</b> <br /> <br /> <b>Requester '+userName+'</b>  '+
	'has re-submitted a  <b>CV'+changeVendorObj.CHANGE_VENDOR_REQUEST_ID+'</b> <br /> <br /> Log in to CRT using '+
	'Google Chrome, then copy and paste the following link if you would like to '+
	'access this specific request:  '+
	'<a href="'+path+'">Home Page</a><br /><br />';
	mailObj.subject = 'CRT Request ID: CV'+changeVendorObj.CHANGE_VENDOR_REQUEST_ID+' - Change Vendor Re-Submitted - '+getDateNow()+'';
	return mailObj;
}

function parseApproved(changeVendorObj, path, userName){
	var mailObj = {};
	mailObj.body =  '<b>Dear '+userName+',</b><br /><br />Your <b>CV'+changeVendorObj.CHANGE_VENDOR_REQUEST_ID+'</b> is now <b>Approved.</b>'+
	'<br /><br /><b>Vendor ID #: '+changeVendorObj.VENDOR_ID+' </b> has been issued on <b>'+changeVendorObj.CHANGE_VENDOR_REQUEST_ID+'</b>'+
	'<br /><br />The message is FYI Only, requiring no response.<br /><br />Log in to CRT '+
	'using Google Chrome, then copy and paste the following link if you would like to '+
	'access this specific request: '+
	'<a href="'+path+'">Home Page</a><br /><br />';
	mailObj.subject = 'CRT Request ID: CV'+changeVendorObj.CHANGE_VENDOR_REQUEST_ID+' - Change Vendor Approved - '+getDateNow()+'';
	return mailObj;
}

function parseFYI(changeVendorObj, path, userName){
	var mailObj = {};
	mailObj.body =  '<b>Dear '+userName+',</b><br /><br /> A message has been added to the '+
	'Message History tab for your request <b>CV'+changeVendorObj.CHANGE_VENDOR_REQUEST_ID+'</b> in the <b>Cart '+
	'Request Tool.</b><br /><br /> The message is <b>FYI Only, requiring no '+
	'response.</b><br /><br />  Log in to CRT using Google Chrome, then copy '+
	'and paste the following link if you would like to access this specific '+
	'request: '+
	'<a href="'+path+'">Home Page</a><br /><br />';
	mailObj.subject = 'CRT Request ID: CV'+changeVendorObj.CHANGE_VENDOR_REQUEST_ID+' - FYI Only Messagge - '+getDateNow()+'';
	return mailObj;
}

function parseInProcess(changeVendorObj, path, userName){
	var mailObj = {};
	mailObj.body =  '<b>Dear '+userName+',</b><br /><br />Your <b>CV'+changeVendorObj.CHANGE_VENDOR_REQUEST_ID+'</b> '+
	'is now <b>In Process.</b><br /><br /><b>YVC Request #: #YVC_SYSTEM# '+
	'</b> has been submitted.<br /><br />The message is FYI Only, '+
	'requiring no response. <br /><br /> Log in to CRT using Google Chrome, '+
	'then copy and paste the following link if you would like to access this '+
	'specific request: '+
	'<a href="'+path+'">Home Page</a><br /><br />';
	mailObj.subject = 'CRT Request ID: CV'+changeVendorObj.CHANGE_VENDOR_REQUEST_ID+' - Change Vendor is In Process - '+getDateNow()+'';
	return mailObj;
}

function getDateNow(){
	var d = new Date();

	var dateString = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
	d.getHours() + ":" + d.getMinutes();
	return dateString;
}