$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dataVendorRequestInquiry = mapper.getDataVendorRequestInquiry();
var utilLib = mapper.getUtil();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//Get all vendor request inquiry
function getAllVendorRequestInquiry(userId) {
	if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "vendorRequestInquiryService/handleGet/getAllVendorRequestInquiry", userId);
    }
    var vendorRequestInquiry = [];
    vendorRequestInquiry = dataVendorRequestInquiry.getAllVendorRequestInquiry(userId);
    vendorRequestInquiry = JSON.parse(JSON.stringify(vendorRequestInquiry));
    vendorRequestInquiry.forEach(function(elem){
    	if(elem.MESSAGE_READ > 0){
    		elem.SHOW_MESSAGE_READ = 1;
    	} else {
    		elem.SHOW_MESSAGE_READ = 0;
    	}
    });
	return vendorRequestInquiry;
}