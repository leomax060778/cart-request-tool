-- *************************************************************************************
-- Update crt version
INSERT INTO APPLICATION_VERSION(VERSION, APPLICATION_ID, CREATED_USER_ID, RELEASE_NOTES)
VALUES('2.0.22',1,1,'Added special characters to the list of file name validation');

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V2.0.0-95', 'Changed application version from 2.0.21 to 2.0.22', 'V201903251630__Change_application_version_to_2.0.22.sql');

COMMIT;