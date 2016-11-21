$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var data = mapper.getDataLevel3();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//
function getCrm(crmId) {
	return data.getCrm(crmId);
	//return 9;
}

// validate input request
function validateFormHl3(reqBody) {
	var isValid = false;
	var errors = {};
	var BreakException = {};
	try {
		Object.keys(reqBody).forEach(function(key) {
			if (reqBody[key] === null || reqBody[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, reqBody[key])
				if (!isValid) {
					errors[key] = reqBody[key];// 'INVALID';
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("", e.toString(),
					"validateFormHl3");
		else
			throw ErrorLib.getErrors().CustomError("", JSON.stringify(errors),
					"validateFormHl3");
		
		//throw e;
		//throw ErrorLib.getErrors().BadRequest("","",e.toString());
		//handleResponse({"code": $.net.http.INTERNAL_SERVER_ERROR, "errors":{"INTERNAL_SERVER_ERROR": JSON.stringify(errors)}}, $.net.http.INTERNAL_SERVER_ERROR);
		
	}
	return isValid;
}

//handle response to request
function handleResponse(body, code) {
	$.response.contentType = "application/json";
	$.response.status = code;
	$.response.setBody(JSON.stringify(body));
}

// Check data types
function validateType(key, value) {
	var regex = /^(0|([1-9]\d{0,8}))(\.\d{1,10})?$/;
	var valid = true;

	switch (key) {
	case 'IN_ACRONYM': // in_hl3_acronym
		valid = value.length > 0 && value.length <= 25;
		break;
	case 'IN_HL2_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'IN_HL3_DESCRIPTION':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'IN_BUSINESS_OWNER_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'IN_HL3_FNC_BUDGET_TOTAL':
		valid = regex.test(value) && value > 0;
		break;
	case 'IN_USER_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'IN_H1_ID':
		valid = !isNaN(value);
		break;
	}
	return valid;
}

// create a new registry of HL3
function createHl3(reqBody) {
	try {

		//throw ErrorLib.getErrors().CustomError("HOLA", "hola","createHl3");
		var result = 0;
		//var result = validateFormHl3(reqBody);

		
		
		if (validateFormHl3(reqBody)) {
			// validate insert CRM
			var crmId = getCrm(reqBody.IN_ACRONYM);
			
			
			if (crmId <= 0) {
				crmId = data.insertCrm(reqBody.IN_HL2_ID, reqBody.IN_ACRONYM,
						reqBody.IN_HL3_DESCRIPTION, reqBody.IN_H1_ID,
						reqBody.IN_USER_ID);
				//data.commit();
				result = crmId;
			}
			/*
			// CREATE NEW HL3
			result = data.insertHl3(reqBody.IN_ACRONYM, reqBody.IN_HL2_ID,
						reqBody.IN_HL3_DESCRIPTION, crmId,
						reqBody.IN_BUSINESS_OWNER_ID,
						reqBody.IN_HL3_FNC_BUDGET_TOTAL, reqBody.IN_USER_ID);

			// TODO: INSERT HL3_FNC (HL3ID)
			*/
			//data.commit();
		}
		
		return result;
	} catch (e) {
		//data.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(),"createHl3");
	}
	finally{
		//data.closeConnection();
	}
}
