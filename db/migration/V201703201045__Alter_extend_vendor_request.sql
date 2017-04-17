ALTER TABLE "CART_REQUEST_TOOL"."EXTEND_VENDOR_REQUEST" ADD ("VENDOR_ACCOUNT" NVARCHAR(255) NULL);

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-28', 'Alter Extend Vendor Request to add VENDOR_ACCOUNT column', 'V201703201045__Alter_extend_vendor_request.sql');

COMMIT;