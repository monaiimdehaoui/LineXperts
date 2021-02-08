package com.example.linexperts.Models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

/** WARNING!
 ** This entity assumes the table within this schema and with all the columns
 ** listed here under each @Column are already there. Therefore, they are unique and not
 ** insertable. To generate a database based on this entity, please remove the insertable
 ** clause.
 * */
@Entity
@Table(name = "service")
public class Services {

    @Id
    @NonNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ser_id", updatable = false)
    @Getter @Setter private Integer serId;

    @Column(name="ser_name")
    @Getter @Setter private String serName;

    @Column(name="ser_description")
    @Getter @Setter private String serDescription;

    @Column(name="ser_tariff")
    @Getter @Setter private double serTariff;

    @Column(name="ser_unit")
    @Getter @Setter private String serUnit;

    public Services(){super();}

    public Services(@NonNull Integer serId, String serName, String serDescription, double serTariff, String serUnit) {
        this.serId = serId;
        this.serName = serName;
        this.serDescription = serDescription;
        this.serTariff = serTariff;
        this.serUnit = serUnit;
    }
}
