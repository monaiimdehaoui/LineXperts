package com.example.linexperts.Models;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import com.example.linexperts.Utils.CompositeKeyUtils.ContractExtensionKey;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="contract_extension")
@IdClass(ContractExtensionKey.class)
public class ContractExtension {

    @Id
    @Column(name = "con_id", unique = true)
    @Getter @Setter private String conId;

    @Id
    @Column(name = "cext_id")
    @Getter @Setter private String cextId;

    @Column(name = "cext_start_date")
    @Getter @Setter private Date cextStartDate;

    @Column(name = "cext_end_date")
    @Getter @Setter private Date cextEndDate;

    @Column(name = "cext_closure_date")
    @Getter @Setter private Date cextClosureDate;

    @Column(name = "cext_status")
    @Getter @Setter private String cextStatus;

    @Column(name = "cext_total_cost")
    @Getter @Setter private double cextTotalCost;

    @Column(name = "cext_invoiced_cost")
    @Getter @Setter private double cextInvoicedCost;

    public ContractExtension() {super();}

    public ContractExtension(String conId, String cextId, Date cextStartDate, Date cexteEndDate, Date cextClosureDate, String cextStatus, double cextTotalCost, double cextInvoicedCost) {
        this.conId = conId;
        this.cextId = cextId;
        this.cextStartDate = cextStartDate;
        this.cextEndDate = cexteEndDate;
        this.cextClosureDate = cextClosureDate;
        this.cextStatus = cextStatus;
        this.cextTotalCost = cextTotalCost;
        this.cextInvoicedCost = cextInvoicedCost;
    }
}
