-- *************************************************************************************
-- Alter column RECEIVER_MODIFIED_DATE_TZ from table VENDOR_INQUIRY

RENAME COLUMN "CART_REQUEST_TOOL"."VENDOR_INQUIRY".RECEIVER_MODIFIED_DATE_TZ to RECEIVER_DATE_COMPLETED_TZ;

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-54', 'Alter Vendor Inquiry column name', 'V201707241045__Alter_vendor_inquiry_column.sql');

COMMIT;