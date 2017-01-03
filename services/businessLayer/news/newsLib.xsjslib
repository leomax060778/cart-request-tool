$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dbHelper = mapper.getdbHelper();
var dataNews = mapper.getDataNews();
var ErrorLib = mapper.getErrors();

function getAllNewsStatus() {
    return dataNews.getAllNewsStatus();
}

function getNewsUnread(userId) {
	try {
	    var result = dataNews.getNewsUnreadManual(userId);
	    result = JSON.parse(JSON.stringify(result));
	    var newTextLength = 5000;
	    var splitNumber = result.CONTENT_LENGTH / newTextLength;
	    var startPosition = 1;
	    var newsContent = "";
	    var newsId = result.NEWS_ID;
	    for (var i = 0; i < splitNumber; i++) {
	        newsContent = newsContent.concat(dataNews.getNewsContentManual(newsId, startPosition, newTextLength)[0]);
	        startPosition = startPosition + newTextLength;
	    }
	    result.CONTENT = newsContent;
	    dbHelper.commit();
	} catch (e) {
		dbHelper.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(), "getNewsUnread");
	} finally {
		dbHelper.closeConnection();
	}
	return [result];
}

function getNewsById(newsId) {
    try {
        if (!newsId) {
            throw ErrorLib.getErrors().BadRequest("The Parameter newsId is not found", "newsService/handleGet/getNewsById", newsId);
        }
        var result = dataNews.getManualNewsById(newsId);
        result = JSON.parse(JSON.stringify(result));
        var newTextLength = 5000;
        var splitNumber = result.CONTENT_LENGTH / newTextLength;
        var startPosition = 1;
        var newsContent = "";
        for (var i = 0; i < splitNumber; i++) {
            newsContent = newsContent.concat(dataNews.getNewsContentManual(newsId, startPosition, newTextLength)[0]);
            startPosition = startPosition + newTextLength;
        }
        result.CONTENT = newsContent;
        dbHelper.commit();
    } catch (e) {
        dbHelper.rollback();
        throw ErrorLib.getErrors().CustomError("", e.toString(),
            "getNewsById");
    } finally {
        dbHelper.closeConnection();
    }
    return result;
}

function getManualNewsById(newsId) {
    if (!newsId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter newsId is not found", "newsService/handleGet/getNewsById", newsId);
    }
    if (!newsId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter newsId is not found", "newsService/handleGet/getNewsById", newsId);
    }
    var result = dataNews.getManualNewsById(newsId);
    result = JSON.parse(JSON.stringify(result));
    var newTextLength = 5000;
    var splitNumber = result.CONTENT_LENGTH / newTextLength;
    var startPosition = 1;
    var newsContent = "";
    for (var i = 0; i < splitNumber; i++) {
        newsContent = newsContent.concat(dataNews.getNewsContentManual(newsId, startPosition, newTextLength)[0]);
        startPosition = startPosition + newTextLength;
    }
    result.CONTENT = newsContent;

    return result;
}

function getAllNews() {
    return dataNews.getAllNews();
}

//Get news with the urgent flag
function getNewsUrgent() {
    return dataNews.getNewsUrgent();
}

function getNewsCarousel() {
    return dataNews.getNewsCarousel();
}

function getNewsByStatus(statusId) {
    if (!statusId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter statusId is not found", "newsService/handleGet/getNewsByStatus", statusId);
    }
    return dataNews.getNewsByStatus(statusId);
}

function getNewsByYear(budgetYearId) {
    if (!budgetYearId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter in_year is not found", "newsService/handleGet/getNewsByYear", budgetYearId);
    }
    return dataNews.getNewsByYear(budgetYearId);
}

function getNewsByStatusYear(statusId, year) {
    if (!year) {
        throw ErrorLib.getErrors().BadRequest("The Parameter in_year is not found", "newsService/handleGet/getNewsByStatusYear", year);
    }
    if (!statusId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter statusId is not found", "newsService/handleGet/getNewsByStatusYear", statusId);
    }
    var objNews = {};
    objNews.BUDGET_YEAR_ID = year;
    objNews.STATUS_ID = statusId;
    return dataNews.getNewsByStatusYear(objNews);
}

function newsRead(objNews, userId) {
    if (!objNews.NEWS_ID) {
        throw ErrorLib.getErrors().BadRequest("The Parameter NEWS_ID is not found", "newsService/handlePost/newsRead", "");
    }
    return dataNews.insertNewsRead(objNews, userId);
}

function insertNews(objNews, userId) {
    if (validateInsertNews(objNews, userId)) {
        return dataNews.insertNews(objNews, userId);
    }
}

function existNews(newsId) {
    return Object.keys(getManualNewsById(newsId)).length > 0;
}

function updateNews(objNews, userId) {
    if (validateUpdateNews(objNews, userId)) {
        if (!existNews(objNews.NEWS_ID)) {
            throw ErrorLib.getErrors().CustomError("", "newsService/handlePut/updateNews", "The News with the id " + objNews.NEWS_ID + " does not exist");
        }
        return dataNews.updateNews(objNews, userId);
    }
}

function updateNewsStatus(objNews, userId) {
    if (!(Array.isArray(objNews.NEWS_STATUS) && objNews.NEWS_STATUS.length > 0)) {
        throw ErrorLib.getErrors().BadRequest("The Parameter news elements is not found", "newsService/handlePut/updateNewsStatus", objNews);
    }
    try {
        (objNews.NEWS_STATUS).forEach(function (news) {
            updateSingleNewsStatus(news, userId);
        });
        dbHelper.commit();
    } catch (e) {
        dbHelper.rollback();
        throw ErrorLib.getErrors().CustomError("", e.toString(), "insertVendor");
    }
    finally {
        dbHelper.closeConnection();
    }
    return {};
}

function updateSingleNewsStatus(objNews, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "newsService/handlePut/updateNewsStatus", userId);
    }
    if (!objNews.STATUS_ID) {
        throw ErrorLib.getErrors().BadRequest("The Parameter STATUS_ID is not found", "newsService/handlePut/updateNewsStatus", objNews.STATUS_ID);
    }
    if (validateUpdateNewsStatus(objNews, userId)) {
        if (!existNews(objNews.NEWS_ID, userId)) {
            throw ErrorLib.getErrors().CustomError("",
                "newsService/handlePut/updateNewsStatus",
                "The News with the id " + objNews.NEWS_ID + " does not exist");
        } else {
            return dataNews.updateNewsStatusManual(objNews, userId);
        }
    }
}

function deleteNews(newsId, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "newsService/handleDelete/deleteNews", userId);
    }
    if (!newsId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter newsId is not found", "newsService/handleDelete/deleteNews", newsId);
    }
    if (!existNews(newsId, userId)) {
        throw ErrorLib.getErrors().CustomError("", "newsService/handleDelete/deleteNews", "The News with the id " + newsId + " does not exist");
    } else {
        return dataNews.deleteNews(newsId, userId);
    }
}

function validateInsertNews(objNews, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "newsService/handlePost/insertNews", userId);
    }
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['TITLE',
        'DESCRIPTION',
        'STATUS_ID',
        'CONTENT'
    ];

    var optionalKeys = ['ATTACHMENT_ID', 'URGENT'];

    if (!objNews) {
        throw ErrorLib.getErrors().CustomError("", "newsService/handlePost/insertNews", "The object News is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objNews[key] === null || objNews[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objNews[key]);
                if (!isValid) {
                    errors[key] = objNews[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "newsService/handlePost/insertNews", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "newsService/handlePost/insertNews", JSON.stringify(errors));
        }
    }
    if (objNews.ATTACHMENT_ID || objNews.URGENT) {
        optionalKeys.forEach(function (key) {
            // validate attribute type
            isValid = validateType(key, objNews[key]);
            if (!isValid) {
                errors[key] = objNews[key];
                throw BreakException;
            }
        });
        isValid = true;
    }
    return isValid;
}

function validateUpdateNews(objNews, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "newsService/handlePut/updateNews", userId);
    }

    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['NEWS_ID',
        'TITLE',
        'DESCRIPTION',
        'STATUS_ID',
        'CONTENT'
    ];

    var optionalKeys = ['ATTACHMENT_ID', 'URGENT'];

    if (!objNews) {
        throw ErrorLib.getErrors().CustomError("", "newsService/handlePut/updateNews", "The object News is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objNews[key] === null || objNews[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objNews[key]);
                if (!isValid) {
                    errors[key] = objNews[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "newsService/handlePut/updateNews", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "newsService/handlePut/updateNews", JSON.stringify(errors));
        }
    }
    if (objNews.ATTACHMENT_ID || objNews.URGENT) {
        optionalKeys.forEach(function (key) {
            // validate attribute type
            isValid = validateType(key, objNews[key]);
            if (!isValid) {
                errors[key] = objNews[key];
                throw BreakException;
            }
        });
        isValid = true;
    }
    return isValid;
}

function validateUpdateNewsStatus(objNews, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "newsService/handlePut/updateNewsStatus", userId);
    }

    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['NEWS_ID',
        'STATUS_ID'
    ];

    if (!objNews) {
        throw ErrorLib.getErrors().CustomError("", "newsService/handlePut/updateNewsStatus", "The object News is not found");
    }

    try {
        keys.forEach(function (key) {
            if (objNews[key] === null || objNews[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objNews[key]);
                if (!isValid) {
                    errors[key] = objNews[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException) {
            throw ErrorLib.getErrors().CustomError("", "newsService/handlePut/updateNewsStatus", e.toString());
        }
        else {
            throw ErrorLib.getErrors().CustomError("", "newsService/handlePut/updateNewsStatus", JSON.stringify(errors));
        }
    }
    return isValid;
}

//Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'NEWS_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'TITLE':
            valid = value.length > 0 && value.length <= 255;
            break;
        case 'DESCRIPTION':
            valid = value.length > 0 && value.length <= 2000;
            break;
        case 'AUTHOR_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'ATTACHMENT_ID':
            valid = (!value) || (!isNaN(value) && value > 0);
            break;
        case 'URGENT':
            valid = (!value) || !isNaN(value);
            break;
        case 'STATUS_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'CONTENT':
            valid = (value && value.length > 0);
            break;
    }
    return valid;
}

function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
}
