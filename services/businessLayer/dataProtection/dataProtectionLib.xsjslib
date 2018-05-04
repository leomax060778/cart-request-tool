$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var data = mapper.getDataDataProtection();
var dbHelper = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
var utilLib = mapper.getUtil();

//--------------------- OPTION ---------------------//

function getAllOption() {
    return data.getAllOption();
}

function getOptionByQuestionId(questionId) {
    return data.getAllOptionsByQuestionId(questionId);
}

function insertOption(objOption, userId) {
    if (validateInsertOption(objOption, userId)) {
        return data.insertOption(objOption, userId);
    }
}

function getOptionById(optionId, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    if (!optionId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter optionId is not found", "", optionId);
    }

    return data.getOptionById(optionId);
}

function getManualOptionById(optionId, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    if (!optionId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter optionId is not found", "", optionId);
    }

    return data.getManualOptionById(optionId);
}

function updateOption(objOption, userId) {
    if (validateUpdateOption(objOption, userId)) {
        if (!existOption(objOption.OPTION_ID, userId)) {
            throw ErrorLib.getErrors().CustomError("", "", "The object Option doesn't exist");
        }
        return data.updateOption(objOption, userId);
    }
}

function deleteOption(reqBody, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    if (!reqBody.OPTION_ID) {
        throw ErrorLib.getErrors().BadRequest("The OPTION_ID is not found", "", reqBody);
    }
    if (!existOption(reqBody.OPTION_ID, userId)) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Option doesn't exist");
    }
    return data.deleteOption(reqBody.OPTION_ID, userId);
}

function validateInsertOption(objOption, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['CONTENT'];

    if (!objOption) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Option is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objOption[key] === null || objOption[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objOption[key]);
                if (!isValid) {
                    errors[key] = objOption[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "", JSON.stringify(errors));
        }
    }
    return isValid;
}

function validateUpdateOption(objOption, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }

    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['OPTION_ID', 'CONTENT'];

    if (!objOption) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Option is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objOption[key] === null || objOption[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objOption[key]);
                if (!isValid) {
                    errors[key] = objOption[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "", JSON.stringify(errors));
        }
    }
    return isValid;
}

function existOption(optionId, userId) {
    var options = getManualOptionById(optionId, userId);
    return options.length > 0;

}

//--------------------- QUESTION ---------------------//

function getAllQuestion() {
    try {
        var questions = data.getAllQuestion();
        var newQuestions = [];
        questions.map(function (question) {
            var questionAux = cloneObject(question);
            questionAux.OPTIONS = getOptionByQuestionId(question.QUESTION_ID);
            newQuestions.push(questionAux);
        });
        return newQuestions;
    } catch (e) {
        dbHelper.rollback();
        throw ErrorLib.getErrors().CustomError("", "", e.toString());
    } finally {
        dbHelper.closeConnection();
    }
}

function getAllQuestionByCrtTypeId(crt_type_id, userId) {
    try {
        var questions = data.getAllQuestionByCrtTypeId(crt_type_id);
        var newQuestions = [];
        questions.map(function (question) {
            var questionAux = cloneObject(question);
            questionAux.OPTIONS = getOptionByQuestionId(question.QUESTION_ID);
            newQuestions.push(questionAux);
        });
        return newQuestions;
    } catch (e) {
        dbHelper.rollback();
        throw ErrorLib.getErrors().CustomError("", "", e.toString());
    } finally {
        dbHelper.closeConnection();
    }
}

function insertQuestion(objQuestion, userId) {
    if (validateInsertQuestion(objQuestion, userId)) {
        try {
            var questionId = data.insertQuestionManual(objQuestion, userId);
            (objQuestion.OPTIONS).forEach(function (option_id) {
                data.insertQuestionOption(questionId, option_id, userId);
            });
            dbHelper.commit();
            return questionId;
        } catch (e) {
            dbHelper.rollback();
            throw ErrorLib.getErrors().CustomError("", "", e.toString());
        } finally {
            dbHelper.closeConnection();
        }
    }
}

function getQuestionById(questionId, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    if (!questionId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter questionId is not found", "", questionId);
    }
    try {
        var question = data.getManualQuestionById(questionId);
        var questionElement = [];
        question = JSON.parse(JSON.stringify(question));
        question.forEach(function (element) {
            element.OPTIONS = data.getAllOptionsByQuestionId(element.QUESTION_ID);
            questionElement.push(element);
        });
        return questionElement;
    } catch (e) {
        dbHelper.rollback();
        throw ErrorLib.getErrors().CustomError("", "", e.toString());
    } finally {
        dbHelper.closeConnection();
    }
}

function getManualQuestionById(questionId, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    if (!questionId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter questionId is not found", "", questionId);
    }

    return data.getManualQuestionById(questionId);
}

function updateQuestion(objQuestion, userId) {
    if (validateUpdateQuestion(objQuestion, userId)) {
        if (!existQuestion(objQuestion.QUESTION_ID, userId)) {
            throw ErrorLib.getErrors().CustomError("", "", "The object Question doesn't exist");
        }
        try {
            var updateResult = data.updateQuestionManual(objQuestion, userId);
            updateQuestionOption(objQuestion, userId);
            dbHelper.commit();
            return updateResult;
        } catch (e) {
            dbHelper.rollback();
            throw ErrorLib.getErrors().CustomError("", "", e.toString());
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
    (options).forEach(function (option) {
        if (!(updateOptions.indexOf(option.OPTION_ID) > -1)) {
            deleteOptions.push(option.OPTION_ID);
        }
    });
    (updateOptions).forEach(function (newOption) {
        var result = true;
        (options).forEach(function (option) {
            if (!(newOption === option.OPTION_ID)) {
                result = result && true;
            } else {
                result = result && false;
            }
        });
        if (result) {
            insertOptions.push(newOption);
        }
    });
    (insertOptions).forEach(function (insertOption) {
        data.insertQuestionOption(objQuestion.QUESTION_ID, insertOption,
            userId);
    });
    (deleteOptions).forEach(function (deleteOption) {
        data.deleteQuestionOptionByOption(objQuestion.QUESTION_ID,
            deleteOption, userId);
    });

}

function deleteQuestion(objQuestion, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }
    if (!objQuestion.QUESTION_ID) {
        throw ErrorLib.getErrors().BadRequest("The QUESTION_ID is not found", "", objQuestion);
    }
    if (!existQuestion(objQuestion.QUESTION_ID, userId)) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Question doesn't exist");
    }
    return data.deleteQuestion(objQuestion.QUESTION_ID, userId);
}

function validateInsertQuestion(objQuestion, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }

    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['CONTENT', 'OPTIONS', 'SHORT_DESCRIPTION'];

    if (!objQuestion) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Question is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objQuestion[key] === null || objQuestion[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objQuestion[key]);
                if (!isValid) {
                    errors[key] = objQuestion[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "", JSON.stringify(errors));
        }
    }
    return isValid;
}

function validateUpdateQuestion(objQuestion, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "", userId);
    }

    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['QUESTION_ID', 'CONTENT', 'OPTIONS', 'SHORT_DESCRIPTION'];

    if (!objQuestion) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Question is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objQuestion[key] === null || objQuestion[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objQuestion[key]);
                if (!isValid) {
                    errors[key] = objQuestion[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "", JSON.stringify(errors));
        }
    }
    return isValid;
}

//------------- VALIDATE TYPE -------------//

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
    return questions.length > 0;

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
function getAllAttachment() {
    return data.getAllAttachment();
}

function getAttachmentById(attachmentId) {
    if (!attachmentId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter attachmentId is not found", "", attachmentId);
    }
    return data.getAttachmentById(attachmentId);
}

function getManualAttachmentById(attachmentId) {
    if (!attachmentId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter attachmentId is not found", "", attachmentId);
    }
    return data.getManualAttachmentById(attachmentId);
}

function insertAttachment(objReq, userId) {
    var keys = ["ATTACHMENT_DATA_PROTECTION_DESCRIPTION", "ATTACHMENT_ID"];
    var serviceUrl = "attachamentService/handleUpdate/updateAttachment";
    utilLib.validateObjectAttributes(objReq, userId, keys, serviceUrl, validateType);
    return data.insertAttachment(objReq, userId);
}

function updateAttachment(objReq, userId) {
    var keys = ["ATTACHMENT_DATA_PROTECTION_ID", "ATTACHMENT_DATA_PROTECTION_DESCRIPTION"];
    var serviceUrl = "attachmentService/handleUpdate/updateAttachment";
    utilLib.validateObjectAttributes(objReq, userId, keys, serviceUrl, validateType);
    validateExistAttachment(objReq.ATTACHMENT_DATA_PROTECTION_ID);
    try {
        var result = data.updateAttachment(objReq, userId);
        dbHelper.commit();
        return result;
    } catch (e) {
        dbHelper.rollback();
        throw ErrorLib.getErrors().CustomError("", e.toString(), "deleteAttachment");
    } finally {
        dbHelper.closeConnection();
    }
}

function deleteAttachment(objReq, userId) {
    var keys = ["ATTACHMENT_DATA_PROTECTION_ID"];
    var serviceUrl = "attachmentService/handleDelete/deleteAttachment";
    utilLib.validateObjectAttributes(objReq, userId, keys, serviceUrl, validateType);
    validateExistAttachment(objReq.ATTACHMENT_DATA_PROTECTION_ID);
    try {
        var result = data.deleteAttachment(objReq, userId);
        dbHelper.commit();
        return result;
    } catch (e) {
        dbHelper.rollback();
        throw ErrorLib.getErrors().CustomError("", e.toString(), "deleteAttachment");
    } finally {
        dbHelper.closeConnection();
    }
}

function validateExistAttachment(attachmentId) {
    if (!(getManualAttachmentById(attachmentId).length > 0)) {
        throw ErrorLib.getErrors().CustomError("", "", "The object Attachment is not found");
    }
}



