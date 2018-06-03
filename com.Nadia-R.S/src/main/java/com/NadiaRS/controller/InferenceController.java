package com.NadiaRS.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.NadiaRS.InferenceEngine.factValuePackage.FactValue;
import com.NadiaRS.InferenceEngine.factValuePackage.FactValueType;
import com.NadiaRS.InferenceEngine.inferencePackage.Assessment;
import com.NadiaRS.InferenceEngine.inferencePackage.InferenceEngine;
import com.NadiaRS.InferenceEngine.nodePackage.LineType;
import com.NadiaRS.InferenceEngine.nodePackage.Node;
import com.NadiaRS.InferenceEngine.nodePackage.Record;
import com.NadiaRS.InferenceEngine.ruleParser.RuleSetParser;
import com.NadiaRS.InferenceEngine.ruleParser.RuleSetReader;
import com.NadiaRS.InferenceEngine.ruleParser.RuleSetScanner;
import com.NadiaRS.domain.RuleHistory;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import jersey.repackaged.com.google.common.collect.Lists;

@Controller
@RestController
@RequestMapping("service/inference/*")
public class InferenceController {
	
	
	@Autowired
	private RuleController ruleController;
	
	
	@RequestMapping(value="viewSummary", method = RequestMethod.GET)
	@ResponseBody
	public ObjectNode[] viewSummary(HttpServletRequest httpRequest)
	{
		InferenceEngine ie = (InferenceEngine)httpRequest.getSession().getAttribute("inferenceEngine");
		
		List<ObjectNode> tempSummaryList = new ArrayList<>();
		HashMap<String, FactValue> tempWorkingMemory = ie.getAssessmentState().getWorkingMemory();
		ie.getAssessmentState().getSummaryList().stream().forEachOrdered((item)->{
			ObjectNode objectNode = new ObjectMapper().createObjectNode();
			objectNode.put("nodeText", item);
			objectNode.put("nodeValue", tempWorkingMemory.get(item).getValue().toString());
			tempSummaryList.add(objectNode);
		});
		
		//following lines are to transfer all possible left over value from editing answers process from workingMemory to summary list in GUI
		tempWorkingMemory.keySet().stream().forEach(key->{
			if(!ie.getAssessmentState().getSummaryList().contains(key))
			{
				ObjectNode objectNode = new ObjectMapper().createObjectNode();
				objectNode.put("nodeText", key);
				objectNode.put("nodeValue", tempWorkingMemory.get(key).getValue().toString());
				tempSummaryList.add(objectNode);
			}
		});
		
		return tempSummaryList.stream().toArray(ObjectNode[]::new);
	}
	
	@RequestMapping(value = "editAnswer", method = RequestMethod.POST)
	public ObjectNode editAnswer(@RequestBody ObjectNode question, HttpServletRequest httpRequest)
	{
		InferenceEngine ie = (InferenceEngine)httpRequest.getSession().getAttribute("inferenceEngine");
		Assessment ass = (Assessment)httpRequest.getSession().getAttribute("assessment");
		
		String questionName = question.get("question").asText();
		
		List<String> questionList = ie.editAnswer(questionName);
		
		ObjectNode objectNode = new ObjectMapper().createObjectNode();
		ArrayNode questionsAndAnswers = objectNode.putArray("workingMemory");
		HashMap<String, FactValue> tempWorkingMemory = ie.getAssessmentState().getWorkingMemory();
		
		questionList.stream().forEachOrdered(eachQuestion->{
			ObjectNode subObjectNode = new ObjectMapper().createObjectNode();
			subObjectNode.put("questionText", eachQuestion);
			subObjectNode.put("answer", tempWorkingMemory.get(eachQuestion).getValue().toString());
			subObjectNode.put("answerValueType", tempWorkingMemory.get(eachQuestion).getType().toString());
			questionsAndAnswers.add(subObjectNode);
		});
		
		if(ie.getAssessmentState().getWorkingMemory().get(ass.getGoalNode().getNodeName())==null  || !ie.getAssessmentState().allMandatoryNodeDetermined())
		{
			objectNode.put("hasMoreQuestion", "true");
		}
		else
		{
			String goalNodeName = ass.getGoalNode().getNodeName();
			objectNode.put("hasMoreQuestion", "false");
			objectNode.put("goalRuleName", goalNodeName);
			objectNode.put("goalRuleValue", ie.getAssessmentState().getWorkingMemory().get(goalNodeName).getValue().toString());
			objectNode.put("goalRuleType", ie.findTypeOfElementToBeAsked(ass.getGoalNode()).get(goalNodeName).toString().toLowerCase());
				
		}
		
		return objectNode;

	}
	
	
	@RequestMapping(value="feedAnswer", method = RequestMethod.POST)
//	@ResponseBody
	public ObjectNode feedAnswer(@RequestBody ObjectNode answers, HttpServletRequest httpRequest)
	{
		InferenceEngine ie = (InferenceEngine)httpRequest.getSession().getAttribute("inferenceEngine");
		Assessment ass = (Assessment)httpRequest.getSession().getAttribute("assessment");

		List<Entry<String, JsonNode>> answerList = Lists.newArrayList(answers.fields());
		String questionName = answerList.get(0).getValue().asText();
		Entry<String, JsonNode> answerEntry = answerList.get(1);
		FactValueType fvt = 	Arrays.asList(FactValueType.values()).stream()
				  .filter(type->type.toString().equals(answerEntry.getValue().get("type").asText().toUpperCase()))
				  .findFirst()
				  .get();
		if(ass.getNodeToBeAsked().getLineType().equals(LineType.ITERATE))
		{
			ie.feedAnswerToNode(ass.getAuxNodeToBeAsked(), questionName, answerEntry.getValue().get("answer").asText(), fvt, ass);
		}
		else
		{
			ie.feedAnswerToNode(ass.getNodeToBeAsked(), questionName, answerEntry.getValue().get("answer").asText() , fvt, ass);
		}
		
		ObjectNode objectNode = new ObjectMapper().createObjectNode();
		if(ie.getAssessmentState().getWorkingMemory().get(ass.getGoalNode().getNodeName())==null  || !ie.getAssessmentState().allMandatoryNodeDetermined())
		{
			objectNode.put("hasMoreQuestion", "true");
		}
		else
		{
			String goalNodeName = ass.getGoalNode().getNodeName();
			objectNode.put("hasMoreQuestion", "false");
			objectNode.put("goalRuleName", goalNodeName);
			objectNode.put("goalRuleValue", ie.getAssessmentState().getWorkingMemory().get(goalNodeName).getValue().toString());
			objectNode.put("goalRuleType", ie.findTypeOfElementToBeAsked(ass.getGoalNode()).get(goalNodeName).toString().toLowerCase());
				
		}
		return objectNode;
	}
	
	@RequestMapping(value="getNextQuestion", method = RequestMethod.GET)
	@ResponseBody
	public ObjectNode[] getNextQuestion(HttpServletRequest httpReq, @RequestParam(value="ruleName", required=true) String ruleName)
	{
		InferenceEngine ie = (InferenceEngine)httpReq.getSession().getAttribute("inferenceEngine");
		if(ie == null || !ie.getNodeSet().getNodeSetName().equals(ruleName))
		{
			setInferenceEngine(httpReq, ruleName);
		}
		ie = (InferenceEngine)httpReq.getSession().getAttribute("inferenceEngine");
		Assessment ass = (Assessment)httpReq.getSession().getAttribute("assessment");
		
		Node nextQuestionNode = ie.getNextQuestion(ass);
		if(ass.getNodeToBeAsked().getLineType().equals(LineType.ITERATE))
		{
			ass.setAuxNodeToBeAsked(nextQuestionNode);
		}
		HashMap<String,FactValueType> questionFvtMap = ie.findTypeOfElementToBeAsked(nextQuestionNode);
		List<String> questionnaire = ie.getQuestionsFromNodeToBeAsked(nextQuestionNode);
		List<ObjectNode> questionnaireList = new ArrayList<>();
		HashMap<String, FactValue> tempWorkingMemory = ie.getAssessmentState().getWorkingMemory();
		questionnaire.stream().forEachOrdered((question)->{
			if(!tempWorkingMemory.containsKey(question)) {
				ObjectNode objectNode = new ObjectMapper().createObjectNode();
				objectNode.put("questionText", question);
				objectNode.put("questionValueType", questionFvtMap.get(question).toString().toLowerCase());
				questionnaireList.add(objectNode);
			}
		});
		


		ObjectNode[] onArray = questionnaireList.stream().toArray(ObjectNode[]::new);
		return onArray;
	}
	
	@RequestMapping(value="readFileSetInferenceEngine", method = RequestMethod.GET)
	@ResponseBody
	public ObjectNode readFileSetInferenceEngine(HttpServletRequest httpReq, String filePath)
	{	
		
		InferenceEngine ie = new InferenceEngine();
		RuleSetReader ilr = new RuleSetReader();
		ilr.setStreamSource(getClass().getClassLoader().getResourceAsStream(filePath));
		RuleSetParser isf = new RuleSetParser();
		RuleSetScanner rsc;
		
		rsc = new RuleSetScanner(ilr,isf);
		rsc.scanRuleSet();
		

		rsc.establishNodeSet();

		ie.setNodeSet(isf.getNodeSet());
		ie.getNodeSet().setNodeSetName(filePath.split(".")[0]);

		Assessment ass = new Assessment();

		ass.setAssessment(isf.getNodeSet(), isf.getNodeSet().getNodeSortedList().get(0).getNodeName());
		ie.setAssessment(ass);
		
		httpReq.getSession().setAttribute("inferenceEngine", ie);
		httpReq.getSession().setAttribute("assessment", ass);
		
		ObjectNode on = new ObjectMapper().createObjectNode();
		on.put("InferenceEngine", "created");
		
		return on;
		
	}
	
	@RequestMapping(value="setInferenceEngine", method = RequestMethod.GET)
	@ResponseBody
	public ObjectNode setInferenceEngine(HttpServletRequest httpReq, String ruleName)
	{	
		
		InferenceEngine ie = new InferenceEngine();
		String ruleText = new String(ruleController.getTheLatestRuleFileByName(ruleName).getFile());
		RuleSetReader ilr = new RuleSetReader();
		RuleSetParser isf = new RuleSetParser();
		RuleSetScanner rsc;
		
		ilr.setStringSource(ruleText);
		rsc = new RuleSetScanner(ilr,isf);
		rsc.scanRuleSet();
		
//		RuleHistory ruleHistory = ruleController.getTheLatestRuleHistoryByName(ruleName);
//		HashMap<String, Record> historyMap = ruleHistory != null? ruleHistory.getHistoryMap(): null; 
//		
//		rsc.establishNodeSet(historyMap);
		rsc.establishNodeSet();

		ie.setNodeSet(isf.getNodeSet());
		ie.getNodeSet().setNodeSetName(ruleName);

		Assessment ass = new Assessment();

		ass.setAssessment(isf.getNodeSet(), isf.getNodeSet().getNodeSortedList().get(0).getNodeName());
		ie.setAssessment(ass);
		
		httpReq.getSession().setAttribute("inferenceEngine", ie);
		httpReq.getSession().setAttribute("assessment", ass);
		
		ObjectNode on = new ObjectMapper().createObjectNode();
		on.put("InferenceEngine", "created");
		
		return on;
		
	}
	
	@RequestMapping(value="setMachineLearningInferenceEngine", method = RequestMethod.GET)
	@ResponseBody
	public ObjectNode setMachineLearningInferenceEngine(HttpServletRequest httpReq, String ruleName)
	{	
		
		InferenceEngine ie = new InferenceEngine();
		String ruleText = new String(ruleController.getTheLatestRuleFileByName(ruleName).getFile());
		RuleSetReader ilr = new RuleSetReader();
		RuleSetParser isf = new RuleSetParser();
		RuleSetScanner rsc;
		
		ilr.setStringSource(ruleText);
		rsc = new RuleSetScanner(ilr,isf);
		rsc.scanRuleSet();
		
		RuleHistory ruleHistory = ruleController.getTheLatestRuleHistoryByName(ruleName);
		HashMap<String, Record> historyMap = ruleHistory != null? ruleHistory.getHistoryMap(): null; 
		
		rsc.establishNodeSet(historyMap);
//		rsc.establishNodeSet();

		ie.setNodeSet(isf.getNodeSet());
		ie.getNodeSet().setNodeSetName(ruleName);

		Assessment ass = new Assessment();

		ass.setAssessment(isf.getNodeSet(), isf.getNodeSet().getNodeSortedList().get(0).getNodeName());
		ie.setAssessment(ass);
		
		httpReq.getSession().setAttribute("inferenceEngine", ie);
		httpReq.getSession().setAttribute("assessment", ass);
		
		ObjectNode on = new ObjectMapper().createObjectNode();
		on.put("InferenceEngine", "created");
		
		return on;
		
	}
}
