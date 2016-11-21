/****** libs ************/
 $.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var http = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var material = mapper.getMaterial();

var GET_MATERIAL_BY_ID = "GET_MATERIAL_BY_ID";
var GET_MATERIAL_BY_CATALOG_ID = "GET_MATERIAL_BY_CATALOG_ID";
var GET_ALL_MATERIAL = "GET_ALL_MATERIAL";
/******************************************/
function processRequest(){
	http.processRequest(handleGet,handlePost,handlePut,handleDelete);
	}

function handleGet(objMat, user_id) {
	 var rdo = {};
	 if (objMat.length > 0) {
	  if (objMat[0].name === GET_MATERIAL_BY_ID) {
	   // get by material_id and user_id
	   rdo = material.getMaterialById(objMat[0].value,
	     user_id);
	   http.handleResponse(rdo, http.OK, http.AppJson);
	  } else if (objMat[0].name === GET_MATERIAL_BY_CATALOG_ID) {
	   // get by catalog_id and user_id
	   rdo = material.getMaterialByCatalogId(objMat[0].value,
	     user_id);
	   http.handleResponse(rdo, http.OK, http.AppJson);
	  } else if (objMat[0].name === GET_ALL_MATERIAL) {
		   // get all Material
		   rdo = material.getAllMaterial(user_id);
		   http.handleResponse(rdo, http.OK, http.AppJson);
		  } else {
	   throw ErrorLib.getErrors().BadRequest(
	     "",
	     "materialServices/handleGet",
	     "invalid parameter name (can be: GET_MATERIAL_BY_ID, GET_ALL_MATERIAL or GET_MATERIAL_BY_CATALOG_ID)"
	       + objMat[0].name);
	  }
	 }
	 http.handleResponse(rdo, http.OK, http.AppJson);
}


function handlePost(reqBody, user_id) {
	var res = material.insertMaterial(reqBody, user_id);
	return http.handleResponse(res, http.OK, http.AppJson);
}

function handlePut(reqBody, user_id) {
	var rdo =  material.updateMaterial(reqBody, user_id);
	return http.handleResponse(rdo,http.OK,http.AppJson);
	
}
function handleDelete(reqBody, user_id) {
	var rdo =  material.deleteMaterial(reqBody.MATERIAL_ID, user_id);
	return http.handleResponse(rdo,http.OK,http.AppJson);
	
}

processRequest();