package com.NadiaRS.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.NadiaRS.InferenceEngine.factValuePackage.FactValue;
import com.NadiaRS.InferenceEngine.factValuePackage.FactValueType;
import com.NadiaRS.InferenceEngine.inferencePackage.InferenceEngine;
import com.NadiaRS.InferenceEngine.nodePackage.Record;
import com.NadiaRS.domain.Rule;
import com.NadiaRS.domain.RuleFile;
import com.NadiaRS.domain.RuleHistory;
import com.NadiaRS.repository.RuleRepository;
import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import jersey.repackaged.com.google.common.collect.Lists;

@RestController
@RequestMapping("service/rule")
public class RuleController {
	
	@Autowired
	RuleRepository ruleRepository;
	
	@RequestMapping(value="/findRuleByName")
	@ResponseBody
	public Rule getRuleByName(@RequestParam(value="ruleName", required=true) String ruleName)
	{
		return ruleRepository.findByName(ruleName);
	}
	
	@RequestMapping(value="/findTheLatestRuleFileByName")
	@ResponseBody
	public RuleFile getTheLatestRuleFileByName(@RequestParam(value="ruleName", required=true) String ruleName)
	{
		return ruleRepository.findByName(ruleName).getTheLatestFile();
	}
	
	@RequestMapping(value="/findTheLatestRuleHistoryByName")
	@ResponseBody
	public RuleHistory getTheLatestRuleHistoryByName(@RequestParam(value="ruleName", required=true) String ruleName)
	{
		return ruleRepository.findByName(ruleName).getTheLatestHistory();
	}
	
	@RequestMapping(value="/findAllRules")
	@ResponseBody
	public List<Rule> getAllRules(RuleRepository ruleRepository)
	{
		return ruleRepository.findAllRules();
	}
	
	@RequestMapping(value="/createRule")
	public JsonNode createRule(@RequestParam(value="ruleName", required=true) String ruleName, @RequestParam(value="category", required=true) String category)
	{
		if(ruleRepository.findByName(ruleName) == null) {
			ruleRepository.createRule(ruleName, category);
		}
		else
		{
			ruleRepository.updateRuleNameAndCategory(ruleName, category);
		}
		
		ObjectNode on = new ObjectMapper().createObjectNode();
		on.put("ruleName", ruleName);
		on.put("category", category);
		
		return on;
	}

	@RequestMapping(value="/createFile")
	public void createFile(@RequestParam(value="ruleName", required=true) String ruleName, @RequestParam(value="ruleText", required=true) String ruleText)
	{
		byte[] byteArray = ruleText.getBytes();

		ruleRepository.createRuleFile(ruleRepository.findIdByName(ruleName), byteArray);
	}
	
	@RequestMapping(value="/createHistory")
	public void createHistory(@RequestParam(value="ruleName", required=true) String ruleName, @ModelAttribute("inference") InferenceEngine IE)
	{
		HashMap<String, FactValue> workingMemory = IE.getAssessmentState().getWorkingMemory();
		
		RuleHistory rh = getTheLatestRuleHistoryByName(ruleName);
		ObjectMapper mapper = new ObjectMapper();
		ObjectNode parentObjectNode = new ObjectMapper().createObjectNode();
		ObjectNode childObjectNode = new ObjectMapper().createObjectNode();
		
		if(rh != null) // case of the rule file has been used so that there is a record history.
		{
			JsonNode historyJsonNode = null;
			try {
				historyJsonNode = mapper.readTree(rh.getHistory());
			} catch (JsonProcessingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			List<Entry<String, JsonNode>> historyList = Lists.newArrayList(historyJsonNode.fields());
			
			List<Record> recordList = new ArrayList<>();

			/*
			 * this is for the case of rules in workingMemory.
			 * Hence, the rules should be checked if it is in history list or not.
			 * if it is in the history list then history record should be fetched and update record according to the workingMemory,
			 * and if is not in the history list then create a new record, and insert the new record into the history list.
			 */
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
					record.setType(fv.getType().toString().toLowerCase());
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
					record.setType(fv.getType().toString().toLowerCase());
					record.incrementTrueCount();
				}
				recordList.add(record);
			});
			
			/*
			 * this is for the case of rules that are not Boolean type and is in history list but not currently being asked.
			 * Hence, the record for the rule should be incremented for 'FALSE' due to it is equivalent to 'FALSE' case for propositional rules.
			 */
			historyList.stream().forEach(item->{
				String rule = item.getKey();
				
				if(!item.getValue().get("TYPE").asText().toLowerCase().equals("boolean") && !workingMemory.containsKey(rule))
				{
					Record record = new Record();
					record.setFalseCount(Integer.parseInt(item.getValue().get("FALSE").asText()));
					record.setTrueCount(Integer.parseInt(item.getValue().get("TRUE").asText()));
					
					record.incrementFalseCount();
					
					recordList.add(record);
				}
			});
			
			recordList.stream().forEach(record->{

				childObjectNode.put("TRUE", Integer.toString(record.getTrueCount()));
				childObjectNode.put("FALSE", Integer.toString(record.getFalseCount()));
				childObjectNode.put("TYPE", record.getType());
				parentObjectNode.put(record.getName(), childObjectNode);
			});
		}
		else // case of the rule file has never been used so that there is a no record history.
		{
			
			workingMemory.keySet().stream().forEach(item ->{
				FactValue fv = workingMemory.get(item);
				if(fv.getType().equals(FactValueType.BOOLEAN))
				{
					if(fv.getValue().equals(Boolean.TRUE))
					{
						childObjectNode.put("TRUE", "1");
						childObjectNode.put("FALSE", "0");
					}
					else
					{
						childObjectNode.put("TRUE", "0");
						childObjectNode.put("FALSE", "1");
					}
				}
				else
				{
					childObjectNode.put("TRUE", "1");
					childObjectNode.put("FALSE", "0");
				}

				
				childObjectNode.put("TYPE", workingMemory.get(item).getType().toString().toLowerCase());
				parentObjectNode.put(item, childObjectNode);
			});
		}
				
		try {
			ruleRepository.createRuleHistory(ruleRepository.findIdByName(ruleName), mapper.writerWithDefaultPrettyPrinter().writeValueAsString(parentObjectNode));
		} catch (JsonGenerationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
}
