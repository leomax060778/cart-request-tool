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
    		elem.DAYS_OUTSTANDING = 'N/A';
    	}
    	if(Number(elem.DAYS_OUTSTANDING) < 0){
    		elem.DAYS_OUTSTANDING = 'N/A';
    	}
    	if(elem.STATUS !== 'Approved' ){
    		elem.PURCHASE_TURN_AROUND_TIME = 'N/A';
    	}
    });
	return result;
}

//Get user report
function getUserReport(userId) {
    return data.getUserReport(userId);
}

//Get vendor report
function getVendorReport(userId) {
  return data.getVendorReport(userId);
}

function getCatalogReport(userId) {
  return data.getCatalogReport(userId);
}

function getCommodityReport(userId) {
	  return data.getCommodityReport(userId);
	}

//Get report type
function getReportType(userId) {
    return data.getReportType(userId);
}