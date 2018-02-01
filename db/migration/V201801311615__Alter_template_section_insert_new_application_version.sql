ALTER TABLE "CART_REQUEST_TOOL"."TEMPLATE_SECTION" ADD (SECTION_ORDER INTEGER DEFAULT 0);

-- *************************************************************************************
-- Update schema version
INSERT INTO APPLICATION_VERSION(VERSION, APPLICATION_ID, CREATED_USER_ID, RELEASE_NOTES)
VALUES('2.0.11',1,1,'Improvements in GPO Info & Templates and Training & Education. Set most recent children date as date for parent folder. Added order for Sections and files.');

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V2.0.0-80', 'ALTER TEMPLATE_SECTION and TRAINING tables', 'V201801311615__Alter_template_section_insert_new_application_version.sql');

COMMIT;