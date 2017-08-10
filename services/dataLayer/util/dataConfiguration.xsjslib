/** *************Import Library****************** */
$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ********************************************** */

/** *********************PERMISSIONS AND RESOURCES************************** */
var spGetResourceByName = "GET_RESOURCE_BY_NAME";
var spGetPermissionByName = "GET_PERMISSION_BY_NAME";
var spGET_CONFIGURATION_BY_NAME = "GET_CONFIGURATION_BY_NAME";

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
	return "level3";
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

/****Resources Names********/
function ReadPermission(){ return "View/Read";}
function CreatePermission(){ return "Create/Edit";}
function DeletePermission(){ return "Delete";}

/**************************/

/***************************************************************************/


function getConfigurationByName(key){
	var result = db.executeProcedure(spGET_CONFIGURATION_BY_NAME,{'IN_KEY' : key});
	return db.extractArray(result.out_result);
}

function GrantPermission() {
	return "Grant";
}
function ExecutePermission() {
	return "Execute";
}
/** *********************** */

/** ************************************************************************ */

/** **********URLs****************** */
var AppUrl = getConfigurationByName("AppUrl")[0].CONF_VALUE; //"http://rtm-bmo.bue.sap.corp:1081/crt2017-testing/webapp";
var UrlLogin =  getConfigurationByName("UrlLogin")[0].CONF_VALUE;//"http://rtm-bmo.bue.sap.corp:1081/crt2017-testing/webapp/index.html";

var Environment = "Development"; //Can be: Development - Staging - Production.
	
var complete_path = {
		"HOME": "/home",
		"CART_REQUEST": "/CartRequest",
		"CRT_INQUIRY": "/crtInquiry/detail",
		"EXTEND_VENDOR_REQUEST": "/extendVendorRequest/detail",
		"CHANGE_VENDOR_REQUEST": "/changeVendorRequest/detail",
		"VENDOR_REQUEST": "/newVendorRequest/detail",
		"VENDOR_INQUIRY": "/vendorInquiry/detail",
		"PROCESSING_REPORT": "/processingReport"
};

var complete_path_additional_param = {
		"MESSAGE": "/TAB=messageHistory"
};

/** ******************************* */

/** ************Email Accounts********************* */
var SMTPAccount = eval(getConfigurationByName("SMTPAccount")[0].CONF_VALUE);//eval string to get the array
var SupportAccount = getConfigurationByName("SupportAccount")[0].CONF_VALUE;
var SiteAdministrator = getConfigurationByName("SiteAdministrator")[0].CONF_VALUE;
var emailAccounts = eval(getConfigurationByName("emailAccounts")[0].CONF_VALUE); //eval string to get the array
var sendEmailType = "smpt"; //can be: servlet or smpt
 
var tokenLifeTimeSeconds = parseInt(getConfigurationByName("tokenLifeTimeSeconds")[0].CONF_VALUE);

var defaultPassword = getConfigurationByName("defaultPassword")[0].CONF_VALUE;

// this Enum represent the "PLANNING_TOOL"."ROLE" table
var RoleEnum = {
	SuperAdmin : 1,
	Admin : 2,
	Data_Entry : 3,
	Campaign_Manager : 4
};
/** *********************** */

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

function getAdditionalParam(param){
	return complete_path_additional_param[param];
}

function getBasicData(stringPathName, additionalParam){
	var parameters = {};
	parameters.URL_BASE = getUrlBase();
		
	if(stringPathName){
		parameters.PATH = getPath(stringPathName);
		parameters.ENVIRONMENT = getMailEnvironment();
	}else{
		parameters.ENVIRONMENT = getEnvironment();
	}
	
	if(additionalParam){
		parameters.ADDITIONAL_PARAM = getAdditionalParam(additionalParam.PARAM);
	}
	
	return parameters;
}

function getSendMailType(){
	return sendEmailType;
}