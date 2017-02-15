/* Alter Data Protection table: SHORT_DESCRIPTION changed to "NOT NULL" */
alter table "CART_REQUEST_TOOL"."DATA_PROTECTION_QUESTION" alter ("SHORT_DESCRIPTION" NVARCHAR(255) NOT NULL)

/* New permission for the service: currencyService */
insert into "CART_REQUEST_TOOL"."PERMISSION_SERVICE"(PERMISSION_SERVICE_ID, SERVICE_NAME, PERMISSION_ID, RESOURCE_ID,CREATED_USER_ID) values(179,'currencyService',10,6,1);


-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V5.0.0-20', 'Modified DATA_PROTECTION_QUESTION: SHORT_DESCRIPTION changed to NOT NULL - Added new Permision for the currencyService', 'V201702151340__Alter_data_protection_question_Added_currencyService_permission.sql');

COMMIT;