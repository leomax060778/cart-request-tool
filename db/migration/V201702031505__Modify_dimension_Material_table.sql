-- *************************************************************************************
-- Increment the dimension of DESCRIPTION and POPUP - MATERIAL TABLE

ALTER TABLE "CART_REQUEST_TOOL"."MATERIAL" ALTER (DESCRIPTION nvarchar(1000) NOT NULL);

ALTER TABLE "CART_REQUEST_TOOL"."MATERIAL" ALTER (POPUP nvarchar(1000) NULL);

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-16', 'Material table: Increment the dimension of DESCRIPTION and POPUP', 'V201702031505__Modify_dimension_Material_table.sql');

COMMIT;