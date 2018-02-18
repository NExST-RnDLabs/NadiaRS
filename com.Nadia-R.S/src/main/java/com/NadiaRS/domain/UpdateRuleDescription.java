package com.NadiaRS.domain;

import org.springframework.beans.factory.annotation.Autowired;

public class UpdateRuleDescription {

	private String newRuleName;
	private String oldRuleName;
	private String newRuleCategory;

	public UpdateRuleDescription() {}
//	@Autowired
//	public UpdateRuleDescription(String newRuleName, String oldRuleName, String newRuleCategory)
//	{
//		this.newRuleName = newRuleName;
//		this.oldRuleName = oldRuleName;
//		this.newRuleCategory = newRuleCategory;
//	}

	public String getNewRuleName() {
		return newRuleName;
	}

	public void setNewRuleName(String newRuleName) {
		this.newRuleName = newRuleName;
	}

	public String getOldRuleName() {
		return oldRuleName;
	}

	public void setOldRuleName(String oldRuleName) {
		this.oldRuleName = oldRuleName;
	}

	public String getNewRuleCategory() {
		return newRuleCategory;
	}

	public void setNewRuleCategory(String newRuleCategory) {
		this.newRuleCategory = newRuleCategory;
	}
}
