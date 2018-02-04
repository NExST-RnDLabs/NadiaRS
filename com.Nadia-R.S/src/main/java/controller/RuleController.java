package controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import domain.Rule;
import domain.RuleFile;
import domain.RuleHistory;
import inferenceEngine.factValuePackage.FactValue;
import inferenceEngine.factValuePackage.FactValueType;
import inferenceEngine.nodePackage.NodeSet;
import inferenceEngine.nodePackage.Record;
import jersey.repackaged.com.google.common.collect.Lists;
import repository.RuleRepository;

@RestController
@RequestMapping("/rule")
public class RuleController {
	
	@Autowired
	RuleRepository ruleRepository;
	
	@RequestMapping(value="/findRuleByName")
	@ResponseBody
	public Rule getRuleByName(@RequestParam("ruleName") String ruleName)
	{
		return ruleRepository.findByName(ruleName);
	}
	
	@RequestMapping(value="/findTheLatestRuleFileByName")
	@ResponseBody
	public RuleFile getTheLatestRuleFileByName(@RequestParam("ruleName") String ruleName)
	{
		return ruleRepository.findByName(ruleName).getTheLatestFile();
	}
	
	@RequestMapping(value="/findTheLatestRuleHistoryByName")
	@ResponseBody
	public RuleHistory getTheLatestRuleHistoryByName(@RequestParam("ruleName") String ruleName)
	{
		return ruleRepository.findByName(ruleName).getTheLatestHistory();
	}
	
	@RequestMapping(value="/findAllRules")
	@ResponseBody
	public List<Rule> getAllRules()
	{
		return ruleRepository.findAllRules();
	}
	
	@RequestMapping(value="/createRule")
	public void createRule(@PathVariable("ruleName") String ruleName, @PathVariable("category") String category)
	{
		ruleRepository.createRule(ruleName, category);
	}

	@RequestMapping(value="/createFile")
	public void createFile(@PathVariable("ruleName") String ruleName, @PathVariable("ruleText") String ruleText)
	{
		byte[] byteArray = ruleText.getBytes();

		ruleRepository.createRuleFile(ruleRepository.findIdByName(ruleName), byteArray);
	}
	
	@RequestMapping(value="/createHistory")
	public void createHistory(@PathVariable("ruleName") String ruleName, @PathVariable("nodeSet") NodeSet nodeSet, @PathVariable("workingMemory") HashMap<String, FactValue> workingMemory)
	{
		RuleHistory rh = getTheLatestRuleHistoryByName(ruleName);
		ObjectMapper mapper = new ObjectMapper();
		ObjectNode parentObjectNode = new ObjectMapper().createObjectNode();
		ObjectNode childObjectNode = new ObjectMapper().createObjectNode();
		
		if(rh != null) // case of the rule file has been used so that there is a record history.
		{
			JsonNode historyJsonNode = mapper.readTree(rh.getHistory());
			
			List<Entry<String, JsonNode>> historyList = Lists.newArrayList(historyJsonNode.fields());
			
			List<Record> recordList = new ArrayList<>();

			workingMemory.keySet().stream().forEach(rule->{
				
				List<Entry<String, JsonNode>> filteredList = historyList.stream().filter(history->history.getKey().equals(rule))
						 													   	.collect(Collectors.toList());
				boolean isInHistory = filteredList.size() > 0? true:false;
														 
				Record record = new Record();
				record.setName(rule);

				if(isInHistory)
				{
					record.setFalseCount(Integer.parseInt(filteredList.get(0).getValue().get("FALSE").asText()));
					record.setTrueCount(Integer.parseInt(filteredList.get(0).getValue().get("TRUE").asText()));					
				}
				
				FactValue fv = workingMemory.get(rule);

				if(fv.getType().equals(FactValueType.BOOLEAN))
				{
					if(fv.getValue().equals(true))
					{
						record.incrementTrueCount();
					}
					else
					{
						record.incrementFalseCount();
					}
				}
				else
				{
					record.incrementTrueCount();
				}
				recordList.add(record);
			});	
			
			recordList.stream().forEach(record->{

				childObjectNode.put("TRUE", Integer.toString(record.getTrueCount()));
				childObjectNode.put("FALSE", Integer.toString(record.getFalseCount()));
				parentObjectNode.put(record.getName(), cObjectNode);
			});
		}
		else // case of the rule file has never been used so that there is a no record history.
		{
			
			workingMemory.keySet().stream().forEach(item ->{
				childObjectNode.put("TRUE", "1");
				childObjectNode.put("FALSE", "0");
				parentObjectNode.put(item, childObjectNode);
			});
		}
				
		ruleRepository.createRuleHistory(ruleRepository.findIdByName(ruleName), mapper.writerWithDefaultPrettyPrinter().writeValueAsString(parentObjectNode));
	}
	
	
}
