-- *************************************************************************************
-- Alter Change Vendor Request Message
RENAME COLUMN "CART_REQUEST_TOOL"."CHANGE_VENDOR_REQUEST_MESSAGE".MESSAGE_CONTENT TO MESSAGE_CONTENT_BKP;
ALTER TABLE "CART_REQUEST_TOOL"."CHANGE_VENDOR_REQUEST_MESSAGE" ADD ("MESSAGE_CONTENT" TEXT NOT NULL);

-- *************************************************************************************
-- Alter Extend Vendor Request Message
RENAME COLUMN "CART_REQUEST_TOOL"."EXTEND_VENDOR_REQUEST_MESSAGE".MESSAGE_CONTENT TO MESSAGE_CONTENT_BKP;
ALTER TABLE "CART_REQUEST_TOOL"."EXTEND_VENDOR_REQUEST_MESSAGE" ADD ("MESSAGE_CONTENT" TEXT NOT NULL);

-- *************************************************************************************
-- Alter Vendor Request Message
RENAME COLUMN "CART_REQUEST_TOOL"."VENDOR_REQUEST_MESSAGE".MESSAGE_CONTENT TO MESSAGE_CONTENT_BKP;
ALTER TABLE "CART_REQUEST_TOOL"."VENDOR_REQUEST_MESSAGE" ADD ("MESSAGE_CONTENT" TEXT NOT NULL);

-- *************************************************************************************
-- Alter Vendor Inquiry Message
RENAME COLUMN "CART_REQUEST_TOOL"."VENDOR_INQUIRY_MESSAGE".MESSAGE_CONTENT TO MESSAGE_CONTENT_BKP;
ALTER TABLE "CART_REQUEST_TOOL"."VENDOR_INQUIRY_MESSAGE" ADD ("MESSAGE_CONTENT" TEXT NOT NULL);

-- *************************************************************************************
-- Alter CRT Inquiry Message
RENAME COLUMN "CART_REQUEST_TOOL"."INQUIRY_MESSAGE".MESSAGE_CONTENT TO MESSAGE_CONTENT_BKP;
ALTER TABLE "CART_REQUEST_TOOL"."INQUIRY_MESSAGE" ADD ("MESSAGE_CONTENT" TEXT NOT NULL);

-- *************************************************************************************
-- Alter Cart Request Message
RENAME COLUMN "CART_REQUEST_TOOL"."REQUEST_MESSAGE".MESSAGE_CONTENT TO MESSAGE_CONTENT_BKP;
ALTER TABLE "CART_REQUEST_TOOL"."REQUEST_MESSAGE" ADD ("MESSAGE_CONTENT" TEXT NOT NULL);

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-30', 'Alter data type of MESSAGE_CONTENT from NVARCHAR(255) to TEXT', 'V201703221655__Alter_message_tables.sql');

COMMIT;