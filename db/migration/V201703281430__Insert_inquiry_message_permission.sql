-- *************************************************************************************
-- Insert permissions for the new service_name assigned to Inquiry message service in Processing Report 
INSERT INTO "CART_REQUEST_TOOL"."PERMISSION_SERVICE"(PERMISSION_SERVICE_ID, SERVICE_NAME, PERMISSION_ID, RESOURCE_ID,CREATED_USER_ID) values(186,'inquiryProcessingReportMessageService',9,13,1);
INSERT INTO "CART_REQUEST_TOOL"."PERMISSION_SERVICE"(PERMISSION_SERVICE_ID, SERVICE_NAME, PERMISSION_ID, RESOURCE_ID,CREATED_USER_ID) values(187,'inquiryProcessingReportMessageService',10,13,1);


-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-32', 'Insert Inquiry permissions for Message service in Processing Report', 'V201703281430__Insert_inquiry_message_permission.sql');

COMMIT;