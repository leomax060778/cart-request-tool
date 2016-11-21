$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

// STORE PROCEDURE LIST NAME
var GET_ALL_RESOURCE = "GET_ALL_RESOURCE";

function getAllResource() {
	var rdo = db.executeProcedure(GET_ALL_RESOURCE, {});
    return db.extractArray(rdo.out_result);
}
