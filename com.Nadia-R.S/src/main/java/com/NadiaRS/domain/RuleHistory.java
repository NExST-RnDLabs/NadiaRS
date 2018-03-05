package com.NadiaRS.domain;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import com.NadiaRS.InferenceEngine.nodePackage.Record;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import jersey.repackaged.com.google.common.collect.Lists;


@Entity
@Table(name="history")
public class RuleHistory{
	
	@Id
	@JsonIgnore
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "history_id", nullable = false, columnDefinition = "BIGINT UNSIGNED") 
	private Long historyId;
	
	@Column(name = "created_date", updatable=false, insertable=false, nullable = false, columnDefinition= "TIMESTAMP WITH TIME ZONE")
	@Convert(converter = LocalDateTimeConverter.class)
	private LocalDateTime createdDate;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="rule_id")
	private Rule rule;
	
	@Column(name="history", nullable = false, columnDefinition = "json")
	private String historyInString;
	
	public Long getHistoryId() {
		return historyId;
	}
	
	public LocalDateTime getCreatedDate() {
		return this.createdDate;
	}
	
	public String getHistory() {
		return this.historyInString;
	}
	
	public HashMap<String, Record> getHistoryMap(){
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Record> historyMap = new HashMap<>();
	    try {
				JsonNode jsonNode = mapper.readTree(getHistory());
				ObjectNode node = (ObjectNode) new ObjectMapper().readTree(jsonNode.asText());
				
				List<Entry<String, JsonNode>> historyList = Lists.newArrayList(node.fields());
				historyList.stream().forEachOrdered(entry->{
					
					Record record = new Record(entry.getKey(), 
											  entry.getValue().get("type").asText(), 
											  Integer.parseInt(entry.getValue().get("true").asText()), 
											  Integer.parseInt(entry.getValue().get("false").asText()));
					historyMap.put(entry.getKey(), record);
				});
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    return historyMap;
	}
	
	public void setHistory(String historyInString) {
		this.historyInString = historyInString;
	}
	
	@Override
    public int hashCode() {
        HashCodeBuilder hcb = new HashCodeBuilder();
        hcb.append(historyId);
        hcb.append(createdDate);
        return hcb.toHashCode();
    }
	 
    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (this.historyId == null || obj == null || !(obj instanceof RuleHistory)) {
            return false;
        }
        RuleHistory that = (RuleHistory) obj;
        EqualsBuilder eb = new EqualsBuilder();
        eb.append(historyId, that.historyId);
        eb.append(createdDate, that.createdDate);
        return eb.isEquals();
    }
}
