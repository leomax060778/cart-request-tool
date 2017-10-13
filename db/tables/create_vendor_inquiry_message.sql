CREATE COLUMN TABLE "CART_REQUEST_TOOL"."VENDOR_INQUIRY_MESSAGE"
(
	 VENDOR_INQUIRY_MESSAGE_ID BIGINT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
	 VENDOR_INQUIRY_ID BIGINT NOT NULL,
	 MESSAGE_CONTENT TEXT NOT NULL,
	 MESSAGE_TYPE_ID INTEGER DEFAULT 0,
	 SUBJECT_ID INTEGER DEFAULT 0,
	 ADDITIONAL_MESSAGE_TYPE_INFORMATION NVARCHAR(255),
	 ADDITIONAL_SUBJECT_INFORMATION NVARCHAR(255),
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

ALTER TABLE "CART_REQUEST_TOOL"."VENDOR_INQUIRY_MESSAGE" ADD FOREIGN KEY ( "VENDOR_INQUIRY_ID" ) REFERENCES "CART_REQUEST_TOOL"."VENDOR_INQUIRY" ("VENDOR_INQUIRY_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "CART_REQUEST_TOOL"."VENDOR_INQUIRY_MESSAGE" ADD FOREIGN KEY ( "USER_ID_READ" ) REFERENCES "CART_REQUEST_TOOL"."USER" ("USER_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;