package com.NadiaRS.domain;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import javax.persistence.AttributeConverter;

public class LocalDateTimeConverter implements AttributeConverter< LocalDateTime, Timestamp > {
	
	 @Override
	 public Timestamp convertToDatabaseColumn(LocalDateTime attribute) {
	  return attribute != null ? Timestamp.valueOf(attribute) : null;
	 }
	 
	 @Override
	 public LocalDateTime convertToEntityAttribute(Timestamp dbData) {
	  return dbData != null ? dbData.toLocalDateTime() : null;
	 }
}
