-- *************************************************************************************
-- Add a new column - SHORT_DESCRIPTION

ALTER TABLE "CART_REQUEST_TOOL"."DATA_PROTECTION_QUESTION" ADD (SHORT_DESCRIPTION NVARCHAR(255));

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-17', 'Added the column SHORT_DESCRIPTION to DATA_PROTECTION_QUESTION', 'V201702061400__Alter_data_protection_question.sql');

COMMIT;