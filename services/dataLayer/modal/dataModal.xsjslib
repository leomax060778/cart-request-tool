$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var INS_MODAL = "INS_MODAL";
var GET_ALL_MODAL = "GET_ALL_MODAL";
var GET_MODAL_BY_ID = "GET_MODAL_BY_ID";
var UPD_MODAL = "UPD_MODAL";
var DEL_MODAL = "DEL_MODAL";

//Insert modal
function insertModal(objModal, userId) {
    var parameters = {};
    parameters.in_description = objModal.DESCRIPTION;
    parameters.in_content = objModal.CONTENT;
    parameters.in_link = objModal.LINK;
    parameters.in_created_user_id = userId;//objModal.CREATED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(INS_MODAL, parameters, 'out_result');
}

//Get all modal
function getAllModal() {
  var parameters = {};
  var result = db.executeProcedure(GET_ALL_MODAL, parameters);
  return db.extractArray(result.out_result);
}

//Get modal by id
function getModalById(modalId) {
  var parameters = {'in_modal_id': modalId};
  var result = db.executeProcedure(GET_MODAL_BY_ID, parameters);
  return db.extractArray(result.out_result);
}

//Get modal by id manually
function getModalByIdManual(modalId) {
  var parameters = {'in_modal_id': modalId};
  var result = db.executeProcedureManual(GET_MODAL_BY_ID, parameters);
  return db.extractArray(result.out_result);
}

//Update modal
function updateModal(objModal, userId) {
    var parameters = {};
    parameters.in_modal_id = objModal.MODAL_ID;
    parameters.in_description = objModal.DESCRIPTION;
    parameters.in_content = objModal.CONTENT;
    parameters.in_link = objModal.LINK;
    parameters.in_modified_user_id = userId;//objModal.MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(UPD_MODAL, parameters, 'out_result');
}

//Delete modal
function deleteModal(objModal, userId) {
    var parameters = {};
    parameters.in_modal_id = objModal.MODAL_ID;
    parameters.in_modified_user_id = userId;//objModal.MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalar(DEL_MODAL, parameters, 'out_result');
}