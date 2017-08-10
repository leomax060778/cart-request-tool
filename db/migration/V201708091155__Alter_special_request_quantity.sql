-- *************************************************************************************
-- Drop column quantity and create it with integer as data type

ALTER TABLE "CART_REQUEST_TOOL"."SPECIAL_REQUEST" DROP ("QUANTITY");
ALTER TABLE "CART_REQUEST_TOOL"."SPECIAL_REQUEST" ADD (QUANTITY INTEGER);

--No migradted data has quantity values but, in order not to conflict with testing data, it is necessary
--to make an update with mock data like this:
--UPDATE "CART_REQUEST_TOOL"."SPECIAL_REQUEST" SET QUANTITY = 1 WHERE REQUEST_ID > 386;
	
-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-58', 'Change data type of the column Quantity from decimal to integer', 'V201708091155__Alter_special_request_quantity.sql');

COMMIT;