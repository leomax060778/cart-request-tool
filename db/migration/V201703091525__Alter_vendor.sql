ALTER TABLE "VENDOR" DROP ("CONTACT_NAME");
ALTER TABLE "VENDOR" DROP ("CONTACT_EMAIL");
ALTER TABLE "VENDOR" DROP ("CONTACT_PHONE");

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-24', 'Drop CONTACT_NAME, CONTACT_EMAIL and CONTACT_PHONE from VENDOR table', 'V201703091525__Alter_vendor.sql');

COMMIT;