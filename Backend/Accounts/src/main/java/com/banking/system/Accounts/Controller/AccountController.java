package com.banking.system.Accounts.Controller;

import com.banking.system.Accounts.Model.Account;
import com.banking.system.Accounts.Model.User;
import com.banking.system.Accounts.Services.AccountServices;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping(value = "/createUser",consumes = "application/json;character=UTF-8")
    public ResponseEntity<User> createAccount(@RequestBody User user)
    {
        log.info("--------entered into create user mapping-------");
        return ResponseEntity.ok(accountServices.createUser(user));
    }

}
