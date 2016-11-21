$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */


//STORE PROCEDURE LIST NAME
var INS_REQUEST_SERVICE = "INS_REQUEST_SERVICE";

function insertRequestService(objReq, user_id){
	var parameters = {};
 
	parameters.in_request_id = objReq.REQUEST_ID;
	parameters.in_currency_id = objReq.CURRENCY_ID; 
	parameters.in_purchase_order_to_uplift = objReq.PURCHASE_ORDER_TO_UPLIFT;
	parameters.in_line_to_uplift = objReq.LINE_TO_UPLIFT;
	parameters.in_purchase_order_amount = objReq.PURCHASE_ORDER_AMOUNT;
	parameters.in_sap_buyer_name = objReq.SAP_BUYER_NAME;
	parameters.in_cart_amount = objReq.CART_AMOUNT;
	parameters.in_total_budget = objReq.TOTAL_BUDGET;
	parameters.in_user_id = user_id;
	parameters.out_result = '?';
	
	return db.executeScalarManual(INS_REQUEST_SERVICE, parameters, 'out_result');
}