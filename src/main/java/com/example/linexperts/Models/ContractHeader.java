package com.example.linexperts.Models;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Table(name = "contract_header")
@Entity
public class ContractHeader {
    @Id
    @Column(name = "con_id", unique = true)
    @Getter
    @Setter
    private String conId;

    @Column(name = "clt_id")
    @Getter
    @Setter
    private String cltId;

    @Column(name = "con_description")
    @Getter
    @Setter
    private String conDescription;

    @Column(name = "con_start_date")
    @Getter
    @Setter
    private Date conStartDate;

    @Column(name = "con_end_date")
    @Getter
    @Setter
    private Date conEndDate;

    @Column(name = "con_closure_date")
    @Getter
    @Setter
    private Date conClosureDate;

    @Column(name = "con_status")
    @Getter
    @Setter
    private String conStatus;

    @Column(name = "sent_to_rup")
    @Getter
    @Setter
    private boolean sentToRup;

    @Column(name = "date_sent_to_rup")
    @Getter
    @Setter
    private Date dateSentToRup;

    public ContractHeader() {
        super();
    }

    public ContractHeader(String conId, String cltId, String conDescription, Date conStartDate, Date conEndDate,
            Date conClosureDate, String conStatus, boolean sentToRup, Date dateSentToRup) {
        this.conId = conId;
        this.cltId = cltId;
        this.conDescription = conDescription;
        this.conStartDate = conStartDate;
        this.conEndDate = conEndDate;
        this.conClosureDate = conClosureDate;
        this.conStatus = conStatus;
        this.sentToRup = sentToRup;
        this.dateSentToRup = dateSentToRup;
    }
}
