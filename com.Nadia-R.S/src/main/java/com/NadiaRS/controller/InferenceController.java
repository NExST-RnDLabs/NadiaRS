package com.NadiaRS.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.NadiaRS.InferenceEngine.factValuePackage.FactValueType;
import com.NadiaRS.InferenceEngine.inferencePackage.Assessment;
import com.NadiaRS.InferenceEngine.inferencePackage.InferenceEngine;
import com.NadiaRS.InferenceEngine.nodePackage.Node;
import com.NadiaRS.InferenceEngine.ruleParser.RuleSetParser;
import com.NadiaRS.InferenceEngine.ruleParser.RuleSetReader;
import com.NadiaRS.InferenceEngine.ruleParser.RuleSetScanner;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import jersey.repackaged.com.google.common.collect.Lists;

@Controller
@RestController
@SessionAttributes({"inference", "assessment"})
@RequestMapping("service/inference")
public class InferenceController {
	
	
	@Autowired
	private RuleController ruleController;
	
	private RuleSetReader ilr = new RuleSetReader();
	private RuleSetParser isf = new RuleSetParser();
	private RuleSetScanner rsc;
	
	
	@RequestMapping(value="/feedAnswer", method = RequestMethod.POST)
	public ObjectNode feedAnswer(@RequestBody ObjectNode answers, @ModelAttribute("inference") InferenceEngine IE, @ModelAttribute("assessment") Assessment ass)
	{
		List<Entry<String, JsonNode>> answerList = Lists.newArrayList(answers.arrayNode().fields());
		answerList.stream().forEach(item->{
			FactValueType fvt = 	Arrays.asList(FactValueType.values()).stream()
									  .filter(type->type.toString().equals(item.getValue().get("type").asText().toUpperCase()))
									  .findFirst()
									  .get();
			IE.feedAnswerToNode(ass.getNodeToBeAsked(), item.getKey(), item.getValue().get("answer") , fvt, ass);	
		});
		
		return answers;
	}
	
	@RequestMapping(value="/getNextQuestion", method = RequestMethod.GET)
	public ObjectNode getNextQuestion(@ModelAttribute("inference") InferenceEngine IE, @ModelAttribute("assessment") Assessment ass, String ruleName)
	{
		ObjectNode objectNode = new ObjectMapper().createObjectNode();
		Node nextQuestionNode = IE.getNextQuestion(ass);
		HashMap<String,FactValueType> questionFvtMap = IE.findTypeOfElementToBeAsked(nextQuestionNode);
		List<String> questionnaire = IE.getQuestionsFromNodeToBeAsked(nextQuestionNode);
		questionnaire.stream().forEach(question->{
			objectNode.put("question", question);
			objectNode.put("type", questionFvtMap.get(question).toString());
		});
		return objectNode;
	}
	
	@RequestMapping(value="/setInferenceEngine", method = RequestMethod.GET)
	public ObjectNode setInferenceEngine(@ModelAttribute("inference") InferenceEngine IE, @ModelAttribute("assessment") Assessment ass, String ruleName)
	{
		ilr.setStringSource(ruleController.getTheLatestRuleFileByName(ruleName).getFile().toString());
		rsc = new RuleSetScanner(ilr,isf);
		rsc.scanRuleSet();
		rsc.establishNodeSet();
		IE.setNodeSet(isf.getNodeSet());
		ass.setAssessment(isf.getNodeSet(), isf.getNodeSet().getNodeSortedList().get(0).getNodeName());
		
		return new ObjectMapper().createObjectNode().put("Inference Engine","created");
	}
	
	
	@ModelAttribute("inference")
	public InferenceEngine createEngine()
	{		
		return new InferenceEngine();
	}
	
	@ModelAttribute("assessment")
	public Assessment createAssessment()
	{
		return new Assessment();
	}

}
