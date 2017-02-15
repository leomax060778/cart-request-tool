$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var data = mapper.getDataDataProtection();
var dbHelper = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
var utilLib = mapper.getUtil();

/--------------------- OPTION ---------------------/

function getAllOption() {
	return data.getAllOption();
}

function getOptionByQuestionId(questionId) {
	return data.getAllOptionsByQuestionId(questionId);
}

function insertOption(objOption, user_id) {
	if (validateInsertOption(objOption, user_id)) {
		return data.insertOption(objOption, user_id);
	}
}
function getOptionById(option_id, user_id) {
	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"OptionService/handleGet/getOptionById", user_id);
	if (!option_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter option_id is not found",
				"OptionService/handleGet/getOptionById", option_id);

	return data.getOptionById(option_id);
}

function getManualOptionById(option_id, user_id) {
	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"OptionService/handleGet/getOptionById", user_id);
	if (!option_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter option_id is not found",
				"OptionService/handleGet/getOptionById", option_id);

	return data.getManualOptionById(option_id);
}

function updateOption(objOption, user_id) {
	if (validateUpdateOption(objOption, user_id)) {
		if (!existOption(objOption.OPTION_ID, user_id)) {
			throw ErrorLib.getErrors().CustomError("",
					"OptionService/handlePut/updateOption",
					"The object Option doesn't exist");
		}
		return data.updateOption(objOption, user_id);
	}
}

function deleteOption(reqBody, user_id) {
	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"OptionService/handleDelete/deleteOption", user_id);
	if (!reqBody.OPTION_ID)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter option_id is not found",
				"OptionService/handleDelete/deleteOption", option_id);
	if (!existOption(reqBody.OPTION_ID, user_id)) {
		throw ErrorLib.getErrors().CustomError("",
				"OptionService/handleDelete/deleteOption",
				"The object Option doesn't exist");
	}
	return data.deleteOption(reqBody.OPTION_ID, user_id);
}

function validateInsertOption(objOption, user_id) {

	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"OptionService/handlePost/insertOption", user_id);

	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ 'CONTENT' ];

	if (!objOption)
		throw ErrorLib.getErrors().CustomError("",
				"OptionService/handlePost/insertOption",
				"The object Option is not found");

	try {
		keys.forEach(function(key) {
			if (objOption[key] === null || objOption[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objOption[key])
				if (!isValid) {
					errors[key] = objOption[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("",
					"OptionService/handlePost/insertOption", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("",
					"OptionService/handlePost/insertOption",
					JSON.stringify(errors));
	}
	return isValid;
}

function validateUpdateOption(objOption, user_id) {

	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"OptionService/handlePut/updateOption", user_id);

	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ 'OPTION_ID', 'CONTENT' ];

	if (!objOption)
		throw ErrorLib.getErrors().CustomError("",
				"OptionService/handlePut/updateOption",
				"The object Option is not found");

	try {
		keys.forEach(function(key) {
			if (objOption[key] === null || objOption[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objOption[key])
				if (!isValid) {
					errors[key] = objOption[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("",
					"OptionService/handlePut/updateOption", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("",
					"OptionService/handlePut/updateOption",
					JSON.stringify(errors));
	}
	return isValid;
}

function existOption(optionId, userId) {
	var options = getManualOptionById(optionId, userId);
	if (options.length > 0) {
		return true;
	}
	return false;
}

/--------------------- QUESTION ---------------------/

function getAllQuestion() {
	try {
		var questions = data.getAllQuestion();
		var newQuestions = [];
		questions.map(function(question) {
			var questionAux = cloneObject(question);
			questionAux.OPTIONS = getOptionByQuestionId(question.QUESTION_ID);
			newQuestions.push(questionAux);
		});
		return newQuestions;
	} catch (e) {
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(),
				"insertQuestion");
	} finally {
		dbHelper.closeConnection();
	}
}

function getAllQuestionByCrtTypeId(crt_type_id, user_id) {
	try {
		var questions = data.getAllQuestionByCrtTypeId(crt_type_id);
		var newQuestions = [];
		questions.map(function(question) {
			var questionAux = cloneObject(question);
			questionAux.OPTIONS = getOptionByQuestionId(question.QUESTION_ID);
			newQuestions.push(questionAux);
		});
		return newQuestions;
	} catch (e) {
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(),
				"insertQuestion");
	} finally {
		dbHelper.closeConnection();
	}
}

function insertQuestion(objQuestion, user_id) {
	if (validateInsertQuestion(objQuestion, user_id)) {
		try {
			var questionId = data.insertQuestionManual(objQuestion, user_id);
			(objQuestion.OPTIONS).forEach(function(option_id) {
				data.insertQuestionOption(questionId, option_id, user_id);
			});
			dbHelper.commit();
			return questionId;
		} catch (e) {
			dbHelper.rollback();
			throw ErrorLib.getErrors().CustomError("", e.toString(),
					"insertQuestion");
		} finally {
			dbHelper.closeConnection();
		}
	}
}
function getQuestionById(question_id, user_id) {
	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"QuestionService/handleGet/getQuestionById", user_id);
	if (!question_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter question_id is not found",
				"QuestionService/handleGet/getQuestionById", question_id);
	try {
		var question = data.getManualQuestionById(question_id);
		var questionElement = [];
		(question).forEach(function(element) {
			var questionAux = cloneObject(element);
			questionAux.OPTIONS = data.getAllOptionsByQuestionId(element.QUESTION_ID);
			questionElement.push(questionAux);
		});
		return questionElement;
	} catch (e) {
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(),
				"insertQuestion");
	} finally {
		dbHelper.closeConnection();
	}
}

function getManualQuestionById(question_id, user_id) {
	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"QuestionService/handleGet/getQuestionById", user_id);
	if (!question_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter question_id is not found",
				"QuestionService/handleGet/getQuestionById", question_id);

	return data.getManualQuestionById(question_id);
}

function updateQuestion(objQuestion, user_id) {
	if (validateUpdateQuestion(objQuestion, user_id)) {
		try {
			if (!existQuestion(objQuestion.QUESTION_ID, user_id)) {
				throw ErrorLib.getErrors().CustomError("",
						"QuestionService/handlePut/updateQuestion",
						"The object Question doesn't exist");
			}
			var updateResult = data.updateQuestionManual(objQuestion, user_id);
			updateQuestionOption(objQuestion, user_id)
			dbHelper.commit();
			return updateResult;
		} catch (e) {
			dbHelper.rollback();
			throw ErrorLib.getErrors().CustomError("", e.toString(),
					"updateQuestion");
		} finally {
			dbHelper.closeConnection();
		}
	}
}

// QUESTION - OPTION
function updateQuestionOption(objQuestion, userId) {
	var options = getOptionByQuestionId(objQuestion.QUESTION_ID);	
	var updateOptions = objQuestion.OPTIONS;
	var insertOptions = [];
	var deleteOptions = [];
	(options).forEach(function(option) {
		if (!(updateOptions.indexOf(option.OPTION_ID) > -1)) {
			deleteOptions.push(option.OPTION_ID);
		}
	});
	(updateOptions).forEach(function(newOption) {
		var result = true;
		(options).forEach(function(option) {
			if (!(newOption === option.OPTION_ID)) {
				result = result && true;
			} else {
				result = result && false;
			}
		});
		if(result){
			insertOptions.push(newOption);
		}
	});
	(insertOptions).forEach(function(insertOption) {
		data.insertQuestionOption(objQuestion.QUESTION_ID, insertOption,
						userId);
	});
	(deleteOptions).forEach(function(deleteOption) {
		data.deleteQuestionOptionByOption(objQuestion.QUESTION_ID,
				deleteOption, userId);
	});
	
}

function deleteQuestion(objQuestion, user_id) {
	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"QuestionService/handleDelete/deleteQuestion", user_id);
	if (!objQuestion.QUESTION_ID)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter question_id is not found",
				"QuestionService/handleDelete/deleteQuestion", question_id);
	if (!existQuestion(objQuestion.QUESTION_ID, user_id)) {
		throw ErrorLib.getErrors().CustomError("",
				"QuestionService/handlePut/questionOption",
				"The object Question doesn't exist");
	}
	return data.deleteQuestion(objQuestion.QUESTION_ID, user_id);
}

function validateInsertQuestion(objQuestion, user_id) {

	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"QuestionService/handlePost/insertQuestion", user_id);

	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ 'CONTENT', 'OPTIONS', 'SHORT_DESCRIPTION' ];

	if (!objQuestion)
		throw ErrorLib.getErrors().CustomError("",
				"QuestionService/handlePost/insertQuestion",
				"The object Question is not found");

	try {
		keys.forEach(function(key) {
			if (objQuestion[key] === null || objQuestion[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objQuestion[key])
				if (!isValid) {
					errors[key] = objQuestion[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("",
					"QuestionService/handlePost/insertQuestion", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("",
					"QuestionService/handlePost/insertQuestion",
					JSON.stringify(errors));
	}
	return isValid;
}

function validateUpdateQuestion(objQuestion, user_id) {

	if (!user_id)
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter user_id is not found",
				"QuestionService/handlePut/updateQuestion", user_id);

	var isValid = false;
	var errors = {};
	var BreakException = {};
	var keys = [ 'QUESTION_ID', 'CONTENT', 'OPTIONS', 'SHORT_DESCRIPTION' ];

	if (!objQuestion)
		throw ErrorLib.getErrors().CustomError("",
				"QuestionService/handlePut/updateQuestion",
				"The object Question is not found");

	try {
		keys.forEach(function(key) {
			if (objQuestion[key] === null || objQuestion[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, objQuestion[key])
				if (!isValid) {
					errors[key] = objQuestion[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException)
			throw ErrorLib.getErrors().CustomError("",
					"QuestionService/handlePut/updateQuestion", e.toString());
		else
			throw ErrorLib.getErrors().CustomError("",
					"QuestionService/handlePut/updateQuestion",
					JSON.stringify(errors));
	}
	return isValid;
}

/------------- VALIDATE TYPE -------------/

// Check data types
function validateType(key, value) {
	var valid = true;
	switch (key) {
	case 'OPTION_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'QUESTION_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'CONTENT':
		valid = value.length > 0 && value.length <= 512;
		break;
	case 'DESCRIPTION':
		valid = value.length > 0 && value.length <= 1000;
		break;
	case 'CREATED_USER_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'MODIFIED_USER_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'OPTIONS':
		valid = Array.isArray(value) && value.length > 0;
		break;
	case 'SHORT_DESCRIPTION':
		valid = value.length > 0 && value.length <= 255;
		break;
	case 'ATTACHMENT_DATA_PROTECTION_ID':
		valid = !isNaN(value) && value > 0;
		break;
	case 'ATTACHMENT_DATA_PROTECTION_DESCRIPTION':
		valid = value.length > 0 && value.length <= 255;
		break;
	}
	return valid;
}

function existQuestion(questionId, userId) {
	var questions = getManualQuestionById(questionId, userId);
	if (questions.length > 0) {
		return true;
	}
	return false;
}

function cloneObject(original) {
	var clone = {};
	var key;
	for (key in original) {
		clone[key] = original[key];
	}
	return clone;
}

//ATTACHMENT DATA PROTECTION
function getAllAttachment(){
	return data.getAllAttachment();
}

function getAttachmentById(attachmentId){
	if (!attachmentId){
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter question_id is not found",
				"attachmentService/handleGet/getAttachmentById", attachmentId);
	}
	return data.getAttachmentById(attachmentId);
}

function getManualAttachmentById(attachmentId){
	if (!attachmentId){
		throw ErrorLib.getErrors().BadRequest(
				"The Parameter question_id is not found",
				"attachmentService/handleGet/getManualAttachmentById", attachmentId);
	}
	return data.getManualAttachmentById(attachmentId);
}

function insertAttachment(objReq, userId){
	var keys = ["ATTACHMENT_DATA_PROTECTION_DESCRIPTION", "ATTACHMENT_ID"];
	var serviceUrl = "attachamentService/handleUpdate/updateAttachment";
	utilLib.validateObjectAttributes(objReq, userId,keys, serviceUrl, validateType);
	return data.insertAttachment(objReq, userId);
}

function updateAttachment(objReq, userId){
	var keys = ["ATTACHMENT_DATA_PROTECTION_ID", "ATTACHMENT_DATA_PROTECTION_DESCRIPTION"];
	var serviceUrl = "attachamentService/handleUpdate/updateAttachment";
	utilLib.validateObjectAttributes(objReq, userId,keys, serviceUrl, validateType);
	validateExistAttachment(objReq.ATTACHMENT_DATA_PROTECTION_ID);
	try{
		var result = data.updateAttachment(objReq, userId);
		dbHelper.commit();
		return result;
	} catch (e) {
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(),"deleteAttachment");
	} finally {
		dbHelper.closeConnection();
	}
}

function deleteAttachment(objReq, userId){
	var keys = ["ATTACHMENT_DATA_PROTECTION_ID"];
	var serviceUrl = "attachamentService/handleDelete/deleteAttachment";
	utilLib.validateObjectAttributes(objReq, userId,keys, serviceUrl, validateType);
	validateExistAttachment(objReq.ATTACHMENT_DATA_PROTECTION_ID);
	try{
		var result = data.deleteAttachment(objReq, userId);
		dbHelper.commit();
		return result;
	} catch (e) {
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(),"deleteAttachment");
	} finally {
		dbHelper.closeConnection();
	}
}

function validateExistAttachment(attachmentId){
	if(!(getManualAttachmentById(attachmentId).length > 0)){
		throw ErrorLib.getErrors().CustomError("",
				"attachmentService",
				"The object Attachement is not found");
	}
}



