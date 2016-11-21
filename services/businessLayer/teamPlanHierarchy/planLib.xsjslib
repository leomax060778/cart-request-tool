$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var data = mapper.getDataPlan();
/** ***********END INCLUDE LIBRARIES*************** */

function getAllPlan(){	
	return data.getAllPlan();	
}
