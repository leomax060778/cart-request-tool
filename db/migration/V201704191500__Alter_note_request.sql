-- Delete data to create a not nullable column
DELETE FROM "CART_REQUEST_TOOL"."NOTE_REQUEST";

-- Drop column with nvarchar data type
ALTER TABLE "CART_REQUEST_TOOL"."NOTE_REQUEST" DROP (NOTE_TEXT);

-- Create the new column
ALTER TABLE "CART_REQUEST_TOOL"."NOTE_REQUEST" ADD (NOTE_TEXT TEXT NOT NULL);

-- *************************************************************************************
-- Update schema version
INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-38', 'Alter NOTE_REQUEST to change data type of NOTE_TEXT from NVARCHAR to TEXT', 'V201704191500__Alter_note_request.sql');

COMMIT;