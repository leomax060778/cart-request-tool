$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataTraining = mapper.getDataTraining();
var dataTrainingType = mapper.getDataTrainingType();
var dataPopup = mapper.getDataPopUp();
var dbHelper = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

var trainingTypeMap = {
    "DIRECTORY": 1,
    "FILE": 2,
    "LINK": 3
};

function getAllTrainingByParent(parentId, userId){
	if (!parentId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter parentId is not found", "", parentId);
    }
	return dataTraining.getAllTrainingByParent(parentId);
}

//Insert training
function insertTraining(objTraining, userId) {
    if (validateInsertTraining(objTraining, userId)) {
        if (!existTrainingType(objTraining.TRAINING_TYPE_ID)) {
            throw ErrorLib.getErrors().CustomError("", "", "The object Training Type doesn't exist");
        } else {
            return dataTraining.insertTraining(objTraining, userId);
        }
    }
}

function existTrainingType(trainingTypeId){
	return (dataTrainingType.getManualTrainingTypeById(trainingTypeId).length > 0);
}

//Get training by ID
function getTrainingById(trainingId) {
    if (!trainingId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter trainingId is not found", "", trainingId);
    }
    var result = dataTraining.getTraining(trainingId)[0];
    result = JSON.parse(JSON.stringify(result));
    result.DISPLAY_DATE = (new Date(result.CREATED_DATE_TZ) > new Date(result.MODIFIED_DATE_TZ)) ? result.CREATED_DATE_TZ : result.MODIFIED_DATE_TZ;
    return result;
}

//Get all training
function getAllTraining() {
    var result = dataTraining.getTraining();
    result = JSON.parse(JSON.stringify(result));
    var tree = {};
    var plainResult = {};
    var masterRootId = 0;
    for (var i = 0; i < result.length; i++) {
        var row = result[i];
        tree[row.PARENT_ID] = tree[row.PARENT_ID] || {NODES: {}};
        tree[row.TRAINING_ID] = tree[row.TRAINING_ID] || {};
        var currentNode = tree[row.TRAINING_ID];
        currentNode.TRAINING_ID = row.TRAINING_ID;
        currentNode.PARENT_ID = row.PARENT_ID;
        currentNode.TRAINING_TYPE_ID = row.TRAINING_TYPE_ID;
        currentNode.TRAINING_TYPE_NAME = row.TRAINING_TYPE_NAME;
        currentNode.LINK = row.LINK;
        currentNode.NAME = row.NAME;
        currentNode.DESCRIPTION = row.DESCRIPTION;
        currentNode.TRAINING_ORDER = row.TRAINING_ORDER;
        currentNode.ATTACHMENT_ID = row.ATTACHMENT_ID;
        currentNode.ORIGINAL_NAME = row.ORIGINAL_NAME;
        currentNode.SAVED_NAME = row.SAVED_NAME;
        currentNode.DATA_PROTECTION_FOLDER = row.DATA_PROTECTION_FOLDER === 1;
        currentNode.CREATED_DATE_TZ = row.CREATED_DATE_TZ;
        currentNode.MODIFIED_DATE_TZ = row.MODIFIED_DATE_TZ;
        currentNode.NODES = currentNode.NODES || {};
        var parentNode = tree[row.PARENT_ID];
        parentNode.NODES[currentNode.TRAINING_ID] = currentNode;

    }
    result.forEach(function (elem) {
    	plainResult[elem.TRAINING_ID] = elem;
    });
    calculateDateRecursive({TRAINING_TYPE_ID: trainingTypeMap.DIRECTORY, NODES: tree[masterRootId].NODES, CREATED_DATE_TZ: 0, MODIFIED_DATE_TZ: 0}, [{0: "Desktop"}]);
    return {TREE: tree[masterRootId].NODES, RESULT: plainResult};
}

function calculateDateRecursive(training, path) {
    var createdDate = new Date(training.CREATED_DATE_TZ);
    var modifiedDate = new Date(training.MODIFIED_DATE_TZ);
    var date = createdDate > modifiedDate ? createdDate : modifiedDate;
    if (Number(training.TRAINING_TYPE_ID) === trainingTypeMap.DIRECTORY) {
        Object.keys(training.NODES).forEach(function (key) {
            var node = training.NODES[key];
            var pathObject = {};
            var trainingId = node.TRAINING_ID;
            pathObject[trainingId] = node.NAME;
            var childrenDate = calculateDateRecursive(node, path.concat(pathObject));
            date = childrenDate > date ? childrenDate : date;
        });
    }
    training.DISPLAY_DATE = date.toISOString();
    training.PATH = path;
    return date;
}

//Update training
function updateTraining(objTraining, userId) {
    if (validateUpdateTraining(objTraining, userId)) {
        return dataTraining.updateTraining(objTraining, userId);
    }
}

//Update training folder id in pop-up content
function updateTrainingFolderId(objTraining, userId) {
	var folderId = objTraining.TRAINING_ID;
	var popUp = dataPopup.getPopUpByCode("DATA_PROTECTION_POP_UP")[0];
	var popUpContent = popUp.CONTENT;
	var objPopUp = JSON.parse(JSON.stringify(popUp));
	objPopUp.CONTENT = popUpContent.replace(/folderId=\d+/, "folderId=" + Number(folderId));
	dataPopup.updatePopUp(objPopUp, userId);
	return dataTraining.updateDataProtectionFolder(objTraining, userId);
}

//Update training order
function updateTrainingOrder(objTraining, userId) {
    var arrOrder = [];
    for (var i = 0; i < objTraining.TRAINING_ORDER.length; i++) {
        arrOrder.push({TRAINING_ID: objTraining.TRAINING_ORDER[i], TRAINING_ORDER: i});
    }
    return dataTraining.updateTrainingOrder(arrOrder, userId);
}

//Delete training
function deleteTraining(objTraining, userId) {
    if (!objTraining.TRAINING_ID) {
        throw ErrorLib.getErrors().CustomError("", "", "The TRAINING_ID is not found");
    }
    return dataTraining.deleteTraining(objTraining, userId);
}

function deleteManualTraining(objTraining, userId) {
    if (!objTraining.TRAINING_ID) {
        throw ErrorLib.getErrors().CustomError("", "", "The TRAINING_ID is not found");
    }
    return dataTraining.deleteManualTraining(objTraining, userId);
}

function deleteSelectedTraining(objTraining, userId){
	try{
		if(objTraining.TRAINING_LIST && objTraining.TRAINING_LIST.length > 0){
			(objTraining.TRAINING_LIST).forEach(function(training){
				deleteManualTraining(training, userId);
			});
		}
		dbHelper.commit();
	} catch(e){
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", "", e.toString());
	}
	finally{
		dbHelper.closeConnection();
	}
	return {};
}

//Check if the request exists
function existTraining(trainingId) {
    return getTrainingById(trainingId).length > 0;
}

function validateInsertTraining(objTraining, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'TRAINING_TYPE_ID',
        'PARENT_ID',
        'NAME',
        'DESCRIPTION',
        'TRAINING_ORDER'
    ];

    if (!objTraining) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Training is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objTraining[key] === null || objTraining[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objTraining[key]);
                if (!isValid) {
                    errors[key] = objTraining[key];
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

function validateUpdateTraining(objTraining, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'TRAINING_ID',
        'TRAINING_TYPE_ID'
        ];
    var optionalKeys = ['PARENT_ID',
                        'LINK',
                        'NAME',
                        'DESCRIPTION',
                        'TRAINING_ORDER'
                        ];
    
    if (!objTraining) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Training is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objTraining[key] === null || objTraining[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objTraining[key]);
                if (!isValid) {
                    errors[key] = objTraining[key];
                    throw BreakException;
                }
            }
        });
        optionalKeys.forEach(function (key) {
        	// validate attribute type
            isValid = validateType(key, objTraining[key]);
            if (!isValid) {
            	errors[key] = objTraining[key];
                throw BreakException;
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
        case 'TRAINING_TYPE_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'PARENT_TYPE_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'LINK':
        	valid = (!value) || (value.length >= 0 && value.length <= 1000);
            break;
        case 'NAME':
            valid = (!value) || (value.length >= 0 && value.length <= 1000);
            break;
        case 'DESCRIPTION':
            valid = (!value) || (value.length >= 0 && value.length <= 1000);
            break;
        case 'TRAINING_ORDER':
            valid = !isNaN(value) && value >= 0;
            break;
        case 'TRAINING_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'PARENT_ID':
            valid = (!value) || (!isNaN(value) && value >= 0);
            break;
    }
    return valid;
}