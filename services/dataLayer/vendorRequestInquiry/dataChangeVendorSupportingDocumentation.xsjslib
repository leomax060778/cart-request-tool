$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var INS_CHANGE_VENDOR_SUPPORTING_DOCUMENTATION = "INS_CHANGE_VENDOR_SUPPORTING_DOCUMENTATION";
var GET_ALL_CHANGE_VENDOR_SUPPORTING_DOCUMENTATION = "GET_ALL_CHANGE_VENDOR_SUPPORTING_DOCUMENTATION";
var GET_CHANGE_VENDOR_SUPPORTING_DOCUMENTATION_BY_ID = "GET_CHANGE_VENDOR_SUPPORTING_DOCUMENTATION_BY_ID";
var DEL_CHANGE_VENDOR_SUPPORTING_DOCUMENTATION = "DEL_CHANGE_VENDOR_SUPPORTING_DOCUMENTATION";
var UPD_CHANGE_VENDOR_SUPPORTING_DOCUMENTATION = "UPD_CHANGE_VENDOR_SUPPORTING_DOCUMENTATION";

//Insert new change vendor supporting documentation option
function insertChangeSupporting(objChangeSupporting, userId){
	var parameters = {};
    parameters.in_name = objChangeSupporting.NAME;
    parameters.in_description = objChangeSupporting.DESCRIPTION;
    parameters.in_created_user_id = userId;//objChangeVendorRequest.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(INS_CHANGE_VENDOR_SUPPORTING_DOCUMENTATION, parameters, 'out_result');
}

//Insert new change vendor supporting documentation option manually
function insertChangeSupportingManual(objChangeSupporting, userId){
	var parameters = {};
    parameters.in_name = objChangeSupporting.NAME;
    parameters.in_description = objChangeSupporting.DESCRIPTION;
    parameters.in_created_user_id = userId;//objChangeVendorRequest.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalarManual(INS_CHANGE_VENDOR_SUPPORTING_DOCUMENTATION, parameters, 'out_result');
}

//Get all change vendor supporting documentation
function getAllChangeSupporting(){
	var parameters = {};
	var result = db.executeProcedure(GET_ALL_CHANGE_VENDOR_SUPPORTING_DOCUMENTATION, parameters);
	return db.extractArray(result.out_result);
}

//Get change vendor supporting documentation by id
function getChangeVendorSupportingById(changeSupportingId){
	var parameters = {'in_supporting_documentation_id': changeSupportingId};
    var result = db.executeProcedure(GET_CHANGE_VENDOR_SUPPORTING_DOCUMENTATION_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
    	   return list[0];
    } else {
    	   return {};
    }
}

//Get change vendor supporting documentation by id manually
function getChangeVendorSupportingByIdManual(changeSupportingId){
	var parameters = {'in_supporting_documentation_id': changeSupportingId};
    var result = db.executeProcedureManual(GET_CHANGE_VENDOR_SUPPORTING_DOCUMENTATION_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
    	   return list[0];
    } else {
    	   return {};
    }
}

//Delete Change Vendor supporting documentation
function deleteChangeSupporting(objChangeSupporting, userId) {
    var parameters = {};
    parameters.in_supporting_documentation_id = objChangeSupporting.SUPPORTING_DOCUMENTATION_ID;
    parameters.in_modified_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalar(DEL_CHANGE_VENDOR_SUPPORTING_DOCUMENTATION, parameters, 'out_result');
}


//Update
function updateChangeSupporting(objChangeSupporting, userId) {
    var parameters = {};
    parameters.in_supporting_documentation_id = objChangeSupporting.SUPPORTING_DOCUMENTATION_ID;
    parameters.in_name = objChangeSupporting.NAME;
    parameters.in_description = objChangeSupporting.DESCRIPTION;
    parameters.in_modified_user_id = userId;//objChangeSupporting.MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(UPD_CHANGE_VENDOR_SUPPORTING_DOCUMENTATION, parameters, 'out_result');
}