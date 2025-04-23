package com.banking.system.Accounts.Controller;


import com.banking.system.Accounts.Model.Account;
import com.banking.system.Accounts.Services.AccountServices;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/getMyAccounts")
    public ResponseEntity<List<Account>> getMyAccounts(Authentication authentication)
    {
        String name=authentication.getName();
        log.info("----in getting account mapping-----");
        return ResponseEntity.ok(accountServices.getMyAllAccounts(name));
    }

    @GetMapping("/getUserAccounts/{username}")
    public ResponseEntity<List<Account>> getUserAccounts(@PathVariable String username)
    {
        log.info("----into user accounts details mapping----");
        return ResponseEntity.ok(accountServices.getMyAllAccounts(username));
    }

    @GetMapping("/getMyAccountBalance/{id}")
    public ResponseEntity<Double> getMyAccountBalance(@PathVariable Long id,Authentication authentication)
    {
        String username= authentication.getName();
        log.info("-----into getMyAccountBalance api------ ");
        return ResponseEntity.ok(accountServices.getMyBalance(username,id));
    }

    @GetMapping("/getUserAccountBalance/{id}")
    public ResponseEntity<Double> getUserAccountBalance(@PathVariable Long id)
    {
        log.info("----into getUserAccountBalance api mapping----");
        return ResponseEntity.ok(accountServices.getUserAccountBalance(id));
    }

}
