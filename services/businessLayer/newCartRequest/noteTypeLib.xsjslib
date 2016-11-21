$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dbHelper = mapper.getdbHelper();
var dataNoteType = mapper.getDataNoteType();
var ErrorLib = mapper.getErrors();

function getNoteTypeById(in_note_type_id, user_id){
	if(!user_id)
		throw ErrorLib.getErrors().BadRequest("The Parameter user_id is not found","noteTypeService/handleGet/getNoteTypeById",user_id);	
	if(!in_note_type_id)	
		throw ErrorLib.getErrors().BadRequest("The Parameter in_note_type_id is not found","noteTypeService/handleGet/getNoteTypeById",in_note_type_id);	
	
	return dataNoteType.getNoteTypeById(in_note_type_id); 
}

function getManualNoteTypeById(in_note_type_id, user_id){
	if(!user_id)
		throw ErrorLib.getErrors().BadRequest("The Parameter user_id is not found","noteTypeService/handleGet/getNoteTypeById",user_id);	
	if(!in_note_type_id)	
		throw ErrorLib.getErrors().BadRequest("The Parameter in_note_type_id is not found","noteTypeService/handleGet/getNoteTypeById",in_note_type_id);	
	
	return dataNoteType.getManualNoteTypeById(in_note_type_id); 
}

function getAllNoteType(user_id){
	if(!user_id)	
		throw ErrorLib.getErrors().BadRequest("The Parameter user_id is not found","noteTypeService/handleGet/getAllNoteType",user_id);	
	return dataNoteType.getAllNoteType(); 
}

function insertNoteType(objNoteType, user_id){
	var note = {};
	try{
		if(validateInsertNoteType(objNoteType, user_id)){
			note = dataNoteType.insertNoteType(objNoteType, user_id);
		}
		dbHelper.commit();
	}
	catch(e){
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(),"insertNoteType");
	}
	finally{
		dbHelper.closeConnection();
	}
	return note;
}

function existNoteType(note_type_id, user_id) {
	return getManualNoteTypeById(note_type_id, user_id).length > 0;
}

function updateNoteType(objNoteType, user_id){
	var note = {};
	try{
		if(validateUpdateNoteType(objNoteType, user_id)){
			if (!existNoteType(objNoteType.NOTE_TYPE_ID, user_id)) {
				throw ErrorLib.getErrors().CustomError("",
						"noteTypeService/handlePut/updateNoteType",
						"The object NoteType doesn't exist");
			} else {
				note = dataNoteType.updateNoteType(objNoteType, user_id);
			}
		}
		dbHelper.commit();
	}
	catch(e){
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(),"updateNoteType");
	}
	finally{
		dbHelper.closeConnection();
	}
	return note;
}

function deleteNoteType(in_note_type_id, user_id){
	if(!user_id)
		throw ErrorLib.getErrors().BadRequest("The Parameter user_id is not found","noteTypeService/handleDelete/deleteNoteType",user_id);	
	if(!in_note_type_id)
		throw ErrorLib.getErrors().BadRequest("The Parameter in_note_type_id is not found","noteTypeService/handleDelete/deleteNoteType",in_note_type_id);	
	try{
		if(!existNoteType(in_note_type_id, user_id)){
			throw ErrorLib.getErrors().CustomError("",
					"noteTypeService/handleDelete/deleteNoteType",
					"The object NoteType doesn't exist");
		}		
		else{
			var result = dataNoteType.deleteNoteType(in_note_type_id, user_id);
		}
		dbHelper.commit();
	}
	catch(e){
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(),"deleteNoteType");
	}
	finally{
		dbHelper.closeConnection();
	}
	return result;
}

function validateInsertNoteType(objNoteType, user_id) {
	
	if(!user_id)
		throw ErrorLib.getErrors().BadRequest("The Parameter user_id is not found","noteTypeService/handlePost/insertNoteType",user_id);	
	
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = ['NOTE_TYPE_NAME'];
	
	if(!objNoteType)
		throw ErrorLib.getErrors().CustomError("","noteTypeService/handlePost/insertNoteType","The object NoteType is not found");
	
	try {
		keys.forEach(function(key) {
			if (objNoteType[key] === null || objNoteType[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objNoteType[key])
				if (!isValid) {
					errors[key] = objNoteType[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("", "noteTypeService/handlePost/insertNoteType", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("", "noteTypeService/handlePost/insertNoteType",JSON.stringify(errors));
	}
	return isValid;
}

function validateUpdateNoteType(objNoteType, user_id) {
	
	if(!user_id)
		throw ErrorLib.getErrors().BadRequest("The Parameter user_id is not found","noteTypeService/handlePut/updateNoteType",user_id);	
	
	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = ['NOTE_TYPE_ID',
	            'NOTE_TYPE_NAME'];
	
	if(!objNoteType)
		throw ErrorLib.getErrors().CustomError("","noteTypeService/handlePut/updateNoteType","The object NoteType is not found");
	
	try {
		keys.forEach(function(key) {
			if (objNoteType[key] === null || objNoteType[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objNoteType[key])
				if (!isValid) {
					errors[key] = objNoteType[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("", "noteTypeService/handlePut/updateNoteType", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("", "noteTypeService/handlePut/updateNoteType",JSON.stringify(errors));
	}
	return isValid;
}

//Check data types
function validateType(key, value) {
	var valid = true;
	switch (key) {
	case 'NOTE_TYPE_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'NOTE_TYPE_NAME':
		valid = value.length > 0 && value.length <= 255;
		break;
}
	return valid;
}