$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_ORIGIN_PARENT = "GET_ORIGIN_PARENT";
var GET_CRM = "GET_CRM_BY_LONG_HL3_ID";
var CRM_INS = "INS_CRM";
var HL3_INS = 'HL3_INS';


//métodos de acceso a datos para la bussines Layer de HL3

/*
//get Origin Parent
function getOriginParent(originPlanId){
	var parameters = {'in_origin_plan_id': originPlanId};	
	var originPlanId = db.executeScalar(GET_ORIGIN_PARENT, parameters, 'out_result');
	return originPlanId;
}
*/

//TODO:OBTENER HL2(IN_ORIGIN_PLAN_ID)-> crmId
function getHl2(IN_ORIGIN_PLAN_ID){	
}

//var crmId = getCrm(reqBody.IN_CRM_LONG_HL3_ID);
//get CRM
function getCrm(crmId){
	try{
		var parameters = {'in_long_hl3_id': crmId};	
		var result = db.executeProcedureManual(GET_CRM, parameters);	
		var list = result['out_result'];
		var crmId = 0;
		if(list.length > 0)
			crmId =  list['crm_id'];
		
		return crmId;
	}
	catch(e){
		throw ErrorLib.getErrors().InternalServerError("", e.toString(),
		"getCrm");
	}
}

//handle response to request
function handleResponse(body, code) {
	$.response.contentType = "application/json";
	$.response.status = code;
	$.response.setBody(JSON.stringify(body));
}

//Insert new CRM data
function insertCrm( in_hl2_id, in_hl3_acronym, in_description, in_h1_id, in_user_id){
	try{
		var parameters = {'in_hl2_id': in_hl2_id
				, 'in_hl3_acronym': in_hl3_acronym
				, 'in_description': in_description
				, 'in_h1_id': in_h1_id
				, 'in_user_id': in_user_id};
		
		var crmId = db.executeScalarManual(CRM_INS, parameters, 'out_crm_id');	
		return crmId;
	}
	catch(e){
		//throw ErrorLib.getErrors().InternalServerError("", e.toString(),		"insertCrm");
		handleResponse({"code": $.net.http.INTERNAL_SERVER_ERROR, "errors":{"INTERNAL_SERVER_ERROR": e.toString()}}, $.net.http.INTERNAL_SERVER_ERROR);
		
	}
	
}


//Insert new hl3 data
function insertHl3( in_acronym, in_hl2_id, in_hl3_description
		, in_crm_id, in_business_owner_id
		, in_start_date, in_end_date
		, in_hl3_fnc_budget_total, in_user_id){
	try{
		var parameters = {'in_acronym': in_acronym
				, 'in_hl2_id': in_hl2_id
				, 'in_hl3_description': in_hl3_description
				, 'in_crm_id': in_crm_id
				, 'in_business_owner_id': in_business_owner_id
				, 'in_hl3_fnc_budget_total': in_hl3_fnc_budget_total
				, 'in_user_id': in_user_id 
				};	
		var hl3Id = db.executeScalarManual(CRM_INS, parameters, 'out_hl3_id');	
		return hl3Id;
	}
	catch(e){
		throw ErrorLib.getErrors().InternalServerError("", e.toString(),
		"insertHl3");
	}
}