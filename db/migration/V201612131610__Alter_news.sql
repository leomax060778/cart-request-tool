alter table "CART_REQUEST_TOOL"."NEWS" add ("CONTENT" TEXT null);

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-04', 'Alter table news to support content', 'V201612131610__Alter_news.sql');

COMMIT;