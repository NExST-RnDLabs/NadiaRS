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
public interface RuleRepository extends JpaRepository<Rule, Long>{
	
	@Query(value="SELECT RULE_ID FROM RULE "
				+ "WHERE NAME=(:ruleName);", nativeQuery = true)
	public long findIdByName(@Param("ruleName") String ruleName);
	
	@Query(value="SELECT R.RULE_ID, R.NAME, R.CATEGORY, F.RULE_ID, F.FILE_ID, F.CREATED_DATE, F.FILES, H.RULE_ID, H.HISTORY_ID, H.CREATED_DATE, H.HISTORY "
				+ "FROM RULE R, FILE F, HISTORY H "
				+ "WHERE R.RULE_ID = F.RULE_ID AND R.RULE_ID = H.RULE_ID AND R.NAME = (?1);" , nativeQuery = true)
	public Rule findByName( String name);
	
	@Query(value="SELECT R.RULE_ID, R.NAME, R.CATEGORY, F.RULE_ID, F.FILE_ID, F.CREATED_DATE, F.FILES "
				+ "FROM RULE R, FILE F "
				+ "WHERE R.RULE_ID = F.RULE_ID AND R.NAME = (:name);", nativeQuery = true)
	public Rule findByNameForRuleText(@Param("name")String name);
	
	@Query(value="SELECT RULE_ID, NAME, CATEGORY FROM RULE "
			+ "WHERE NAME = (?1);", nativeQuery = true)
	public Rule searchRuleByName(String name);
	
	public List<Rule> findAll();
	
	@Modifying
	@Transactional
	@Query(value ="BEGIN; "
				+ "UPDATE RULE SET NAME = (:ruleName), CATEGORY = (:category) "
				+ "WHERE NAME = (:oldRuleName); "
				+ "END;", nativeQuery = true)
	public void updateRuleNameAndCategory(@Param("oldRuleName") String oldRuleName, @Param("ruleName") String ruleName, @Param("category") String category);
	
	@Modifying
	@Transactional
	@Query(value="BEGIN; "
				+ "INSERT INTO RULE (NAME, CATEGORY) "
				+ "VALUES((:ruleName), (:category));"
				+ "END;", nativeQuery = true)
	public void createNewRule(@Param("ruleName") String ruleName, @Param("category") String category);
	
	@Modifying
	@Transactional
	@Query(value="BEGIN; "
				+ "INSERT INTO FILE (RULE_ID, FILES) "
				+ "VALUES(:rule_id, :file);"
				+ "END;", nativeQuery = true)
	public void createRuleFile(@Param("rule_id") long rule_id, @Param("file") byte[] file);
	
	@Modifying
	@Transactional
	@Query(value="BEGIN; "
				+ "INSERT INTO HISTORY (RULE_ID, HISTORY) "
				+ "VALUES(:ruleId, to_json((:historyInString))); "
				+ "END;", nativeQuery = true)
	public void createRuleHistory(@Param("ruleId") long rule_id, @Param("historyInString") String historyInString);
	
}
