-- *************************************************************************************
-- Alter table mail template

ALTER TABLE "CART_REQUEST_TOOL"."MAIL_TEMPLATE" DROP ("DESCRIPTION");
ALTER TABLE "CART_REQUEST_TOOL"."MAIL_TEMPLATE" DROP ("SUBJECT");
ALTER TABLE "CART_REQUEST_TOOL"."MAIL_TEMPLATE" DROP ("BODY");
ALTER TABLE "CART_REQUEST_TOOL"."MAIL_TEMPLATE" DROP ("ISO");
ALTER TABLE "CART_REQUEST_TOOL"."MAIL_TEMPLATE" ADD ("CONTENT" TEXT NOT NULL);

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-53', 'Alter Smail template', 'V201707041310__Alter_mail_template.sql');

COMMIT;