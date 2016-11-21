$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataVendorRequestInquiry = mapper.getDataVendorRequestInquiry();
var utilLib = mapper.getUtil();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//Get all vendor request inquiry
function getAllVendorRequestInquiry() {
    return dataVendorRequestInquiry.getAllVendorRequestInquiry();
}