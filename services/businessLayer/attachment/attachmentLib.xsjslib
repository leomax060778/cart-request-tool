$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataAttachment = mapper.getDataAttachment();
var dbHelper = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

// Check if the inquiry exists
function existAttachment(attachmentId) {
	return Object.keys(getManualAttachmentById(attachmentId)).length > 0;
}

function getAttachmentsById(attachments, userId){
	if (attachments && attachments.length > 0) {
		var attachmentList = [];
		var attachmentArray = attachments.split("-");
		try {
			attachmentArray.forEach(function(attachmentId){
				if(attachmentId && attachmentId != "" && isNumeric(attachmentId)) {
					var result = getManualAttachmentById(Number(attachmentId));
					if(result){
						attachmentList.push(result);
					}
				}
			});			
			return attachmentList;
		} catch (e) {
			throw e;
			dbHelper.rollback();
			throw ErrorLib.getErrors().CustomError("", e.toString(), "insertAttachment");
		} finally {
			//dbHelper.closeConnection();
		}
	}
	return [];
}

function isNumeric(value) {
    return /^\d+$/.test(value);
}

function getManualAttachmentById(attachmentId) {
	if (!attachmentId) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter attachmentId is not found",
				"attachmentService/handleGet/getAttachmentById", attachmentId);
	}	
	var result = dataAttachment.getManualAttachment(attachmentId);
	if(result.ATTACHMENT_ID){
		result = JSON.parse(JSON.stringify(result));
		result.ATTACHMENT_SIZE = (parseFloat(Number(result.ATTACHMENT_SIZE) / 1048576).toFixed(2)) + " MB";
		return result;
	}
}

// Get attachment by ID
function getAttachmentById(attachmentId) {
	if (!attachmentId) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter attachmentId is not found",
				"attachmentService/handleGet/getAttachmentById", attachmentId);
	}
	var result = dataAttachment.getAttachment(attachmentId);
	result = JSON.parse(JSON.stringify(result));
	result.ATTACHMENT_SIZE = (parseFloat(Number(result.ATTACHMENT_SIZE) / 1048576).toFixed(2)) + " MB";
	return result;
}

// Insert attachment
function insertAttachment(objAttachment, userId) {
	if (validateInsertAttachment(objAttachment, userId)) {
		
		try {
			var result = dataAttachment.insertAttachment(objAttachment, userId);
			dbHelper.commit();
			return result;
		} catch (e) {
			dbHelper.rollback();
			throw ErrorLib.getErrors().CustomError("", e.toString(), "insertAttachment");
		} finally {
			dbHelper.closeConnection();
		}
	}

}

//Insert attachment manual
function insertAttachmentManual(objAttachment, userId) {
	
			var result = dataAttachment.insertAttachment(objAttachment, userId);
			return result;
	
}

//Insert several attachments
function insertAttachments(objAttachments, userId){
	var resultArray = [];
	try{
		if(objAttachments.length > 0){
			objAttachments.forEach(function(attachment){
				resultArray.push(insertAttachmentManual(attachment, userId));
			});
		}
		dbHelper.commit();
		
	} catch (e) {
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(), "insertAttachments");
	} finally {
		dbHelper.closeConnection();
	}
	return resultArray;
}

// Update attachment
function updateAttachment(objAttachment, userId) {
	try {
		if (validateUpdateAttachment(objAttachment, userId)) {
			if (!existAttachment(objAttachment.ATTACHMENT_ID)) {
				throw ErrorLib.getErrors().CustomError("",
						"attachmentService/handlePut/updateAttachment",
						"The object Attachment doesn't exist");
			}
			var result = dataAttachment.updateAttachment(objAttachment, userId);
			dbHelper.commit();
			return result;
		}
	} catch (e) {
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(), "updateAttachment");
	} finally {
		dbHelper.closeConnection();
	}
	
}

// Delete attachment
function deleteAttachment(objAttachment, userId) {
	if (!objAttachment.ATTACHMENT_ID) {
		throw ErrorLib.getErrors().CustomError("",
				"attachmentService/handleDelete/deleteAttachment",
				"The ATTACHMENT_ID is not found");
	}
	try {
		if (!existAttachment(objAttachment.ATTACHMENT_ID)) {
			throw ErrorLib.getErrors().CustomError("",
					"attachmentService/handleDelete/deleteAttachment",
					"The object Attachment doesn't exist");
		}
		var result = dataAttachment.deleteAttachment(objAttachment, userId);
		dbHelper.commit();
		return result;
	} catch (e) {
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(), "deleteAttachment");
	} finally {
		dbHelper.closeConnection();
	}
}

//Delete attachment
function deleteManualAttachment(objAttachment, userId) {
	if (!objAttachment.ATTACHMENT_ID) {
		throw ErrorLib.getErrors().CustomError("",
				"attachmentService/handleDelete/deleteAttachment",
				"The ATTACHMENT_ID is not found");
	}
	
		if (!existAttachment(objAttachment.ATTACHMENT_ID)) {
			throw ErrorLib.getErrors().CustomError("",
					"attachmentService/handleDelete/deleteAttachment",
					"The object Attachment doesn't exist");
		}
		var result = dataAttachment.deleteAttachment(objAttachment, userId);
		return result;
	
}

//Delete Master attachment-Request
function deleteManualAttachmentRequestConection(attachment_id, request_id, userId) {
	if (!attachment_id) {
		throw ErrorLib.getErrors().CustomError("",
				"attachmentService/handleDelete/deleteAttachment",
				"The ATTACHMENT_ID is not found");
	}
	if (!request_id) {
		throw ErrorLib.getErrors().CustomError("",
				"attachmentService/handleDelete/deleteAttachment",
				"The REQUEST_ID is not found");
	}
	var result = dataAttachment.deleteManualAttachmentRequestConection(attachment_id, request_id, userId);
	return result;
	
}


function validateUpdateAttachment(objAttachment, userId) {
	if (!userId) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter userId is not found",
				"attachmentService/handlePut/updateAttachment", userId);
	}
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ 'ATTACHMENT_ID', 'ORIGINAL_NAME', 'SAVED_NAME',
			'ATTACHMENT_SIZE' , 'ATTACHMENT_TYPE'];

	if (!objAttachment) {
		throw ErrorLib.getErrors().CustomError("",
				"attachmentService/handlePut/updateAttachment",
				"The object Attachment is not found");
	}
	try {
		keys
				.forEach(function(key) {
					if (objAttachment[key] === null
							|| objAttachment[key] === undefined) {
						errors[key] = null;
						throw BreakException;
					} else {
						// validate attribute type
						isValid = validateType(key, objAttachment[key]);
						if (!isValid) {
							errors[key] = objAttachment[key];
							throw BreakException;
						}
					}
				});
		isValid = true;
	} catch (e) {
		if (e !== BreakException) {
			throw ErrorLib.getErrors().CustomError("",
					"attachmentService/handlePut/updateAttachment",
					e.toString());
		} else {
			throw ErrorLib.getErrors().CustomError("",
					"attachmentService/handlePut/updateAttachment",
					JSON.stringify(errors));
		}
	}
	return isValid;
}

function validateInsertAttachment(objAttachment, userId) {
	if (!userId) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter userId is not found",
				"attachmentService/handlePost/insertAttachment", userId);
	}
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ 'ORIGINAL_NAME', 'SAVED_NAME', 'ATTACHMENT_SIZE' , 'ATTACHMENT_TYPE'];

	if (!objAttachment) {
		throw ErrorLib.getErrors().CustomError("",
				"attachmentService/handlePost/insertAttachment",
				"The object Attachment is not found");
	}
	try {
		keys
				.forEach(function(key) {
					if (objAttachment[key] === null
							|| objAttachment[key] === undefined) {
						errors[key] = null;
						throw BreakException;
					} else {
						// validate attribute type
						isValid = validateType(key, objAttachment[key]);
						if (!isValid) {
							errors[key] = objAttachment[key];
							throw BreakException;
						}
					}
				});
		isValid = true;
	} catch (e) {
		if (e !== BreakException) {
			throw ErrorLib.getErrors().CustomError("",
					"attachmentService/handlePost/insertAttachment",
					e.toString());
		} else {
			throw ErrorLib.getErrors().CustomError("",
					"attachmentService/handlePost/insertAttachment",
					JSON.stringify(errors));
		}
	}
	return isValid;
}

// Check data types
function validateType(key, value) {
	var valid = true;
	switch (key) {
	case 'ORIGINAL_NAME':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'SAVED_NAME':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'ATTACHMENT_TYPE':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'ATTACHMENT_SIZE':
		valid = !isNaN(value) && value > 0;
		break;
	case 'ATTACHMENT_ID':
		valid = !isNaN(value) && value > 0;
		break;
	}
	return valid;
}
