$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataInquiry = mapper.getDataInquiry();
var inquiryMail = mapper.getCrtInquiryMail();
var mail = mapper.getMail();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//Insert inquiry
function insertInquiry(objInquiry, userId) {
    if (validateInsertInquiry(objInquiry, userId)) {
        return dataInquiry.insertInquiry(objInquiry, userId);
    }
}

//Get inquiry by id
function getInquiryById(inquiryId) {
    return dataInquiry.getInquiryById(inquiryId);
}

//Get inquiry by id manually
function getInquiryByIdManual(inquiryId) {
  return dataInquiry.getInquiryByIdManual(inquiryId);
}

//Get all inquiries
function getAllInquiry(userId) {
	if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "inquiryService/handleGet/getAllInquiry", userId);
    }
    var inquiry = [];
	inquiry = dataInquiry.getAllInquiry(userId);
	inquiry = JSON.parse(JSON.stringify(inquiry));
	inquiry.forEach(function(elem){
    	if(elem.MESSAGE_READ > 0){
    		elem.SHOW_MESSAGE_READ = 1;
    	} else {
    		elem.SHOW_MESSAGE_READ = 0;
    	}
    });
	return inquiry;
}

//Update inquiry
function updateInquiry(objInquiry, userId) {
    if (validateUpdateInquiry(objInquiry, userId)) {
        if (!existInquiry(objInquiry.INQUIRY_ID)) {
            throw ErrorLib.getErrors().CustomError("", "inquiryService/handleDelete/updateInquiry", "The object INQUIRY_ID " + objInquiry.INQUIRY_ID + " does not exist");
        } else {
            return dataInquiry.updateInquiry(objInquiry, userId);
        }
    }
}

//Delete inquiry
function deleteInquiry(objInquiry, userId) {
    if (!objInquiry.INQUIRY_ID) {
        throw ErrorLib.getErrors().CustomError("", "inquiryService/handleDelete/deleteInquiry", "The INQUIRY_ID is not found");
    }
    if (!existInquiry(objInquiry.INQUIRY_ID)) {
        throw ErrorLib.getErrors().CustomError("", "inquiryService/handleDelete/deleteInquiry", "The inquiry with the id " + objInquiry.INQUIRY_ID + " does not exist");
    }
    return dataInquiry.deleteInquiry(objInquiry, userId);
}

//Check if the inquiry exists
function existInquiry(inquiryId) {
    return getInquiryByIdManual(inquiryId).length > 0;
}

//Validate insert inquiry
function validateInsertInquiry(objInquiry, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "inquiryService/handlePut/insertInquiry", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['TOPIC_ID',
        'INQUIRY_TEXT'];

    if (!objInquiry) {
        throw ErrorLib.getErrors().CustomError("", "inquiryService/handlePost/insertInquiry", "The object  Inquiry is not found");
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
            throw ErrorLib.getErrors().CustomError("", "inquiryService/handlePost/insertInquiry", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "inquiryService/handlePost/insertInquiry", JSON.stringify(errors));
        }
    }
    return isValid;
}

function validateUpdateInquiry(objInquiry, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "inquiryService/handlePut/updateInquiry", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'INQUIRY_ID',
        'TOPIC_ID'];

    if (!objInquiry) {
        throw ErrorLib.getErrors().CustomError("", "inquiryService/handlePut/updateInquiry", "The object Inquiry is not found");
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
            throw ErrorLib.getErrors().CustomError("", "inquiryService/handlePut/updateInquiry", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "inquiryService/handlePut/updateInquiry", JSON.stringify(errors));
        }
    }
    return isValid;
}

//Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'TOPIC_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'INQUIRY_TEXT':
            valid = value.length > 0 && value.length <= 1000;
            break;
        case 'INQUIRY_ID':
            valid = !isNaN(value) && value > 0;
            break;
    }
    return valid;
}

function sendSubmitMail(inquiryId, userId){
	var inquiryMailObj = {};
	inquiryMailObj.INQUIRY_ID = inquiryId;
	var mailObj = inquiryMail.parseSubmit(inquiryMailObj,getUrlBase(),"Colleague");
	var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
	mail.sendMail(emailObj,true,null);
}

function sendResubmitMail(inquiryId, userId){
	var inquiryMailObj = {};
	inquiryMailObj.INQUIRY_ID = inquiryId;
	var mailObj = inquiryMail.parseResubmitted(inquiryMailObj,getUrlBase(),"Colleague");
	var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
	mail.sendMail(emailObj,true,null);
}

function getUrlBase(){
	return "http://localhost:63342/crt/webapp/index.html";
}

function getEmailList(inquiryMailObj){
	return [{address:'gorellano@folderit.net'}];
}