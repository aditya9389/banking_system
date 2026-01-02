package com.banking.system.Accounts.Seeder;

import com.banking.system.Accounts.Model.Role;
import com.banking.system.Accounts.Model.User;
import com.banking.system.Accounts.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        seedAdminUser();
        seedNormalUser();
    }

    // ---------- Seed Methods ----------

    private void seedAdminUser() {
        if (userRepository.findByUsername("admin").isPresent()) {
            log.info("Admin user already exists. Skipping admin seed.");
            return;
        }

        User admin = new User();
        admin.setUsername("admin");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setRole(Role.ADMIN);
        admin.setPhoneNumber("9999999999");

        userRepository.save(admin);
        log.info("Admin user seeded.");
    }

    private void seedNormalUser() {
        if (userRepository.findByUsername("seed_user").isPresent()) {
            log.info("Seed user already exists. Skipping user seed.");
            return;
        }

        User user = new User();
        user.setUsername("seed_user");
        user.setPassword(passwordEncoder.encode("user123"));
        user.setRole(Role.USER);
        user.setPhoneNumber("8888888888");

        userRepository.save(user);
        log.info("Seed user seeded.");
    }
}
