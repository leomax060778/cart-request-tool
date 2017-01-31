/** *************Import Library****************** */
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ********************************************** */

/** *********************PERMISSIONS AND RESOURCES************************** */
var spGetResourceByName = "GET_RESOURCE_BY_NAME";

function getResourceIdByName(name) {

	var rdo = db.executeProcedure(spGetResourceByName, {
		"IN_RESOURCE_NAME" : name
	});
	var partialRdo = db.extractArray(rdo.OUT_RESULT);
	if (partialRdo && partialRdo.length > 0) {
		return partialRdo[0].RESOURCE_ID;
	}
	return null;
}

/****Resources Names******* */
function level1() {
	return "level1";
}
function level2() {
	return "level2";
}
function level3() {
	return "level3"
}
function settings() {
	return "settings";
}
function administration() {
	return "administration";
}
function dereport() {
	return "dereport";
}
function report() {
	return "report";
}
function search() {
	return "search";
}
/** *********************** */

var spGetPermissionByName = "GET_PERMISSION_BY_NAME";

function getPermissionIdByName(name) {
	var rdo = db.executeProcedure(spGetPermissionByName, {
		"IN_PERMISSION_NAME" : name
	});

	var partialRdo = db.extractArray(rdo.OUT_RESULT);

	if (partialRdo) {
		return partialRdo[0].PERMISSION_ID;
	}
	return null;
}

/** **Resources Names******* */
function ReadPermission() {
	return "Read";
}
function WritePermission() {
	return "Write"
}
function DeletePermission() {
	return "Delete";
}
function CreatePermission() {
	return "Create";
}
function EditPermission() {
	return "Edit";
}
function ViewPermission() {
	return "View";
}
function GrantPermission() {
	return "Grant";
}
function ExecutePermission() {
	return "Execute";
}
/** *********************** */

/** ************************************************************************ */

/** ************URLs******************* */
var AppUrl = "http://rtm-bmo.bue.sap.corp:1081/crt2017-testing/webapp/index.html#";
var UrlLogin = "http://rtm-bmo.bue.sap.corp:1081/crt2017-testing/webapp/index.html";
var Environment = "Staging"; //Can be: Development - Staging - Production.

var complete_path = {
		"HOME": "/home",
		"CART_REQUEST": "/processingReport/CartRequest",
		"CRT_INQUIRY": "/processingReport/CrtInquiry",
		"EXTEND_VENDOR_REQUEST": "/processingReport/ExtendVendorRequest",
		"CHANGE_VENDOR_REQUEST": "/processingReport/ChangeVendorRequest",
		"VENDOR_REQUEST": "/processingReport/NewVendorRequest",
		"VENDOR_INQUIRY": "/processingReport/VendorInquiry",
		"PROCESSING_REPORT": "/processingReport"
};
/** ******************************* */

/** ************Email Accounts********************* */
var SMTPAccount = "info_cartrequesttool@sap.com";//
											// server
var SupportAccount = "support_cartrequesttool@sap.com";
var SiteAdministrator = "support_cartrequesttool@sap.com";

var emailAccount = [{address: "lhildt@folderit.net"}, {address: "marylyn.scott@sap.com"}, {address: "shanna.mayorga@sap.com"}];

/** ************************************** */

// TODO: move this to configuration
var tokenLifeTimeSeconds = 43200;

// TODO: move to configuration table
var defaultPassword = "123456";

// this Enum represent the "PLANNING_TOOL"."ROLE" table
var RoleEnum = {
	SuperAdmin : 1,
	Admin : 2,
	Data_Entry : 3,
	Campaign_Manager : 4
};
// *************************

function getAppUrl() {
	return AppUrl;
}

function getLoginUrl() {
	return UrlLogin;
}

function getSMTPAccount() {
	return SMTPAccount;
}

function getSupportAccount() {
	return SupportAccount;
}

function getSiteAdminAccount() {
	return SiteAdministrator;
}

function getTokenLifeTimeSeconds() {
	return tokenLifeTimeSeconds;
}

function getDefaultPassword() {
	return defaultPassword;
}

function getRoleEnum() {
	return RoleEnum;
}

function getMailEnvironment() {
	Environment = (Environment !== "Production")? '('+Environment+')' : "";
	return Environment;
}

function getEnvironment() {
	return Environment;
}

function getEmailList(requestMailObj){
	 return emailAccounts;
}

function getUrlBase(){
	 return AppUrl;
}

function getPath(nameString){
	return complete_path[nameString];
}

function getBasicData(stringPathName){
	var parameters = {};
	parameters.URL_BASE = getUrlBase();
		
	if(stringPathName){
		parameters.PATH = getPath(stringPathName);
		parameters.ENVIRONMENT = getMailEnvironment();
	}else{
		parameters.ENVIRONMENT = getEnvironment();
	}
	
	return parameters;
}