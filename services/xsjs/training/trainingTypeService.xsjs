$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var trainingType = mapper.getTrainingType();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_TRAINING_TYPE = "GET_ALL_TRAINING_TYPE";
var GET_TRAINING_TYPE_BY_ID = "GET_TRAINING_TYPE_BY_ID";

var service_name = "trainingTypeService";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

function handleGet(parameters, userId) {
    var rdo = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_ALL_TRAINING_TYPE) {
            rdo = trainingType.getAllTrainingType();
        } else if (parameters[0].name === GET_TRAINING_TYPE_BY_ID) {
            rdo = trainingType.getTrainingTypeById(parameters[0].value, userId);
        } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "trainingServices/handleGet",
                "invalid parameter name (can be: GET_ALL_TRAINING_TYPE or GET_TRAINING_TYPE_BY_ID)"
                + parameters[0].name);
        }
    }
    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handlePut(reqBody, userId) {
    var req = trainingType.updateTrainingType(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

function handleDelete(reqBody, userId) {
    var req = trainingType.deleteTrainingType(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

function handlePost(reqBody, userId) {
    var req = trainingType.insertTrainingType(reqBody, userId);
    return httpUtil.handleResponse(req, httpUtil.OK, httpUtil.AppJson);
}

processRequest();