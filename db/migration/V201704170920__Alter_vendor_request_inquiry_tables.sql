/*--------------- ADDITIONAL INFORMATION MIGRATION ---------------*/

/* Setting additional information to 0 to convert it in Tinyint later. */

UPDATE "CART_REQUEST_TOOL"."VENDOR_REQUEST"
	SET 
	"VENDOR_REQUEST".additional_information = 0
	WHERE 1=1;
	
UPDATE "CART_REQUEST_TOOL"."CHANGE_VENDOR_REQUEST"
	SET 
	"CHANGE_VENDOR_REQUEST".additional_information = 0
	WHERE 1=1;
	
UPDATE "CART_REQUEST_TOOL"."EXTEND_VENDOR_REQUEST"
	SET 
	"EXTEND_VENDOR_REQUEST".additional_information = 0
	WHERE 1=1;
	
-- *************************************************************************************

-- *************************************************************************************
-- Change ADDITIONAL INFORMATION from nvarchar(1000) to tinyint.

ALTER TABLE "CART_REQUEST_TOOL"."VENDOR_REQUEST" ALTER (ADDITIONAL_INFORMATION TINYINT DEFAULT 0);
ALTER TABLE "CART_REQUEST_TOOL"."CHANGE_VENDOR_REQUEST" ALTER (ADDITIONAL_INFORMATION TINYINT DEFAULT 0);
ALTER TABLE "CART_REQUEST_TOOL"."EXTEND_VENDOR_REQUEST" ALTER (ADDITIONAL_INFORMATION TINYINT DEFAULT 0);

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-37', 'Alter Vendor Request/Inquiry tables, alter column ADDITIONAL_INFORMATION to TINYINT', 'V201704170920__Alter_vendor_request_inquiry_tables.sql');

COMMIT;