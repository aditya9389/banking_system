package com.banking.system.Accounts.Seeder;

import com.banking.system.Accounts.Model.Role;
import com.banking.system.Accounts.Model.User;
import com.banking.system.Accounts.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        if (usersAlreadyExist()) {
            logSkip();
            return;
        }

        User admin = createAdminUser();
        User user = createNormalUser();

        userRepository.saveAll(List.of(admin, user));

        log.info("Default users seeded successfully.");
    }

    // ---------- Helper Methods ----------

    private boolean usersAlreadyExist() {
        return userRepository.count() > 0;
    }

    private User createAdminUser() {
        User admin = new User();
        admin.setUsername("admin");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setRole(Role.ADMIN);
        admin.setPhoneNumber("9999999999");
        return admin;
    }

    private User createNormalUser() {
        User user = new User();
        user.setUsername("aditya");
        user.setPassword(passwordEncoder.encode("123456"));
        user.setRole(Role.USER);
        user.setPhoneNumber("8888888888");
        return user;
    }

    private void logSkip() {
        log.warn("Users already exist. Seeding skipped.");
    }
}
