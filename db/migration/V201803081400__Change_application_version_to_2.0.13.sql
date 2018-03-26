-- *************************************************************************************
-- Update schema version
INSERT INTO APPLICATION_VERSION(VERSION, APPLICATION_ID, CREATED_USER_ID, RELEASE_NOTES)
VALUES('2.0.13',1,1,'Removed Message Type and Subject from all New Message popups except on Processing Report, changed behavior of vendor selector to autopopulate the Non SAP Vendor contact fields with the default Vendor Contact data');

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-84', 'Insert a new application version to remove dropdowns from new message popup and to autopopulate the non sap vendor contact fields', 'V201803081400__Change_application_version_to_2.0.13.sql');

COMMIT;