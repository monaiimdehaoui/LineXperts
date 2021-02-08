package com.example.linexperts.Models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

/**
 * WARNING! This entity assumes the table within this schema and with all the
 * columns listed here under each @Column are already there. Therefore, they are
 * unique and not insertable. To generate a database based on this entity,
 * please remove the insertable clause.
 */

@Table(name = "workforce")
@Entity
public class Workforce {

    @Id
    @Column(name = "wrk_id", unique = true, updatable = false)
    @Getter
    @Setter
    private String wrkId;

    @Column(name = "wrk_last_name")
    @Getter
    @Setter
    private String wrkLastName;

    @Column(name = "wrk_sec_last_name")
    @Getter
    @Setter
    private String wrkSecLastName;

    @Column(name = "wrk_first_name")
    @Getter
    @Setter
    private String wrkFirstName;

    @Column(name = "wrk_mid_name")
    @Getter
    @Setter
    private String wrkMidName;

    @Column(name = "wrk_phone_no")
    @Getter
    @Setter
    private String wrkPhoneNo;

    @Column(name = "wrk_cell_no", unique = true)
    @Getter
    @Setter
    private String wrkCellNo;

    @Column(name = "wrk_corp_email", unique = true)
    @Getter
    @Setter
    private String wrkCorpEmail;

    @Column(name = "wrk_status")
    @Getter
    @Setter
    private String wrkStatus;

    @Column(name = "wrk_address")
    @Getter
    @Setter
    private String wrkAddress;

    @Column(name = "wrk_city")
    @Getter
    @Setter
    private String wrkCity;

    @Column(name = "wrk_region")
    @Getter
    @Setter
    private String wrkRegion;

    @Column(name = "wrk_country")
    @Getter
    @Setter
    private String wrkCountry;

    // User table.
    // Encrypt password (Hashing).
    // Default constructor
    public Workforce() {
        super();
    }

    public Workforce(String wrkId, String wrkLastName, String wrkSecLastName, String wrkFirstName, String wrkMidName,
            String wrkPhoneNo, String wrkCellNo, String wrkCorpEmail, String wrkStatus, String wrkAddress,
            String wrkCity, String wrkRegion, String wrkCountry) {
        this.wrkId = wrkId;
        this.wrkLastName = wrkLastName;
        this.wrkSecLastName = wrkSecLastName;
        this.wrkFirstName = wrkFirstName;
        this.wrkMidName = wrkMidName;
        this.wrkPhoneNo = wrkPhoneNo;
        this.wrkCellNo = wrkCellNo;
        this.wrkCorpEmail = wrkCorpEmail;
        this.wrkStatus = wrkStatus;
        this.wrkAddress = wrkAddress;
        this.wrkCity = wrkCity;
        this.wrkRegion = wrkRegion;
        this.wrkCountry = wrkCountry;
    }
}
