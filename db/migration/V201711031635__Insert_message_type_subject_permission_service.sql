INSERT INTO "CART_REQUEST_TOOL"."PERMISSION_SERVICE"(SERVICE_NAME, PERMISSION_ID, RESOURCE_ID, CREATED_USER_ID)
VALUES('messageTypeService',9,2,1);

INSERT INTO "CART_REQUEST_TOOL"."PERMISSION_SERVICE"(SERVICE_NAME, PERMISSION_ID, RESOURCE_ID, CREATED_USER_ID)
VALUES('subjectService',9,2,1);

INSERT INTO "CART_REQUEST_TOOL"."PERMISSION_SERVICE"(service_name, permission_id, resource_id, created_user_id)
VALUES('messageTypeService',9,3,1);

INSERT INTO "CART_REQUEST_TOOL"."PERMISSION_SERVICE"(service_name, permission_id, resource_id, created_user_id)
VALUES('subjectService',9,3,1);

INSERT INTO "CART_REQUEST_TOOL"."PERMISSION_SERVICE"(service_name, permission_id, resource_id, created_user_id)
VALUES('messageTypeService',9,7,1);

INSERT INTO "CART_REQUEST_TOOL"."PERMISSION_SERVICE"(service_name, permission_id, resource_id, created_user_id)
VALUES('subjectService',9,7,1);

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-67', 'Insert permission to use message type and subject in all resources', 'V201711031635__Insert_message_type_subject_permission_service.sql');

COMMIT;