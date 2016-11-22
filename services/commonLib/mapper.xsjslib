/************Business Layer Mapper*****************/

function getMail(){
    $.import("xscartrequesttool.services.businessLayer.util","mail");
    return $.xscartrequesttool.services.businessLayer.util.mail;
}

function getLogError(){
    $.import("xscartrequesttool.services.businessLayer.util","logError");
    return $.xscartrequesttool.services.businessLayer.util.logError;
}

function getErrors(){
    $.import("xscartrequesttool.services.commonLib","errorLib");
    return $.xscartrequesttool.services.commonLib.errorLib;
}

function getHttp(){
    $.import("xscartrequesttool.services.commonLib","httpLib");
    return $.xscartrequesttool.services.commonLib.httpLib;
}

function getLevel3(){
    $.import("xscartrequesttool.services.businessLayer.teamPlanHierarchy","level3Lib");
    return $.xscartrequesttool.services.businessLayer.teamPlanHierarchy.level3Lib;
}

function getLevel4(){
    $.import("xscartrequesttool.services.businessLayer.teamPlanHierarchy","level4Lib");
    return $.xscartrequesttool.services.businessLayer.teamPlanHierarchy.level4Lib;
}

function getUser(){
    $.import("xscartrequesttool.services.businessLayer.admin","userLib");
    return $.xscartrequesttool.services.businessLayer.admin.userLib;
}

function getPlan(){
    $.import("xscartrequesttool.services.businessLayer.teamPlanHierarchy","planLib");
    return $.xscartrequesttool.services.businessLayer.teamPlanHierarchy.planLib;
}

function getRegion(){
    $.import("xscartrequesttool.services.businessLayer.teamPlanHierarchy","regionLib");
    return $.xscartrequesttool.services.businessLayer.teamPlanHierarchy.regionLib;
}

function getSubRegion(){
    $.import("xscartrequesttool.services.businessLayer.teamPlanHierarchy","subRegionLib");
    return $.xscartrequesttool.services.businessLayer.teamPlanHierarchy.subRegionLib;
}

function getRequest(){
    $.import("xscartrequesttool.services.businessLayer.shoppingCartHistory","cartRequestLib");
    return $.xscartrequesttool.services.businessLayer.shoppingCartHistory.cartRequestLib;
}

function getVendorInquiry(){
    $.import("xscartrequesttool.services.businessLayer.vendorRequestInquiry","vendorInquiryLib");
    return $.xscartrequesttool.services.businessLayer.vendorRequestInquiry.vendorInquiryLib;
}

function getVendorRequest(){
    $.import("xscartrequesttool.services.businessLayer.vendorRequestInquiry","vendorRequestLib");
    return $.xscartrequesttool.services.businessLayer.vendorRequestInquiry.vendorRequestLib;
}

function getAttachmentVendor(){
    $.import("xscartrequesttool.services.businessLayer.vendorRequestInquiry","attachmentVendorLib");
    return $.xscartrequesttool.services.businessLayer.vendorRequestInquiry.attachmentVendorLib;
}
function getAttachment(){
    $.import("xscartrequesttool.services.businessLayer.attachment","attachmentLib");
    return $.xscartrequesttool.services.businessLayer.attachment.attachmentLib;
}

function getCurrency(){
    $.import("xscartrequesttool.services.businessLayer.currency","currencyLib");
    return $.xscartrequesttool.services.businessLayer.currency.currencyLib;
}

function getRequestDataProtection(){
    $.import("xscartrequesttool.services.businessLayer.newCartRequest","requestDataProtectionLib");
    return $.xscartrequesttool.services.businessLayer.newCartRequest.requestDataProtectionLib;
}
function getDataProtection(){
    $.import("xscartrequesttool.services.businessLayer.dataProtection","dataProtectionLib");
    return $.xscartrequesttool.services.businessLayer.dataProtection.dataProtectionLib;
}


function getEntity(){
    $.import("xscartrequesttool.services.businessLayer.entity","entityLib");
    return $.xscartrequesttool.services.businessLayer.entity.entityLib;
}

function getVendor(){
    $.import("xscartrequesttool.services.businessLayer.vendor","vendorLib");
    return $.xscartrequesttool.services.businessLayer.vendor.vendorLib;
}

function getNonSapVendor(){
    $.import("xscartrequesttool.services.businessLayer.nonSAPVendor","nonSapVendorLib");
    return $.xscartrequesttool.services.businessLayer.nonSAPVendor.nonSapVendorLib;
}


function getChangeVendorRequest(){
    $.import("xscartrequesttool.services.businessLayer.vendorRequestInquiry","changeVendorRequestLib");
    return $.xscartrequesttool.services.businessLayer.vendorRequestInquiry.changeVendorRequestLib;
}

function getExtendVendorRequest(){
    $.import("xscartrequesttool.services.businessLayer.vendorRequestInquiry","extendVendorRequestLib");
    return $.xscartrequesttool.services.businessLayer.vendorRequestInquiry.extendVendorRequestLib;
}

function getMaterial(){
    $.import("xscartrequesttool.services.businessLayer.newCartRequest","materialLib");
    return $.xscartrequesttool.services.businessLayer.newCartRequest.materialLib;
}

function getRequestCostObject(){
    $.import("xscartrequesttool.services.businessLayer.newCartRequest","requestCostObjectLib");
    return $.xscartrequesttool.services.businessLayer.newCartRequest.requestCostObjectLib;
}

function getInquiry() {
    $.import("xscartrequesttool.services.businessLayer.inquiry","inquiryLib");
    return $.xscartrequesttool.services.businessLayer.inquiry.inquiryLib;
}

function getTrainingType() {
    $.import("xscartrequesttool.services.businessLayer.training","trainingTypeLib");
    return $.xscartrequesttool.services.businessLayer.training.trainingTypeLib;
}

function getTraining() {
    $.import("xscartrequesttool.services.businessLayer.training","trainingLib");
    return $.xscartrequesttool.services.businessLayer.training.trainingLib;
}

function getVendorRequestInquiryStatus() {
    $.import("xscartrequesttool.services.businessLayer.processingReport","vendorRequestInquiryStatusLib");
    return $.xscartrequesttool.services.businessLayer.processingReport.vendorRequestInquiryStatusLib;
}

function getPurchaseOrderService() {
    $.import("xscartrequesttool.services.businessLayer.processingReport","purchaseOrderServiceLib");
    return $.xscartrequesttool.services.businessLayer.processingReport.purchaseOrderServiceLib;
}

function getTemplateSection() {
    $.import("xscartrequesttool.services.businessLayer.template","templateSectionLib");
    return $.xscartrequesttool.services.businessLayer.template.templateSectionLib;
}

function getTemplate() {
    $.import("xscartrequesttool.services.businessLayer.template","templateLib");
    return $.xscartrequesttool.services.businessLayer.template.templateLib;
}

function getLayoutSection() {
    $.import("xscartrequesttool.services.businessLayer.layoutSection","layoutSectionLib");
    return $.xscartrequesttool.services.businessLayer.layoutSection.layoutSectionLib;
}

function getVendorRequestInquiry(){
    $.import("xscartrequesttool.services.businessLayer.vendorRequestInquiry","vendorRequestInquiryLib");
    return $.xscartrequesttool.services.businessLayer.vendorRequestInquiry.vendorRequestInquiryLib;
}

function getIssueType(){
    $.import("xscartrequesttool.services.businessLayer.processingReport","issueTypeLib");
    return $.xscartrequesttool.services.businessLayer.processingReport.issueTypeLib;
}

function getReturnType(){
    $.import("xscartrequesttool.services.businessLayer.processingReport","returnTypeLib");
    return $.xscartrequesttool.services.businessLayer.processingReport.returnTypeLib;
}

function getNews(){
    $.import("xscartrequesttool.services.businessLayer.news","newsLib");
    return $.xscartrequesttool.services.businessLayer.news.newsLib;
}

function getImage(){
    $.import("xscartrequesttool.services.businessLayer.news","imageLib");
    return $.xscartrequesttool.services.businessLayer.news.imageLib;
}

function getCartRequest(){
    $.import("xscartrequesttool.services.businessLayer.processingReport","cartRequestLib");
    return $.xscartrequesttool.services.businessLayer.processingReport.cartRequestLib;
}

function getInquiryStatus(){
    $.import("xscartrequesttool.services.businessLayer.processingReport","inquiryLib");
    return $.xscartrequesttool.services.businessLayer.processingReport.inquiryLib;
}

function getModal(){
    $.import("xscartrequesttool.services.businessLayer.modal","modalLib");
    return $.xscartrequesttool.services.businessLayer.modal.modalLib;
}

function getCrtType(){
    $.import("xscartrequesttool.services.businessLayer.crtType","crtTypeLib");
    return $.xscartrequesttool.services.businessLayer.crtType.crtTypeLib;
}

function getInquiryMessage() {
    $.import("xscartrequesttool.services.businessLayer.inquiry","inquiryMessageLib");
    return $.xscartrequesttool.services.businessLayer.inquiry.inquiryMessageLib;
}

function getAttachmentInquiry() {
    $.import("xscartrequesttool.services.businessLayer.inquiry","attachmentInquiryLib");
    return $.xscartrequesttool.services.businessLayer.inquiry.attachmentInquiryLib;
}

function getTemplateType() {
    $.import("xscartrequesttool.services.businessLayer.template","templateTypeLib");
    return $.xscartrequesttool.services.businessLayer.template.templateTypeLib;
}

function getTeam() {
    $.import("xscartrequesttool.services.businessLayer.team","teamLib");
    return $.xscartrequesttool.services.businessLayer.team.teamLib;
}

function getCatalogType() {
    $.import("xscartrequesttool.services.businessLayer.catalog","catalogTypeLib");
    return $.xscartrequesttool.services.businessLayer.catalog.catalogTypeLib;
}

function getCatalog() {
    $.import("xscartrequesttool.services.businessLayer.catalog", "catalogLib");
    return $.xscartrequesttool.services.businessLayer.catalog.catalogLib;
}

function getSpecialRequest() {
    $.import("xscartrequesttool.services.businessLayer.specialRequest", "specialRequestLib");
    return $.xscartrequesttool.services.businessLayer.specialRequest.specialRequestLib;
}

function getInfraOfWork() {
    $.import("xscartrequesttool.services.businessLayer.newCartRequest", "infraOfWorkLib");
    return $.xscartrequesttool.services.businessLayer.newCartRequest.infraOfWorkLib;
}

function getLocOfWork() {
    $.import("xscartrequesttool.services.businessLayer.newCartRequest", "locOfWorkLib");
    return $.xscartrequesttool.services.businessLayer.newCartRequest.locOfWorkLib;
}

function getNewCartRequest() {
    $.import("xscartrequesttool.services.businessLayer.newCartRequest", "newCartRequestLib");
    return $.xscartrequesttool.services.businessLayer.newCartRequest.newCartRequestLib;
}

function getLogin(){
    $.import("xscartrequesttool.services.businessLayer.admin","loginLib");
    return $.xscartrequesttool.services.businessLayer.admin.loginLib;
}

function getUserRole(){
    $.import("xscartrequesttool.services.businessLayer.admin","userRoleLib");
    return $.xscartrequesttool.services.businessLayer.admin.userRoleLib;
}

function getRolePermission(){
    $.import("xscartrequesttool.services.businessLayer.admin","rolePermissionLib");
    return $.xscartrequesttool.services.businessLayer.admin.rolePermissionLib;
}

function getPermission(){
    $.import("xscartrequesttool.services.businessLayer.admin","permissionLib");
    return $.xscartrequesttool.services.businessLayer.admin.permissionLib;
}

function getResource(){
    $.import("xscartrequesttool.services.businessLayer.admin","resourceLib");
    return $.xscartrequesttool.services.businessLayer.admin.resourceLib;
}

function getRole(){
    $.import("xscartrequesttool.services.businessLayer.admin","roleLib");
    return $.xscartrequesttool.services.businessLayer.admin.roleLib;
}

function getUtil() {
    $.import("xscartrequesttool.services.businessLayer.util","utilLib");
    return $.xscartrequesttool.services.businessLayer.util.utilLib;
}

function getNoteTypeLib() {
    $.import("xscartrequesttool.services.businessLayer.newCartRequest","noteTypeLib");
    return $.xscartrequesttool.services.businessLayer.newCartRequest.noteTypeLib;
}

function getVendorMessage() {
    $.import("xscartrequesttool.services.businessLayer.vendorRequestInquiry","vendorMessageLib");
    return $.xscartrequesttool.services.businessLayer.vendorRequestInquiry.vendorMessageLib;
}

function getTopic() {
    $.import("xscartrequesttool.services.businessLayer.topic","topicLib");
    return $.xscartrequesttool.services.businessLayer.topic.topicLib;
}

function getProcessingReportMessage(){
    $.import("xscartrequesttool.services.businessLayer.processingReport","processingReportMessageLib");
    return $.xscartrequesttool.services.businessLayer.processingReport.processingReportMessageLib;
}

function getRequestMessage(){
	$.import("xscartrequesttool.services.businessLayer.shoppingCartHistory","requestMessageLib");
	return $.xscartrequesttool.services.businessLayer.shoppingCartHistory.requestMessageLib;
}

function getStatus(){
	$.import("xscartrequesttool.services.businessLayer.status","statusLib");
	return $.xscartrequesttool.services.businessLayer.status.statusLib;
}

function getCommodity(){
    $.import("xscartrequesttool.services.businessLayer.commodity","commodityLib");
    return $.xscartrequesttool.services.businessLayer.commodity.commodityLib;
}

function getCountry(){
    $.import("xscartrequesttool.services.businessLayer.country","countryLib");
    return $.xscartrequesttool.services.businessLayer.country.countryLib;
}

function getAttachmentStore(){
    $.import("xscartrequesttool.services.businessLayer.attachment","attachmentStoreLib");
    return $.xscartrequesttool.services.businessLayer.attachment.attachmentStoreLib;
}

function getVendorDataProtection() {
	$.import("xscartrequesttool.services.businessLayer.vendorRequestInquiry","vendorDataProtectionLib");
    return $.xscartrequesttool.services.businessLayer.vendorRequestInquiry.vendorDataProtectionLib;
}

function getChangeVendorSupportingDocumentation() {
	$.import("xscartrequesttool.services.businessLayer.vendorRequestInquiry","changeVendorSupportingDocumentationLib");
    return $.xscartrequesttool.services.businessLayer.vendorRequestInquiry.changeVendorSupportingDocumentationLib;
}

function getChangeVendorSelection() {
	$.import("xscartrequesttool.services.businessLayer.vendorRequestInquiry","changeVendorSelectionLib");
    return $.xscartrequesttool.services.businessLayer.vendorRequestInquiry.changeVendorSelectionLib;
}

function getBudgetYear() {
	$.import("xscartrequesttool.services.businessLayer.admin","budgetYearLib");
    return $.xscartrequesttool.services.businessLayer.admin.budgetYearLib;
}

function getService(){
    $.import("xscartrequesttool.services.businessLayer.processingReport","serviceLib");
    return $.xscartrequesttool.services.businessLayer.processingReport.serviceLib;
}

function getUserTeam(){
    $.import("xscartrequesttool.services.businessLayer.admin","userTeamLib");
    return $.xscartrequesttool.services.businessLayer.admin.userTeamLib;
}

/************Data Layer Mapper*****************/

function getdbHelper(){
    $.import("xscartrequesttool.services.dataLayer.util","dbHelper");
    return $.xscartrequesttool.services.dataLayer.util.dbHelper;
}

function getDataLogError(){
    $.import("xscartrequesttool.services.dataLayer.util","dataLogError");
    return $.xscartrequesttool.services.dataLayer.util.dataLogError;
}

function getDataLevel3(){
    $.import("xscartrequesttool.services.dataLayer.teamPlanHierarchy","dataLevel3");
    return $.xscartrequesttool.services.dataLayer.teamPlanHierarchy.dataLevel3;
}

function getDataLevel4(){
    $.import("xscartrequesttool.services.dataLayer.teamPlanHierarchy","dataLevel4");
    return $.xscartrequesttool.services.dataLayer.teamPlanHierarchy.dataLevel4;
}

function getDataUser(){
    $.import("xscartrequesttool.services.dataLayer.admin","dataUser");
    return $.xscartrequesttool.services.dataLayer.admin.dataUser;
}

function getDataPlan(){
    $.import("xscartrequesttool.services.dataLayer.teamPlanHierarchy","dataPlan");
    return $.xscartrequesttool.services.dataLayer.teamPlanHierarchy.dataPlan;
}

function getDataRegion(){
    $.import("xscartrequesttool.services.dataLayer.teamPlanHierarchy","dataRegion");
    return $.xscartrequesttool.services.dataLayer.teamPlanHierarchy.dataRegion;
}

function getDataSubRegion(){
    $.import("xscartrequesttool.services.dataLayer.teamPlanHierarchy","dataSubRegion");
    return $.xscartrequesttool.services.dataLayer.teamPlanHierarchy.dataSubRegion;
}

function getDataRequest(){
    $.import("xscartrequesttool.services.dataLayer.shoppingCartHistory","dataRequest");
    return $.xscartrequesttool.services.dataLayer.shoppingCartHistory.dataRequest;
}

function getDataRequestMessage(){
    $.import("xscartrequesttool.services.dataLayer.newCartRequest","dataRequestMessage");
    return $.xscartrequesttool.services.dataLayer.newCartRequest.dataRequestMessage;
}

function getDataService(){
    $.import("xscartrequesttool.services.dataLayer.newCartRequest","dataService");
    return $.xscartrequesttool.services.dataLayer.newCartRequest.dataService;
}

function getDataRequestService(){
    $.import("xscartrequesttool.services.dataLayer.shoppingCartHistory","dataRequestService");
    return $.xscartrequesttool.services.dataLayer.shoppingCartHistory.dataRequestService;
}

function getDataRequestCostObject(){
    $.import("xscartrequesttool.services.dataLayer.newCartRequest","dataRequestCostObject");
    return $.xscartrequesttool.services.dataLayer.newCartRequest.dataRequestCostObject;
}

function getDataAttachmentVendor(){
    $.import("xscartrequesttool.services.dataLayer.vendorRequestInquiry","dataAttachmentVendor");
    return $.xscartrequesttool.services.dataLayer.vendorRequestInquiry.dataAttachmentVendor;
}

function getDataAttachment(){
    $.import("xscartrequesttool.services.dataLayer.attachment","dataAttachment");
    return $.xscartrequesttool.services.dataLayer.attachment.dataAttachment;
}

function getDataChangeVendorRequest(){
    $.import("xscartrequesttool.services.dataLayer.vendorRequestInquiry","dataChangeVendorRequest");
    return $.xscartrequesttool.services.dataLayer.vendorRequestInquiry.dataChangeVendorRequest;
}

function getDataExtendVendorRequest(){
    $.import("xscartrequesttool.services.dataLayer.vendorRequestInquiry","dataExtendVendorRequest");
    return $.xscartrequesttool.services.dataLayer.vendorRequestInquiry.dataExtendVendorRequest;
}

function getDataVendorInquiry(){
    $.import("xscartrequesttool.services.dataLayer.vendorRequestInquiry","dataVendorInquiry");
    return $.xscartrequesttool.services.dataLayer.vendorRequestInquiry.dataVendorInquiry;
}

function getDataVendorRequest(){
    $.import("xscartrequesttool.services.dataLayer.vendorRequestInquiry","dataVendorRequest");
    return $.xscartrequesttool.services.dataLayer.vendorRequestInquiry.dataVendorRequest;
}

function getDataRequestDataProtection(){
    $.import("xscartrequesttool.services.dataLayer.newCartRequest","requestDataProtection");
    return $.xscartrequesttool.services.dataLayer.newCartRequest.requestDataProtection;
}

function getDataDataProtection(){
    $.import("xscartrequesttool.services.dataLayer.dataProtection","dataDataProtectionLib");
    return $.xscartrequesttool.services.dataLayer.dataProtection.dataDataProtectionLib;
}

function getDataVendorMessage() {
    $.import("xscartrequesttool.services.dataLayer.vendorRequestInquiry","dataVendorMessage");
    return $.xscartrequesttool.services.dataLayer.vendorRequestInquiry.dataVendorMessage;
}

function getDataEntity(){
    $.import("xscartrequesttool.services.dataLayer.entity","dataEntity");
    return $.xscartrequesttool.services.dataLayer.entity.dataEntity;
}
function getDataVendor(){
    $.import("xscartrequesttool.services.dataLayer.vendor","dataVendor");
    return $.xscartrequesttool.services.dataLayer.vendor.dataVendor;
}
function getDataNonSapVendor(){
    $.import("xscartrequesttool.services.dataLayer.nonSAPVendor","dataNonSapVendor");
    return $.xscartrequesttool.services.dataLayer.nonSAPVendor.dataNonSapVendor;
}
function getDataVendorEntity(){
    $.import("xscartrequesttool.services.dataLayer.vendor","dataVendorEntity");
    return $.xscartrequesttool.services.dataLayer.vendor.dataVendorEntity;
}


function getDataMaterial(){
    $.import("xscartrequesttool.services.dataLayer.newCartRequest","dataMaterial");
    return $.xscartrequesttool.services.dataLayer.newCartRequest.dataMaterial;
}

function getDataInquiry() {
    $.import("xscartrequesttool.services.dataLayer.inquiry","dataInquiry");
    return $.xscartrequesttool.services.dataLayer.inquiry.dataInquiry;
}

function getDataInquiryMessage() {
    $.import("xscartrequesttool.services.dataLayer.inquiry","dataInquiryMessage");
    return $.xscartrequesttool.services.dataLayer.inquiry.dataInquiryMessage;
}

function getDataTraining() {
    $.import("xscartrequesttool.services.dataLayer.training","dataTraining");
    return $.xscartrequesttool.services.dataLayer.training.dataTraining;
}

function getDataVendorRequestInquiryStatus() {
    $.import("xscartrequesttool.services.dataLayer.processingReport","dataVendorRequestInquiryStatus");
    return $.xscartrequesttool.services.dataLayer.processingReport.dataVendorRequestInquiryStatus;
}

function getDataTemplate() {
    $.import("xscartrequesttool.services.dataLayer.template","dataTemplate");
    return $.xscartrequesttool.services.dataLayer.template.dataTemplate;
}

function getDataTemplateSection() {
    $.import("xscartrequesttool.services.dataLayer.template","dataTemplateSection");
    return $.xscartrequesttool.services.dataLayer.template.dataTemplateSection;
}

function getDataSection(){
    $.import("xscartrequesttool.services.dataLayer.template","dataSection");
    return $.xscartrequesttool.services.dataLayer.template.dataSection;
}

function getDataVendorRequestInquiry(){
    $.import("xscartrequesttool.services.dataLayer.vendorRequestInquiry","dataVendorRequestInquiry");
    return $.xscartrequesttool.services.dataLayer.vendorRequestInquiry.dataVendorRequestInquiry;
}

function getDataCountry(){
    $.import("xscartrequesttool.services.dataLayer.country","dataCountry");
    return $.xscartrequesttool.services.dataLayer.country.dataCountry;
}

function getDataCurrency(){
    $.import("xscartrequesttool.services.dataLayer.currency","dataCurrency");
    return $.xscartrequesttool.services.dataLayer.currency.dataCurrency;
}

function getDataAttachmentRequest(){
    $.import("xscartrequesttool.services.dataLayer.newCartRequest","dataAttachmentCRLib");
    return $.xscartrequesttool.services.dataLayer.newCartRequest.dataAttachmentCRLib;
}

function getDataNoteRequest(){
    $.import("xscartrequesttool.services.dataLayer.newCartRequest","dataNoteRequest");
    return $.xscartrequesttool.services.dataLayer.newCartRequest.dataNoteRequest;
}

function getDataShoppingNoteRequest(){
    $.import("xscartrequesttool.services.dataLayer.shoppingCartHistory","dataNoteRequest");
    return $.xscartrequesttool.services.dataLayer.shoppingCartHistory.dataNoteRequest;
}

function getDataIssueType(){
    $.import("xscartrequesttool.services.dataLayer.processingReport","dataIssueType");
    return $.xscartrequesttool.services.dataLayer.processingReport.dataIssueType;
}

function getDataReturnType(){
    $.import("xscartrequesttool.services.dataLayer.processingReport","dataReturnType");
    return $.xscartrequesttool.services.dataLayer.processingReport.dataReturnType;
}

function getDataNews(){
    $.import("xscartrequesttool.services.dataLayer.news","dataNews");
    return $.xscartrequesttool.services.dataLayer.news.dataNews;
}

function getDataImage(){
    $.import("xscartrequesttool.services.dataLayer.news","dataImage");
    return $.xscartrequesttool.services.dataLayer.news.dataImage;
}

function getDataCartRequest(){
    $.import("xscartrequesttool.services.dataLayer.processingReport","dataCartRequest");
    return $.xscartrequesttool.services.dataLayer.processingReport.dataCartRequest;
}

function getDataCommodity(){
    $.import("xscartrequesttool.services.dataLayer.commodity","dataCommodity");
    return $.xscartrequesttool.services.dataLayer.commodity.dataCommodity;
}

function getDataInfrastructureOfWork(){
    $.import("xscartrequesttool.services.dataLayer.infrastructureOfWork","dataInfrastructureOfWork");
    return $.xscartrequesttool.services.dataLayer.infrastructureOfWork.dataInfrastructureOfWork;
}

function getDataLocationOfWork(){
    $.import("xscartrequesttool.services.dataLayer.locationOfWork","dataLocationOfWork");
    return $.xscartrequesttool.services.dataLayer.locationOfWork.dataLocationOfWork;
}

function getDataModal(){
    $.import("xscartrequesttool.services.dataLayer.modal","dataModal");
    return $.xscartrequesttool.services.dataLayer.modal.dataModal;
}

function getDataCrtIssueType() {
    $.import("xscartrequesttool.services.dataLayer.processingReport","dataCrtIssueType");
    return $.xscartrequesttool.services.dataLayer.processingReport.dataCrtIssueType;
}

function getDataCrtReturnType() {
    $.import("xscartrequesttool.services.dataLayer.processingReport","dataCrtReturnType");
    return $.xscartrequesttool.services.dataLayer.processingReport.dataCrtReturnType;
}

function getDataCrtType() {
    $.import("xscartrequesttool.services.dataLayer.crtType","dataCrtType");
    return $.xscartrequesttool.services.dataLayer.crtType.dataCrtType;
}

function getDataLayoutSection() {
    $.import("xscartrequesttool.services.dataLayer.layoutSection","dataLayoutSection");
    return $.xscartrequesttool.services.dataLayer.layoutSection.dataLayoutSection;
}

function getDataAttachmentInquiry() {
    $.import("xscartrequesttool.services.dataLayer.inquiry","dataAttachmentInquiry");
    return $.xscartrequesttool.services.dataLayer.inquiry.dataAttachmentInquiry;
}

function getDataTemplateType() {
    $.import("xscartrequesttool.services.dataLayer.template","dataTemplateType");
    return $.xscartrequesttool.services.dataLayer.template.dataTemplateType;
}

function getDataTeam() {
    $.import("xscartrequesttool.services.dataLayer.team","dataTeam");
    return $.xscartrequesttool.services.dataLayer.team.dataTeam;
}

function getDataTrainingType() {
    $.import("xscartrequesttool.services.dataLayer.training","dataTrainingType");
    return $.xscartrequesttool.services.dataLayer.training.dataTrainingType;
}

function getDataCatalogType() {
    $.import("xscartrequesttool.services.dataLayer.catalog","dataCatalogType");
    return $.xscartrequesttool.services.dataLayer.catalog.dataCatalogType;
}

function getDataCatalog() {
    $.import("xscartrequesttool.services.dataLayer.catalog", "dataCatalog");
    return $.xscartrequesttool.services.dataLayer.catalog.dataCatalog;
}

function getDataSpecialRequest() {
    $.import("xscartrequesttool.services.dataLayer.specialRequest", "dataSpecialRequest");
    return $.xscartrequesttool.services.dataLayer.specialRequest.dataSpecialRequest;
}


function getDataNewCartRequest() {
    $.import("xscartrequesttool.services.dataLayer.newCartRequest", "dataRequest");
    return $.xscartrequesttool.services.dataLayer.newCartRequest.dataRequest;
}

function getDataNewCartRequestService() {
    $.import("xscartrequesttool.services.dataLayer.newCartRequest", "dataRequestService");
    return $.xscartrequesttool.services.dataLayer.newCartRequest.dataRequestService;
}

function getDataNewCartRequestRiskFunded() {
    $.import("xscartrequesttool.services.dataLayer.newCartRequest", "dataRequestRiskFunded");
    return $.xscartrequesttool.services.dataLayer.newCartRequest.dataRequestRiskFunded;
}

function getDataUserRole(){
    $.import("xscartrequesttool.services.dataLayer.admin","dataUserRole");
    return $.xscartrequesttool.services.dataLayer.admin.dataUserRole;
}

function getDataRole(){
    $.import("xscartrequesttool.services.dataLayer.admin","dataRole");
    return $.xscartrequesttool.services.dataLayer.admin.dataRole;
}

function getDataPermission(){
    $.import("xscartrequesttool.services.dataLayer.admin","dataPermission");
    return $.xscartrequesttool.services.dataLayer.admin.dataPermission;
}

function getDataRolePermission(){
    $.import("xscartrequesttool.services.dataLayer.admin","dataRolePermission");
    return $.xscartrequesttool.services.dataLayer.admin.dataRolePermission;
}

function getDataResource(){
    $.import("xscartrequesttool.services.dataLayer.admin","dataResource");
    return $.xscartrequesttool.services.dataLayer.admin.dataResource;
}

function getDataConfig(){
    $.import("xscartrequesttool.services.dataLayer.util","dataConfig");
    return $.xscartrequesttool.services.dataLayer.util.dataConfig;
}

function getDataRequestRiskFunded() {
    $.import("xscartrequesttool.services.dataLayer.shoppingCartHistory", "dataRequestRiskFunded");
    return $.xscartrequesttool.services.dataLayer.shoppingCartHistory.dataRequestRiskFunded;
}

function getDataShoppingCartHistoryRequestCostObject() {
    $.import("xscartrequesttool.services.dataLayer.shoppingCartHistory", "dataRequestCostObject");
    return $.xscartrequesttool.services.dataLayer.shoppingCartHistory.dataRequestCostObject;
}

function getDataNoteType() {
    $.import("xscartrequesttool.services.dataLayer.newCartRequest", "dataNoteType");
    return $.xscartrequesttool.services.dataLayer.newCartRequest.dataNoteType;
}

function getDataLogin(){
    $.import("xscartrequesttool.services.dataLayer.admin","dataLogin");
    return $.xscartrequesttool.services.dataLayer.admin.dataLogin;
}

function getDataTopic(){
    $.import("xscartrequesttool.services.dataLayer.topic","dataTopic");
    return $.xscartrequesttool.services.dataLayer.topic.dataTopic;
}

function getDataProcessingReportMessage(){
    $.import("xscartrequesttool.services.dataLayer.processingReport","dataProcessingReportMessage");
    return $.xscartrequesttool.services.dataLayer.processingReport.dataProcessingReportMessage;
}

function getDataRequestMessage(){
	$.import("xscartrequesttool.services.dataLayer.shoppingCartHistory","dataRequestMessage");
	return $.xscartrequesttool.services.dataLayer.shoppingCartHistory.dataRequestMessage;
}

function getDataStatus(){
	$.import("xscartrequesttool.services.dataLayer.status","dataStatus");
	return $.xscartrequesttool.services.dataLayer.status.dataStatus;
}

function getDataCommodity(){
    $.import("xscartrequesttool.services.dataLayer.commodity","dataCommodity");
    return $.xscartrequesttool.services.dataLayer.commodity.dataCommodity;
}

function getDataCountry(){
    $.import("xscartrequesttool.services.dataLayer.country","dataCountry");
    return $.xscartrequesttool.services.dataLayer.country.dataCountry;
}

function getDataAttachmentStore(){
    $.import("xscartrequesttool.services.dataLayer.attachment","dataAttachmentStore");
    return $.xscartrequesttool.services.dataLayer.attachment.dataAttachmentStore;
}

function getDataVendorDataProtection() {
	$.import("xscartrequesttool.services.dataLayer.vendorRequestInquiry","dataVendorDataProtection");
    return $.xscartrequesttool.services.dataLayer.vendorRequestInquiry.dataVendorDataProtection;
}

function getDataChangeVendorSupportingDocumentation() {
	$.import("xscartrequesttool.services.dataLayer.vendorRequestInquiry","dataChangeVendorSupportingDocumentation");
    return $.xscartrequesttool.services.dataLayer.vendorRequestInquiry.dataChangeVendorSupportingDocumentation;
}

function getDataChangeVendorSelection() {
	$.import("xscartrequesttool.services.dataLayer.vendorRequestInquiry","dataChangeVendorSelection");
    return $.xscartrequesttool.services.dataLayer.vendorRequestInquiry.dataChangeVendorSelection;
}

function getDataBudgetYear() {
	$.import("xscartrequesttool.services.dataLayer.admin","dataBudgetYear");
    return $.xscartrequesttool.services.dataLayer.admin.dataBudgetYear;
}

function getDataPurchaseOrderService() {
    $.import("xscartrequesttool.services.dataLayer.processingReport","dataPurchaseOrderService");
    return $.xscartrequesttool.services.dataLayer.processingReport.dataPurchaseOrderService;
}

function getDataInquiryStatus() {
    $.import("xscartrequesttool.services.dataLayer.processingReport","dataInquiry");
    return $.xscartrequesttool.services.dataLayer.processingReport.dataInquiry;
}

function getDataUserTeam() {
    $.import("xscartrequesttool.services.dataLayer.admin","dataUserTeam");
    return $.xscartrequesttool.services.dataLayer.admin.dataUserTeam;
}

/********************
* E-MAILS TEMPLATES *
********************/

function getCartRequestMail() {
    $.import("xscartrequesttool.services.mails","cartRequestMail");
    return $.xscartrequesttool.services.mails.cartRequestMail;
}

function getChangeVendorMail() {
    $.import("xscartrequesttool.services.mails","changeVendorMail");
    return $.xscartrequesttool.services.mails.changeVendorMail;
}

function getCrtInquiryMail() {
    $.import("xscartrequesttool.services.mails","crtInquiryMail");
    return $.xscartrequesttool.services.mails.crtInquiryMail;
}

function getExtendVendorMail() {
    $.import("xscartrequesttool.services.mails","extendVendorMail");
    return $.xscartrequesttool.services.mails.extendVendorMail;
}

function getVendorInquiryMail() {
    $.import("xscartrequesttool.services.mails","vendorInquiryMail");
    return $.xscartrequesttool.services.mails.vendorInquiryMail;
}

function getVendorMail() {
    $.import("xscartrequesttool.services.mails","vendorMail");
    return $.xscartrequesttool.services.mails.vendorMail;
}
