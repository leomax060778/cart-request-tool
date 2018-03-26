-- *************************************************************************************
-- Add column VENDOR_ADDITIONAL_INFORMATION_ID to VENDOR_REQUEST
ALTER TABLE "VENDOR_REQUEST" ADD (VENDOR_ADDITIONAL_INFORMATION_ID BIGINT);

-- *************************************************************************************
-- Populate new column
-- Insert missing vendor names to VENDOR_ADDITIONAL_INFORMATION using LEGAL_NAME from VENDOR table
INSERT INTO "VENDOR_ADDITIONAL_INFORMATION"(VENDOR_ID, VENDOR_NAME, CREATED_USER_ID)
                SELECT VR.VENDOR_ID, V.LEGAL_NAME, 1 AS CREATED_USER_ID
                FROM "VENDOR_REQUEST" VR
                    INNER JOIN "VENDOR" V ON VR.VENDOR_ID = V.VENDOR_ID
                WHERE VR.VENDOR_ID NOT IN (SELECT VAI.VENDOR_ID FROM "VENDOR_ADDITIONAL_INFORMATION" VAI
                                            INNER JOIN (SELECT VENDOR_REQUEST_ID, VENDOR_ID FROM "VENDOR_REQUEST" WHERE VENDOR_ID IS NOT NULL ORDER BY VENDOR_REQUEST_ID) VR
                                                ON VAI.VENDOR_ID = VR.VENDOR_ID
                                            WHERE VAI.CREATED_DATE_TZ IN (SELECT min(CREATED_DATE_TZ) FROM "VENDOR_ADDITIONAL_INFORMATION" GROUP BY VENDOR_ID ORDER BY VENDOR_ID)
                                            ORDER BY VR.VENDOR_REQUEST_ID
                                           )
                ORDER BY VENDOR_REQUEST_ID;

-- Update VENDOR_REQUEST to insert the vendor name id
UPDATE VREQ
SET VREQ.VENDOR_ADDITIONAL_INFORMATION_ID = T2.VENDOR_ADDITIONAL_INFORMATION_ID
FROM "VENDOR_REQUEST" VREQ
INNER JOIN (SELECT VR.VENDOR_REQUEST_ID, VAI.VENDOR_ADDITIONAL_INFORMATION_ID, VAI.VENDOR_ID, VAI.VENDOR_NAME
            FROM "VENDOR_ADDITIONAL_INFORMATION" VAI
                INNER JOIN (SELECT VENDOR_REQUEST_ID, VENDOR_ID FROM "VENDOR_REQUEST" WHERE VENDOR_ID IS NOT NULL ORDER BY VENDOR_REQUEST_ID) VR ON VAI.VENDOR_ID = VR.VENDOR_ID
            WHERE VAI.CREATED_DATE_TZ IN (SELECT min(CREATED_DATE_TZ) FROM "VENDOR_ADDITIONAL_INFORMATION" GROUP BY VENDOR_ID ORDER BY VENDOR_ID)
            ORDER BY VR.VENDOR_REQUEST_ID) T2 ON VREQ.VENDOR_REQUEST_ID = T2.VENDOR_REQUEST_ID;

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT)
VALUES('V2.0.0-82', 'Alter VENDOR_REQUEST to add the column VENDOR_ADDITIONAL_INFORMATION_ID. Populate new column', 'V201802231445__Alter_vendor_request_update_vendor_name.sql');

COMMIT;