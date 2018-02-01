-- *************************************************************************************
-- Update schema version
INSERT INTO APPLICATION_VERSION(VERSION, APPLICATION_ID, CREATED_USER_ID, RELEASE_NOTES)
VALUES('2.0.9',1,1,'Fixed field validation in News Manager');

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-78', 'Insert a new application version to fix news manager field validation', 'V201801121625__Change_application_version_to_2.0.9.sql');

COMMIT;