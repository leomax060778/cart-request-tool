$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_ALL_VENDOR_REQUEST_INQUIRY = "GET_ALL_VENDOR_REQUEST_INQUIRY";

//Get all vendor request and vendor request inquiry
function getAllVendorRequestInquiry() {
    var parameters = {};
    var result = db.executeProcedure(GET_ALL_VENDOR_REQUEST_INQUIRY, parameters);
    return db.extractArray(result.out_result);
}