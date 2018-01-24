-- *************************************************************************************
-- Update schema version
INSERT INTO APPLICATION_VERSION(VERSION, APPLICATION_ID, CREATED_USER_ID, RELEASE_NOTES)
VALUES('2.0.8',1,1,'Added budget update for the Cart Requests when the corresponding currency is updaated in administration');

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-77', 'Insert a new application version for update the CR budgets after the currency upload', 'V201801121145__Change_application_version_to_2.0.8.sql');

COMMIT;