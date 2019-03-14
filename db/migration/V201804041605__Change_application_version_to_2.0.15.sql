-- *************************************************************************************
-- Update crt version
INSERT INTO APPLICATION_VERSION(VERSION, APPLICATION_ID, CREATED_USER_ID, RELEASE_NOTES)
VALUES('2.0.15',1,1,'Added a new question to the list in Change Vendor Request. Added a new column in Cart Request Report and Vendor Report');

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-87', 'Insert a new application version to add a new question to Change Vendor Request and a new column to Cart Request and Vendor Report', 'V201804041605__Change_application_version_to_2.0.15.sql');

COMMIT;