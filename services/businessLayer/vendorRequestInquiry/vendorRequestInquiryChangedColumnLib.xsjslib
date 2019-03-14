$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataChangedColumn = mapper.getDataVendorRequestInquiryChangedColumn();
var ErrorLib = mapper.getErrors();

/** ***********END INCLUDE LIBRARIES*************** */


/** New Vendor Request */

function getVendorRequestChangedColumnsByVendorRequestId(vendorRequestId) {
    if (!vendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The parameter vendorRequestId was not found", "", vendorRequestId);
    }

    var changedColumns = dataChangedColumn.getVendorRequestChangedColumnsByVendorRequestId(vendorRequestId);
    var result = {};
    if (changedColumns.length) {
        result = parseChangedFields(changedColumns);
    }
    return result;
}

function insertVendorRequestChangedColumn(objVendorRequest, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The parameter userId was not found", "", userId);
    }
    var vendorRequestChangedFields = objVendorRequest.CHANGED_FIELDS;
    var parsedObjectForProcessingReport = {
        'ENTITY': vendorRequestChangedFields.ENTITY_ID,
        'LEGAL_NAME': vendorRequestChangedFields.VENDOR_LEGAL_NAME,
        'INFORMAL_NAME': vendorRequestChangedFields.VENDOR_INFORMAL_NAME,
        'ADDRESS_1': vendorRequestChangedFields.ADDRESS_1,
        'ADDRESS_2': vendorRequestChangedFields.ADDRESS_2,
        'CITY': vendorRequestChangedFields.VENDOR_REQUEST_CITY,
        'ZIP': vendorRequestChangedFields.ZIP,
        'STATE': vendorRequestChangedFields.VENDOR_REQUEST_STATE,
        'COUNTRY_EN': vendorRequestChangedFields.COUNTRY_ID,
        'PHONE': vendorRequestChangedFields.PHONE,
        'FAX': vendorRequestChangedFields.FAX,
        'CONTACT_NAME': vendorRequestChangedFields.VENDOR_CONTACT_NAME,
        'CONTACT_EMAIL': vendorRequestChangedFields.VENDOR_CONTACT_EMAIL,
        'CONTACT_PHONE': vendorRequestChangedFields.VENDOR_CONTACT_PHONE,
        'COMMODITY': vendorRequestChangedFields.COMMODITY_ID,
        'NOT_USED_SAP_SUPPLIER': vendorRequestChangedFields.NOT_USED_SAP_SUPPLIER,
        'SERVICE_SUPPLIER': vendorRequestChangedFields.SERVICE_SUPPLIER,
        'PURCHASE_AMOUNT': vendorRequestChangedFields.PURCHASE_AMOUNT,
        'CURRENCY': vendorRequestChangedFields.PURCHASE_CURRENCY_ABBREVIATION,
        'EXPECTED_AMOUNT': vendorRequestChangedFields.EXPECTED_AMOUNT,
        'EXPECTED_CURRENCY': vendorRequestChangedFields.PURCHASE_CURRENCY_ABBREVIATION,
        'ACCEPT_AMERICAN_EXPRESS': vendorRequestChangedFields.ACCEPT_AMERICAN_EXPRESS,
        'COST_CENTER_OWNER': vendorRequestChangedFields.COST_CENTER_OWNER
    };

    if (vendorRequestChangedFields.DATA_PROTECTION) {
        vendorRequestChangedFields.DATA_PROTECTION.forEach(function (question) {
            Object.keys(question).forEach(function (elem) {
                parsedObjectForProcessingReport[elem] = question[elem];
            });
        });
    }

    if (vendorRequestChangedFields.ATTACHMENTS) {
        vendorRequestChangedFields.ATTACHMENTS.forEach(function (attachment) {
            Object.keys(attachment).forEach(function (elem) {
                parsedObjectForProcessingReport[elem] = attachment[elem];
            });
        });
    }
    var changedFieldsCollection = getChangedFields(parsedObjectForProcessingReport);
    return dataChangedColumn.insertVendorRequestChangedColumn(changedFieldsCollection, objVendorRequest.VENDOR_REQUEST_ID, userId);
}

function deleteVendorRequestChangedColumn(vendorRequestId) {
    if (!vendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The parameter vendorRequestId was not found", "", vendorRequestId);
    }
    return dataChangedColumn.deleteVendorRequestChangedColumn(vendorRequestId);
}


/** Vendor Inquiry */

function getVendorInquiryChangedColumnsByVendorInquiryId(vendorInquiryId) {
    if (!vendorInquiryId) {
        throw ErrorLib.getErrors().BadRequest("The parameter vendorInquiryId was not found", "", vendorInquiryId);
    }

    var changedColumns = dataChangedColumn.getVendorInquiryChangedColumnsByVendorInquiryId(vendorInquiryId);
    var result = {};
    if (changedColumns.length) {
        result = parseChangedFields(changedColumns);
    }
    return result;
}

function insertVendorInquiryChangedColumn(objVendorInquiry, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The parameter userId was not found", "", userId);
    }
    var vendorInquiryChangedFields = objVendorInquiry.CHANGED_FIELDS;
    var parsedObjectForProcessingReport = {
        'VENDOR_NAME': vendorInquiryChangedFields.VENDOR_NAME
    };

    if (vendorInquiryChangedFields.ATTACHMENTS) {
        vendorInquiryChangedFields.ATTACHMENTS.forEach(function (attachment) {
            Object.keys(attachment).forEach(function (elem) {
                parsedObjectForProcessingReport[elem] = attachment[elem];
            });
        });
    }
    var changedFieldsCollection = getChangedFields(parsedObjectForProcessingReport);
    return dataChangedColumn.insertVendorInquiryChangedColumn(changedFieldsCollection, objVendorInquiry.VENDOR_INQUIRY_ID, userId);
}

function deleteVendorInquiryChangedColumn(vendorInquiryId) {
    if (!vendorInquiryId) {
        throw ErrorLib.getErrors().BadRequest("The parameter vendorInquiryId was not found", "", vendorInquiryId);
    }
    return dataChangedColumn.deleteVendorInquiryChangedColumn(vendorInquiryId);
}

/** Change Vendor Request */

function getChangeVendorRequestChangedColumnsByChangeVendorRequestId(changeVendorRequestId) {
    if (!changeVendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The parameter changeVendorRequestId was not found", "", changeVendorRequestId);
    }

    var changedColumns = dataChangedColumn.getChangeVendorRequestChangedColumnsByChangeVendorRequestId(changeVendorRequestId);
    var result = {};
    if (changedColumns.length) {
        result = parseChangedFields(changedColumns);
    }
    return result;
}

function insertChangeVendorRequestChangedColumn(objChangeVendorRequest, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The parameter userId was not found", "", userId);
    }
    var changeVendorRequestChangedFields = objChangeVendorRequest.CHANGED_FIELDS;
    var parsedObjectForProcessingReport = {
        'ENTITY_NAME': changeVendorRequestChangedFields.ENTITY_ID,
        'VENDOR_ACCOUNT': changeVendorRequestChangedFields.VENDOR_ACCOUNT,
        'VENDOR_NAME': changeVendorRequestChangedFields.VENDOR_NAME,
        'VENDOR_CONTACT_NAME': changeVendorRequestChangedFields.VENDOR_CONTACT_NAME,
        'VENDOR_CONTACT_EMAIL': changeVendorRequestChangedFields.VENDOR_CONTACT_EMAIL,
        'VENDOR_CONTACT_PHONE': changeVendorRequestChangedFields.VENDOR_CONTACT_PHONE,
        'COMMODITY': changeVendorRequestChangedFields.COMMODITY_ID
    };

    if (changeVendorRequestChangedFields.CHECKBOX) {
        changeVendorRequestChangedFields.CHECKBOX.forEach(function (element) {
            parsedObjectForProcessingReport['{"SUPPORTING_DOCUMENTATION_ID": ' + element.SUPPORTING_DOCUMENTATION_ID + "}"] = element.LABEL;
        });
    }

    if (changeVendorRequestChangedFields.ATTACHMENTS) {
        changeVendorRequestChangedFields.ATTACHMENTS.forEach(function (attachment) {
            Object.keys(attachment).forEach(function (elem) {
                parsedObjectForProcessingReport[elem] = attachment[elem];
            });
        });
    }
    var changedFieldsCollection = getChangedFields(parsedObjectForProcessingReport);
    return dataChangedColumn.insertChangeVendorRequestChangedColumn(changedFieldsCollection, objChangeVendorRequest.CHANGE_VENDOR_REQUEST_ID, userId);
}

function deleteChangeVendorRequestChangedColumn(changeVendorRequestId) {
    if (!changeVendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The parameter changeVendorRequestId was not found", "", changeVendorRequestId);
    }
    return dataChangedColumn.deleteChangeVendorRequestChangedColumn(changeVendorRequestId);
}


/** Extend Vendor Request */

function getExtendVendorRequestChangedColumnsByExtendVendorRequestId(extendVendorRequestId) {
    if (!extendVendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The parameter extendVendorRequestId was not found", "", extendVendorRequestId);
    }

    var changedColumns = dataChangedColumn.getExtendVendorRequestChangedColumnsByExtendVendorRequestId(extendVendorRequestId);
    var result = {};
    if (changedColumns.length) {
        result = parseChangedFields(changedColumns);
    }
    return result;
}

function insertExtendVendorRequestChangedColumn(objExtendVendorRequest, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The parameter userId was not found", "", userId);
    }
    var extendVendorRequestChangedFields = objExtendVendorRequest.CHANGED_FIELDS;
    var parsedObjectForProcessingReport = {
        'ENTITY': extendVendorRequestChangedFields.ENTITY_ID,
        'VENDOR_LEGAL_NAME': extendVendorRequestChangedFields.VENDOR_LEGAL_NAME,
        'INFORMAL_NAME': extendVendorRequestChangedFields.VENDOR_INFORMAL_NAME,
        'CONTACT_NAME': extendVendorRequestChangedFields.VENDOR_CONTACT_NAME,
        'CONTACT_EMAIL': extendVendorRequestChangedFields.VENDOR_CONTACT_EMAIL,
        'CONTACT_PHONE': extendVendorRequestChangedFields.VENDOR_CONTACT_PHONE,
        'COMMODITY_DESCRIPTION': extendVendorRequestChangedFields.COMMODITY_ID,
        'SERVICE_SUPPLIER': extendVendorRequestChangedFields.SERVICE_SUPPLIER,
        'PURCHASE_AMOUNT': extendVendorRequestChangedFields.PURCHASE_AMOUNT,
        'CURRENCY': extendVendorRequestChangedFields.PURCHASE_CURRENCY_ID,
        'EXPECTED_AMOUNT': extendVendorRequestChangedFields.EXPECTED_AMOUNT
    };

    if (extendVendorRequestChangedFields.ATTACHMENTS) {
        extendVendorRequestChangedFields.ATTACHMENTS.forEach(function (attachment) {
            Object.keys(attachment).forEach(function (elem) {
                parsedObjectForProcessingReport[elem] = attachment[elem];
            });
        });
    }
    var changedFieldsCollection = getChangedFields(parsedObjectForProcessingReport);
    return dataChangedColumn.insertExtendVendorRequestChangedColumn(changedFieldsCollection, objExtendVendorRequest.EXTEND_VENDOR_REQUEST_ID, userId);
}

function deleteExtendVendorRequestChangedColumn(extendVendorRequestId) {
    if (!extendVendorRequestId) {
        throw ErrorLib.getErrors().BadRequest("The parameter extendVendorRequestId was not found", "", extendVendorRequestId);
    }
    return dataChangedColumn.deleteExtendVendorRequestChangedColumn(extendVendorRequestId);
}


/** General methods */

function getChangedFields(parsedObjectForProcessingReport) {
    var fieldCollection = [];
    var field = {};
    Object.keys(parsedObjectForProcessingReport).forEach(function (key) {
        if (parsedObjectForProcessingReport[key]) {
            field = {
                COLUMN_NAME: key,
                DISPLAY_NAME: parsedObjectForProcessingReport[key]
            };
            fieldCollection.push(field);
        }
    });
    return fieldCollection;
}

function parseChangedFields(changedColumns) {
    var result = {};
    var objKey = "";
    var dataProtection = [];
    var dataProtectionId = [];
    var noteId = [];
    var arrNote = [];
    var attachmentId = [];
    var arrAttachment = [];
    var supportingDocumentationMap = {};
    changedColumns.forEach(function (elem) {
        objKey = elem.COLUMN_NAME;
        //Check if the column name is an object
        if (objKey[0] === "{") {
            objKey = JSON.parse(objKey);
            if (objKey.QUESTION_ID) {
                if (dataProtectionId.indexOf(objKey.QUESTION_ID) === -1) {
                    dataProtectionId.push(objKey.QUESTION_ID);
                    dataProtection.push(objKey);
                }
                result.DATA_PROTECTION = dataProtection;
            } else if (objKey.NOTE_REQUEST_ID) {
                if (noteId.indexOf(objKey.NOTE_REQUEST_ID) === -1) {
                    noteId.push(objKey.NOTE_REQUEST_ID);
                    arrNote.push(objKey);
                }
                result.NOTES = arrNote;
            } else if (objKey.ATTACHMENT_ID) {
                if (attachmentId.indexOf(objKey.ATTACHMENT_ID) === -1) {
                    attachmentId.push(objKey.ATTACHMENT_ID);
                    arrAttachment.push(objKey);
                }
                result.ATTACHMENT = arrAttachment;
            } else if (objKey.SUPPORTING_DOCUMENTATION_ID) {
                supportingDocumentationMap[objKey.SUPPORTING_DOCUMENTATION_ID] = true;
                result.CHECKBOX = supportingDocumentationMap;
            }
        } else {
            result[objKey] = true;
        }
    });
    return result;
}