INSERT INTO "CART_REQUEST_TOOL"."REPORT_TYPE"(NAME, DESCRIPTION, CREATED_USER_ID) VALUES('User Report', 'Detailed report of Users', 1);
INSERT INTO "CART_REQUEST_TOOL"."REPORT_TYPE"(NAME, DESCRIPTION, CREATED_USER_ID) VALUES('Vendor Report', 'Detailed report of Vendors', 1);
INSERT INTO "CART_REQUEST_TOOL"."REPORT_TYPE"(NAME, DESCRIPTION, CREATED_USER_ID) VALUES('Catalog Report', 'Detailed report of Catalogs', 1);
INSERT INTO "CART_REQUEST_TOOL"."REPORT_TYPE"(NAME, DESCRIPTION, CREATED_USER_ID) VALUES('Commodity Report', 'Detailed report of Commodities', 1);

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-29', 'Insert new report types in REPORT_TYPE table', 'V201703211025__Insert_report_type.sql');

COMMIT;