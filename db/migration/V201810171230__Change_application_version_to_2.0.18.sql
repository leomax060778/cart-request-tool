-- *************************************************************************************
-- Update crt version
INSERT INTO APPLICATION_VERSION(VERSION, APPLICATION_ID, CREATED_USER_ID, RELEASE_NOTES)
VALUES('2.0.18',1,1,'Fixed news popup on login to show it when there are unread news');

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V2.0.0-91', 'Changed application version from 2.0.17 to 2.0.18', 'V201810171230__Change_application_version_to_2.0.18.sql');

COMMIT;