$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var data = mapper.getDataReport();
var mail = mapper.getMail();
var dataUserRole = mapper.getDataUserRole();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

var catalogTypeMap = {
    "1": "CATALOG_NAME",
    "2": "CATEGORY_NAME",
    "3": "SUB_CATEGORY_NAME"
};

var catalogTypeIdMap = {
	    "CATALOG": 1,
	    "CATEGORY": 2,
	    "SUB_CATEGORY": 3
};

var userRoleMap = {"SUPER_ADMIN": 1, "REQUESTER": 2, "BUSINESS_MGT": 3, "BUDGET_OWNER": 4};
var reportTypeMap = {"CART_REQUEST": 1, "USER": 2, "VENDOR": 3, "CATALOG": 4, "COMMODITY": 5};

//Validate permissions
function validatePermissionByUserRole(reportType, userId) {
    var userRole = Number(dataUserRole.getUserRoleByUserId(userId)[0].ROLE_ID);
    var result = false;
    switch (userRole) {
        case userRoleMap.SUPER_ADMIN:
            result = true;
            break;
        case userRoleMap.REQUESTER:
            if (reportType === reportTypeMap.CART_REQUEST) {
                result = true;
            }
            break;
        case userRoleMap.BUSINESS_MGT:
            result = true;
            break;
        case userRoleMap.BUDGET_OWNER:
            if (reportType === reportTypeMap.CART_REQUEST) {
                result = true;
            }
            break;
    }
    return result;
}

//Get report
function getReport(userId) {
    var result = [];
    var reportType = reportTypeMap.CART_REQUEST;
    if (validatePermissionByUserRole(reportType, userId)) {
        result = data.getReport(userId);
        result = JSON.parse(JSON.stringify(result));
        result.forEach(function (elem) {
            if (elem.RETURN_TYPE) {
                elem.MESSAGE_INFO = elem.MESSAGE_INFO + " / " + elem.RETURN_TYPE;
            }
            if (elem.STATUS !== 'In process') {
                elem.DAYS_OUTSTANDING = 'N/A';
            }
            if (Number(elem.DAYS_OUTSTANDING) < 0) {
                elem.DAYS_OUTSTANDING = 'N/A';
            }
            if (elem.STATUS !== 'Approved') {
                elem.PURCHASE_TURN_AROUND_TIME = 'N/A';
            }
            if(Number(elem.MATERIAL_CATALOG_TYPE_ID) === catalogTypeIdMap.SUB_CATEGORY){
            	elem.PRODUCT_CATALOG = elem.PRODUCT_CATEGORY;
            	elem.PRODUCT_CATEGORY = elem.PRODUCT_SUB_CATEGORY;
            	elem.PRODUCT_SUB_CATEGORY = "";
            }
        });
    } else {
    	throw ErrorLib.getErrors().Forbidden("", "reportService/handleGet/getReport", "The user does not have permission to Read/View this Report.");
    }
    return result;
}

//Get user report
function getUserReport(userId) {
    var result = [];
    var reportType = reportTypeMap.USER;
    if (validatePermissionByUserRole(reportType, userId)) {
        result = data.getUserReport(userId);
    } else {
    	throw ErrorLib.getErrors().Forbidden("", "reportService/handleGet/getReport", "The user does not have permission to Read/View this Report.");
    }
    return result;
}

//Get vendor report
function getVendorReport(userId) {
    var result = [];
    var reportType = reportTypeMap.VENDOR;
    if (validatePermissionByUserRole(reportType, userId)) {
        result = data.getVendorReport(userId);
    } else {
    	throw ErrorLib.getErrors().Forbidden("", "reportService/handleGet/getReport", "The user does not have permission to Read/View this Report.");
    }
    return result;
}

//Get catalog report
function getCatalogReport(userId) {
    var result = [];
    var reportType = reportTypeMap.CATALOG;
    if (validatePermissionByUserRole(reportType, userId)) {
        var catalogReport = data.getCatalogReport(userId);
        if (catalogReport && catalogReport.length > 0) {
            var catalogParentMap = {};

            //Map catalogs using its parent ID
            catalogReport.forEach(function (catalog) {
                if (!catalogParentMap[catalog.CATALOG_PARENT_ID]) {
                    catalogParentMap[catalog.CATALOG_PARENT_ID] = [];
                }
                catalogParentMap[catalog.CATALOG_PARENT_ID].push(catalog);
            });
            var catalogResult;
            if (catalogParentMap && catalogParentMap[0]) {
                //Use each Standard Catalog
                catalogParentMap[0].forEach(function (catalog) {
                    //Has Categories?
                    if (catalogParentMap[catalog.CATALOG_ID]) {
                        //Complete each category
                        catalogParentMap[catalog.CATALOG_ID].forEach(function (catalogChild) {

                            catalogResult = {};
                            catalogResult.CATALOG_ID = catalog.CATALOG_ID;
                            catalogResult[catalogTypeMap[catalog.CATALOG_TYPE_ID]] = catalog.CATALOG_NAME;
                            catalogResult[catalogTypeMap[catalogChild.CATALOG_TYPE_ID]] = catalogChild.CATALOG_NAME;

                            //Has material?
                            if (catalogChild.MATERIAL_ID) {
                                //Then add material data and push a new row
                                catalogResult.MATERIAL_NAME = catalogChild.MATERIAL_NAME;
                                catalogResult.MATERIAL_CODE = catalogChild.MATERIAL_CODE;

                                result.push(catalogResult);
                            }

                            //Has subCategories?
                            if (catalogParentMap[catalogChild.CATALOG_ID]) {
                                //Complete each subCategory
                                catalogParentMap[catalogChild.CATALOG_ID].forEach(function (subCategory) {
                                    catalogResult = {};
                                    catalogResult.CATALOG_ID = catalog.CATALOG_ID;
                                    catalogResult[catalogTypeMap[catalog.CATALOG_TYPE_ID]] = catalog.CATALOG_NAME;
                                    catalogResult[catalogTypeMap[catalogChild.CATALOG_TYPE_ID]] = catalogChild.CATALOG_NAME;

                                    catalogResult[catalogTypeMap[subCategory.CATALOG_TYPE_ID]] = subCategory.CATALOG_NAME;

                                    catalogResult.MATERIAL_NAME = subCategory.MATERIAL_NAME || null;
                                    catalogResult.MATERIAL_CODE = subCategory.MATERIAL_CODE || null;

                                    result.push(catalogResult);
                                });

                            } else if (!catalogChild.MATERIAL_ID) {
                                result.push(catalogResult);
                            }

                        });

                    } else {
                        catalogResult = {};
                        catalogResult.CATALOG_ID = catalog.CATALOG_ID;
                        catalogResult[catalogTypeMap[catalog.CATALOG_TYPE_ID]] = catalog.CATALOG_NAME;
                        result.push(catalogResult);
                    }
                });
            }
        }
    } else {
    	throw ErrorLib.getErrors().Forbidden("", "reportService/handleGet/getReport", "The user does not have permission to Read/View this Report.");
    }
    return result;
}

function getCommodityReport(userId) {
    var result = [];
    var reportType = reportTypeMap.COMMODITY;
    if (validatePermissionByUserRole(reportType, userId)) {
        result = data.getCommodityReport(userId);
    } else {
    	throw ErrorLib.getErrors().Forbidden("", "reportService/handleGet/getReport", "The user does not have permission to Read/View this Report.");
    }
    return result;
}

//Get report type
function getReportType(userId) {
    var reportTypeCollection = data.getReportType(userId);
    var result = [];
    reportTypeCollection.forEach(function (elem) {
    	if (validatePermissionByUserRole(Number(elem.REPORT_TYPE_ID), userId)) {
    		result.push(elem);
    	}
    });
	return result;
}