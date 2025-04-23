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
import org.springframework.security.access.AccessDeniedException;
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

    public List<Account> getMyAllAccounts(String name) {
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

    public Double getMyBalance(String username, Long id) {
        log.info("----- Entered getMyBalance method for username: {} and account ID: {} -----", username, id);

        Account account = accountRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("-----No account found with ID: {}", id);
                    return new UsernameNotFoundException("No account with this ID");
                });

        log.info("-----Account found with ID: {}. Account belongs to user: {}", id, account.getUser().getUsername());

        String accountUser = account.getUser().getUsername();

        if (!accountUser.equals(username)) {
            log.warn("-----User {} does not match account owner {} for account ID: {}", username, accountUser, id);

            throw new AccessDeniedException("-----User does not have access to this account");
        }

        log.info("-----Balance for account ID: {} is {}", id, account.getBalance());
        return account.getBalance();
    }

    public Double getUserAccountBalance(Long id)
    {
        Account account= accountRepository.findById(id)
                .orElseThrow(()->new UsernameNotFoundException("no account found with this id"));
        return account.getBalance();
    }


}
