$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var request = mapper.getCartRequest();
var service = mapper.getService();
var purchase = mapper.getPurchaseOrderService();
var requestService = mapper.getRequest();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_ALL_REQUEST = "GET_ALL_REQUEST";
var GET_REQUEST_PROCESSING_REPORT_BY_ID = "GET_REQUEST_PROCESSING_REPORT_BY_ID";
var statusMap = {'TO_BE_CHECKED': 1, 'CHECKED': 2, 'IN_PROCESS': 3, 'RETURN_TO_REQUESTER': 4, 'APPROVED': 5, 'CANCELLED': 6};

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete);
}

function handleGet(parameters) {
    var res = {};
    if (parameters.length > 0) {
        if (parameters[0].name === GET_ALL_REQUEST) {
            res = request.getAllCartRequest();
        } else if (parameters[0].name === GET_REQUEST_PROCESSING_REPORT_BY_ID) {
          	if (parameters[0].value <= 0 || isNaN(parameters[0].value)){
                throw ErrorLib.getErrors().BadRequest(
                    "",
                    "cartRequestService/handleGet",
                    "invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (must be a valid id)"
                );
            } else {
             	var resReqService = requestService.getRequestServiceByRequestId(parameters[0].value);
             	var resService = requestService.getServicesByRequestId(parameters[0].value);
	            var resNote = requestService.getNoteRequestByRequestId(parameters[0].value);
	            var resRequest = request.getRequestById(parameters[0].value);
	            var resDataProtection = request.getRequestDataProtection(parameters[0].value);
	            var resPurchase = purchase.getPurchaseOrderByIdManual(parameters[0].value);
	            res = {'request': resRequest, 'notes': resNote, 'requestService': resReqService, 'service': resService, 'dataProtection': resDataProtection, 'purchaseOrder': resPurchase};
            }
        } else {
        	throw ErrorLib.getErrors().BadRequest(
        		"",
        		"cartRequestService/handleGet",
        		"invalid parameter name " + parameters[0].name + " (can be: GET_ALL_REQUEST or GET_REQUEST_PROCESSING_REPORT_BY_ID)"
            );
        }
    } else {
            throw ErrorLib.getErrors().BadRequest(
                "",
                "cartRequestService/handleGet",
                "invalid parameter name (can be: GET_ALL_REQUEST or GET_REQUEST_PROCESSING_REPORT_BY_ID)"
                );
        }
    return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

function handlePut(reqBody, userId) {
	if(reqBody.REQUEST_ID){
		reqBody.REQUEST_ID = Number(reqBody.REQUEST_ID);
		reqBody.STATUS_ID = Number(reqBody.STATUS_ID);
		if(Number(reqBody.STATUS_ID === statusMap.IN_PROCESS)){
			if (purchase.existPurchaseOrder(reqBody.REQUEST_ID)) {
				purchase.updatePurchaseOrderManual(reqBody, userId);
			} else {
				purchase.insertPurchaseOrderManual(reqBody, userId);
			}
		}
		if(Number(reqBody.STATUS_ID === statusMap.APPROVED)){
			if(!reqBody.SERVICE){
				throw ErrorLib.getErrors().BadRequest(
	                "",
	                "cartRequestService/handlePut",
	                "SERVICE is not found"
	            );
			}
			service.updateService(reqBody, userId);
			if (purchase.existPurchaseOrder(reqBody.REQUEST_ID)) {
				purchase.updatePurchaseOrderManual(reqBody, userId);
			} else {
				purchase.insertPurchaseOrderManual(reqBody, userId);
			}
		}
	} else {
		throw ErrorLib.getErrors().BadRequest(
                "",
                "cartRequestService/handlePut",
                "REQUEST_ID is not found"
                );
		}
	var mailData = request.getRequestMailDataByRequestId(reqBody, userId);
    var res = request.updateRequestStatus(reqBody, userId);
    request.sendMailByStatus(reqBody,mailData, userId);
    return httpUtil.handleResponse(res, httpUtil.OK, httpUtil.AppJson);
}

//Not Implemented Method
function handleDelete() {
    return httpUtil.notImplementedMethod();
}

//Not Implemented Method
function handlePost() {
    return httpUtil.notImplementedMethod();
}

processRequest();
