alter table "CART_REQUEST_TOOL"."ATTACHMENT" add ("ATTACHMENT_TYPE" NVARCHAR (255) null);
alter table "CART_REQUEST_TOOL"."TRAINING" alter ("LINK" NVARCHAR (2048) null);
alter table "CART_REQUEST_TOOL"."TEMPLATE" alter ("LINK" NVARCHAR (2048) null);


-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-02', 'Alter tables attachment, training and template to support attachments and links', 'V201612051030__Alter_attachment_template_training.sql');

COMMIT;