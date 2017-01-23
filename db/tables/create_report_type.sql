CREATE COLUMN TABLE "CART_REQUEST_TOOL".REPORT_TYPE
(
	REPORT_TYPE_ID BIGINT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
	NAME NVARCHAR(100) NOT NULL,
	DESCRIPTION NVARCHAR(255),
	EXTERNAL_LINK NVARCHAR(255),
	CREATED_DATE_TZ TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	MODIFIED_DATE_TZ TIMESTAMP,
	CREATED_USER_ID BIGINT NOT NULL,
	MODIFIED_USER_ID BIGINT,
	ENABLED TINYINT DEFAULT 1, 
	DELETED TINYINT DEFAULT 0
);