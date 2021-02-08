package com.example.linexperts.Models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

/** WARNING!
 ** This entity assumes the table within this schema and with all the columns
 ** listed here under each @Column are already there. Therefore, they are unique and not
 ** insertable. To generate a database based on this entity, please remove the insertable
 ** clause.
 * */
@Entity
@Table(name="corporate_group")
public class CorporateGroup {

    @Id
    @Column(name = "group_id", unique = true, updatable = false)
    @Getter @Setter private String groupId;

    //can be updated since companies can change groups.
    @Column(name = "group_name", unique = true)
    @Getter @Setter private String groupName;

    @Column(name = "group_address")
    @Getter @Setter private String groupAddress;

    @Column(name = "group_city")
    @Getter @Setter private String groupCity;

    @Column(name = "group_region")
    @Getter @Setter private String groupRegion;

    @Column(name = "group_country")
    @Getter @Setter private String groupCountry;

    @Column(name = "group_phone_no", unique = true)
    @Getter @Setter private String groupPhoneNo;

    @Column(name = "group_email", unique = true)
    @Getter @Setter private String groupEmail;

    @Column(name = "group_identification")
    @Getter @Setter private String groupIdentification;

    @Column(name = "group_status")
    @Getter @Setter private String groupStatus;

    public CorporateGroup() { super();}

    public CorporateGroup(String groupId, String groupName, String groupAddress, String groupCity, String groupRegion, String groupCountry, String groupPhoneNo, String groupEmail, String groupIdentification, String groupStatus) {
        this.groupId = groupId;
        this.groupName = groupName;
        this.groupAddress = groupAddress;
        this.groupCity = groupCity;
        this.groupRegion = groupRegion;
        this.groupCountry = groupCountry;
        this.groupPhoneNo = groupPhoneNo;
        this.groupEmail = groupEmail;
        this.groupIdentification = groupIdentification;
        this.groupStatus = groupStatus;
    }
}
