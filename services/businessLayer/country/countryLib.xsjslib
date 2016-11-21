$.import("xscartrequesttool.services.commonLib", "mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dataCountry = mapper.getDataCountry();

function getAllCountry() {
	return dataCountry.getAllCountry();
}

function getCountryById(countryId, userId) {
	validateCountryParams(countryId, userId);
	return dataCountry.getCountryById(countryId);
}

function validateCountryParams(countryId, userId) {
	if (!countryId) {
		throw ErrorLib.getErrors().CustomError("", "countryService",
				"The countryId is not found");
	}
	if (!userId) {
		throw ErrorLib.getErrors().CustomError("", "countryService",
				"The userId is not found");
	}
}