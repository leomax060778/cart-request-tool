$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var data = mapper.getDataReport();
var mail = mapper.getMail();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

var catalogTypeMap = {
	"1":"CATALOG_NAME",
	"2":"CATEGORY_NAME",
	"3":"SUB_CATEGORY_NAME"
};

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
	var catalogReport = data.getCatalogReport(userId);
	var result = [];
	
	if(catalogReport && catalogReport.length > 0){
		var catalogParentMap = {};
		
		//Map catalogs using its parent ID 
		catalogReport.forEach(function(catalog){
			if(!catalogParentMap[catalog.CATALOG_PARENT_ID]){
				catalogParentMap[catalog.CATALOG_PARENT_ID] = [];
			}
			catalogParentMap[catalog.CATALOG_PARENT_ID].push(catalog);
		});
		
		var catalogResult;
		
		if(catalogParentMap && catalogParentMap[0]){
			//Use each Standard Catalog
			catalogParentMap[0].forEach(function(catalog){
				//Has Categories?
				if(catalogParentMap[catalog.CATALOG_ID]){
					//Complete each category
					catalogParentMap[catalog.CATALOG_ID].forEach(function(catalogChild){
						
						catalogResult = {};
						catalogResult.CATALOG_ID = catalog.CATALOG_ID;
						catalogResult[catalogTypeMap[catalog.CATALOG_TYPE_ID]] = catalog.CATALOG_NAME;
						catalogResult[catalogTypeMap[catalogChild.CATALOG_TYPE_ID]] = catalogChild.CATALOG_NAME;
						
						//Has material?
						if(catalogChild.MATERIAL_ID){
							//Then add material data and push a new row
							catalogResult.MATERIAL_NAME = catalogChild.MATERIAL_NAME;
							catalogResult.MATERIAL_CODE = catalogChild.MATERIAL_CODE;
							
							result.push(catalogResult);
						}
						
						//Has subCategories?
						if(catalogParentMap[catalogChild.CATALOG_ID]){
							//Complete each subCategory
							catalogParentMap[catalogChild.CATALOG_ID].forEach(function(subCategory){
								catalogResult = {};
								catalogResult.CATALOG_ID = catalog.CATALOG_ID;
								catalogResult[catalogTypeMap[catalog.CATALOG_TYPE_ID]] = catalog.CATALOG_NAME;
								catalogResult[catalogTypeMap[catalogChild.CATALOG_TYPE_ID]] = catalogChild.CATALOG_NAME;
								
								catalogResult[catalogTypeMap[subCategory.CATALOG_TYPE_ID]] = subCategory.CATALOG_NAME;
								
								catalogResult.MATERIAL_NAME = subCategory.MATERIAL_NAME || null;
								catalogResult.MATERIAL_CODE = subCategory.MATERIAL_CODE || null;
								
								result.push(catalogResult);
							});
								
						}else if(!catalogChild.MATERIAL_ID){							
							result.push(catalogResult);
						}
						
					});
						
				}else{
					catalogResult = {};
					catalogResult.CATALOG_ID = catalog.CATALOG_ID;
					catalogResult[catalogTypeMap[catalog.CATALOG_TYPE_ID]] = catalog.CATALOG_NAME;
					result.push(catalogResult);
				}
			});
		}
	}
  return result;
}

function getCommodityReport(userId) {
	  return data.getCommodityReport(userId);
	}

//Get report type
function getReportType(userId) {
    return data.getReportType(userId);
}