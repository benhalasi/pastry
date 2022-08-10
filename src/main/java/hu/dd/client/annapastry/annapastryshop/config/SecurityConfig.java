package hu.dd.client.annapastry.annapastryshop.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  // @Bean
	// public UserDetailsService userDetailsService() {
	// 	InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
	// 	manager.createUser(User.withDefaultPasswordEncoder().username("user").password("password").roles("USER").build());
	// 	return manager;
	// }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .authorizeRequests(authorize -> authorize
        .anyRequest().permitAll()
      );
    return http.build();
  }

}
