-- *************************************************************************************
-- Update schema version
INSERT INTO APPLICATION_VERSION(VERSION, APPLICATION_ID, CREATED_USER_ID, RELEASE_NOTES)
VALUES('2.0.10',1,1,'Added support to edit the file in GPO Info & Templates and Training & Education');

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-79', 'Insert a new application version to add support to file edition in GPO Info & Template and Training & Education', 'V201801221535__Change_application_version_to_2.0.10.sql');

COMMIT;