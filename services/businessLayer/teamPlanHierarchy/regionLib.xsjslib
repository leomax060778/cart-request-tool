$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataRegion = mapper.getDataRegion();
/** ***********END INCLUDE LIBRARIES*************** */

function getAllRegions(){
	return dataRegion.getAllRegions();
}

function getRegionById(regionId){
	return dataRegion.getRegionById(regionId);
}