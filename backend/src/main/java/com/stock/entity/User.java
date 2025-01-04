package com.stock.entity;
import java.util.Collection;
import java.util.List;
import com.google.cloud.firestore.annotation.PropertyName;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class User implements UserDetails {

	@PropertyName("userId")
	private String userId;

	@PropertyName("name")
	private String name;

	@PropertyName("email")
	private String email;

	@PropertyName("password")
	private String password;

	// Additional fields for UserDetails interface
	@PropertyName("authorities")
	private List<GrantedAuthority> authorities;

	@PropertyName("enabled")
	private boolean enabled;

	@PropertyName("accountNonExpired")
	private boolean accountNonExpired;

	@PropertyName("accountNonLocked")
	private boolean accountNonLocked;

	@PropertyName("credentialsNonExpired")
	private boolean credentialsNonExpired;

	// Getters and Setters for the new fields

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	public void setAuthorities(List<GrantedAuthority> authorities) {
		this.authorities = authorities;
	}

	@Override
	public String getPassword() {
		return this.password;
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return accountNonExpired;
	}

	public void setAccountNonExpired(boolean accountNonExpired) {
		this.accountNonExpired = accountNonExpired;
	}

	@Override
	public boolean isAccountNonLocked() {
		return accountNonLocked;
	}

	public void setAccountNonLocked(boolean accountNonLocked) {
		this.accountNonLocked = accountNonLocked;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return credentialsNonExpired;
	}

	public void setCredentialsNonExpired(boolean credentialsNonExpired) {
		this.credentialsNonExpired = credentialsNonExpired;
	}

	@Override
	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}
}
