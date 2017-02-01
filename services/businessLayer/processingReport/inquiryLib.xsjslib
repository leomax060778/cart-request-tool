$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var inquiryStatus = mapper.getDataInquiryStatus();
var inquiry = mapper.getInquiry();
var inquiryMail = mapper.getCrtInquiryMail();
var businessAttachmentInquiry = mapper.getAttachmentInquiry();
var mail = mapper.getMail();
var businessUser = mapper.getUser();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();

/** ***********END INCLUDE LIBRARIES*************** */

var pathName = "CRT_INQUIRY";

//Get inquiry by status
function getInquiryByStatus(statusId) {
	if (!statusId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter statusId is not found", "inquiryService/handleGet/getInquiryByStatus", statusId);
    }
	return inquiryStatus.getInquiryByStatus(statusId);
}

//Get inquiry by status administrable
function getInquiryByStatusAdministrable(isAdministrable, userId) {
	if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "inquiryService/handleGet/getInquiryByStatusAdministrable", userId);
    }
	if (!isAdministrable) {
      throw ErrorLib.getErrors().BadRequest("The Parameter isAdministrable is not found", "inquiryService/handleGet/getInquiryByStatusAdministrable", isAdministrable);
  }
	var inquiry = [];
	inquiry = inquiryStatus.getInquiryByStatusAdministrable(isAdministrable, userId);
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

//Get inquiry by id
function getInquiryById(inquiryId) {
	if (!inquiryId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter inquiryId is not found", "inquiryService/handleGet/getInquiryById", inquiryId);
    }
	
	var inquiry = inquiryStatus.getInquiryById(inquiryId);
    inquiry = JSON.parse(JSON.stringify(inquiry));
    
    inquiry.ATTACHMENTS = businessAttachmentInquiry.getAttachmentInquiryById(inquiryId);
    return inquiry;

}

//Update inquiry status
function updateInquiryStatus(objInquiry, userId) {
    if (validateUpdateInquiryStatus(objInquiry, userId)) {
    	if(!inquiry.existInquiry(objInquiry.INQUIRY_ID)){
    		throw ErrorLib.getErrors().CustomError("", "inquiryService/handleDelete/updateInquiry", "The object INQUIRY_ID " + objInquiry.INQUIRY_ID + " does not exist");
    	} else {
    		return inquiryStatus.updateInquiryStatus(objInquiry, userId);
    	}
    }
}

//Update inquiry status manual
function updateInquiryStatusManual(objInquiry, userId) {
    if (validateUpdateInquiryStatus(objInquiry, userId)) {
    	if(!inquiry.existInquiry(objInquiry.INQUIRY_ID)){
    		throw ErrorLib.getErrors().CustomError("", "inquiryService/handleDelete/updateInquiryManual", "The object INQUIRY_ID " + objInquiry.INQUIRY_ID + " does not exist");
    	} else {
    		return inquiryStatus.updateInquiryStatusManual(objInquiry, userId);
    	}
    }
}

//Validate update inquiry status
function validateUpdateInquiryStatus(objInquiry, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "inquiryService/handlePut/updateInquiryStatus", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'INQUIRY_ID',
        'STATUS_ID',
        'PREVIOUS_STATUS_ID'];

    if (!objInquiry) {
        throw ErrorLib.getErrors().CustomError("", "inquiryService/handlePut/updateInquiry", "The object Vendor Inquiry is not found");
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
        case 'INQUIRY_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'STATUS_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'PREVIOUS_STATUS_ID':
            valid = !isNaN(value) && value > 0;
            break;
    }
    return valid;
}

function sendMailByStatus(inquiryId, statusId, userId){
	var inquiryMailObj = {};
	var mailObj = {};
	var userData = businessUser.getUserById(userId)[0];
	var requester = userData.FIRST_NAME + ' ' + userData.LAST_NAME + ' (' + userData.USER_NAME + ')';
	inquiryMailObj.INQUIRY_ID = inquiryId;
	switch (statusId) {
	case '2':
		mailObj = inquiryMail.parseReturnToRequest(inquiryMailObj, getBasicData(pathName), requester);
		break;
	case '3':
		mailObj = inquiryMail.parseCompleted(inquiryMailObj, getBasicData(pathName), requester);
		break;
	case '4':
		mailObj = inquiryMail.parseCancelled(inquiryMailObj, getBasicData(pathName), requester);
		break;
	}
	
	var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
	mail.sendMail(emailObj,true,null);
}

function getUrlBase(){
	return config.getUrlBase();
}

function getEmailList(inquiryMailObj){
	return config.getEmailList();
}

function getPath(stringName){
	return config.getPath(stringName);
}

function getBasicData(stringPathName){
	return config.getBasicData(stringPathName);
}