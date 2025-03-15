package com.banking.system.Accounts.Dto;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Setter
public class AuthResponse {
    private String token;
    private String role;
    public AuthResponse(String token,String role)
    {
        log.info("-----into AuthResponse class to create token response dto-----");
        this.token=token;
        this.role=role;
    }
}
