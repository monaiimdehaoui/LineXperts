package com.example.linexperts.Utils.CompositeKeyUtils;

import java.io.Serializable;

public class WorkforceOnServiceKey implements Serializable {

    private String conId;

    private String cextId;

    private Integer serId;

    private String wrkId;

    public WorkforceOnServiceKey() { super(); }

    public WorkforceOnServiceKey(String conId, String cextId, Integer serId, String wrkId) {
        this.conId = conId;
        this.cextId = cextId;
        this.serId = serId;
        this.wrkId = wrkId;
    }
}
