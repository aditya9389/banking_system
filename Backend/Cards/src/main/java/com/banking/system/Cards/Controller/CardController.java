package com.banking.system.Cards.Controller;

import com.banking.system.Cards.Dto.CardRequestDto;
import com.banking.system.Cards.Model.Card;
import com.banking.system.Cards.Services.CardService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/card")
@AllArgsConstructor
@Slf4j
public class CardController {

    private final CardService cardService;

    @PostMapping("/createCard")
    public ResponseEntity<Card> createCard(@RequestBody CardRequestDto cardRequest) {
        log.info("----[CardController] Request to create card for user: {} and accountId: {}----",
                cardRequest.getUsername(), cardRequest.getAccountId());
        Card createdCard = cardService.createCard(cardRequest);
        log.info("----[CardController] Card created successfully with Card Number: {} ----", createdCard.getCardNumber());
        return ResponseEntity.ok(createdCard);
    }

    @GetMapping("/getCardsByUsername/{username}")
    public ResponseEntity<List<Card>> getCardsByUsername(@PathVariable String username) {
        log.info("----[CardController] Fetching cards for Username: {}----", username);
        return ResponseEntity.ok(cardService.getCardsByUsername(username));
    }

    @GetMapping("/getCardsByAccount/{accountId}")
    public ResponseEntity<List<Card>> getCardsByAccountId(@PathVariable Long accountId) {
        log.info("----[CardController] Fetching cards for Account ID: {}----", accountId);
        return ResponseEntity.ok(cardService.getCardsByAccountId(accountId));
    }

    @PutMapping("/deactivateCard/{cardId}")
    public ResponseEntity<Map<String,String>> deactivateCard(@PathVariable Long cardId) {
        log.info("----[CardController] Deactivating card with ID: {}----", cardId);
        String message=cardService.deactivateCard(cardId);
        return ResponseEntity.ok(Map.of("message", message));
    }

    @DeleteMapping("/deleteAllCards/{accountId}")
    public ResponseEntity<Map<String,String>> deleteAllCard(@PathVariable Long accountId)
    {
        log.info("----[CardController] Deleting all cards for Account ID: {}----", accountId);
        String message=(cardService.deleteAllCards(accountId));
        return ResponseEntity.ok(Map.of("message", message));
    }
}
