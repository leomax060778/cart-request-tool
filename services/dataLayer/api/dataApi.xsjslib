$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

function getL6ById(l6_id){
	var parameters = {};
	//Mockdata
	parameters = {
		"GOODS_RECIPIENT": "Marylin Scott2, admin",
		"WBS_PATH": "CRM-XM16-GIC-GVGMVID01",
		"ENTITY_ID": 1		
	};
	
	return parameters;
	
}

function getL6ByWBSPath(wbs_path){
	var parameters = {};
	//Mockdata
	parameters = {
		"VALID": 1,
		"ENTITY_ID": 3 
	};
	
	return parameters;
	
}