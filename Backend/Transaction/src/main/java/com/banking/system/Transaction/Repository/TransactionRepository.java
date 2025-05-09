package com.banking.system.Transaction.Repository;

import com.banking.system.Transaction.Model.Tra_Entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Tra_Entity, Long> {

    List<Tra_Entity> findByFromAccountId(Long fromAccountId);

    List<Tra_Entity> findByToAccountId(Long toAccountId);

    List<Tra_Entity> findByFromAccountIdOrToAccountId(Long fromAccountId, Long toAccountId);
}
