CREATE COLUMN TABLE "CART_REQUEST_TOOL".VENDOR
(
	VENDOR_ID BIGINT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
	ACCOUNT NVARCHAR(255),
	ADDRESS_1 NVARCHAR (255),
	ADDRESS_2 NVARCHAR (255),
	CITY NVARCHAR (255) ,
	STATE NVARCHAR (255),
	ZIP NVARCHAR (255) ,
	PHONE NVARCHAR (255) ,
	FAX NVARCHAR (255) ,
	LEGAL_NAME NVARCHAR (511) NOT NULL,
	INFORMAL_NAME NVARCHAR (511),
	STATUS_ID BIGINT NOT NULL,
	USER_ID_STATUS BIGINT,
	PREVIOUS_STATUS_ID BIGINT,
	UPDATE_STATUS_TZ TIMESTAMP,
	
	CREATED_DATE_TZ TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	MODIFIED_DATE_TZ TIMESTAMP,
	CREATED_USER_ID BIGINT NOT NULL,
	MODIFIED_USER_ID BIGINT,
	ENABLED TINYINT DEFAULT 1, 
	DELETED TINYINT DEFAULT 0
);
ALTER TABLE "CART_REQUEST_TOOL"."VENDOR" ADD FOREIGN KEY ( "STATUS_ID" ) REFERENCES "CART_REQUEST_TOOL"."VENDOR_STATUS" ("STATUS_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "CART_REQUEST_TOOL"."VENDOR" ADD FOREIGN KEY ( "PREVIOUS_STATUS_ID" ) REFERENCES "CART_REQUEST_TOOL"."VENDOR_STATUS" ("STATUS_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;