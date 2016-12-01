$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var message = mapper.getDataInquiryMessage();
var inquiry = mapper.getDataInquiry();
var inquiryMail = mapper.getCrtInquiryMail();
var status = mapper.getInquiryStatus();
var mail = mapper.getMail();
var ErrorLib = mapper.getErrors();
var dbHelper = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

var statusMap = {'TO_BE_CHECKED': 1, 'RETURN_TO_REQUESTER': 2, 'COMPLETED': 3, 'CANCELLED': 4};

//Insert message
function insertInquiryMessage(objInquiry, userId) {
	if (validateInsertInquiryMessage(objInquiry, userId)) {
	    if (!existInquiry(objInquiry.INQUIRY_ID)) {
	        throw ErrorLib.getErrors().CustomError("", "inquiryMessageService/handlePost/insertInquiryMessage", "The inquiry with the id " + objInquiry.INQUIRY_ID + " does not exist");
	    } 
	    if(Number(objInquiry.PREVIOUS_STATUS_ID) === statusMap.RETURN_TO_REQUESTER || Number(objInquiry.PREVIOUS_STATUS_ID) === statusMap.CANCELLED){
	    	objInquiry.STATUS_ID = statusMap.TO_BE_CHECKED;
	    	status.updateInquiryStatusManual(objInquiry, userId);
	    }
	    return message.insertInquiryMessage(objInquiry, userId);
    }
}

//Get message
function getInquiryMessage(inquiryId) {
    if (!inquiryId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter inquiryId is not found", "inquiryService/handleGet/getMessage", inquiryId);
    }
    return message.getInquiryMessage(inquiryId);
}

//Message read
function updateMessageRead(inquiryId, userId){
	if (!inquiryId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter inquiryId is not found", "inquiryService/handlePut/updateMessage", inquiryId);
    }
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "inquiryService/handlePut/updateInquiryMessage", userId);
    }
    var result = [];
    var objInquiry = {};
    try {
    	result = message.getInquiryMessageManual(inquiryId);
	    result.forEach(function (elem) {
		    if(elem.MESSAGE_READ === 0) {
		    	objInquiry.MESSAGE_READ = 1;
		    	message.updateInquiryMessageReadManual(objInquiry, userId);
		    }
	    });
    } catch (e) {
    	dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", "inquiryService/handlePut/updateInquiryMessage", e.toString());
    }
    finally{
		dbHelper.commit();
		dbHelper.closeConnection();
	}
}

//Check if the inquiry exists
function existInquiry(inquiryId) {
    return inquiry.getInquiryByIdManual(inquiryId).length > 0;
}

//Validate insert inquiry message
function validateInsertInquiryMessage(objInquiry, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "inquiryService/handlePut/insertInquiryMessage", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['INQUIRY_ID',
        'MESSAGE_CONTENT'];

    if (!objInquiry) {
        throw ErrorLib.getErrors().CustomError("", "inquiryService/handlePost/insertInquiryMessage", "The object  Inquiry Message is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objInquiry[key] === null || objInquiry[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objInquiry[key]);
                if (!isValid) {
                    errors[key] = objInquiry[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "inquiryService/handlePost/insertInquiryMessage", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "inquiryService/handlePost/insertInquiryMessage", JSON.stringify(errors));
        }
    }
    return isValid;
}

//Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'INQUIRY_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'MESSAGE_CONTENT':
            valid = value.length > 0 && value.length <= 1000;
            break;
    }
    return valid;
}

function sendMessageMail(inquiryId, userId){
	var inquiryMailObj = {};
	inquiryMailObj.INQUIRY_ID = inquiryId;
	var mailObj = inquiryMail.parseFYI(inquiryMailObj,getUrlBase(),"Colleague");
	var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
	mail.sendMail(emailObj,true,null);
}

function getUrlBase(){
	return "http://localhost:63342/crt/webapp/index.html";
}

function getEmailList(inquiryMailObj){
	return [{address:'gorellano@folderit.net'}];
}