/****** libs ************/
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var http = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var news = mapper.getNews();

var GET_NEWS_UNREAD = "GET_NEWS_UNREAD";
var service_name = "newsViewerService";

/******************************************/
function processRequest() {
    http.processRequest(handleGet, handlePost, handlePut, handleDelete, false, service_name);
}

/**
 *
 * @param {object} parameters
 * @param userId
 * @param {string} [parameters.GET_NEWS_UNREAD] - get news unread
 * @returns {News} News - one or more News
 */
function handleGet(parameters, userId) {
    var res = {};
    if (parameters.length > 0) {    
        if (parameters[0].name === GET_NEWS_UNREAD) {
            res = news.getNewsUnread(userId);
        }
    }
    else {
        throw ErrorLib.getErrors().BadRequest(
            "",
            "newsService/handleGet",
            "invalid parameter name (can be: GET_NEWS_UNREAD)"
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
    	throw ErrorLib.getErrors().BadRequest(
                "",
                "newsViewerService/handlePost",
                "invalid POST)"
            );
    }
    return http.handleResponse(res, http.OK, http.AppJson);
}

function handlePut(newsBody, userId) {
	return http.notImplementedMethod();
}
/**
 *
 * @param {object} newsBody
 * @param {string} newsBody.NEWS_ID - id of the news to delete
 * @param userId
 * @returns {int} count - Modified rows count
 */
function handleDelete(newsBody, userId) {
	return http.notImplementedMethod();
}

processRequest();

