-- *************************************************************************************
-- Update schema version
ALTER TABLE "CART_REQUEST_TOOL"."VENDOR" ADD (DATA_PROTECTION_ENABLED TINYINT DEFAULT 0);

-- *************************************************************************************
-- Update schema version
INSERT INTO APPLICATION_VERSION(VERSION, APPLICATION_ID, CREATED_USER_ID, RELEASE_NOTES)
VALUES('2.0.14',1,1,'Added checkbox to tab Vendor in administration. Supported ''Is your Vendor Data Protection enabled?'' radio button autopopulation in Cart Request. Moved Vendor information section above Data Protection section.');

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-85', 'Add DATA_PROTECTION_ENABLED column to VENDOR table', 'V201803191600__Alter_vendor_table_add_data_protection_enabled_column.sql');

COMMIT;