-- *************************************************************************************
-- Add column

ALTER TABLE "CART_REQUEST_TOOL"."REQUEST" ADD (VENDOR_ADDITIONAL_INFORMATION_ID BIGINT);

-- *************************************************************************************
-- Set VENDOR_ADDITIONAL_INFORMATION_ID to each request. All vendors have the same id
-- as their corresponding additional information for each migrated CR

UPDATE "CART_REQUEST_TOOL"."REQUEST" SET VENDOR_ADDITIONAL_INFORMATION_ID = VENDOR_ID;
	
-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-59', 'Add VENDOR_ADDITIONAL_INFORMATION_ID to the REQUEST table', 'V2017081335__Add_vendor_additional_information_id.sql');

COMMIT;