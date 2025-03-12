package com.banking.system.Accounts.Repository;

import com.banking.system.Accounts.Model.Account;
import com.banking.system.Accounts.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByUser(User user);
}
