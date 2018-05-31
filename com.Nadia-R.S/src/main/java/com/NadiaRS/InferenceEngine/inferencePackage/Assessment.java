package com.NadiaRS.InferenceEngine.inferencePackage;

import java.util.ArrayList;
import java.util.List;

import com.NadiaRS.InferenceEngine.nodePackage.Node;
import com.NadiaRS.InferenceEngine.nodePackage.NodeSet;


/*
 * the reason of having Assessment class is to allows a user to do multiple assessment within one or multiple conditions.
 */
public class Assessment {
	private Node goalNode;
	private int goalNodeIndex; // the goal rule index in ruleList of ruleSet
	/*
	 * each instance of this object has a variable of ruleToBeAsked due to the following reasons;
	 * 1. a user will be allowed to do assessment on multiple investigation points at the same time;
	 * 2. a user will be allowed to do an assessment within another assessment. 
	 */
	private Node nodeToBeAsked;
	
	/*
	 * this variable is to track next node to be asked within 'IterateLine' type node.
	 * However, better way needs to be found.
	 */
	private Node auxNodeToBeAsked;
	private List<Integer> nodeIdListOfToBeAsked;
	
	public Assessment()
	{
		
	}
	public Assessment(NodeSet ns, String goalNodeName)
	{
		goalNode = ns.getNodeMap().get(goalNodeName);
		goalNodeIndex = ns.findNodeIndex(goalNodeName);
		nodeToBeAsked = null;
		auxNodeToBeAsked = null; 
		nodeIdListOfToBeAsked = new ArrayList<>();

	}
	
	public void setAssessment(NodeSet nodeSet, String goalNodeName)
	{
		goalNode = nodeSet.getNodeMap().get(goalNodeName);
		goalNodeIndex = nodeSet.findNodeIndex(goalNodeName);
		nodeToBeAsked = null; 
		auxNodeToBeAsked = null; 
		nodeIdListOfToBeAsked = new ArrayList<>();
	}

	public Node getGoalNode()
	{
		return this.goalNode;
	}
	public int getGoalNodeIndex()
	{
		return this.goalNodeIndex;
	}
	
	public void setNodeToBeAsked(Node nodeToBeAsked)
	{
		this.nodeToBeAsked = nodeToBeAsked;
		if(!this.nodeIdListOfToBeAsked.contains(nodeToBeAsked.getNodeId()))
		{
			this.nodeIdListOfToBeAsked.add(nodeToBeAsked.getNodeId());
		}
		
	}
	public Node getNodeToBeAsked()
	{
		return this.nodeToBeAsked;
	}
	 
	public void setAuxNodeToBeAsked(Node auxNodeToBeAsked)
	{
		this.auxNodeToBeAsked = auxNodeToBeAsked;

	}
	public Node getAuxNodeToBeAsked()
	{
		return this.auxNodeToBeAsked;
	}
	
	public void setNodeIdListToBeAsked(List<Integer> nodeIdListToBeAsked) {
		this.nodeIdListOfToBeAsked = nodeIdListToBeAsked;
	}
	public List<Integer> getNodeIdListToBeAsked(){
		return this.nodeIdListOfToBeAsked;
	}
}
