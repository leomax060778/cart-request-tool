/* Add permissions to news viewer Service */

insert into "CART_REQUEST_TOOL"."PERMISSION_SERVICE"(PERMISSION_SERVICE_ID, SERVICE_NAME, PERMISSION_ID, RESOURCE_ID,CREATED_USER_ID) values(204,'newsViewerService',9,9,1);
insert into "CART_REQUEST_TOOL"."PERMISSION_SERVICE"(PERMISSION_SERVICE_ID, SERVICE_NAME, PERMISSION_ID, RESOURCE_ID,CREATED_USER_ID) values(205,'newsViewerService',10,9,1);
insert into "CART_REQUEST_TOOL"."PERMISSION_SERVICE"(PERMISSION_SERVICE_ID, SERVICE_NAME, PERMISSION_ID, RESOURCE_ID,CREATED_USER_ID) values(206,'newsViewerService',10,8,1);

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-41', 'Add news viewer permissions', 'V201704261130__Add_News_viewer_permissions.sql');

COMMIT;