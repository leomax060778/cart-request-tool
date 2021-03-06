CREATE COLUMN TABLE "CART_REQUEST_TOOL".POP_UP( 
	 POP_UP_ID BIGINT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
	 NAME NVARCHAR(255) NOT NULL,
	 CONTENT NVARCHAR(1000) NOT NULL,
	 CODE NVARCHAR(255) NOT NULL,
	 
	 CREATED_DATE_TZ  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	 MODIFIED_DATE_TZ TIMESTAMP ,
	 CREATED_USER_ID BIGINT NOT NULL,
	 MODIFIED_USER_ID BIGINT NULL,
	 ENABLED TINYINT NULL DEFAULT 1,
	 DELETED TINYINT NULL DEFAULT 0
);

--Insert data
INSERT INTO "CART_REQUEST_TOOL"."POP_UP"(name, content, code, created_user_id) 
  VALUES('Budget Year', '<p>The year selected will determine the budget rates used for displaying the Total Budget Amount of your request in EUR for budget tracking purposes. The year selected also corresponds to the &#147;Team? acronym you are assigned to and/or have permission to execute against WBS within that years specific Planning Tool. </p> <p>If you have expenses crossing two fiscal years, please create an SOW for each years expense and submit two separate cart requests</p>', 'BUDGET_YEAR_POP_UP', 1);

INSERT INTO "CART_REQUEST_TOOL"."POP_UP"(name, content, code, created_user_id) 
  VALUES('Goods Recipient', '<p>Person named on the PO who is responsible for approving invoice(s) and providing accrual info, when applicable.</p><p><span class="benton-bold">*</span> Note that this is not always the same as the person requesting the cart.</p><p>If not auto-populated to desired recipient, please enter First then Last Name.</p>', 'GOODS_RECIPIENT_POP_UP', 1);

INSERT INTO "CART_REQUEST_TOOL"."POP_UP"(name, content, code, created_user_id) 
  VALUES('Entity', '<p>The contracting SAP subsidiary indicated on the SOW.</p><p><span class="benton-bold">*</span> Note that the WBS# or cost object to charge has to be for this same SAP entity, or the SRM system will not allow the cart to be entered.</p>', 'ENTITY_POP_UP', 1);

INSERT INTO "CART_REQUEST_TOOL"."POP_UP"(name, content, code, created_user_id) 
  VALUES('Data Protection', '<p>If you need additional information in order to complete the DPR section, please <a href="http://rtm-bmo.bue.sap.corp:1081/crt/index.php/trainings" target="_blank">click here</a> to go to Training &amp; Education Section.</p>', 'DATA_PROTECTION_POP_UP', 1);

INSERT INTO "CART_REQUEST_TOOL"."POP_UP"(name, content, code, created_user_id) 
  VALUES('Catalogs', '<span style="font-weight:bold;margin-bottom:5px;display:block;">Please note</span><ul style="list-style: none; padding: 0.5rem;"><li style="padding:10px;border-bottom: solid 1px #ccc; ">Majority of purchases will be captured in the Marketing Catalog</li><li style="padding:10px;border-bottom: solid 1px #ccc;">Translation vendors, S+P Lion temp staff, YOH 1099 contractors - Select 3rd Party Catalog</li><li style="padding:10px;border-bottom: solid 1px #ccc;">Work directly with your YOH contact for any YOH Temp Staff PO requests. Not opened by Business Mgt.</li><li style="padding:10px;border-bottom: solid 1px #ccc;">Randstad temp staff, Employee training services - Select HR Catalog</li><li style="padding:10px 10px 0 10px;">If GPO provided you with a special request material description &amp; number - Select Special Request Catalog</li></ul>', 'CATALOG_POP_UP', 1);

INSERT INTO "CART_REQUEST_TOOL"."POP_UP"(name, content, code, created_user_id) 
  VALUES('Service start date', '<p>Please remember that the dates on the SOW supersede any dates indicated on this request.</p><p>Please ensure project start dates are prior to request date and allow time for the PO approval process, as a PO is required before work begins. Otherwise, your PO may be recorded as "After-the-Fact".</p><p>If start date is prior to request date because it is an "After-the-Fact" Request, email Adrian De Tomas a summary of the request with SOW and reason for starting work prior to an approved purchase order.  You must attach the approval email to your request.</p>', 'SERVICE_START_DATE_POP_UP', 1);
  
INSERT INTO "CART_REQUEST_TOOL"."POP_UP"(name, content, code, created_user_id) 
  VALUES('Service end date', '<p>Please note that once this request is approved, if the end date significantly changes- ie moves to another quarter- please go to the PO in Cart History to send us a message with the new date.</p><p>We will update SAP records on the PO, which helps to ensure more accurate accrual calculations.</p>', 'SERVICE_END_DATE_POP_UP', 1);
  
INSERT INTO "CART_REQUEST_TOOL"."POP_UP"(name, content, code, created_user_id) 
  VALUES('Service description', '<p>Limit is 40 characters total for systems.  So enter just a few words to sum up the project so that you and vendor can easily recall the nature of the project and what is being invoiced.</p>', 'SERVICE_DESCRIPTION_POP_UP', 1);
  
INSERT INTO "CART_REQUEST_TOOL"."POP_UP"(name, content, code, created_user_id) 
  VALUES('Service amount', '<p>Enter the exact amount and currency stated on the SOW that will be on the invoice from the vendor.</p>', 'SERVICE_AMOUNT_POP_UP', 1);
  
INSERT INTO "CART_REQUEST_TOOL"."POP_UP"(name, content, code, created_user_id) 
  VALUES('Service currency', '<p>The currency SAP will be invoiced in by Vendor. Sufficient budget will be determined at budget rate, and is automatically calculated by CRT for your reference.</p>', 'SERVICE_CURRENCY_POP_UP', 1);
  
INSERT INTO "CART_REQUEST_TOOL"."POP_UP"(name, content, code, created_user_id) 
  VALUES('Uplifting an existing PO?', '<p>A new cart request is required, along with an addendum for the added amount. For our validation, you will be asked for the PO#, Line # and the total amount of the PO that you expect, after the uplift requested is processed.</p><p>Typically POs have one line labeled Line #10, Line 2 is Line #20, etc. Sometimes folks have multiple lines for different quarters, so we need to know which line is being increased for example.</p>', 'UPLIFTING_SECTION_POP_UP', 1);

INSERT INTO "CART_REQUEST_TOOL"."POP_UP"(name, content, code, created_user_id) 
  VALUES('Cost Object', '<p>All Marketing "Program" expenses require a WBS#, while a Fixed cost center should be used for non-program expenses.  CRT allows for the approved exception of solely charging another party outside of our org.</p><p>Normally if you are not paying for the expense, the other party should be opening the PO - email Marylyn Scott for approval to attach to your cart request if an exception is needed. If you are splitting expenses with another party, enter your cost object in this section, and provide the other party'''||'s cost object in "Message to Business Mgt.". That cost object must be associated to the same SAP entity to split a cart.</p><p> Otherwise, you will need to submit a Cost Re-Allocation request form to Nate Rizvi (cc Adam Kern) after you'''||'ve incurred the expense (i.e., invoice has been received for the cost being re-allocated to contributing party).</p><p><span class="benton-bold">*</span> Note there is $1K EUR minimum for cost transfers.</p>', 'COST_OBJECT_POP_UP', 1);
  
INSERT INTO "CART_REQUEST_TOOL"."POP_UP"(name, content, code, created_user_id) 
  VALUES('Risk Funded', '<p>CRT will only allow you to open POs up to the budget allocations specified in OPT. Risk Funding is when your budget in OPT does not cover the expected overage from this PO request.</p><p>By checking the box, you are confirming that you have budget owner approval to go over the planned amount by the amount you indicate.</p><p>For example, a project might be risk funded when another project may be cancelled or may come in lower to offset the overage from this expense.</p><p><span class="benton-bold">*</span> Note to SAP: Example OPT 5K for 10K PO and therefore team is risk funding 5K.</p>', 'RISK_FUNDED_POP_UP', 1);

-- *************************************************************************************
-- Update schema version

INSERT INTO SCHEMA_VERSION(VERSION, DESCRIPTION, SCRIPT) 
VALUES('V2.0.0-09', 'Create table pop_up', 'V201701061110__Create_pop_up.sql');

COMMIT;