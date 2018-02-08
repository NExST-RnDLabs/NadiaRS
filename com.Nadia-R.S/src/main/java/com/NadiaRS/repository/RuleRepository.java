package com.NadiaRS.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.NadiaRS.domain.Rule;

@Repository
@Transactional
public interface RuleRepository extends JpaRepository<Rule, Long>{
	
	@Query(value="SELECT RULE_ID FROM RULE WHERE NAME=LOWER(:ruleName);", nativeQuery = true)
	public long findIdByName(String ruleName);
	
	@Query(value="SELECT R.RULE_ID, R.NAME, R.CATEGORY, F.RULE_ID, F.FILE_ID, F.CRATED_DATE, F.FILES, H.RULE_ID, H.HISTORY_ID, H.CREATED_DATE, H.HISTORY FROM RULE R, FILE F, HISTORY H, WHERE R.RULE_ID = F.RULE_ID AND R.RULE_ID = H.RULE_ID AND R.NAME = LOWER(:ruleName)" , nativeQuery = true)
	public Rule findByName(String ruleName);
	
	@Query(value="SELECT R.RULE_ID, R.NAME, R.CATEGORY, F.RULE_ID, F.FILE_ID, F.CRATED_DATE, F.FILES, H.RULE_ID, H.HISTORY_ID, H.CREATED_DATE, H.HISTORY FROM RULE R, FILE F, HISTORY H, WHERE R.RULE_ID = F.RULE_ID AND R.RULE_ID = H.RULE_ID", nativeQuery = true)
	public List<Rule> findAllRules();
	
	@Query(value ="BEGIN UPDATE RULE SET NAME = :ruleName, CATEGORY = :ruleCategory WHERE NAME = :ruleName; END;", nativeQuery = true)
	public void updateRuleNameAndCategory(String ruleName, String ruleCategroy);
	
	@Query(value="BEGIN INSERT INTO RULE (NAME, CATEGORY) VALUES(LOWER(:ruleName), LOWER(:ruleCategory)); END;", nativeQuery = true)
	public void createRule(String ruleName, String ruleCategory);
	
	@Transactional
	@Query(value="BEGIN INSERT INTO FILE (FILES) VALUES(:file) WHERE RULE_ID = :rule_id; END;", nativeQuery = true)
	public void createRuleFile(long rule_id, byte[] file);
	
	@Transactional
	@Query(value="BEGIN INSERT INTO HISTORY (HISTORY) VALUES(:historyInString) WHERE RULE_ID=:rule_id; END;", nativeQuery = true)
	public void createRuleHistory(long rule_id, String historyInString);
}
