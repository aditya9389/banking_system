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
public class AccountServices {

    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public  Account createAccount(Account account)
    {
        return accountRepository.save(account);
    }

    public List<Account> getAllAccounts(String name) {
        log.info("-----[getAllAccounts] Fetching all accounts for name: {}-----", name);

        User user = userRepository.findByUsername(name)
                .orElseThrow(() -> {
                    log.error("-----[getAllAccounts] User not found with name{}-----", name);
                    return new UsernameNotFoundException("User not found with name: " + name);
                });

        log.info("-----[getAllAccounts] User found: {} -----", user.getUsername());

        List<Account> accounts = accountRepository.findByUser(user);
        log.info("-----[getAllAccounts] Total accounts found: {} for name : {}-----", accounts.size(), name);
        return accounts;
    }

}
