$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_INQUIRY_BY_STATUS = "GET_INQUIRY_BY_STATUS";
var GET_INQUIRY_BY_STATUS_ADMINISTRABLE = "GET_INQUIRY_BY_STATUS_ADMINISTRABLE";
var GET_INQUIRY_PROCESSING_REPORT_BY_ID = "GET_INQUIRY_PROCESSING_REPORT_BY_ID";
var UPD_INQUIRY_STATUS = "UPD_INQUIRY_STATUS";

//Get inquiry by status
function getInquiryByStatus(statusId) {
  var parameters = {'in_status_id': statusId};
  var result = db.executeProcedure(GET_INQUIRY_BY_STATUS, parameters);
  return db.extractArray(result.out_result);
}

//Get inquiry by status administrable
function getInquiryByStatusAdministrable(isAdministrable, userId) {
  var parameters = {};
  parameters.in_administrable = isAdministrable;
  parameters.in_user_id = userId;
  var result = db.executeProcedure(GET_INQUIRY_BY_STATUS_ADMINISTRABLE, parameters);
  return db.extractArray(result.out_result);
}

//Get inquiry by id
function getInquiryById(inquiryId) {
	var parameters = {'in_inquiry_id': inquiryId};
  var result = db.executeProcedure(GET_INQUIRY_PROCESSING_REPORT_BY_ID, parameters);
  var list = db.extractArray(result.out_result);
  if(list.length){
	   return list[0];
  } else {
	   	return {};
  }
}

//Update inquiry status
function updateInquiryStatus(objInquiry, userId) {
  var parameters = {};
  parameters.in_inquiry_id = objInquiry.INQUIRY_ID;
  parameters.in_status_id = objInquiry.STATUS_ID;
  parameters.in_previous_status_id = objInquiry.PREVIOUS_STATUS_ID;
  parameters.in_user_id_status = userId;//objInquiry.PREVIOUS_STATUS_ID;
  parameters.in_modified_user_id = userId; //objInquiry.IN_MODIFIED_USER_ID;
  parameters.out_result = '?';
  return db.executeScalar(UPD_INQUIRY_STATUS, parameters, 'out_result');
}

//Update inquiry status manual
function updateInquiryStatusManual(objInquiry, userId) {
  var parameters = {};
  parameters.in_inquiry_id = objInquiry.INQUIRY_ID;
  parameters.in_status_id = objInquiry.STATUS_ID;
  parameters.in_previous_status_id = objInquiry.PREVIOUS_STATUS_ID;
  parameters.in_user_id_status = userId;//objInquiry.PREVIOUS_STATUS_ID;
  parameters.in_modified_user_id = userId; //objInquiry.IN_MODIFIED_USER_ID;
  parameters.out_result = '?';
  return db.executeScalarManual(UPD_INQUIRY_STATUS, parameters, 'out_result');
}