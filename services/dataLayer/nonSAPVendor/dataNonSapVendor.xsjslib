$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var config = mapper.getDataConfig();
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_NON_SAP_VENDOR = 'GET_ALL_NON_SAP_VENDOR';
var GET_NON_SAP_VENDOR_BY_ID = 'GET_NON_SAP_VENDOR_BY_ID';
var GET_NON_SAP_VENDOR_BY_VENDOR_ID = 'GET_NON_SAP_VENDOR_BY_VENDOR_ID';
var INS_NON_SAP_VENDOR = 'INS_NON_SAP_VENDOR';
var UPD_NON_SAP_VENDOR = 'UPD_NON_SAP_VENDOR';
var UPD_NON_SAP_VENDOR_MASK = 'UPD_NON_SAP_VENDOR_MASK';
var DEL_NON_SAP_VENDOR = 'DEL_NON_SAP_VENDOR';

function getAllNonSapVendor() {
	var param = {};
	param.out_result = '?';
	var result = db.executeProcedure(GET_ALL_NON_SAP_VENDOR, param);
	return db.extractArray(result.out_result);
}

function getNonSapVendorById(nonSapVendorId) {
	var param = {};
	param.in_non_sap_vendor_id = nonSapVendorId;
	param.out_result = '?';

	var result = db.executeProcedure(GET_NON_SAP_VENDOR_BY_ID, param);
    var list = db.extractArray(result.out_result);
    if(list.length){
        return list[0];
    } else {
        return {};
    }
}

function getNonSapVendorByVendorId(vendorId) {
    var param = {};
    param.in_vendor_id = vendorId;
    param.out_result = '?';

    var result = db.executeProcedure(GET_NON_SAP_VENDOR_BY_VENDOR_ID, param);
    return db.extractArray(result.out_result);
}

function insertNonSapVendor(objVendor, userId) {
	var param = getParams(objVendor);
	param.in_created_user_id = userId;
	param.out_result = '?';

	return db.executeScalar(INS_NON_SAP_VENDOR, param, 'out_result');
}

function updateNonSapVendor(objVendor, userId) {
	var param = getParams(objVendor);
	param.in_non_sap_vendor_id = objVendor.NON_SAP_VENDOR_VENDOR_ID;
	param.in_modified_user_id = userId;
	param.out_result = '?';

	return db.executeScalar(UPD_NON_SAP_VENDOR, param, 'out_result');
}

function updateNonSapVendorMask(objNonSapVendor, userId) {
	var param = {};
	param.in_non_sap_vendor_id = objNonSapVendor.NON_SAP_VENDOR_ID;
	param.in_mask = config.getDataProtectionMask();
	param.in_modified_user_id = userId;
	param.out_result = '?';

	return db.executeScalar(UPD_NON_SAP_VENDOR_MASK, param, 'out_result');
}

function deleteNonSapVendor(vendorId, userId) {
	var param = {};
	param.in_non_sap_vendor_id = vendorId;
    param.in_mask = config.getDataProtectionMask();
	param.in_modified_user_id = userId;
	param.out_result = '?';

	return db.executeScalar(DEL_NON_SAP_VENDOR, param, 'out_result');
}

//MANUAL PROCEDURES
function getManualNonSapVendorById(vendorId) {

	var param = {};
	param.in_non_sap_vendor_id = vendorId;
	param.out_result = '?';

	var result = db.executeProcedureManual(GET_NON_SAP_VENDOR_BY_ID, param);
    var list = db.extractArray(result.out_result);
    if(list.length){
        return list[0];
    } else {
        return {};
    }
}

function insertManualNonSapVendor(objVendor, userId) {
	var param = getParams(objVendor);
	param.in_created_user_id = userId;
	param.out_result = '?';

	return db.executeScalarManual(INS_NON_SAP_VENDOR, param, 'out_result');
}

function updateManualNonSapVendor(objVendor, userId) {
    var param = getParams(objVendor);
    param.in_non_sap_vendor_id = objVendor.NON_SAP_VENDOR_ID;
    param.in_modified_user_id = userId;
    param.out_result = '?';

    return db.executeScalarManual(UPD_NON_SAP_VENDOR, param, 'out_result');
}

function deleteManualNonSapVendor(vendorId, userId) {
	var param = {};
	param.in_non_sap_vendor_id = vendorId;
    param.in_mask = config.getDataProtectionMask();
	param.in_modified_user_id = userId;
	param.out_result = '?';

	return db.executeScalarManual(DEL_NON_SAP_VENDOR, param, 'out_result');
}

function getManualAllNonSapVendor() {
	var param = {};
	param.out_result = '?';
	var result = db.executeProcedureManual(GET_ALL_NON_SAP_VENDOR, param);
	return db.extractArray(result.out_result);
}

//MAPPER
function getParams(objVendor) {
	var params = {};
	
	params.in_entity_id = objVendor.ENTITY_ID;
	params.in_contact_name = objVendor.CONTACT_NAME;
	params.in_contact_email = objVendor.CONTACT_EMAIL;
	params.in_contact_phone = objVendor.CONTACT_PHONE;

	return params;
}