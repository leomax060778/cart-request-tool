UPDATE "RESOURCE" SET NAME = 'Shopping Cart History' WHERE RESOURCE_ID = 2; 

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-05', 'Update resource name "Shopping Cart" to "Shopping Cart History"', 'V201612141230__Update_resource_name.sql');

COMMIT;