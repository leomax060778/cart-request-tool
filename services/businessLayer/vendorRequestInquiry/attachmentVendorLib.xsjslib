$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataAttachmentV = mapper.getDataAttachmentVendor();
var dataAttachment = mapper.getDataAttachment();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//Get attachment vendor by ID
function getAttachmentVendorById(objAttachment) {
	if (validateGetAttachmentVendor(objAttachment)) {
		return dataAttachmentV.getAttachmentVendor(objAttachment);
	}
}

//Insert attachment vendor
function insertAttachmentVendor(objAttachment, userId) {
    if (validateInsertAttachmentVendor(objAttachment, userId)) {
        return dataAttachmentV.insertAttachmentVendor(objAttachment, userId);
    }
    if (!existAttachment(objAttachment.ATTACHMENT_ID)) {
        throw ErrorLib.getErrors().CustomError("", "attachmentVendorService/handlePost/insertAttachmentVendor", "The Attachment with the id " + objAttachment.ATTACHMENT_ID + " does not exist");
    }
}

//Delete attachment vendor
function deleteAttachmentVendor(objAttachment, userId) {
    if (!objAttachment.ATTACHMENT_ID) {
        throw ErrorLib.getErrors().CustomError("", "attachmentVendorService/handleDelete/deleteAttachmentVendor", "The ATTACHMENT_ID is not found");
    }
    if (!existAttachment(objAttachment.ATTACHMENT_ID)) {
        throw ErrorLib.getErrors().CustomError("", "attachmentVendorService/handleDelete/deleteAttachmentVendor", "The Attachment with the id " + objAttachment.ATTACHMENT_ID + " does not exist");
    }
    return dataAttachmentV.deleteAttachmentVendor(objAttachment, userId);
}

//Check if the attachment exists
function existAttachment(attachmentId) {
    return dataAttachment.getManualAttachment(attachmentId).length > 0;
}

function validateInsertAttachmentVendor(objAttachment, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "attachmentVendorService/handlePut/insertAttachmentVendor", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['VENDOR_TYPE_ID',
        'VENDOR_ID',
        'ATTACHMENT_ID'];

    if (!objAttachment) {
        throw ErrorLib.getErrors().CustomError("", "attachmentVendorService/handlePost/insertAttachmentVendor", "The object Attachment Vendor is not found");
    }
    try {
        keys.forEach(function (key) {
            if (objAttachment[key] === null || objAttachment[key] === undefined) {
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
            throw ErrorLib.getErrors().CustomError("", "attachmentVendorService/handlePost/insertAttachmentVendor", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "attachmentVendorService/handlePost/insertAttachmentVendor", JSON.stringify(errors));
        }
    }
    return isValid;
}

function validateGetAttachmentVendor(objAttachment) {
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['VENDOR_TYPE_ID',
        'VENDOR_ID'];

    if (!objAttachment) {
        throw ErrorLib.getErrors().CustomError("", "attachmentVendorService/handlePost/insertAttachmentVendor", "The object Attachment Vendor is not found");
    }
    try {
        keys.forEach(function (key) {
            if (objAttachment[key] === null || objAttachment[key] === undefined) {
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
            throw ErrorLib.getErrors().CustomError("", "attachmentVendorService/handlePost/insertAttachmentVendor", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "attachmentVendorService/handlePost/insertAttachmentVendor", JSON.stringify(errors));
        }
    }
    return isValid;
}

//Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'VENDOR_TYPE_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'VENDOR_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'ATTACHMENT_ID':
            valid = !isNaN(value) && value > 0;
            break;
    }
    return valid;
}