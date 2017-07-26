var destination_package = "xscartrequesttool.services.businessLayer.util";
var destination_name = "emailsendingwebapp";

try {
    var dest = $.net.http.readDestination(destination_package, destination_name);
    var client = new $.net.http.Client();
//    client.setTrustStore(); 
    var req = new $.web.WebRequest($.net.http.POST, ""); 
	       
	req.setBody(JSON.stringify({
		"addressTo": "iberon@folderit.net", //lhildt@folderit.net
		"addressBcc": "beronisaac@gmail.com", //leonardohildt@gmail.com
		"subject": "sent from BE",
		"message": "test from Postman via servlet"
	}));
					
   client.request(req, dest);
    //client.request(req, "emailsendingwebp1942151816tria.hanatrial.ondemand.com/EmailSendingWebAppTest2", "proxy-trial.od.sap.biz:443");
    var response = client.getResponse();  
       
    $.response.contentType = "application/json";
    $.response.setBody(response.body.asString());
    $.response.status = $.net.http.OK;
} catch (e) {
       $.response.contentType = "text/plain";
       $.response.setBody(e.message);
}
