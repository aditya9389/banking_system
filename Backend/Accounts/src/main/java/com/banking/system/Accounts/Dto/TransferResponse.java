package com.banking.system.Accounts.Dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;

@Slf4j
@Data

public class TransferResponse {
    private Long fromAccountId;
    private Long toAccountId;
    private Double amount;
    private String senderUsername;
    private String timestamp;
    private String status;

    public void setTimestamp() {
        this.timestamp = String.valueOf(LocalDateTime.now());
    }
    public TransferResponse(){};
}
