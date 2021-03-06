CREATE COLUMN TABLE "CART_REQUEST_TOOL".REQUEST(
	REQUEST_ID BIGINT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
	USER_ID BIGINT NOT NULL ,
	HL3_ID BIGINT NOT NULL ,
	ENTITY_ID BIGINT NOT NULL ,
	VENDOR_ID BIGINT NOT NULL ,
	CURRENCY_ID BIGINT,
	STAGE_ID BIGINT,
	PASS BIGINT DEFAULT 1,
	STATUS_ID BIGINT DEFAULT 1,
	USER_ID_STATUS BIGINT,
	UPDATE_STATUS_TZ TIMESTAMP,
	PREVIOUS_STATUS_ID BIGINT,
	GOODS_RECIPIENT_USERNAME NVARCHAR(127) NOT NULL ,
	DATA_PROTECTION_ENABLED TINYINT DEFAULT 0,
	INFRASTRUCTURE_OF_WORK_ID BIGINT NOT NULL ,
	LOCATION_OF_WORK_ID BIGINT  NOT NULL ,
	MATERIAL_ID BIGINT NOT NULL,
	CRT_TYPE_ID INTEGER NOT NULL,
	BUDGET_YEAR_ID BIGINT NOT NULL DEFAULT 1,
	NON_SAP_VENDOR_ID BIGINT,
	CREATED_DATE_TZ TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	MODIFIED_DATE_TZ TIMESTAMP,
	CREATED_USER_ID BIGINT  NOT NULL ,
	MODIFIED_USER_ID BIGINT ,
	ENABLED TINYINT DEFAULT 1,
	DELETED TINYINT DEFAULT 0
);
ALTER TABLE "CART_REQUEST_TOOL"."REQUEST" ADD FOREIGN KEY ( "USER_ID" ) REFERENCES "CART_REQUEST_TOOL"."USER" ("USER_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "CART_REQUEST_TOOL"."REQUEST" ADD FOREIGN KEY ( "ENTITY_ID" ) REFERENCES "CART_REQUEST_TOOL"."ENTITY" ("ENTITY_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "CART_REQUEST_TOOL"."REQUEST" ADD FOREIGN KEY ( "VENDOR_ID" ) REFERENCES "CART_REQUEST_TOOL"."VENDOR" ("VENDOR_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "CART_REQUEST_TOOL"."REQUEST" ADD FOREIGN KEY ( "CURRENCY_ID" ) REFERENCES "CART_REQUEST_TOOL"."CURRENCY" ("CURRENCY_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "CART_REQUEST_TOOL"."REQUEST" ADD FOREIGN KEY ( "STAGE_ID" ) REFERENCES "CART_REQUEST_TOOL"."STAGE" ("STAGE_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "CART_REQUEST_TOOL"."REQUEST" ADD FOREIGN KEY ( "INFRASTRUCTURE_OF_WORK_ID" ) REFERENCES "CART_REQUEST_TOOL"."INFRASTRUCTURE_OF_WORK" ("INFRASTRUCTURE_OF_WORK_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "CART_REQUEST_TOOL"."REQUEST" ADD FOREIGN KEY ( "LOCATION_OF_WORK_ID" ) REFERENCES "CART_REQUEST_TOOL"."LOCATION_OF_WORK" ("LOCATION_OF_WORK_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "CART_REQUEST_TOOL"."REQUEST" ADD FOREIGN KEY ( "STATUS_ID" ) REFERENCES "CART_REQUEST_TOOL"."REQUEST_STATUS" ("STATUS_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "CART_REQUEST_TOOL"."REQUEST" ADD FOREIGN KEY ( "PREVIOUS_STATUS_ID" ) REFERENCES "CART_REQUEST_TOOL"."REQUEST_STATUS" ("STATUS_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "CART_REQUEST_TOOL"."REQUEST" ADD FOREIGN KEY ( "USER_ID_STATUS" ) REFERENCES "CART_REQUEST_TOOL"."USER" ("USER_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "CART_REQUEST_TOOL"."REQUEST" ADD FOREIGN KEY ( "CRT_TYPE_ID" ) REFERENCES "CART_REQUEST_TOOL"."CRT_TYPE" ("CRT_TYPE_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "CART_REQUEST_TOOL"."REQUEST" ADD FOREIGN KEY ( "MATERIAL_ID" ) REFERENCES "CART_REQUEST_TOOL"."MATERIAL" ("MATERIAL_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "CART_REQUEST_TOOL"."REQUEST" ADD FOREIGN KEY ( "HL3_ID" ) REFERENCES "CART_REQUEST_TOOL"."HL3" ("HL3_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
