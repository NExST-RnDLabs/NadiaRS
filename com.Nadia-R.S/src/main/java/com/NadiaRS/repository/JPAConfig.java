//package com.NadiaRS.repository;
//
//import java.util.Properties;
//
//import javax.persistence.EntityManagerFactory;
//import javax.sql.DataSource;
//
//import org.hibernate.jpa.HibernatePersistenceProvider;
//import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
//import org.springframework.boot.autoconfigure.domain.EntityScan;
//import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
//import org.springframework.boot.context.properties.ConfigurationProperties;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor;
//import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
//import org.springframework.orm.jpa.JpaTransactionManager;
//import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
//import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
//import org.springframework.transaction.PlatformTransactionManager;
//import org.springframework.transaction.annotation.EnableTransactionManagement;
//
//
//@Configuration
//@EnableTransactionManagement
//@EnableAutoConfiguration
//@EntityScan(basePackages="com.NadiaRS.domain")
//@EnableJpaRepositories(basePackages="com.NadiaRS.repository")
//public class JPAConfig {
//	
//	@ConfigurationProperties(prefix="spring.datasource")
//	@Bean
//	public DataSource dataSource()
//	{
//		return DataSourceBuilder.create().build();
//	}
//	
//	@Bean(name = "entityManagerFactory")
//	public EntityManagerFactory entityManagerFactory() {
//		
//		HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
//		vendorAdapter.setGenerateDdl(true);
//		vendorAdapter.setDatabasePlatform("org.hibernate.dialect.PostgreSQL94Dialect");
//		vendorAdapter.setShowSql(true);
//		
//		
//		LocalContainerEntityManagerFactoryBean entityManagerFactory = new LocalContainerEntityManagerFactoryBean();
//		entityManagerFactory.setJpaVendorAdapter(vendorAdapter);
//		entityManagerFactory.setPackagesToScan("com.NadiaRS.domain");
//		entityManagerFactory.setDataSource(dataSource());
//		
//
//		entityManagerFactory.setPersistenceProviderClass(HibernatePersistenceProvider.class);
//		entityManagerFactory.afterPropertiesSet();
//				
//		return entityManagerFactory.getObject();
//	}
//	
//	@Bean
//	public PlatformTransactionManager transactionManager() {
//		JpaTransactionManager txManager = new JpaTransactionManager();
//		txManager.setEntityManagerFactory(entityManagerFactory());
//		return txManager;
//	}
//
////	@Bean
////	public JpaTransactionManager transactionManager() {
////		JpaTransactionManager transactionManager = new JpaTransactionManager();
////		transactionManager.setEntityManagerFactory(entityManagerFactory().getObject());
////		
////		return transactionManager;
////	}	
////	@ConfigurationProperties(prefix="spring.jpa")
////	@Bean
////	public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
////		
////		LocalContainerEntityManagerFactoryBean entityManagerFactory = 
////				new LocalContainerEntityManagerFactoryBean();
////		
////		entityManagerFactory.setDataSource(dataSource());
////		
////		//Vendor adapter
////		HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
////		entityManagerFactory.setJpaVendorAdapter(vendorAdapter);
////		
////		//Hibernate properties
////		Properties additionalProperties = new Properties();
////		additionalProperties.put("hibernate.dialect", env.getProperty("hibernate.dialect"));
////		additionalProperties.put("hibernate.show_sql", env.getProperty("hibernate.show_sql"));
////		additionalProperties.put("hibernate.ddl-auto", env.getProperty("hibernate.ddl-auto"));
////		
////		entityManagerFactory.setJpaProperties(additionalProperties);
////		entityManagerFactory.afterPropertiesSet();
////		
////		return entityManagerFactory;
////	}
////	
//
//	
//	@Bean 
//	public PersistenceExceptionTranslationPostProcessor exceptionTranslation() {
//		return new PersistenceExceptionTranslationPostProcessor(); 
//	}
//	
//}
