$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataSubRegion = mapper.getDataSubRegion();
/** ***********END INCLUDE LIBRARIES*************** */

function getSubRegionsByRegionId(regionId){
	return dataSubRegion.getSubRegionsByRegionId(regionId);
}
