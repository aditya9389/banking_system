package com.banking.system.Accounts.Controller;

import com.banking.system.Accounts.Model.Role;
import com.banking.system.Accounts.Model.User;
import com.banking.system.Accounts.Repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class randomadmin{

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder=new BCryptPasswordEncoder();

    @PostConstruct
    public void initAdmin() {
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.ADMIN);
            admin.setPhoneNumber("9999999999");
            userRepository.save(admin);
            System.out.println("✅ Default admin created.");
        } else {
            System.out.println("ℹ️ Admin already exists.");
        }
    }
}
