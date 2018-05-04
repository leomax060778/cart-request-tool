/** ***********INCLUDE LIBRARIES*************** */
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var config = mapper.getDataConfig();
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

/** ***********PROCEDURES*************** */
var GET_VENDOR_CONTACT_INFORMATION_BY_VENDOR_ID = "GET_VENDOR_CONTACT_INFORMATION_BY_VENDOR_ID";
var GET_ALL_VENDOR_CONTACT_INFORMATION = "GET_ALL_VENDOR_CONTACT_INFORMATION";
var GET_ALL_VENDOR_FOR_ALTERNATIVE_CONTACT = "GET_ALL_VENDOR_FOR_ALTERNATIVE_CONTACT";
var GET_ALL_VENDOR_FOR_EXTEND_VENDOR_REQUEST = "GET_ALL_VENDOR_FOR_EXTEND_VENDOR_REQUEST";
var GET_ALL_VENDOR_FOR_CHANGE_VENDOR_REQUEST = "GET_ALL_VENDOR_FOR_CHANGE_VENDOR_REQUEST";
var GET_VENDOR_CONTACT_INFORMATION_BY_ID = "GET_VENDOR_CONTACT_INFORMATION_BY_ID";
var GET_ALTERNATIVE_VENDOR_CONTACT_BY_VENDOR_ID = "GET_ALTERNATIVE_VENDOR_CONTACT_BY_VENDOR_ID";
var GET_EXTEND_CONTACT_INFO_BY_LEGAL_NAME_ACCOUNT = "GET_EXTEND_CONTACT_INFO_BY_LEGAL_NAME_ACCOUNT";
var GET_CHANGE_CONTACT_INFO_BY_NAME_ACCOUNT = "GET_CHANGE_CONTACT_INFO_BY_NAME_ACCOUNT";

var INS_VENDOR_CONTACT_INFORMATION = 'INS_VENDOR_CONTACT_INFORMATION';
var UPD_VENDOR_CONTACT_INFORMATION = 'UPD_VENDOR_CONTACT_INFORMATION';
var UPD_DEFAULT_VENDOR_CONTACT_INFORMATION = 'UPD_DEFAULT_VENDOR_CONTACT_INFORMATION';
var UPD_VENDOR_CONTACT_INFORMATION_MASK = 'UPD_VENDOR_CONTACT_INFORMATION_MASK';
var UPD_ALTERNATIVE_VENDOR_CONTACT_MASK = 'UPD_ALTERNATIVE_VENDOR_CONTACT_MASK';
var UPD_EXTEND_VENDOR_CONTACT_MASK = 'UPD_EXTEND_VENDOR_CONTACT_MASK';
var UPD_CHANGE_VENDOR_CONTACT_MASK = 'UPD_CHANGE_VENDOR_CONTACT_MASK';
var DEL_VENDOR_CONTACT_INFORMATION = 'DEL_VENDOR_CONTACT_INFORMATION';
/** ***********END PROCEDURES*************** */

/** ***********GET*************** */
// Get all vendor contact information
function getAllVendorContactInformation() {
	var param = {};
	param.out_result = '?';
	var result = db.executeProcedure(GET_ALL_VENDOR_CONTACT_INFORMATION, param);
	return db.extractArray(result.out_result);
}

//Get all vendors with alternative contact information
function getAllVendorForAlternativeContact() {
	var param = {};
	param.out_result = '?';
	var result = db.executeProcedure(GET_ALL_VENDOR_FOR_ALTERNATIVE_CONTACT, param);
	return db.extractArray(result.out_result);
}

//Get all vendors used in Extend Vendor Request with Vendor Legal Name as Vendor Name
function getAllVendorForExtendVendorRequest() {
	var param = {};
	param.out_result = '?';
	var result = db.executeProcedure(GET_ALL_VENDOR_FOR_EXTEND_VENDOR_REQUEST, param);
	return db.extractArray(result.out_result);
}

//Get all vendors used in Change Vendor Request
function getAllVendorForChangeVendorRequest() {
	var param = {};
	param.out_result = '?';
	var result = db.executeProcedure(GET_ALL_VENDOR_FOR_CHANGE_VENDOR_REQUEST, param);
	return db.extractArray(result.out_result);
}

//Get all Vendor Contact Information manual
function getAllVendorContactInformationManual() {
    var param = {};
    param.out_result = '?';
    var result = db.executeProcedureManual(GET_ALL_VENDOR_CONTACT_INFORMATION, param);
    return db.extractArray(result.out_result);
}

//Get Vendor Contact Information by Vendor Contact Information Id
function getVendorContactInformationById(vendorContactInformationId) {
	var param = {};
	param.in_vendor_contact_information_id = vendorContactInformationId;
	param.out_result = '?';
	var result = db.executeProcedure(GET_VENDOR_CONTACT_INFORMATION_BY_ID, param);
	return db.extractArray(result.out_result);
}

//Get Vendor Contact Information by Vendor Id
function getVendorContactInformationByVendorId(vendorId) {
	var param = {};
	param.in_vendor_id = vendorId;
	param.out_result = '?';
	var result = db.executeProcedure(GET_VENDOR_CONTACT_INFORMATION_BY_VENDOR_ID, param);
	return db.extractArray(result.out_result);
}

//Get Vendor Contact Information by Vendor Id manual
function getVendorContactInformationByVendorIdManual(vendorId) {
    var param = {};
    param.in_vendor_id = vendorId;
    param.out_result = '?';
    var result = db.executeProcedureManual(GET_VENDOR_CONTACT_INFORMATION_BY_VENDOR_ID, param);
    return db.extractArray(result.out_result);
}

//Get Vendor Contact Information by Id manual
function getVendorContactInformationByIdManual(vendorContactInformationId) {

    var param = {};
    param.in_vendor_contact_information_id = vendorContactInformationId;
    param.out_result = '?';

    var result = db.executeProcedureManual(GET_VENDOR_CONTACT_INFORMATION_BY_ID, param);
    return db.extractArray(result.out_result);
}

//Get Alternative Vendor Contact Information by Vendor Id
function getAlternativeVendorContactByVendorId(vendorId) {
	var param = {};
	param.in_vendor_id = vendorId;
	param.out_result = '?';
	var result = db.executeProcedure(GET_ALTERNATIVE_VENDOR_CONTACT_BY_VENDOR_ID, param);
	return db.extractArray(result.out_result);
}

//Get Vendor Contact Information from Extend Vendor Request by Vendor Legal Name and Vendor Account
function getExtendVendorContactByVendor(vendorLegalName, vendorAccount) {
	var param = {};
	param.in_vendor_legal_name = vendorLegalName;
	param.in_vendor_account = vendorAccount;
	param.out_result = '?';
	var result = db.executeProcedure(GET_EXTEND_CONTACT_INFO_BY_LEGAL_NAME_ACCOUNT, param);
	return db.extractArray(result.out_result);
}

//Get Vendor Contact Information from Change Vendor Request by Vendor Name and Vendor Account
function getChangeVendorContactByVendor(vendorName, vendorAccount) {
	var param = {};
	param.in_vendor_name = vendorName;
	param.in_vendor_account = vendorAccount;
	param.out_result = '?';
	var result = db.executeProcedure(GET_CHANGE_CONTACT_INFO_BY_NAME_ACCOUNT, param);
	return db.extractArray(result.out_result);
}
/** ***********END GET*************** */

/** ***********INSERT*************** */
//Insert new Vendor Contact Information
function insertVendorContactInformation(vendorContactInfoObj, userId) {
	var param = {};
	param.in_name = vendorContactInfoObj.NAME;
	param.in_phone = vendorContactInfoObj.PHONE || null;
	param.in_email = vendorContactInfoObj.EMAIL;
	param.in_vendor_id = vendorContactInfoObj.VENDOR_ID;
	param.in_default_contact_information = vendorContactInfoObj.DEFAULT_CONTACT_INFORMATION || 0;
	param.in_created_user_id = userId;
	param.out_result = '?';

	return db.executeScalar(INS_VENDOR_CONTACT_INFORMATION, param, 'out_result');
}

//Insert new Vendor Contact Information manual
function insertVendorContactInformationManual(vendorContactInfoObj, userId) {
	var param = {};
	
	param.in_name = vendorContactInfoObj.NAME;
	param.in_phone = vendorContactInfoObj.PHONE || null;
	param.in_email = vendorContactInfoObj.EMAIL;
	param.in_vendor_id = vendorContactInfoObj.VENDOR_ID;
	param.in_default_contact_information = vendorContactInfoObj.DEFAULT_CONTACT_INFORMATION || 0;
	param.in_created_user_id = userId;
	param.out_result = '?';

	return db.executeScalarManual(INS_VENDOR_CONTACT_INFORMATION, param, 'out_result');
}
/** ***********END INSERT*************** */

/** ***********UPDATE*************** */
//Update Vendor Contact Information
function updateVendorContactInformation(vendorContactInfoObj, userId) {
	var param = {};
	param.in_vendor_contact_information_id = vendorContactInfoObj.VENDOR_CONTACT_INFORMATION_ID;
	param.in_name = vendorContactInfoObj.NAME;
	param.in_phone = vendorContactInfoObj.PHONE || null;
	param.in_email = vendorContactInfoObj.EMAIL;
	param.in_vendor_id = vendorContactInfoObj.VENDOR_ID;
	param.in_default_contact_information = vendorContactInfoObj.DEFAULT_CONTACT_INFORMATION;
	param.in_masked_vendor = vendorContactInfoObj.MASKED_VENDOR;
	param.in_modified_user_id = userId;
	param.out_result = '?';

	return db.executeScalar(UPD_VENDOR_CONTACT_INFORMATION, param, 'out_result');
}

//Update Vendor Contact Information manual
function updateVendorContactInformationManual(vendorContactInfoObj, userId) {
	var param = {};
	param.in_vendor_contact_information_id = vendorContactInfoObj.VENDOR_CONTACT_INFORMATION_ID;
	param.in_name = vendorContactInfoObj.NAME;
	param.in_phone = vendorContactInfoObj.PHONE || null;
	param.in_email = vendorContactInfoObj.EMAIL;
	param.in_vendor_id = vendorContactInfoObj.VENDOR_ID;
	param.in_default_contact_information = vendorContactInfoObj.DEFAULT_CONTACT_INFORMATION;
    param.in_masked_vendor = vendorContactInfoObj.MASKED_VENDOR;
    param.in_modified_user_id = userId;
	param.out_result = '?';

	return db.executeScalarManual(UPD_VENDOR_CONTACT_INFORMATION, param, 'out_result');
}

//Update Default Vendor Contact Information
function updateDefaultVendorContactInformation(vendorContactInfoObj, userId) {
	var param = {};
	param.in_vendor_contact_information_id = vendorContactInfoObj.VENDOR_CONTACT_INFORMATION_ID;
	param.in_vendor_id = vendorContactInfoObj.VENDOR_ID;
	param.in_default_contact_information = vendorContactInfoObj.DEFAULT_CONTACT_INFORMATION;
	param.in_modified_user_id = userId;
	param.out_result = '?';

	return db.executeScalar(UPD_DEFAULT_VENDOR_CONTACT_INFORMATION, param, 'out_result');
}

//Update Default Vendor Contact Information manual
function updateDefaultVendorContactInformationManual(vendorContactInfoObj, userId) {
	var param = {};
	param.in_vendor_contact_information_id = vendorContactInfoObj.VENDOR_CONTACT_INFORMATION_ID;
	param.in_vendor_id = vendorContactInfoObj.VENDOR_ID;
	param.in_default_contact_information = vendorContactInfoObj.DEFAULT_CONTACT_INFORMATION;
	param.in_modified_user_id = userId;
	param.out_result = '?';

	return db.executeScalarManual(UPD_DEFAULT_VENDOR_CONTACT_INFORMATION, param, 'out_result');
}

//Update Vendor Contact Information mask flag to protect the selected contact data
function updateVendorContactInformationMask(vendorContactInfoObj, userId) {
	var param = {};
	param.in_vendor_contact_information_id = vendorContactInfoObj.VENDOR_CONTACT_INFORMATION_ID;
    param.in_mask = config.getDataProtectionMask();
	param.in_modified_user_id = userId;
	param.out_result = '?';

	return db.executeScalar(UPD_VENDOR_CONTACT_INFORMATION_MASK, param, 'out_result');
}

//Update Alternative Vendor Contact Information mask flag to protect the selected contact data
function updateAlternativeVendorMask(alternativeVendorObj, userId) {
	var param = {};
	param.in_vendor_id = alternativeVendorObj.VENDOR_ID;
	param.in_contact_name = alternativeVendorObj.CONTACT_NAME;
    param.in_mask = config.getDataProtectionMask();
	param.in_modified_user_id = userId;
	param.out_result = '?';

	return db.executeScalar(UPD_ALTERNATIVE_VENDOR_CONTACT_MASK, param, 'out_result');
}

//Update Extend Vendor Request Contact Information mask flag to protect the selected contact data
function updateExtendVendorContactMask(objExtendVendorRequest, userId) {
	var param = {};
	param.in_vendor_legal_name = objExtendVendorRequest.VENDOR_LEGAL_NAME;
	param.in_contact_email = objExtendVendorRequest.CONTACT_EMAIL;
	param.in_contact_name = objExtendVendorRequest.CONTACT_NAME;
    param.in_mask = config.getDataProtectionMask();
	param.in_modified_user_id = userId;
	param.out_result = '?';

	return db.executeScalar(UPD_EXTEND_VENDOR_CONTACT_MASK, param, 'out_result');
}

//Update Change Vendor Request Contact Information mask flag to protect the selected contact data
function updateChangeVendorContactMask(objChangeVendorRequest, userId) {
	var param = {};
	param.in_vendor_name = objChangeVendorRequest.VENDOR_NAME;
	param.in_vendor_account = objChangeVendorRequest.VENDOR_ACCOUNT;
	param.in_vendor_contact_email = objChangeVendorRequest.VENDOR_CONTACT_EMAIL;
	param.in_vendor_contact_name = objChangeVendorRequest.VENDOR_CONTACT_NAME;
	param.in_mask = config.getDataProtectionMask();
	param.in_modified_user_id = userId;
	param.out_result = '?';

	return db.executeScalar(UPD_CHANGE_VENDOR_CONTACT_MASK, param, 'out_result');
}
/** ***********END UPDATE*************** */

/** ***********DELETE*************** */
//Soft delete of the selected Vendor Contact Information
function deleteVendorContactInformation(vendorContactInformationId, userId) {
	var param = {};
	param.in_vendor_contact_information_id = vendorContactInformationId;
    param.in_mask = config.getDataProtectionMask();
	param.in_modified_user_id = userId;
	param.out_result = '?';

	return db.executeScalar(DEL_VENDOR_CONTACT_INFORMATION, param, 'out_result');
}

//Soft delete of the selected Vendor Contact Information manual
function deleteVendorContactInformationManual(vendorContactInformationId, userId) {
	var param = {};
	param.in_vendor_contact_information_id = vendorContactInformationId;
    param.in_mask = config.getDataProtectionMask();
	param.in_modified_user_id = userId;
	param.out_result = '?';

	return db.executeScalarManual(DEL_VENDOR_CONTACT_INFORMATION, param, 'out_result');
}
/** ***********END DELETE*************** */