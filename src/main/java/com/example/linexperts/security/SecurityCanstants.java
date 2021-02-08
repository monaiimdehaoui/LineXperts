package com.example.linexperts.security;

import com.example.linexperts.SpringApplicationContext;

public class SecurityCanstants {

	public static final long EXPIRATION_TIME = 864000000;
	public static final String TOKEN_PREFIX = "bearer ";
	public static final String HEADER_STRING = "Authorization";
	public static final String AUTORIZED_URLS = "/api/public/**";

	// privileges canstants
	public static final String WORKFORCE_MANAGER = "WORKFORCE_MANAGMENT";
	public static final String ACCOUNTING = "ACCOUNTING";

	// WORKFORCE managment
	public static final String WORKFORCE_URL = "/api/v1/workforce/**";
	public static final String WORKFORCE_BATCH_URL = "/api/v1/batch/workforce/**";
	public static final String WORKFORCE_ASSIGNMENT_URL = "/api/v1/workforceAssigned/**";

	// Clients managment
	public static final String CLIENTS_URL = "/api/v1/clients/**";
	public static final String CLIENTS_BATCH_URL = "/api/v1/batch/clients/**";

	// Contract Extension
	public static final String CONTRACT_EXTENSION_URL = "/api/v1/ContractExtension/**";

	// Contract header
	public static final String CONTRACT_HEADER_URL = "/api/v1/ContractHeader/**";

	// croporate group
	public static final String CROP_GROUP_URL = "/api/v1/corp_group/**";
	public static final String CROP_GROUP_BATCH_URL = "/api/v1/batch/corp_group/**";

	// qualifications
	public static final String QUALIFICATIONS_URL = "/api/v1/qualifications/**";

	// Reports
	public static final String REPORTS_URL = "/api/v1/reports/**";

	// Service by Contract
	public static final String SERVICES_CONTRACT_URL = "/api/v1/ServiceOnContract/**";

	// services
	public static final String SERVICE_URL = "/api/v1/service/**";

	public static String getSecretToken() {

		AppProperties appPropreties = (AppProperties) SpringApplicationContext.getBean("AppProperties");
		return appPropreties.getSecretToken();
	}
}
