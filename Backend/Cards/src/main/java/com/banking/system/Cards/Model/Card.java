package com.banking.system.Cards.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;
import java.util.Random;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "cards")
@Slf4j
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String cardNumber;

    @Column(nullable = false)
    private String cardType; // e.g., Credit or Debit

    @Column(nullable = false)
    private Double limitOrBalance;

    @Column(nullable = false)
    private String cvv;

    @Column(nullable = false)
    private LocalDate expiryDate;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private Long accountId;

    @Column(nullable = false)
    private Boolean isActive;

    public Card(String cardType, Double limitOrBalance, String username, Long accountId) {
        log.info("----[Card Entity] Creating new Card for user: {} and account ID: {}----", username, accountId);
        this.cardNumber = generateCardNumber();
        this.cvv = generateCVV();
        this.expiryDate = LocalDate.now().plusYears(5); // Expiry after 5 years
        this.cardType = cardType;
        this.limitOrBalance = limitOrBalance;
        this.username = username;
        this.accountId = accountId;
        this.isActive = true;
        log.info("----[Card Entity] Card created with Number: {} | CVV: {} | Expiry Date: {}----", cardNumber, cvv, expiryDate);
    }

    private String generateCardNumber() {
        log.info("----[Card Entity] Generating 12-digit Card Number----");
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 12; i++) {
            sb.append(random.nextInt(10));
        }
        String generatedNumber = sb.toString();
        log.info("----[Card Entity] Generated Card Number: {}----", generatedNumber);
        return generatedNumber;
    }

    private String generateCVV() {
        log.info("----[Card Entity] Generating 3-digit CVV----");
        Random random = new Random();
        int cvv = 100 + random.nextInt(900);
        log.info("----[Card Entity] Generated CVV: {}----", cvv);
        return String.valueOf(cvv);
    }
}
