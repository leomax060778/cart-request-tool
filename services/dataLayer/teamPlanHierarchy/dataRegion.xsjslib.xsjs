$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_ALL_REGION = "GET_ALL_REGION";
var GET_REGION_BY_ID = "GET_REGION_BY_ID";

function getAllRegions(){
	var parameters = {};	
	var result = db.executeProcedureManual(GET_ALL_REGION, {});	
	var list = result['out_result'];
	var spResult = [];
	Object.keys(list).forEach(function(key) {
		spResult.push(list[key]);
	});
	return spResult;	
}

function getRegionById(regionId){
	var parameters = {'IN_REGION_ID': regionId};
	var result = db.executeProcedureManual(GET_REGION_BY_ID, parameters);	
	var list = result['out_result'];
	var spResult = [];
	Object.keys(list).forEach(function(key) {
		spResult.push(list[key]);
	});
	return spResult;	
}