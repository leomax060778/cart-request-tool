$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataService = mapper.getDataService();
var ErrorLib = mapper.getErrors();

function updateService(objService, userId){
	if(validateUpdateService(objService, userId)){
		var service = dataService.getServiceByRequestId(objService.REQUEST_ID);
		if(service.length === objService.SERVICE.length){
			objService.SERVICE.forEach(function(key){
				if(!existService(key.SERVICE_ID)){
					throw ErrorLib.getErrors().CustomError("", "newCartRequestService/handlePut/updateService", "The object Service " + key.SERVICE_ID + " does not exist"); 
				} 
					dataService.updateService(key, userId);
			});
		} else {
			throw ErrorLib.getErrors().CustomError("", 
													"updateService", 
													"Invalid array length. objService.SERVICE should have " + service.length + " elements and it has " + objService.SERVICE.length
												  );
		}
	}
	return objService.length;
}

//Check if the request exists
function existService(serviceId) {
    return dataService.getServiceById(serviceId).length > 0;
}

function validateUpdateService(objReq, userId) {
    if (!userId){
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "requestService/handlePut/insertRequest", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['SERVICE'];
    var serviceKeys = ['SERVICE_ID', 'LINE_NUMBER'];
    var serviceArray = objReq.SERVICE;

    if (!objReq){
        throw ErrorLib.getErrors().CustomError("", "requestService/handlePost/insertRequest", "The object Request is not found");
    }

    try {
    	keys.forEach(function (key) {
            if (objReq[key] === null || objReq[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objReq[key]);
                if (!isValid) {
                    errors[key] = objReq[key];
                    throw BreakException;
                }
            }
        });
    	serviceArray.forEach(function(elem){
        	serviceKeys.forEach(function (key) {
                if (elem[key] === null || elem[key] === undefined) {
                    errors[key] = null;
                    throw BreakException;
                } else {
                    // validate attribute type
                    isValid = validateType(key, elem[key]);
                    if (!isValid) {
                        errors[key] = elem[key];
                        throw BreakException;
                    }
                }
            });
    	});
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "cartRequestService/handlePost/updateService", e.toString());
        }
        else{
            throw ErrorLib.getErrors().CustomError("", "cartRequestService/handlePost/updateService", JSON.stringify(errors));
        }
    }
    return isValid;
}

//Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'SERVICE':
            valid = value.length > 0;
            break;
        case 'LINE_NUMBER':
        	valid = value.length > 0 && value.length <= 255;
            break;
        case 'SERVICE_ID':
            valid = !isNaN(value) && value > 0;
            break;
    }
    return valid;
}