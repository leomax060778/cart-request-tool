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