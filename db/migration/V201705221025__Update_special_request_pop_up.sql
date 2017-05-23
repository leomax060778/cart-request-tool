UPDATE "CART_REQUEST_TOOL"."POP_UP" SET CONTENT = '<p>Special Request: Prior to raising a special request for non-catalog items, please contact GPO.  GPO will provide you with a specific Material Description(s) and Material#(s) in an email that you should attach to this cart request.</p>' WHERE POP_UP_ID = 18;

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-46', 'Update Special Request pop_up text', 'V201705221025__Update_special_request_pop_up.sql');

COMMIT;