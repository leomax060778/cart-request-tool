$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */


//STORE PROCEDURE LIST NAME
var INS_REQUEST = "INS_REQUEST";

function insertRequest(objRequest, user_id){
	
	var parameters = {};
	
	parameters.in_team_id = objRequest.TEAM_ID; 
	parameters.in_entity_id = objRequest.ENTITY_ID; 
	parameters.in_vendor_id = objRequest.VENDOR_ID;
	parameters.in_non_sap_vendor_id = objRequest.NON_SAP_VENDOR_ID;
	parameters.in_stage_id = 1;
	parameters.in_status_id = 1;
	parameters.in_goods_recipient_username = objRequest.GOODS_RECIPIENT_USERNAME;
	parameters.in_data_protection_enabled = objRequest.DATA_PROTECTION_ENABLED || 0;
	parameters.in_infrastructure_of_work_id = objRequest.INFRASTRUCTURE_OF_WORK_ID || null;
	parameters.in_location_of_work_id = objRequest.LOCATION_OF_WORK_ID || null;
	parameters.in_alternative_vendor_name = objRequest.ALTERNATIVE_VENDOR_NAME || null;
	parameters.in_alternative_vendor_phone = objRequest.ALTERNATIVE_VENDOR_PHONE || null;
	parameters.in_alternative_vendor_email = objRequest.ALTERNATIVE_VENDOR_EMAIL || null;
	parameters.in_material_id = objRequest.MATERIAL_ID;
	parameters.in_crt_type_id = 2;
	parameters.in_budget_year_id = objRequest.BUDGET_YEAR_ID;
	parameters.in_created_user_id = user_id;
	parameters.out_result = '?';
	
	return db.executeScalarManual(INS_REQUEST, parameters, 'out_result');
}
