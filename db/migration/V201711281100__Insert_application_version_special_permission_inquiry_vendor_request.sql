-- *************************************************************************************
-- Update schema version
INSERT INTO APPLICATION_VERSION(VERSION, APPLICATION_ID, CREATED_USER_ID, RELEASE_NOTES)
VALUES('2.0.5',1,1,'Added special permissions to CRT Inquiry and Vendor Request / Inquiry');

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-71', 'Insert application version 2.0.5 - Added special permissions to CRT Inquiry and Vendor Request / Inquiry', 'V201711281100__Insert_application_version_special_permission_inquiry_vendor_request.sql');

COMMIT;