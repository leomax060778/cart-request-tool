INSERT INTO TEMPLATE_SECTION ("SECTION_ID", "NAME", "CREATED_USER_ID") VALUES (1,'Please find links below to our Corporate Portal for specific information from Global Procurement to all purchasers of goods and services.',1);
INSERT INTO TEMPLATE_SECTION ("SECTION_ID", "NAME", "CREATED_USER_ID") VALUES (2,'Standard SOW Templates for the SAP entities supported by the CRT:',1);
INSERT INTO TEMPLATE_SECTION ("SECTION_ID", "NAME", "CREATED_USER_ID") VALUES (3,'GPO Help Files, Forms, etc',1);


-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-02', 'Alter tables attachment, training and template to support attachments and links', 'V201612051030__Alter_attachment_template_training.sql');

COMMIT;