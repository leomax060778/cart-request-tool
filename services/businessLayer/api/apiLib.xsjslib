$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dbHelper = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
var api = mapper.getDataApi();
var dataEntity = mapper.getDataEntity();

/** ***********END INCLUDE LIBRARIES*************** */

function getRequestByWBSPath(objWBSPath){
	if (!objWBSPath.WBS_PATH) {
		throw ErrorLib.getErrors().BadRequest("The Parameter objWBSPath.WBS_PATH is not found", "apiService/handleGet/getRequestByWBSPath", objWBSPath.WBS_PATH);
	}
	var totalBudget = 0;
	var requestArray = api.getRequestByWBSPath(objWBSPath.WBS_PATH);
	requestArray = JSON.parse(JSON.stringify(requestArray));
	if (requestArray.length > 0){
		if (objWBSPath.REQUEST_ID){
			requestArray.forEach(function(elem){
				if (elem.REQUEST_ID !== objWBSPath.REQUEST_ID) {
					totalBudget = Number(totalBudget) + Number(elem.BUDGET);
				}
			});
		} else {
			requestArray.forEach(function(elem){
				totalBudget = Number(totalBudget) + Number(elem.BUDGET);
			});
		}
	}
	return {"REQUEST": requestArray, "TOTAL_BUDGET": totalBudget};
}

function getAllEntities(){
	return dataEntity.getAllEntity();
}