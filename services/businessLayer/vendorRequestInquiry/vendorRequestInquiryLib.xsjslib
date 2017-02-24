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
	var newId;
	switch (vendorRequestInquiryId) {
	case "EXTEND":
		newId = dataVendorRequestInquiry.getExtendVendorRequestLastId();
		if (newId) {
			vendorRequestInquiry = newId;
		} else {
			vendorRequestInquiry = {"EV_ID": "EV1"};
		}
		break;
	case "CHANGE":
		newId = dataVendorRequestInquiry.getChangeVendorRequestLastId();
		if (newId) {
			vendorRequestInquiry = newId;
		} else {
			vendorRequestInquiry = {"CV_ID": "CV1"};
		}
		break;
	case "REQUEST":
		newId = dataVendorRequestInquiry.getVendorRequestLastId();
		if (newId) {
			vendorRequestInquiry = newId;
		} else {
			vendorRequestInquiry = {"NV_ID": "NV1"};
		}
		break;
	case "INQUIRY":
		newId = dataVendorRequestInquiry.getVendorInquiryLastId();
		if (newId) {
			vendorRequestInquiry = newId;
		} else {
			vendorRequestInquiry = {"VI_ID": "VI1"};
		}
		break;
	default:
		throw ErrorLib.getErrors().CustomError("vendorRequestInquiryService/handleGet/getLastId", "Invalid parameter " + vendorRequestInquiryId + " for vendorRequestInquiryId. It can be EXTEND, CHANGE, REQUEST or INQUIRY");
	}
    
	return vendorRequestInquiry;
}