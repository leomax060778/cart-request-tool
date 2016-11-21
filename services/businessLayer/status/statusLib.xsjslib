$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dataStatus = mapper.getDataStatus();

/** ***********GET ALL*************** */
function getAllInquiryStatus(){
    return dataStatus.getAllInquiryStatus();
}

function getAllVendorInquiryStatus(){
    return dataStatus.getAllVendorInquiryStatus();
}

function getAllRequestStatus(){
    return dataStatus.getAllRequestStatus();
}

function getAllVendorRequestStatus(){
    return dataStatus.getAllVendorRequestStatus();
}

function getAllChangeVendorRequestStatus(){
    return dataStatus.getAllChangeVendorRequestStatus();
}

function getAllExtendVendorRequestStatus(){
    return dataStatus.getAllExtendVendorRequestStatus();
}

function getAllStatusForFilters(){
    return dataStatus.getAllStatusForFilters();
}

/** ***********GET BY ID*************** */
function getInquiryStatusById(statusId) {
    return dataStatus.getInquiryStatusById(statusId);
}

function getVendorInquiryStatusById(statusId) {
    return dataStatus.getVendorInquiryStatusById(statusId);
}

function getRequestStatusById(statusId) {
    return dataStatus.getRequestStatusById(statusId);
}

function getVendorRequestStatusById(statusId) {
    return dataStatus.getVendorRequestStatusById(statusId);
}

function getChangeVendorRequestStatusById(statusId) {
    return dataStatus.getChangeVendorRequestStatusById(statusId);
}

function getExtendVendorRequestStatusById(statusId) {
    return dataStatus.getExtendVendorRequestStatusById(statusId);
}

/** ***********GET BY ID MANUAL*************** */
function getInquiryStatusByIdManual(statusId) {
    return dataStatus.getInquiryStatusByIdManual(statusId);
}

function getVendorInquiryStatusByIdManual(statusId) {
    return dataStatus.getVendorInquiryStatusByIdManual(statusId);
}

function getRequestStatusByIdManual(statusId) {
    return dataStatus.getRequestStatusByIdManual(statusId);
}

function getVendorRequestStatusByIdManual(statusId) {
    return dataStatus.getVendorRequestStatusByIdManual(statusId);
}

function getChangeVendorRequestStatusByIdManual(statusId) {
    return dataStatus.getChangeVendorRequestStatusByIdManual(statusId);
}

function getExtendVendorRequestStatusByIdManual(statusId) {
    return dataStatus.getExtendVendorRequestStatusByIdManual(statusId);
}
/** ***********INSERT*************** */
function insertInquiryStatus(objStatus, userId){
    if (validateInsertStatus(objStatus, userId)) {
        return dataStatus.insertInquiryStatus(objStatus, userId);
    }
}

function insertVendorInquiryStatus(objStatus, userId){
    if (validateInsertStatus(objStatus, userId)) {
        return dataStatus.insertVendorInquiryStatus(objStatus, userId);
    }
}

function insertVendorRequestStatus(objStatus, userId){
    if (validateInsertStatus(objStatus, userId)) {
        return dataStatus.insertVendorRequestStatus(objStatus, userId);
    }
}

function insertRequestStatus(objStatus, userId){
    if (validateInsertStatus(objStatus, userId)) {
        return dataStatus.insertRequestStatus(objStatus, userId);
    }
}

function insertChangeVendorRequestStatus(objStatus, userId){
    if (validateInsertStatus(objStatus, userId)) {
        return dataStatus.insertChangeVendorRequestStatus(objStatus, userId);
    }
}

function insertExtendVendorRequestStatus(objStatus, userId){
    if (validateInsertStatus(objStatus, userId)) {
        return dataStatus.insertExtendVendorRequestStatus(objStatus, userId);
    }
}

/** ***********UPDATE*************** */
function updateInquiryStatus(objStatus, userId){
    if (validateUpdateStatus(objStatus, userId)) {
        if (!existInquiryStatus(objStatus.INQUIRY_ID)) {
            throw ErrorLib.getErrors().CustomError("", "statusService/handleDelete/updateInquiryStatus", "The object INQUIRY_ID " + objStatus.INQUIRY_ID + " does not exist");
        } else {
            return dataStatus.updateInquiryStatus(objStatus, userId);
        }
    }
}

function updateVendorInquiryStatus(objStatus, userId){
    if (validateUpdateStatus(objStatus, userId)) {
        if (!existVendorInquiryStatus(objStatus.VENDOR_INQUIRY_ID)) {
            throw ErrorLib.getErrors().CustomError("", "statusService/handleDelete/updateVendorInquiryStatus", "The object VENDOR_INQUIRY_ID " + objStatus.VENDOR_INQUIRY_ID + " does not exist");
        } else {
            return dataStatus.updateVendorInquiryStatus(objStatus, userId);
        }
    }
}

function updateVendorRequestStatus(objStatus, userId){
    if (validateUpdateStatus(objStatus, userId)) {
        if (!existVendorRequestStatus(objStatus.VENDOR_REQUEST_ID)) {
            throw ErrorLib.getErrors().CustomError("", "statusService/handleDelete/updateVendorRequestStatus", "The object VENDOR_REQUEST_ID " + objStatus.VENDOR_REQUEST_ID + " does not exist");
        } else {
            return dataStatus.updateVendorRequestStatus(objStatus, userId);
        }
    }
}

function updateRequestStatus(objStatus, userId){
    if (validateUpdateStatus(objStatus, userId)) {
        if (!existRequestStatus(objStatus.REQUEST_ID)) {
            throw ErrorLib.getErrors().CustomError("", "statusService/handleDelete/updateRequestStatus", "The object REQUEST_ID " + objStatus.REQUEST_ID + " does not exist");
        } else {
            return dataStatus.updateRequestStatus(objStatus, userId);
        }
    }
}

function updateChangeVendorRequestStatus(objStatus, userId){
    if (validateUpdateStatus(objStatus, userId)) {
        if (!existChangeVendorRequestStatus(objStatus.CHANGE_VENDOR_REQUEST_ID)) {
            throw ErrorLib.getErrors().CustomError("", "statusService/handleDelete/updateChangeRequestStatus", "The object CHANGE_VENDOR_REQUEST_ID " + objStatus.CHANGE_VENDOR_REQUEST_ID + " does not exist");
        } else {
            return dataStatus.updateChangeVendorRequestStatus(objStatus, userId);
        }
    }
}

function updateExtendVendorRequestStatus(objStatus, userId){
    if (validateUpdateStatus(objStatus, userId)) {
        if (!existExtendVendorRequestStatus(objStatus.EXTEND_VENDOR_REQUEST_ID)) {
            throw ErrorLib.getErrors().CustomError("", "statusService/handleDelete/updateExtendRequestStatus", "The object EXTEND_VENDOR_REQUEST_ID " + objStatus.EXTEND_VENDOR_REQUEST_ID + " does not exist");
        } else {
            return dataStatus.updateChangeVendorRequestStatus(objStatus, userId);
        }
    }
}

/** ***********DELETE*************** */
function deleteInquiryStatus(objStatus, userId) {
    if (!objStatus.INQUIRY_ID) {
        throw ErrorLib.getErrors().CustomError("", "inquiryService/handleDelete/deleteInquiry", "The INQUIRY_ID is not found");
    }
    if (!existInquiryStatus(objStatus.INQUIRY_ID)) {
        throw ErrorLib.getErrors().CustomError("", "inquiryService/handleDelete/deleteInquiry", "The inquiry with the id " + objStatus.INQUIRY_ID + " does not exist");
    }
    return dataStatus.deleteInquiryStatus(objStatus, userId);
}

function deleteRequestStatus(objStatus, userId) {
    if (!objStatus.REQUEST_ID) {
        throw ErrorLib.getErrors().CustomError("", "inquiryService/handleDelete/deleteInquiry", "The REQUEST_ID is not found");
    }
    if (!existVendorInquiryStatus(objStatus.REQUEST_ID)) {
        throw ErrorLib.getErrors().CustomError("", "inquiryService/handleDelete/deleteInquiry", "The inquiry with the id " + objStatus.REQUEST_ID + " does not exist");
    }
    return dataStatus.deleteRequestStatus(objStatus, userId);
}

function deleteVendorInquiryStatus(objStatus, userId) {
    if (!objStatus.VENDOR_INQUIRY_ID) {
        throw ErrorLib.getErrors().CustomError("", "inquiryService/handleDelete/deleteInquiry", "The VENDOR_INQUIRY_ID is not found");
    }
    if (!existVendorRequestStatus(objStatus.VENDOR_INQUIRY_ID)) {
        throw ErrorLib.getErrors().CustomError("", "inquiryService/handleDelete/deleteInquiry", "The inquiry with the id " + objStatus.VENDOR_INQUIRY_ID + " does not exist");
    }
    return dataStatus.deleteVendorInquiryStatus(objStatus, userId);
}

function deleteVendorRequestStatus(objStatus, userId) {
    if (!objStatus.VENDOR_REQUEST_ID) {
        throw ErrorLib.getErrors().CustomError("", "inquiryService/handleDelete/deleteInquiry", "The VENDOR_REQUEST_ID is not found");
    }
    if (!existRequestStatus(objStatus.VENDOR_REQUEST_ID)) {
        throw ErrorLib.getErrors().CustomError("", "inquiryService/handleDelete/deleteInquiry", "The inquiry with the id " + objStatus.VENDOR_REQUEST_ID + " does not exist");
    }
    return dataStatus.deleteVendorRequestStatus(objStatus, userId);
}

function deleteExtendVendorRequestStatus(objStatus, userId) {
    if (!objStatus.EXTEND_VENDOR_REQUEST_ID) {
        throw ErrorLib.getErrors().CustomError("", "inquiryService/handleDelete/deleteInquiry", "The EXTEND_VENDOR_REQUEST_ID is not found");
    }
    if (!existChangeVendorRequestStatus(objStatus.EXTEND_VENDOR_REQUEST_ID)) {
        throw ErrorLib.getErrors().CustomError("", "inquiryService/handleDelete/deleteInquiry", "The inquiry with the id " + objStatus.EXTEND_VENDOR_REQUEST_ID + " does not exist");
    }
    return dataStatus.deleteExtendVendorRequestStatus(objStatus, userId);
}

function deleteChangeVendorRequestStatus(objStatus, userId) {
    if (!objStatus.CHANGE_VENDOR_REQUEST_ID) {
        throw ErrorLib.getErrors().CustomError("", "inquiryService/handleDelete/deleteInquiry", "The CHANGE_VENDOR_REQUEST_ID is not found");
    }
    if (!existExtendVendorRequestStatus(objStatus.CHANGE_VENDOR_REQUEST_ID)) {
        throw ErrorLib.getErrors().CustomError("", "inquiryService/handleDelete/deleteInquiry", "The inquiry with the id " + objStatus.CHANGE_VENDOR_REQUEST_ID + " does not exist");
    }
    return dataStatus.deleteChangeVendorRequestStatus(objStatus, userId);
}

/** ***********CHECK IF STATUS EXISTS*************** */
function existInquiryStatus(statusId){
    return getInquiryStatusByIdManual(statusId).length > 0;
}

function existRequestStatus(statusId){
    return getRequestStatusByIdManual(statusId).length > 0;
}

function existVendorInquiryStatus(statusId){
    return getVendorInquiryStatusByIdManual(statusId).length > 0;
}

function existVendorRequestStatus(statusId){
    return getVendorRequestStatusByIdManual(statusId).length > 0;
}

function existChangeVendorRequestStatus(statusId){
    return getChangeVendorRequestStatusByIdManual(statusId).length > 0;
}

function existExtendVendorRequestStatus(statusId){
    return getExtendVendorRequestStatusByIdManual(statusId).length > 0;
}

/** ***********VALIDATION*************** */
function validateInsertStatus(objStatus, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "inquiryService/handlePost", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'NAME',
        'ADMINISTRABLE'];

    if (!objStatus) {
        throw ErrorLib.getErrors().CustomError("", "statusService/handlePost", "The object Status is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objStatus[key] === null || objStatus[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objStatus[key]);
                if (!isValid) {
                    errors[key] = objStatus[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "statusService/handlePost", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "statusService/handlePost", JSON.stringify(errors));
        }
    }
    return isValid;
}

function validateUpdateStatus(objStatus, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "inquiryService/handlePost", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['STATUS_ID',
        'NAME',
        'ADMINISTRABLE'];

    if (!objStatus) {
        throw ErrorLib.getErrors().CustomError("", "statusService/handlePost", "The object Status is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objStatus[key] === null || objStatus[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objStatus[key]);
                if (!isValid) {
                    errors[key] = objStatus[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "statusService/handlePost", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "statusService/handlePost", JSON.stringify(errors));
        }
    }
    return isValid;
}

/** ***********CHECK DATA TYPE*************** */
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'STATUS_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'NAME':
            valid = value.length > 0 && value.length <= 255;
            break;
        case 'ADMINISTRABLE':
            valid = !isNaN(value) && (value === 0 || value === 1);
            break;
    }
    return valid;
}