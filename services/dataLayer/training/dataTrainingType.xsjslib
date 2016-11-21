$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var INS_TRAINING_TYPE = "INS_TRAINING_TYPE";
var GET_ALL_TRAINING_TYPE = "GET_ALL_TRAINING_TYPE";
var GET_TRAINING_TYPE_BY_ID = "GET_TRAINING_TYPE_BY_ID";
var UPD_TRAINING_TYPE = "UPD_TRAINING_TYPE";
var DEL_TRAINING_TYPE = "DEL_TRAINING_TYPE";

//Insert training
function insertTrainingType(objTraining, userId) {
    var parameters = getTrainingTypeParams(objTraining);
    parameters.in_created_user_id = userId;//objTraining.IN_CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(INS_TRAINING_TYPE, parameters, 'out_result');
}

//Get training files
function getTrainingTypeById(trainingTypeId) {
    var parameters = {};
    parameters.in_training_type_id = trainingTypeId;
    var result = db.executeProcedure(GET_TRAINING_TYPE_BY_ID, parameters);
    return db.extractArray(result.out_result);
}

function getAllTrainingType() {
    var parameters = {};
    var result = db.executeProcedure(GET_ALL_TRAINING_TYPE, parameters);
    return db.extractArray(result.out_result);
}

//Update vendor request
function updateTrainingType(objTraining, userId) {
    var parameters = getTrainingTypeParams(objTraining);
    parameters.in_training_type_id = objTraining.TRAINING_TYPE_ID;
    parameters.in_modified_user_id = userId;//objTraining.IN_MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(UPD_TRAINING_TYPE, parameters, 'out_result');
}

//Delete vendor request
function deleteTrainingType(objTraining, userId) {
    var parameters = {};
    parameters.in_training_type_id = objTraining.TRAINING_TYPE_ID;
    parameters.in_modified_user_id = userId;//objTraining.IN_MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(DEL_TRAINING_TYPE, parameters, 'out_result');
}

function getTrainingTypeParams(objTraining){
	var parameters = {};
	parameters.IN_NAME = objTraining.NAME;
	return parameters;
}

//MANUAL PROCEDURES
function getTrainingTypeManual(trainingTypeId) {
    var parameters = {};
    parameters.in_training_type_id = trainingTypeId;
    var result = db.executeProcedureManual(GET_TRAINING_TYPE_BY_ID, parameters);
    return db.extractArray(result.out_result);
}