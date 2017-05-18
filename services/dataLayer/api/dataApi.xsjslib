$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_REQUEST_BY_WBS_PATH = "GET_REQUEST_BY_WBS_PATH";
/** ***********END STORED PROCEDURES*************** */

var costObjectType = {"WBS_ID": 1, "COST_OBJECT": 2, "IO": 3};

function getRequestByWBSPath(wbsPath) {
	var parameters = {};
	parameters.in_wbs_path = wbsPath;
	parameters.in_cost_object_type_id = costObjectType.WBS_ID;
	parameters.out_result = '?';
	var result =  db.executeProcedure(GET_REQUEST_BY_WBS_PATH, parameters);
	return db.extractArray(result.out_result);
}