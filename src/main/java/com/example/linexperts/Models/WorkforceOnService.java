package com.example.linexperts.Models;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import com.example.linexperts.Utils.CompositeKeyUtils.WorkforceOnServiceKey;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="workforce_on_service")
@IdClass(WorkforceOnServiceKey.class)
public class WorkforceOnService {

    @Id
    @Column(name="con_id")
    @Getter @Setter  private String conId;

    @Id
    @Column(name="cext_id")
    @Getter @Setter private String cextId;

    @Id
    @Column(name="ser_id")
    @Getter @Setter private Integer serId;

    @Id
    @Column(name="wrk_id")
    @Getter @Setter private String wrkId;

    @Column(name="assigned_date")
    @Getter @Setter private Date assignedDate;

    @Column(name="wrk_ser_start_date")
    @Getter @Setter private Date wrkSerStartDate;

    @Column(name="wrk_ser_end_date")
    @Getter @Setter private Date wrkSerEndDate;

    public WorkforceOnService() { super(); }

    public WorkforceOnService(String conId, String cextId, Integer serId, String wrkId, Date assignedDate, Date wrkSerStartDate, Date wrkSerEndDate) {
        this.conId = conId;
        this.cextId = cextId;
        this.serId = serId;
        this.wrkId = wrkId;
        this.assignedDate = assignedDate;
        this.wrkSerStartDate = wrkSerStartDate;
        this.wrkSerEndDate = wrkSerEndDate;
    }
}
