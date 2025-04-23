package com.banking.system.Accounts.Dto;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Setter
public class AccountBalanceResponse {
    Double amount;
    String username;
    String accountType;

    public AccountBalanceResponse(Double amount, String username, String accountType)
    {
        log.info("----into accountBalanceDetailsDto-----");
        this.amount=amount;
        this.username=username;
        this.accountType=accountType;
    }
}
