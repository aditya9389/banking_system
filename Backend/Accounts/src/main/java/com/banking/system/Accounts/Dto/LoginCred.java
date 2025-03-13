package com.banking.system.Accounts.Dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Setter
public class LoginCred {
    private String username;
    private String password;
    public LoginCred(String username,String password)
    {
        log.info("-----into loginCred dto constructor-----");
        this.username=username;
        this.password=password;
    }
}
