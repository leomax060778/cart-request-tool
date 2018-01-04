-- *************************************************************************************
-- Update currency abbreviation for Belarus
UPDATE "CART_REQUEST_TOOL"."CURRENCY" SET abbreviation = 'BYN' WHERE abbreviation = 'BYR' AND currency_year = 2018;

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-72', 'Currency - update abbreviation name for Belarus', 'V201712261100__Update_currency_abbreviation_for_Belarus.sql');

COMMIT;