$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataTemplate = mapper.getDataTemplate();
var dataTemplateType = mapper.getDataTemplateType();
var dataTemplateSection = mapper.getDataTemplateSection();
var dbHelper = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();

/** ***********END INCLUDE LIBRARIES*************** */

var templateTypeMap = {
    "DIRECTORY": 1,
    "FILE": 2,
    "LINK": 3
};

// Insert template
function insertTemplate(objTemplate, userId) {
    if (validateInsertTemplate(objTemplate, userId)) {
        if (!existTemplateType(objTemplate.TEMPLATE_TYPE_ID)) {
            throw ErrorLib.getErrors().CustomError("", "", "The object TemplateType doesn't exist");
        }
        if (!existTemplateSection(objTemplate.SECTION_ID)) {
            throw ErrorLib.getErrors().CustomError("", "", "The object TemplateSection doesn't exist");
        }
        return dataTemplate.insertTemplate(objTemplate, userId);
    }
}

// Get template by ID
function getTemplateById(templateId, userId) {
    validateTemplateParameters(templateId, userId);
    return dataTemplate.getTemplateById(templateId);
}

function getManualTemplateById(templateId) {
    return dataTemplate.getManualTemplateById(templateId);
}

// Get all template
function getAllTemplate() {
    return dataTemplate.getTemplate();
}

function getAllTemplateByParentAndSection(objRequest, userId) {
    return dataTemplate.getAllTemplateByParentAndSection(objRequest);
}

function getAllTemplateBySectionId(sectionId) {
    var result = dataTemplate.getAllTemplateBySectionId(sectionId);
    result = JSON.parse(JSON.stringify(result));
    var tree = {};
    var plainResult = {};
    var masterRootId = 0;
    if (result.length) {
        for (var i = 0; i < result.length; i++) {
            var row = result[i];
            tree[row.TEMPLATE_PARENT_ID] = tree[row.TEMPLATE_PARENT_ID] || {NODES: {}};
            tree[row.TEMPLATE_ID] = tree[row.TEMPLATE_ID] || {};
            var currentNode = tree[row.TEMPLATE_ID];
            currentNode.TEMPLATE_ID = row.TEMPLATE_ID;
            currentNode.TEMPLATE_PARENT_ID = row.TEMPLATE_PARENT_ID;
            currentNode.TEMPLATE_TYPE_ID = row.TEMPLATE_TYPE_ID;
            currentNode.CREATED_DATE_TZ = row.CREATED_DATE_TZ;
            currentNode.MODIFIED_DATE_TZ = row.MODIFIED_DATE_TZ;
            currentNode.USER_ID = row.USER_ID;
            currentNode.NAME = row.NAME;
            currentNode.LINK = row.LINK;
            currentNode.TEMPLATE_ORDER = row.TEMPLATE_ORDER;
            currentNode.DELETED_TEMPLATE_NAME = row.DELETED_TEMPLATE_NAME;
            currentNode.DESCRIPTION = row.DESCRIPTION;
            currentNode.SECTION_ID = row.SECTION_ID;
            currentNode.ATTACHMENT_ID = row.ATTACHMENT_ID;
            currentNode.ORIGINAL_NAME = row.ORIGINAL_NAME;
            currentNode.SAVED_NAME = row.SAVED_NAME;
            currentNode.TEMPLATE_TYPE_NAME = row.TEMPLATE_TYPE_NAME;
            currentNode.NODES = currentNode.NODES || {};
            var parentNode = tree[row.TEMPLATE_PARENT_ID];
            parentNode.NODES[currentNode.TEMPLATE_ID] = currentNode;
        }
        result.forEach(function (elem) {
            plainResult[elem.TEMPLATE_ID] = elem;
        });
        calculateDateRecursive({
            TEMPLATE_TYPE_ID: templateTypeMap.DIRECTORY,
            NODES: tree[masterRootId].NODES,
            CREATED_DATE_TZ: 0,
            MODIFIED_DATE_TZ: 0
        }, [{0: "Desktop"}]);
        return {TREE: tree[masterRootId].NODES, RESULT: plainResult};
    } else {
        return {TREE: {}, RESULT: result};
    }
}

function calculateDateRecursive(template, path) {
    var createdDate = new Date(template.CREATED_DATE_TZ);
    var modifiedDate = new Date(template.MODIFIED_DATE_TZ);
    var date = createdDate > modifiedDate ? createdDate : modifiedDate;
    if (Number(template.TEMPLATE_TYPE_ID) === templateTypeMap.DIRECTORY) {
        Object.keys(template.NODES).forEach(function (key) {
            var node = template.NODES[key];
            var pathObject = {};
            var templateId = node.TEMPLATE_ID;
            pathObject[templateId] = node.NAME;
            var childrenDate = calculateDateRecursive(node, path.concat(pathObject));
            date = childrenDate > date ? childrenDate : date;
        });
    }
    template.DISPLAY_DATE = date.toISOString();
    template.PATH = path;
    return date;
}

// Get template by Type ID
function getTemplateByTypeId(typeId) {
    return dataTemplate.getTemplateByTypeId(typeId);
}

// Update template
function updateTemplate(objTemplate, userId) {
    validateTemplateParameters(objTemplate.TEMPLATE_ID, userId);
    if (validateUpdateTemplate(objTemplate, userId)) {
        if (!existTemplate(objTemplate.TEMPLATE_ID)) {
            throw ErrorLib.getErrors().CustomError("", "", "The object Template doesn't exist");
        }
        if (!existTemplateType(objTemplate.TEMPLATE_TYPE_ID)) {
            throw ErrorLib.getErrors().CustomError("", "", "The object TemplateType doesn't exist");
        }
        if (!existTemplateSection(objTemplate.SECTION_ID)) {
            throw ErrorLib.getErrors().CustomError("", "", "The object TemplateSection doesn't exist");
        }
        return dataTemplate.updateTemplate(objTemplate, userId);
    }
}

function updateTemplateOrder(objTemplate, userId) {
    var arrOrder = [];
    for (var i = 0; i < objTemplate.TEMPLATE_ORDER.length; i++) {
        arrOrder.push({TEMPLATE_ID: objTemplate.TEMPLATE_ORDER[i], TEMPLATE_ORDER: i});
    }
    return dataTemplate.updateTemplateOrder(arrOrder, userId);
}

// Delete template
function deleteTemplate(objTemplate, userId) {
    validateTemplateParameters(objTemplate.TEMPLATE_ID, userId);
    if (!existTemplate(objTemplate.TEMPLATE_ID)) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Template doesn't exist");
    }
    return dataTemplate.deleteTemplate(objTemplate, userId);
}

function deleteSelectedTemplate(reqObj, userId) {
    try {
        if (reqObj.TEMPLATE_LIST && reqObj.TEMPLATE_LIST.length > 0) {
            reqObj.TEMPLATE_LIST.forEach(function (template) {
                deleteManualTemplate(template, userId);
            });
        }
        dbHelper.commit();
    } catch (e) {
        dbHelper.rollback();
        throw ErrorLib.getErrors().CustomError("", "", e.toString());
    }
    finally {
        dbHelper.closeConnection();
    }
    return {};
}

function deleteManualTemplate(objTemplate, userId) {
    validateTemplateParameters(objTemplate.TEMPLATE_ID, userId);
    if (!existTemplate(objTemplate.TEMPLATE_ID)) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Template doesn't exist");
    }
    return dataTemplate.deleteManualTemplate(objTemplate, userId);
}

function validateTemplateParameters(templateId, userId) {
    if (!templateId) {
        throw ErrorLib.getErrors().CustomError("", "", "The TEMPLATE_ID is not found");
    }
    if (!userId) {
        throw ErrorLib.getErrors().CustomError("", "", "The userId is not found");
    }
}

// Check if the request exists
function existTemplate(templateId) {
    return getManualTemplateById(templateId).length > 0;
}

function existTemplateType(typeId) {
    return dataTemplateType.getManualTemplateTypeById(typeId).length > 0;
}

function existTemplateSection(sectionId) {
    return dataTemplateSection.getManualTemplateSectionById(sectionId).length > 0;
}

function validateInsertTemplate(objTemplate, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['TEMPLATE_PARENT_ID', 'NAME', 'TEMPLATE_ORDER', 'DESCRIPTION',
        'SECTION_ID'];

    if (!objTemplate) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Template is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objTemplate[key] === null || objTemplate[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objTemplate[key]);
                if (!isValid) {
                    errors[key] = objTemplate[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "", e.toString());
        } else {
            throw ErrorLib.getErrors().CustomError("", "", JSON.stringify(errors));
        }
    }
    return isValid;
}

function validateUpdateTemplate(objTemplate, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['TEMPLATE_ID', 'TEMPLATE_TYPE_ID',
        'TEMPLATE_PARENT_ID', 'NAME', 'TEMPLATE_ORDER',
        'DESCRIPTION', 'SECTION_ID'];

    if (!objTemplate) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Template is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objTemplate[key] === null || objTemplate[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objTemplate[key]);
                if (!isValid) {
                    errors[key] = objTemplate[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "", e.toString());
        } else {
            throw ErrorLib.getErrors().CustomError("", "", JSON.stringify(errors));
        }
    }
    return isValid;
}

// Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'TEMPLATE_PARENT_ID':
            valid = !isNaN(value) && value > -1;
            break;
        case 'NAME':
            valid = value.length > 0 && value.length <= 2048;
            break;
        case 'LINK':
            valid = value.length > 0 && value.length <= 2048;
            break;
        case 'TEMPLATE_ORDER':
            valid = !isNaN(value) && value >= 0;
            break;
        case 'CREATED_USER_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'DESCRIPTION':
            valid = value.length > 0 && value.length <= 1000;
            break;
        case 'TEMPLATE_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'TEMPLATE_TYPE_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'SECTION_ID':
            valid = !isNaN(value) && value > 0;
            break;
    }
    return valid;
}