package com.banking.system.Accounts.Dto;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Setter
public class TransferReq
{
    private Long fromAccountId;
    private Long toAccountId;
    private Double amount;

    public TransferReq(Long fromAccountId,Long toAccountId,Double amount)
    {
        log.info("-----into Transfer Request Dto-----");
        this.amount=amount;
        this.fromAccountId=fromAccountId;
        this.toAccountId=toAccountId;
    }

}