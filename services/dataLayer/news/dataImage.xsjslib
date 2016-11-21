$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

var INS_IMAGE = "INS_IMAGE";
var UPD_IMAGE = "UPD_IMAGE";
var DEL_IMAGE = "DEL_IMAGE";
var GET_IMAGE_BY_ID = "GET_IMAGE_BY_ID";

function insertImage(objImage, userId){
    var parameters = {};
    parameters.in_image_url = objImage.IMAGE_URL;
    parameters.in_name = objImage.NAME;
    parameters.in_description = objImage.DESCRIPTION;
    parameters.in_created_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalarManual(INS_IMAGE, parameters, 'out_result');
}

function updateImage(objImage, userId){
    var parameters = {};
    parameters.in_image_id = objImage.IMAGE_ID;
    parameters.in_image_url = objImage.IMAGE_URL;
    parameters.in_name = objImage.NAME;
    parameters.in_description = objImage.DESCRIPTION;
    parameters.in_modified_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalarManual(UPD_IMAGE, parameters, 'out_result');
}

function getImageById(imageId){
    var parameters = {};
    parameters.in_image_id = imageId;
    parameters.out_result = '?';
    var result = db.executeProcedure(GET_IMAGE_BY_ID, parameters);
    return db.extractArray(result.out_result);
}

function getImageByIdManual(imageId){
    var parameters = {};
    parameters.in_image_id = imageId;
    parameters.out_result = '?';
    var result = db.executeProcedureManual(GET_IMAGE_BY_ID, parameters);
    return db.extractArray(result.out_result);
}

function deleteImage(imageId, userId){
    var parameters = {};
    parameters.in_image_id = imageId;
    parameters.in_modified_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalarManual(DEL_IMAGE, parameters, 'out_result');
}