$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataInquiry = mapper.getDataInquiry();
var inquiryStatus = mapper.getInquiryStatus();
var message = mapper.getInquiryMessage();
var businessAttachmentInquiry = mapper.getAttachmentInquiry();
var businessAttachment = mapper.getAttachment();
var mail = mapper.getMail();
var businessUser = mapper.getUser();
var ErrorLib = mapper.getErrors();
var dbHelper = mapper.getdbHelper();
var config = mapper.getDataConfig();
var userRole = mapper.getUserRole();
var dataUserRole = mapper.getDataUserRole();

//CRT Inquiry email sending
var inquiryMailSend = mapper.getCrtInquiryMailSend();

/** ***********END INCLUDE LIBRARIES*************** */

var pathName = "CRT_INQUIRY";

var resourceMap = {'CRT_INQUIRY': 7};
var permissionMap = {'CREATE_EDIT': 10};

var permissionData = {
    RESOURCE_ID: resourceMap.CRT_INQUIRY,
    PERMISSION_ID: permissionMap.CREATE_EDIT
};

var statusInquiryMap = {'TO_BE_CHECKED': 1, 'RETURN_TO_REQUESTER': 2, 'COMPLETED': 3, 'CANCELLED': 4};
var roleMap = {
    "SUPER_ADMIN": 1,
    "REQUESTER": 2,
    "BUSINESS_MGT": 3,
    "BUDGET_OWNER": 4
};

function validatePermissionByUserRole(roleData, resRequest) {
    return (Number(roleData.ROLE_ID) !== roleMap.REQUESTER) ? true : (Number(roleData.USER_ID) === Number(resRequest.CREATED_USER_ID));
}

//Insert inquiry
function insertInquiry(objInquiry, userId) {
	var resInquiry;
    if (validateInsertInquiry(objInquiry, userId)) {
        resInquiry = dataInquiry.insertInquiryManual(objInquiry, userId);
        objInquiry.INQUIRY_ID = resInquiry;
        objInquiry.MESSAGE_CONTENT = "<p>" + objInquiry.INQUIRY_TEXT + "</p>";
        objInquiry.ATTACHMENTS.forEach(function (attachment) {
            attachment.INQUIRY_ID = resInquiry;
            businessAttachmentInquiry.insertAttachmentInquiryManual(attachment, userId);
        });
        message.insertInquiryMessage(objInquiry, userId);
    }
    return resInquiry;
}

//Get inquiry by id
function getInquiryById(inquiryId, userId, edition_mode) {
	var roleData = userRole.getUserRoleByUserId(userId);
    var inquiry = dataInquiry.getInquiryById(inquiryId, permissionData, userId);
    if (edition_mode && !inquiry.EDITABLE) {
        throw ErrorLib.getErrors().BadRequest(
            "Unauthorized request.",
            "",
            '{"EDIT_PERMISSION_ERROR": "inquiry"}');
    }
    inquiry = JSON.parse(JSON.stringify(inquiry));

    if (validatePermissionByUserRole(roleData[0], inquiry)) {
        inquiry.ATTACHMENTS = businessAttachmentInquiry.getAttachmentInquiryById(inquiryId);
        return inquiry;
    } else {
        throw ErrorLib.getErrors().Forbidden("", "", "The user does not have permission to Read/View this CRT Inquiry.");
    }
}

//Get last inquiry id
function getInquiryLastId() {
    var newId = dataInquiry.getInquiryLastId();
    var inquiry;
    if (newId) {
        inquiry = newId;
    } else {
        inquiry = {"CI_ID": "CI1"};
    }
    return inquiry;
}

//Get inquiry by id manually
function getInquiryByIdManual(inquiryId, userId) {
    var inquiry = dataInquiry.getInquiryByIdManual(inquiryId, permissionData, userId);
    inquiry = JSON.parse(JSON.stringify(inquiry));

    inquiry.ATTACHMENTS = businessAttachmentInquiry.getAttachmentInquiryById(inquiry.INQUIRY_ID);
    return inquiry;

}

//Get all inquiries
function getAllInquiry(userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var inquiry = [];
    inquiry = dataInquiry.getAllInquiry(permissionData, userId);
    inquiry = JSON.parse(JSON.stringify(inquiry));
    inquiry.forEach(function (elem) {
        if (elem.MESSAGE_READ > 0) {
            elem.SHOW_MESSAGE_READ = 1;
        } else {
            elem.SHOW_MESSAGE_READ = 0;
        }
    });
    return inquiry;
}

//ATTACHMENT UPDATE
function insertAttachmentInquiry(attachment, in_inquiry_id, userId) {
    attachment.INQUIRY_ID = in_inquiry_id;
    var serviceUrl = "inquiryService/handleUpdate/updateInquiry/insertAttachmentInquiry";
    return businessAttachmentInquiry.insertAttachmentInquiryManual(attachment, userId);

}

function deleteAttachment(attachment, in_inquiry_id, userId) {
    attachment.INQUIRY_ID = in_inquiry_id;
    if (businessAttachmentInquiry.deleteAttachmentInquiryManual(attachment, userId)) {
        businessAttachmentInquiry.deleteAttachmentInquiryConectionManual(attachment.ATTACHMENT_ID, in_inquiry_id, userId);
    }
}

function deleteAttachmentOnly(reqBody, userId) {
    return businessAttachment.deleteAttachment(reqBody, userId);
}

function updateAttachments(original_attachments, newAttachments, inquiry_id, user_id) {

    var original_attachments_local = original_attachments;
    var originalAttachmentsToUpdate = newAttachments;

    var insertOriginalAttachments = [];
    var deleteOriginalAttachments = [];

    //DELETE
    original_attachments_local.forEach(function (o_attachment) {
        var result = true;
        var o_attachment_id = o_attachment.ATTACHMENT_ID;
        if (typeof o_attachment_id === 'string') {
            o_attachment_id = Number(o_attachment_id);
        }
        originalAttachmentsToUpdate.forEach(function (updateAttach) {
            updateAttach.ATTACHMENT_ID = Number(updateAttach.ATTACHMENT_ID);
            if (o_attachment_id === updateAttach.ATTACHMENT_ID) {
                result = false;
            }
        });
        if (result) {
            deleteOriginalAttachments.push(o_attachment);
        }
    });

    //INSERT
    originalAttachmentsToUpdate.forEach(function (newAttach) {
        var result = true;
        newAttach.ATTACHMENT_ID = Number(newAttach.ATTACHMENT_ID);
        original_attachments_local.forEach(function (attachment) {
            var o_attachment_id = attachment.ATTACHMENT_ID;
            if (typeof o_attachment_id === 'string') {
                o_attachment_id = Number(o_attachment_id);
            }
            if (newAttach.ATTACHMENT_ID === o_attachment_id) {
                result = false;
            }
        });
        if (result) {
            insertOriginalAttachments.push(newAttach);
        }
    });

    //ACTIONS
    if (insertOriginalAttachments.length > 0) {
        insertOriginalAttachments.forEach(function (attachment) {
            insertAttachmentInquiry(attachment, inquiry_id, user_id);
        });
    }
    if (deleteOriginalAttachments.length > 0) {
        deleteOriginalAttachments.forEach(function (attachment) {
            deleteAttachment(attachment, inquiry_id, user_id);
        });
    }
    return 1;
}

//Update inquiry
function updateInquiry(objInquiry, userId) {
    if (validateUpdateInquiry(objInquiry, userId)) {
        if (!existInquiry(objInquiry.INQUIRY_ID, userId)) {
            throw ErrorLib.getErrors().CustomError("", "", "The object INQUIRY_ID " + objInquiry.INQUIRY_ID + " does not exist");
        } else {
            var result_id;
            try {
                if (Number(objInquiry.STATUS_ID !== statusInquiryMap.TO_BE_CHECKED)) {
                    objInquiry.PREVIOUS_STATUS_ID = objInquiry.STATUS_ID;
                    objInquiry.STATUS_ID = statusInquiryMap.TO_BE_CHECKED;
                    inquiryStatus.updateInquiryStatus(objInquiry, userId);
                }
                result_id = dataInquiry.updateInquiryManual(objInquiry, userId);
                if (result_id) {
                    var attachmentList = businessAttachmentInquiry.getAttachmentInquiryByIdManual(objInquiry.INQUIRY_ID);

                    //ATTACHMENTS UPDATE
                    if (attachmentList) {
                        updateAttachments(attachmentList, objInquiry.ATTACHMENTS, objInquiry.INQUIRY_ID, userId);
                    }
                }
                dbHelper.commit();
            }
            catch (e) {
                dbHelper.rollback();
                throw ErrorLib.getErrors().CustomError("", "", e.toString());
            }
            finally {
                dbHelper.closeConnection();
            }

            return result_id;
        }
    }
}

//Delete inquiry
function deleteInquiry(objInquiry, userId) {
    if (!objInquiry.INQUIRY_ID) {
        throw ErrorLib.getErrors().CustomError("", "", "The INQUIRY_ID is not found");
    }
    if (!existInquiry(objInquiry.INQUIRY_ID, userId)) {
        throw ErrorLib.getErrors().CustomError("", "", "The inquiry with the id " + objInquiry.INQUIRY_ID + " does not exist");
    }
    return dataInquiry.deleteInquiry(objInquiry, userId);
}

//Check if the inquiry exists
function existInquiry(inquiryId, userId) {
    return Object.keys(getInquiryByIdManual(inquiryId, userId)).length > 0;
}

//Validate insert inquiry
function validateInsertInquiry(objInquiry, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['TOPIC_ID',
        'INQUIRY_TEXT'];

    if (!objInquiry) {
        throw ErrorLib.getErrors().CustomError("", "", "The object  Inquiry is not found");
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
            throw ErrorLib.getErrors().CustomError("", "", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "", JSON.stringify(errors));
        }
    }
    return isValid;
}

function validateUpdateInquiry(objInquiry, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'INQUIRY_ID',
        'TOPIC_ID'];

    if (!objInquiry) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Inquiry is not found");
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
            throw ErrorLib.getErrors().CustomError("", "", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "", JSON.stringify(errors));
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

function sendSubmitMail(inquiryId, userId) {
    var inquiryMailObj = {};
    inquiryMailObj.INQUIRY_ID = inquiryId;

    inquiryMailSend.sendSubmitMail(inquiryMailObj.INQUIRY_ID, userId);
}

function sendResubmitMail(inquiryId, userId) {
    var inquiryMailObj = {};
    inquiryMailObj.INQUIRY_ID = inquiryId;

    inquiryMailSend.sendResubmitMail(inquiryMailObj.INQUIRY_ID, userId);
}

function getUrlBase() {
    return config.getUrlBase();
}

function getEmailList() {
    return config.getEmailList();
}

function getPath(stringName) {
    return config.getPath(stringName);
}

function getBasicData(stringPathName) {
    return config.getBasicData(stringPathName);
}