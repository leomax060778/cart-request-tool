ALTER TABLE "CART_REQUEST_TOOL"."CHANGE_VENDOR_REQUEST" ADD ("ADDITIONAL_INFORMATION" NVARCHAR(1000) NULL);

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-27', 'Alter Change Vendor Request to add ADDITIONAL_INFORMATION column', 'V201703151650__Alter_change_vendor_request.sql');

COMMIT;