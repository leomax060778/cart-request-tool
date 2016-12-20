--STEPS TO DROP IMAGE_ID CONTRAINT IN NEWS TABLE AND DROP IMAGE_ID COLUMN
-- FIRST
-- select CONSTRAINT_NAME from "REFERENTIAL_CONSTRAINTS"
-- where TABLE_NAME = 'NEWS' AND COLUMN_NAME = 'IMAGE_ID'
-- order by COLUMN_NAME;

-- AFTER REPLACE <CONSTRAINT_NAME> WITH CONSTRAINT_NAME
-- delete the constraint from the table:
-- ALTER TABLE "NEWS" DROP CONSTRAINT <CONSTRAINT_NAME>;

-- FINALLY
--ALTER TABLE "CART_REQUEST_TOOL"."NEWS" DROP ("IMAGE_ID");

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-07', 'Drop image_id contraint in news table', 'V201612160955__Drop_imagen_id_column.sql');

COMMIT;