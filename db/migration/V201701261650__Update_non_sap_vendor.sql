-- *************************************************************************************
-- Drop Name of Non-Sap Vendor

alter table "CART_REQUEST_TOOL"."NON_SAP_VENDOR" drop ("NAME")

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-15', 'Drop Non-SAP Vendor Name', 'V201701261650__Update_non_sap_vendor.sql');

COMMIT;