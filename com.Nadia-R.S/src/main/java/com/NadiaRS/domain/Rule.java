package com.NadiaRS.domain;

import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@SuppressWarnings("serial")
@Entity
@Table(name="rule")
public class Rule implements Serializable{

	@Id
	@JsonIgnore
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "rule_id", nullable = false, columnDefinition = "BIGINT UNSIGNED") 
	private Long ruleId;
	
	@NotNull
	private String ruleName;
	
	@NotNull
	private String category;
	
	@OneToMany(mappedBy = "rule", 
			   cascade = CascadeType.ALL, 
		   	   orphanRemoval = true)
	private List<RuleFile> file = new ArrayList<>();
	
	@OneToMany(mappedBy = "rule", 
			   cascade = CascadeType.ALL, 
		   	   orphanRemoval = true)
	private List<RuleHistory> history = new ArrayList<>();
	
	protected Rule() {}
	public Rule(String ruleName, String category)
	{
		this.ruleName = ruleName;
		this.category = category;
	}
	public Long getRuleId()
	{
		return this.ruleId;
	}
	
	public String getRuleName() {
		return ruleName;
	}
	public void setRuleName(String ruleName) {
		this.ruleName = ruleName;
	}
	
	public String getRuleCategory()
	{
		return category;
	}
	public void setRuleCategory(String category) {
		this.category = category;
	}
	
	public List<RuleFile> getFiles(){
		return this.file;
	}
	public void addFile(RuleFile file) {
		this.file.add(file);
	}
	public void removeFile(RuleFile file) {
		if(!this.file.isEmpty()) {
			this.file.remove(file);
		}
	}
	public RuleFile getTheLatestFile()
	{
		List<RuleFile> ruleFileList = getFiles();
		RuleFile rf = ruleFileList.size()>0?
						ruleFileList.stream().max((f1, f2)->f1.getCreatedDate().compareTo(f2.getCreatedDate())).get()
						:
						null;
		return rf;
	}
	
	public List<RuleHistory> getHistory(){
		return this.history;
	}
	public void addHistory(RuleHistory history) {
		this.history.add(history);
	}
	public void removeHistory(RuleHistory history) {
		if(!this.history.isEmpty()) {
			this.history.remove(history);
		}
	}
	public RuleHistory getTheLatestHistory()
	{
		List<RuleHistory> ruleHistoryList = getHistory();
		RuleHistory rh = ruleHistoryList.size()>0?
							ruleHistoryList.stream().max((h1, h2)-> h1.getCreatedDate().compareTo(h2.getCreatedDate())).get()
							:
							null;
		return rh;
	}
	
	@Override
    public int hashCode() {
        HashCodeBuilder hcb = new HashCodeBuilder();
        hcb.append(ruleId);
        hcb.append(ruleName);
        return hcb.toHashCode();
    }
	 
    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (this.ruleId == null || obj == null || !(obj instanceof Rule)) {
            return false;
        }
        Rule that = (Rule) obj;
        EqualsBuilder eb = new EqualsBuilder();
        eb.append(ruleId, that.ruleId);
        eb.append(ruleName, that.ruleName);
        return eb.isEquals();
    }
    
	@Override
	public String toString() {
		ObjectMapper mapper = new ObjectMapper();
		String ruleString = "";
		try {
			ruleString =  mapper.writerWithDefaultPrettyPrinter().writeValueAsString(this);
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
		return ruleString;
	}
	
	


}
