alter table "CART_REQUEST_TOOL"."REQUEST" alter ("INFRASTRUCTURE_OF_WORK_ID" BIGINT null);
alter table "CART_REQUEST_TOOL"."REQUEST" alter ("LOCATION_OF_WORK_ID" BIGINT null);

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-10', 'Alter request table to make nullable INFRASTRUCTURE_OF_WORK_ID and LOCATION_OF_WORK_ID', 'V201701061245__Alter_request.sql');

COMMIT;