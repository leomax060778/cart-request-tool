$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var data = mapper.getDataReport();
var mail = mapper.getMail();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//Get report
function getReport(userId) {
    var result = data.getReport(userId);
    result = JSON.parse(JSON.stringify(result));
    result.forEach(function (elem){
    	if(elem.RETURN_TYPE){
    		elem.MESSAGE_INFO = elem.MESSAGE_INFO + " / " + elem.RETURN_TYPE;
    	}
    	if(elem.STATUS !== 'In process'){
    		elem.DAYS_OUTSTANDING = 'Not applicable';
    	}
    	if(Number(elem.DAYS_OUTSTANDING) < 0){
    		elem.DAYS_OUTSTANDING = 'Not Applicable';
    	}
    	if(elem.STATUS !== 'Approved' ){
    		elem.PURCHASE_TURN_AROUND_TIME = 'Not applicable';
    	}
    });
	return result;
}

//Get report type
function getReportType(userId) {
    return data.getReportType(userId);
}