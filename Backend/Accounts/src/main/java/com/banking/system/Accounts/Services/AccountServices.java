package com.banking.system.Accounts.Services;

import com.banking.system.Accounts.Dto.*;
import com.banking.system.Accounts.Model.Account;
import com.banking.system.Accounts.Model.User;
import com.banking.system.Accounts.Repository.AccountRepository;
import com.banking.system.Accounts.Repository.UserRepository;
import com.banking.system.Accounts.Security.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

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

    public UserAccountsResponse getMyAllAccounts(String name) {
        log.info("-----[getAllAccounts] Fetching all accounts for name: {}-----", name);

        User user = userRepository.findByUsername(name)
                .orElseThrow(() -> {
                    log.error("-----[getAllAccounts] User not found with name{}-----", name);
                    return new UsernameNotFoundException("User not found with name: " + name);
                });

        log.info("-----[getAllAccounts] User found: {} -----", user.getUsername());

        List<Account> accounts = accountRepository.findByUser(user);
        log.info("-----[getAllAccounts] Total accounts found: {} for name : {}-----", accounts.size(), name);

        return new UserAccountsResponse(accounts, accounts.size());
    }

    public AccountBalanceResponse getMyBalance(String username, Long id) {
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


        return new AccountBalanceResponse(account.getBalance(),accountUser,account.getAccountType());
    }

    public AccountBalanceResponse getUserAccountBalance(Long id)
    {
        Account account= accountRepository.findById(id)
                .orElseThrow(()->new UsernameNotFoundException("no account found with this id"));
        return new AccountBalanceResponse(account.getBalance(),account.getUser().getUsername(), account.getAccountType());
    }
    public TransferResponse transferFunds(TransferReq transferReq,String sender)
    {
        log.info("---- Starting fund transfer ----");

        Long fromAccountId = transferReq.getFromAccountId();
        Long toAccountId = transferReq.getToAccountId();
        Double amount = transferReq.getAmount();

        log.info("Transfer request: From Account ID = {}, To Account ID = {}, Amount = {}, Initiated by = {}", fromAccountId, toAccountId, amount, sender);

        TransferResponse transferResponse = new TransferResponse();
        transferResponse.setAmount(amount);
        transferResponse.setToAccountId(toAccountId);
        transferResponse.setFromAccountId(fromAccountId);
        transferResponse.setSenderUsername(sender);
        transferResponse.setTimestamp();
        transferResponse.setStatus("processing");

        Account fromAccount = accountRepository.findById(fromAccountId).orElse(null);
        Account toAccount = accountRepository.findById(toAccountId).orElse(null);

        if (fromAccount == null || toAccount == null) {
            log.warn("Transfer failed: Invalid account(s). FromAccount = {}, ToAccount = {}", fromAccount, toAccount);
            transferResponse.setStatus("Failed due to incorrect accounts");
            return transferResponse;
        }

        if (fromAccount.getBalance() < amount) {
            log.warn("Transfer failed: Insufficient balance in account ID {}", fromAccountId);
            transferResponse.setStatus("Failed due to less amount");
            return transferResponse;
        }

        if (!Objects.equals(fromAccount.getUser().getUsername(), sender)) {
            log.warn("Transfer failed: Unauthorized attempt by {}", sender);
            transferResponse.setStatus("Failed due to unauthorized sender");
            return transferResponse;
        }

        fromAccount.setBalance(fromAccount.getBalance() - amount);
        toAccount.setBalance(toAccount.getBalance() + amount);

        accountRepository.save(fromAccount);
        accountRepository.save(toAccount);

        log.info("Transfer success: {} transferred from Account ID {} to Account ID {}", amount, fromAccountId, toAccountId);
        transferResponse.setStatus("Success");
        return transferResponse;
    }


}
