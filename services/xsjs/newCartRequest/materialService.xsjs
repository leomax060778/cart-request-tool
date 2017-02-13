/****** libs ************/
 $.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var http = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var material = mapper.getMaterial();

var GET_MATERIAL_BY_ID = "GET_MATERIAL_BY_ID";
var GET_MATERIAL_BY_CODE = "GET_MATERIAL_BY_CODE";
var GET_MATERIAL_BY_NAME = "GET_MATERIAL_BY_NAME";
var GET_MATERIAL_BY_CATALOG_ID = "GET_MATERIAL_BY_CATALOG_ID";
var GET_ALL_MATERIAL = "GET_ALL_MATERIAL";
/******************************************/

var service_name = "materialService";

function processRequest(){
	http.processRequest3(handleGet,handlePost,handlePut,handleDelete, false, service_name);
	}

function handleGet(objMat, user_id) {
	 var res = {};
	 if (objMat.length > 0) {
	  if (objMat[0].name === GET_MATERIAL_BY_ID) {
	   // get by material_id and user_id
	   res = material.getMaterialById(objMat[0].value, user_id);
	  } else if (objMat[0].name === GET_MATERIAL_BY_CATALOG_ID) {
	   // get by catalog_id and user_id
	   res = material.getMaterialByCatalogId(objMat[0].value, user_id);
	  } else if (objMat[0].name === GET_MATERIAL_BY_CODE) {
		   // get by material_code and user_id
		   res = material.getMaterialByCode(objMat[0].value, user_id);
	  } else if (objMat[0].name === GET_MATERIAL_BY_NAME) {
		   // get by name
		   res = material.getMaterialByName(objMat[0].value, user_id);
	  } else if (objMat[0].name === GET_ALL_MATERIAL) {
		   // get all Material
		   res = material.getAllMaterial(user_id);
		  } else {
	   throw ErrorLib.getErrors().BadRequest(
	     "",
	     "materialServices/handleGet",
	     "invalid parameter name (can be: GET_MATERIAL_BY_ID, GET_ALL_MATERIAL, GET_MATERIAL_BY_NAME, GET_MATERIAL_BY_CODE or GET_MATERIAL_BY_CATALOG_ID)"
	       + objMat[0].name);
	  }
	 } else {
		   throw ErrorLib.getErrors().BadRequest(
				     "",
				     "materialServices/handleGet",
				     "invalid parameter name (can be: GET_MATERIAL_BY_ID, GET_ALL_MATERIAL, GET_MATERIAL_BY_NAME, GET_MATERIAL_BY_CODE or GET_MATERIAL_BY_CATALOG_ID)");
	 }
	 http.handleResponse(res, http.OK, http.AppJson);
}


function handlePost(reqBody, user_id) {
	var res = material.insertMaterial(reqBody, user_id);
	return http.handleResponse(res, http.OK, http.AppJson);
}

function handlePut(reqBody, user_id) {
	var res =  material.updateMaterial(reqBody, user_id);
	return http.handleResponse(res,http.OK,http.AppJson);
	
}
function handleDelete(reqBody, user_id) {
	var res =  material.deleteMaterial(reqBody.MATERIAL_ID, user_id);
	return http.handleResponse(res,http.OK,http.AppJson);
	
}

processRequest();