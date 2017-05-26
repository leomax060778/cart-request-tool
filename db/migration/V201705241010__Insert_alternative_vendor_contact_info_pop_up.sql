INSERT INTO "CART_REQUEST_TOOL"."POP_UP"(name, content, code, created_user_id) 
  VALUES('Alternative vendor contact information', '<p>Check here to add an additional Vendor Contact Info</p>', 'ALTERNATIVE_VENDOR_CONTACT_POP_UP', 1);

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-47', 'Insert Alternative vendor contact info pop_up', 'V201705241010__Insert_alternative_vendor_contact_info_pop_up.sql');

COMMIT;