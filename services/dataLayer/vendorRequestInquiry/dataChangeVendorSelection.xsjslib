$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var INS_CHANGE_VENDOR_SELECTION = "INS_CHANGE_VENDOR_SELECTION";
var GET_CHANGE_VENDOR_SELECTION = "GET_CHANGE_VENDOR_SELECTION";
var UPD_CHANGE_VENDOR_SELECTION = "UPD_CHANGE_VENDOR_SELECTION";

//Insert new change vendor selection
function insertChangeSelection(objChangeSelection, changeVendorRequestId, userId) {
    var parameters = {};
    parameters.in_change_vendor_request_id = changeVendorRequestId;//objChangeSelection.CHANGE_VENDOR_REQUEST_ID;
    parameters.in_supporting_documentation_id = objChangeSelection.SUPPORTING_DOCUMENTATION_ID;
    parameters.in_selection = objChangeSelection.SELECTION;
    parameters.in_created_user_id = userId;//objChangeSelection.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(INS_CHANGE_VENDOR_SELECTION, parameters, 'out_result');
}

//Insert new change vendor selection manually
function insertChangeSelectionManual(arrSelection) {
    var parameters = {};
    parameters.in_option_selection = arrSelection;
    parameters.out_result = '?';
    return db.executeScalarManual(INS_CHANGE_VENDOR_SELECTION, parameters, 'out_result');
}

//Get change vendor selection by change vendor request id
function getChangeSelectionById(changeVendorRequestId) {
    var parameters = {'in_change_vendor_request_id': changeVendorRequestId};
    var result = db.executeProcedure(GET_CHANGE_VENDOR_SELECTION, parameters);
    return db.extractArray(result.out_result);
}

//Get change vendor selection by change vendor request id manually
function getChangeSelectionByIdManual(changeVendorRequestId) {
    var parameters = {'in_change_vendor_request_id': changeVendorRequestId};
    var result = db.executeProcedureManual(GET_CHANGE_VENDOR_SELECTION, parameters);
    return db.extractArray(result.out_result);
}


//Update change vendor selection
function updateChangeSelection(arrSelection) {
    var parameters = {};
    parameters.in_option_selection = arrSelection;
    parameters.out_result = '?';
    return db.executeScalar(UPD_CHANGE_VENDOR_SELECTION, parameters, 'out_result');
}

//Update change vendor selection manually
function updateChangeSelectionManual(arrSelection) {
    var parameters = {};
    parameters.in_option_selection = arrSelection;
    parameters.out_result = '?';
    return db.executeScalarManual(UPD_CHANGE_VENDOR_SELECTION, parameters, 'out_result');
}