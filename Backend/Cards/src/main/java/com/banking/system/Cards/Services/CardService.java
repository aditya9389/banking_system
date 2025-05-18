package com.banking.system.Cards.Services;

import com.banking.system.Cards.Dto.CardRequestDto;
import com.banking.system.Cards.Model.Card;
import com.banking.system.Cards.Repository.CardRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class CardService {

    private final CardRepository cardRepository;

    public Card createCard(CardRequestDto cardRequestDto) {
        log.info("----[CardService] Creating new card for User: {} with Account ID: {}----"
                , cardRequestDto.getUsername(), cardRequestDto.getAccountId());
        Card newCard = new Card(cardRequestDto.getCardType(), cardRequestDto.getLimitOrBalance()
                , cardRequestDto.getUsername(), cardRequestDto.getAccountId());
        cardRepository.save(newCard);
        log.info("----[CardService] Card saved successfully with Card Number: {}----", newCard.getCardNumber());
        return newCard;
    }

    public List<Card> getCardsByUsername(String username) {
        log.info("----[CardService] Fetching cards for Username: {}----", username);
        List<Card> cards = cardRepository.findByUsername(username);
        if (cards.isEmpty()) {
            log.warn("----[CardService] No cards found for Username: {}----", username);
        } else {
            log.info("----[CardService] Found {} cards for Username: {}----", cards.size(), username);
        }
        return cards;
    }

    public List<Card> getCardsByAccountId(Long accountId) {
        log.info("----[CardService] Fetching cards for Account ID: {}----", accountId);
        List<Card> cards = cardRepository.findByAccountId(accountId);
        if (cards.isEmpty()) {
            log.warn("----[CardService] No cards found for Account ID: {}----", accountId);
        } else {
            log.info("----[CardService] Found {} cards for Account ID: {}----", cards.size(), accountId);
        }
        return cards;
    }

    public List<Card> getActiveCards() {
        log.info("----[CardService] Fetching all active cards----");
        List<Card> activeCards = cardRepository.findByIsActive(true);
        log.info("----[CardService] Found {} active cards----", activeCards.size());
        return activeCards;
    }

    public String deactivateCard(Long cardId) {
        log.info("----[CardService] Attempting to deactivate card with ID: {}----", cardId);
        Card card = cardRepository.findById(cardId).orElse(null);
        if (card == null) {
            log.warn("----[CardService] Card with ID {} not found----", cardId);
            return "Card not found";
        }
        card.setIsActive(false);
        cardRepository.save(card);
        log.info("----[CardService] Card with ID {} deactivated successfully----", cardId);
        return "Card deactivated successfully";
    }
}