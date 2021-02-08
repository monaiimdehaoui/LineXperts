package com.example.linexperts.Utils.CompositeKeyUtils;

import java.io.Serializable;

public class ContractExtensionKey implements Serializable {

    private String conId;
    private String cextId;

    public ContractExtensionKey() {super();}

    public ContractExtensionKey(String conId, String cextId) {
        this.conId = conId;
        this.cextId = cextId;
    }
}
