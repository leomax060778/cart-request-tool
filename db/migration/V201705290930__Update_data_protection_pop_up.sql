UPDATE pop
	SET pop.CONTENT = '<p>If you need additional information in order to complete the DPR section, please <a href="http://rtm-bmo.bue.sap.corp:1081/crt2017-testing/webapp/index.html#/trainingAndEducation" target="_blank">click here</a> to go to Training &amp; Education Section.</p>'
	FROM "CART_REQUEST_TOOL"."POP_UP" pop
	WHERE pop.POP_UP_ID = 4;

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-48', 'Update Data Protection Pop up', 'V201705290930__Update_data_protection_pop_up.sql');

COMMIT;