
function parseReturnToRequest(inquiryObj,urlBase, path, userName){
	var mailObj = {};
	mailObj.body =  'Dear '+userName+',<br /><br />Your <b>CRT Inquiry</b> has been returned to you with an '+
	'<b>Action and/or Response that is required</b> in order to process your request.<br /><br />'+
	'A message has been added to the Message History for your request <b>CI'+inquiryObj.INQUIRY_ID+'</b> in the <b>Cart '+
	'Request Tool.</b><br /><br />Log in to CRT, then copy and paste the following '+
	'link if you would like to access this specific request: '+
	'<a href="'+urlBase+path+'">INQUIRY</a><br /><br />';
	mailObj.subject = 'CRT Request ID: CI'+inquiryObj.INQUIRY_ID+' - Action/Response Required Message - '+getDateNow()+'';
	return mailObj;
}

function parseSubmit(inquiryObj,urlBase, path, userName){
	var mailObj = {};
	mailObj.body =  '<b>Dear CRT '+userName+',</b><br /><br /> You have new activity within the <b>Cart Request Tool.</b>'+
	'<br /><br /> <b>Requester '+userName+' has created a CI'+inquiryObj.INQUIRY_ID+'</b><br /><br /> Log in to CRT'+
	', then copy and paste the following link if you would like to access this specific request: '+
	'<a href="'+urlBase+path+'">INQUIRY</a><br /><br />';
	mailObj.subject = 'CRT Request ID: CI'+inquiryObj.INQUIRY_ID+' - CRT Inquiry Created - '+getDateNow()+'';
	return mailObj;
}

function parseCancelled(inquiryObj, urlBase, path, userName){'+'
	var mailObj = {};
	mailObj.body =  'Dear '+userName+',<br /><br />Your <b>CI'+inquiryObj.INQUIRY_ID+'</b> has been <b>Cancelled.</b><br /><br />'+
	'The reason for cancellation has been recorded in the Message History as FYI Only, requiring no response.'+
	'<br /><br />Log in to CRT, then copy and paste the following link if you would '+
	'like to access this specific request: '+
	'<a href="'+urlBase+path+'">INQUIRY</a><br /><br />';
	mailObj.subject = 'CRT Request ID: CI'+inquiryObj.INQUIRY_ID+' - CRT Inquiry has been Cancelled - '+getDateNow()+'';
	return mailObj;
}

function parseResubmitted(inquiryObj, urlBase, path, userName){
	var mailObj = {};
	mailObj.body = '<b>Dear CRT '+userName+',</b><br /><br /> You have new activity within the <b>Cart Request Tool.'+
	'</b><br /><br /> <b>Requester '+userName+'</b> has re-submitted a <b>CI'+inquiryObj.INQUIRY_ID+'</b><br /><br />'+
	' Log in to CRT, then copy and paste the following link if you would like to '+
	'access this specific request: '+
	'<a href="'+urlBase+path+'">INQUIRY</a><br /><br />';
	mailObj.subject = 'CRT Request ID: CI'+inquiryObj.INQUIRY_ID+' - CRT Inquiry Re-Submitted - '+getDateNow()+'';
	return mailObj;
}

function parseCompleted(inquiryObj, urlBase, path, userName){
	var mailObj = {};
	mailObj.body =  'Dear '+userName+'<br /><br />Your <b>CI'+inquiryObj.INQUIRY_ID+'</b> has been <b>Completed.</b><br /><br />'+
	'You may review the response in the Message History of your inquiry.<br /><br />Log in to CRT'+
	', then copy and paste the following link if you would like to access this specific request: '+
	'<a href="'+urlBase+path+'">INQUIRY</a><br /><br />';
	mailObj.subject = 'CRT Request ID: CI'+inquiryObj.INQUIRY_ID+' - CRT Inquiry Completed - '+getDateNow()+'';
	return mailObj;
}

function parseFYI(inquiryObj, urlBase, path, userName){
	var mailObj = {};
	mailObj.body =  '<b>Dear '+userName+',</b><br /><br />A message has been added to the Message History '+
	'tab for your request <b>CI'+inquiryObj.INQUIRY_ID+'</b> in the <b>Cart Request Tool.</b><br /><br />'+
	'The message is <b>FYI Only, requiring no response.</b><br /><br />Log in to CRT'+
	', then copy and paste the following link if you would like to access this '+
	'specific request: '+
	'<a href="'+urlBase+path+'">INQUIRY</a><br /><br />';
	mailObj.subject = 'CRT Request ID: CI'+inquiryObj.INQUIRY_ID+' - FYI Only Message - '+getDateNow()+'';
	return mailObj;
}

function getDateNow(){
	var d = new Date();

	var dateString = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
	d.getHours() + ":" + d.getMinutes();
	return dateString;
}