package com.example.linexperts.Models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Table(name = "client")
@Entity
public class Client {

    @Id
    @Column(name="clt_id", unique = true, updatable = false)
    @Setter @Getter private String cltId;

    @Column(name="group_id", updatable = false)
    @Setter @Getter private  String groupId;

    @Column(name="clt_identification")
    @Setter @Getter private String cltIdentification;

    @Column(name = "clt_official_name")
    @Setter @Getter private String cltOfficialName;

    @Column(name="clt_commercial_name")
    @Setter @Getter private String cltCommercialName;

    @Column(name = "clt_first_name")
    @Setter @Getter private String cltFirstName;

    @Column(name="clt_last_name")
    @Setter @Getter private String cltLastName;

    @Column(name = "clt_address", unique = true)
    @Setter @Getter private String cltAddress;

    @Column(name="clt_city")
    @Setter @Getter private String cltCity;

    @Column(name="clt_region")
    @Setter @Getter private String cltRegion;

    @Column(name="clt_country")
    @Setter @Getter private String cltCountry;

    @Column(name = "clt_phone_no", unique = true)
    @Setter @Getter private String cltPhoneNo;

    @Column(name="clt_cell_no", unique = true)
    @Setter @Getter private String cltCellNo;

    @Column(name="clt_email_addr", unique = true)
    @Setter @Getter private String cltEmailAddr;

    @Column(name="clt_status")
    @Setter @Getter private String cltStatus;


    public Client() { super ();}

    public Client(String cltId, String groupId, String cltIdentification, String cltOfficialName, String cltCommercialName, String cltFirstName, String cltLastName, String cltAddress, String cltCity, String cltRegion, String cltCountry, String cltPhoneNo, String cltCellNo, String cltEmailAddr, String cltStatus) {
        this.cltId = cltId;
        this.groupId = groupId;
        this.cltIdentification = cltIdentification;
        this.cltOfficialName = cltOfficialName;
        this.cltCommercialName = cltCommercialName;
        this.cltFirstName = cltFirstName;
        this.cltLastName = cltLastName;
        this.cltAddress = cltAddress;
        this.cltCity = cltCity;
        this.cltRegion = cltRegion;
        this.cltCountry = cltCountry;
        this.cltPhoneNo = cltPhoneNo;
        this.cltCellNo = cltCellNo;
        this.cltEmailAddr = cltEmailAddr;
        this.cltStatus = cltStatus;
    }
}
