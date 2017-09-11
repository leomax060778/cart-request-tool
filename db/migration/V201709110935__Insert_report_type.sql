-- *************************************************************************************
-- Insert new report type names

INSERT INTO "CART_REQUEST_TOOL"."REPORT_TYPE" (NAME, DESCRIPTION, CREATED_USER_ID)
	VALUES ('Cart Report Requester', 'Detailed report of Cart Requests created by the user', 1);

INSERT INTO "CART_REQUEST_TOOL"."REPORT_TYPE" (NAME, DESCRIPTION, CREATED_USER_ID)
	VALUES ('Cart Report Team', 'Detailed report of Cart Requests created by all the users associated with the team of the Budget Owner / Mgr', 1);

-- *************************************************************************************
-- Update cart request report name

UPDATE "CART_REQUEST_TOOL"."REPORT_TYPE"
SET NAME = 'Cart Report All'
WHERE REPORT_TYPE_ID = 1;


-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-61', 'Insert new report type names', 'V201709110935__Insert_report_type');

COMMIT;