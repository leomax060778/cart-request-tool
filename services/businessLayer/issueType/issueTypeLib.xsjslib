$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataIssueType = mapper.getDataIssueType();
var dataCrtIssueType = mapper.getDataCrtIssueType();
var dataCRTType = mapper.getDataCrtType();

var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//Insert issue type
function insertIssueType(objIssueType, userId) {
    if (validateInsertIssueType(objIssueType, userId)) {
        return dataIssueType.insertIssueType(objIssueType, userId);
    }
}

//Get issue type by ID
function getIssueTypeById(issueTypeId) {
    if (!issueTypeId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter issueTypeId is not found", "issueTypeService/handleGet/getIssueTypeById", issueTypeId);
    }
    
    var issue_type;
    issue_type = dataIssueType.getIssueTypeById(issueTypeId);
    
    if(issue_type){
    	issue_type = JSON.parse(JSON.stringify(issue_type));
    	issue_type.CRT_TYPE = dataCRTType.getCrtTypeByIssueType(issue_type.ISSUE_TYPE_ID);
    }
    return issue_type;
}

//Get issue type by ID manually
function getIssueTypeByIdManual(issueTypeId) {
    if (!issueTypeId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter issueTypeId is not found", "issueTypeService/handleGet/getIssueTypeById", issueTypeId);
    }
    var issue_type;
    issue_type = dataIssueType.getIssueTypeByIdManual(issueTypeId);
    
    if(issue_type){
    	issue_type = JSON.parse(JSON.stringify(issue_type));
    	issue_type.CRT_TYPE = dataCRTType.getCrtTypeByIssueType(issue_type.ISSUE_TYPE_ID);
    }
    return issue_type;
}

//Get issue type by crt id manually
function getIssueTypeByCrtIdManual(crtTypeId) {
    if (!crtTypeId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter crtTypeId is not found", "issueTypeService/handleGet/getIssueTypeByCrtId", crtTypeId);
    }
    return dataCrtIssueType.getIssueTypeByCrtIdManual(crtTypeId);
}

//Get all issue type
function getAllIssueType() {
    return dataIssueType.getAllIssueType();
}

//Update issue type
function updateIssueType(objIssueType, userId) {
    if (validateUpdateIssueType(objIssueType, userId)) {
        if (!existIssueType(objIssueType.ISSUE_TYPE_ID)) {
            throw ErrorLib.getErrors().CustomError("", "issueTypeService/handleDelete/updateIssueType", "The object ISSUE_TYPE_ID " + objIssueType.ISSUE_TYPE_ID + " does not exist");
        }
        return dataIssueType.updateIssueType(objIssueType, userId);
    }
}

//Delete issue type
function deleteIssueType(objIssueType, userId) {
    if (!objIssueType.ISSUE_TYPE_ID) {
        throw ErrorLib.getErrors().CustomError("", "issueTypeService/handlePost/deleteIssueType", "The ISSUE_TYPE_ID is not found");
    }
    if (!existIssueType(objIssueType.ISSUE_TYPE_ID)) {
        throw ErrorLib.getErrors().CustomError("", "issueTypeService/handleDelete/updateIssueType", "The object ISSUE_TYPE_ID " + objIssueType.ISSUE_TYPE_ID + " does not exist");
    }
    return dataIssueType.deleteIssueType(objIssueType, userId);
}

//Check if the request exists
function existIssueType(issueTypeId) {
    return getIssueTypeByIdManual(issueTypeId).length > 0;
}

function validateInsertIssueType(objIssueType, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "issueTypeService/handlePut/insertIssueType", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'NAME'
    ];
    var optionalKeys = ['ADDITIONAL_ISSUE_TYPE_INFORMATION'];

    if (!objIssueType) {
        throw ErrorLib.getErrors().CustomError("", "issueTypeService/handlePost/insertIssueType", "The object issueType is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objIssueType[key] === null || objIssueType[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objIssueType[key]);
                if (!isValid) {
                    errors[key] = objIssueType[key];
                    throw BreakException;
                }
            }
        });
        optionalKeys.forEach(function (key) {
            // validate attribute type
        	isValid = validateType(key, objReturnType[key]);
        	if (!isValid) {
        		errors[key] = objReturnType[key];
        		throw BreakException;
        	}
        });
        
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "issueTypeService/handlePost/insertIssueType", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "issueTypeService/handlePost/insertIssueType", JSON.stringify(errors));
        }
    }
    return isValid;
}

function validateUpdateIssueType(objIssueType, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "issueTypeService/handlePut/updateIssueType", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'ISSUE_TYPE_ID',
        'NAME'
    ];
    var optionalKeys = ['ADDITIONAL_ISSUE_TYPE_INFORMATION'];

    if (!objIssueType) {
        throw ErrorLib.getErrors().CustomError("", "issueTypeService/handlePut/updateIssueType", "The object issueType is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objIssueType[key] === null || objIssueType[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objIssueType[key]);
                if (!isValid) {
                    errors[key] = objIssueType[key];
                    throw BreakException;
                }
            }
        });
        optionalKeys.forEach(function (key) {
            // validate attribute type
        	isValid = validateType(key, objReturnType[key]);
        	if (!isValid) {
        		errors[key] = objReturnType[key];
        		throw BreakException;
        	}
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "issueTypeService/handlePut/updateIssueType", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "issueTypeService/handlePut/updateIssueType", JSON.stringify(errors));
        }
    }
    return isValid;
}

//Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'NAME':
            valid = value.length > 0 && value.length <= 255;
            break;
        case 'ISSUE_TYPE_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'ADDITIONAL_ISSUE_TYPE_INFORMATION':
            valid = (!value) || !isNaN(value) && value >= 0 && value < 2;
            break;
    }
    return valid;
}