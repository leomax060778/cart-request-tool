CREATE COLUMN TABLE "CART_REQUEST_TOOL".NOTE_TYPE 
(
NOTE_TYPE_ID BIGINT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
NOTE_TYPE_NAME NVARCHAR (255) NOT NULL,
NOTE_TYPE_DESCRIPTION NVARCHAR(1000),
NOTE_POSITION INTEGER,

CREATED_DATE_TZ TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
MODIFIED_DATE_TZ TIMESTAMP,
CREATED_USER_ID BIGINT NOT NULL,
MODIFIED_USER_ID BIGINT,
ENABLED TINYINT DEFAULT 1, 
DELETED TINYINT DEFAULT 0
);