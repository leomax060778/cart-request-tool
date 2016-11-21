CREATE COLUMN TABLE "CART_REQUEST_TOOL".INFRASTRUCTURE_OF_WORK
(
INFRASTRUCTURE_OF_WORK_ID BIGINT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
INFRASTRUCTURE_NAME NVARCHAR (255) NOT NULL,

CREATED_DATE_TZ TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
MODIFIED_DATE_TZ TIMESTAMP,
CREATED_USER_ID BIGINT NOT NULL,
MODIFIED_USER_ID BIGINT,
ENABLED TINYINT DEFAULT 1,
DELETED TINYINT DEFAULT 0
)
