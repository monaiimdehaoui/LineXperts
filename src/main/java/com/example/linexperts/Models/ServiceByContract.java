package com.example.linexperts.Models;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import com.example.linexperts.Utils.CompositeKeyUtils.ServiceByContractKey;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="service_by_contract")
@IdClass(ServiceByContractKey.class)
public class ServiceByContract {

    @Id
    @Column(name = "con_id")
    @Getter @Setter private String conId;

    @Id
    @Column(name = "cext_id")
    @Getter @Setter private String cextId;

    @Id
    @Column(name = "ser_id")
    @Getter @Setter private Integer serId;

    @Id
    @Column(name = "ser_start_date")
    @Getter @Setter private Date serStartDate;

    @Column(name="ser_end_Date")
    @Getter @Setter private Date serEndDate;

    public ServiceByContract() { super();}

    public ServiceByContract(String conId, String cextId, Integer serId, Date serStartDate, Date serEndDate) {
        this.conId = conId;
        this.cextId = cextId;
        this.serId = serId;
        this.serStartDate = serStartDate;
        this.serEndDate = serEndDate;
    }
}
