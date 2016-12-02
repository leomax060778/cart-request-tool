$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var training = mapper.getTraining();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_TRAINING = "GET_ALL_TRAINING";
var GET_ALL_TRAINING_BY_PARENT = "GET_ALL_TRAINING_BY_PARENT";
var GET_TRAINING_BY_ID = "GET_TRAINING_BY_ID";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete);
}

function handleGet(parameters) {
    var rdo = {};
    if (parameters.length > 0) {
    	if (parameters[0].name === GET_ALL_TRAINING_BY_PARENT) {
            rdo = training.getAllTrainingByParent(parameters[0].value);
        } else if (parameters[0].name === GET_ALL_TRAINING) {
            rdo = training.getAllTraining();
        } else if (parameters[0].name === GET_TRAINING_BY_ID) {
            rdo = training.getTrainingById(parameters[0].value);
        } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "trainingServices/handleGet",
                "invalid parameter name (can be: GET_ALL_TRAINING or GET_BY_TRAINING_BY_ID)"
                + parameters[0].name);
        }
    }
    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handlePut(reqBody, userId) {
    var req = training.updateTraining(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

function handleDelete(reqBody, userId) {
	var req = {};
	if(reqBody.DELETE && reqBody.DELETE == 'SELECTED_TRAINING'){
		req = training.deleteSelectedTraining(reqBody, userId);
	} else {
		req = training.deleteTraining(reqBody, userId);
	}    
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

function handlePost(reqBody, userId) {
    var req = training.insertTraining(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

processRequest();