$.import("xscartrequesttool.services.commonLib","mapper");
var mapper = $.xscartrequesttool.services.commonLib.mapper;
var data = mapper.getDataLevel4();

function getHl4(parametrs){
	//return data.getHl4(urlParametrs);
		
	var spResult = data.getHl4(parametrs);
	var result = [];
	Object.keys(spResult).forEach(function(key) {
		spResult[key]["CREATED_BY"] = spResult[key]["FIRST_NAME"] + " " + spResult[key]["LAST_NAME"];
		/*spResult[key]["HL4"] = spResult[key]["hl4_ID_CRM"].substring(14,17);
		spResult[key]["HL3"] = spResult[key]["hl4_ID_CRM"].substring(10,13);*/
		
		var hl4Total = 0;
	    if(!!spResult[key]["HL4_FNC_BUDGET_TOTAL_MKT"] && !!spResult[key]["EURO_WORTHS_VALUE"]){
	    	hl4Total = spResult[key]["HL4_FNC_BUDGET_TOTAL_MKT"] * spResult[key]["EURO_WORTHS_VALUE"];
	    }
	    hl4Total = hl4Total.toFixed(2);
	    spResult[key]["HL4_TOTAL"] = hl4Total;
	    spResult[key]["ALLOCATED"] = spResult[key]["HL5_TOTAL_IN_BUDGET"];
	    spResult[key]["REMAINDER"] = spResult[key]["HL4_TOTAL"] - spResult[key]["HL5_TOTAL_IN_BUDGET"];
	    
	    spResult[key]["ALLOCATED_BUDGET_COLOR"] = spResult[key]["ALLOCATED"] <= spResult[key]["HL4_TOTAL"] ?  1 : 0;
	    spResult[key]["REMAINDER_BUDGET_COLOR"] = spResult[key]["REMAINDER"] <= spResult[key]["HL4_TOTAL"]  && spResult[key]["REMAINDER"] >= 0?  1 : 0;
	    spResult[key]["HL5_TOTAL_OUT_BUDGET"] = spResult[key]["HL5_TOTAL_OUT_BUDGET"] <= spResult[key]["HL4_TOTAL"]  && spResult[key]["HL5_TOTAL_OUT_BUDGET"] >= 0 ?  1 : 0;
	    spResult[key]["COLOR"] = spResult[key]["REMAINDER"] < 0 ?  0 : 1;
	    spResult[key]["QUANTITY_TOTAL_HL5"] = spResult[key]["HL5_TOTAL_IN_BUDGET"] + spResult[key]["HL5_TOTAL_OUT_BUDGET"];
		
		/*-- black = 1, red = 0
		-- HL5_TOTAL_IN_BUDGET = ALLOCATED
		--,CASE WHEN ALLOCATED &lt;= HL4_TOTAL THEN 1 ELSE 0 END AS ALLOCATED_BUDGET_COLOR
		--,CASE WHEN REMAINDER &lt;= HL4_TOTAL AND REMAINDER >= 0 THEN 1 ELSE 0 END AS REMAINDER_BUDGET_COLOR
		--,CASE WHEN HL5_TOTAL_OUT_BUDGET &lt;= HL4_TOTAL AND HL5_TOTAL_OUT_BUDGET >= 0 THEN 1 ELSE 0 END AS OUT_OF_BUDGET_COLOR
		--,CASE WHEN REMAINDER &lt; 0 THEN 0 ELSE 1 END AS COLOR*/

		result.push(spResult[key]);
	});
	
	var responseObj = {"results": result, "total_budget": hl4Total};
	
	return responseObj;
}