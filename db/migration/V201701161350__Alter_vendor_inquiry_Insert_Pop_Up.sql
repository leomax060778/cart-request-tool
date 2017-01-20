ALTER TABLE "CART_REQUEST_TOOL"."VENDOR_INQUIRY" ALTER ("VENDOR_ID" BIGINT null);

INSERT INTO "CART_REQUEST_TOOL"."POP_UP"(name, content, code, created_user_id) 
  VALUES('NVR: Vendor Informal Name', '<p>If is different than Vendor Name</p>', 'VENDOR_INFORMAL_NAME_POP_UP', 1);
  
--STEPS TO DROP VENDOR_ID CONTRAINT IN VENDOR_INQUIRY TABLE
-- FIRST

-- select * from "REFERENTIAL_CONSTRAINTS"
-- where TABLE_NAME = 'VENDOR_INQUIRY'
-- order by COLUMN_NAME

-- AFTER REPLACE <CONSTRAINT_NAME> WITH CONSTRAINT_NAME
-- delete the constraint from the table:
-- ALTER TABLE "VENDOR_INQUIRY" DROP CONSTRAINT <CONSTRAINT_NAME>;
  
-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-12', 'Alter VENDOR_INQUIRY table - Insert new POP UP', 'V201701161350__Alter_vendor_inquiry_Insert_Pop_Up.sql');

COMMIT;