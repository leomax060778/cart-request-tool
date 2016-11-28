CREATE COLUMN TABLE "CART_REQUEST_TOOL"."CHANGE_VENDOR_REQUEST_MESSAGE"
(
	 CHANGE_VENDOR_REQUEST_MESSAGE_ID BIGINT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
	 CHANGE_VENDOR_REQUEST_ID BIGINT NOT NULL,
	 MESSAGE_CONTENT NVARCHAR(1000) NOT NULL,
	 RETURN_TYPE_ID INTEGER DEFAULT 0,
	 ISSUE_TYPE_ID INTEGER DEFAULT 0,
	 MESSAGE_READ TINYINT,
	 USER_ID_READ BIGINT,
	 DATE_READ_TZ TIMESTAMP,
	 CREATED_DATE_TZ TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	 MODIFIED_DATE_TZ TIMESTAMP,
	 CREATED_USER_ID BIGINT NOT NULL,
	 MODIFIED_USER_ID BIGINT,
	 ENABLED TINYINT DEFAULT 1,
	 DELETED TINYINT DEFAULT 0
);

ALTER TABLE "CART_REQUEST_TOOL"."CHANGE_VENDOR_REQUEST_MESSAGE" ADD FOREIGN KEY ( "CHANGE_VENDOR_REQUEST_ID" ) REFERENCES "CART_REQUEST_TOOL"."CHANGE_VENDOR_REQUEST" ("CHANGE_VENDOR_REQUEST_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "CART_REQUEST_TOOL"."CHANGE_VENDOR_REQUEST_MESSAGE" ADD FOREIGN KEY ( "USER_ID_READ" ) REFERENCES "CART_REQUEST_TOOL"."USER" ("USER_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;