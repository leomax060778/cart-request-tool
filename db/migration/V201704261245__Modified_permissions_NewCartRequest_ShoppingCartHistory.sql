--New permission for the resource: New Cart Request
insert into "CART_REQUEST_TOOL"."PERMISSION_SERVICE"(PERMISSION_SERVICE_ID, SERVICE_NAME, PERMISSION_ID, RESOURCE_ID,CREATED_USER_ID) values(207,'ncr_requestService',9,1,1);

--Delete extra permission for the resource: Shopping Cart History
DELETE FROM "CART_REQUEST_TOOL"."PERMISSION_SERVICE" WHERE PERMISSION_SERVICE_ID = 100;

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-42', 'Modified permissions for New Cart Request and Shopping Cart History resources', 'V201704261245__Modified_permissions_NewCartRequest_ShoppingCartHistory.sql');

COMMIT;