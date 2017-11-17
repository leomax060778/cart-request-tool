ALTER TABLE "CART_REQUEST_TOOL"."APPLICATION_VERSION" DROP (RELEASE_NOTES);
ALTER TABLE "CART_REQUEST_TOOL"."APPLICATION_VERSION" ADD (RELEASE_NOTES TEXT);

-- *************************************************************************************
-- Update schema version
INSERT INTO APPLICATION_VERSION(VERSION, APPLICATION_ID, CREATED_USER_ID, RELEASE_NOTES)
VALUES('2.0.1',1,1,'Improvement to force browser to recognize changes and re-load the page to avoid cache issues');

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-65', 'Alter RELEASE_NOTES data type from NVARCHAR to TEXT', 'V201710310905__Alter_application_version.sql');

COMMIT;