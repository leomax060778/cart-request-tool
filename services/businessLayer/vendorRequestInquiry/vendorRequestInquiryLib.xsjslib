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

//Get last id
function getLastId(vendorRequestInquiryId) {
	if (!vendorRequestInquiryId) {
		throw ErrorLib.getErrors().BadRequest("The Parameter vendorRequestInquiryId is not found", "vendorRequestInquiryService/handleGet/getLastId", vendorRequestInquiryId);
    }
	var vendorRequestInquiry;
	switch (vendorRequestInquiryId) {
	case "EXTEND":
		vendorRequestInquiry = dataVendorRequestInquiry.getExtendVendorRequestLastId();
		break;
	case "CHANGE":
		vendorRequestInquiry = dataVendorRequestInquiry.getChangeVendorRequestLastId();
		break;
	case "REQUEST":
		vendorRequestInquiry = dataVendorRequestInquiry.getVendorRequestLastId();
		break;
	case "INQUIRY":
		vendorRequestInquiry = dataVendorRequestInquiry.getVendorInquiryLastId();
		break;
	default:
		throw ErrorLib.getErrors().CustomError("vendorRequestInquiryService/handleGet/getLastId", "Invalid parameter " + vendorRequestInquiryId + " for vendorRequestInquiryId. It can be EXTEND, CHANGE, REQUEST or INQUIRY");
	}
    
	return vendorRequestInquiry;
}