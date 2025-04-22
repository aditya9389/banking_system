package com.banking.system.Accounts.Controller;


import com.banking.system.Accounts.Model.Account;
import com.banking.system.Accounts.Services.AccountServices;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/Account")
@AllArgsConstructor
public class AccountController {

    private AccountServices accountServices;

    @PostMapping("/createAccount")
    public ResponseEntity<Account> createAcccount(@RequestBody Account account)
    {
        log.info("-----into create Account mapping in Account controller-----");
        return ResponseEntity.ok(accountServices.createAccount(account));
    }
    @PostMapping("/getAccounts")
    public ResponseEntity<List<Account>> getAccounts(Authentication authentication)
    {
        String name=authentication.getName();
        log.info("----in getting account mapping-----");
        return ResponseEntity.ok(accountServices.getAllAccounts(name));
    }


}
