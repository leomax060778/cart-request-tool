-- *************************************************************************************
-- Alter table ROLE_PERMISSION to support permission levels for Shopping Cart History

ALTER TABLE "CART_REQUEST_TOOL"."ROLE_PERMISSION" ADD(PERMISSION_LEVEL INTEGER DEFAULT 1);

-- ****************** Add level 2 permissions for superAdmin and Business Mgt, for Shopping Cart History Only.

--SuperAdmin
UPDATE rp
	SET   rp.PERMISSION_LEVEL = 2
	FROM "CART_REQUEST_TOOL"."ROLE_PERMISSION" rp
	WHERE rp.RESOURCE_ID = 2
	AND rp.ROLE_ID = 1;
	
--Business Mgt.
UPDATE rp
	SET   rp.PERMISSION_LEVEL = 2
	FROM "CART_REQUEST_TOOL"."ROLE_PERMISSION" rp
	WHERE rp.RESOURCE_ID = 2
	AND rp.ROLE_ID = 3;

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-55', 'Alter Role Permission table to add PERMISSION_LEVEL column', 'V201707241250__Alter_role_permission_table.sql');

COMMIT;