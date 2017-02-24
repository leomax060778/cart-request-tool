$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dbHelper = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
//var api = mapper.getDataApi();
var dataEntity = mapper.getDataEntity();

/** ***********END INCLUDE LIBRARIES*************** */

function getL6ById(l6_id){
	if(!l6_id){
		throw ErrorLib.getErrors().BadRequest("The Parameter l6_id is not found","apiService/handleGet/getL6ById",l6_id);	
	}
	return api.getL6ById(l6_id);
}

function getL6ByWBSPath(wbs_path){
	if(!wbs_path){
		throw ErrorLib.getErrors().BadRequest("The Parameter wbs_path is not found","apiService/handleGet/getL6ByWBSPath",wbs_path);	
	}
	return api.getL6ByWBSPath(wbs_path);
}

function getAllEntities(){
	return dataEntity.getAllEntity();
}