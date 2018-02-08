package com.NadiaRS.domain;

import java.io.Serializable;
import java.time.LocalDateTime;

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
import org.hibernate.annotations.Type;

import com.fasterxml.jackson.annotation.JsonIgnore;

@SuppressWarnings("serial")
@Entity
@Table(name="history")
public class RuleHistory implements Serializable{
	
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
