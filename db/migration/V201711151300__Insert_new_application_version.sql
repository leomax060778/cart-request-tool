-- *************************************************************************************
-- Update schema version
INSERT INTO APPLICATION_VERSION(VERSION, APPLICATION_ID, CREATED_USER_ID, RELEASE_NOTES)
VALUES('2.0.3',1,1,'Added Message to Business Mgt note as first message in the message history - New Cart Request');

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-68', 'Insert application version 2.0.3', 'V201711151300__Insert_new_application_version.sql');

COMMIT;