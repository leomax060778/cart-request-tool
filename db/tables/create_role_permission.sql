CREATE COLUMN TABLE "CART_REQUEST_TOOL"."ROLE_PERMISSION"
(
	ROLE_PERMISSION_ID BIGINT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
	ROLE_ID BIGINT NOT NULL,
	RESOURCE_ID BIGINT NOT NULL,
	PERMISSION_ID BIGINT NOT NULL,
	CREATED_DATE_TZ TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	MODIFIED_DATE_TZ TIMESTAMP,
	CREATED_USER_ID BIGINT NOT NULL,
	MODIFIED_USER_ID BIGINT,
	ENABLED TINYINT DEFAULT 1, 
	DELETED TINYINT DEFAULT 0
);

ALTER TABLE "CART_REQUEST_TOOL"."ROLE_PERMISSION" ADD FOREIGN KEY ( "ROLE_ID" ) REFERENCES "CART_REQUEST_TOOL"."ROLE" ("ROLE_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;

ALTER TABLE "CART_REQUEST_TOOL"."ROLE_PERMISSION" ADD FOREIGN KEY ( "PERMISSION_ID" ) REFERENCES "CART_REQUEST_TOOL"."PERMISSION" ("PERMISSION_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;

