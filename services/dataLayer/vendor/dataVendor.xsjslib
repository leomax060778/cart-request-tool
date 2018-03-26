$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_VENDOR = 'GET_ALL_VENDOR';
var GET_VENDOR_BY_ID = 'GET_VENDOR_BY_ID';
var GET_VENDOR_BY_STATUS = 'GET_VENDOR_BY_STATUS';
var GET_VENDOR_BY_ADDITIONAL_INFORMATION_ID = "GET_VENDOR_BY_ADDITIONAL_INFORMATION_ID";
var GET_VENDOR_BY_ACCOUNT = "GET_VENDOR_BY_ACCOUNT";
var INS_VENDOR = 'INS_VENDOR';
var UPD_VENDOR = 'UPD_VENDOR';
var UPD_VENDOR_STATUS = 'UPD_VENDOR_STATUS';
var UPD_VENDOR_ACCOUNT = 'UPD_VENDOR_ACCOUNT';
var DEL_VENDOR = 'DEL_VENDOR';
var GET_ALL_VENDOR_FOR_FILTERS = "GET_ALL_VENDOR_FOR_FILTERS";
var GET_ALL_VENDOR_STATUS = "GET_ALL_VENDOR_STATUS";

var INS_VENDOR_ADDITIONAL_INFORMATION = "INS_VENDOR_ADDITIONAL_INFORMATION";
var DEL_VENDOR_ADDITIONAL_INFORMATION = "DEL_VENDOR_ADDITIONAL_INFORMATION";
var UPD_VENDOR_ADDITIONAL_INFORMATION = "UPD_VENDOR_ADDITIONAL_INFORMATION";

function getAllVendor() {
	var param = {};
	param.out_result = '?';
	var result = db.executeProcedure(GET_ALL_VENDOR, param);
	return db.extractArray(result.out_result);
}

function getAllVendorForFilters(userId) {
	var param = {};
	param.out_result = '?';
	param.in_user_id = userId;
	var result = db.executeProcedure(GET_ALL_VENDOR_FOR_FILTERS, param);
	return db.extractArray(result.out_result);
}

function getVendorById(vendorId) {

	var param = {};
	param.in_vendor_id = vendorId;
	param.out_result = '?';

	var result = db.executeProcedure(GET_VENDOR_BY_ID, param);
	return db.extractArray(result.out_result);
}

function getVendorByAdditionalInformationId(vendorAdditionalInformationId) {

	var param = {};
	param.in_vendor_additional_information_id = vendorAdditionalInformationId;
	param.out_result = '?';

	var result = db.executeProcedure(GET_VENDOR_BY_ADDITIONAL_INFORMATION_ID, param);
	var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

function getVendorByStatus(statusId) {

	var param = {};
	param.in_status_id = statusId;
	param.out_result = '?';

	var result = db.executeProcedure(GET_VENDOR_BY_STATUS, param);
	return db.extractArray(result.out_result);
}

function getVendorByAccount(account) {
	var param = {};
	param.in_account = account;
	param.out_result = '?';
	var result = db.executeProcedure(GET_VENDOR_BY_ACCOUNT, param);
	var list = db.extractArray(result.out_result);
	if(list.length){
	 	   return list[0];
	    } else {
	 	   	return {};
	    }
}

function insertVendor(objVendor, userId) {
	var param = getParams(objVendor);
	param.in_account = objVendor.ACCOUNT || null;
	param.in_status_id = objVendor.STATUS_ID || 1;
	param.in_data_protection_enabled = objVendor.DATA_PROTECTION_ENABLED || 0;
	param.in_created_user_id = userId;
	param.out_result = '?';

	return db.executeScalar(INS_VENDOR, param, 'out_result');
}

function updateVendor(objVendor, userId) {
	var param = getParams(objVendor);
	param.in_vendor_id = objVendor.VENDOR_ID;
	param.in_account = objVendor.ACCOUNT || null;
	param.in_data_protection_enabled = objVendor.DATA_PROTECTION_ENABLED || 0;
	param.in_modified_user_id = userId;
	param.out_result = '?';

	return db.executeScalar(UPD_VENDOR, param, 'out_result');
}

function deleteVendor(vendorId, userId) {
	var param = {};
	param.in_vendor_id = vendorId;
	param.in_modified_user_id = userId;
	param.out_result = '?';

	return db.executeScalar(DEL_VENDOR, param, 'out_result');
}

//MANUAL PROCEDURES
function getManualVendorById(vendorId) {
	
	var param = {};
	param.in_vendor_id = vendorId;
	param.out_result = '?';

	var result = db.executeProcedureManual(GET_VENDOR_BY_ID, param);
	var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

function insertManualVendor(objVendor, userId) {
	var param = getParams(objVendor);
	param.in_account = objVendor.ACCOUNT || null;
	param.in_status_id = objVendor.STATUS_ID || 1;
	param.in_data_protection_enabled = objVendor.DATA_PROTECTION_ENABLED || 0;
	param.in_created_user_id = userId;
	param.out_result = '?';

	return db.executeScalarManual(INS_VENDOR, param, 'out_result');
}

function updateManualVendor(objVendor, userId) {
	var param = getParams(objVendor);
	param.in_vendor_id = objVendor.VENDOR_ID;
	param.in_account = objVendor.ACCOUNT || null;
	param.in_data_protection_enabled = objVendor.DATA_PROTECTION_ENABLED || 0;
	param.in_modified_user_id = userId;
	param.out_result = '?';
	return db.executeScalarManual(UPD_VENDOR, param, 'out_result');
}

function updateManualVendorStatus(objVendor, userId) {
	var param = {};
	param.in_vendor_id = objVendor.VENDOR_ID;
	param.in_status_id = objVendor.STATUS_ID;
	param.in_previous_status_id = objVendor.PREVIOUS_STATUS_ID;
	param.in_user_id_status = userId;
	param.in_modified_user_id = userId;
	param.out_result = '?';

	return db.executeScalarManual(UPD_VENDOR_STATUS, param, 'out_result');
}

function updateVendorAccountManual(objVendor, userId){
	var parameters = {};
	parameters.in_vendor_id = objVendor.VENDOR_ID;
	parameters.in_account = objVendor.VENDOR_ACCOUNT;
	parameters.in_status_id = objVendor.STATUS_ID;
	parameters.in_previous_status_id = objVendor.PREVIOUS_STATUS_ID;
	parameters.in_user_id_status = userId;
	parameters.in_modified_user_id = userId;
	parameters.out_result = '?';
	return db.executeScalarManual(UPD_VENDOR_ACCOUNT, parameters, 'out_result');
}

function deleteManualVendor(vendorId, userId) {
	var param = {};
	param.in_vendor_id = vendorId;
	param.in_modified_user_id = userId;
	param.out_result = '?';

	return db.executeScalarManual(DEL_VENDOR, param, 'out_result');
}

function getManualAllVendor() {
	var param = {};
	param.out_result = '?';
	var result = db.executeProcedureManual(GET_ALL_VENDOR, param);
	return db.extractArray(result.out_result);
}

function insertManualVendorAdditionalInformation(objVendor, userId){
	var params = getVendorAdditionalInformationParams(objVendor);
	params.in_created_user_id = userId;
	params.out_result = '?';
	return db.executeScalarManual(INS_VENDOR_ADDITIONAL_INFORMATION,params,'out_result');
}

function deleteManualVendorAdditionalInformation(objVendor, userId){
	var params = {};
	params.in_vendor_id = objVendor.VENDOR_ID;
	params.in_modified_user_id = userId;
	params.out_result = '?';
	return db.executeScalarManual(DEL_VENDOR_ADDITIONAL_INFORMATION, params,'out_result');
}

function updateManualVendorAdditionalInformation(objVendor, userId){
	var params = {};
	params.in_vendor_id = objVendor.VENDOR_ID;
	params.in_vendor_additional_information_id = objVendor.VENDOR_ADDITIONAL_INFORMATION_ID;
	params.in_vendor_name = objVendor.VENDOR_NAME;
	params.in_modified_user_id = userId;
	params.out_result = '?';
	return db.executeScalarManual(UPD_VENDOR_ADDITIONAL_INFORMATION, params,'out_result');
}

function getVendorAdditionalInformationParams(objVendor) {
	var params = {};
	params.in_vendor_id = objVendor.VENDOR_ID;
	params.in_name = objVendor.NAME;	
	return params;
}

function getAllVendorStatus(){
	var param = {};
	param.out_result = '?';
	var result = db.executeProcedureManual(GET_ALL_VENDOR_STATUS, param);
	return db.extractArray(result.out_result);
}

//MAPPER
function getParams(objVendor) {
	var params = {};
	params.in_address_1 = objVendor.ADDRESS_1 || null;
	params.in_address_2 = objVendor.ADDRESS_2 || null;
	params.in_city = objVendor.CITY || null;
	params.in_state = objVendor.STATE || null;
	params.in_zip = objVendor.ZIP || null;
	params.in_phone = objVendor.PHONE || null;
	params.in_fax = objVendor.FAX || null;
	params.in_legal_name = objVendor.LEGAL_NAME || null;
	params.in_informal_name = objVendor.INFORMAL_NAME || null;
	params.in_status_id = objVendor.STATUS_ID || null;
	return params;
}