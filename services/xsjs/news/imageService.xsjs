/****** libs ************/
$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var http = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var image = mapper.getImage();

var GET_IMAGE_BY_ID = "GET_IMAGE_BY_ID";
var DEFAULT_IMAGE = "DEFAULT_IMAGE";

/******************************************/
function processRequest(){
    http.processRequest(handleGet,handlePost,handlePut,handleDelete);
}

/**
 *
 * @param {object} parameters
 * @param {string} parameters.GET_IMAGE_BY_ID - id of the image
 * @param userId
 * @returns {Image} Image
 */
function handleGet(parameters, userId) {
    var rdo = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_IMAGE_BY_ID) {
        	if (parameters[0].value <= 0){
        		throw ErrorLib.getErrors().BadRequest(
        	            "",
        	            "newsService/handleGet",
        	            "invalid parameter value " + parameters[0].name + " (must be a valid id)"
        	            );
        	}
            rdo = image.getImageById(parameters[0].value, userId);

        }
    }
    else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "newsService/handleGet",
            "invalid parameter name (must be GET_IMAGE_BY_ID)"
            );
    }

    return http.handleResponse(rdo, http.OK, http.AppJson);
}

//Not implemented method
function handlePost() {
    return http.notImplementedMethod();
}

/**
 *
 * @param {object} imageBody
 * @param {string} imageBody.UPDATE - edit the image with the id IMAGE_ID or edit the default image (if value = DEFAULT_IMAGE) 
 * @param {string} imageBody.IMAGE_ID - id of the image to update
 * @param {string} imageBody.IMAGE_URL - url of the image
 * @param {string} imageBody.NAME - name of the image
 * @param {string} imageBody.DESCRIPTION - description of the image
 * @param userId
 * @returns {int} count - Modified rows count
 */
function handlePut(imageBody, userId) {
    var rdo = {};
    if (imageBody.UPDATE === DEFAULT_IMAGE) {
        rdo = image.updateDefaultImage(imageBody, userId);
    }else{
        rdo = image.updateImage(imageBody, userId);
    }
    return http.handleResponse(rdo, http.OK, http.AppJson);
}

/**
 * 
 * @param {object} imageBody
 * @param {string} imageBody.IMAGE_ID - id of the image to delete
 * @param userId
 * @returns {int} count - Modified rows count
 */
function handleDelete(imageBody, userId) {
    var rdo =  image.deleteImage(imageBody.IMAGE_ID, userId);
    return http.handleResponse(rdo,http.OK,http.AppJson);

}

processRequest();

/**
 *
 * @typedef {object} Image
 * @property {string} IMAGE_ID - id of the image
 * @property {string} IMAGE_URL - url of the image
 * @property {string} NAME - name of the image
 * @property {string} DESCRIPTION - description of the image
 */