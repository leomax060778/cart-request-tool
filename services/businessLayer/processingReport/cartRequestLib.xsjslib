$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var data = mapper.getDataCartRequest();
var request = mapper.getRequest();
var cartRequestMail = mapper.getCartRequestMail();
var mail = mapper.getMail();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//Get request by status
function getAllCartRequest() {
    return data.getAllRequest();
}

//Get request by id
function getRequestById(requestId) {
    return data.getRequestById(requestId);
}

//Get request data protection answer by request id
function getRequestDataProtection(requestId) {
    return data.getRequestDataProtection(requestId);
}

//Update cart request status
function updateRequestStatus(objRequest, userId) {
    if (validateUpdateRequestStatus(objRequest, userId)) {
    	return data.updateRequestStatus(objRequest, userId);
    }
}

//Validate update cart request status
function validateUpdateRequestStatus(objRequest, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "cartRequestService/handlePut/updateRequestStatus", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'REQUEST_ID',
        'STATUS_ID',
        'PREVIOUS_STATUS_ID'];

    if (!objRequest) {
        throw ErrorLib.getErrors().CustomError("", "cartRequestService/handlePut/updateRequestStatus", "The object Cart Request is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objRequest[key] === null || objRequest[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objRequest[key]);
                if (!isValid) {
                    errors[key] = objRequest[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "cartRequestService/handlePut/updateRequestStatus", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "cartRequestService/handlePut/updateRequestStatus", JSON.stringify(errors));
        }
    }
    return isValid;
}

//Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'REQUEST_ID':
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

function sendMailByStatus(objRequest, mailData, userId){
	if(objRequest.STATUS_ID && (Number(objRequest.STATUS_ID) > 2 && Number(objRequest.STATUS_ID) < 7)){
		var cartRequestMailObj = {};
		var mailObj = {};
		cartRequestMailObj.REQUEST_ID = objRequest.REQUEST_ID;
		var statusId = objRequest.STATUS_ID;
		switch (statusId) {
			case '3':
				cartRequestMailObj.SHOPPING_CART = objRequest.SHOPPING_CART;
				mailObj = cartRequestMail.parseInProcess(cartRequestMailObj,"http://localhost:63342/crt/webapp/index.html","admin");
				break;
			case '4':
				mailObj = cartRequestMail.parseReturnToRequest(cartRequestMailObj,"http://localhost:63342/crt/webapp/index.html","admin");
				break;
			case '5':
				cartRequestMailObj.SERVICES = mailData;
				mailObj = cartRequestMail.parseApproved(cartRequestMailObj,"http://localhost:63342/crt/webapp/index.html","admin");
				break;
			case '6':
				mailObj = cartRequestMail.parseCancelled(cartRequestMailObj,"http://localhost:63342/crt/webapp/index.html","admin");
				break;
		}
		
		var emailObj = mail.getJson(getEmailList({}), mailObj.subject, mailObj.body, null, null);        	
		mail.sendMail(emailObj,true,null);
	}
}

function getRequestMailDataByRequestId(objRequest, userId){
	return data.getRequestMailDataByRequestId(objRequest, userId);
}

function getEmailList(inquiryMailObj){
	return [{address:'gorellano@folderit.net'}];
}