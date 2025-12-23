package com.banking.system.Accounts;

import com.banking.system.Accounts.Dto.*;
import com.banking.system.Accounts.Model.Account;
import com.banking.system.Accounts.Model.User;
import com.banking.system.Accounts.Repository.AccountRepository;
import com.banking.system.Accounts.Repository.UserRepository;
import com.banking.system.Accounts.Security.JwtUtil;
import com.banking.system.Accounts.Services.AccountServices;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AccountServicesTest {

    @Mock
    AccountRepository accountRepository;

    @Mock
    UserRepository userRepository;

    @Mock
    JwtUtil jwtUtil;

    @InjectMocks
    AccountServices accountServices;

    /* ---------- Test Data Builders ---------- */

    private User createUser(String username) {
        User user = new User();
        user.setUsername(username);
        return user;
    }

    private Account createAccount(Long id, User user, double balance, String type) {
        Account account = new Account();
        account.setId(id);
        account.setUser(user);
        account.setBalance(balance);
        account.setAccountType(type);
        return account;
    }

    /* ---------- createAccount ---------- */

    @Test
    void shouldCreateAccount() {
        Account account = createAccount(1L, createUser("adi"), 1000, "SAVINGS");

        when(accountRepository.save(account)).thenReturn(account);

        Account saved = accountServices.createAccount(account);

        assertEquals(account, saved);
        verify(accountRepository).save(account);
    }

    /* ---------- getMyAllAccounts ---------- */

    @Test
    void shouldReturnAllAccountsForUser() {
        User user = createUser("adi");
        List<Account> accounts = List.of(
                createAccount(1L, user, 500, "SAVINGS"),
                createAccount(2L, user, 1000, "CURRENT")
        );

        when(userRepository.findByUsername("adi")).thenReturn(Optional.of(user));
        when(accountRepository.findByUser(user)).thenReturn(accounts);

        UserAccountsResponse response = accountServices.getMyAllAccounts("adi");

        assertEquals(2, response.getTotalAccounts());
        assertEquals(accounts, response.getAccounts());
    }

    @Test
    void shouldThrowWhenUserNotFound_getMyAllAccounts() {
        when(userRepository.findByUsername("adi")).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class,
                () -> accountServices.getMyAllAccounts("adi"));
    }

    /* ---------- getMyBalance ---------- */

    @Test
    void shouldReturnBalanceWhenUserOwnsAccount() {
        User user = createUser("adi");
        Account account = createAccount(1L, user, 1500, "SAVINGS");

        when(accountRepository.findById(1L)).thenReturn(Optional.of(account));

        AccountBalanceResponse response =
                accountServices.getMyBalance("adi", 1L);

        assertEquals(1500, response.getBalance());
        assertEquals("adi", response.getUsername());
        assertEquals("SAVINGS", response.getAccountType());
    }

    @Test
    void shouldThrowWhenAccountNotFound_getMyBalance() {
        when(accountRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class,
                () -> accountServices.getMyBalance("adi", 1L));
    }

    @Test
    void shouldThrowWhenUserDoesNotOwnAccount() {
        User owner = createUser("realOwner");
        Account account = createAccount(1L, owner, 500, "SAVINGS");

        when(accountRepository.findById(1L)).thenReturn(Optional.of(account));

        assertThrows(AccessDeniedException.class,
                () -> accountServices.getMyBalance("adi", 1L));
    }

    /* ---------- getUserAccountBalance ---------- */

    @Test
    void shouldReturnBalanceByAccountId() {
        User user = createUser("adi");
        Account account = createAccount(1L, user, 700, "CURRENT");

        when(accountRepository.findById(1L)).thenReturn(Optional.of(account));

        AccountBalanceResponse response =
                accountServices.getUserAccountBalance(1L);

        assertEquals(700, response.getBalance());
        assertEquals("adi", response.getUsername());
    }

    /* ---------- transferFunds ---------- */

    @Test
    void shouldFailWhenAccountsInvalid() {
        TransferReq req = new TransferReq(1L, 2L, 100.0);

        when(accountRepository.findById(1L)).thenReturn(Optional.empty());

        TransferResponse response =
                accountServices.transferFunds(req, "adi");

        assertTrue(response.getStatus().contains("Failed"));
        verify(accountRepository, never()).save(any());
    }

    @Test
    void shouldFailWhenInsufficientBalance() {
        User user = createUser("adi");
        Account from = createAccount(1L, user, 50, "SAVINGS");
        Account to = createAccount(2L, user, 100, "SAVINGS");

        TransferReq req = new TransferReq(1L, 2L, 100.0);

        when(accountRepository.findById(1L)).thenReturn(Optional.of(from));
        when(accountRepository.findById(2L)).thenReturn(Optional.of(to));

        TransferResponse response =
                accountServices.transferFunds(req, "adi");

        assertTrue(response.getStatus().contains("less amount"));
        verify(accountRepository, never()).save(any());
    }

    @Test
    void shouldFailWhenUnauthorizedSender() {
        User owner = createUser("owner");
        Account from = createAccount(1L, owner, 500, "SAVINGS");
        Account to = createAccount(2L, owner, 200, "SAVINGS");

        TransferReq req = new TransferReq(1L, 2L, 100.0);

        when(accountRepository.findById(1L)).thenReturn(Optional.of(from));
        when(accountRepository.findById(2L)).thenReturn(Optional.of(to));

        TransferResponse response =
                accountServices.transferFunds(req, "adi");

        assertTrue(response.getStatus().contains("unauthorized"));
    }

    @Test
    void shouldTransferFundsSuccessfully() {
        User user = createUser("adi");
        Account from = createAccount(1L, user, 1000, "SAVINGS");
        Account to = createAccount(2L, user, 500, "SAVINGS");

        TransferReq req = new TransferReq(1L, 2L, 200.0);

        when(accountRepository.findById(1L)).thenReturn(Optional.of(from));
        when(accountRepository.findById(2L)).thenReturn(Optional.of(to));

        TransferResponse response =
                accountServices.transferFunds(req, "adi");

        assertEquals("Success", response.getStatus());
        assertEquals(800, from.getBalance());
        assertEquals(700, to.getBalance());

        verify(accountRepository).save(from);
        verify(accountRepository).save(to);
    }
}
