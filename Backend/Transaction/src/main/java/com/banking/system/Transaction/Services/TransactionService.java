package com.banking.system.Transaction.Services;

import com.banking.system.Transaction.Model.Tra_Entity;
import com.banking.system.Transaction.Repository.TransactionRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public List<Tra_Entity> getTransactionsBySender(Long accountId) {
        log.info("[TransactionService] Fetching transactions sent from account ID: {}", accountId);
        return transactionRepository.findByFromAccountId(accountId);
    }

    public List<Tra_Entity> getTransactionsByReceiver(Long accountId) {
        log.info("[TransactionService] Fetching transactions received by account ID: {}", accountId);
        return transactionRepository.findByToAccountId(accountId);
    }

    public List<Tra_Entity> getTransactionsByAccount(Long accountId) {
        log.info("[TransactionService] Fetching all transactions for account ID: {}", accountId);
        return transactionRepository.findByFromAccountIdOrToAccountId(accountId, accountId);
    }

    public String saveTransaction(Tra_Entity tra) {
        try {
            log.info("----[TransactionService] Saving transaction for From Account ID: {} To Account ID: {} with Amount: {}----", tra.getFromAccountId(), tra.getToAccountId(), tra.getAmount());
            transactionRepository.save(tra);

            log.info("----[TransactionService] Transaction saved successfully with status: {}----", tra.getStatus());
            return "Transaction saved successfully";
        } catch (Exception e) {
            log.error("----[TransactionService] Failed to save transaction: {}----", e.getMessage());
            return "Failed to save transaction";
        }
    }

}
