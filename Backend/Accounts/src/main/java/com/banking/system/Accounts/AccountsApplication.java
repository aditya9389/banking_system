package com.banking.system.Accounts;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@Slf4j
@SpringBootApplication
public class AccountsApplication {
	public static void main(String[] args) {
		log.info("-----starting Account MircoService-----");
		SpringApplication.run(AccountsApplication.class, args);
	}

}
