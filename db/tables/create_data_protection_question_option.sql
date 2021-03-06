CREATE COLUMN TABLE "CART_REQUEST_TOOL".DATA_PROTECTION_QUESTION_OPTION
(
	QUESTION_ID BIGINT NOT NULL,
	OPTION_ID BIGINT NOT NULL,

	CREATED_DATE_TZ TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	MODIFIED_DATE_TZ TIMESTAMP,
	CREATED_USER_ID BIGINT NOT NULL,
	MODIFIED_USER_ID BIGINT,
	ENABLED TINYINT DEFAULT 1,
	DELETED TINYINT DEFAULT 0
);

ALTER TABLE "CART_REQUEST_TOOL"."DATA_PROTECTION_QUESTION_OPTION" ADD FOREIGN KEY ( "QUESTION_ID" ) REFERENCES "CART_REQUEST_TOOL"."DATA_PROTECTION_QUESTION" ("QUESTION_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
ALTER TABLE "CART_REQUEST_TOOL"."DATA_PROTECTION_QUESTION_OPTION" ADD FOREIGN KEY ( "OPTION_ID" ) REFERENCES "CART_REQUEST_TOOL"."DATA_PROTECTION_OPTION" ("OPTION_ID") ON UPDATE RESTRICT ON DELETE RESTRICT
;
