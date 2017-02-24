INSERT INTO "CART_REQUEST_TOOL"."POP_UP"(name, content, code, created_user_id) 
  VALUES('Infrastructure Location', '<p>Click this <a href="https://surveys.sap.com/SE/?SID=SV_8BzW37RpYsZYbFX" target="_blank">link</a> for a handy "SAP Data Protection Scenario Determination tool" to help you determine IT-Infrastructure of Work / Location of Work.</p>', 'INFRASTRUCTURE_LOCATION_POP_UP', 1);
  
  -- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-21', 'Insert infrastructure and location of work pop_up', 'V201702161410__Insert_pop_up.sql');

COMMIT;