$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();

var GET_ALL_TOPIC = "GET_ALL_TOPIC";
var GET_TOPIC_BY_ID = "GET_TOPIC_BY_ID";
var INS_TOPIC = "INS_TOPIC";
var UPD_TOPIC = "UPD_TOPIC";
var DEL_TOPIC = "DEL_TOPIC";

function getAllTopic(){
	var params = {};
	params.out_result = '?';
	
	var result = db.executeProcedure(GET_ALL_TOPIC, params);
    return db.extractArray(result.out_result);
}

function getTopicById(topicId){
	var params = {};
	params.in_topic_id = topicId;
	params.out_result = '?';
	
	var result = db.executeProcedure(GET_TOPIC_BY_ID, params);
	var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

function getManualTopicById(topicId){
	var params = {};
	params.in_topic_id = topicId;
	params.out_result = '?';
	
	var result = db.executeProcedureManual(GET_TOPIC_BY_ID, params);
	var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

function insertTopic(objReq, userId){
	var params = {};
	params.in_description = objReq.DESCRIPTION;
	params.in_created_user_id = userId;
	params.out_result = '?';
	
	return db.executeScalar(INS_TOPIC, params, 'out_result');
}

function updateTopic(objReq, userId){
	var params = {};
	params.in_description = objReq.DESCRIPTION;
	params.in_topic_id = objReq.TOPIC_ID;
	params.in_modified_user_id = userId;
	params.out_result = '?';
	
	return db.executeScalar(UPD_TOPIC, params, 'out_result');
}

function deleteTopic(topicId, userId){
	var params = {};
	params.in_topic_id = topicId;
	params.in_modified_user_id = userId;
	params.out_result = '?';
	
	return db.executeScalar(DEL_TOPIC, params, 'out_result');
}