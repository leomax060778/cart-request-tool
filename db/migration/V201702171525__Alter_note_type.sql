-- *************************************************************************************
-- Add column NOTE_POSITION to the table
alter table "CART_REQUEST_TOOL"."NOTE_TYPE" add (NOTE_POSITION INTEGER);

-- *************************************************************************************
-- Add values to the new column
update "CART_REQUEST_TOOL"."NOTE_TYPE" SET NOTE_POSITION = 1 WHERE NOTE_TYPE_NAME = 'Approver Note' AND ENABLED = 1;
update "CART_REQUEST_TOOL"."NOTE_TYPE" SET NOTE_POSITION = 2 WHERE NOTE_TYPE_NAME = 'Internal Note' AND ENABLED = 1;
update "CART_REQUEST_TOOL"."NOTE_TYPE" SET NOTE_POSITION = 3 WHERE NOTE_TYPE_NAME = 'Vendor Text' AND ENABLED = 1;
update "CART_REQUEST_TOOL"."NOTE_TYPE" SET NOTE_POSITION = 4 WHERE NOTE_TYPE_NAME = 'Message to Business Mgt.' AND ENABLED = 1;

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-22', 'Added column NOTE_POSITION to NOTE_TYPE', 'V201702171525__Alter_note_type.sql');

COMMIT;