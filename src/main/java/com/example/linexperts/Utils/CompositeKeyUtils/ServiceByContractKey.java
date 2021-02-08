package com.example.linexperts.Utils.CompositeKeyUtils;

import java.io.Serializable;

public class ServiceByContractKey implements Serializable {

    private String conId;

    private String cextId;

    private Integer serId;

    public ServiceByContractKey() { super(); }

    public ServiceByContractKey(String conId, String cextId, Integer serId) {
        this.conId = conId;
        this.cextId = cextId;
        this.serId = serId;
    }
}
