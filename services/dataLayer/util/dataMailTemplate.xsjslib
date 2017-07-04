/** *************Import Library****************** */
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ********************************************** */

//STORE PROCEDURE LIST NAME
var GET_MAIL_TEMPLATE_BY_ID = "GET_MAIL_TEMPLATE_BY_ID";

//Get mail template by id
function getMailTemplateById(mailTemplateId, startPosition, stringLength) {
    var parameters = {};
    parameters.in_mail_template_id = mailTemplateId;
    parameters.in_start_position = startPosition;
    parameters.in_string_length = stringLength;
	var result = db.executeProcedure(GET_MAIL_TEMPLATE_BY_ID, parameters);
	var list = db.extractArray(result.out_result);
	if(list.length){
	  	   return list[0];
	} else {
	   	   return {};
	}
}