package com.banking.system.Accounts.Dto;

import com.banking.system.Accounts.Model.Account;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Slf4j
@Getter
@Setter
public class UserAccountsResponse {
    int totalAccounts;
    List<Account> accounts;

    public UserAccountsResponse(List<Account> accounts, int totalAccounts)
    {
        log.info("-----in UserAccountResponse dto-----");
        this.totalAccounts=totalAccounts;
        this.accounts=accounts;
    }

}
