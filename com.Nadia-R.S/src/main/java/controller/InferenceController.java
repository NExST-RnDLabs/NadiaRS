package controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import domain.Rule;
import inferenceEngine.ruleParser.*;
import inferenceEngine.ruleParser.RuleSetParser;
import inferenceEngine.ruleParser.RuleSetReader;
import inferenceEngine.ruleParser.RuleSetScanner;
import inferencePackage.Assessment;
import inferencePackage.InferenceEngine;

@RestController
@SessionAttributes("inference")
@RequestMapping("/inference")
public class InferenceController {
	
	
	@Autowired
	private RuleController ruleController;
	
	@Autowired
	private RuleSetReader ilr = new RuleSetReader();
	
	@Autowired
	private RuleSetParser isf = new RuleSetParser();
	
	@Autowired
	private RuleSetScanner rsc;
	
	@RequestMapping(value="/getNextQuestion")
	public JsonNode getNextQuestion(@RequestParam("ruleName") String ruleName)
	{
		
		InferenceEngine ie = new InferenceEngine(isf.getNodeSet());
		Assessment ass = new Assessment(isf.getNodeSet(), isf.getNodeSet().getNodeSortedList().get(0).getNodeName());
		
		while(ie.getAssessmentState()
				.getWorkingMemory()
				.get(isf.getNodeSet()
						.getNodeSortedList()
						.get(0).getNodeName())
				==null 
				|| 
				!ie.getAssessmentState()
				.allMandatoryNodeDetermined())
		{
			
		}
	}
	
	@RequestMapping(value="/setInferenceEngine")
	public void setInferenceEngine(@ModelAttribute InferenceEngine IE)
	{
		if(IE == null)
		{
			ilr.setStringSource(ruleController.getTheLatestRuleFileByName(ruleName).getFile().toString());
			rsc = new RuleSetScanner(ilr,isf);
			rsc.scanRuleSet();
			rsc.establishNodeSet();

			
		}
	}
	{
		
	}

}
