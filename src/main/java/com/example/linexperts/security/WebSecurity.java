package com.example.linexperts.security;

import javax.annotation.Resource;

import com.example.linexperts.services.IUserService;

import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfigurationSource;

@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {

	private final IUserService userDetailsService;

	private final BCryptPasswordEncoder bCryptPasswordEncoder;

	@Resource(name = "corsConfigurationSource")
	CorsConfigurationSource corsConfig;

	public WebSecurity(IUserService userDetailsService, BCryptPasswordEncoder bCryptPasswordEncoder) {
		super();
		this.userDetailsService = userDetailsService;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {

		auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().configurationSource(corsConfig);
		http.csrf().disable().authorizeRequests().antMatchers(SecurityCanstants.AUTORIZED_URLS).permitAll()
				.antMatchers(SecurityCanstants.WORKFORCE_URL, SecurityCanstants.WORKFORCE_ASSIGNMENT_URL,
						SecurityCanstants.WORKFORCE_BATCH_URL)
				.hasAuthority(SecurityCanstants.WORKFORCE_MANAGER)
				.antMatchers(SecurityCanstants.CLIENTS_BATCH_URL, SecurityCanstants.CLIENTS_URL,
						SecurityCanstants.CONTRACT_EXTENSION_URL, SecurityCanstants.CONTRACT_HEADER_URL,
						SecurityCanstants.CROP_GROUP_BATCH_URL, SecurityCanstants.CROP_GROUP_URL,
						SecurityCanstants.QUALIFICATIONS_URL, SecurityCanstants.REPORTS_URL,
						SecurityCanstants.SERVICES_CONTRACT_URL, SecurityCanstants.SERVICE_URL)
				.hasAuthority(SecurityCanstants.ACCOUNTING).anyRequest().authenticated().and()
				.addFilter(getAuthenticationFilter()).addFilter(new AuthorizationFilter(authenticationManager()));

	}

	public AuthenticationFilter getAuthenticationFilter() throws Exception {

		final AuthenticationFilter authenticationFilter = new AuthenticationFilter(authenticationManager());
		authenticationFilter.setFilterProcessesUrl("/api/public/login");

		return authenticationFilter;
	}

}
