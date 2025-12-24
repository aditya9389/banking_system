package com.banking.system.Accounts;

import com.banking.system.Accounts.Dto.AuthResponse;
import com.banking.system.Accounts.Dto.LoginCred;
import com.banking.system.Accounts.Model.User;
import com.banking.system.Accounts.Model.Role;
import com.banking.system.Accounts.Repository.UserRepository;
import com.banking.system.Accounts.Security.JwtUtil;
import com.banking.system.Accounts.Services.UserServices;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServicesTest {

    @Mock
    UserRepository userRepository;

    @Mock
    JwtUtil jwtUtil;

    @InjectMocks
    UserServices userServices;

    /* ---------- Test Data Builders ---------- */

    private User createUser(String username, String password, String role) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setRole(Enum.valueOf(Role.class,role));
        return user;
    }

    /* ---------- createUser ---------- */

    @Test
    void shouldCreateUserWithEncodedPassword() {
        User user = createUser("adi", "plainPass", "USER");

        when(userRepository.save(any(User.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        User saved = userServices.createUser(user);

        assertNotEquals("plainPass", saved.getPassword());
        assertTrue(new BCryptPasswordEncoder().matches("plainPass", saved.getPassword()));
        verify(userRepository).save(user);
    }

    /* ---------- userLogin ---------- */

    @Test
    void shouldLoginSuccessfullyAndReturnToken() {
        User user = createUser("adi",
                new BCryptPasswordEncoder().encode("pass123"),
                "USER");

        LoginCred cred = new LoginCred("adi", "pass123");

        when(userRepository.findByUsername("adi")).thenReturn(Optional.of(user));
        when(jwtUtil.generateToken("adi", "USER")).thenReturn("jwt-token");

        AuthResponse response = userServices.userLogin(cred);

        assertEquals("jwt-token", response.getToken());
        assertEquals("USER", response.getRole());
    }

    @Test
    void shouldThrowWhenUserNotFound_userLogin() {
        LoginCred cred = new LoginCred("adi", "pass");

        when(userRepository.findByUsername("adi")).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class,
                () -> userServices.userLogin(cred));
    }

    @Test
    void shouldThrowWhenPasswordDoesNotMatch() {
        User user = createUser("adi",
                new BCryptPasswordEncoder().encode("correctPass"),
                "USER");

        LoginCred cred = new LoginCred("adi", "wrongPass");

        when(userRepository.findByUsername("adi")).thenReturn(Optional.of(user));

        assertThrows(RuntimeException.class,
                () -> userServices.userLogin(cred));
    }

    /* ---------- getUsers ---------- */

    @Test
    void shouldReturnAllUsers() {
        List<User> users = List.of(
                createUser("u1", "p1", "USER"),
                createUser("u2", "p2", "ADMIN")
        );

        when(userRepository.findAll()).thenReturn(users);

        List<User> result = userServices.getUsers();

        assertEquals(2, result.size());
        verify(userRepository).findAll();
    }

    @Test
    void shouldReturnEmptyListWhenNoUsers() {
        when(userRepository.findAll()).thenReturn(List.of());

        List<User> result = userServices.getUsers();

        assertTrue(result.isEmpty());
    }

    /* ---------- getUser by id ---------- */

    @Test
    void shouldReturnUserById() {
        User user = createUser("adi", "pass", "USER");

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        User result = userServices.getUser(1L);

        assertEquals("adi", result.getUsername());
    }

    @Test
    void shouldThrowWhenUserNotFoundById() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class,
                () -> userServices.getUser(1L));
    }

    /* ---------- getUser by username ---------- */

    @Test
    void shouldReturnUserByUsername() {
        User user = createUser("adi", "pass", "USER");

        when(userRepository.findByUsername("adi")).thenReturn(Optional.of(user));

        User result = userServices.getUser("adi");

        assertEquals("adi", result.getUsername());
    }

    @Test
    void shouldThrowWhenUserNotFoundByUsername() {
        when(userRepository.findByUsername("adi")).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class,
                () -> userServices.getUser("adi"));
    }
}
