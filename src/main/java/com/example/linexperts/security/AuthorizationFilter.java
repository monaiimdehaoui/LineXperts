package com.example.linexperts.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.example.linexperts.SpringApplicationContext;
import com.example.linexperts.Models.Privileges;
import com.example.linexperts.Models.Role;
import com.example.linexperts.services.IUserService;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import io.jsonwebtoken.Jwts;

public class AuthorizationFilter extends BasicAuthenticationFilter {

	public AuthorizationFilter(AuthenticationManager authManager) {
		super(authManager);
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		String header = request.getHeader(SecurityCanstants.HEADER_STRING);

		if (header == null || !header.startsWith(SecurityCanstants.TOKEN_PREFIX)) {

			chain.doFilter(request, response);
			return;
		}

		UsernamePasswordAuthenticationToken authentication = getAuthetication(request);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		chain.doFilter(request, response);
	}

	private UsernamePasswordAuthenticationToken getAuthetication(HttpServletRequest request) {

		String token = request.getHeader(SecurityCanstants.HEADER_STRING);
		if (token != null) {

			token = token.replace(SecurityCanstants.TOKEN_PREFIX, "");

			String user = Jwts.parser().setSigningKey(SecurityCanstants.getSecretToken()).parseClaimsJws(token)
					.getBody().getSubject();
			if (user != null) {

				IUserService userService = (IUserService) SpringApplicationContext.getBean("userServiceImpl");
				com.example.linexperts.Models.LinexpertsUser tuser = userService.getUser(user);

				List<? extends GrantedAuthority> getAuthoriti = getAuthorities(tuser.getRole());
				return new UsernamePasswordAuthenticationToken(user, null, getAuthoriti);
			}

		}
		return null;
	}

	private List<String> getPrivileges(Role role) {

		List<String> privileges = new ArrayList<>();

		for (Privileges item : role.getPrivileges()) {
			privileges.add(item.getName());
		}
		return privileges;
	}

	private List<GrantedAuthority> getGrantedAuthorities(List<String> privileges) {
		List<GrantedAuthority> authorities = new ArrayList<>();
		for (String privilege : privileges) {
			authorities.add(new SimpleGrantedAuthority(privilege));
		}
		return authorities;
	}

	private List<? extends GrantedAuthority> getAuthorities(Role role) {

		return getGrantedAuthorities(getPrivileges(role));
	}
}
