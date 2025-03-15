package com.banking.system.Accounts.Controller;

import com.banking.system.Accounts.Dto.AuthResponse;
import com.banking.system.Accounts.Dto.LoginCred;
import com.banking.system.Accounts.Model.Account;
import com.banking.system.Accounts.Model.User;
import com.banking.system.Accounts.Services.AccountServices;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/Account")
@AllArgsConstructor
public class AccountController {

    private AccountServices accountServices;

    @PostMapping("/createUser")
    public ResponseEntity<User> createAccount(@RequestBody User user)
    {
        log.info("--------entered into create user mapping in Account controller-------");
        return ResponseEntity.ok(accountServices.createUser(user));
    }

    @PostMapping("/userLogin")
    public ResponseEntity<AuthResponse> userLogin(@RequestBody LoginCred loginCred)
    {
        log.info("-----into user login mapping in Account controller-----");
        return ResponseEntity.ok(accountServices.userLogin(loginCred));
    }


    @PostMapping("/createAccount")
    public ResponseEntity<Account> createAcccount(@RequestBody Account account)
    {
        log.info("-----into create Account mapping in Account controller-----");
        return ResponseEntity.ok(accountServices.createAccount(account));
    }

}
