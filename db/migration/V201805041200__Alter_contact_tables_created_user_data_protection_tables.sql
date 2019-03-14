-- *************************************************************************************
-- Add mask contact columns
ALTER TABLE "CART_REQUEST_TOOL"."VENDOR_CONTACT_INFORMATION" ADD (MASKED_VENDOR TINYINT DEFAULT 0);

ALTER TABLE "CART_REQUEST_TOOL"."NON_SAP_VENDOR" ADD (MASKED_NON_SAP_VENDOR TINYINT DEFAULT 0);

ALTER TABLE "CART_REQUEST_TOOL"."REQUEST" ADD (MASKED_ALTERNATIVE_VENDOR TINYINT DEFAULT 0);

ALTER TABLE "CART_REQUEST_TOOL"."CHANGE_VENDOR_REQUEST" ADD (MASKED_VENDOR TINYINT DEFAULT 0);

ALTER TABLE "CART_REQUEST_TOOL"."EXTEND_VENDOR_REQUEST" ADD (MASKED_VENDOR TINYINT DEFAULT 0);

-- *************************************************************************************
-- Insert permissions to non SAP vendor service
INSERT INTO "CART_REQUEST_TOOL"."PERMISSION_SERVICE"(service_name, permission_id, resource_id, created_user_id)
VALUES('nonSapVendorService',9,6,1);

INSERT INTO "CART_REQUEST_TOOL"."PERMISSION_SERVICE"(service_name, permission_id, resource_id, created_user_id)
VALUES('nonSapVendorService',10,6,1);

INSERT INTO "CART_REQUEST_TOOL"."PERMISSION_SERVICE"(service_name, permission_id, resource_id, created_user_id)
VALUES('nonSapVendorService',11,6,1);

-- *************************************************************************************
-- Create tables for GDPR second step

--************ Create USER_DATA_PROTECTION_STATUS table ************

-- 1: Pending, 2: Approved, 3: Rejected
CREATE COLUMN TABLE "CART_REQUEST_TOOL"."USER_DATA_PROTECTION_STATUS"(
	USER_DATA_PROTECTION_STATUS_ID BIGINT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
	NAME NVARCHAR(255) NOT NULL,

	ENABLED TINYINT DEFAULT 1,
	DELETED TINYINT DEFAULT 0,

	CREATED_USER_ID BIGINT NOT NULL,
	MODIFIED_USER_ID BIGINT,
	CREATED_DATE_TZ TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	MODIFIED_DATE_TZ TIMESTAMP
);

ALTER TABLE "CART_REQUEST_TOOL"."USER_DATA_PROTECTION_STATUS" ADD FOREIGN KEY ( "CREATED_USER_ID" ) REFERENCES "CART_REQUEST_TOOL"."USER" ("USER_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;

--************ Populate Table ************
INSERT INTO "CART_REQUEST_TOOL"."USER_DATA_PROTECTION_STATUS"(USER_DATA_PROTECTION_STATUS_ID, NAME, CREATED_USER_ID)
	VALUES(1, 'Pending', 1);

INSERT INTO "CART_REQUEST_TOOL"."USER_DATA_PROTECTION_STATUS"(USER_DATA_PROTECTION_STATUS_ID, NAME, CREATED_USER_ID)
	VALUES(2, 'Approved', 1);

INSERT INTO "CART_REQUEST_TOOL"."USER_DATA_PROTECTION_STATUS"(USER_DATA_PROTECTION_STATUS_ID, NAME, CREATED_USER_ID)
	VALUES(3, 'Rejected', 1);

--************ Create USER_DATA_PROTECTION table ************
CREATE COLUMN TABLE "CART_REQUEST_TOOL"."USER_DATA_PROTECTION"(
	USER_DATA_PROTECTION_ID BIGINT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
	USER_ID BIGINT NOT NULL,
	USER_DATA_PROTECTION_STATUS_ID BIGINT DEFAULT 1,

	ENABLED TINYINT DEFAULT 1,
	DELETED TINYINT DEFAULT 0,

	CREATED_USER_ID BIGINT NOT NULL,
	MODIFIED_USER_ID BIGINT,
	CREATED_DATE_TZ TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	MODIFIED_DATE_TZ TIMESTAMP
);

ALTER TABLE "CART_REQUEST_TOOL"."USER_DATA_PROTECTION" ADD FOREIGN KEY ( "USER_ID" ) REFERENCES "CART_REQUEST_TOOL"."USER" ("USER_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "CART_REQUEST_TOOL"."USER_DATA_PROTECTION" ADD FOREIGN KEY ( "CREATED_USER_ID" ) REFERENCES "CART_REQUEST_TOOL"."USER" ("USER_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "CART_REQUEST_TOOL"."USER_DATA_PROTECTION" ADD FOREIGN KEY ( "USER_DATA_PROTECTION_STATUS_ID" ) REFERENCES "CART_REQUEST_TOOL"."USER_DATA_PROTECTION_STATUS" ("USER_DATA_PROTECTION_STATUS_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;

-- *************************************************************************************
-- Insert permissions to non SAP vendor service
INSERT INTO "CART_REQUEST_TOOL"."PERMISSION_SERVICE"(service_name, permission_id, resource_id, created_user_id)
VALUES('userDataProtectionService',9,6,1);

INSERT INTO "CART_REQUEST_TOOL"."PERMISSION_SERVICE"(service_name, permission_id, resource_id, created_user_id)
VALUES('userDataProtectionService',10,6,1);

INSERT INTO "CART_REQUEST_TOOL"."PERMISSION_SERVICE"(service_name, permission_id, resource_id, created_user_id)
VALUES('userDataProtectionService',11,6,1);

-- *************************************************************************************
-- Update crt version
INSERT INTO APPLICATION_VERSION(VERSION, APPLICATION_ID, CREATED_USER_ID, RELEASE_NOTES)
VALUES('2.0.16',1,1,'Created administration tabs to apply GDPR to the vendor contacts and users');

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V2.0.0-89', 'Implemented second step to apply GDPR to users, implemented methods to apply GDPR to Vendor Contacts', 'V201805041200__Alter_contact_tables_created_user_data_protection_tables.sql');

COMMIT;