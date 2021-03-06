CREATE COLUMN TABLE "CART_REQUEST_TOOL".VENDOR_REQUEST (
	 VENDOR_REQUEST_ID BIGINT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
	 USER_ID BIGINT NOT NULL,
	 COUNTRY_ID BIGINT NOT NULL,
	 ENTITY_ID BIGINT NOT NULL,
	 DATA_PROTECTION_ENABLED TINYINT NOT NULL DEFAULT 0,
	 COMMODITY_ID BIGINT NOT NULL,
	 NOT_USED_SAP_SUPPLIER NVARCHAR(1000),
	 SERVICE_SUPPLIER NVARCHAR(1000) NOT NULL,
	 PURCHASE_AMOUNT DECIMAL(19,2) NOT NULL,
	 EXPECTED_AMOUNT DECIMAL(19,2),
	 PURCHASE_CURRENCY_ID INTEGER NOT NULL,
	 EXPECTED_CURRENCY_ID INTEGER ,
	 ACCEPT_AMERICAN_EXPRESS TINYINT  DEFAULT 0 NOT NULL,
	 COST_CENTER_OWNER NVARCHAR(511) NOT NULL,
	 ADDITIONAL_INFORMATION NVARCHAR(1000),
	 RECEIVER_USER_ID BIGINT ,
	 RECEIVER_DATE_SUBMITTED_TZ TIMESTAMP,
	 RECEIVER_DATE_COMPLETED_TZ TIMESTAMP,
	 RECEIVER_YVC_REQUEST NVARCHAR(255),
	 RECEIVER_MODIFIED_DATE_TZ TIMESTAMP,
	 VENDOR_TYPE_ID BIGINT ,
	 STATUS_ID BIGINT  DEFAULT 1,
	 PREVIOUS_STATUS_ID BIGINT ,
	 USER_ID_STATUS BIGINT ,
	 UPDATE_STATUS TIMESTAMP,
	 ENABLED TINYINT  DEFAULT 1,
	 DELETED TINYINT  DEFAULT 0,
	 CREATED_DATE_TZ TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	 MODIFIED_DATE_TZ TIMESTAMP,
	 CREATED_USER_ID BIGINT  NOT NULL ,
	 MODIFIED_USER_ID BIGINT,
	 VENDOR_ID BIGINT NOT NULL
	);
ALTER TABLE "CART_REQUEST_TOOL"."VENDOR_REQUEST" ADD FOREIGN KEY ( "USER_ID" ) REFERENCES "CART_REQUEST_TOOL"."USER" ("USER_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "CART_REQUEST_TOOL"."VENDOR_REQUEST" ADD FOREIGN KEY ( "USER_ID_STATUS" ) REFERENCES "CART_REQUEST_TOOL"."USER" ("USER_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "CART_REQUEST_TOOL"."VENDOR_REQUEST" ADD FOREIGN KEY ( "RECEIVER_USER_ID" ) REFERENCES "CART_REQUEST_TOOL"."USER" ("USER_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "CART_REQUEST_TOOL"."VENDOR_REQUEST" ADD FOREIGN KEY ( "VENDOR_TYPE_ID" ) REFERENCES "CART_REQUEST_TOOL"."VENDOR_TYPE" ("VENDOR_TYPE_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "CART_REQUEST_TOOL"."VENDOR_REQUEST" ADD FOREIGN KEY ( "STATUS_ID" ) REFERENCES "CART_REQUEST_TOOL"."VENDOR_REQUEST_STATUS" ("STATUS_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "CART_REQUEST_TOOL"."VENDOR_REQUEST" ADD FOREIGN KEY ( "PURCHASE_CURRENCY_ID" ) REFERENCES "CART_REQUEST_TOOL"."CURRENCY" ("CURRENCY_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "CART_REQUEST_TOOL"."VENDOR_REQUEST" ADD FOREIGN KEY ( "EXPECTED_CURRENCY_ID" ) REFERENCES "CART_REQUEST_TOOL"."CURRENCY" ("CURRENCY_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "CART_REQUEST_TOOL"."VENDOR_REQUEST" ADD FOREIGN KEY ( "ENTITY_ID" ) REFERENCES "CART_REQUEST_TOOL"."ENTITY" ("ENTITY_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "CART_REQUEST_TOOL"."VENDOR_REQUEST" ADD FOREIGN KEY ( "COUNTRY_ID" ) REFERENCES "CART_REQUEST_TOOL"."COUNTRY" ("COUNTRY_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "CART_REQUEST_TOOL"."VENDOR_REQUEST" ADD FOREIGN KEY ( "COMMODITY_ID" ) REFERENCES "CART_REQUEST_TOOL"."COMMODITY" ("COMMODITY_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "CART_REQUEST_TOOL"."VENDOR_REQUEST" ADD FOREIGN KEY ( "PREVIOUS_STATUS_ID" ) REFERENCES "CART_REQUEST_TOOL"."VENDOR_REQUEST_STATUS" ("STATUS_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "CART_REQUEST_TOOL"."VENDOR_REQUEST" ADD FOREIGN KEY ( "VENDOR_ID" ) REFERENCES "CART_REQUEST_TOOL"."VENDOR" ("VENDOR_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;