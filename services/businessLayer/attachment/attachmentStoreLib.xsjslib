$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataAttachment = mapper.getDataAttachmentStore();
var util = mapper.getUtil();
var dbHelper = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

function getManualAttachmentStoreById(attachmentId) {
	if (!attachmentId) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter attachmentId is not found",
				"attachmentService/handleGet/getAttachmentStoreById", attachmentId);
	}
	var result = dataAttachment.getManualAttachment(attachmentId);
	return result;
}

// Get attachment by ID
function getAttachmentById(attachmentId) {
	if (!attachmentId) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter attachmentId is not found",
				"attachmentService/handleGet/getAttachmentStoreById", attachmentId);
	}
	return dataAttachment.getAttachment(attachmentId);
}

function insertAttachmentStore(objAttachment, userId) {
	try {
		if (validateInsertAttachment(objAttachment, userId)) {
			var result = dataAttachment.insertAttachmentStore(objAttachment, userId);
			dbHelper.commit();
			return result;
		}
	} catch (e) {
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(), "insertAttachment");
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
		throw ErrorLib.getErrors().CustomError("", e.toString(),
				"deleteAttachment");
	} finally {
		dbHelper.closeConnection();
	}
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
			'ATTACHMENT_SIZE' ];

	if (!objAttachment) {
		throw ErrorLib.getErrors().CustomError("",
				"attachmentService/handlePut/updateAttachment",
				"The object Attachment is not found");
	}
	try {
		keys.forEach(function(key) {
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
	var keys = [ 'ORIGINAL_NAME', 'FILE_CONTENT', 'ATTACHMENT_SIZE', 'ATTACHMENT_TYPE' ];

	if (!objAttachment) {
		throw ErrorLib.getErrors().CustomError("",
				"attachmentService/handlePost/insertAttachment",
				"The object Attachment is not found");
	}
	try {
		keys.forEach(function(key) {
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
	case 'FILE_CONTENT':
		valid = value.length > 0;
		break;
	case 'ORIGINAL_NAME':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'ATTACHMENT_SIZE':
		valid = !isNaN(value) && value > 0;
		break;
	case 'ATTACHMENT_TYPE':
		valid = value.length > 0 && value.length <= 255;
		break;
	}
	return valid;
}
