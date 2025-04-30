package com.banking.system.Accounts.Controller;


import com.banking.system.Accounts.Dto.AccountBalanceResponse;
import com.banking.system.Accounts.Dto.TransferReq;
import com.banking.system.Accounts.Dto.TransferResponse;
import com.banking.system.Accounts.Dto.UserAccountsResponse;
import com.banking.system.Accounts.Model.Account;
import com.banking.system.Accounts.Repository.AccountRepository;
import com.banking.system.Accounts.Services.AccountServices;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/Account")
@AllArgsConstructor
public class AccountController {

    @Autowired
    private AccountRepository accountRepository;

    private AccountServices accountServices;

    @PostMapping("/createAccount")
    public ResponseEntity<Account> createAcccount(@RequestBody Account account)
    {
        log.info("-----into create Account mapping in Account controller-----");
        return ResponseEntity.ok(accountServices.createAccount(account));
    }

    @GetMapping("/getMyAccounts")
    public ResponseEntity<UserAccountsResponse> getMyAccounts(Authentication authentication)
    {
        String name=authentication.getName();
        log.info("----in getting account mapping-----");
        return ResponseEntity.ok(accountServices.getMyAllAccounts(name));
    }

    @GetMapping("/getUserAccounts/{username}")
    public ResponseEntity<UserAccountsResponse> getUserAccounts(@PathVariable String username)
    {
        log.info("----into user accounts details mapping----");
        return ResponseEntity.ok(accountServices.getMyAllAccounts(username));
    }

    @GetMapping("/getMyAccountBalance/{id}")
    public ResponseEntity<AccountBalanceResponse> getMyAccountBalance(@PathVariable Long id,Authentication authentication)
    {
        String username= authentication.getName();
        log.info("-----into getMyAccountBalance api------ ");
        return ResponseEntity.ok(accountServices.getMyBalance(username,id));
    }

    @GetMapping("/getUserAccountBalance/{id}")
    public ResponseEntity<AccountBalanceResponse> getUserAccountBalance(@PathVariable Long id)
    {
        log.info("----into getUserAccountBalance api mapping----");
        return ResponseEntity.ok(accountServices.getUserAccountBalance(id));
    }

    @DeleteMapping("/deleteAccount/{accountId}")
    public ResponseEntity<String> deleteAccount(@PathVariable Long accountId) {
        log.info("Attempting to delete account with ID: {}", accountId);
        if (!accountRepository.existsById(accountId)) {
            log.warn("Account with ID {} not found", accountId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found");
        }
        accountRepository.deleteById(accountId);
        log.info("Deleted account with ID: {}", accountId);
        return ResponseEntity.ok("Account deleted successfully");
    }

    @PostMapping("/transferFunds")
    public ResponseEntity<TransferResponse> transferFunds(@RequestBody TransferReq transferRequest, Authentication authentication) {
        log.info("----into transferFunds mapping----");
        String name= authentication.getName();
        return ResponseEntity.ok(accountServices.transferFunds(transferRequest,name));
    }
}
