INSERT INTO TRAINING_TYPE ("TRAINING_TYPE_ID", "NAME", "CREATED_USER_ID") VALUES(3,'Link', 1);
INSERT INTO TEMPLATE_TYPE ("TEMPLATE_TYPE_ID", "NAME", "CREATED_USER_ID") VALUES(3,'Link', 1);

INSERT INTO TEMPLATE_SECTION ("SECTION_ID", "NAME", "CREATED_USER_ID") VALUES (1,'Please find links below to our Corporate Portal for specific information from Global Procurement to all purchasers of goods and services.',1);
INSERT INTO TEMPLATE_SECTION ("SECTION_ID", "NAME", "CREATED_USER_ID") VALUES (2,'Standard SOW Templates for the SAP entities supported by the CRT:',1);
INSERT INTO TEMPLATE_SECTION ("SECTION_ID", "NAME", "CREATED_USER_ID") VALUES (3,'GPO Help Files, Forms, etc',1);

alter table "CART_REQUEST_TOOL"."TEMPLATE" add ("ATTACHMENT_ID" BIGINT null);

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-03', 'Alter table template to support attachments and links', 'V201612061410__Insert_template_section_template_types.sql');

COMMIT;