$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

/** ***********PROCEDURES*************** */
//GET ALL
var GET_ALL_INQUIRY_STATUS = "GET_ALL_INQUIRY_STATUS";
var GET_ALL_VENDOR_INQUIRY_STATUS = "GET_ALL_VENDOR_INQUIRY_STATUS";
var GET_ALL_REQUEST_STATUS = "GET_ALL_REQUEST_STATUS";
var GET_ALL_VENDOR_REQUEST_STATUS = "GET_ALL_VENDOR_REQUEST_STATUS";
var GET_ALL_CHANGE_VENDOR_REQUEST_STATUS = "GET_ALL_CHANGE_VENDOR_REQUEST_STATUS";
var GET_ALL_EXTEND_VENDOR_REQUEST_STATUS = "GET_ALL_EXTEND_VENDOR_REQUEST_STATUS";
var GET_ALL_REQUEST_STATUS_FOR_FILTERS = "GET_ALL_REQUEST_STATUS_FOR_FILTERS";
//GET ALL PROCESSING REPORT
var GET_ALL_INQUIRY_STATUS_PROCESSING_REPORT = "GET_ALL_INQUIRY_STATUS_PROCESSING_REPORT";
var GET_ALL_VENDOR_INQUIRY_STATUS_PROCESSING_REPORT = "GET_ALL_VENDOR_INQUIRY_STATUS_PROCESSING_REPORT";
var GET_ALL_REQUEST_STATUS_PROCESSING_REPORT = "GET_ALL_REQUEST_STATUS_PROCESSING_REPORT";
var GET_ALL_VENDOR_REQUEST_STATUS_PROCESSING_REPORT = "GET_ALL_VENDOR_REQUEST_STATUS_PROCESSING_REPORT";
var GET_ALL_CHANGE_VENDOR_REQUEST_STATUS_PROCESSING_REPORT = "GET_ALL_CHANGE_VENDOR_REQUEST_STATUS_PROCESSING_REPORT";
var GET_ALL_EXTEND_VENDOR_REQUEST_STATUS_PROCESSING_REPORT = "GET_ALL_EXTEND_VENDOR_REQUEST_STATUS_PROCESSING_REPORT";
//GET BY ID
var GET_INQUIRY_STATUS_BY_ID = "GET_INQUIRY_STATUS_BY_ID";
var GET_VENDOR_INQUIRY_STATUS_BY_ID = "GET_VENDOR_INQUIRY_STATUS_BY_ID";
var GET_REQUEST_STATUS_BY_ID = "GET_REQUEST_STATUS_BY_ID";
var GET_VENDOR_REQUEST_STATUS_BY_ID = "GET_VENDOR_REQUEST_STATUS_BY_ID";
var GET_CHANGE_VENDOR_REQUEST_STATUS_BY_ID = "GET_CHANGE_VENDOR_REQUEST_STATUS_BY_ID";
var GET_EXTEND_VENDOR_REQUEST_STATUS_BY_ID = "GET_EXTEND_VENDOR_REQUEST_STATUS_BY_ID";
//INSERT
var INS_INQUIRY_STATUS = "INS_STATUS_INQUIRY_STATUS";
var INS_VENDOR_INQUIRY_STATUS = "INS_STATUS_VENDOR_INQUIRY_STATUS";
var INS_REQUEST_STATUS = "INS_STATUS_REQUEST_STATUS";
var INS_VENDOR_REQUEST_STATUS = "INS_STATUS_VENDOR_REQUEST_STATUS";
var INS_CHANGE_VENDOR_REQUEST_STATUS = "INS_STATUS_CHANGE_VENDOR_REQUEST_STATUS";
var INS_EXTEND_VENDOR_REQUEST_STATUS = "INS_STATUS_EXTEND_VENDOR_REQUEST_STATUS";
//UPDATE
var UPD_INQUIRY_STATUS = "UPD_INQUIRY_STATUS";
var UPD_VENDOR_INQUIRY_STATUS = "UPD_VENDOR_INQUIRY_STATUS";
var UPD_REQUEST_STATUS = "UPD_REQUEST_STATUS";
var UPD_VENDOR_REQUEST_STATUS = "UPD_VENDOR_REQUEST_STATUS";
var UPD_CHANGE_VENDOR_REQUEST_STATUS = "UPD_CHANGE_VENDOR_REQUEST_STATUS";
var UPD_EXTEND_VENDOR_REQUEST_STATUS = "UPD_EXTEND_VENDOR_REQUEST_STATUS";
var DEL_INQUIRY_STATUS = "DEL_INQUIRY_STATUS";
var DEL_VENDOR_INQUIRY_STATUS = "DEL_VENDOR_INQUIRY_STATUS";
var DEL_REQUEST_STATUS = "DEL_REQUEST_STATUS";
var DEL_VENDOR_REQUEST_STATUS = "DEL_VENDOR_REQUEST_STATUS";
var DEL_CHANGE_VENDOR_REQUEST_STATUS = "DEL_CHANGE_VENDOR_REQUEST_STATUS";
var DEL_EXTEND_VENDOR_REQUEST_STATUS = "DEL_EXTEND_VENDOR_REQUEST_STATUS";
/** ***********END PROCEDURES*************** */

/** ***********GET ALL*************** */
function getAllInquiryStatus(){
    var parameters = {};
    parameters.out_result = '?';
    var result = db.executeProcedure(GET_ALL_INQUIRY_STATUS, parameters);
    return db.extractArray(result.out_result);
}

function getAllVendorInquiryStatus(){
    var parameters = {};
    parameters.out_result = '?';
    var result = db.executeProcedure(GET_ALL_VENDOR_INQUIRY_STATUS, parameters);
    return db.extractArray(result.out_result);
}

function getAllRequestStatus(){
    var parameters = {};
    parameters.out_result = '?';
    var result = db.executeProcedure(GET_ALL_REQUEST_STATUS, parameters);
    return db.extractArray(result.out_result);
}

function getAllVendorRequestStatus(){
    var parameters = {};
    parameters.out_result = '?';
    var result = db.executeProcedure(GET_ALL_VENDOR_REQUEST_STATUS, parameters);
    return db.extractArray(result.out_result);
}

function getAllChangeVendorRequestStatus(){
    var parameters = {};
    parameters.out_result = '?';
    var result = db.executeProcedure(GET_ALL_CHANGE_VENDOR_REQUEST_STATUS, parameters);
    return db.extractArray(result.out_result);
}

function getAllExtendVendorRequestStatus(){
    var parameters = {};
    parameters.out_result = '?';
    var result = db.executeProcedure(GET_ALL_EXTEND_VENDOR_REQUEST_STATUS, parameters);
    return db.extractArray(result.out_result);
}

function getAllStatusForFilters(){
    var parameters = {};
    parameters.out_result = '?';
    var result = db.executeProcedure(GET_ALL_REQUEST_STATUS_FOR_FILTERS, parameters);
    return db.extractArray(result.out_result);
}

/** ***********GET ALL PROCESSING REPORT*************** */
function getAllInquiryStatusProcessingReport(){
    var parameters = {};
    parameters.out_result = '?';
    var result = db.executeProcedure(GET_ALL_INQUIRY_STATUS_PROCESSING_REPORT, parameters);
    return db.extractArray(result.out_result);
}

function getAllVendorInquiryStatusProcessingReport(){
    var parameters = {};
    parameters.out_result = '?';
    var result = db.executeProcedure(GET_ALL_VENDOR_INQUIRY_STATUS_PROCESSING_REPORT, parameters);
    return db.extractArray(result.out_result);
}

function getAllRequestStatusProcessingReport(){
    var parameters = {};
    parameters.out_result = '?';
    var result = db.executeProcedure(GET_ALL_REQUEST_STATUS_PROCESSING_REPORT, parameters);
    return db.extractArray(result.out_result);
}

function getAllVendorRequestStatusProcessingReport(){
    var parameters = {};
    parameters.out_result = '?';
    var result = db.executeProcedure(GET_ALL_VENDOR_REQUEST_STATUS_PROCESSING_REPORT, parameters);
    return db.extractArray(result.out_result);
}

function getAllChangeVendorRequestStatusProcessingReport(){
    var parameters = {};
    parameters.out_result = '?';
    var result = db.executeProcedure(GET_ALL_CHANGE_VENDOR_REQUEST_STATUS_PROCESSING_REPORT, parameters);
    return db.extractArray(result.out_result);
}

function getAllExtendVendorRequestStatusProcessingReport(){
    var parameters = {};
    parameters.out_result = '?';
    var result = db.executeProcedure(GET_ALL_EXTEND_VENDOR_REQUEST_STATUS_PROCESSING_REPORT, parameters);
    return db.extractArray(result.out_result);
}

/** ***********GET BY ID*************** */
function getInquiryStatusById(statusId){
    var parameters = {};
    parameters.in_status_id = statusId;
    parameters.out_result = '?';
    var result = db.executeProcedure(GET_INQUIRY_STATUS_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
        return list[0];
    } else {
        return {};
    }
}

function getVendorInquiryStatusById(statusId){
    var parameters = {};
    parameters.in_status_id = statusId;
    parameters.out_result = '?';
    var result = db.executeProcedure(GET_VENDOR_INQUIRY_STATUS_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
        return list[0];
    } else {
        return {};
    }
}

function getRequestStatusById(statusId){
    var parameters = {};
    parameters.in_status_id = statusId;
    parameters.out_result = '?';
    var result = db.executeProcedure(GET_REQUEST_STATUS_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
        return list[0];
    } else {
        return {};
    }
}

function getVendorRequestStatusById(statusId){
    var parameters = {};
    parameters.in_status_id = statusId;
    parameters.out_result = '?';
    var result = db.executeProcedure(GET_VENDOR_REQUEST_STATUS_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
        return list[0];
    } else {
        return {};
    }
}

function getChangeVendorRequestStatusById(statusId){
    var parameters = {};
    parameters.in_status_id = statusId;
    parameters.out_result = '?';
    var result = db.executeProcedure(GET_CHANGE_VENDOR_REQUEST_STATUS_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
        return list[0];
    } else {
        return {};
    }
}

function getExtendVendorRequestStatusById(statusId){
    var parameters = {};
    parameters.in_status_id = statusId;
    parameters.out_result = '?';
    var result = db.executeProcedure(GET_EXTEND_VENDOR_REQUEST_STATUS_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
        return list[0];
    } else {
        return {};
    }
}

/** ***********GET BY ID MANUAL*************** */
function getInquiryStatusByIdManual(statusId){
    var parameters = {};
    parameters.in_status_id = statusId;
    parameters.out_result = '?';
    var result = db.executeProcedureManual(GET_INQUIRY_STATUS_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
        return list[0];
    } else {
        return {};
    }
}

function getVendorInquiryStatusByIdManual(statusId){
    var parameters = {};
    parameters.in_status_id = statusId;
    parameters.out_result = '?';
    var result = db.executeProcedureManual(GET_VENDOR_INQUIRY_STATUS_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
        return list[0];
    } else {
        return {};
    }
}

function getRequestStatusByIdManual(statusId){
    var parameters = {};
    parameters.in_status_id = statusId;
    parameters.out_result = '?';
    var result = db.executeProcedureManual(GET_REQUEST_STATUS_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
        return list[0];
    } else {
        return {};
    }
}

function getVendorRequestStatusByIdManual(statusId){
    var parameters = {};
    parameters.in_status_id = statusId;
    parameters.out_result = '?';
    var result = db.executeProcedureManual(GET_VENDOR_REQUEST_STATUS_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
        return list[0];
    } else {
        return {};
    }
}

function getChangeVendorRequestStatusByIdManual(statusId){
    var parameters = {};
    parameters.in_status_id = statusId;
    parameters.out_result = '?';
    var result = db.executeProcedureManual(GET_CHANGE_VENDOR_REQUEST_STATUS_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
        return list[0];
    } else {
        return {};
    }
}

function getExtendVendorRequestStatusByIdManual(statusId){
    var parameters = {};
    parameters.in_status_id = statusId;
    parameters.out_result = '?';
    var result = db.executeProcedureManual(GET_EXTEND_VENDOR_REQUEST_STATUS_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
        return list[0];
    } else {
        return {};
    }
}

/** ***********INSERT*************** */
function insertInquiryStatus(objStatus, userId){
    var parameters = {};
    parameters.in_name = objStatus.NAME;
    parameters.in_administrable = objStatus.ADMINISTRABLE;
    parameters.in_created_user_id = userId;//objVendorRequest.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(INS_INQUIRY_STATUS, parameters, 'out_result');
}

function insertVendorInquiryStatus(objStatus, userId){
    var parameters = {};
    parameters.in_name = objStatus.NAME;
    parameters.in_administrable = objStatus.ADMINISTRABLE;
    parameters.in_created_user_id = userId;//objVendorRequest.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(INS_VENDOR_INQUIRY_STATUS, parameters, 'out_result');
}

function insertVendorRequestStatus(objStatus, userId){
    var parameters = {};
    parameters.in_name = objStatus.NAME;
    parameters.in_administrable = objStatus.ADMINISTRABLE;
    parameters.in_created_user_id = userId;//objVendorRequest.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(INS_VENDOR_REQUEST_STATUS, parameters, 'out_result');
}

function insertRequestStatus(objStatus, userId){
    var parameters = {};
    parameters.in_name = objStatus.NAME;
    parameters.in_administrable = objStatus.ADMINISTRABLE;
    parameters.in_created_user_id = userId;//objVendorRequest.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(INS_REQUEST_STATUS, parameters, 'out_result');
}

function insertChangeVendorRequestStatus(objStatus, userId){
    var parameters = {};
    parameters.in_name = objStatus.NAME;
    parameters.in_administrable = objStatus.ADMINISTRABLE;
    parameters.in_created_user_id = userId;//objVendorRequest.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(INS_CHANGE_VENDOR_REQUEST_STATUS, parameters, 'out_result');
}

function insertExtendVendorRequestStatus(objStatus, userId){
    var parameters = {};
    parameters.in_name = objStatus.NAME;
    parameters.in_administrable = objStatus.ADMINISTRABLE;
    parameters.in_created_user_id = userId;//objVendorRequest.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(INS_EXTEND_VENDOR_REQUEST_STATUS, parameters, 'out_result');
}

/** ***********UPDATE*************** */
function updateInquiryStatus(objStatus, userId){
    var parameters = {};
    parameters.in_status_id = objStatus.STATUS_ID;
    parameters.in_name = objStatus.NAME;
    parameters.in_administrable = objStatus.ADMINISTRABLE;
    parameters.in_created_user_id = userId;//objVendorRequest.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(UPD_INQUIRY_STATUS, parameters, 'out_result');
}

function updateVendorInquiryStatus(objStatus, userId){
    var parameters = {};
    parameters.in_status_id = objStatus.STATUS_ID;
    parameters.in_name = objStatus.NAME;
    parameters.in_administrable = objStatus.ADMINISTRABLE;
    parameters.in_created_user_id = userId;//objVendorRequest.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(UPD_VENDOR_INQUIRY_STATUS, parameters, 'out_result');
}

function updateVendorRequestStatus(objStatus, userId){
    var parameters = {};
    parameters.in_status_id = objStatus.STATUS_ID;
    parameters.in_name = objStatus.NAME;
    parameters.in_administrable = objStatus.ADMINISTRABLE;
    parameters.in_created_user_id = userId;//objVendorRequest.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(UPD_VENDOR_REQUEST_STATUS, parameters, 'out_result');
}

function updateRequestStatus(objStatus, userId){
    var parameters = {};
    parameters.in_name = objStatus.NAME;
    parameters.in_administrable = objStatus.ADMINISTRABLE;
    parameters.in_created_user_id = userId;//objVendorRequest.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(UPD_REQUEST_STATUS, parameters, 'out_result');
}

function updateChangeVendorRequestStatus(objStatus, userId){
    var parameters = {};
    parameters.in_status_id = objStatus.STATUS_ID;
    parameters.in_name = objStatus.NAME;
    parameters.in_administrable = objStatus.ADMINISTRABLE;
    parameters.in_created_user_id = userId;//objVendorRequest.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(UPD_CHANGE_VENDOR_REQUEST_STATUS, parameters, 'out_result');
}

function updateExtendVendorRequestStatus(objStatus, userId){
    var parameters = {};
    parameters.in_status_id = objStatus.STATUS_ID;
    parameters.in_name = objStatus.NAME;
    parameters.in_administrable = objStatus.ADMINISTRABLE;
    parameters.in_created_user_id = userId;//objVendorRequest.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(UPD_EXTEND_VENDOR_REQUEST_STATUS, parameters, 'out_result');
}

/** ***********DELETE*************** */
function deleteInquiryStatus(objStatus, userId) {
    var parameters = {};
    parameters.in_status_id = objStatus.INQUIRY_ID;
    parameters.in_modified_user_id = userId;//objStatus.MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(DEL_INQUIRY_STATUS, parameters, 'out_result');
}

function deleteRequestStatus(objStatus, userId) {
    var parameters = {};
    parameters.in_status_id = objStatus.INQUIRY_ID;
    parameters.in_modified_user_id = userId;//objStatus.MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(DEL_REQUEST_STATUS, parameters, 'out_result');
}

function deleteVendorInquiryStatus(objStatus, userId) {
    var parameters = {};
    parameters.in_status_id = objStatus.INQUIRY_ID;
    parameters.in_modified_user_id = userId;//objStatus.MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(DEL_VENDOR_INQUIRY_STATUS, parameters, 'out_result');
}

function deleteVendorRequestStatus(objStatus, userId) {
    var parameters = {};
    parameters.in_status_id = objStatus.INQUIRY_ID;
    parameters.in_modified_user_id = userId;//objStatus.MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(DEL_VENDOR_REQUEST_STATUS, parameters, 'out_result');
}

function deleteExtendVendorRequestStatus(objStatus, userId) {
    var parameters = {};
    parameters.in_status_id = objStatus.INQUIRY_ID;
    parameters.in_modified_user_id = userId;//objStatus.MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(DEL_EXTEND_VENDOR_REQUEST_STATUS, parameters, 'out_result');
}

function deleteChangeVendorRequestStatus(objStatus, userId) {
    var parameters = {};
    parameters.in_status_id = objStatus.INQUIRY_ID;
    parameters.in_modified_user_id = userId;//objStatus.MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(DEL_CHANGE_VENDOR_REQUEST_STATUS, parameters, 'out_result');
}