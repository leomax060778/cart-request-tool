-- *************************************************************************************
-- Add column into BUDGET_YEAR table to support New Cart Request availability

ALTER TABLE "CART_REQUEST_TOOL"."BUDGET_YEAR" ADD(NEW_CART_REQUEST_ENABLED TINYINT DEFAULT 1);

-- Add permissions to Create/Edit and Delete
insert into "CART_REQUEST_TOOL"."PERMISSION_SERVICE"(PERMISSION_SERVICE_ID, SERVICE_NAME, PERMISSION_ID, RESOURCE_ID,CREATED_USER_ID) values(208,'budgetYearService',10,6,1);
insert into "CART_REQUEST_TOOL"."PERMISSION_SERVICE"(PERMISSION_SERVICE_ID, SERVICE_NAME, PERMISSION_ID, RESOURCE_ID,CREATED_USER_ID) values(209,'budgetYearService',11,6,1);

-- Add new POP UP information
INSERT INTO "CART_REQUEST_TOOL"."POP_UP"(name, content, code, created_user_id) 
  VALUES('Budget Year New Cart Request enabled', '<p>If the switch button is "Yes", then this Budget Year will appear in the dropDown list in New Cart Request. Otherwise, it will not appear.</p>', 'NEW_CART_REQUEST_ENABLED_POP_UP', 1);

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-56', 'Add column into Budget Year table', 'V201707271555__Add_column_Budget_Year_table.sql');

COMMIT;