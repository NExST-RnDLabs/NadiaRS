package com.NadiaRS.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.NadiaRS.domain.Rule;


@Repository
@Transactional
public interface RuleRepository extends JpaRepository<Rule, Long>{
	
	@Query(value="SELECT RULE_ID FROM RULE WHERE NAME=LOWER(:ruleName);", nativeQuery = true)
	public long findIdByName(@Param("ruleName") String ruleName);
	
	@Query(value="SELECT R.RULE_ID, R.NAME, R.CATEGORY, F.RULE_ID, "
			+ "F.FILE_ID, F.CREATED_DATE, F.FILES, H.RULE_ID, H.HISTORY_ID, H.CREATED_DATE, H.HISTORY FROM RULE R, "
			+ "FILE F, HISTORY H WHERE R.RULE_ID = F.RULE_ID AND R.RULE_ID = H.RULE_ID AND R.NAME = LOWER(?1);" , nativeQuery = true)
	public Rule findByName( String name);
	
	@Query(value="SELECT RULE_ID, NAME, CATEGORY FROM RULE WHERE NAME = LOWER(?1);", nativeQuery = true)
	public Rule searchRuleByName(String name);
	
	public List<Rule> findAll();
	
	@Modifying
	@Query(value ="BEGIN; UPDATE RULE SET NAME = LOWER(:ruleName), CATEGORY = LOWER(:category) WHERE NAME = :ruleName; END;", nativeQuery = true)
	public void updateRuleNameAndCategory(@Param("ruleName") String ruleName, @Param("category") String category);
	
	@Modifying
	@Query(value="INSERT INTO RULE (NAME, CATEGORY) VALUES(LOWER(:ruleName), LOWER(:category));", nativeQuery = true)
	public void createRule(@Param("ruleName") String ruleName, @Param("category") String category);
	
	@Transactional
	@Query(value="BEGIN; INSERT INTO FILE (FILES) VALUES(:file) WHERE RULE_ID = :ruleId; END;", nativeQuery = true)
	public void createRuleFile(@Param("ruleId") long rule_id, @Param("file") byte[] file);
	
	@Transactional
	@Query(value="BEGIN; INSERT INTO HISTORY (HISTORY) VALUES(LOWER(:historyInString)) WHERE RULE_ID=:ruleId; END;", nativeQuery = true)
	public void createRuleHistory(@Param("ruleId") long rule_id, @Param("historyInString") String historyInString);
}
