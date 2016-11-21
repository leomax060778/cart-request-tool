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
var DEL_TRAINING = "DEL_TRAINING";

//Insert training
function insertTraining(objTraining, userId) {
    var parameters = {};
    parameters.in_user_id = userId;//objTraining.IN_USER_ID;
    parameters.in_created_user_id = userId;//objTraining.IN_CREATED_USER_ID;
    parameters.in_training_type_id = objTraining.IN_TRAINING_TYPE_ID;
    parameters.in_parent_type_id = objTraining.IN_PARENT_TYPE_ID;
    parameters.in_link = objTraining.IN_LINK;
    parameters.in_name = objTraining.IN_NAME;
    parameters.in_training_order = objTraining.IN_TRAINING_ORDER;
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
    parameters.in_training_id = objTraining.IN_TRAINING_ID;
    parameters.in_modified_user_id = userId;//objTraining.IN_MODIFIED_USER_ID;
    parameters.in_training_type_id = objTraining.IN_TRAINING_TYPE_ID;
    parameters.in_parent_id = objTraining.IN_PARENT_ID;
    parameters.in_link = objTraining.IN_LINK;
    parameters.in_name = objTraining.IN_NAME;
    parameters.in_training_order = objTraining.IN_TRAINING_ORDER;
    parameters.out_result = '?';
    return db.executeScalar(UPD_TRAINING, parameters, 'out_result');
}

//Delete vendor request
function deleteTraining(objTraining, userId) {
    var parameters = {};
    parameters.in_training_id = objTraining.IN_TRAINING_ID;
    parameters.in_modified_user_id = userId;//objTraining.IN_MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(DEL_TRAINING, parameters, 'out_result');
}