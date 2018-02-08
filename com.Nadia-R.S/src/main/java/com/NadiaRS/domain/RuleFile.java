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
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.hibernate.annotations.Type;

import com.fasterxml.jackson.annotation.JsonIgnore;

@SuppressWarnings("serial")
@Entity
@Table(name="file")
public class RuleFile implements Serializable{

	@Id
	@JsonIgnore
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "file_id", nullable = false, columnDefinition = "BIGINT UNSIGNED") 
	private Long fileId;
	
	@Column(name = "created_date", updatable=false, insertable=false, nullable = false, columnDefinition= "TIMESTAMP WITH TIME ZONE")
	@Convert(converter = LocalDateTimeConverter.class)
	private LocalDateTime createdDate;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="rule_id")
	private Rule rule;
	
	@Lob
	@Column(name="files", nullable = false)
	@Type(type="org.hibernate.type.BinaryType")
	private byte[] file;
	
	public Long getFileId() {
		return fileId;
	}
	
	public LocalDateTime getCreatedDate() {
		return this.createdDate;
	}
	
	public byte[] getFile() {
		return this.file;
	}
	public void setFile(byte[] file) {
		this.file = file;
	}
	
	@Override
    public int hashCode() {
        HashCodeBuilder hcb = new HashCodeBuilder();
        hcb.append(fileId);
        hcb.append(createdDate);
        return hcb.toHashCode();
    }
	 
    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (this.fileId == null || obj == null || !(obj instanceof RuleFile)) {
            return false;
        }
        RuleFile that = (RuleFile) obj;
        EqualsBuilder eb = new EqualsBuilder();
        eb.append(fileId, that.fileId);
        eb.append(createdDate, that.createdDate);
        return eb.isEquals();
    }
}
