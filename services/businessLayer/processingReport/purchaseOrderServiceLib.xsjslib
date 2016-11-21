$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var purchase = mapper.getDataPurchaseOrderService();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

//Get purchase order service by request id
function getPurchaseOrderById(requestId) {
  return purchase.getPurchaseOrderById(requestId);
}

//Get purchase order service by request id
function getPurchaseOrderByIdManual(requestId) {
  return purchase.getPurchaseOrderByIdManual(requestId);
}

//Check if the Purchase Order exists
function existPurchaseOrder(requestId) {
  return getPurchaseOrderByIdManual(requestId).length > 0;
}

//Update purchase order service
function updatePurchaseOrderManual(objPurchase, userId) {
  if (validatePurchaseOrderService(objPurchase, userId)) {
	  if (!existPurchaseOrder(objPurchase.REQUEST_ID)) {
          throw ErrorLib.getErrors().CustomError("", "purchaseOrderService/handlePut/updatePurchaseOrderManual", "The object PURCHASE_ORDER_SERVICE_ID " + objPurchase.PURCHASE_ORDER_SERVICE_ID + " does not exist");
      } else {
    	  return purchase.updatePurchaseOrderManual(objPurchase, userId);
      }
  }
}

//Insert purchase order service
function insertPurchaseOrderManual(objPurchase, userId) {
  if (validatePurchaseOrderService(objPurchase, userId)) {
      return purchase.insertPurchaseOrderManual(objPurchase, userId);
  }
}

//Delete purchase order service
function deletePurchaseOrderManual(objPurchase, userId) {
	if (!existPurchaseOrder(objPurchase.REQUEST_ID)) {
          throw ErrorLib.getErrors().CustomError("", "purchaseOrderService/handleDelete/deletePurchaseOrderManual", "The object PURCHASE_ORDER_SERVICE_ID " + objPurchase.PURCHASE_ORDER_SERVICE_ID + " does not exist");
      } else {
    	  return purchase.updatePurchaseOrderManual(objPurchase, userId);
   }
}

//Validate purchase order service
function validatePurchaseOrderService(objPurchase, userId) {
  if (!userId) {
      throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "purchaseOrderService", userId);
  }
  var isValid = false;
  var errors = {};
  var BreakException = {};
  var keys = [ 'REQUEST_ID', 'SHOPPING_CART', 'CART_DATE', 'PURCHASE_ORDER_NUMBER'];
  if (objPurchase.STATUS_ID === 4){
	  keys.push("APPROVAL_DATE");
  }
  
  if (!objPurchase) {
      throw ErrorLib.getErrors().CustomError("", "purchaseOrderService", "The object Purchase is not found");
  }

  try {
      keys.forEach(function (key) {
          if (objPurchase[key] === null || objPurchase[key] === undefined) {
              errors[key] = null;
              throw BreakException;
          } else {
              // validate attribute type
              isValid = validateType(key, objPurchase[key]);
              if (!isValid) {
                  errors[key] = objPurchase[key];
                  throw BreakException;
              }
          }
      });
      isValid = true;
  } catch (e) {
      if (e !== BreakException) {
          throw ErrorLib.getErrors().CustomError("", "purchaseOrderService", e.toString());
      } else {
          throw ErrorLib.getErrors().CustomError("", "purchaseOrderService", JSON.stringify(errors));
      }
  }
  return isValid;
}

//Check data types
function validateType(key, value) {
  var valid = true;
  switch (key) {
      case 'PURCHASE_ORDER_SERVICE_ID':
    	  valid = !isNaN(value) && value > 0;
    	  break;
      case 'APPROVAL_DATE':
    	  valid = (!value) || (value.length > 0 && value.length <= 32);
    	  break;
      case 'CART_DATE':
    	  valid = (!value) || (value.length > 0 && value.length <= 32);
    	  break;
      case 'SHOPPING_CART':
          valid = !isNaN(value) && value > 0;
          break;
      case 'PURCHASE_ORDER_NUMBER':
          valid = value.length > 0 && value.length <= 127;
          break;
      case 'REQUEST_ID':
          valid = !isNaN(value) && value > 0;
          break;
  }
  return valid;
}