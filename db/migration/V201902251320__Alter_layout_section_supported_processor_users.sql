-- *************************************************************************************
-- Layout Section

-- Insert Home Header text
INSERT INTO LAYOUT_SECTION (BLOCK_TYPE, BLOCK_CONTENT, CREATED_USER_ID)
VALUES ('Home - Header', 'Welcome to the Cart Request Tool (CRT) for the GB & GC Marketing teams. CRT automates the Business Management shopping cart request process to support requesters purchasing against the following SAP entities: SAP Global Marketing, SAP SE, SAP America, and SAP Canada. In addition, you can submit vendor requests and inquiries, download current SOW templates, and find training materials.', 1);

-- Rename table columns
RENAME COLUMN LAYOUT_SECTION.BLOCK_TYPE TO NAME;
RENAME COLUMN LAYOUT_SECTION.BLOCK_CONTENT TO CONTENT;

-- Add permissions for services
INSERT INTO "CART_REQUEST_TOOL"."PERMISSION_SERVICE"(SERVICE_NAME, PERMISSION_ID, RESOURCE_ID,CREATED_USER_ID) VALUES('layoutSectionService',9,6,1);
INSERT INTO "CART_REQUEST_TOOL"."PERMISSION_SERVICE"(SERVICE_NAME, PERMISSION_ID, RESOURCE_ID,CREATED_USER_ID) VALUES('layoutSectionService',10,6,1);

-- *************************************************************************************
-- Processor

-- Add column to REQUEST table
ALTER TABLE "CART_REQUEST_TOOL"."REQUEST" ADD (PROCESSOR_USER_ID BIGINT);

-- *************************************************************************************
-- Update crt version
INSERT INTO APPLICATION_VERSION(VERSION, APPLICATION_ID, CREATED_USER_ID, RELEASE_NOTES)
VALUES('2.0.20',1,1,'Added Layout Section and Customization tabs in Administration. Supported Processor users for Cart Request in Processing Report');

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V2.0.0-93', 'Insert home header to LAYOUT_SECTION table, alter LAYOUT_SECTION table columns name, created PROCESSOR_USER_ID column in REQUEST table, supported Processor user for Cart Request in Processing Report', 'V201902251320__Alter_layout_section_supported_processor_users.sql');

COMMIT;