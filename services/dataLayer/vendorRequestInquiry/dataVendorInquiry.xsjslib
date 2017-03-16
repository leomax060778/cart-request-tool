$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var INS_VENDOR_INQUIRY = "INS_VENDOR_INQUIRY";
var GET_ALL_VENDOR_INQUIRY = "GET_ALL_VENDOR_INQUIRY";
var GET_VENDOR_INQUIRY_BY_ID = "GET_VENDOR_INQUIRY_BY_ID";
var DEL_VENDOR_INQUIRY = "DEL_VENDOR_INQUIRY";
var UPD_VENDOR_INQUIRY = "UPD_VENDOR_INQUIRY";

//Insert new Vendor inquiry data
function insertVendorInquiry(objVendorInquiry, userId) {
    var parameters = {};
    parameters.in_user_id = userId;
    parameters.in_vendor_type_id = objVendorInquiry.VENDOR_TYPE_ID;
    parameters.in_created_user_id = userId;
    parameters.in_vendor_name = objVendorInquiry.VENDOR_NAME;
    parameters.out_result = '?';
    return db.executeScalar(INS_VENDOR_INQUIRY, parameters, 'out_result');
}

//Insert new Vendor inquiry data manually
function insertVendorInquiryManual(objVendorInquiry, userId) {
    var parameters = {};
    parameters.in_user_id = userId;
    parameters.in_vendor_type_id = objVendorInquiry.VENDOR_TYPE_ID;
    parameters.in_created_user_id = userId;
    parameters.in_vendor_name = objVendorInquiry.VENDOR_NAME;
    parameters.out_result = '?';
    return db.executeScalarManual(INS_VENDOR_INQUIRY, parameters, 'out_result');
}

//Get All Vendor Inquiries
function getAllVendorInquiry() {
    var parameters = {};
    var result = db.executeProcedure(GET_ALL_VENDOR_INQUIRY, parameters);
    return db.extractArray(result.out_result);
}

//Get by id
function getVendorInquiryById(vendorInquiryId) {
    var parameters = {'in_vendor_inquiry_id': vendorInquiryId};
    var result = db.executeProcedure(GET_VENDOR_INQUIRY_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
    	   return list[0];
    } else {
    	   return {};
    }
}

//Get Vendor Inquiry by id manually
function getVendorInquiryByIdManual(vendorInquiryId) {
    var parameters = {'in_vendor_inquiry_id': vendorInquiryId};
    var result = db.executeProcedureManual(GET_VENDOR_INQUIRY_BY_ID, parameters);
    var list = db.extractArray(result.out_result);

    if(list.length){
    	   return list[0];
    } else {
    	   return {};
    }
}

//Delete Vendor inquiry
function deleteVendorInquiry(objVendorInquiry, userId) {
    var parameters = {};
    parameters.in_vendor_inquiry_id = objVendorInquiry.VENDOR_INQUIRY_ID;
    parameters.in_modified_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalar(DEL_VENDOR_INQUIRY, parameters, 'out_result');
}

//Update
function updateVendorInquiry(objVendorInquiry, userId) {
    var parameters = {};
    parameters.in_vendor_inquiry_id = objVendorInquiry.VENDOR_INQUIRY_ID;
    parameters.in_vendor_name = objVendorInquiry.VENDOR_NAME;
    parameters.in_modified_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalar(UPD_VENDOR_INQUIRY, parameters, 'out_result');
}