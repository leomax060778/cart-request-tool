$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var inquiryStatus = mapper.getDataInquiryStatus();
var inquiry = mapper.getInquiry();
var inquiryMail = mapper.getCrtInquiryMail();
var mail = mapper.getMail();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//Get inquiry by status
function getInquiryByStatus(statusId) {
	if (!statusId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter statusId is not found", "inquiryService/handleGet/getInquiryByStatus", statusId);
    }
	return inquiryStatus.getInquiryByStatus(statusId);
}

//Get inquiry by status administrable
function getInquiryByStatusAdministrable(isAdministrable) {
	if (!isAdministrable) {
      throw ErrorLib.getErrors().BadRequest("The Parameter isAdministrable is not found", "inquiryService/handleGet/getInquiryByStatusAdministrable", isAdministrable);
  }
	return inquiryStatus.getInquiryByStatusAdministrable(isAdministrable);
}

//Get inquiry by id
function getInquiryById(inquiryId) {
	if (!inquiryId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter inquiryId is not found", "inquiryService/handleGet/getInquiryById", inquiryId);
    }
	return inquiryStatus.getInquiryById(inquiryId);
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
	inquiryMailObj.INQUIRY_ID = inquiryId;
	switch (statusId) {
	case '2':
		mailObj = inquiryMail.parseReturnToRequest(inquiryMailObj,getUrlBase(),"Colleague");
		break;
	case '3':
		mailObj = inquiryMail.parseCompleted(inquiryMailObj,getUrlBase(),"Colleague");
		break;
	case '4':
		mailObj = inquiryMail.parseCancelled(inquiryMailObj,getUrlBase(),"Colleague");
		break;
	}
	
	var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
	mail.sendMail(emailObj,true,null);
}

function getUrlBase(){
	return "http://localhost:63342/crt/webapp/index.html";
}

function getEmailList(inquiryMailObj){
	return [{address:'gorellano@folderit.net'}];
}