-- *************************************************************************************
-- Update schema version
INSERT INTO APPLICATION_VERSION(VERSION, APPLICATION_ID, CREATED_USER_ID, RELEASE_NOTES)
VALUES('2.0.12',1,1,'Fixed NV workflow reboot by re-enabling the Vendor');

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-81', 'Insert a new application version to fix the NV workflow reboot by re-enabling the Vendor', 'V201802061145__Change_application_version_to_2.0.12.sql');

COMMIT;