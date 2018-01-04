-- *************************************************************************************
-- Update schema version
INSERT INTO APPLICATION_VERSION(VERSION, APPLICATION_ID, CREATED_USER_ID, RELEASE_NOTES)
VALUES('2.0.7',1,1,'Improved navigation performance in all pages by individualizing controllers and views');

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-74', 'Insert a new application version for navigation improvement by pages', 'V201712291530__Change_application_version_to_2.0.7.sql');

COMMIT;