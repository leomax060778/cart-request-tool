-- *************************************************************************************
-- Update schema version
ALTER TABLE "CART_REQUEST_TOOL"."USER" ADD (DATA_PROTECTION_ENABLED TINYINT DEFAULT 0);

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-88', 'Add column DATA_PROTECTION_ENABLED to table USER', 'V201804091135__Alter_table_user_add_data_protection_enabled.sql');

COMMIT;