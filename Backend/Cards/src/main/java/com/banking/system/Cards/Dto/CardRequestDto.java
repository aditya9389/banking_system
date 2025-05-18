package com.banking.system.Cards.Dto;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Setter
public class CardRequestDto {
    private String cardType; // Credit or Debit
    private Double limitOrBalance;
    private String username;
    private Long accountId;

    public CardRequestDto() {
        log.info("----[CardRequestDTO] Card request DTO initialized----");
    }
}
