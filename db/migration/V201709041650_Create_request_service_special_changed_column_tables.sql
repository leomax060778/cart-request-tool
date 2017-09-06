-- *************************************************************************************
-- Create REQUEST_CHANGED_COLUMN table
CREATE COLUMN TABLE "CART_REQUEST_TOOL"."REQUEST_CHANGED_COLUMN" (
			REQUEST_CHANGED_COLUMN_ID BIGINT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
			REQUEST_ID BIGINT NOT NULL,
			COLUMN_NAME NVARCHAR(255) NOT NULL,
			COLUMN_CHANGED TINYINT,
			DISPLAY_NAME NVARCHAR(255),

			CREATED_DATE_TZ TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		 	MODIFIED_DATE_TZ TIMESTAMP,
		 	CREATED_USER_ID BIGINT NOT NULL,
		 	MODIFIED_USER_ID BIGINT,
		 	ENABLED TINYINT DEFAULT 1,
		 	DELETED TINYINT DEFAULT 0
);

ALTER TABLE "CART_REQUEST_TOOL"."REQUEST_CHANGED_COLUMN" ADD FOREIGN KEY ( "REQUEST_ID" ) REFERENCES "CART_REQUEST_TOOL"."REQUEST" ("REQUEST_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
-- *************************************************************************************
-- Create SERVICE_CHANGED_COLUMN table
CREATE COLUMN TABLE "CART_REQUEST_TOOL"."SERVICE_CHANGED_COLUMN" (
			SERVICE_CHANGED_COLUMN_ID BIGINT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
			REQUEST_ID BIGINT NOT NULL,
			SERVICE_ID BIGINT NOT NULL,
			COLUMN_NAME NVARCHAR(255) NOT NULL,
			COLUMN_CHANGED TINYINT,
			DISPLAY_NAME NVARCHAR(255),

			CREATED_DATE_TZ TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		 	MODIFIED_DATE_TZ TIMESTAMP,
		 	CREATED_USER_ID BIGINT NOT NULL,
		 	MODIFIED_USER_ID BIGINT,
		 	ENABLED TINYINT DEFAULT 1,
		 	DELETED TINYINT DEFAULT 0
);

ALTER TABLE "CART_REQUEST_TOOL"."SERVICE_CHANGED_COLUMN" ADD FOREIGN KEY ( "REQUEST_ID" ) REFERENCES "CART_REQUEST_TOOL"."REQUEST" ("REQUEST_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "CART_REQUEST_TOOL"."SERVICE_CHANGED_COLUMN" ADD FOREIGN KEY ( "SERVICE_ID" ) REFERENCES "CART_REQUEST_TOOL"."SERVICE" ("SERVICE_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
-- *************************************************************************************
-- Create SPECIAL_REQUEST_CHANGED_COLUMN table
CREATE COLUMN TABLE "CART_REQUEST_TOOL"."SPECIAL_REQUEST_CHANGED_COLUMN" (
			SPECIAL_REQUEST_CHANGED_COLUMN_ID BIGINT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
			REQUEST_ID BIGINT NOT NULL,
			SPECIAL_REQUEST_ID BIGINT NOT NULL,
			COLUMN_NAME NVARCHAR(255) NOT NULL,
			COLUMN_CHANGED TINYINT,
			DISPLAY_NAME NVARCHAR(255),

			CREATED_DATE_TZ TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		 	MODIFIED_DATE_TZ TIMESTAMP,
		 	CREATED_USER_ID BIGINT NOT NULL,
		 	MODIFIED_USER_ID BIGINT,
		 	ENABLED TINYINT DEFAULT 1,
		 	DELETED TINYINT DEFAULT 0
);

ALTER TABLE "CART_REQUEST_TOOL"."SPECIAL_REQUEST_CHANGED_COLUMN" ADD FOREIGN KEY ( "REQUEST_ID" ) REFERENCES "CART_REQUEST_TOOL"."REQUEST" ("REQUEST_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "CART_REQUEST_TOOL"."SPECIAL_REQUEST_CHANGED_COLUMN" ADD FOREIGN KEY ( "SPECIAL_REQUEST_CHANGED_COLUMN_ID" ) REFERENCES "CART_REQUEST_TOOL"."SPECIAL_REQUEST_CHANGED_COLUMN" ("SPECIAL_REQUEST_CHANGED_COLUMN_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;

	
-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-60', 'Create Request changed column, service changed column, special request changed column tables to register changes on processing report', 'V201709041650_Create_request_service_special_changed_column_tables.sql');

COMMIT;