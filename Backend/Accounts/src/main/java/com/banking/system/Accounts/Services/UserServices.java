package com.banking.system.Accounts.Services;

import com.banking.system.Accounts.Dto.AuthResponse;
import com.banking.system.Accounts.Model.Account;
import com.banking.system.Accounts.Model.User;
import com.banking.system.Accounts.Repository.AccountRepository;
import com.banking.system.Accounts.Repository.UserRepository;
import com.banking.system.Accounts.Security.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.banking.system.Accounts.Dto.LoginCred;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServices {

    @Autowired
    private UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
    private final JwtUtil jwtUtil;

    public User createUser(User user)
    {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public AuthResponse userLogin(LoginCred loginCred)
    {
        log.info("-----into userLogin service with loginCred----->{}", loginCred.toString());
        log.info("-----checking userCred with spring security-----");
        User user = userRepository.findByUsername(loginCred.getUsername())
                .orElseThrow(()->new RuntimeException("no user with this username...contact admins"));

        log.info("-----checking if password matches with database-----");
        if(passwordEncoder.matches(loginCred.getPassword(), user.getPassword())) //encoded pass should be second
        {
            log.info("-----password matches-----");
            String token= jwtUtil.generateToken(loginCred.getUsername(),user.getRole().name());
            return new AuthResponse(token,user.getRole().name());
        }
        throw new RuntimeException("cred didn't matched");
    }

    public List<User> getUsers() {
        log.info("-----Fetching all users from the database-----");

        List<User> users = userRepository.findAll();
        if (users.isEmpty()) {
            log.warn("-----No users found in the database-----");
        } else {
            log.info("-----Total users fetched: {}", users.size());
        }
        return users;
    }

    public User getUser(Long id)
    {
        log.info("-----getting specified user by id-----");
        return userRepository.findById(id)
                .orElseThrow(()->new UsernameNotFoundException("user not found"));
    }
    public User getUser(String username)
    {
        return userRepository.findByUsername(username)
                .orElseThrow(()->new UsernameNotFoundException("user not found"));
    }

}
