$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_VENDOR_CONTACT_INFORMATION_BY_VENDOR_ID = "GET_VENDOR_CONTACT_INFORMATION_BY_VENDOR_ID";
var GET_ALL_VENDOR_CONTACT_INFORMATION = "GET_ALL_VENDOR_CONTACT_INFORMATION";
var GET_VENDOR_CONTACT_INFORMATION_BY_ID = "GET_VENDOR_CONTACT_INFORMATION_BY_ID";

var INS_VENDOR_CONTACT_INFORMATION = 'INS_VENDOR_CONTACT_INFORMATION';
var UPD_VENDOR_CONTACT_INFORMATION = 'UPD_VENDOR_CONTACT_INFORMATION';
var UPD_DEFAULT_VENDOR_CONTACT_INFORMATION = 'UPD_DEFAULT_VENDOR_CONTACT_INFORMATION';
var DEL_VENDOR_CONTACT_INFORMATION = 'DEL_VENDOR_CONTACT_INFORMATION';

function getAllVendorContactInformation() {
	var param = {};
	param.out_result = '?';
	var result = db.executeProcedure(GET_ALL_VENDOR_CONTACT_INFORMATION, param);
	return db.extractArray(result.out_result);
}


function getVendorContactInformationById(vendor_contact_information_id) {

	var param = {};
	param.in_vendor_contact_information_id = vendor_contact_information_id;
	param.out_result = '?';

	var result = db.executeProcedure(GET_VENDOR_CONTACT_INFORMATION_BY_ID, param);
	return db.extractArray(result.out_result);
}

function getVendorContactInformationByVendorId(vendor_id) {

	var param = {};
	param.in_vendor_id = vendor_id;
	param.out_result = '?';

	var result = db.executeProcedure(GET_VENDOR_CONTACT_INFORMATION_BY_VENDOR_ID, param);
	return db.extractArray(result.out_result);
}

function getAllVendorContactInformationManual() {
	var param = {};
	param.out_result = '?';
	var result = db.executeProcedureManual(GET_ALL_VENDOR_CONTACT_INFORMATION, param);
	return db.extractArray(result.out_result);
}


function getVendorContactInformationByIdManual(vendor_contact_information_id, user_id) {

	var param = {};
	param.in_vendor_contact_information_id = vendor_contact_information_id;
	param.out_result = '?';

	var result = db.executeProcedureManual(GET_VENDOR_CONTACT_INFORMATION_BY_ID, param);
	return db.extractArray(result.out_result);
}

function getVendorContactInformationByVendorIdManual(vendor_id, user_id) {

	var param = {};
	param.in_vendor_id = vendor_id;
	param.out_result = '?';

	var result = db.executeProcedureManual(GET_VENDOR_CONTACT_INFORMATION_BY_VENDOR_ID, param);
	return db.extractArray(result.out_result);
}

function insertVendorContactInformation(vendorContactInfoObj, user_id) {
	var param = {};
	param.in_name = vendorContactInfoObj.NAME;
	param.in_phone = vendorContactInfoObj.PHONE || null;
	param.in_email = vendorContactInfoObj.EMAIL;
	param.in_vendor_id = vendorContactInfoObj.VENDOR_ID;
	param.in_default_contact_information = vendorContactInfoObj.DEFAULT_CONTACT_INFORMATION || 0;
	param.in_created_user_id = user_id;
	param.out_result = '?';

	return db.executeScalar(INS_VENDOR_CONTACT_INFORMATION, param, 'out_result');
}

function insertVendorContactInformationManual(vendorContactInfoObj, user_id) {
	var param = {};
	
	param.in_name = vendorContactInfoObj.NAME;
	param.in_phone = vendorContactInfoObj.PHONE || null;
	param.in_email = vendorContactInfoObj.EMAIL;
	param.in_vendor_id = vendorContactInfoObj.VENDOR_ID;
	param.in_default_contact_information = vendorContactInfoObj.DEFAULT_CONTACT_INFORMATION || 0;
	param.in_created_user_id = user_id;
	param.out_result = '?';

	return db.executeScalarManual(INS_VENDOR_CONTACT_INFORMATION, param, 'out_result');
}

function updateVendorContactInformation(vendorContactInfoObj, user_id) {
	var param = {};
	param.in_vendor_contact_information_id = vendorContactInfoObj.VENDOR_CONTACT_INFORMATION_ID;
	param.in_name = vendorContactInfoObj.NAME;
	param.in_phone = vendorContactInfoObj.PHONE || null;
	param.in_email = vendorContactInfoObj.EMAIL;
	param.in_vendor_id = vendorContactInfoObj.VENDOR_ID;
	param.in_default_contact_information = vendorContactInfoObj.DEFAULT_CONTACT_INFORMATION;
	param.in_modified_user_id = user_id;
	param.out_result = '?';

	return db.executeScalar(UPD_VENDOR_CONTACT_INFORMATION, param, 'out_result');
}

function updateVendorContactInformationManual(vendorContactInfoObj, user_id) {
	var param = {};
	param.in_vendor_contact_information_id = vendorContactInfoObj.VENDOR_CONTACT_INFORMATION_ID;
	param.in_name = vendorContactInfoObj.NAME;
	param.in_phone = vendorContactInfoObj.PHONE || null;
	param.in_email = vendorContactInfoObj.EMAIL;
	param.in_vendor_id = vendorContactInfoObj.VENDOR_ID;
	param.in_default_contact_information = vendorContactInfoObj.DEFAULT_CONTACT_INFORMATION;
	param.in_modified_user_id = user_id;
	param.out_result = '?';

	return db.executeScalarManual(UPD_VENDOR_CONTACT_INFORMATION, param, 'out_result');
}

function updateDefaultVendorContactInformation(vendorContactInfoObj, user_id) {
	var param = {};
	param.in_vendor_contact_information_id = vendorContactInfoObj.VENDOR_CONTACT_INFORMATION_ID;
	param.in_vendor_id = vendorContactInfoObj.VENDOR_ID;
	param.in_default_contact_information = vendorContactInfoObj.DEFAULT_CONTACT_INFORMATION;
	param.in_modified_user_id = user_id;
	param.out_result = '?';

	return db.executeScalar(UPD_DEFAULT_VENDOR_CONTACT_INFORMATION, param, 'out_result');
}

function updateDefaultVendorContactInformationManual(vendorContactInfoObj, user_id) {
	var param = {};
	param.in_vendor_contact_information_id = vendorContactInfoObj.VENDOR_CONTACT_INFORMATION_ID;
	param.in_vendor_id = vendorContactInfoObj.VENDOR_ID;
	param.in_default_contact_information = vendorContactInfoObj.DEFAULT_CONTACT_INFORMATION;
	param.in_modified_user_id = user_id;
	param.out_result = '?';

	return db.executeScalarManual(UPD_DEFAULT_VENDOR_CONTACT_INFORMATION, param, 'out_result');
}

function deleteVendorContactInformation(vendor_contact_information_id, user_id) {
	var param = {};
	param.in_vendor_contact_information_id = vendor_contact_information_id;
	param.in_modified_user_id = user_id;
	param.out_result = '?';

	return db.executeScalar(DEL_VENDOR_CONTACT_INFORMATION, param, 'out_result');
}

function deleteVendorContactInformationManual(vendor_contact_information_id, user_id) {
	var param = {};
	param.in_vendor_contact_information_id = vendor_contact_information_id;
	param.in_modified_user_id = user_id;
	param.out_result = '?';

	return db.executeScalarManual(DEL_VENDOR_CONTACT_INFORMATION, param, 'out_result');
}
