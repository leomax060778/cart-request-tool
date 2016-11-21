$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_SUBREGION_BY_REGION_ID = "GET_SUBREGION_BY_REGION_ID";

function getSubRegionsByRegionId(regionId){
	var parameters = {'IN_REGION_ID': regionId};	
	var result = db.executeProcedureManual(GET_SUBREGION_BY_REGION_ID, parameters);	
	var list = result['out_result'];
	var spResult = [];
	Object.keys(list).forEach(function(key) {
		spResult.push(list[key]);
	});
	return spResult;	
}