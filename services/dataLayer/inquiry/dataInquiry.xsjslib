$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var INS_INQUIRY = "INS_INQUIRY";
var GET_ALL_INQUIRY = "GET_ALL_INQUIRY";
var GET_INQUIRY_BY_ID = "GET_INQUIRY_BY_ID";
var UPD_INQUIRY = "UPD_INQUIRY";
var DEL_INQUIRY = "DEL_INQUIRY";

//Insert new inquiry
function insertInquiry(objInquiry, userId) {
    var parameters = {};
    parameters.in_user_id = userId;//objInquiry.USER_ID;
    parameters.in_topic_id = objInquiry.TOPIC_ID;
    parameters.in_inquiry_text = objInquiry.INQUIRY_TEXT;
    parameters.in_crt_type_id = 1;//objInquiry.CRT_TYPE_ID;
    parameters.in_created_user_id = userId;//objVendorRequest.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(INS_INQUIRY, parameters, 'out_result');
}

//Get all inquiries
function getAllInquiry() {
    var parameters = {};
    var result = db.executeProcedure(GET_ALL_INQUIRY, parameters);
    return db.extractArray(result.out_result);
}

//Get inquiry by id
function getInquiryById(inquiryId){
    var parameters = {'in_inquiry_id': inquiryId};
    var result = db.executeProcedure(GET_INQUIRY_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

//Get inquiry by id manually
function getInquiryByIdManual(inquiryId){
  var parameters = {'in_inquiry_id': inquiryId};
  var result = db.executeProcedureManual(GET_INQUIRY_BY_ID, parameters);
  var list = db.extractArray(result.out_result);
  if(list.length){
	   return list[0];
  } else {
	   	return {};
  }
}

//Update inquiry
function updateInquiry(objInquiry, userId) {
    var parameters = {};
    parameters.in_inquiry_id = objInquiry.INQUIRY_ID;
    parameters.in_topic_id = objInquiry.TOPIC_ID;
    parameters.in_modified_user_id = userId; //objInquiry.MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(UPD_INQUIRY, parameters, 'out_result');
}

//Delete inquiry
function deleteInquiry(objInquiry, userId) {
	var parameters = {};
	parameters.in_inquiry_id = objInquiry.INQUIRY_ID;
	parameters.in_modified_user_id = userId;//objInquiry.MODIFIED_USER_ID;
	parameters.out_result = '?';
	return db.executeScalar(DEL_INQUIRY, parameters, 'out_result');
}