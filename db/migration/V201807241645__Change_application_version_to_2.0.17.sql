-- *************************************************************************************
-- Update crt version
INSERT INTO APPLICATION_VERSION(VERSION, APPLICATION_ID, CREATED_USER_ID, RELEASE_NOTES)
VALUES('2.0.17',1,1,'Changed order of Processing Report grids in Other Requests and Inquiries tab');

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V2.0.0-90', 'Changed application version from 2.0.16 to 2.0.17', 'V201807241645__Change_application_version_to_2.0.17.sql');

COMMIT;