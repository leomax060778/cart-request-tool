-- IMPORTANT: remember changing the CONF_VALUE depending on where you are running the migration.
INSERT INTO "CART_REQUEST_TOOL"."CONFIGURATION"(CONF_KEY, CONF_VALUE, CONF_DESCRIPTION, CREATED_USER_ID)
	VALUES('Environment', 'Testing','APPLICATION''S ENVIRONMENT. Can be: Development - Testing - Production.', 1);
	
INSERT INTO "CART_REQUEST_TOOL"."CONFIGURATION"(CONF_KEY, CONF_VALUE, CONF_DESCRIPTION, CREATED_USER_ID)
	VALUES('ReadPermission', 'View/Read','VIEW/READ PERMISSION', 1);
	
INSERT INTO "CART_REQUEST_TOOL"."CONFIGURATION"(CONF_KEY, CONF_VALUE, CONF_DESCRIPTION, CREATED_USER_ID)
	VALUES('CreatePermission', 'Create/Edit','CREATE/EDIT PERMISSION', 1);
	
INSERT INTO "CART_REQUEST_TOOL"."CONFIGURATION"(CONF_KEY, CONF_VALUE, CONF_DESCRIPTION, CREATED_USER_ID)
	VALUES('DeletePermission', 'Delete','DELETE PERMISSION', 1);
	
INSERT INTO "CART_REQUEST_TOOL"."CONFIGURATION"(CONF_KEY, CONF_VALUE, CONF_DESCRIPTION, CREATED_USER_ID)
	VALUES('GrantPermission', 'Grant','GRANT PERMISSION', 1);
	
INSERT INTO "CART_REQUEST_TOOL"."CONFIGURATION"(CONF_KEY, CONF_VALUE, CONF_DESCRIPTION, CREATED_USER_ID)
	VALUES('ExecutePermission', 'Execute','EXECUTE PERMISSION', 1);

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-63', 'Add configuration keys to the CONFIGURATION table', 'V201710101055__Add_conf_keys_to_CONFIGURATION_table.sql');

COMMIT;