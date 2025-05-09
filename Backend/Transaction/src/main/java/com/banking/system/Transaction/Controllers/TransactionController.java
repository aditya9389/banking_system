package com.banking.system.Transaction.Controllers;

import com.banking.system.Transaction.Model.Tra_Entity;
import com.banking.system.Transaction.Services.TransactionService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/transactions")
@AllArgsConstructor

public class TransactionController {

    private final TransactionService transactionService;

    @GetMapping("/from/{accountId}")
    public ResponseEntity<List<Tra_Entity>> getTransactionsFromAccount(@PathVariable Long accountId) {
        List<Tra_Entity> transactions = transactionService.getTransactionsBySender(accountId);
        if (transactions.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/to/{accountId}")
    public ResponseEntity<List<Tra_Entity>> getTransactionsToAccount(@PathVariable Long accountId) {
        List<Tra_Entity> transactions = transactionService.getTransactionsByReceiver(accountId);
        if (transactions.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/account/{accountId}")
    public ResponseEntity<List<Tra_Entity>> getTransactionsByAccount(@PathVariable Long accountId) {
        List<Tra_Entity> transactions = transactionService.getTransactionsByAccount(accountId);
        if (transactions.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(transactions);
    }

    @PostMapping("/saveTransaction")
    public ResponseEntity<Map<String, String>> saveTransaction(@RequestBody Tra_Entity tra) {
        String res=transactionService.saveTransaction(tra);
        Map<String, String> response = new HashMap<>();
        response.put("message", res);
        return ResponseEntity.ok(response); // Respond with JSON instead of plain string
    }


}

