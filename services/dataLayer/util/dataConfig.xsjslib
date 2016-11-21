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

	if (partialRdo) {
		return partialRdo[0].RESOURCE_ID;
	}
	return null;
}

/****Resources Names******* */
function level1() {
	return "level1"
}
function level2() {
	return "level2"
}
function level3() {
	return "level3"
}
function settings() {
	return "settings"
}
function administration() {
	return "administration"
}
function dereport() {
	return "dereport"
}
function report() {
	return "report"
}
function search() {
	return "search"
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
	return "Read"
}
function WritePermission() {
	return "Write"
}
function DeletePermission() {
	return "Delete"
}
function CreatePermission() {
	return "Create"
}
function EditPermission() {
	return "Edit"
}
function ViewPermission() {
	return "View"
}
function GrantPermission() {
	return "Grant"
}
function ExecutePermission() {
	return "Execute"
}
/** *********************** */

/** ************************************************************************ */

/** ************URLs******************* */
var AppUrl = "http://OPT.Hana.com";
var UrlLogin = "http://OPT.Hana.com";
/** ******************************* */

/** ************Email Accounts********************* */
var SMTPAccount = "lpeccin@folderit.net";// "info_planningtool@sap.com";//
											// //adderes configured - SMTP
											// server
var SupportAccount = "lpeccin@folderit.net";// "support_planningtool@sap.com";
var SiteAdministrator = "lpeccin@folderit.net";// "support_planningtool@sap.com";
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
}
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