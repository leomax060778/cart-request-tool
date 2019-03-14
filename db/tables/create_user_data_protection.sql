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