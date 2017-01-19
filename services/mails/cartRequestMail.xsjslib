
function parseReturnToRequest(cartRequestObj, urlBase, path,  userName){
	var mailObj = {};
	mailObj.body = 'Dear '+userName+',<br /> <br /> Your <b>Cart Request</b> has been returned '+
	'to you with an <b>Action and/or Response that is required</b> in order to process '+
	'your request.<br /> <br /> A message has been added to the Message History for your '+
	'request <b>CR'+cartRequestObj.REQUEST_ID+'</b> in the <b>Cart Request Tool.</b><br /> <br /> Log in to '+
	'CRT, then copy and paste the following link if you would like '+
	'to access this specific request: <a href="'+urlBase+path+'">Cart Request Manager</a><br /> <br />';
	mailObj.subject = 'CRT Request ID: CR'+cartRequestObj.REQUEST_ID+' - Action/Response Required Message - '+getDateNow()+'';
	return mailObj;
}

function parseCancelled(cartRequestObj,urlBase, path,  userName){
	var mailObj = {};
	mailObj.body = 'Dear '+userName+',<br /><br />Your <b>CR'+cartRequestObj.REQUEST_ID+'</b> has been <b>Cancelled.</b><br />'+
	'<br />The reason for cancellation has been recorded in the Message History as FYI Only, '+
	'requiring no response.<br /><br />Log in to CRT, then copy and paste '+
	'the following link if you would like to access this specific request:'+ 
	'<a href="'+urlBase+path+'">Cart Request Manager</a><br/><br />';
	mailObj.subject = 'CRT Request ID: CR'+cartRequestObj.REQUEST_ID+' - Cart Request - has been Cancelled - '+getDateNow()+'';
	return mailObj;
}

function parseSubmit(cartRequestObj,urlBase, path,  userName){
	var mailObj = {};
	mailObj.body = '<b>Dear CRT Admin,</b> <br /> <br /> You have new activity within the '+
	'<b>Cart Request Tool.</b> <br /> <br /> <b>Requester '+userName+' has created a '+
	'CR'+cartRequestObj.REQUEST_ID+'</b> <br /> <br /> Log in to CRT, then copy '+
	'and paste the following link if you would like to access this specific request: '+
	'<a href="'+urlBase+path+'">Cart Request Manager</a><br/><br />';
	mailObj.subject = 'CRT Request ID: CR'+cartRequestObj.REQUEST_ID+' - Cart Request Created - '+getDateNow()+'';
	return mailObj;
}

function parseResubmitted(cartRequestObj, urlBase, path,  userName){
	var mailObj = {};
	mailObj.body = '<b>Dear CRT Admin,</b><br /><br /> You have new activity within the '+
	'<b>Cart Request Tool.</b><br /><br /> <b>Requester '+userName+'</b> has re-submitted a '+
	'<b>CR'+cartRequestObj.REQUEST_ID+'</b><br /><br /> Log in to CRT, then copy and '+
	'paste the following link if you would like to access this specific request: '+
	'<a href="'+urlBase+path+'">Cart Request Manager</a><br/><br />';
	mailObj.subject = 'CRT Request ID: CR'+cartRequestObj.REQUEST_ID+' - Cart Request Re-Submitted - '+getDateNow()+'';
	return mailObj;
}

function parseApproved(cartRequestObj, urlBase, path,  userName){
	var mailObj = {};
	mailObj.body = 'Dear '+userName+',<br /><br /> Your cart is now <b>Approved.</b><br /><br />'+
	parseTablePO(cartRequestObj) + '<br /><br /> Log in to CRT, then copy and paste the '+
	'following link if you would like to access this specific request: '+
	'<a href="'+urlBase+path+'">Cart Request Manager</a><br/><br />';
	mailObj.subject = 'CRT Request ID: CR'+cartRequestObj.REQUEST_ID+' - Cart Request Approved - '+getDateNow()+'';
	return mailObj;
}

function parseInProcess(cartRequestObj, urlBase, path,  userName){
	var mailObj = {};
	mailObj.body = 'Dear '+userName+',<br /><br />Your <b>Cart Request </b> is now <b>In Process.</b>'+
	'<br /><br /><b>Shopping Cart #: '+cartRequestObj.SHOPPING_CART+'</b> has been submitted.<br /><br />'+
	'The message is FYI Only, requiring no response. <br /><br />Log in to CRT using '+
	'Google Chrome, then copy and paste the following link if you would like to access '+
	'this specific request: '+
	'<a href="'+urlBase+path+'">Cart Request Manager</a><br/><br />';
	mailObj.subject = 'CRT Request ID: CR'+cartRequestObj.REQUEST_ID+' - Cart Request is In Process - '+getDateNow()+'';
	return mailObj;
}

function parseNewMessage(cartRequestObj, urlBase, path,  userName){
	var mailObj = {};
	mailObj.body = '<b>Dear '+userName+',</b><br /><br />A message has been '+
	'added to the Message History tab for <b>CR'+cartRequestObj.REQUEST_ID+'</b> in the <b>Cart Request Tool.</b>'+
	'<br /><br /> Log in to CRT, then copy and paste the'+
	'following link if you would like to access this specific request: '+
	'<a href="'+urlBase+path+'">Cart Request Manager</a><br/><br />';
	mailObj.subject = 'CRT Request ID: CR'+cartRequestObj.REQUEST_ID+' - New Message - '+getDateNow()+'';
	return mailObj;
}

function parseFYI(cartRequestObj, urlBase, path,  userName){
	var mailObj = {};
	mailObj.body =  '<b>Dear '+userName+',</b><br /><br />A message has been added to the '+
	'Message History tab for your request <b>CR'+cartRequestObj.REQUEST_ID+'</b> in the '+
	'<b>Cart Request Tool.</b><br /><br />The message is <b>FYI Only, '+
	'requiring no response.</b><br /><br />Log in to CRT, '+
	'then copy and paste the following link if you would like to access this '+
	'specific request: <a href="'+urlBase+path+'">Cart Request Manager</a><br/><br />';
	mailObj.subject = 'CRT Request ID: CR'+cartRequestObj.REQUEST_ID+' - FYI Only Messagge - '+getDateNow()+'';
	return mailObj;
}

function parseTablePO(cartRequestObj){
	var tablePO = '';
	if(Array.isArray(cartRequestObj.SERVICES) && cartRequestObj.SERVICES.length > 0){
		tablePO = '<table border="1" style="width:100%;border-collapse:collapse; ">';
		tablePO = tablePO + '<tr>';
		tablePO = tablePO + '<td style="text-align:center;"><span style="font-weight:bold;font-size:13px">Item#</span></td>';
		tablePO = tablePO + '<td style="text-align:center;"><span style="font-weight:bold;font-size:13px">Start Date</span></td>';
		tablePO = tablePO + '<td style="text-align:center;"><span style="font-weight:bold;font-size:13px">End Date</span></td>';
		tablePO = tablePO + '<td style="text-align:center;"><span style="font-weight:bold;font-size:13px">Description on PO</span></td>';
		tablePO = tablePO + '<td style="text-align:center;"><span style="font-weight:bold;font-size:13px">Amount</span></td>';
		tablePO = tablePO + '<td style="text-align:center;"><span style="font-weight:bold;font-size:13px">SC #</span></td>';
		tablePO = tablePO + '<td style="text-align:center;"><span style="font-weight:bold;font-size:13px">Cart Date</span></td>';  
		tablePO = tablePO + '<td style="text-align:center;"><span style="font-weight:bold;font-size:13px">PO #</span></td>';
		tablePO = tablePO + '<td style="text-align:center;"><span style="font-weight:bold;font-size:13px">PO Date</span></td>';
		tablePO = tablePO + '<td style="text-align:center;"><span style="font-weight:bold;font-size:13px">Line #</span></td>';		
		tablePO = tablePO + '</tr>';
		cartRequestObj.SERVICES.forEach(function(service) {
			tablePO= tablePO + '<tr>' + 
			'<td style="text-align:center;"><span style="font-size:13px">' + (service.SERVICE_ITEM_NUMBER || '') + '</span></td>'
			+ '<td style="text-align:center;"><span style="font-size:13px">' + ( service.SERVICE_START_DATE || '' ) + '</span></td>'
			+ '<td style="text-align:center;"><span style="font-size:13px">' + ( service.SERVICE_END_DATE ||'') + '</span></td>'
			+ '<td style="text-align:center;"><span style="font-size:13px">' + ( service.SERVICE_DESCRIPTION || '' ) + '</span></td>' 
			+ '<td style="text-align:center;"><span style="font-size:13px">' + ( service.SERVICE_AMOUNT || '' ) +'</span></td>'
			+ '<td style="text-align:center;"><span style="font-size:13px">' + ( service.PURCHASE_ORDER_SHOPPING_CART_NUMBER || '') + '</span></td>'
			+ '<td style="text-align:center;"><span style="font-size:13px">' + ( service.PURCHASE_ORDER_CART_DATE|| '') + '</span></td>'
			+ '<td style="text-align:center;"><span style="font-size:13px">' + ( service.PURCHASE_ORDER_NUMBER || '') + '</span></td>'
			+ '<td style="text-align:center;"><span style="font-size:13px">' + ( service.PURCHASE_ORDER_DATE || '') + '</span></td>'
			+ '<td style="text-align:center;"><span style="font-size:13px">' + ( service.SERVICE_LINE_NUMBER || '') + '</span></td>' +
			 '</tr>';
		});
		tablePO = tablePO+ '</table>';
	}
	return tablePO;
}

function getDateNow(){
	var d = new Date();

	var dateString = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
	d.getHours() + ":" + d.getMinutes();
	return dateString;
}