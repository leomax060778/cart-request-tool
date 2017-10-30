CREATE COLUMN TABLE "CART_REQUEST_TOOL"."CRT_TYPE_MAIL" 
(
	CRT_TYPE_MAIL_ID BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
	MAIL_ID BIGINT NOT NULL,
	CRT_ISO_CODE NVARCHAR(2) NOT NULL,
	STATUS_ID BIGINT NOT NULL,
	 
	CREATED_DATE_TZ TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	MODIFIED_DATE_TZ TIMESTAMP,
	CREATED_USER_ID BIGINT NOT NULL,
	MODIFIED_USER_ID BIGINT,
	ENABLED TINYINT DEFAULT 1, 
	DELETED TINYINT DEFAULT 0
);