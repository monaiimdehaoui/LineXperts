package com.example.linexperts.Models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import com.example.linexperts.Utils.CompositeKeyUtils.WorkforceQualificationsKey;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "workforce_qualification")
@IdClass(WorkforceQualificationsKey.class)
public class WorkforceQualifications {

    @Id
    @Column(name = "ser_id", insertable = false)
    @Setter
    @Getter
    private int serId;

    @Id
    @Column(name = "wrk_id", insertable = false)
    @Setter
    @Getter
    private String wrkId;

    public WorkforceQualifications() {
        super();
    }

    public WorkforceQualifications(int serId, String wrkId) {
        this.serId = serId;
        this.wrkId = wrkId;
    }

}
