package com.banking.system.Accounts.Dto;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Setter
public class AuthResponse {
    private String token;
    public AuthResponse(String token)
    {
        log.info("-----into AuthResponse class to create token response dto-----");
        this.token=token;
    }
}
