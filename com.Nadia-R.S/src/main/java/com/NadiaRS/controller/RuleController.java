package com.NadiaRS.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.NadiaRS.InferenceEngine.factValuePackage.FactValue;
import com.NadiaRS.InferenceEngine.factValuePackage.FactValueType;
import com.NadiaRS.InferenceEngine.inferencePackage.InferenceEngine;
import com.NadiaRS.InferenceEngine.nodePackage.Record;
import com.NadiaRS.domain.CreateFile;
import com.NadiaRS.domain.Rule;
import com.NadiaRS.domain.RuleFile;
import com.NadiaRS.domain.RuleHistory;
import com.NadiaRS.domain.UpdateRuleDescription;
//import com.NadiaRS.repository.RuleRepository;
import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import jersey.repackaged.com.google.common.collect.Lists;

@RestController
@RequestMapping("service/rule/*")
public class RuleController {
	
//	@Autowired
//	private RuleRepository ruleRepository;
	
//	@RequestMapping(value="searchRuleByName", produces="application/json")
//	@ResponseBody
//	public Rule searchRuleByName(@RequestParam(value="ruleName", required=true) String ruleName)
//	{
//		return ruleRepository.searchRuleByName(ruleName);
//	}
	
//	@RequestMapping(value="findRuleTextByName", produces="application/json")
//	@ResponseBody
//	public JsonNode findRuleTextByName(@RequestParam(value="ruleName", required=true) String ruleName)
//	{
//
//		ObjectNode on = new ObjectMapper().createObjectNode();
//		Rule rule = ruleRepository.findByNameForRuleText(ruleName);
//		if(rule != null)
//		{
//			RuleFile rf = ruleRepository.findByNameForRuleText(ruleName).getTheLatestFile();
//			on.put("ruleText", new String(rf.getFile()));
//		}
//		
//		return on;
//	}
	
//	@RequestMapping(value="findTheLatestRuleFileByName", produces="application/json")
//	@ResponseBody
//	public RuleFile getTheLatestRuleFileByName(@RequestParam(value="ruleName", required=true) String ruleName)
//	{
//		return ruleRepository.findByNameForRuleText(ruleName).getTheLatestFile();
//	}
	
//	@RequestMapping(value="findTheLatestRuleHistoryByName", produces="application/json")
//	@ResponseBody
//	public RuleHistory getTheLatestRuleHistoryByName(@RequestParam(value="ruleName", required=true) String ruleName)
//	{
//		Rule rule = ruleRepository.findByName(ruleName); 
//		return rule!=null?rule.getTheLatestHistory():null;
//	}
	
//	@RequestMapping(value="findAllRules", produces="application/json")
//	@ResponseBody
//	public List<Rule> getAllRules()
//	{
//		return ruleRepository.findAll();
//	}
	
	
//	@RequestMapping(value="updateRule", method =RequestMethod.POST)
//	public JsonNode updateRule(@RequestBody UpdateRuleDescription updateRule)
//	{
//		String oldRuleName = updateRule.getOldRuleName();
//		String newRuleName = updateRule.getNewRuleName();
//		String newCategory = updateRule.getNewRuleCategory();
//		ruleRepository.updateRuleNameAndCategory(oldRuleName, newRuleName, newCategory);
//		
//		Rule ruleFromDatabase = ruleRepository.searchRuleByName(newRuleName);
//		
//		ObjectNode on = new ObjectMapper().createObjectNode();
//		on.put("newRuleName", ruleFromDatabase.getName());
//		on.put("newCategory", ruleFromDatabase.getCategory());
//		
//		return on;
//	}
//	
	
//	@RequestMapping(value="createNewRule", method =RequestMethod.POST)
//	public JsonNode createNewRule(@RequestBody Rule rule)
//	{
//		String ruleName = rule.getName();
//		String category = rule.getCategory();
//		ruleRepository.createNewRule(ruleName, category);
//		
//		Rule ruleFromDatabase = ruleRepository.searchRuleByName(ruleName);
//		
//		ObjectNode on = new ObjectMapper().createObjectNode();
//		on.put("ruleName", ruleFromDatabase.getName());
//		on.put("category", ruleFromDatabase.getCategory());
//		
//		return on;
//	}

//	@RequestMapping(value="createFile", method =RequestMethod.POST )
//	public JsonNode createFile( @RequestBody CreateFile createFile)
//	{
//		
//		String ruleName = createFile.getRuleName();
//		String ruleText = createFile.getRuleText();
//		
//		
//		byte[] byteArray = ruleText.getBytes();
//
//		long ruleId = ruleRepository.findIdByName(ruleName);
//		ruleRepository.createRuleFile(ruleId, byteArray);
//		
//		RuleFile ruleFileFromDatabase = ruleRepository.findByNameForRuleText(ruleName).getTheLatestFile();
//		
//		ObjectNode on = new ObjectMapper().createObjectNode();
//		on.put("ruleText", new String(ruleFileFromDatabase.getFile()));
//		
//		
//		return on;
//	}
	
	
//	
//	@RequestMapping(value="updateHistory", method =RequestMethod.POST)
//	public ObjectNode updateHistory(@RequestBody CreateFile requestRule, HttpServletRequest httpRequest)
//	{
//		InferenceEngine ie = (InferenceEngine)httpRequest.getSession().getAttribute("inferenceEngine");
//		HashMap<String, FactValue> workingMemory = ie.getAssessmentState().getWorkingMemory();
//		String ruleName = requestRule.getRuleName();
//		
//		RuleHistory rh = getTheLatestRuleHistoryByName(ruleName);
//		ObjectMapper mapper = new ObjectMapper();
//		ObjectNode parentObjectNode = mapper.createObjectNode();
//		
//		if(rh != null) // case of the rule file has been used so that there is a record history.
//		{
//			JsonNode historyJsonNode = null;
//			ObjectNode objectNode = null;
//			try {
//				historyJsonNode = mapper.readTree(rh.getHistory());
//				objectNode = (ObjectNode)mapper.readTree(historyJsonNode.asText());
//			} catch (JsonProcessingException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			} catch (IOException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//			
//			List<Entry<String, JsonNode>> historyList = Lists.newArrayList(objectNode.fields());
//			
//			List<Record> recordList = new ArrayList<>();
//
//			/*
//			 * this is for the case of rules in workingMemory.
//			 * Hence, the rules should be checked if it is in history list or not.
//			 * if it is in the history list then history record should be fetched and update record according to the workingMemory,
//			 * and if is not in the history list then create a new record, and insert the new record into the history list.
//			 */
//			workingMemory.keySet().stream().forEach(rule->{
//				
//				List<Entry<String, JsonNode>> filteredList = historyList.stream().filter(history->history.getKey().equals(rule))
//						 													   	.collect(Collectors.toList());
//				boolean isInHistory = filteredList.size() > 0? true:false;
//														 
//				Record record = new Record();
//				record.setName(rule);
//
//				if(isInHistory)
//				{
//					record.setFalseCount(Integer.parseInt(filteredList.get(0).getValue().get("false").asText()));
//					record.setTrueCount(Integer.parseInt(filteredList.get(0).getValue().get("true").asText()));					
//				}
//				
//				FactValue fv = workingMemory.get(rule);
//
//				if(fv.getType().equals(FactValueType.BOOLEAN))
//				{
//					record.setType(fv.getType().toString().toLowerCase());
//					if(fv.getValue().equals(true))
//					{
//						record.incrementTrueCount();
//					}
//					else
//					{
//						record.incrementFalseCount();
//					}
//				}
//				else
//				{
//					record.setType(fv.getType().toString().toLowerCase());
//					record.incrementTrueCount();
//				}
//				recordList.add(record);
//			});
//			
//			/*
//			 * this is for the case of rules that are not Boolean type and is in history list but not currently being asked.
//			 * Hence, the record for the rule should be incremented for 'FALSE' due to it is equivalent to 'FALSE' case for propositional rules.
//			 */
//			historyList.stream().forEach(item->{
//				String rule = item.getKey();
//				
//				if(!item.getValue().get("type").asText().toLowerCase().equals("boolean") && !workingMemory.containsKey(rule))
//				{
//					Record record = new Record();
//					record.setName(rule);
//					record.setFalseCount(Integer.parseInt(item.getValue().get("false").asText()));
//					record.setTrueCount(Integer.parseInt(item.getValue().get("true").asText()));
//					
//					record.incrementFalseCount();
//					
//					recordList.add(record);
//				}
//				else if(item.getValue().get("type").asText().toLowerCase().equals("boolean") && !workingMemory.containsKey(rule))
//				{
//					Record record = new Record();
//					record.setName(rule);
//					record.setFalseCount(Integer.parseInt(item.getValue().get("false").asText()));
//					record.setTrueCount(Integer.parseInt(item.getValue().get("true").asText()));
//					recordList.add(record);
//
//				}
//			});
//			
//			recordList.stream().forEach(record->{
//				ObjectNode childObjectNode = mapper.createObjectNode();
//				childObjectNode.put("true", Integer.toString(record.getTrueCount()));
//				childObjectNode.put("false", Integer.toString(record.getFalseCount()));
//				childObjectNode.put("type", record.getType());
//				parentObjectNode.set(record.getName(), childObjectNode);
//			});
//		}
//		else // case of the rule file has never been used so that there is a no record history.
//		{
//			
//			workingMemory.keySet().stream().forEach(item ->{
//				FactValue fv = workingMemory.get(item);
//				ObjectNode childObjectNode = mapper.createObjectNode();
//
//				if(fv.getType().equals(FactValueType.BOOLEAN))
//				{
//					if(fv.getValue().equals(Boolean.TRUE))
//					{
//						childObjectNode.put("true", "1");
//						childObjectNode.put("false", "0");
//					}
//					else
//					{
//						childObjectNode.put("true", "0");
//						childObjectNode.put("false", "1");
//					}
//				}
//				else
//				{
//					childObjectNode.put("true", "1");
//					childObjectNode.put("false", "0");
//				}
//
//				
//				childObjectNode.put("type", workingMemory.get(item).getType().toString());
//				parentObjectNode.set(item, childObjectNode);
//			});
//		}
//				
//		try 
//		{
//			String jsonString = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(parentObjectNode);
//			ruleRepository.createRuleHistory(ruleRepository.findIdByName(ruleName), jsonString);
//		} catch (JsonGenerationException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} catch (JsonMappingException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		
//		ObjectNode on = mapper.createObjectNode();
//		on.put("update", "done");
//		
//		return on;
//	}
//	
	
}
