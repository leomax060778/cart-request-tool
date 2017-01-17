alter table "CART_REQUEST_TOOL"."REQUEST" add ("ALTERNATIVE_VENDOR_NAME" NVARCHAR (255) null)

alter table "CART_REQUEST_TOOL"."REQUEST" add ("ALTERNATIVE_VENDOR_PHONE" NVARCHAR (255) null)

alter table "CART_REQUEST_TOOL"."REQUEST" add ("ALTERNATIVE_VENDOR_EMAIL" NVARCHAR (255) null)

INSERT INTO "CART_REQUEST_TOOL"."POP_UP"(name, content, code, created_user_id) 
  VALUES('Prior Start Date', '<p>If start date is prior to request date because it is an '''||'After-the-Fact'''||' Request, email Ed Hanson (ed.hanson@sap.com) a summary of the request with SOW and reason for starting work prior to an approved purchase order.  You must attach the approval email to your request.</p>', 'PRIOR_START_DATE', 1);

  
-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-11', 'Alter request table to add Alternative Vendor Information - Insert new POP UP', 'V201701111720__Alter_request_Insert_Pop_Up.sql');

COMMIT;