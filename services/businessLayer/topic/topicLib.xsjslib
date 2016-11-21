$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var utilLib = mapper.getUtil();
var dataTopic = mapper.getDataTopic();

function getAllTopic() {
	return dataTopic.getAllTopic();
}

function getTopicById(topicId, userId) {
	validateTopicParams(topicId, userId);
	return dataTopic.getTopicById(topicId);
}

function getManualTopicById(topicId, userId) {
	validateTopicParams(topicId, userId);
	return dataTopic.getManualTopicById(topicId);
}

function insertTopic(objReq, userId) {
	var keys = [ 'DESCRIPTION' ];
	var topicUrl = "topicService/handlePost/insertTopic";
	utilLib.validateObjectAttributes(objReq, userId, keys , topicUrl, validateType);
	return dataTopic.insertTopic(objReq, userId);
}

function updateTopic(objReq, userId) {
	var keys = [ 'DESCRIPTION', "TOPIC_ID" ];
	var topicUrl = "topicService/handlePut/updateTopic";
	utilLib.validateObjectAttributes(objReq, userId, keys , topicUrl, validateType);
	if(!existTopic(objReq.TOPIC_ID, userId)){
		throw ErrorLib.getErrors().CustomError("",
				"topicService/handleUpdate/updateTopic",
				"The object Topic doesn't exist");
	}
	return dataTopic.updateTopic(objReq, userId);
}

function deleteTopic(objReq, userId) {
	validateTopicParams(objReq.TOPIC_ID, userId);
	if(!existTopic(objReq.TOPIC_ID, userId)){
		throw ErrorLib.getErrors().CustomError("",
				"topicService/handleDelete/deleteTopic",
				"The object Topic whith the id " + objReq.TOPIC_ID + " does not exist");
	}
	return dataTopic.deleteTopic(objReq.TOPIC_ID, userId);
}

function existTopic(topicId, userId) {
	return (getManualTopicById(topicId, userId).length > 0);
}

function validateTopicParams(topicId, userId) {
	if (!topicId) {
		throw ErrorLib.getErrors().CustomError("", "topicService",
				"The topicId is not found");
	}
	if (!userId) {
		throw ErrorLib.getErrors().CustomError("", "topicService",
				"The userId is not found");
	}
}

function validateType(key, value) {
	var valid = true;
	switch (key) {
		case 'DESCRIPTION':
			valid = value.length > 0 && value.length <= 255;
			break;
		case 'TOPIC_ID':
			valid = !isNaN(value) && value > 0;
			break;
	}
	return valid;
}