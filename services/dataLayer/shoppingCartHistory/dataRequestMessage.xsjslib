$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURES LIST NAME
var INS_REQUEST_MESSAGE = "INS_REQUEST_MESSAGE";
var GET_REQUEST_MESSAGE = "GET_REQUEST_MESSAGE_BY_REQUEST_ID";

//Insert message in Request
function insertRequestMessage(objRequest, userId) {
    var parameters = {};
    parameters.in_user_id = userId;//objRequest.USER_ID;
    parameters.in_request_id = objRequest.REQUEST_ID;
    parameters.in_message_content = objRequest.MESSAGE_CONTENT;
    parameters.in_return_type_id = 0;
    parameters.in_issue_type_id = 0;
    parameters.in_other_issue_type = null;
    parameters.in_created_user_id = userId;//objRequest.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(INS_REQUEST_MESSAGE, parameters, 'out_result');
}

//Get message of Request
function getRequestMessage(requestId) {
    var parameters = {'in_request_id': requestId};
    var result = db.executeProcedure(GET_REQUEST_MESSAGE, parameters);
    return db.extractArray(result.out_result);
}