
function parseReturnToRequest(vendorInquiryObj, urlBase, path, userName){
	var mailObj = {};
	mailObj.body =  'Dear '+userName+',<br /><br />Your <b>Vendor Inquiry</b> has been returned '+
	'to you with an <b>Action and/or Response that is required</b> in order to '+
	'process your request.<br /><br /><br />A message has been added to the Message '+
	'History for your request <b> VI'+vendorInquiryObj.VENDOR_INQUIRY_ID+'</b> in the <b>Cart Request Tool.</b><br />'+
	'<br />Log in to CRT using Google Chrome, then copy and paste the following link '+
	'if you would like to access this specific request: '+
	'<a href="'+urlBase+path+'">VENDOR INQUIRY</a><br /><br />';
	mailObj.subject = 'CRT Request ID: VI'+vendorInquiryObj.VENDOR_INQUIRY_ID+' - Action/Response Required Message - '+getDateNow()+'';
	return mailObj;
}

function parseCompleted(vendorInquiryObj,urlBase, path, userName){
	var mailObj = {};
	mailObj.body =  '<b>Dear '+userName+',</b><br /><br />Your <b>VI'+vendorInquiryObj.VENDOR_INQUIRY_ID+'</b> has been '+
	'<b>Completed.</b><br /><br />You may review the response in the '+
	'Message History of your inquiry.<br /><br />Log in to CRT using '+
	'Google Chrome, then copy and paste the following link if you would '+
	'like to access this specific request: '+
	'<a href="'+urlBase+path+'">VENDOR INQUIRY</a><br /><br />';
	mailObj.subject = 'CRT Request ID: VI'+vendorInquiryObj.VENDOR_INQUIRY_ID+' -Vendor Inquiry - has been Completed - '+getDateNow()+'';
	return mailObj;
}

function parseCancelled(vendorInquiryObj,urlBase, path, userName){
	var mailObj = {};
	mailObj.body =  'Dear '+userName+',<br /><br />Your <b>VI'+vendorInquiryObj.VENDOR_INQUIRY_ID+'</b> has been '+
	'<b>Cancelled.</b><br /><br />The reason for cancellation has been '+
	'recorded in the Message History as FYI Only, requiring no response.'+
	'<br /><br />Log in to CRT using Google Chrome, then copy and paste the '+
	'following link if you would like to access this specific request: '+
	'<a href="'+urlBase+path+'">VENDOR INQUIRY</a><br /><br />';
	mailObj.subject = 'CRT Request ID: VI'+vendorInquiryObj.VENDOR_INQUIRY_ID+' - Vendor Inquiry - has been Cancelled - '+getDateNow()+'';
	return mailObj;
}

function parseSubmit(vendorInquiryObj,urlBase, path, userName){
	var mailObj = {};
	mailObj.body =  '<b>Dear CRT Admin,</b><br /><br /> You have new activity within '+
	'the <b>Cart Request Tool.</b><br /><br /> <b>Requester '+userName+' has '+
	'created a VI'+vendorInquiryObj.VENDOR_INQUIRY_ID+'</b><br /><br /> Log in to CRT using Google Chrome, '+
	'then copy and paste the following link if you would like to access this '+
	'specific request: '+
	'<a href="'+urlBase+path+'">VENDOR INQUIRY</a><br /><br />';
	mailObj.subject = 'CRT Request ID: VI'+vendorInquiryObj.VENDOR_INQUIRY_ID+' - Vendor Inquiry Created - '+getDateNow()+'';
	return mailObj;
}

function parseResubmitted(vendorInquiryObj, urlBase , path, userName){
	var mailObj = {};
	mailObj.body =  '<b>Dear CRT Admin,</b><br /><br /> You have new activity within '+
	'the <b>Cart Request Tool.</b><br /><br /> <b>Requester '+userName+'</b> '+
	'has re-submitted a <b>VI'+vendorInquiryObj.VENDOR_INQUIRY_ID+'</b><br /><br /> Log in to CRT using Google Chrome, '+
	'then copy and paste the following link if you would like to access this specific '+
	'request:<br />'+
	'<a href="'+urlBase+path+'">VENDOR INQUIRY</a><br /><br />';
	mailObj.subject = 'CRT Request ID: VI'+vendorInquiryObj.VENDOR_INQUIRY_ID+' - Vendor Inquiry Re-Submitted - '+getDateNow()+'';
	return mailObj;
}

function parseFYI(vendorInquiryObj, urlBase, path, userName){
	var mailObj = {};
	mailObj.body =  '<b>Dear '+userName+',</b><br /><br />A message has been added to the '+
	'Message History tab for your request <b>VI'+vendorInquiryObj.VENDOR_INQUIRY_ID+'</b> in the <b>Cart Request Tool.'+
	'</b><br /><br />The message is <b>FYI Only, requiring no response.</b><br />'+
	'<br /> Log in to CRT using Google Chrome, then copy and paste the following '+
	'link if you would like to access this specific request: '+
	'<a href="'+urlBase+path+'">VENDOR INQUIRY</a><br /><br />';
	mailObj.subject = 'CRT Request ID: VI'+vendorInquiryObj.VENDOR_INQUIRY_ID+' - FYI Only Message - '+getDateNow()+'';
	return mailObj;
}

function getDateNow(){
	var d = new Date();

	var dateString = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
	d.getHours() + ":" + d.getMinutes();
	return dateString;
}