/** **** libs *********** */
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var httpUtil = mapper.getHttp();
var config = mapper.getDataConfig();
/** *************************************** */

/*
 * JSON EXAMPLE:
 *  { "FROM":"account@folderit.net",
 * "TO":[{"address":"info@gmail.com"},{"address":"info2@gmail.com"}],
 * "SUBJECT":"This is the subject", "BODY":"<html><head></head><body><p>Hell
 * World</p><a href='http://www.google.com/'>link</a></body></html>",
 * "CC":[{"address":"info@gmail.com"},{"address":"info2@gmail.com"}],
 * --OPTIONAL--
 * "BCC":[{"address":"info@gmail.com"},{"address":"info2@gmail.com"}],
 * --OPTIONAL-- }
 */

var sender = config.getSMTPAccount();
var typeText = "TEXT";
var typeInline = "INLINE";
var typeAttachment = "ATTACHMENT";

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validate(value) {

    var error = "";
    // validate FROM
    if (value.FROM == null)
        error = error + "-the From value is null";
    if (value.FROM == undefined)
        error = error + "-the From value is undefined";
    if (value.FROM.lenght <= 0)
        error = error + "-the From value empty";
    for (var i = 0; i < value.FROM.length; i++) {
    	if (!validateEmail(value.FROM[i].address))
            error = error + "-the From value is not a email address";
    }
    // validate TO
    if (value.TO == null)
        error = error + "-the TO value is null";
    if (value.TO == undefined)
        error = error + "-the TO value is undefined";
    if (value.TO.lenght <= 0)
        error = error + "-the TO value empty";
    for (var i = 0; i < value.TO.length; i++) {
        if (!validateEmail(value.TO[i].address))
            error = error + "-the TO value is not a email address";
    }

    // validate CC
    if (value.CC != null) {
        if (value.CC != undefined) {
            if (value.CC.length <= 0) {
                for (var i = 0; i < value.CC.length; i++) {
                    if (!validateEmail(value.CC[i].address))
                        error = error + "-the CC value is not a email address";
                }
            }
        }
    }

    // validate CC
    if (value.BCC != null) {
        if (value.BCC != undefined) {
            if (value.BCC.length <= 0) {
                for (var i = 0; i < value.BCC.length; i++) {
                    if (!validateEmail(value.BCC[i].address))
                        error = error + "-the BCC value is not a email address";
                }
            }
        }
    }

    // validate SUBJECT
    if (value.SUBJECT == null)
        error = error + "-the SUBJECT value is null";
    if (value.SUBJECT == undefined)
        error = error + "-the SUBJECT value is undefined";
    if (value.SUBJECT == "")
        error = error + "-the SUBJECT value empty";

    // validate BODY
    if (value.BODY == null)
        error = error + "-the BODY value is null";
    if (value.BODY == undefined)
        error = error + "-the BODY value is undefined";
    if (value.BODY == "")
        error = error + "-the BODY value empty";

    if (error != "") {
        throw ErrorLib.getErrors().BadRequest("", "", error);
    } else {
        return true;
    }

}

function getJson(TO, SUBJECT, BODY, CC, BCC) {
    if (!TO)
        TO = "";
    if (!SUBJECT)
        SUBJECT = "";
    if (!BODY)
        BODY = "";
    if (!CC)
        CC = "";
    if (!BCC)
        BCC = "";
    var rdo = {};
    rdo.FROM = sender;
    rdo.TO = TO;
    rdo.SUBJECT = SUBJECT;
    rdo.BODY = BODY;
    rdo.CC = CC;
    rdo.BCC = BCC;
    return rdo;
}

// Not used *******************************
function getParts(reqBody) {
    var rdo = new Array();
    if (reqBody) {
        if (reqBody.PARTS) {

            if (reqBody.PARTS.length > 0) {

                for (var i = 0; i < reqBody.PARTS.length; i++) {
                    var part = reqBody.PARTS[i];

                    if (part.type == typeText) {
                        var a = getTextPart(part);
                        rdo.push(a);
                    } else {
                        if (part.type == typeInline) {
                            rdo.push(getInlinePart(part));
                        } else {
                            if (part.type == typeAttachment) {
                                rdo.push(getAttachmentPart(part));
                            }
                        }
                    }
                }
            }
        }
    }
    return rdo;
}

// Extract the Type_Text part from json
function getTextPart(part) {
    var newPart = new $.net.Mail.Part();
    if (part) {
        newPart.type = $.net.Mail.Part.TYPE_TEXT;
        newPart.text = part.text
        newPart.contentType = part.contentType;
        newPart.alternative = part.alternative;
        newPart.alternativeContentType = part.alternativeContentType;
        newPart.encoding = part.encoding;
    }
    return newPart;
}

// Extract the Type_Inline part from json
function getInlinePart(part) {
    var newPart = new $.net.Mail.Part();
    if (part) {
        newPart.type = $.net.Mail.Part.TYPE_INLINE;
        newPart.data = part.data;
        newPart.contentType = part.contentType;
        newPart.contentId = part.contentId;
        newPart.fileName = part.fileName;
        newPart.fileNameEncoding = part.fileNameEncoding;
    }
    return newPart;
}

// Extract the Type_Attachment part from json
function getAttachmentPart(part) {
    var newPart = new $.net.Mail.Part();
    if (part) {
        newPart.type = $.net.Mail.Part.TYPE_ATTACHMENT;
        newPart.data = part.data;
        newPart.contentType = part.contentType;
        newPart.fileName = part.fileName;
        newPart.fileNameEncoding = part.fileNameEncoding;
    }
    return newPart;
}
// ******************************************

function getDefaultHeader() {
    var newPart = new $.net.Mail.Part();

    newPart.type = $.net.Mail.Part.TYPE_INLINE;
    newPart.data = ImageHeader;// get imagen;
    newPart.contentType = "image/jpg";
    newPart.contentId = "IMAGE1_ID";
    newPart.fileName = "fileName1.jpg";
    newPart.fileNameEncoding = "UTF-8";

    return newPart;

}

function getDefaultTemplate(body) {

    var textHtml =	"<body bgcolor='#ffffff' leftmargin='0' topmargin='0'>" +
        				"<table bgcolor='#ffffff' width='800' height='100%' border='0' align='center' cellpadding='0' cellspacing='0'>" +
        					"<tbody>" +
        						"<tr>" +
        							"<td style='background:#fff;padding:0;height:22.5pt'><p style='text-align:right;line-height:11pt'>" +
        								"<span style='font-weight:bold;color:#666;font-family:Arial,Helvetica,sans-serif'>FOR INTERNAL USE ONLY</span>" +
        							"</td>" +
        						"</tr>" +
        						"<tr style='height:15px'>" +
        							"<td style='background:#f0ab00;height:15px'>&nbsp;</td>" +
        						"</tr>" +
        						"<tr style='height:75px'>" +
        							"<td style='padding:0'>" +
        								"<table border='0' cellspacing='0' cellpadding='0' width='630' style='width:472.5pt'>" +
        									"<tbody>" +
        										"<tr>" +
        											"<td width='100' style='width:75pt;padding:0;height:.75in'><p><img width='91'" +
        												"src='http://www.sap.com/dam/application/shared/logos/sap-logo.png.adapt.72_36.false.false.false.false.png'" +
        												"alt='SAP Logo'></p></td>" +
        												"<td width='530'><p><span style='font-size:13pt;font-family:Arial,Helvetica,sans-serif'>GB & GC Marketing</span>" +
        												"<br> <span" +
        												"style='font-size:13pt;font-family:Arial,Helvetica,sans-serif'>Business Management</span>" +
        											"</p></td>" +
        										"</tr>" +
        									"</tbody>" +
        								"</table>" +
        							"</td>" +
        						"</tr>" +
        						"<tr style='height:12px'>" +
        							"<td style='background:#666;height:12px'>&nbsp;</td>" +
        						"</tr>" +
        						"<tr>" +
        							"<td valign='top' align='center'>" +
        								"<table width='100%' cellspacing='0' cellpadding='0' style='border:1px solid #C5BEBB'>" +
        									"<tr>" +
        										"<td valign='top' align='left'" +
        											"style='font-family:Arial,Helvetica,sans-serif;padding:25px;color:#333;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:16px'>" +
        								body +
        										"</td>" +
    										"</tr>" +
    										"<tr>" +
        										"<td valign='top' align='left' width='530' style='font-family:Arial,Helvetica,sans-serif;padding:25px;color:#666;font-size:13px;padding:0 25px;line-height:16px'>" +
        											"<span>Please do not reply to this email, as the mailbox is not monitored. All communications regarding this specific request can be viewed and sent from CRT, on the Message History tab of the request. The benefit is that all correspondence is visible and accessible in one archived location for easy reference.</span>" +
    											"</td>" +
        									"</tr>" +
        									"<tr>" +
        										"<td valign='top' align='left' style='padding:25px'>" +
	        										"<hr size='3' width='100%' noshade='' style='border-color:#666;background-color:#666' align='center'>" +
		    										"<br> <span style='font-weight: bold'>Business Processes Operations Team</span>" +
		    										"<br> <span>Business Management | GB & GC Marketing</span>" +
	    										"</td>" +
    										"</tr>" +
        								"</table>" +
        							"</td>" +
        						"</tr>" +
        					"</tbody>" +
        				"</table>" +
        			"</body>";

    return textHtml;

}

function sendEventMail(reqBody) {
	var mailTypeconfig = config.getSendMailType();
	var result;
	
	switch(mailTypeconfig){
	case "servlet":
		result = sendMailServlet(reqBody, true);
		break;
	case "smpt":
		result = sendMail(reqBody, true, config.getSMTPAccount());
		break;
	}
	
	return result;
}

function sendIncidentMail(reqBody) {
	var mailTypeconfig = config.getSendMailType();
	var result;
	
	switch(mailTypeconfig){
	case "servlet":
		result = sendMailServlet(reqBody, true);
		break;
	case "smpt":
		result = sendMail(reqBody, true, config.getSupportAccount());
		break;
	}
	
	return result;
}

// Send a email
function sendMail(reqBody, defaultBody, OptionalSender) {
    try {
   	
        if (validate(reqBody)) {
            var body = "";
            if (reqBody.BODY != null) {
                if (reqBody.BODY != undefined) {
                    body = reqBody.BODY;
                }
            }
            
            var message = "";
            if (defaultBody) {
            	message = message + getDefaultTemplate(body);
            }
            
            var jsonObject = {};

        	jsonObject.addressBcc = reqBody.FROM;
        	jsonObject.addressTo = reqBody.TO; //"iberon@folderit.net"
        	jsonObject.subject = reqBody.SUBJECT;
        	jsonObject.message = message;
            
        	return jsonObject;
        }
    } catch (e) {
        throw e;
    }
}

function sendMailServlet(reqBody, defaultBody){
/*	var destination_package = "xscartrequesttool.services.businessLayer.util";
	var destination_name = "emailsendingwebapp";
	
	var dest = $.net.http.readDestination(destination_package, destination_name);
	var client = new $.net.http.Client();
	var req = new $.net.http.Request($.net.http.POST, ""); 
		       
	req.setBody(JSON.stringify({
					  "addressTo": "iberon@folderit.net", //lhildt@folderit.net
					  "addressBcc": "beronisaac@gmail.com", //leonardohildt@gmail.com
					  "subject": "sent from BE",
					  "message": "test from Postman via servlet"
					}));
		       client.request(req, dest);
		       var response = client.getResponse();  
		       
		       $.response.contentType = "application/json";
		       $.response.setBody(response.body.asString());
		       $.response.status = $.net.http.OK;
		       
		       return response.body.asString();
		} catch (e) {
		       $.response.contentType = "text/plain";
		       $.response.setBody(e.message);
		} */
} 

var ImageHeader = "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCABgAGADAREAAhEBAxEB/8QAHAABAAIDAQEBAAAAAAAAAAAAAAcIAQYJBQIE/8QAQRAAAQIFAQUDBwgJBQAAAAAAAQIDAAQFBhEHCBIhMUETFBUWIlRxkZPRMlFhgZSh0vAkJUJERVWCkpVDYnJzg//EABsBAQACAwEBAAAAAAAAAAAAAAAGBwEEBQgD/8QAOREAAQIEAwQJAgQGAwAAAAAAAQACAwQFEQYhkRIxQVITFFFhcYGhscEi0SMyYnIkQ8Lh8PEVorL/2gAMAwEAAhEDEQA/AOqcESCJBEgiQRIIkESCJBEgiQRIIkESCJBEgiQRIIkESCJBEgiQRIIkESCJBEgiQRIIkESCJBEgiQRIIuX663N9ood7f5n/AFVfGPTAhw7flGi8Jl8a5+o6lfHjs0Oc68P/AGV8Yz0TOUaLG3G5zqs+NzeM97fx/wBqvjDoofKNE243OdSnjk36Y/71Xxh0UPlGibcbnOpTxyb9Mf8Aeq+MOih8o0WNuNznUp45N+mP+9V8YdFD5Ros7cbnOpTxyb9Mf96r4w6KHyjRY243OdSnjc2f3t/3qvjDo4fKNFnbjcx1KeOTfpj/AL1Xxh0UPlGibcbnOpTxyb9Mf96r4w6KHyjRNuNznUp45N+mP+9V8YdEzlGibcbmOpVqNnPQicxK3XdZf3uDsjTHlq4dQ66knn1Sk+s9AKvxDXWHak5K3Y5w9h8nyCvrBeEIrdmpVO997GG/k5w9h5lazs2bOVNvKjIuy6W1TUi+4sSVPCilDiUqILjhHEgkEBPAcMnOcRu4hxDFlYnU5Q2cN5+B8la+EcHS87BFQqA2mknZbuBsd5479w1up/nJfS603k0qcbtSlPAD9EmBLNrx0ylXH2xBWvqs0OmYYjh2jaKtJ8GgSR6vEbCYewhg9Co9110/0rpmnFSuddJk2FhG7Jv0ZwM9s8rghI3PMVk8TkHABPSO9RZ+rRJxkqIhPaHZ2A378xrvUVxJRsPw6dEnTBaDb6SzK7juGWR78jldV22aLFb1E1SkZedYTNUuQbVOzjbid5C0p4IQQeBBWRw+YGJ7iKfMhIOdDNnuyHyfIKqcIUZlTqjGxW3hs+pwO423DzNvK6urN6KWJNSrzJtOjtBxCkFbck2lScjGQccCOhioW1ioNcHdO7L9RXoR+G6O9hb1VguLZNF/ZUATbztt6oM27UUBxcpV25N5CxlLiQ8lPLqFJIPqMXiZkTEgZmEfzMJHdl8FeYhTTKVQScYX2Xhp7/qA0IXQF7SOwZdlx5606C00gFa1rkWkpSBxJJxgARRoqtRcQBHff9xXp92H6M0FzpWGAP0t+y8ZvSjSm8mHESdEt+eQkecqmlAUnP8AuaIIjbNUq8oQXxHj91/laAoOHp9pEOBDcP0292lVo2kdnxrSplivUJ552gvvBhxh9W8uVcIJT537SDgjjxBxxOYsTD9fdUiZeYA6QC4I3EfdU/izCEOjgTcmSYRNiDmWnhnxB1HfdQH3r6cfXE3VZ9CrZ7NGzcoCUu67pUhXB2n0t9PLql11J69UpPLmeOAKuxFiK+1Jybu5zh7D5PkFd+EMGhhbUai3Pe1p/wDTh7DzKtbFZK71DWyfetNujR+kSMq+gz9HQZKclwRvNkKO6rHzKTgg+sdDEpxJKxJeoPiOH0vzB99CoXhKbhTFLhwmH6of0kdnYfMLXtY9kGmaiVyer9HqzlGq84rtH2n2+2l3V4AzzCkE444JH0Rv0rFEWRhNl4zNpg3WyIHsf8zXKreC4FTjOmoD9h7szfME+49R3Kq2qOjF8aRSwarUspyhqeBROSTqnJQuYwCRw3FEZA3gCeQJixafV5KpuvBNn23EWdb5HgVVNUw9UKS3Zji8O+8G7b/B8QrR7Eljmh6cTVxzDe7NVx8lskce7tkpR7Vb59kV5i2c6ecEu05Qx6nM+lgrVwNTRKSLppw+qIf+oyHrcqSrO1Xlrq1TvW0WyjeoSZcoUnm5vJPa/wBqikfXHAmqc6XkoE2f5l/TdqFKZOqtmqhMyQ/l7PncZ6GwVd9quyzQdcbNuRhvdlq1NyrTyhy7w06gfegp/sMTjDk501MjyzjmwOI8CD831Vb4rpog1iXnWjKIWg/uaR7i2itbfUs9O2PcMvLtLffdp8y2202neUtRbUAkDqSeEVxJuDJmG5xsA4e4Vsz7HRJOMxouS1w9Cqa7Lmj1/wBG1WpFXnKFP2/TJRC+9vTrZY7VBbI7MJPFWVFJ5YGM9BFqYiqshGkXwWRA9xta2ds99+GSpXCtCqUvUocw+G6G1t7k5XBG63G5U/bYU/LSOg1bTMFIW+9LNMb3Vztkq4f0pUfqMQvC7XOqkMt4B1/CxVh4yLP+GitfxLQPHaB9gVGGy9syK/RLxvGUweD1OpT6eXVLzqT16pQeXM8cASHEOIb7UnJu7nOHsPk+QUTwrhINLZ+fb3tafc/A8yrcRWSuNZgi5PWTMXpRXZ66LSRVWRTFBEzP01ClBkKyQlzAIKTg8CCPn6R6Im+pxQ2Wm9k7W4Hjbs7/AFXmqThzsAumpPaGzvLeF+3u8clYDSvbtuJ2tU2j3LSJauiZfRL94pqeymsqUEg9mMpWePIbsQ2oYSlxDdGlnllhexzGXfvHqp1TcXTRiNgzTA+5AuMjn3bj6K51y29JXZb9Qo9RZS/JTzC5d1CgDlKhjPrHMHoQIrCBGfLRWxoZsWm4VpTECHNQXQIou1wIKW1QJW1beptGkU7knIS7cs0Ou6hISM/Tw4wjxnzEV0Z+9xJPmsy8BktBZAh7mgAeShPSvZnrGnerlQvSZvBNTE73nvEsJEtqe7VW/wAVdoQMKCTyPKJXUa9CnZBsk2Ds7NrG97Wy7OxQ6mYdiyFRdPOj7W1tXGza98+3gVvWulhKvyzpZDDXa1CmVKUqcsAOOWnUlYHrbKx7I49JnOpxyXH6XNc0+Yy9bLt1mR69LtAF3Mc1w8jn6XW8VmqsUGjz1Smt7u0mw5MO7gyrcQkqOB1OAY5UKGY0RsNu8kDVdmLEbBhuiO3AE6Ku1Q2+dO5eUU5KSNdnXt3KW+6IaB9alL4ffE0ZhCoOdZzmgeJPsFCX4xkGtuxrifAD3K2SyrareuFSpd637S00qjSau8UK11nf3VHlNTJIG8vHyUYASOOMmNGajwaUx8nIv2nOye/+lvYO08VtystGrD2TtQZssbmxn9Tu09g4KcYiimCzBEgipRso7SumenVjN21WHJmgVRUw5MTU/MMlxiZcUeCgtGSkBISkBQGMczFm4gotQnZgzEKz22AABzA8DvzzyVc0GqSMlL9XiXa65JNsifEaZqwDOt+jcuo1Rq7LVbe+V26H2Q793nRETS6qfwzCfbssbfZSoVCmD8QRGX8r/deDJbaGls9cU3IC4WpeRl2grxKaQttp5ZONxoFO8rABJVgDljOeG07DVSbCD+juTwFiR3ngPBa7cQSDohZt2A4ncfBadr9tl2/R7IbOnNzSNTuJ6bbR5jRdDLIypalJUAOOAn+r6I6VIw3GiTH8fDLWAHja54btVz6rX4UOB/AxAXkjvsOO/RQHN7eeqMxJlpp2iSzuMB9unkqz8+FLKfuiWtwpTQ652j3bX9lFXYlqRbYbIPbb+6tnbG1/phUbcpc1U7up9PqL0q25MyjgWFMulI30HCeisiK+j4dqLIrmw4RLQTY5ZjgVPINdkXwmuiRAHEC4zyPFflv3ak0rqljXFJyl7U16amKbMtNNp38rWppQSB5vUkCPpKUKpQ5iG90EgBwPDt8V85usSESXiMbFFy0jj2KJdkfZPWlun3vfMluqCUvUyjTCfk8MpeeSevVKDy5njgCRYixDfak5M9znD2HyfIKN0DDwbszc239rT7n4HmVdKKyVlLMESCJBFxfctev9qv8AUVW+Uf3B75/+MejxMQbfnGo+6o7qsW/5DoV8+TFfznwKrf4978MZ6xA526j7rHVYvIdCnkxcH8iq32B78MOsQOduo+6dVi8h0KeTFfP8Cq32B78MOsQOduo+6z1WLyHQp5L1/wDkVW/x734YdYgc7dR91jqsXkOhTyZuAfwOrfYHvww6xA526j7p1WLyHQq5GyJsjuAyV833JKSoYepdFmUYKeqX30nr1Sg8uZ44ArrEGIL3k5N3c5w9h8nyCmtGoliJmaHgPk/AVhtX6tXJCoSTclNvU+RLe8HW1FtK1+fvhSwM7wAb3UcN/eUOY4RGnw4LmuLxc/6tlrc8MlI598VrgGmw/wB3+LDjmt6s6Yn5q2pB2phYnFIyouI3FqTk7qlJ/ZUU7pI4YJIwI5cwGNiuEPd/nyulLl7oTTE3r2o1lsJBEgixj1+2CJj85giY/OYImPzmCJj85giY9ftgizBFjEEWYIkESCJBEgiQRIIkESCJBEgiQRIIkESCJBEgiQRIIkESCJBEgiQRIIkESCJBF//Z";