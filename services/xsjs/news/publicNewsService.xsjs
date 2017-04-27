/****** libs ************/
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var http = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var news = mapper.getNews();

/******************************************/
function processRequest() {
    http.processUserRequest(handleGet, handlePost, handlePut, handleDelete);
}

function handleGet(parameters, userId) {
	return http.notImplementedMethod();
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

function handleDelete(newsBody, userId) {
	return http.notImplementedMethod();
}

processRequest();