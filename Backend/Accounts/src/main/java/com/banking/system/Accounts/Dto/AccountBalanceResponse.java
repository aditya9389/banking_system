package com.banking.system.Accounts.Dto;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Setter
public class AccountBalanceResponse {
    Double balance;
    String username;
    String accountType;

    public AccountBalanceResponse(Double balance, String username, String accountType)
    {
        log.info("----into accountBalanceDetailsDto-----");
        this.balance=balance;
        this.username=username;
        this.accountType=accountType;
    }
}
