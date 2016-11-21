$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_PURCHASE_ORDER_SERVICE_BY_ID = "GET_PURCHASE_ORDER_SERVICE_BY_ID";
var INS_PURCHASE_ORDER_SERVICE = "INS_PURCHASE_ORDER_SERVICE";
var UPD_PURCHASE_ORDER_SERVICE = "UPD_PURCHASE_ORDER_SERVICE";
var DEL_PURCHASE_ORDER_SERVICE = "DEL_PURCHASE_ORDER_SERVICE";

function getPurchaseOrderById(requestId) {
    var parameters = {'in_request_id': requestId};
    var result = db.executeProcedure(GET_PURCHASE_ORDER_SERVICE_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

function getPurchaseOrderByIdManual(requestId) {
    var parameters = {'in_request_id': requestId};
    var result = db.executeProcedureManual(GET_PURCHASE_ORDER_SERVICE_BY_ID, parameters);
    var list = db.extractArray(result.out_result);
    if(list.length){
 	   return list[0];
    } else {
 	   	return {};
    }
}

function insertPurchaseOrderManual(objPurchase, userId) {
     var parameters = {};
     parameters.in_shopping_cart = objPurchase.SHOPPING_CART;
     parameters.in_cart_date = objPurchase.CART_DATE;
     parameters.in_purchase_order_number = objPurchase.PURCHASE_ORDER_NUMBER;
     parameters.in_approval_date = objPurchase.APPROVAL_DATE || null;
     parameters.in_request_id = objPurchase.REQUEST_ID;
     parameters.in_user_id = userId;//objPurchase.USER_ID;
     parameters.in_created_user_id = userId;//objPurchase.IN_MODIFIED_USER_ID;
     parameters.out_result = '?';
     return db.executeScalarManual(INS_PURCHASE_ORDER_SERVICE, parameters, 'out_result');
}

function updatePurchaseOrderManual(objPurchase, userId) {
	var parameters = {};
    parameters.in_shopping_cart = objPurchase.SHOPPING_CART;
    parameters.in_cart_date = objPurchase.CART_DATE;
    parameters.in_purchase_order_number = objPurchase.PURCHASE_ORDER_NUMBER;
    parameters.in_approval_date = objPurchase.APPROVAL_DATE || null;
    parameters.in_request_id = objPurchase.REQUEST_ID;
    parameters.in_modified_user_id = userId;//objPurchase.IN_MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalarManual(UPD_PURCHASE_ORDER_SERVICE, parameters, 'out_result');
}

function deletePurchaseOrderManual(objPurchase, userId) {
	var parameters = {};
    parameters.in_purchase_order_service_id = objPurchase.PURCHASE_ORDER_SERVICE_ID;
    parameters.in_modified_user_id = userId;//objPurchase.IN_MODIFIED_USER_ID;
    parameters.out_result = '?';
    return db.executeScalarManual(DEL_PURCHASE_ORDER_SERVICE, parameters, 'out_result');
}