$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var data = mapper.getDataRequestDataProtection();
var dp = mapper.getDataDataProtection();
var ErrorLib = mapper.getErrors();

function getDataProtection(){
	try	{
		var questions = data.getAllQuestion();
		questions.forEach(function(item){
		var newData = {};
		newData = dp.getAllOptionsByQuestionId(item.question_id);
			item.OPTIONS = newData.out_result;
		});
		data.commit();
		return questions;
	}
	catch(e){
		data.rollback();
		throw ErrorLib.getErrors().CustomError("", e.toString(),"getDataProtection");
	}
}
