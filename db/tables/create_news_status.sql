CREATE COLUMN TABLE NEWS_STATUS(
	NEWS_STATUS_ID  BIGINT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
	NAME NVARCHAR(255) NOT NULL,
	DESCRIPTION NVARCHAR(500),

	CREATED_DATE_TZ  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	MODIFIED_DATE_TZ TIMESTAMP ,
	CREATED_USER_ID BIGINT NOT NULL,
	MODIFIED_USER_ID BIGINT NULL,
	ENABLED TINYINT NULL DEFAULT 1,
	DELETED TINYINT NULL DEFAULT 0
);