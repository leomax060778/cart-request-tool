INSERT INTO "CART_REQUEST_TOOL"."POP_UP"(name, content, code, created_user_id) 
  VALUES('Special Request', '<p>Special Request: Prior to raising a special request for non-catalog items, please contact GPO. GPO will provide you with a specific Material Description and Material# in an email that you should attach to this cart request.</p>', 'SPECIAL_REQUEST_POP_UP', 1);  
  
  -- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-45', 'Insert Special Request pop_up', 'V201705170850__Insert_special_request_pop_up.sql');

COMMIT;