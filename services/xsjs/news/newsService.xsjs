/****** libs ************/
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var http = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var news = mapper.getNews();

var GET_NEWS_BY_ID = "GET_NEWS_BY_ID";
var GET_ALL_NEWS = "GET_ALL_NEWS";
var GET_NEWS_CAROUSEL = "GET_NEWS_CAROUSEL";
var GET_NEWS_BY_STATUS = "GET_NEWS_BY_STATUS";
var GET_NEWS_BY_YEAR = "GET_NEWS_BY_YEAR";
var GET_NEWS_BY_STATUS_YEAR = "GET_NEWS_BY_STATUS_YEAR";
var GET_NEWS_URGENT = "GET_NEWS_URGENT";
var GET_NEWS_UNREAD = "GET_NEWS_UNREAD";

var GET_ALL_NEWS_STATUS = "GET_ALL_NEWS_STATUS";
var UPD_NEWS_STATUS = "UPD_NEWS_STATUS";
var UPD_NEWS = "UPD_NEWS";

/******************************************/
function processRequest() {
    http.processRequest(handleGet, handlePost, handlePut, handleDelete);
}

/**
 *
 * @param {object} parameters
 * @param userId
 * @param {void} [parameters.GET_NEWS_BY_ID] - get news by id
 * @param {string} [parameters.GET_ALL_NEWS] - get all news
 * @param {string} [parameters.GET_NEWS_URGENT] - get all news with the urgent flag
 * @param {string} [parameters.GET_NEWS_CAROUSEL] - get the last 5 news for the carousel
 * @param {string} [parameters.GET_NEWS_BY_STATUS] - get news by status
 * @param {string} [parameters.GET_NEWS_BY_YEAR] - get news by year
 * @param {string} [parameters.GET_NEWS_BY_STATUS_YEAR] - get news by status and year
 * @param {string} [parameters.GET_ALL_NEWS_STATUS] - get all the news status
 * @param {string} [parameters.GET_NEWS_UNREAD] - get news unread
 * @returns {News} News - one or more News
 */
function handleGet(parameters, userId) {
    var res = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_NEWS_BY_ID) {
            res = news.getNewsById(parameters[0].value);

        }
        else if (parameters[0].name === GET_ALL_NEWS) {
            res = news.getAllNews();

        }
        else if (parameters[0].name === GET_NEWS_URGENT) {
            res = news.getNewsUrgent();

        }
        else if (parameters[0].name === GET_NEWS_CAROUSEL) {
            res = news.getNewsCarousel();

        }
        else if (parameters[0].name === GET_NEWS_BY_STATUS) {
            res = news.getNewsByStatus(parameters[0].value);

        }
        else if (parameters[0].name === GET_NEWS_BY_YEAR) {
            res = news.getNewsByYear(parameters[0].value);

        }
        else if (parameters[0].name === GET_NEWS_BY_STATUS_YEAR) {
            res = news.getNewsByStatusYear(parameters[1].value, parameters[2].value);

        }
        else if (parameters[0].name === GET_ALL_NEWS_STATUS) {
            res = news.getAllNewsStatus();

        }
        if (parameters[0].name === GET_NEWS_UNREAD) {
            res = news.getNewsUnread(userId);

        }
    }
    else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "newsService/handleGet",
            "invalid parameter name (can be: GET_NEWS_BY_ID, GET_ALL_NEWS, GET_NEWS_URGENT, GET_NEWS_UNREAD, GET_ALL_NEWS_BY_STATUS, GET_ALL_NEWS_BY_YEAR or GET_ALL_NEWS_BY_STATUS_YEAR)"
        );
    }

    return http.handleResponse(res, http.OK, http.AppJson);
}

/**
 *
 * @param {object} newsBody
 * @param {string} newsBody.TITLE - title of the news
 * @param {string} newsBody.DESCRIPTION - text of the news
 * @param {string} newsBody.AUTHOR_ID - author id of the news (id of the user who create the news)
 * @param {string} [newsBody.ATTACHEMT_ID] - id of the image
 * @param {int} newsBody.URGENT - is the news urgent
 * @param userId
 * @returns {string} id - Id of the new news
 */
function handlePost(newsBody, userId) {
    var res = {};
    if (newsBody.POST === "NEWS_READ") {
        res = news.newsRead(newsBody, userId);
    } else {
        res = news.insertNews(newsBody, userId);
    }
    return http.handleResponse(res, http.OK, http.AppJson);
}

/**
 *
 * @param {object} newsBody
 * @param {string} newsBody.UPDATE - name of the table to update (can be "NEWS_STATUS" or "NEWS")
 * @param {string} newsBody.NEWS_ID - id of the news to update
 * @param {string} newsBody.TITLE - New title for the news
 * @param {string} newsBody.DESCRIPTION - New description for the news
 * @param {string} [newsBody.ATTACHEMT_ID] - id of the image
 * @param {int} newsBody.URGENT - is the news urgent
 * @param userId
 * @returns {int} count - Modified rows count
 */
function handlePut(newsBody, userId) {
    var res = {};
    if (newsBody.UPDATE === "NEWS_STATUS") {
        res = news.updateNewsStatus(newsBody, userId);
    } else if (newsBody.UPDATE === "NEWS") {
        res = news.updateNews(newsBody, userId);
    } else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "newsService/handlePut",
            "invalid json (the keys must be: UPDATE, NEWS_ID, TITLE, DESCRIPTION and URGENT)"
        );
    }
    return http.handleResponse(res, http.OK, http.AppJson);
}
/**
 *
 * @param {object} newsBody
 * @param {string} newsBody.NEWS_ID - id of the news to delete
 * @param userId
 * @returns {int} count - Modified rows count
 */
function handleDelete(newsBody, userId) {
    var res = news.deleteNews(newsBody.NEWS_ID, userId);
    return http.handleResponse(res, http.OK, http.AppJson);

}

processRequest();

/**
 *
 * @typedef {object} News
 * @property {string} NEWS_ID - id of the news
 * @property {string} TITLE - title of the news
 * @property {string} DESCRIPTION - text of the news
 * @property {string} AUTHOR_ID - author id of the news (id of the user who create the news)
 * @property {string} AUTHOR_NAME - name of the author (username of the user who create the news)
 * @property {string} PUBLISHED_DATE - date on which the news was published (YYYY-MM-DD)
 * @property {string} STATUS_ID - status id of the news
 * @property {string} STATUS_NAME - name of the status
 * @property {string} UPDATE_STATUS_TZ - date on which the status was changed (YYYY-MM-DD)
 * @property {int} URGENT - is the news urgent
 */

