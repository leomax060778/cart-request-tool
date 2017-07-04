-- *************************************************************************************
-- Update pop-up content so it has the folder id in the link

UPDATE "CART_REQUEST_TOOL"."POP_UP" SET CONTENT = '<p>If you need additional information in order to complete the DPR section, please <a href="http://localhost:63342/crt/webapp/index.html#/trainingAndEducation/folderId=0" target="_blank">click here</a> to go to Training &amp; Education Section.</p>'
	WHERE POP_UP_ID = 4;

-- *************************************************************************************
-- Add column to training table to indicate the folder id, default value is 0

ALTER TABLE "CART_REQUEST_TOOL"."TRAINING" ADD ("DATA_PROTECTION_FOLDER" TINYINT DEFAULT 0);

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-49', 'Add column to Training table, fixed URL in data protection pop-up', 'V201706080825__Alter_training.sql');

COMMIT;