-- *************************************************************************************
-- Update crt version
INSERT INTO APPLICATION_VERSION(VERSION, APPLICATION_ID, CREATED_USER_ID, RELEASE_NOTES)
VALUES('2.0.23',1,1,'Improvements in personal data search for GDPR');

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V2.0.0-97', 'Changed application version from 2.0.22 to 2.0.23', 'V201903271315__Change_application_version_to_2.0.23.sql');

COMMIT;