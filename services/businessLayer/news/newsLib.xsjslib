$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var dbHelper = mapper.getdbHelper();
var dataNews = mapper.getDataNews();
var ErrorLib = mapper.getErrors();
var userRoleLib = mapper.getUserRole();
var dataPermission = mapper.getDataPermission();

var statusMap = {
    "Pending": 1,
    "Archive": 2,
    "Published": 3
};

var roleMap = {
    SUPERADMIN: 1,
    REQUESTER: 2,
    BUSINESS_MGT: 3,
    BUDGET_OWNER: 4
};

var serviceMap = {'NEWS_MANAGER': "newsService"};
var permissionMap = {'CREATE_EDIT': 10};

function getAllNewsStatus() {
    return dataNews.getAllNewsStatus();
}

function getNewsUnread(userId) {
    try {
        var result = dataNews.getNewsUnreadManual(userId);
        result = JSON.parse(JSON.stringify(result));
        var newsTextLength = 5000;
        var splitNumber = result.CONTENT_LENGTH / newsTextLength;
        var startPosition = 1;
        var newsContent = "";
        var newsId = result.NEWS_ID;
        var i;
        for (i = 0; i < splitNumber; i++) {
            newsContent = newsContent.concat(dataNews.getNewsContentManual(newsId, startPosition, newsTextLength)[0]);
            startPosition = startPosition + newsTextLength;
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

function validateAccess(userId){
    var userRole = userRoleLib.getUserRoleByUserId(userId);

    //Check Service Role permission
    var authorized = dataPermission.checkAuthorization(userId, permissionMap.CREATE_EDIT, serviceMap.NEWS_MANAGER);

    if(!userRole || userRole.length === 0){
        throw ErrorLib.getErrors().BadRequest("Cannot find the current user Role", "newsService/handleGet/getAllNews", userId);
    }
    if(!authorized && Number(userRole[0].ROLE_ID) === roleMap.REQUESTER){
        throw ErrorLib.getErrors().BadRequest("The required News is not longer available", "newsService/handleGet/getNewsById");
    }
}

function getNewsById(newsId, userId) {
    try {
        if (!newsId) {
            throw ErrorLib.getErrors().BadRequest("The Parameter newsId is not found", "newsService/handleGet/getNewsById", newsId);
        }

        var result = dataNews.getManualNewsById(newsId);
        result = JSON.parse(JSON.stringify(result));

        if(Number(result.STATUS_ID) !== statusMap.Published){
            //Validate if the user can see the news
            validateAccess(userId);
        }

        var newsTextLength = 5000;
        var splitNumber = result.CONTENT_LENGTH / newsTextLength;
        var startPosition = 1;
        var newsContent = "";
        var i;
        for (i = 0; i < splitNumber; i++) {
            newsContent = newsContent.concat(dataNews.getNewsContentManual(newsId, startPosition, newsTextLength)[0]);
            startPosition = startPosition + newsTextLength;
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
    var newsTextLength = 5000;
    var splitNumber = result.CONTENT_LENGTH / newsTextLength;
    var startPosition = 1;
    var newsContent = "";
    var i;
    for (i = 0; i < splitNumber; i++) {
        newsContent = newsContent.concat(dataNews.getNewsContentManual(newsId, startPosition, newsTextLength)[0]);
        startPosition = startPosition + newsTextLength;
    }
    result.CONTENT = newsContent;

    return result;
}

function getAllNews(userId) {
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "newsService/handleGet/getAllNews", userId);
    }

    var userRole = userRoleLib.getUserRoleByUserId(userId);
    if(!userRole || userRole.length === 0){
        throw ErrorLib.getErrors().BadRequest("Cannot find the current user Role", "newsService/handleGet/getAllNews", userId);
    }
    var news;

    if(Number(userRole[0].ROLE_ID) === roleMap.REQUESTER){
        news = getNewsByStatus(statusMap.Published);
    }else{
        news = dataNews.getAllNews();
    }

    news = JSON.parse(JSON.stringify(news));
    news.forEach(function(elem){
        var splitNumber;
        var newsId;
        var i;
        var startPosition = 1;
        var newsTextLength = 5000;
        var newsContent = "";
        splitNumber = elem.CONTENT_LENGTH / newsTextLength;
        newsId = elem.NEWS_ID;
        for (i = 0; i < splitNumber; i++) {
            newsContent = newsContent.concat(dataNews.getNewsContentManual(newsId, startPosition, newsTextLength)[0]);
            startPosition = startPosition + newsTextLength;
        }
        elem.CONTENT = newsContent;
    });
    return news;
}

//Get news with the urgent flag
function getNewsUrgent() {
    return dataNews.getNewsUrgent();
}

function getNewsCarousel() {
    return dataNews.getNewsCarousel();
}

function getNewsByStatus(statusId, userId) {
    if (!statusId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter statusId is not found", "newsService/handleGet/getNewsByStatus", statusId);
    }
    if(Number(statusId) !== statusMap.Published){
        //Validate if the user can see the news
        validateAccess(userId);
    }

    return dataNews.getNewsByStatus(statusId);
}

function getNewsByYear(budgetYearId, userId) {
    if (!budgetYearId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter in_year is not found", "newsService/handleGet/getNewsByYear", budgetYearId);
    }

    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "newsService/handleGet/getNewsByYear", userId);
    }

    var userRole = userRoleLib.getUserRoleByUserId(userId);

    if(!userRole || userRole.length === 0){
        throw ErrorLib.getErrors().BadRequest("Cannot find the current user Role", "newsService/handleGet/getNewsByYear", userId);
    }

    var news;

    if(Number(userRole[0].ROLE_ID) === roleMap.REQUESTER){
        news = getNewsByStatusYear(statusMap.Published, budgetYearId);
    }else{
        news = dataNews.getNewsByYear(budgetYearId);
    }

    news = JSON.parse(JSON.stringify(news));
    news.forEach(function(elem){
        var splitNumber;
        var newsId;
        var i;
        var startPosition = 1;
        var newsTextLength = 5000;
        var newsContent = "";
        splitNumber = elem.CONTENT_LENGTH / newsTextLength;
        newsId = elem.NEWS_ID;
        for (i = 0; i < splitNumber; i++) {
            newsContent = newsContent.concat(dataNews.getNewsContentManual(newsId, startPosition, newsTextLength)[0]);
            startPosition = startPosition + newsTextLength;
        }
        elem.CONTENT = newsContent;
    });
    return news;
}

function getNewsByStatusYear(statusId, year) {
    if (!year) {
        throw ErrorLib.getErrors().BadRequest("The Parameter in_year is not found", "newsService/handleGet/getNewsByStatusYear", year);
    }
    if (!statusId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter statusId is not found", "newsService/handleGet/getNewsByStatusYear", statusId);
    }
    if(Number(statusId) !== statusMap.Published){
        //Validate if the user can see the news
        validateAccess(userId);
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
        var oldNews = getManualNewsById(objNews.NEWS_ID);

        if (!Object.keys(oldNews).length > 0) {
            throw ErrorLib.getErrors().CustomError("", "newsService/handlePut/updateNews", "The News with the id " + objNews.NEWS_ID + " does not exist");
        }
        if(Number(objNews.STATUS_ID) === statusMap.Published && Number(oldNews.STATUS_ID) !== statusMap.Published){
            dataNews.updateNewsPublishedStatus(objNews, userId);
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
        var oldNews = getManualNewsById(objNews.NEWS_ID);

        if (!Object.keys(oldNews).length > 0) {
            throw ErrorLib.getErrors().CustomError("",
                "newsService/handlePut/updateNewsStatus",
                "The News with the id " + objNews.NEWS_ID + " does not exist");
        } else {
            if(Number(objNews.STATUS_ID) === statusMap.Published && Number(oldNews.STATUS_ID) !== statusMap.Published){
                return dataNews.updateNewsPublishedStatus(objNews, userId);
            }else{
                return dataNews.updateNewsStatusManual(objNews, userId);
            }

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
