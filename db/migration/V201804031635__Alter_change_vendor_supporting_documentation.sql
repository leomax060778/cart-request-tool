-- *************************************************************************************
-- Create the new column
ALTER TABLE "CART_REQUEST_TOOL"."CHANGE_VENDOR_SUPPORTING_DOCUMENTATION" ADD (OPTION_POSITION INTEGER DEFAULT 0 NOT NULL);

-- *************************************************************************************
-- Update values with the new order. The new option to insert will be in position 1 so a CASE statement was added to the script
UPDATE "CART_REQUEST_TOOL"."CHANGE_VENDOR_SUPPORTING_DOCUMENTATION"
SET OPTION_POSITION = CASE WHEN SUPPORTING_DOCUMENTATION_ID = 1 THEN 0 ELSE SUPPORTING_DOCUMENTATION_ID END;

-- *************************************************************************************
-- Insert the new option in position 1
INSERT INTO "CART_REQUEST_TOOL"."CHANGE_VENDOR_SUPPORTING_DOCUMENTATION"(NAME, DESCRIPTION, OPTION_POSITION, CREATED_USER_ID)
VALUES('Does the supplier use AWS?', 'Does the supplier use Amazon Web Services (AWS) as a sub-processor?', 1, 1);

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-86', 'Add OPTION_POSITION column to CHANGE_VENDOR_SUPPORTING_DOCUMENTATION to set an order criteria for getter', 'V201804031635__Alter_change_vendor_supporting_documentation.sql');

COMMIT;