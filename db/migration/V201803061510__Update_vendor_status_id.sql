-- *************************************************************************************
-- Update VENDOR status id to match with the id of the corresponding VENDOR_REQUEST status id
UPDATE V
SET V.STATUS_ID = VR.STATUS_ID
FROM "VENDOR" V
INNER JOIN "VENDOR_REQUEST" VR ON V.VENDOR_ID = VR.VENDOR_ID;

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V2.0.0-83', 'Update VENDOR status id to match with the id of the corresponding VENDOR_REQUEST status id', 'V201803061510__Update_vendor_status_id.sql');

COMMIT;