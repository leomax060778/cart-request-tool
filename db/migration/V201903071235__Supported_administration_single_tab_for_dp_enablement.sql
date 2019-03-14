-- Add permissions for services
INSERT INTO "CART_REQUEST_TOOL"."PERMISSION_SERVICE"(SERVICE_NAME, PERMISSION_ID, RESOURCE_ID,CREATED_USER_ID) VALUES('searchService',9,6,1);
INSERT INTO "CART_REQUEST_TOOL"."PERMISSION_SERVICE"(SERVICE_NAME, PERMISSION_ID, RESOURCE_ID,CREATED_USER_ID) VALUES('searchService',10,6,1);

-- *************************************************************************************
-- Update crt version
INSERT INTO APPLICATION_VERSION(VERSION, APPLICATION_ID, CREATED_USER_ID, RELEASE_NOTES)
VALUES('2.0.21',1,1,'Added template to download and supported excel file format for currency administration. Added DP Enablement and Data Protection Request tabs to Administration tile');

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V2.0.0-94', 'Supported excel file format for currency upload. Created tab DP Enablement and supported full text search for GDPR', 'V201903071235__Supported_administration_single_tab_for_dp_enablement.sql');

COMMIT;