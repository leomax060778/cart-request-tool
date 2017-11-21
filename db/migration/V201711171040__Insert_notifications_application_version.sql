-- *************************************************************************************
-- Update schema version
INSERT INTO APPLICATION_VERSION(VERSION, APPLICATION_ID, CREATED_USER_ID, RELEASE_NOTES)
VALUES('2.0.4',1,1,'Fixed notification behaviour, links and texts');

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-69', 'Insert application version 2.0.4', 'V201711171040__Insert_notifications_application_version.sql');

COMMIT;