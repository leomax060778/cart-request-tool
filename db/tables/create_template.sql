CREATE COLUMN TABLE "CART_REQUEST_TOOL"."TEMPLATE"
(
	 TEMPLATE_ID BIGINT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
	 USER_ID BIGINT NOT NULL,
	 TEMPLATE_TYPE_ID BIGINT NOT NULL,
	 TEMPLATE_PARENT_ID BIGINT,
	 NAME NVARCHAR(2048) NOT NULL,
	 LINK NVARCHAR(2048) NOT NULL,
	 TEMPLATE_ORDER INTEGER,
	 DELETED_TEMPLATE_NAME NVARCHAR(255),
	 DESCRIPTION NVARCHAR(1000) NOT NULL,
	 SECTION_ID BIGINT NOT NULL,
	 ATTACHMENT_ID BIGINT,
	 
	 CREATED_USER_ID BIGINT NOT NULL,
	 CREATED_DATE_TZ TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	 MODIFIED_DATE_TZ TIMESTAMP,
	 MODIFIED_USER_ID BIGINT,
	 ENABLED TINYINT DEFAULT 1,
	 DELETED TINYINT DEFAULT 0
);

ALTER TABLE "CART_REQUEST_TOOL"."TEMPLATE" ADD FOREIGN KEY ( "TEMPLATE_TYPE_ID" ) REFERENCES "CART_REQUEST_TOOL"."TEMPLATE_TYPE" ("TEMPLATE_TYPE_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "CART_REQUEST_TOOL"."TEMPLATE" ADD FOREIGN KEY ( "USER_ID" ) REFERENCES "CART_REQUEST_TOOL"."USER" ("USER_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "CART_REQUEST_TOOL"."TEMPLATE" ADD FOREIGN KEY ( "SECTION_ID" ) REFERENCES "CART_REQUEST_TOOL"."TEMPLATE_SECTION" ("SECTION_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;