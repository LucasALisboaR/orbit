package br.com.orbit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Ponto de entrada da aplicação Spring Boot.
 * O @SpringBootApplication faz component-scan em br.com.orbit.**
 * e enxerga os módulos user e ping (domain/application/infrastructure/api).
 */
@SpringBootApplication
public class OrbitApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrbitApplication.class, args);
	}

}
