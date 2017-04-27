--Modify courtryService New Cart Request resource by New Vendor Request, on permission_service table

UPDATE "CART_REQUEST_TOOL"."PERMISSION_SERVICE"
	SET RESOURCE_ID = 3
WHERE PERMISSION_SERVICE_ID = 44

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-43', 'Modify courtryService resource on permission_service table', 'V201704261415__Modify_countryService_resource_Permission_service_table.sql');

COMMIT;