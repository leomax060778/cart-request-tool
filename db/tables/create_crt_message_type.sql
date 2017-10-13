CREATE COLUMN TABLE "CART_REQUEST_TOOL".CRT_MESSAGE_TYPE
(
	CRT_TYPE_ID BIGINT NOT NULL,
	MESSAGE_TYPE_ID BIGINT NOT NULL,
	STATUS_ID BIGINT DEFAULT 0,
	
	CREATED_DATE_TZ TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	MODIFIED_DATE_TZ TIMESTAMP,
	CREATED_USER_ID BIGINT NOT NULL,
	MODIFIED_USER_ID BIGINT,
	ENABLED TINYINT DEFAULT 1, 
	DELETED TINYINT DEFAULT 0
);
ALTER TABLE "CART_REQUEST_TOOL"."CRT_MESSAGE_TYPE" ADD FOREIGN KEY ( "CRT_TYPE_ID" ) REFERENCES "CART_REQUEST_TOOL"."CRT_TYPE" ("CRT_TYPE_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "CART_REQUEST_TOOL"."CRT_MESSAGE_TYPE" ADD FOREIGN KEY ( "MESSAGE_TYPE_ID" ) REFERENCES "CART_REQUEST_TOOL"."MESSAGE_TYPE" ("MESSAGE_TYPE_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;