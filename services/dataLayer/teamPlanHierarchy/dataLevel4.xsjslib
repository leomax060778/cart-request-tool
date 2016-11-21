$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();

var hl4Sp = {
		"create":"",
		"read": "GET_HL4_BY_HL3_ID",
		"update": "",
		"delete": ""
		};

function getHl4(parametrs){	
	var hl4_obj = db.executeProcedure(hl4Sp.read, parameters, 'out_result');
	return hl4_obj;
}