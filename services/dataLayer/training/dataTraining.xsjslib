$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var INS_TRAINING = "INS_TRAINING";
var GET_ALL_TRAINING = "GET_ALL_TRAINING";
var GET_TRAINING_BY_ID = "GET_TRAINING_BY_ID";
var UPD_TRAINING = "UPD_TRAINING";
var UPD_TRAINING_DATA_PROTECTION_FOLDER = "UPD_TRAINING_DATA_PROTECTION_FOLDER";
var UPD_TRAINING_ORDER = "UPD_TRAINING_ORDER";
var DEL_TRAINING = "DEL_TRAINING";
var GET_ALL_TRAINING_BY_PARENT = "GET_ALL_TRAINING_BY_PARENT";

//Insert training
function insertTraining(objTraining, userId) {
    var parameters = {};
    parameters.in_user_id = userId;
    parameters.in_created_user_id = userId;
    parameters.in_training_type_id = objTraining.TRAINING_TYPE_ID;
    parameters.in_parent_id = objTraining.PARENT_ID;
    parameters.in_link = objTraining.LINK;
    parameters.in_name = objTraining.NAME;
    parameters.in_description = objTraining.DESCRIPTION;
    parameters.in_training_order = objTraining.TRAINING_ORDER;
    parameters.in_attachment_id = objTraining.ATTACHMENT_ID;
    parameters.out_result = '?';
    return db.executeScalar(INS_TRAINING, parameters, 'out_result');
}

//Get training files
function getTraining(trainingId) {
    var parameters = {};
    var result;
    if (!trainingId) {
        result = db.executeProcedure(GET_ALL_TRAINING, parameters);
    } else {
        parameters = {'in_training_id': trainingId};
        result = db.executeProcedure(GET_TRAINING_BY_ID, parameters);
    }
    return db.extractArray(result.out_result);
}

//Update vendor request
function updateTraining(objTraining, userId) {
    var parameters = {};
    parameters.in_training_id = objTraining.TRAINING_ID;
    parameters.in_modified_user_id = userId;
    parameters.in_training_type_id = objTraining.TRAINING_TYPE_ID;
    parameters.in_parent_id = objTraining.PARENT_ID;
    parameters.in_link = objTraining.LINK;
    parameters.in_name = objTraining.NAME;
    parameters.in_description = objTraining.DESCRIPTION;
    parameters.in_training_order = objTraining.TRAINING_ORDER;
    parameters.in_attachment_id = objTraining.ATTACHMENT_ID || null;
    parameters.out_result = '?';
    return db.executeScalar(UPD_TRAINING, parameters, 'out_result');
}

function updateDataProtectionFolder(objTraining, userId) {
	 var parameters = {};
	 parameters.in_training_id = objTraining.TRAINING_ID;
	 parameters.in_modified_user_id = userId;
	 parameters.out_result = '?';
	 return db.executeScalar(UPD_TRAINING_DATA_PROTECTION_FOLDER, parameters, 'out_result');
}

function updateTrainingOrder(arrOrder, userId) {
	 var parameters = {};
	 parameters.in_order_list = arrOrder;
	 parameters.in_modified_user_id = userId;
	 parameters.out_result = '?';
	 return db.executeScalar(UPD_TRAINING_ORDER, parameters, 'out_result');
}

//Delete vendor request
function deleteTraining(objTraining, userId) {
    var parameters = {};
    parameters.in_training_id = objTraining.TRAINING_ID;
    parameters.in_modified_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalar(DEL_TRAINING, parameters, 'out_result');
}

function deleteManualTraining(objTraining, userId) {
    var parameters = {};
    parameters.in_training_id = objTraining.TRAINING_ID;
    parameters.in_modified_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalarManual(DEL_TRAINING, parameters, 'out_result');
}

function getAllTrainingByParent(parentId){
	var parameters = {};
	parameters.in_parent_id = parentId;
    var result = db.executeProcedure(GET_ALL_TRAINING_BY_PARENT, parameters);
    return db.extractArray(result.out_result);
}