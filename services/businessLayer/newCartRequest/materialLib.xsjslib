$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var data = mapper.getDataMaterial();
var dbHelper = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();

function getMaterialById(in_material_id, user_id){
		if(!in_material_id)	{
			throw ErrorLib.getErrors().BadRequest("The Parameter in_material_id is not found","materialService/handleGet/getMaterialById",in_material_id);
		}
		if(!user_id){	
			throw ErrorLib.getErrors().BadRequest("The Parameter user_id is not found","materialService/handleGet/getMaterialById",user_id);	
		}
		return data.getMaterialById(in_material_id); 
}

function getMaterialByCode(material_code, user_id){
	if (!user_id) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"materialService/handleGet/getMaterialByCode", user_id);
	}
	
	if (!material_code) {
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter material_code is not found",
				"materialService/handleGet/getMaterialByCode", material_code);
	}
	return data.getMaterialByCode(material_code);
}

function getMaterialByCatalogId(in_catalog_id, user_id){
		if(!in_catalog_id)	
			throw ErrorLib.getErrors().BadRequest("The Parameter in_catalog_id is not found","materialService/handleGet/getMaterialByCatalogId",in_catalog_id);	
		return data.getMaterialByCatalogId(in_catalog_id); 
}

function getManualMaterialByCatalogId(in_catalog_id, user_id){
	if(!in_catalog_id) {
		throw ErrorLib.getErrors().BadRequest("The Parameter in_catalog_id is not found","materialService/handleGet/getMaterialByCatalogId",in_catalog_id);
	}
	return data.getManualMaterialByCatalogId(in_catalog_id); 
}

function getAllMaterial(user_id){
	if(!user_id)	
		throw ErrorLib.getErrors().BadRequest("The Parameter user_id is not found","materialService/handleGet/getAllMaterial",user_id);	
	return data.getAllMaterial(user_id); 
}

function insertMaterial(objMaterial, user_id){
	if (validateInsertMaterial(objMaterial, user_id)) {
		return data.insertMaterial(objMaterial, user_id);
	}
}

function updateMaterial(objMaterial, user_id){
	if (validateUpdateMaterial(objMaterial, user_id)) {
		try{
		if (!existMaterial(objMaterial.MATERIAL_ID, user_id)) {
			throw ErrorLib.getErrors().CustomError("",
					"materialService/handlePut/updateMaterial",
					"The object Material doesn't exist");
		} else {
			var result = data.updateMaterial(objMaterial, user_id);
		}
		dbHelper.commit();
		}
		catch(e){
			dbHelper.rollback();
			throw ErrorLib.getErrors().CustomError("", e.toString(),"updateMaterial");
		}
		finally{
			dbHelper.closeConnection();
		}
		return result;

	}	
}

function deleteMaterial(material_id, user_id){
	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"teamService/handleDelete/deleteMaterial", user_id);
	if (!material_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter material_id is not found",
				"teamService/handleDelete/deleteMaterial", material_id);
	try{
		if (!existMaterial(material_id, user_id)) {
			throw ErrorLib.getErrors().CustomError("",
					"materialService/handleDelete/deleteMaterial",
					"The object Material doesn't exist");
		}else{
			var result = data.deleteMaterial(material_id, user_id);
		}
		dbHelper.commit();
	}
	catch(e){
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(),"deleteMaterial");
	}
	finally{
		dbHelper.closeConnection();
	}
	return result;
	
}

function validateInsertMaterial(objMaterial, user_id) {

	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"materialService/handlePost/insertMaterial", user_id);

	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = ["CATALOG_ID", 
	            "DESCRIPTION",
	            "CODE"];
	var optionalKeys = ["POP_UP"];

	if (!objMaterial)
		throw ErrorLib.getErrors().CustomError("",
				"materialService/handlePost/insertMaterial",
				"The object Material is not found");

	try {
		keys.forEach(function(key) {
			if (objMaterial[key] === null || objMaterial[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objMaterial[key])
				if (!isValid) {
					errors[key] = objMaterial[key];
					throw BreakException;
				}
			}
		});
		optionalKeys.forEach(function(key) {
			// validate attribute type
			isValid = validateType(key, objMaterial[key])
			if (!isValid) {
				errors[key] = objMaterial[key];
				throw BreakException;
			}
			
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("",
					"materialService/handlePost/insertMaterial", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("",
					"materialService/handlePost/insertMaterial",
					JSON.stringify(errors));
	}
	return isValid;
}

function validateUpdateMaterial(objMaterial, user_id) {

	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"materialService/handlePut/updateMaterial", user_id);

	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ "MATERIAL_ID", 
	             "CATALOG_ID", 
	             "DESCRIPTION",
	             "CODE"];
	
	var optionalKeys = ["POP_UP"];
	if (!objMaterial)
		throw ErrorLib.getErrors().CustomError("",
				"materialService/handlePut/updateMaterial",
				"The object Material is not found");

	try {
		keys.forEach(function(key) {
			if (objMaterial[key] === null || objMaterial[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objMaterial[key])
				if (!isValid) {
					errors[key] = objMaterial[key];
					throw BreakException;
				}
			}
		});
		optionalKeys.forEach(function(key) {
			// validate attribute type
			isValid = validateType(key, objMaterial[key])
			if (!isValid) {
				errors[key] = objMaterial[key];
				throw BreakException;
			}
			
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("",
					"materialService/handlePut/updateMaterial", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("",
					"materialService/handlePut/updateMaterial",
					JSON.stringify(errors));
	}
	return isValid;
}

// Check data types
function validateType(key, value) {
	var valid = true;
	switch (key) {
	case 'MATERIAL_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'CATALOG_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'DESCRIPTION':
		valid = value.length > 0 && value.length <= 1000;
		break;
	case 'POP_UP':
		valid = (!value) || (value.length > 0 && value.length <= 1000);
		break;
	case 'CODE':
		valid = value.length > 0 && value.length <= 255;
		break;
	}
	return valid;
}

function existMaterial(material_id, userId) {
	return data.getManualMaterialById(material_id, userId).length > 0;
}

function getManualMaterialById(material_id, userId){
	if (!userId)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter userId is not found",
				"materialService/handleGet/getManualMaterialById", userId);
	if (!material_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter material_id is not found",
				"materialService/handleGet/getManualMaterialById", material_id);

	return data.getManualMaterialById(material_id);
}

