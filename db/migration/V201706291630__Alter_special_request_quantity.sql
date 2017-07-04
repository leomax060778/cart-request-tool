-- *************************************************************************************
-- Alter table special request

ALTER TABLE "CART_REQUEST_TOOL"."SPECIAL_REQUEST" ADD ("QUANTITY" DECIMAL(19,3));

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-52', 'Alter Special Request Quantity column data type', 'V201706291630__Alter_special_request_quantity.sql');

COMMIT;