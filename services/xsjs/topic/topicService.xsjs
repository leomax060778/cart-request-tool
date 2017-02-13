$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var topicLib = mapper.getTopic();
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();


var GET_ALL_TOPIC = "GET_ALL_TOPIC";
var GET_TOPIC_BY_ID = "GET_TOPIC_BY_ID";

var service_name = "topicService";

function processRequest() {
	httpUtil.processRequest3(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

function handleGet(params) {
	var rdo = {};
	if (params.length > 0) {
		if (params[0].name === GET_ALL_TOPIC) {
			rdo = topicLib.getAllTopic();
		} else if (params[0].name === GET_TOPIC_BY_ID) {
			if (params[0].value <= 0 || isNaN(params[0].value)){
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "topicServices/handleGet",
                    "invalid value \'" + params[0].value + "\' for parameter " + params[0].name + " (must be a valid id)"
                );
            } else {
            	rdo = topicLib.getTopicById(params[0].value);
            }
		} else {
			throw ErrorLib.getErrors().BadRequest(
					"",
					"topicServices/handleGet",
					"invalid parameter name (can be: GET_ALL_TOPIC or GET_TOPIC_BY_ID)");
		}
	} else {
		throw ErrorLib.getErrors().BadRequest(
				"",
				"topicServices/handleGet",
				"invalid parameter name (can be: GET_ALL_TOPIC or GET_TOPIC_ID)");
	}
	return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handlePost(objReq, userId) {
	var rdo = topicLib.insertTopic(objReq, userId);
	return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handlePut(objReq, userId) {
	var rdo = topicLib.updateTopic(objReq, userId);
	return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handleDelete(objReq, userId) {
	var rdo = topicLib.deleteTopic(objReq, userId);
	return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

processRequest();