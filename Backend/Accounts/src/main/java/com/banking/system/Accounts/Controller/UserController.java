package com.banking.system.Accounts.Controller;

import com.banking.system.Accounts.Dto.AuthResponse;
import com.banking.system.Accounts.Dto.LoginCred;
import com.banking.system.Accounts.Model.Account;
import com.banking.system.Accounts.Model.User;
import com.banking.system.Accounts.Repository.AccountRepository;
import com.banking.system.Accounts.Repository.UserRepository;
import com.banking.system.Accounts.Services.UserServices;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/User")
@AllArgsConstructor
public class UserController {

    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private UserRepository userRepository;
    private UserServices userServices;

    @PostMapping("/createUser")
    public ResponseEntity<User> createAccount(@RequestBody User user)
    {
        log.info("--------entered into create user mapping in Account controller-------");
        return ResponseEntity.ok(userServices.createUser(user));
    }

    @PostMapping("/userLogin")
    public ResponseEntity<AuthResponse> userLogin(@RequestBody LoginCred loginCred)
    {
        log.info("-----into user login mapping in Account controller-----");
        return ResponseEntity.ok(userServices.userLogin(loginCred));
    }

    @GetMapping("/getUsers")
    public ResponseEntity<List<User>> getUsers()
    {
        log.info("-----into get users mapping-----");
        return ResponseEntity.ok(userServices.getUsers());
    }

    @GetMapping("/getUser/{username}")
    public ResponseEntity<User> getSingleUser(@PathVariable String username)
    {
        log.info("-----into get single user mapping-----");
        return ResponseEntity.ok(userServices.getUser(username));
    }

    @DeleteMapping("/deleteUser/{username}")
    public ResponseEntity<String> deleteUser(@PathVariable String username) {
        log.info("Initiating delete for user: {}", username);

        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) {
            log.warn("User not found: {}", username);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        User user=userRepository.findByUsername(username)
                .orElseThrow(()->new UsernameNotFoundException("User not found"));

        List<Account> userAccounts = accountRepository.findByUser(user);
        accountRepository.deleteAll(userAccounts);
        log.info("Deleted {} accounts for user {}", userAccounts.size(), username);


        userRepository.delete(user);
        log.info("User {} deleted successfully", username);

        return ResponseEntity.ok("User and associated accounts deleted");
    }


}
