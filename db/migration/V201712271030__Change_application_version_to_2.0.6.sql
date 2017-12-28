-- *************************************************************************************
-- Update schema version
INSERT INTO APPLICATION_VERSION(VERSION, APPLICATION_ID, CREATED_USER_ID, RELEASE_NOTES)
VALUES('2.0.6',1,1,'Improved navigation performance by changing the header toolbar from a view to a fragment');

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-73', 'Insert a new application version for navigation improvement', 'V201712271030__Change_application_version_to_2.0.6.sql');

COMMIT;