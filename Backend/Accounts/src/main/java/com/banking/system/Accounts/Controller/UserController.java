package com.banking.system.Accounts.Controller;

import com.banking.system.Accounts.Dto.AuthResponse;
import com.banking.system.Accounts.Dto.LoginCred;
import com.banking.system.Accounts.Model.User;
import com.banking.system.Accounts.Services.UserServices;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/User")
@AllArgsConstructor
public class UserController {

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

    @PostMapping("/getUsers")
    public ResponseEntity<List<User>> getUsers()
    {
        log.info("-----into get users mapping-----");
        return ResponseEntity.ok(userServices.getUsers());
    }

    @PostMapping("/getUser")
    public ResponseEntity<User> getSingleUser(@RequestBody Long id)
    {
        log.info("-----into get single user mapping-----");
        return ResponseEntity.ok(userServices.getUser(id));
    }

}
