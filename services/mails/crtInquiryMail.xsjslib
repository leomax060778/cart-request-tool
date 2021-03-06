
function parseReturnToRequest(inquiryObj, basicData, userName){
	var mailObj = {};
	var completePath = basicData.URL_BASE + basicData.PATH + '/' + inquiryObj.INQUIRY_ID;
	var inquiryId = 'CI' + inquiryObj.INQUIRY_ID;
	mailObj.body =  'Dear CRT Admin,<br /><br />Your <b>CRT Inquiry</b> has been returned to you with an '+
	'<b>Action and/or Response that is required</b> in order to process your request.<br /><br />'+
	'A message has been added to the Message History for your request <b>CI'+inquiryObj.INQUIRY_ID+'</b> in the <b>Cart '+
	'Request Tool.</b><br /><br />Log in to CRT, then click the following '+
	'link to process this specific request: '+
	'<a href="' + completePath + '">' + inquiryId + '</a><br /><br />';
	mailObj.subject = basicData.ENVIRONMENT+'CRT Request ID: CI'+inquiryObj.INQUIRY_ID+' - Action/Response Required Message - '+getDateNow()+'';
	return mailObj;
}

function parseSubmit(inquiryObj, basicData, userName){
	var mailObj = {};
	var completePath = basicData.URL_BASE + basicData.PATH + '/' + inquiryObj.INQUIRY_ID;
	var inquiryId = 'CI' + inquiryObj.INQUIRY_ID;
	mailObj.body =  '<b>Dear CRT Admin,</b><br /><br /> You have new activity within the <b>Cart Request Tool.</b>'+
	'<br /><br /> <b>Requester '+userName+' has created a CI'+inquiryObj.INQUIRY_ID+'</b><br /><br /> Log in to CRT'+
	', then click the following link to process this specific request: '+
	'<a href="' + completePath + '">' + inquiryId + '</a><br /><br />';
	mailObj.subject = basicData.ENVIRONMENT+'CRT Request ID: CI'+inquiryObj.INQUIRY_ID+' - CRT Inquiry Created - '+getDateNow()+'';
	return mailObj;
}

function parseCancelled(inquiryObj, basicData, userName){
	var mailObj = {};
	var completePath = basicData.URL_BASE + basicData.PATH + '/' + inquiryObj.INQUIRY_ID;
	var inquiryId = 'CI' + inquiryObj.INQUIRY_ID;
	mailObj.body =  'Dear CRT Admin,<br /><br />Your <b>CI'+inquiryObj.INQUIRY_ID+'</b> has been <b>Cancelled.</b><br /><br />'+
	'The reason for cancellation has been recorded in the Message History as FYI Only, requiring no response.'+
	'<br /><br />Log in to CRT, then click the following link to process this specific request: '+
	'<a href="' + completePath + '">' + inquiryId + '</a><br /><br />';
	mailObj.subject = basicData.ENVIRONMENT+'CRT Request ID: CI'+inquiryObj.INQUIRY_ID+' - CRT Inquiry has been Cancelled - '+getDateNow()+'';
	return mailObj;
}

function parseResubmitted(inquiryObj, basicData, userName){
	var mailObj = {};
	var completePath = basicData.URL_BASE + basicData.PATH + '/' + inquiryObj.INQUIRY_ID;
	var inquiryId = 'CI' + inquiryObj.INQUIRY_ID;
	mailObj.body = '<b>Dear CRT Admin,</b><br /><br /> You have new activity within the <b>Cart Request Tool.'+
	'</b><br /><br /> <b>Requester '+userName+'</b> has re-submitted a <b>CI'+inquiryObj.INQUIRY_ID+'</b><br /><br />'+
	' Log in to CRT, then click the following link to process this specific request: '+
	'<a href="' + completePath + '">' + inquiryId + '</a><br /><br />';
	mailObj.subject = basicData.ENVIRONMENT+'CRT Request ID: CI'+inquiryObj.INQUIRY_ID+' - CRT Inquiry Re-Submitted - '+getDateNow()+'';
	return mailObj;
}

function parseCompleted(inquiryObj, basicData, userName){
	var mailObj = {};
	var completePath = basicData.URL_BASE + basicData.PATH + '/' + inquiryObj.INQUIRY_ID;
	var inquiryId = 'CI' + inquiryObj.INQUIRY_ID;
	mailObj.body =  'Dear CRT Admin<br /><br />Your <b>CI'+inquiryObj.INQUIRY_ID+'</b> has been <b>Completed.</b><br /><br />'+
	'You may review the response in the Message History of your inquiry.<br /><br />Log in to CRT'+
	', then click the following link to process this specific request: '+
	'<a href="' + completePath + '">' + inquiryId + '</a><br /><br />';
	mailObj.subject = basicData.ENVIRONMENT+'CRT Request ID: CI'+inquiryObj.INQUIRY_ID+' - CRT Inquiry Completed - '+getDateNow()+'';
	return mailObj;
}

function parseFYI(inquiryObj, basicData, userName){
	var mailObj = {};
	var completePath = basicData.URL_BASE + basicData.PATH + '/' + inquiryObj.INQUIRY_ID;
	var inquiryId = 'CI' + inquiryObj.INQUIRY_ID;
	mailObj.body =  '<b>Dear CRT Admin,</b><br /><br />A message has been added to the Message History '+
	'tab for your request <b>CI'+inquiryObj.INQUIRY_ID+'</b> in the <b>Cart Request Tool.</b><br /><br />'+
	'The message is <b>FYI Only, requiring no response.</b><br /><br />Log in to CRT'+
	', then click the following link to process this specific request: '+
	'<a href="' + completePath + '">' + inquiryId + '</a><br /><br />';
	mailObj.subject = basicData.ENVIRONMENT+'CRT Request ID: CI'+inquiryObj.INQUIRY_ID+' - FYI Only Message - '+getDateNow()+'';
	return mailObj;
}

function parseMessage(inquiryObj, basicData, userName){
	var mailObj = {};
	var completePath = basicData.URL_BASE + basicData.PATH + '/' + inquiryObj.INQUIRY_ID;
	var inquiryId = 'CI' + inquiryObj.INQUIRY_ID;
	mailObj.body =  '<b>Dear CRT Admin,</b><br /><br />A message has been added to the Message History '+
	'tab for <b>CI'+inquiryObj.INQUIRY_ID+'</b> in the <b>Cart Request Tool.</b><br /><br />'+
	'Log in to CRT, then click the following link to process this specific request: '+
	'<a href="' + completePath + '">' + inquiryId + '</a><br /><br />';
	mailObj.subject = basicData.ENVIRONMENT+'CRT Request ID: CI'+inquiryObj.INQUIRY_ID+' - FYI Only Message - '+getDateNow()+'';
	return mailObj;
}

function getDateNow(){
	var d = new Date();

	var dateString = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
	d.getHours() + ":" + d.getMinutes();
	return dateString;
}