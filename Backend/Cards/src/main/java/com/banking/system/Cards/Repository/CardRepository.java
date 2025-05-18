package com.banking.system.Cards.Repository;

import com.banking.system.Cards.Model.Card;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CardRepository extends JpaRepository<Card, Long> {
    List<Card> findByUsername(String username);
    List<Card> findByAccountId(Long accountId);
    List<Card> findByIsActive(Boolean isActive);
}
