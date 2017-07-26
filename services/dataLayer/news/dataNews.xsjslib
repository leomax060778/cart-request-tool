$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */


//STORE PROCEDURE LIST NAME
var INS_NEWS = "INS_NEWS";
var UPD_NEWS = "UPD_NEWS";
var UPD_NEWS_STATUS = "UPD_NEWS_STATUS";
var UPD_NEWS_PUBLISHED_STATUS = "UPD_NEWS_PUBLISHED_STATUS";

var DEL_NEWS = "DEL_NEWS";
var INS_READ_NEWS = "INS_READ_NEWS";

var GET_NEWS_BY_ID = "GET_NEWS_BY_ID";
var GET_NEWS_CONTENT = "GET_NEWS_CONTENT";
var GET_ALL_NEWS = "GET_ALL_NEWS";
var GET_ALL_NEWS_STATUS = "GET_ALL_NEWS_STATUS";
var GET_NEWS_CAROUSEL = "GET_NEWS_CAROUSEL";
var GET_NEWS_BY_STATUS = "GET_NEWS_BY_STATUS";
var GET_NEWS_BY_YEAR = "GET_NEWS_BY_YEAR";
var GET_NEWS_BY_STATUS_YEAR = "GET_NEWS_BY_STATUS_YEAR";
var GET_NEWS_URGENT = "GET_NEWS_URGENT";
var GET_NEWS_UNREAD = "GET_NEWS_UNREAD";

function getNewsUnreadManual(userId){
	var parameters = {};
    parameters.in_user_id = userId;
    var result = db.executeProcedureManual(GET_NEWS_UNREAD, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

function getNewsById(newsId){
    var parameters = {};
    parameters.in_news_id = newsId;
    var result = db.executeProcedure(GET_NEWS_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

function getNewsContentManual(newsId, startPosition, stringLength){
    var parameters = {};
    parameters.in_news_id = newsId;
    parameters.in_start_position = startPosition;
    parameters.in_string_length = stringLength;
    var result = db.executeProcedureManual(GET_NEWS_CONTENT, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

function getManualNewsById(newsId){
    var parameters = {'in_news_id': newsId};
    var result = db.executeProcedureManual(GET_NEWS_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

function getAllNews(){
    var rdo = db.executeProcedure(GET_ALL_NEWS, {});
    return db.extractArray(rdo.out_result);
}

function getAllNewsStatus(){
    var rdo = db.executeProcedure(GET_ALL_NEWS_STATUS, {});
    return db.extractArray(rdo.out_result);
}

//Get news with the urgent flag
function getNewsUrgent(){
    var rdo = db.executeProcedure(GET_NEWS_URGENT, {});
    return db.extractArray(rdo.out_result);
}

function getNewsCarousel(){
    var parameters = {};
    var result = db.executeProcedure(GET_NEWS_CAROUSEL, parameters);
    return db.extractArray(result.out_result);
}

function getNewsByStatus(statusId){
    var parameters = {'in_news_status_id': statusId};
    var result = db.executeProcedure(GET_NEWS_BY_STATUS, parameters);
    return db.extractArray(result.out_result);
}

function getNewsByYear(budgetYearId){
    var parameters = {};
    parameters.in_budget_year_id = budgetYearId;
    var result = db.executeProcedure(GET_NEWS_BY_YEAR, parameters);
    return db.extractArray(result.out_result);
}

function getNewsByStatusYear(objNews){
    var parameters = {};
    parameters.in_status_id = objNews.STATUS_ID;
    parameters.in_budget_year_id = objNews.BUDGET_YEAR_ID;
    var result = db.executeProcedure(GET_NEWS_BY_STATUS_YEAR, parameters);
    return db.extractArray(result.out_result);
}

function insertNewsRead(objNews, userId){
    var parameters = {};
    parameters.in_news_id = objNews.NEWS_ID;
    parameters.in_user_id = userId;
    parameters.in_created_user_id = userId;
    parameters.OUT_RESULT = '?';
    return db.executeScalar(INS_READ_NEWS, parameters, 'out_result');

}

function insertNews(objNews, userId){
    var parameters = {};
    parameters.IN_TITLE = objNews.TITLE;
    parameters.IN_DESCRIPTION = objNews.DESCRIPTION;
    parameters.IN_AUTHOR_ID = userId;
    parameters.IN_STATUS_ID = objNews.STATUS_ID;
    parameters.IN_PUBLISHED_DATE = objNews.PUBLISHED_DATE || null;
    parameters.IN_ATTACHMENT_ID = objNews.ATTACHMENT_ID || null;
    parameters.IN_URGENT = objNews.URGENT || 0;
    parameters.IN_BUDGET_YEAR_ID = objNews.BUDGET_YEAR_ID;
    parameters.IN_CREATED_USER_ID = userId;
    parameters.IN_CONTENT = objNews.CONTENT;
    parameters.OUT_RESULT = '?';
    return  db.executeScalar(INS_NEWS, parameters, 'out_result');

}


function updateNews(objNews, userId){
    var parameters = {};
    parameters.in_news_id = objNews.NEWS_ID;
    parameters.in_title = objNews.TITLE;
    parameters.in_description = objNews.DESCRIPTION;
    parameters.in_status_id = objNews.STATUS_ID;
    parameters.IN_BUDGET_YEAR_ID = objNews.BUDGET_YEAR_ID;
    parameters.in_attachment_id = objNews.ATTACHMENT_ID || null;
    parameters.in_urgent = objNews.URGENT || 0;
    parameters.in_modified_user_id = userId;
    parameters.in_content = objNews.CONTENT;
    parameters.out_result = '?';
    return db.executeScalar(UPD_NEWS, parameters, 'out_result');
}

function updateNewsStatus(objNews, userId){
    var parameters = {};
    parameters.in_news_id = objNews.NEWS_ID;
    parameters.in_status_id = objNews.STATUS_ID;
    parameters.in_modified_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalar(UPD_NEWS_STATUS, parameters, 'out_result');
}

function updateNewsStatusManual(objNews, userId){
    var parameters = {};
    parameters.in_news_id = objNews.NEWS_ID;
    parameters.in_status_id = objNews.STATUS_ID;
    parameters.in_modified_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalarManual(UPD_NEWS_STATUS, parameters, 'out_result');
}

function updateNewsPublishedStatus(objNews, userId){
	var parameters = {};
    parameters.in_news_id = objNews.NEWS_ID;
    parameters.in_status_id = objNews.STATUS_ID;
    parameters.in_modified_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalarManual(UPD_NEWS_PUBLISHED_STATUS, parameters, 'out_result');
}

function deleteNews(newsId, userId){
    var parameters = {};
    parameters.in_news_id = newsId;
    parameters.in_modified_user_id = userId;
    parameters.out_result = '?';
    return db.executeScalar(DEL_NEWS, parameters, 'out_result');
}