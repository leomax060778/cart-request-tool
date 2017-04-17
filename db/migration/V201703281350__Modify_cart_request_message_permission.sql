-- *************************************************************************************
-- Delete extra permissions for the Shopping Cart History message service
DELETE FROM "CART_REQUEST_TOOL"."PERMISSION_SERVICE" 
	WHERE SERVICE_NAME = 'requestMessageService'
	AND RESOURCE_ID = 13;
	
-- *************************************************************************************
-- Insert permissions for the new service_name assigned to Cart Request message service in Processing Report 
INSERT INTO "CART_REQUEST_TOOL"."PERMISSION_SERVICE"(PERMISSION_SERVICE_ID, SERVICE_NAME, PERMISSION_ID, RESOURCE_ID,CREATED_USER_ID) values(184,'requestProcessinReportMessageService',9,13,1);
INSERT INTO "CART_REQUEST_TOOL"."PERMISSION_SERVICE"(PERMISSION_SERVICE_ID, SERVICE_NAME, PERMISSION_ID, RESOURCE_ID,CREATED_USER_ID) values(185,'requestProcessinReportMessageService',10,13,1);


-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-31', 'Modify cart request permissions for Message service in Processing Report', 'V201703281350__Modify_cart_request_message_permission.sql');

COMMIT;